using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
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
    [UseSorting]
    public static IQueryable<Score> GetScores(DatabaseContext db)
    {
        // TODO: Distinct on User, not necessarily here or make it opt-in
        return db.Scores.Include(s => s.User);
    }
    
    public static async Task<Score?> GetScore(Guid id, DatabaseContext db)
    {
        return await db.Scores.FindAsync(id);
    }
}