using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;
using Server.Helpers;
using Server.Models;
using Server.Services;

namespace Server.Schema.Mutations;

[MutationType]
public static class MessageMutations
{
    public static async Task<bool> SendMessage(
        Guid userId, Guid chatboxId, string content,
        DatabaseContext db, [Service] ITopicEventSender eventSender,
        CancellationToken cancellationToken)
    {
        var user = await db.Users.FindAsync(userId);
        if (user is null)
            return false;

        var chatbox = await db.Chatboxes
            .Include(c => c.Messages.OrderBy(m => m.CreatedAt))
                .ThenInclude(m => m.Author)
            .FirstOrDefaultAsync(c => c.Id == chatboxId, cancellationToken);
        if (chatbox is null)
            return false;

        var message = new Message
        {
            Author = user,
            Content = content
        };
        
        await eventSender.SendAsync(Helper.EncodeOnChatboxEventToken(chatboxId), chatbox, cancellationToken);
        
        chatbox.Messages.Add(message);
        
        await db.SaveChangesAsync(cancellationToken);
        
        return true;
    }
}