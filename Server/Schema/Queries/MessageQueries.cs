using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Services;

namespace Server.Schema.Queries;

[QueryType]
public static class MessageQueries
{
    [UsePaging]
    [UseFiltering]
    [UseSorting]
    public static IQueryable<Message> GetMessages(DatabaseContext db)
        => db.Messages
            .Include(m => m.Chatbox)
            .Include(m => m.Author);
}