using Server.Models;
using Server.Services;

namespace Server.Schema.Queries;

[QueryType]
public static class ScoreQueries
{
    public static async Task<List<Score>> GetAllScores(DatabaseContext db)
    {
        return db.Scores.ToList();
    }
}