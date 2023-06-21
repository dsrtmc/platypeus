using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Services;
using Server.Utilities;

namespace Server.Schema.Mutations;

public record LoginPayload(User? User, string AccessToken);

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

    public static async Task<LoginPayload> Login(string username, DatabaseContext db, IHttpContextAccessor accessor)
    {
        var user = await db.Users.FirstOrDefaultAsync(u => u.Username == username);

        if (user is null)
            return new LoginPayload(null, "no access");

        //var test = new CookieOptions();

        accessor.HttpContext!.Response.Cookies.Append("jid", Authentication.CreateRefreshToken(user));
        
        return new LoginPayload(user, Authentication.CreateAccessToken(user));
    }
}