using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;
using Server.Helpers;
using Server.Models;
using Server.Schema.Types.Errors;
using Server.Services;

namespace Server.Schema.Mutations;

[MutationType]
public static class RacerMutations
{
    // TODO: i don't even know if we have to return anything here. i mean, why not I guess, but then again, why should we?
    public static async Task<MutationResult<Racer, InvalidUserError, InvalidRaceError, InvalidRacerStatisticsError>> UpdateStatsForUser(
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
        
        return racer;
    }
    
    public static async Task<MutationResult<Racer, InvalidRaceError, InvalidUserError, InvalidRacerStatisticsError>> FinishRaceForUser(
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
            return new InvalidRacerStatisticsError(userId, raceId);

        racer.Finished = true;

        await db.SaveChangesAsync(cancellationToken);
        await eventSender.SendAsync(Helper.EncodeOnRaceEventToken(raceId), race, cancellationToken);

        return racer;
    }
}