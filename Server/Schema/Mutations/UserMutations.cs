using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Server.Models;
using Server.Services;
using Server.Utilities;

namespace Server.Schema.Mutations;

public record LoginPayload(string AccessToken);

[MutationType]
public static class UserMutations
{
    public static async Task<User> Register(string username, string email, DatabaseContext db)
    {
        var user = new User
        {
            Username = username,
            Email = email
        };
        await db.Users.AddAsync(user);
        await db.SaveChangesAsync();
        return user;
    }

    public static LoginPayload Login(string username, DatabaseContext db, IHttpContextAccessor accessor)
    {
        var user = db.Users.FirstOrDefault(u => u.Username == username);

        if (user is null)
            return new LoginPayload("no access");
        
        accessor.HttpContext!.Response.Headers.SetCookie = $"jid={Authentication.CreateRefreshToken(user)}";
        
        return new LoginPayload(Authentication.CreateAccessToken(user));
    }
}