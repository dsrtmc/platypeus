using System.Security.Claims;
using HotChocolate.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
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

        if (claim is null || claim.Value.IsNullOrEmpty())
            return null;

        var userId = new Guid(claim.Value);
        
        return db.Users.Find(userId);
    }

    /*
     * Funny to have a separate method for that I think, but no way to achieve the desired query with the current
     * HotChocolate's filtering API as well as no support for the DISTINCT ON expression. This also fights
     * my attempt to enforce pagination for list types for clients, but oh well.
     */
    public static IEnumerable<Score?> GetUsersBestScores(Guid userId, DatabaseContext db)
    {
        var user = db.Users.Include(u => u.Scores).FirstOrDefault(u => u.Id == userId);
        if (user is null)
            return new List<Score>();

        int[] times = { 5, 15, 30, 60 };

        return times.Select(time => user.Scores.Where(s => s.ModeSetting == time).MaxBy(s => s.Wpm));
    }

    public static IEnumerable<Score?> GetUserMonthlyScoreSummaries(Guid userId, DatabaseContext db)
    {
        var user = db.Users.Include(u => u.Scores).FirstOrDefault(u => u.Id == userId);
        if (user is null)
            return new List<Score>();

        /*
         * We're returning artificial scores to display them in a chart or whatever we choose.
         * The only values here that are real are `Wpm` and `RawWpm`. Since `Score` mostly consists of non-nullable fields,
         * we just set them to random values and advise the client to ignore anything but `Wpm`, `RawWpm` and `CreatedAt`.
         */
        // TODO: it doesn't account for the year, would probably be a good idea to change that :)
        return db.Scores.AsEnumerable().Where(s => s.UserId == user.Id).GroupBy(s => s.CreatedAt.Month).Select(
            group => new Score
            {
                Id = default,
                Wpm = Convert.ToInt32(group.Average(g => g.Wpm)),
                RawWpm = Convert.ToInt32(group.Average(g => g.RawWpm)),
                Mode = "",
                ModeSetting = 0,
                Content = "",
                Language = "",
                Accuracy = 0,
                WpmStats = new List<int>(),
                RawStats = new List<int>(),
                UserId = user.Id,
                User = user,
                CreatedAt = group.First().CreatedAt,
                UpdatedAt = default
            });
    }

    [UsePaging]
    // [UseProjection]
    [UseFiltering]
    [UseSorting]
    // Not including messages because it would definitely be too heavy at one point, and there's no need to see someone's messages for now.
    public static IQueryable<User> GetUsers(DatabaseContext db) => db.Users.Include(s => s.Scores);

    [UseFirstOrDefault]
    // [UseProjection]
    [UseFiltering]
    public static IQueryable<User> GetUser(DatabaseContext db) => db.Users.Include(s => s.Scores);
}
