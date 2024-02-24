using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;
using Server.Helpers;
using Server.Models;
using Server.Services;

namespace Server.Schema.Subscriptions;

[SubscriptionType]
public class RaceSubscriptions
{
    /// <summary>
    /// 
    /// </summary>
    /// <param name="raceId"></param>
    /// <param name="db"></param>
    /// <param name="eventReceiver"></param>
    /// <returns></returns>
    // TODO: bad idea to send the entire object over-the-wire, investigate the mention of a data loader
    // TODO: maybe a better name xd but it's only internal so it's chill
    // TODO: some validation idk if needed u know like if race is null and stuff
    // TODO: I'm getting race condition issues -> i need to figure out how to update just the user's score, without affecting other stats
    /*
     * On one hand, we're probably rather unnecessarily sending the entire `Race` object from the mutation over here to the subscription.
     * On the other hand, I can't really see it to be a blatant performance concern. TODO: benchmark both approaches and see if it's a valid concern.
     */
    public async IAsyncEnumerable<Race> OnRaceEventStream(
        Guid raceId, [Service] DatabaseContext db,
        [Service] ITopicEventReceiver eventReceiver)
    {
        yield return (await db.Races
            .Include(r => r.Host)
            .Include(r => r.Racers)
                .ThenInclude(r => r.User)
            .FirstOrDefaultAsync(r => r.Id == raceId))!;
        
        var sourceStream = await eventReceiver.SubscribeAsync<Race>(Helper.EncodeOnRaceEventToken(raceId));
        
        await foreach (var race in sourceStream.ReadEventsAsync())
            yield return race;
    }
    
    [Subscribe(With = nameof(OnRaceEventStream))]
    public Race OnRaceEvent([EventMessage] Race race) => race;

}