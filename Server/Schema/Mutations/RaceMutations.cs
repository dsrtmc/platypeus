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
    public static async Task AddRacerStatisticToRace()
    {
        
    }

    // Just for testing purposes
    public static async Task<Race?> FlipRunningStatus(Guid raceId, DatabaseContext db)
    {
        var race = await db.Races.FindAsync(raceId);
        if (race is null)
            return null;
        
        race.Running = !race.Running;

        await db.SaveChangesAsync();
        
        return race;
    }

    // TODO: i don't even know if we have to return anything here. i mean, why not I guess, but then again, why should we?
    public static async Task<MutationResult<Race, InvalidUserError, InvalidRaceError, InvalidRacerStatisticsError>> UpdateStatsForUser(
        Guid userId, Guid raceId, DatabaseContext db, int wpm,
        [Service] ITopicEventSender eventSender, CancellationToken cancellationToken)
    {
        var user = await db.Users.FindAsync(userId);
        if (user is null)
            return new InvalidUserError(userId);
        
        var race = await db.Races.Include(r => r.RacerStatistics).ThenInclude(r => r.Racer).FirstOrDefaultAsync(r => r.Id == raceId, cancellationToken);
        if (race is null)
            return new InvalidRaceError(raceId);
        

        var racerStatistics = await db.RacerStatistics.FirstOrDefaultAsync(r => r.Race.Id == raceId && r.Racer.Id == userId, cancellationToken);
        if (racerStatistics is null)
            return new InvalidRacerStatisticsError(userId, raceId);

        racerStatistics.Wpm = wpm;

        await db.SaveChangesAsync(cancellationToken);
        await eventSender.SendAsync(Helper.EncodeOnRaceEventToken(raceId), race, cancellationToken);
        
        return race;
    }
    
    public static async Task<MutationResult<Race, InvalidRaceError>> FinishRace(
        Guid raceId, DatabaseContext db,
        [Service] ITopicEventSender eventSender,
        CancellationToken cancellationToken)
    {
        var race = await db.Races.Include(r => r.Host).FirstOrDefaultAsync(r => r.Id == raceId, cancellationToken);
        if (race is null)
            return new InvalidRaceError(raceId);

        foreach (var racerStatistics in race.RacerStatistics)
            racerStatistics.Finished = true;

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
        
        var race = await db.Races.Include(r => r.Host).FirstOrDefaultAsync(r => r.Id == raceId, cancellationToken);
        if (race is null)
            return new InvalidRaceError(raceId);
        
        var racerStatistics = await db.RacerStatistics.FirstOrDefaultAsync(r => r.Race.Id == raceId && r.Racer.Id == userId, cancellationToken);
        if (racerStatistics is null)
            return new InvalidRacerStatisticsError(userId, raceId);

        racerStatistics.Finished = true;

        await db.SaveChangesAsync(cancellationToken);
        await eventSender.SendAsync(Helper.EncodeOnRaceEventToken(raceId), race, cancellationToken);

        return race;
    }

    // TODO: finally read up on what cancellation token does holy fuck this is ridiculous
    public static async Task<MutationResult<Race, InvalidRaceError, NotAuthenticatedError, NotAuthorizedError>> StartRace(
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
        
        // TODO: fix funny includes
        var race = await db.Races.Include(r => r.Host).Include(r => r.RacerStatistics).ThenInclude(rs => rs.Racer).FirstOrDefaultAsync(r => r.Id == raceId, cancellationToken);
        if (race is null)
            return new InvalidRaceError(raceId);

        if (race.Host.Id != user.Id)
            return new NotAuthorizedError();

        race.Running = true;
        race.StartTime = DateTime.UtcNow;
        
        Console.WriteLine($"JOIN race.racers length: {race.Racers.Count}");
        // TODO: maybe just move it to join race, i think it makes more sense yea
        // foreach (var racer in race.Racers)
        // {
        //     var stats = new RacerStatistics
        //     {
        //         Race = race,
        //         Racer = racer,
        //         Wpm = 0,
        //         Finished = false
        //     };
        //     db.RacerStatistics.Add(stats);
        // }

        await eventSender.SendAsync(Helper.EncodeOnRaceEventToken(raceId), race, cancellationToken);
        await db.SaveChangesAsync(cancellationToken);

        return race;
    }
    
    public static async Task<Race?> JoinRace(
        Guid? userId, Guid raceId, string? password,
        DatabaseContext db,
        [Service] ITopicEventSender eventSender,
        CancellationToken cancellationToken)
    {
        if (userId is null)
            return null;
        
        var user = await db.Users.FindAsync(userId);
        if (user is null)
            return null;

        var race = await db.Races.Include(r => r.Racers).Include(r => r.Host).Include(r => r.Chatbox).FirstOrDefaultAsync(r => r.Id == raceId, cancellationToken);
        if (race is null)
            return null;

        if (race.Private && race.Password != password)
            return null;

        if (race.Racers.FirstOrDefault(racer => racer.Id == user.Id) is null)
            race.Racers.Add(user);
        Console.WriteLine("PRE:");
        foreach (var racerStats in race.RacerStatistics)
        {
            Console.WriteLine($"user: {racerStats.Racer.Username}");
        }
        var racerStatistics = new RacerStatistics
        {
            Race = race,
            Racer = user,
            Wpm = 0,
            Finished = false
        };

        // idk if duplicate? TODO
        db.RacerStatistics.Add(racerStatistics);
        // race.RacerStatistics.Add(racerStatistics);

        Console.WriteLine("POST:");
        foreach (var racerStats in race.RacerStatistics)
        {
            Console.WriteLine($"user: {racerStats.Racer.Username}");
        }
        
        await db.SaveChangesAsync(cancellationToken);
        await eventSender.SendAsync(Helper.EncodeOnRaceEventToken(raceId), race, cancellationToken);
        Console.WriteLine("POST SAVE CHANGES:");
        foreach (var racerStats in race.RacerStatistics)
        {
            Console.WriteLine($"user: {racerStats.Racer.Username}");
        }
        Console.WriteLine($"race.racers length: {race.Racers.Count}");

        return race;
    }
    
    public static async Task<Race?> LeaveRace(
        Guid userId, Guid raceId, DatabaseContext db,
        [Service] ITopicEventSender eventSender,
        CancellationToken cancellationToken)
    {
        var user = await db.Users.FindAsync(userId);
        if (user is null)
            return null;
    
        var race = await db.Races.Include(r => r.Racers).Include(r => r.RacerStatistics).FirstOrDefaultAsync(r => r.Id == raceId, cancellationToken);
        if (race is null)
            return null;

        if (race.Racers.FirstOrDefault(racer => racer.Id == user.Id) is not null)
            race.Racers.Remove(user);

        foreach (var racerStats in race.RacerStatistics)
        {
            // TODO: unnecessary O(n)
            if (racerStats.Racer.Id == user.Id)
                race.RacerStatistics.Remove(racerStats);
        }
    
        await eventSender.SendAsync(Helper.EncodeOnRaceEventToken(raceId), race, cancellationToken);
        
        await db.SaveChangesAsync(cancellationToken);
    
        return race;
    }
    
    public static async Task<MutationResult<Race, NotAuthenticatedError>> CreateRace(
        bool isPrivate,
        string mode,
        int modeSetting,
        string content, 
        string? password,
        DatabaseContext db,
        IHttpContextAccessor accessor)
    {
        var userIdClaim = accessor.HttpContext!.User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier);
        if (userIdClaim is null)
            return new NotAuthenticatedError();

        var user = await db.Users.FindAsync(new Guid(userIdClaim.Value));
        if (user is null)
            return new NotAuthenticatedError();
            
        // if (!isPrivate) password = null; // could be funny to add that, seems like it'd make sense.
        var race = new Race
        {
            Host = user,
            Racers = new List<User>(),
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