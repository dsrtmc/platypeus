using HotChocolate.Execution;
using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Services;

namespace Server.Schema.Subscriptions;

[SubscriptionType]
public class Subscription
{
    // TODO: bad idea to send the entire object over-the-wire, investigate the mention of a data loader
    // TODO: a function that will encode our topic
    // TODO: maybe a better name xd but it's only internal so it's chill
    // TODO: some validation idk if needed u know like if race is null and stuff
    public async IAsyncEnumerable<Race> OnRaceJoinLeaveStream(
        Guid raceId, [Service] DatabaseContext db,
        [Service] ITopicEventReceiver eventReceiver
    ) {
        yield return (await db.Races.Include(r => r.Racers).FirstOrDefaultAsync(r => r.ID == raceId))!;
        
        var sourceStream = await eventReceiver.SubscribeAsync<Race>($"{nameof(OnRaceJoinLeave)}_{raceId}");
        
        await foreach (var race in sourceStream.ReadEventsAsync())
            yield return race;
    }

    [Subscribe(With = nameof(OnRaceJoinLeaveStream))]
    public Race OnRaceJoinLeave([EventMessage] Race race) => race;
}