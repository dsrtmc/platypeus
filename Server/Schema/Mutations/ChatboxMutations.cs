using Server.Models;
using Server.Services;

namespace Server.Schema.Mutations;

[MutationType]
public static class ChatboxMutations
{
    public static async Task<Chatbox> CreateChatbox(DatabaseContext db)
    {
        var chatbox = new Chatbox();

        await db.Chatboxes.AddAsync(chatbox);
        await db.SaveChangesAsync();
        
        return chatbox;
    }
}