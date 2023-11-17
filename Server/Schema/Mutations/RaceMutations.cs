using System.Security.Claims;
using HotChocolate.Subscriptions;
using Server.Models;
using Server.Services;

namespace Server.Schema.Mutations;

[MutationType]
public static class RaceMutations
{
    public static async Task<Race> CreateRace(
        DatabaseContext db,
        [Service] IHttpContextAccessor accessor,
        [Service] ITopicEventSender eventSender,
        CancellationToken cancellationToken
    ) {
        var race = new Race
        {
            RacerStatistics = new List<RacerStatistics>(),
            Racers = new List<User>()
        };
        await eventSender.SendAsync(nameof(CreateRace), race, cancellationToken);
        return race;
    }
}