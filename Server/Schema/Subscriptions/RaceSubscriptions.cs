using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;
using Server.Helpers;
using Server.Models;
using Server.Services;

namespace Server.Schema.Subscriptions;

[SubscriptionType]
public class RaceSubscriptions
{
    // TODO: bad idea to send the entire object over-the-wire, investigate the mention of a data loader
    // TODO: some validation idk if needed u know like if race is null and stuff
    // TODO: race condition issues
    // TODO: had this idea that i need to approach with a sober mind:
    // - shouldn't we just have the server handle finishing the race n shit?
    // - like, I guess every time someone sends any event, the server can check multiple conditions, like:
    //   - if any user has finished on time mode, finish the race for everyone else
    //   - if time passed >= mode setting, finish the race etc.
    // it's probably a better idea to handle it all on the server but hmm idk it'd require some thought
    public async IAsyncEnumerable<Race?> OnRaceEventStream(
        Guid raceId, [Service] DatabaseContext db,
        [Service] ITopicEventReceiver eventReceiver)
    {
        var race = await db.Races
            .Include(r => r.Host)
            .Include(r => r.Racers)
                .ThenInclude(r => r.User)
            .FirstOrDefaultAsync(r => r.Id == raceId);

        yield return race;
        
        var sourceStream = await eventReceiver.SubscribeAsync<RaceEventMessage>(Helper.EncodeOnRaceEventToken(raceId));
        
        await foreach (var propertyUpdate in sourceStream.ReadEventsAsync())
        {
            var raceProperties = typeof(Race).GetProperties();
            var properties = typeof(RaceEventMessage).GetProperties();
            foreach (var raceProperty in raceProperties)
            {
                foreach (var property in properties)
                {
                    /*
                     * We're only checking the name of the property, which could potentially be dangerous, since
                     * it only relies on a correct implementation of the update class. I didn't know how to
                     * account for type mismatch caused by nullability, so I opted for this solution for now.
                     */
                    if (raceProperty.Name != property.Name) continue;
                    
                    var value = property.GetValue(propertyUpdate);
                    if (value is null) continue;
                        
                    raceProperty.SetValue(race, value);
                }
            }
            yield return race;
        }
    }
    
    [Subscribe(With = nameof(OnRaceEventStream))]
    public Race OnRaceEvent([EventMessage] Race race) => race;
    
    // TODO: When implemented correctly, there's apparently a deadlock.
    // TODO: Make it somehow implemented correctly, considering the source generators keeps spewing infinite duplicate definitions.
    // [DataLoader(ServiceScope = DataLoaderServiceScope.OriginalScope)]
    // internal static async Task<IReadOnlyDictionary<Guid, Race>> GetRaceByIdAsync(
    //     IReadOnlyList<Guid> ids,
    //     DatabaseContext db,
    //     CancellationToken cancellationToken)
    //     => await db.Races.Where(r => ids.Contains(r.Id)).ToDictionaryAsync(r => r.Id, cancellationToken);
}

/// <summary>
/// Holds the properties that are to be updated in the `Race` object.
/// </summary>
public class RaceEventMessage
{
    public List<Racer>? Racers { get; set; }
    
    public bool? Started { get; set; }
    
    public bool? Running { get; set; }
    
    public bool? Finished { get; set; }
    
    public DateTimeOffset? StartTime { get; set; }
}