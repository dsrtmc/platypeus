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
    public ValueTask<ISourceStream<Race>> SubscribeOnJoined(
        Guid raceId,
        [Service] ITopicEventReceiver eventReceiver
    ) => eventReceiver.SubscribeAsync<Race>($"{nameof(OnJoined)}_{raceId}");
    
    [Subscribe(With = nameof(SubscribeOnJoined))]
    public Race OnJoined([EventMessage] Race race) => race;
    
    public ValueTask<ISourceStream<Race>> SubscribeOnLeft(
        Guid raceId,
        [Service] ITopicEventReceiver eventReceiver
    ) => eventReceiver.SubscribeAsync<Race>($"{nameof(OnLeft)}_{raceId}");
    
    [Subscribe(With = nameof(SubscribeOnLeft))]
    public Race OnLeft([EventMessage] Race race) => race;
    // TODO: ONE EVENT HANDLER BETTER I THINK, MAKES IT EASIER TO UPDATE TRUE PLAYER COUNT I THINK?
}