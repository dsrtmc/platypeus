using System.Security.Claims;
using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;
using Server.Helpers;
using Server.Models;
using Server.Schema.Types.Errors;
using Server.Services;

namespace Server.Schema.Mutations;

[MutationType]
public static class RaceMutations
{
    // TODO: i don't even know if we have to return anything here. i mean, why not I guess, but then again, why should we?
    public static async Task<MutationResult<Race, InvalidUserError, InvalidRaceError, InvalidRacerStatisticsError>> UpdateStatsForUser(
        Guid userId, Guid raceId, DatabaseContext db, int wpm, int wordsTyped,
        [Service] ITopicEventSender eventSender, CancellationToken cancellationToken)
    {
        var user = await db.Users.FindAsync(userId);
        if (user is null)
            return new InvalidUserError(userId);
        
        var race = await db.Races.Include(r => r.Racers).ThenInclude(r => r.User).FirstOrDefaultAsync(r => r.Id == raceId, cancellationToken);
        if (race is null)
            return new InvalidRaceError(raceId);

        var racer = await db.Racers.FirstOrDefaultAsync(r => r.Race.Id == raceId && r.User.Id == userId, cancellationToken);
        if (racer is null)
            return new InvalidRacerStatisticsError(userId, raceId);

        racer.Wpm = wpm;
        racer.WordsTyped = wordsTyped;

        await db.SaveChangesAsync(cancellationToken);
        await eventSender.SendAsync(Helper.EncodeOnRaceEventToken(raceId), race, cancellationToken);
        
        return race;
    }
    
    public static async Task<MutationResult<Race, InvalidRaceError>> FinishRace(
        Guid raceId, DatabaseContext db,
        [Service] ITopicEventSender eventSender,
        CancellationToken cancellationToken)
    {
        var race = await db.Races
            .Include(r => r.Host)
            .Include(r => r.Racers).ThenInclude(r => r.User)
            .FirstOrDefaultAsync(r => r.Id == raceId, cancellationToken);
        
        if (race is null)
            return new InvalidRaceError(raceId);

        foreach (var racer in race.Racers)
            racer.Finished = true;

        race.Finished = true;

        await db.SaveChangesAsync(cancellationToken);
        await eventSender.SendAsync(Helper.EncodeOnRaceEventToken(raceId), race, cancellationToken);

        return race;
    }
    
    public static async Task<MutationResult<Race, InvalidRaceError, InvalidUserError, InvalidRacerStatisticsError>> FinishRaceForUser(
        Guid userId, Guid raceId, DatabaseContext db,
        [Service] ITopicEventSender eventSender,
        CancellationToken cancellationToken)
    {
        var user = await db.Users.FindAsync(userId);
        if (user is null)
            return new InvalidUserError(userId);
        
        var race = await db.Races.Include(r => r.Racers).ThenInclude(r => r.User).Include(r => r.Host).FirstOrDefaultAsync(r => r.Id == raceId, cancellationToken);
        if (race is null)
            return new InvalidRaceError(raceId);
        
        var racerStatistics = await db.Racers.FirstOrDefaultAsync(r => r.Race.Id == raceId && r.User.Id == userId, cancellationToken);
        if (racerStatistics is null)
            return new InvalidRacerStatisticsError(userId, raceId);

        racerStatistics.Finished = true;

        await db.SaveChangesAsync(cancellationToken);
        await eventSender.SendAsync(Helper.EncodeOnRaceEventToken(raceId), race, cancellationToken);

        return race;
    }
    
    public static async Task<MutationResult<Race, InvalidRaceError, NotAuthenticatedError, NotAuthorizedError>> RunRace(
        Guid raceId, DatabaseContext db,
        [Service] ITopicEventSender eventSender,
        CancellationToken cancellationToken)
    {
        // TODO: fix funny includes
        var race = await db.Races.Include(r => r.Host).Include(r => r.Racers).ThenInclude(r => r.User).FirstOrDefaultAsync(r => r.Id == raceId, cancellationToken);
        if (race is null)
            return new InvalidRaceError(raceId);
        
        race.Running = true;

        await db.SaveChangesAsync(cancellationToken);
        await eventSender.SendAsync(Helper.EncodeOnRaceEventToken(raceId), race, cancellationToken);

        return race;
    }

    // TODO: finally read up on what cancellation token does holy fuck this is ridiculous
    public static async Task<MutationResult<Race, InvalidRaceError, NotAuthenticatedError,NotAuthorizedError, TooFewRacersError>> StartRace(
        Guid raceId, DatabaseContext db,
        [Service] ITopicEventSender eventSender,
        IHttpContextAccessor accessor,
        CancellationToken cancellationToken)
    {
        // TODO: maybe just take userId as a parameter? no reason to check for cookies i think maybe idk
        var userIdClaim = accessor.HttpContext!.User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier);
        if (userIdClaim is null)
            return new NotAuthenticatedError();

        var user = await db.Users.FindAsync(new Guid(userIdClaim.Value));
        if (user is null)
            return new NotAuthenticatedError();
        
        // TODO: fix funny includes
        var race = await db.Races.Include(r => r.Host).Include(r => r.Racers).ThenInclude(r => r.User).FirstOrDefaultAsync(r => r.Id == raceId, cancellationToken);
        if (race is null)
            return new InvalidRaceError(raceId);
        
        // TODO: uncomment that in prod
        // if (race.Racers.Count < 2)
        //     return new TooFewRacersError(raceId);

        if (race.Host.Id != user.Id)
            return new NotAuthorizedError();

        race.Started = true;
        race.StartTime = DateTime.UtcNow;
        
        await db.SaveChangesAsync(cancellationToken);
        await eventSender.SendAsync(Helper.EncodeOnRaceEventToken(raceId), race, cancellationToken);

        return race;
    }
    
    public static async Task<MutationResult<Race, InvalidUserError, InvalidRaceError, InvalidRacePasswordError, AlreadyJoinedRaceError>> JoinRace(
        Guid? userId, Guid? raceId, string? password,
        DatabaseContext db,
        [Service] ITopicEventSender eventSender,
        CancellationToken cancellationToken)
    {
        if (userId is null)
            return new InvalidUserError(userId);
        
        var user = await db.Users.FindAsync(userId);
        if (user is null)
            return new InvalidUserError(userId);

        var race = await db.Races
            .Include(r => r.Racers)
                .ThenInclude(r => r.User)
            .Include(r => r.Host)
            .Include(r => r.Chatbox)
            .FirstOrDefaultAsync(r => r.Id == raceId, cancellationToken);
        
        if (race is null)
            return new InvalidRaceError(raceId);

        if (race.Private && race.Password != password)
            return new InvalidRacePasswordError(raceId, password);

        var racer = new Racer
        {
            Race = race,
            User = user,
            Wpm = 0,
            WordsTyped = 0,
            Finished = false
        };

        if (race.Racers.FirstOrDefault(r => r.User.Id == user.Id) is not null)
            return new AlreadyJoinedRaceError(raceId, userId);
            
        race.Racers.Add(racer);
        
        await db.SaveChangesAsync(cancellationToken);
        await eventSender.SendAsync(Helper.EncodeOnRaceEventToken(raceId), race, cancellationToken);
        
        return race;
    }
    
    public static async Task<MutationResult<Race?, InvalidUserError, InvalidRaceError, RaceIsRunningError>> LeaveRace(
        Guid userId, Guid raceId, DatabaseContext db,
        [Service] ITopicEventSender eventSender,
        CancellationToken cancellationToken)
    {
        var user = await db.Users.FindAsync(userId);
        if (user is null)
            return new InvalidUserError(userId);
    
        var race = await db.Races.Include(r => r.Racers).ThenInclude(r => r.User).FirstOrDefaultAsync(r => r.Id == raceId, cancellationToken);
        if (race is null)
            return new InvalidRaceError(raceId);

        if (race.Running)
            return new RaceIsRunningError();

        var racer = race.Racers.FirstOrDefault(r => r.User.Id == userId);
        if (racer is not null)
            db.Racers.Remove(racer);
    
        await db.SaveChangesAsync(cancellationToken);
        await eventSender.SendAsync(Helper.EncodeOnRaceEventToken(raceId), race, cancellationToken);
    
        return race;
    }
    
    public static async Task<MutationResult<Race, NotAuthenticatedError>> CreateRace(
        bool isPrivate, string mode, int modeSetting, string content, 
        string? password, DatabaseContext db, IHttpContextAccessor accessor)
    {
        var userIdClaim = accessor.HttpContext!.User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier);
        if (userIdClaim is null)
            return new NotAuthenticatedError();

        var user = await db.Users.FindAsync(new Guid(userIdClaim.Value));
        if (user is null)
            return new NotAuthenticatedError();
            
        // if (!isPrivate) password = null; // TODO: could be funny to add that, seems like it'd make sense.
        var race = new Race
        {
            Host = user,
            Racers = new List<Racer>(),
            Private = isPrivate,
            Mode = mode,
            ModeSetting = modeSetting,
            Content = content,
            Chatbox = new Chatbox(),
            Password = password
        };
        
        db.Races.Add(race);
        await db.SaveChangesAsync();
        
        return race;
    }
}