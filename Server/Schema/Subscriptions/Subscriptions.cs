using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Services;
using Server.Helpers;

namespace Server.Schema.Subscriptions;

[SubscriptionType]
public class Subscription
{
    /// <summary>
    /// 
    /// </summary>
    /// <param name="raceId"></param>
    /// <param name="db"></param>
    /// <param name="eventReceiver"></param>
    /// <returns></returns>
    // TODO: bad idea to send the entire object over-the-wire, investigate the mention of a data loader
    // TODO: a function that will encode our topic
    // TODO: maybe a better name xd but it's only internal so it's chill
    // TODO: some validation idk if needed u know like if race is null and stuff
    public async IAsyncEnumerable<Race> OnRaceJoinLeaveStream(
        Guid raceId, [Service] DatabaseContext db,
        [Service] ITopicEventReceiver eventReceiver
    ) {
        yield return (await db.Races
            .Include(r => r.Racers)
            .FirstOrDefaultAsync(r => r.Id == raceId))!;
        
        var sourceStream = await eventReceiver.SubscribeAsync<Race>(Helper.EncodeOnRaceJoinLeaveToken(raceId));
        
        await foreach (var race in sourceStream.ReadEventsAsync())
            yield return race;
    }
    
    [Subscribe(With = nameof(OnRaceJoinLeaveStream))]
    public Race OnRaceJoinLeave([EventMessage] Race race) => race;
    
    /// <summary>
    /// 
    /// </summary>
    /// <param name="chatboxId"></param>
    /// <param name="db"></param>
    /// <param name="eventReceiver"></param>
    /// <returns></returns>
    public async IAsyncEnumerable<Chatbox> OnChatboxEventStream(
        Guid chatboxId, [Service] DatabaseContext db,
        [Service] ITopicEventReceiver eventReceiver
    ) {
        yield return (await db.Chatboxes
            .Include(c => c.Messages.OrderBy(m => m.CreatedAt))
                .ThenInclude(m => m.Author)
            .FirstOrDefaultAsync(r => r.Id == chatboxId))!;
        
        var sourceStream = await eventReceiver.SubscribeAsync<Chatbox>(Helper.EncodeOnChatboxEventToken(chatboxId));

        await foreach (var chatbox in sourceStream.ReadEventsAsync())
            yield return chatbox;
    }
    
    [Subscribe(With = nameof(OnChatboxEventStream))]
    public Chatbox OnChatboxEvent([EventMessage] Chatbox chatbox) => chatbox;
}