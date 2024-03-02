using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;
using Server.Helpers;
using Server.Models;
using Server.Schema.Subscriptions;
using Server.Schema.Types.Errors;
using Server.Services;

namespace Server.Schema.Mutations;

[MutationType]
public static class RacerMutations
{
    // TODO: make it cookie based again
    public static async Task<MutationResult<Racer, InvalidUserError, InvalidRaceError, InvalidRacerError>> UpdateStatsForUser(
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
            return new InvalidRacerError(raceId, user.Username);

        racer.Wpm = wpm;
        racer.WordsTyped = wordsTyped;

        await db.SaveChangesAsync(cancellationToken);

        var message = new RacePropertyUpdate { Racers = race.Racers };
        await eventSender.SendAsync(Helper.EncodeOnRaceEventToken(raceId), message, cancellationToken);
        
        return racer;
    }
    
    public static async Task<MutationResult<Racer, InvalidRaceError, InvalidUserError, InvalidRacerError>> FinishRaceForUser(
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
        
        var racer = await db.Racers.FirstOrDefaultAsync(r => r.Race.Id == raceId && r.User.Id == userId, cancellationToken);
        if (racer is null)
            return new InvalidRacerError(raceId, user.Username);

        racer.Finished = true;

        await db.SaveChangesAsync(cancellationToken);
        
        var message = new RacePropertyUpdate { Racers = race.Racers };
        await eventSender.SendAsync(Helper.EncodeOnRaceEventToken(raceId), message, cancellationToken);

        return racer;
    }
}