using Server.Models;
using Server.Services;

namespace Server.Schema.Mutations;

[MutationType]
public static class ScoreMutations
{
    public static async Task<Score> CreateScore(int averageWpm, int rawWpm, int time, string mode, string language, DatabaseContext db)
    {
        var score = new Score
        {
            AverageWpm = averageWpm,
            RawWpm = rawWpm,
            Time = time,
            Mode = mode,
            Language = language
        };
        await db.Scores.AddAsync(score);
        await db.SaveChangesAsync();
        return score;
    }
}