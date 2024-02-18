using System.Security.Claims;
using HotChocolate.Authorization;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Services;

namespace Server.Schema.Queries;

[QueryType]
public static class UserQueries
{
    public static User? Me(DatabaseContext db, IHttpContextAccessor accessor)
    {
        var claim = accessor.HttpContext!.User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier);

        if (claim is null)
        {
            Console.WriteLine("Me query has been called without an authentication cookie present.");
            return null;
        }
        
        Console.WriteLine("We get here ME QUERY");
        return db.Users.Find(new Guid(claim.Value));
    }

    // TODO: move to scores? idk we can just use GetScores with filtering but rn i can only visualise separate requests which sucks
    public static List<Score?> GetUsersBestScores(Guid userId, DatabaseContext db)
    {
        var user = db.Users.Include(u => u.Scores).FirstOrDefault(u => u.Id == userId);
        if (user is null)
            return new List<Score?>();

        int[] times = { 5, 15, 30, 60 };
        var scores = times.Select(time => user.Scores.Where(s => s.ModeSetting == time).MaxBy(s => s.Wpm)).ToList();

        return scores;
    }

    // TODO: also not needed, we can just GetUser({ where: { username: { eq: username } } });
    // the issue will be the lack of Projections but I'm sure there's a way to keep `.Include()`s
    public static User? GetUserByUsername(string username, DatabaseContext db)
    {
        return db.Users.Include(u => u.Scores).FirstOrDefault(u => u.Username == username);
    }
    
    public static User? GetUserById(Guid id, DatabaseContext db)
    {
        return db.Users.Find(id);
    }
    
    // a test resolver for making sure authorization works
    [Authorize]
    public static string Bye(IHttpContextAccessor accessor) => "goodbye";
    
    public static List<User> GetAllUsers(DatabaseContext db) => db.Users.ToList();
    
    [UsePaging]
    public static List<User> GetUsers(DatabaseContext db) => db.Users.ToList();
}
