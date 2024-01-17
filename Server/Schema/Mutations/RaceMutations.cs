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

    public static async Task<MutationResult<Race, InvalidRaceError, NotAuthenticatedError, NotAuthorizedError>> StartRace(
        Guid raceId, DatabaseContext db,
        IHttpContextAccessor accessor)
    {
        var userIdClaim = accessor.HttpContext!.User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier);
        if (userIdClaim is null)
            return new NotAuthenticatedError();

        var user = await db.Users.FindAsync(new Guid(userIdClaim.Value));
        if (user is null)
            return new NotAuthenticatedError();
        
        var race = await db.Races.FindAsync(raceId);
        if (race is null)
            return new InvalidRaceError(raceId);

        if (race.Host.Id != user.Id)
            return new NotAuthorizedError();

        race.Running = true;

        foreach (var racer in race.Racers)
        {
            var stats = new RacerStatistics
            {
                Race = race,
                Racer = racer,
                Wpm = 0
            };
            db.RacerStatistics.Add(stats);
        }

        await db.SaveChangesAsync();

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

        var race = await db.Races.Include(r => r.Racers).Include(r => r.Chatbox).FirstOrDefaultAsync(r => r.Id == raceId, cancellationToken);
        if (race is null)
            return null;

        if (race.Private && race.Password != password)
            return null;

        if (race.Racers.FirstOrDefault(racer => racer.Id == user.Id) is null)
            race.Racers.Add(user);

        await eventSender.SendAsync(Helper.EncodeOnRaceJoinLeaveToken(raceId), race, cancellationToken);
        
        await db.SaveChangesAsync(cancellationToken);

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
    
        var race = await db.Races.Include(r => r.Racers).FirstOrDefaultAsync(r => r.Id == raceId, cancellationToken);
        if (race is null)
            return null;

        if (race.Racers.FirstOrDefault(racer => racer.Id == user.Id) is not null)
            race.Racers.Remove(user);
    
        await eventSender.SendAsync(Helper.EncodeOnRaceJoinLeaveToken(raceId), race, cancellationToken);
        
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