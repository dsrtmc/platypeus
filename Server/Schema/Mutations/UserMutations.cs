using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Server.Models;
using Server.Services;
using Server.Utilities;

namespace Server.Schema.Mutations;

public record LoginPayload(string accessToken);

[MutationType]
public static class UserMutations
{
    public static User Register(string name, DatabaseContext db)
    {
        var user = new User
        {
            Username = name,
            Email = "qwe@qwe.com"
        };
        db.Users.Add(user); // do async
        db.SaveChanges();
        return user;
    }

    public static LoginPayload Login(string name, DatabaseContext db, IHttpContextAccessor accessor)
    {
        var user = db.Users.FirstOrDefault(u => u.Username == name);

        // refresh token
        if (user is not null)
            accessor.HttpContext.Response.Headers.SetCookie = $"jid={Authentication.CreateRefreshToken(user)}";
            
        // access token
        if (user is not null)
            return new LoginPayload(Authentication.CreateAccessToken(user));

        return new LoginPayload("no access");
    }
}