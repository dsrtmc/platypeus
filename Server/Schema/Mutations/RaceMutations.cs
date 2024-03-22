using System.Security.Claims;
using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Server.Helpers;
using Server.Models;
using Server.Schema.Subscriptions;
using Server.Schema.Types.Errors;
using Server.Services;
using Server.Utilities;
using StackExchange.Redis;

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
        
        var message = new RacePropertyUpdate { Finished = true };
        await eventSender.SendAsync(Helper.EncodeOnRaceEventToken(raceId), message);

        return race;
    }
    
    public static async Task<MutationResult<Race, InvalidRaceError, NotAuthenticatedError, NotAuthorizedError>> RunRace(
        Guid raceId, DatabaseContext db, [Service] ITopicEventSender eventSender, CancellationToken cancellationToken)
    {
        // TODO: fix funny includes
        var race = await db.Races
            .Include(r => r.Host)
            .Include(r => r.Racers)
                .ThenInclude(r => r.User)
            .FirstOrDefaultAsync(r => r.Id == raceId, cancellationToken);
        
        if (race is null)
            return new InvalidRaceError(raceId);
        
        race.Running = true;

        await db.SaveChangesAsync(cancellationToken);
        
        var message = new RacePropertyUpdate { Running = true };
        await eventSender.SendAsync(Helper.EncodeOnRaceEventToken(raceId), message, cancellationToken);

        return race;
    }

    public static async Task<
        MutationResult<Race, InvalidRaceError, NotAuthenticatedError, NotAuthorizedError, RaceAlreadyRunningError, TooFewRacersError>
    > StartRace(
        Guid raceId, DatabaseContext db,
        [Service] ITopicEventSender eventSender,
        IHttpContextAccessor accessor,
        CancellationToken cancellationToken)
    {
        var userIdClaim = accessor.HttpContext!.User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier);
        if (userIdClaim is null)
            return new NotAuthenticatedError();

        var user = await db.Users.FindAsync(new Guid(userIdClaim.Value));
        if (user is null)
            return new NotAuthenticatedError();
        
        var race = await db.Races
            .Include(r => r.Host)
            .FirstOrDefaultAsync(r => r.Id == raceId, cancellationToken);
        
        if (race is null)
            return new InvalidRaceError(raceId);

        if (race.Finished || race.Started || race.Running)
            return new RaceAlreadyRunningError(raceId);
        
        // TODO: uncomment that in prod
        // if (race.Racers.Count < 2)
        //     return new TooFewRacersError(raceId);

        if (race.Host.Id != user.Id)
            return new NotAuthorizedError();

        race.Started = true;
        race.StartTime = DateTimeOffset.UtcNow;
        
        await db.SaveChangesAsync(cancellationToken);
        
        var message = new RacePropertyUpdate { Started = race.Started, StartTime = race.StartTime };
        await eventSender.SendAsync(Helper.EncodeOnRaceEventToken(raceId), message, cancellationToken);

        return race;
    }
    
    // TODO: investigate the generated SQL because holy chungus is it horrifying
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
            return new AlreadyJoinedRaceError(raceId, user.Username);
            
        race.Racers.Add(racer);
        
        await db.SaveChangesAsync(cancellationToken);
        
        var message = new RacePropertyUpdate { Racers = race.Racers };
        try
        {
            // TODO: Doesn't work if using Redis for some reason, causes the JsonSerializer to throw a `possible object cycle` exception.
            await eventSender.SendAsync(Helper.EncodeOnRaceEventToken(raceId), message, cancellationToken);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[EXCEPTION] Message: {ex.Message}");
        }
        
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

        if (race.Started || race.Running)
            return new RaceIsRunningError();

        var racer = race.Racers.FirstOrDefault(r => r.User.Id == userId);
        if (racer is null)
            return new NotInRaceError(raceId, user.Username);
            
        db.Racers.Remove(racer);
    
        await db.SaveChangesAsync(cancellationToken);
        
        var message = new RacePropertyUpdate { Racers = race.Racers };
        await eventSender.SendAsync(Helper.EncodeOnRaceEventToken(raceId), message, cancellationToken);
    
        return race;
    }
    
    public static async Task<MutationResult<Race, NotAuthenticatedError, UniqueSlugNotGeneratedError>> CreateRace(
        bool unlisted, string mode, int modeSetting, string content, 
        DatabaseContext db, IHttpContextAccessor accessor)
    {
        var claim = accessor.HttpContext!.User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier);
        if (claim is null || claim.Value.IsNullOrEmpty())
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
}