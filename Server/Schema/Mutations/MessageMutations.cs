using System.Security.Claims;
using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Server.Helpers;
using Server.Models;
using Server.Schema.Types.Errors;
using Server.Services;

namespace Server.Schema.Mutations;

[MutationType]
public static class MessageMutations
{
    public static async Task<MutationResult<Message, NotAuthenticatedError, InvalidChatboxError>> SendMessage(
        Guid chatboxId, string content, DatabaseContext db,
        IHttpContextAccessor accessor, [Service] ITopicEventSender eventSender)
    {
        var claim = accessor.HttpContext!.User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier);
        if (claim is null || claim.Value.IsNullOrEmpty())
            return new NotAuthenticatedError();

        var userId = new Guid(claim.Value);
        
        var user = await db.Users.FindAsync(userId);
        if (user is null)
            return new NotAuthenticatedError();

        var chatbox = await db.Chatboxes
            .Include(c => c.Messages.OrderBy(m => m.CreatedAt))
                .ThenInclude(m => m.Author)
            .FirstOrDefaultAsync(c => c.Id == chatboxId);
        
        if (chatbox is null)
            return new InvalidChatboxError(chatboxId);

        var message = new Message
        {
            Author = user,
            Content = content,
            Chatbox = chatbox
        };
        
        await eventSender.SendAsync(Helper.EncodeOnChatboxEventToken(chatboxId), chatbox);
        
        chatbox.Messages.Add(message);
        
        await db.SaveChangesAsync();
        
        return message;
    }
}