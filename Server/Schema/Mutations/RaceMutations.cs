using System.Security.Claims;
using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;
using Server.Helpers;
using Server.Models;
using Server.Schema.Subscriptions;
using Server.Schema.Types.Errors;
using Server.Services;
using Server.Services.Races;
using Server.Utilities;

namespace Server.Schema.Mutations;

[MutationType]
public static class RaceMutations
{
    public static async Task<MutationResult<Race, InvalidRaceError>> FinishRace(
        Guid raceId, DatabaseContext db,
        [Service] ITopicEventSender eventSender)
    {
        var race = await db.Races
            .Include(r => r.Host)
            .Include(r => r.Racers)
                .ThenInclude(r => r.User)
            .FirstOrDefaultAsync(r => r.Id == raceId);
        
        if (race is null)
            return new InvalidRaceError(raceId);

        foreach (var racer in race.Racers)
            racer.Finished = true;

        race.Finished = true;

        await db.SaveChangesAsync();
        
        var message = new RaceEventMessage { Finished = true };
        await eventSender.SendAsync(Helper.EncodeOnRaceEventToken(raceId), message);

        return race;
    }
    
    public static async Task<MutationResult<Race, InvalidRaceError, NotAuthenticatedError, NotAuthorizedError>> RunRace(
        Guid raceId, DatabaseContext db, [Service] ITopicEventSender eventSender, CancellationToken cancellationToken)
    {
        var race = await db.Races
            .Include(r => r.Host)
            .Include(r => r.Racers)
                .ThenInclude(r => r.User)
            .FirstOrDefaultAsync(r => r.Id == raceId, cancellationToken);
        
        if (race is null)
            return new InvalidRaceError(raceId);
        
        race.Running = true;

        await db.SaveChangesAsync(cancellationToken);
        
        var message = new RaceEventMessage { Running = true };
        await eventSender.SendAsync(Helper.EncodeOnRaceEventToken(raceId), message, cancellationToken);

        return race;
    }

    /// <summary>
    /// Starts the race delayed by the given countdown time.
    /// </summary>
    /// <param name="raceId">The ID of the race.</param>
    /// <param name="countdownTime">In seconds, the time it takes after submit for the race to start.</param>
    /// <param name="db"></param>
    /// <param name="eventSender"></param>
    /// <param name="raceFinisher"></param>
    /// <param name="accessor"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    public static async Task<
        MutationResult<Race, InvalidRaceError, NotAuthenticatedError, NotAuthorizedError, RaceAlreadyRunningError, TooFewRacersError>
    > StartRace(
        Guid raceId, int countdownTime, DatabaseContext db,
        [Service] ITopicEventSender eventSender,
        [Service] IRaceFinisher raceFinisher,
        IHttpContextAccessor accessor,
        CancellationToken cancellationToken)
    {
        var userIdClaim = accessor.HttpContext!.User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier);
        if (userIdClaim is null)
            return new NotAuthenticatedError();

        var user = await db.Users.FindAsync(new Guid(userIdClaim.Value));
        if (user is null)
            return new NotAuthenticatedError();
        
        var raceWithRacerCount = await db.Races
            .Include(r => r.Host)
            .Where(r => r.Id == raceId)
            .Select(r => new 
            {
                Race = r,
                RacerCount = r.Racers.Count
            })
            .FirstOrDefaultAsync(cancellationToken);

        var race = raceWithRacerCount?.Race;
        
        if (race is null || raceWithRacerCount is null)
            return new InvalidRaceError(raceId);

        if (race.Finished || race.Running)
            return new RaceAlreadyRunningError(raceId);

        // if (raceWithRacerCount.RacerCount < 2)
        //     return new TooFewRacersError(raceId);

        if (race.Host.Id != user.Id)
            return new NotAuthorizedError();

        race.StartTime = DateTimeOffset.UtcNow.AddSeconds(countdownTime);
        race.Running = true;

        raceFinisher.Enqueue(race);
        
        await db.SaveChangesAsync(cancellationToken);
        
        var message = new RaceEventMessage { Running = race.Running, StartTime = race.StartTime };
        await eventSender.SendAsync(Helper.EncodeOnRaceEventToken(raceId), message, cancellationToken);

        return race;
    }
    
    public static async Task<
        MutationResult<Race, NotAuthenticatedError, InvalidRaceError, RaceAlreadyRunningError, AlreadyJoinedRaceError>
    > JoinRace(
        Guid? raceId, DatabaseContext db, IHttpContextAccessor accessor,
        [Service] ITopicEventSender eventSender, CancellationToken cancellationToken)
    {
        var context = accessor.HttpContext!;
        
        var claim = context.User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier);
        if (claim is null)
            return new NotAuthenticatedError();
        
        var userId = new Guid(claim.Value);
        
        var user = await db.Users.FindAsync(userId);
        if (user is null)
            return new NotAuthenticatedError();

        var race = await db.Races
            .Include(r => r.Racers)
                .ThenInclude(r => r.User)
            .Include(r => r.Host)
            .Include(r => r.Chatbox)
            .FirstOrDefaultAsync(r => r.Id == raceId, cancellationToken);
        
        if (race is null)
            return new InvalidRaceError(raceId);

        if (race.Running)
            return new RaceAlreadyRunningError((Guid) raceId!);

        // TODO: that's an incorrect error, but I think HotChocolate only allows me to have 5 errors? lol
        if (race.Racers.Count >= Race.MaxAllowedRacers)
            return new InvalidRaceError(raceId);

        var racer = new Racer
        {
            Race = race,
            User = user,
            Wpm = 0,
            WordsTyped = 0,
            Finished = false
        };

        if (race.Racers.FirstOrDefault(r => r.User.Id == user.Id) is not null)
            return new AlreadyJoinedRaceError(race.Slug, user.Username);
            
        race.Racers.Add(racer);
        
        await db.SaveChangesAsync(cancellationToken);
        
        var message = new RaceEventMessage { Racers = race.Racers };
            await eventSender.SendAsync(Helper.EncodeOnRaceEventToken(raceId), message, cancellationToken);
        Console.WriteLine("? we just sent the message");
        // try
        // {
        //     // TODO: Doesn't work if using Redis for some reason, causes the JsonSerializer to throw a `possible object cycle` exception.
        //     await eventSender.SendAsync(Helper.EncodeOnRaceEventToken(raceId), message, cancellationToken);
        // }
        // catch (Exception ex)
        // {
        //     Console.WriteLine($"[EXCEPTION] Message: {ex.Message}");
        // }
        
        return race;
    }
    
    public static async Task<MutationResult<Race?, NotAuthenticatedError, InvalidRaceError, RaceIsRunningError, NotInRaceError>> LeaveRace(
        Guid raceId, DatabaseContext db, IHttpContextAccessor accessor,
        [Service] ITopicEventSender eventSender,
        CancellationToken cancellationToken)
    {
        var context = accessor.HttpContext!;
        
        var claim = context.User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier);
        if (claim is null)
            return new NotAuthenticatedError();
        
        var userId = new Guid(claim.Value);
        
        var user = await db.Users.FindAsync(userId);
        if (user is null)
            return new NotAuthenticatedError();
    
        var race = await db.Races.Include(r => r.Racers).ThenInclude(r => r.User).FirstOrDefaultAsync(r => r.Id == raceId, cancellationToken);
        if (race is null)
            return new InvalidRaceError(raceId);

        if (race.Running)
            return new RaceIsRunningError();

        var racer = race.Racers.FirstOrDefault(r => r.User.Id == userId);
        if (racer is null)
            return new NotInRaceError(raceId, user.Username);
            
        db.Racers.Remove(racer);
    
        await db.SaveChangesAsync(cancellationToken);

        var message = new RaceEventMessage { Racers = race.Racers };
        await eventSender.SendAsync(Helper.EncodeOnRaceEventToken(raceId), message, cancellationToken);
    
        return race;
    }
    
    public static async Task<MutationResult<Race, NotAuthenticatedError, UniqueSlugNotGeneratedError>> CreateRace(
        bool unlisted, string mode, int modeSetting, string content, 
        DatabaseContext db, IHttpContextAccessor accessor)
    {
        var claim = accessor.HttpContext!.User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier);
        if (claim is null)
            return new NotAuthenticatedError();

        var userId = new Guid(claim.Value);
        
        var user = await db.Users.FindAsync(userId);
        if (user is null)
            return new NotAuthenticatedError();

        var attempts = 0;
        var slug = RandomGenerator.GenerateRandomString(8);
        
        while (db.Races.FirstOrDefault(r => r.Slug == slug) is not null)
        {
            if (++attempts >= 50)
                return new UniqueSlugNotGeneratedError();
            
            slug = RandomGenerator.GenerateRandomString(8);
        }
        
        var race = new Race
        {
            Host = user,
            Racers = new List<Racer>(),
            Unlisted = unlisted,
            Mode = mode,
            ModeSetting = modeSetting,
            Content = content,
            Chatbox = new Chatbox(),
            Slug = slug,
        };
        
        db.Races.Add(race);
        await db.SaveChangesAsync();
        
        return race;
    }

    public static async Task<MutationResult<bool, NotAuthenticatedError, NotAuthorizedError, InvalidRaceError>> DeleteRace(
        Guid raceId, DatabaseContext db, IHttpContextAccessor accessor,
        CancellationToken cancellationToken)
    {
        var claim = accessor.HttpContext!.User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier);
        if (claim is null)
            return new NotAuthenticatedError();

        var userId = new Guid(claim.Value);
        
        var user = await db.Users.FindAsync(userId);
        if (user is null)
            return new NotAuthenticatedError();
        
        var race = await db.Races
            .Include(r => r.Host)
            .FirstOrDefaultAsync(r => r.Id == raceId, cancellationToken);
        
        if (race is null)
            return new InvalidRaceError(raceId);
        
        if (race.Host.Id != user.Id)
            return new NotAuthorizedError();

        db.Races.Remove(race);
        
        await db.SaveChangesAsync(cancellationToken);

        return true;
    }
}
