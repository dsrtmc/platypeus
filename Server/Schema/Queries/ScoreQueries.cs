using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Services;

namespace Server.Schema.Queries;

[QueryType]
public static class ScoreQueries
{
    public static async Task<List<Score>> GetAllScores(DatabaseContext db)
    {
        return await db.Scores.ToListAsync();
    }
    
    public static async Task<Score?> GetScore(Guid id, DatabaseContext db)
    {
        return await db.Scores.FindAsync(id);
    }
}