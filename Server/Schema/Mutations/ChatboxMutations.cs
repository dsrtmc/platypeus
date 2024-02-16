using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;
using Server.Helpers;
using Server.Models;
using Server.Schema.Types.Errors;
using Server.Services;

namespace Server.Schema.Mutations;

[MutationType]
public static class ChatboxMutations
{
    public static async Task<MutationResult<Chatbox, InvalidUserError, InvalidChatboxError>> JoinChatbox(
        Guid userId, Guid chatboxId, DatabaseContext db,
        [Service] ITopicEventSender eventSender,
        CancellationToken cancellationToken)
    {
        var user = await db.Users.FindAsync(userId);
        if (user is null)
            return new InvalidUserError(userId);

        var chatbox = await db.Chatboxes.Include(c => c.Messages).FirstOrDefaultAsync(c => c.Id == chatboxId, cancellationToken);
        if (chatbox is null)
            return new InvalidChatboxError(chatboxId);

        await eventSender.SendAsync(Helper.EncodeOnChatboxEventToken(chatboxId), chatbox, cancellationToken);
        
        await db.SaveChangesAsync(cancellationToken);

        return chatbox;
    }
    
    public static async Task<MutationResult<Chatbox>> CreateChatbox(DatabaseContext db)
    {
        var chatbox = new Chatbox();

        await db.Chatboxes.AddAsync(chatbox);
        await db.SaveChangesAsync();
        
        return chatbox;
    }
}