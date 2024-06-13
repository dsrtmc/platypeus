using System.Security.Claims;
using HotChocolate.Authorization;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Services;

namespace Server.Schema.Queries;

[QueryType]
public static class UserQueries
{
    // a test resolver for making sure authorization works
    [Authorize]
    public static string Bye() => "goodbye";
    
    public static User? Me(DatabaseContext db, IHttpContextAccessor accessor)
    {
        var claim = accessor.HttpContext!.User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier);

        if (claim is null)
            return null;

        var userId = new Guid(claim.Value);
        
        return db.Users.Find(userId);
    }

    /*
     * Funny to have a separate method for that I think, but no way to achieve the desired query with the current
     * HotChocolate's filtering API as well as no support for the DISTINCT ON expression. This also fights
     * my attempt to enforce pagination for list types for clients, but oh well.
     */
    public static IEnumerable<Score?> GetUsersBestScores(Guid userId, string mode, IEnumerable<int> modeSettings, DatabaseContext db)
    {
        var user = db.Users.Include(u => u.Scores).FirstOrDefault(u => u.Id == userId);
        if (user is null)
            return new List<Score>();

        return modeSettings.Select(ms => user.Scores.Where(s => s.Mode == mode && s.ModeSetting == ms).MaxBy(s => s.Wpm));
    }

    public static IEnumerable<UserMonthlySummary?> GetUserMonthlyScoreSummaries(Guid userId, DatabaseContext db)
    {
        var user = db.Users.Include(u => u.Scores).FirstOrDefault(u => u.Id == userId);
        if (user is null)
            return new List<UserMonthlySummary>();

        return db.Scores.AsEnumerable().Where(s => s.UserId == user.Id).GroupBy(s => new { s.CreatedAt.Year, s.CreatedAt.Month }).Select(
            group => new UserMonthlySummary
            {
                Wpm = Convert.ToInt32(group.Average(g => g.Wpm)),
                RawWpm = Convert.ToInt32(group.Average(g => g.RawWpm)),
                Accuracy = Convert.ToSingle(group.Average(g => g.Accuracy)),
                Date = group.First().CreatedAt
            });
    }

    [UsePaging]
    // [UseProjection]
    [UseFiltering]
    [UseSorting]
    public static IQueryable<User> GetUsers(DatabaseContext db) => db.Users.Include(s => s.Scores);

    [UseFirstOrDefault]
    // [UseProjection]
    [UseFiltering]
    public static IQueryable<User> GetUser(DatabaseContext db) => db.Users.Include(s => s.Scores);
}
