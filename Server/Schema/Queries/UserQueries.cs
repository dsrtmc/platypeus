using System.Security.Claims;
using HotChocolate.Authorization;
using Microsoft.Extensions.Primitives;
using Microsoft.IdentityModel.JsonWebTokens;
using Server.Models;
using Server.Services;
using Server.Utilities;

namespace Server.Schema.Queries;

[QueryType]
public class UserQueries
{
    public User? Me(DatabaseContext db, IHttpContextAccessor accessor)
    {
        // TODO: add token version in User model as well as token invalidation logic
        var tokenHandler = new JsonWebTokenHandler();
        
        var authorizationHeader = accessor.HttpContext!.Request.Headers.Authorization;
        if (authorizationHeader == StringValues.Empty)
            return null;
        
        // TODO: error handling here
        var jwt = authorizationHeader.ToString().Split(" ")[1];
        var token = tokenHandler.ReadJsonWebToken(jwt);

        var claim = token.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier);
        if (claim is null)
            return null;
        
        var id = claim.Value;

        return db.Users.Find(new Guid(id));
    }
    
    // a test resolver for making sure authorization works
    [Authorize]
    public string Bye(IHttpContextAccessor accessor) => "goodbye";
    
    public List<User> GetAllUsers(DatabaseContext db) => db.Users.ToList();
}