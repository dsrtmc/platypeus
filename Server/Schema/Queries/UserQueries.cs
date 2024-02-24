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

    // TODO: move to scores? idk we can just use GetScores with filtering but rn i can only visualise separate requests which sucks
    // TODO: THIS IS SO FUNNY
    public static List<Score?> GetUsersBestScores(Guid userId, DatabaseContext db)
    {
        var user = db.Users.Include(u => u.Scores).FirstOrDefault(u => u.Id == userId);
        if (user is null)
            return new List<Score?>();

        int[] times = { 5, 15, 30, 60 };
        var scores = times.Select(time => user.Scores.Where(s => s.ModeSetting == time).MaxBy(s => s.Wpm)).ToList();

        return scores;
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
    public static IQueryable<User> GetUser(DatabaseContext db) => db.Users;
}
