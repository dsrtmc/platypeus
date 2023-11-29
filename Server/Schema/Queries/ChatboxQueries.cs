using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Services;

namespace Server.Schema.Queries;

[QueryType]
public static class ChatboxQueries
{
    // public static List<Chatbox> GetAllChatboxes(DatabaseContext db)
    //     => db.Chatboxes.Include(c => c.Race).Include(c => c.Messages).ToList();
}