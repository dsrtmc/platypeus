using HotChocolate.Authorization;
using Server.Models;
using Server.Services;
using Server.Utilities;

namespace Server.Schema.Queries;

[QueryType]
public class UserQueries
{
    public User? Me(DatabaseContext db)
    {
        // TODO: add token version in User model as well as token invalidation logic
        
        // TODO:
        // if (no authorization header)
        //     return null;
        //
        // let id = token.decode().id
        // return db.Users.Find(id)

        return null;
    }
    
    // a test resolver for making sure authorization works
    [Authorize]
    public string Bye(IHttpContextAccessor accessor) => "goodbye";
    
    public List<User> GetAllUsers(DatabaseContext db) => db.Users.ToList();
}