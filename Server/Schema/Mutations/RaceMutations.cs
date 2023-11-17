using System.Security.Claims;
using HotChocolate.Subscriptions;
using Server.Models;
using Server.Schema.Subscriptions;
using Server.Services;

namespace Server.Schema.Mutations;

[MutationType]
public static class RaceMutations
{
    public static async Task<Race> CreateRace(
        DatabaseContext db,
        [Service] IHttpContextAccessor accessor,
        CancellationToken cancellationToken
    ) {
        var race = new Race
        {
            RacerStatistics = new List<RacerStatistics>(),
            Racers = new List<User>()
        };
        
        db.Races.Add(race);
        await db.SaveChangesAsync(cancellationToken);
        
        return race;
    }

    // TODO: bad return value
    public static async Task<User?> AddUserToRace(
        Guid userId, Guid raceId, DatabaseContext db,
        [Service] ITopicEventSender eventSender
    ) {
        var user = await db.Users.FindAsync(userId);
        if (user is null)
            return null;

        var race = await db.Races.FindAsync(raceId);
        if (race is null)
            return null;
        
        race.Racers.Add(user);

        var userJoinedTopic = nameof(Subscription.OnJoined);
        await eventSender.SendAsync(userJoinedTopic, race);
        
        // TODO: Save changes to the database
        
        return user;
    }
}