using System.Diagnostics;
using System.Security.Claims;
using System.Text.Json;
using System.Text.Json.Serialization;
using Server.Models;
using Server.Services;

namespace Server.Schema.Mutations;

[MutationType]
public static class ScoreMutations
{
    /// <summary>
    /// Creates a score and returns it. If the user was not authenticated, the score is not saved to the database.
    /// </summary>
    /// <param name="wpm">The score's Average WPM</param>
    /// <param name="rawWpm">The score's Raw WPM</param>
    /// <param name="mode">The test's mode</param>
    /// <param name="accuracy">The test's accuracy</param>
    /// <param name="wpmStats">The test's words-per-minute value</param>
    /// <param name="rawStats">The test's raw words-per-minute value</param>
    /// <param name="modeSetting">The test's mode's setting</param>
    /// <param name="language">The test's language</param>
    /// <param name="db">The database context</param>
    /// <param name="accessor">Provides access to the current <see cref="HttpContext"/>, if one is available</param>
    /// <returns>The created score</returns>
    public static async Task<Score> CreateScore(
        int wpm, int rawWpm, string mode, float accuracy, List<int> wpmStats, List<int> rawStats,
        int modeSetting, string language, DatabaseContext db,
        [Service] IHttpContextAccessor accessor
    )
    {
        var score = new Score
        {
            Wpm = wpm,
            RawWpm = rawWpm,
            Accuracy = accuracy,
            WpmStats = wpmStats,
            RawStats = rawStats,
            Mode = mode,
            ModeSetting = modeSetting,
            Language = language,
        };
        
        var context = accessor.HttpContext!;
        
        // No idea if `Identity` can ever be null; the type suggests so, but no idea how that can occur.
        if (!context.User.Identity!.IsAuthenticated)
            return score;
        
        var userId = new Guid(context.User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        score.User = (await db.Users.FindAsync(userId))!;
        
        await db.Scores.AddAsync(score);
        await db.SaveChangesAsync();
        return score;
    }
}