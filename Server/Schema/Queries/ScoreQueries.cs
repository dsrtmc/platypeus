using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Services;

namespace Server.Schema.Queries;

[QueryType]
public static class ScoreQueries
{
    public static async Task<List<Score>> GetAllScores(DatabaseContext db)
    {
        return await db.Scores.Include(s => s.User).ToListAsync();
    }
    
    [UsePaging]
    [UseProjection]
    // filtering /<- correct order
    // sorting
    public static IQueryable<Score> GetScores(DatabaseContext db)
    {
        return db.Scores.Include(s => s.User);
    }
    
    public static async Task<Score?> GetScore(Guid id, DatabaseContext db)
    {
        return await db.Scores.FindAsync(id);
    }
}