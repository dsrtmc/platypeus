using System.Formats.Asn1;
using System.Text.Json;
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
    // TODO: some validation idk if needed u know like if race is null and stuff
    // TODO: I'm getting race condition issues -> i need to figure out how to update just the user's score, without affecting other stats
    /*
     * On one hand, we're probably rather unnecessarily sending the entire `Race` object from the mutation over here to the subscription.
     * On the other hand, I can't really see it to be a blatant performance concern. TODO: benchmark both approaches and see if it's a valid concern.
     */
    // public async IAsyncEnumerable<Race> OnRaceEventStream(
    //     Guid raceId, [Service] DatabaseContext db,
    //     [Service] ITopicEventReceiver eventReceiver)
    // {
    //     yield return (await db.Races
    //         .Include(r => r.Host)
    //         .Include(r => r.Racers)
    //             .ThenInclude(r => r.User)
    //         .FirstOrDefaultAsync(r => r.Id == raceId))!;
    //     
    //     var sourceStream = await eventReceiver.SubscribeAsync<Race>(Helper.EncodeOnRaceEventToken(raceId));
    //     
    //     await foreach (var race in sourceStream.ReadEventsAsync())
    //         yield return race;
    // }
    
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
        
        var sourceStream = await eventReceiver.SubscribeAsync<RacePropertyUpdate>(Helper.EncodeOnRaceEventToken(raceId));
        
        await foreach (var propertyUpdate in sourceStream.ReadEventsAsync())
        {
            var raceProperties = typeof(Race).GetProperties();
            var properties = typeof(RacePropertyUpdate).GetProperties();
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

// TODO: rename i guess
/// <summary>
/// Holds the properties that are to be updated in the `Race` object.
/// </summary>
public class RacePropertyUpdate
{
    public List<Racer>? Racers { get; set; }
    
    public bool? Started { get; set; }
    
    public bool? Running { get; set; }
    
    public bool? Finished { get; set; }
    
    public DateTime? StartTime { get; set; }
}