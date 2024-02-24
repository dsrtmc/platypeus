using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Services;

namespace Server.Schema.Queries;

[QueryType]
public static class ChatboxQueries
{
    [UsePaging]
    // [UseProjection]
    [UseFiltering]
    [UseSorting]
    public static IQueryable<Chatbox> GetChatboxes(DatabaseContext db)
        => db.Chatboxes
            .Include(c => c.Messages)
                .ThenInclude(m => m.Author);
}