using System.Security.Claims;
using HotChocolate.Authorization;
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
            return null;
        
        return db.Users.Find(new Guid(claim.Value));
    }

    public static User? GetUserByUsername(string username, DatabaseContext db)
    {
        return db.Users.FirstOrDefault(u => u.Username == username);
    }
    
    public static User? GetUserById(Guid id, DatabaseContext db)
    {
        return db.Users.Find(id);
    }
    
    // a test resolver for making sure authorization works
    [Authorize]
    public static string Bye(IHttpContextAccessor accessor) => "goodbye";
    
    public static List<User> GetAllUsers(DatabaseContext db) => db.Users.ToList();
}