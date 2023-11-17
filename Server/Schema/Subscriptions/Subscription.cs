using System.Runtime.CompilerServices;
using HotChocolate.Execution;
using HotChocolate.Subscriptions;
using Server.Models;
using Server.Schema.Mutations;

namespace Server.Schema.Subscriptions;

[SubscriptionType]
public class Subscription
{
    [Subscribe]
    [Topic($"{nameof(OnJoined)}")]
    public Race OnJoined([EventMessage] Race race)
    {
        // no fucking idea why it gives us 2 results instead of one, it worked just fine and I changed nothing and it broke lol
        return race;
    }
}