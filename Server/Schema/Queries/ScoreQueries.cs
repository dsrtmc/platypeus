using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Services;

namespace Server.Schema.Queries;

// TODO: Enable projection for query types -> as of right now, I cannot do that because I'm opting for paginating every list type,
// TODO:↑which projection cannot handle. it also forces me to use annoying .Include()s everywhere
[QueryType]
public static class ScoreQueries
{
    [UsePaging]
    // [UseProjection]
    [UseFiltering]
    [UseSorting]
    // investigate the duplicated entries bug
    public static IQueryable<Score> GetScores(DatabaseContext db)
    {
        // TODO: Distinct on User, not necessarily here or make it opt-in
        return db.Scores.Include(s => s.User);
    }
    
    [UseSingleOrDefault]
    [UseProjection]
    [UseFiltering]
    public static IQueryable<Score?> GetScore(DatabaseContext db)
    {
        return db.Scores;
    }
    
    // TODO: The generated SQL is the worst thing I've ever seen. Doubt I can tackle that without HotChocolate supporting `distinct_on` or writing the SQL myself
    // ↑ see https://github.com/ChilliCream/graphql-platform/discussions/4848
    // While the EF Core's use of this raw SQL isn't amazing either, it's definitely much clearer
    [UsePaging]
    [UseFiltering]
    [UseSorting]
    public static IQueryable<Score> GetScoresForLeaderboard(DatabaseContext db)
    {
        return db.Scores.FromSql(
                // @$"SELECT DISTINCT ON (s.""UserId"") s.*
                //      FROM ""Scores"" s
                //      ORDER BY s.""UserId"", s.""Wpm"" DESC"
            @$"SELECT DISTINCT ON (s.""UserId"") s.*
            FROM (
                SELECT *
                FROM ""Scores""
                WHERE ""Mode"" = 'time' AND ""ModeSetting"" = 5
                ORDER BY ""Wpm"" DESC
            ) AS s
            ORDER BY s.""UserId"", s.""Wpm"" DESC"
            ).Include(s => s.User);
    }
}