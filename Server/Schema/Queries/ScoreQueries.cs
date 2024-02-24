using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Services;

namespace Server.Schema.Queries;

// TODO: Enable projection for query types -> as of right now, I cannot do that because I'm opting for paginating every list type,
// TODO:↑which projection cannot handle. it also forces me to use annoying .Include()s everywhere
[QueryType]
public static class ScoreQueries
{
    public static async Task<List<Score>> GetAllScores(DatabaseContext db)
    {
        return await db.Scores.Include(s => s.User).ToListAsync();
    }
    
    [UsePaging]
    // [UseProjection]
    [UseFiltering]
    [UseSorting]
    // DUPLICATION????????????? STUPID BUG
    public static IQueryable<Score> GetScores(DatabaseContext db)
    {
        // TODO: Distinct on User, not necessarily here or make it opt-in
        return db.Scores.Include(s => s.User);
    }
    
    [UsePaging]
    [UseFiltering]
    [UseSorting]
    [UseSingleOrDefault]
    public static IQueryable<Score?> GetScore(Guid id, DatabaseContext db)
    {
        // not sure whether the return type should be nullable if I'm using UseSingleOrDefault
        return db.Scores;
    }
    
    [UsePaging]
    // [UseProjection]
    [UseFiltering]
    [UseSorting]
    // DUPLICATION????????????? STUPID BUG
    // TODO: fix this stupid fucking distinct by thing
    public static IQueryable<Score> GetScoresForLeaderboard(DatabaseContext db)
    {
        return db.Scores;
    }
}