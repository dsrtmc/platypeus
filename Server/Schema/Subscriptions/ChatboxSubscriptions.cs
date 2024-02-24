using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;
using Server.Helpers;
using Server.Models;
using Server.Services;

namespace Server.Schema.Subscriptions;

[SubscriptionType]
public class ChatboxSubscriptions
{
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