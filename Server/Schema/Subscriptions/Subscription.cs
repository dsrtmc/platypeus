using System.Runtime.CompilerServices;
using HotChocolate.Subscriptions;
using Server.Models;
using Server.Schema.Mutations;

namespace Server.Schema.Subscriptions;

[SubscriptionType]
public class Subscription
{
    public async IAsyncEnumerable<Race> OnCreatedStream(
        [Service] ITopicEventReceiver eventReceiver,
        [EnumeratorCancellation] CancellationToken cancellationToken
    ) {
        var sourceStream = await eventReceiver.SubscribeAsync<Race>(nameof(RaceMutations.CreateRace), cancellationToken);
        
        yield return new Race { Racers = new List<User>(), RacerStatistics = new List<RacerStatistics>() };

        await Task.Delay(5000);
        
        await foreach (var race in sourceStream.ReadEventsAsync())
        {
            yield return race;
        }
    }

    [Subscribe(With = nameof(OnCreatedStream))]
    [Topic(nameof(RaceMutations.CreateRace))]
    public Race OnCreated([EventMessage] Race createdRace)
    {
        return createdRace;
    }
}