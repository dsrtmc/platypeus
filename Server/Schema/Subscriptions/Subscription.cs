using HotChocolate.Execution;
using HotChocolate.Subscriptions;
using Server.Models;

namespace Server.Schema.Subscriptions;

[SubscriptionType]
public class Subscription
{
    // TODO: bad idea to send the entire object over-the-wire, investigate the mention of a data loader
    // TODO: a function that will encode our topic
    // TODO: maybe a better name xd but it's only internal so it's chill
    public ValueTask<ISourceStream<Race>> SubscribeOnRaceJoinLeave(
        Guid raceId,
        [Service] ITopicEventReceiver eventReceiver
    ) => eventReceiver.SubscribeAsync<Race>($"{nameof(OnRaceJoinLeave)}_{raceId}");
    
    [Subscribe(With = nameof(SubscribeOnRaceJoinLeave))]
    public Race OnRaceJoinLeave([EventMessage] Race race) => race;
}