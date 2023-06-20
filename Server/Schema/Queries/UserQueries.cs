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
    public string Bye(IHttpContextAccessor accessor)
    {
        // Console.WriteLine("Bye resolver:");
        //
        // Console.WriteLine("Logging headers:");
        // foreach (var header in accessor.HttpContext!.Request.Headers)
        //     Console.WriteLine($"{header.Key}: {header.Value}");
        //
        // Console.WriteLine("Logging cookies:");
        // foreach (var cookie in accessor.HttpContext!.Request.Cookies)
        //     Console.WriteLine($"{cookie.Key}: {cookie.Value}");
        //
        var token = accessor.HttpContext!.Request.Headers.Authorization;
        Console.WriteLine(token);
        var result = Authentication.ValidateToken(token.ToString().Split(" ")[1], Environment.GetEnvironmentVariable("ACCESS_TOKEN_SECRET"));
        Console.WriteLine($"VAlidaiotn result: {result.IsValid}");
        //
        return "goodbye";
    }
    
    public List<User> GetAllUsers(DatabaseContext db)
    {
        return db.Users.ToList();
    }
}