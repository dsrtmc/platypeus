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

        Authentication.SendRefreshToken(Authentication.CreateRefreshToken(user), accessor.HttpContext!);
        
        return new LoginPayload(user, Authentication.CreateAccessToken(user));
    }

    public static bool Logout(DatabaseContext db, IHttpContextAccessor accessor)
    {
        // Clears the refresh token, effectively logging the user out
        // surely, surely, surely, surely, there's a better way to write that
        // DI is really funny to wrap my head around with static classes
        Authentication.SendRefreshToken("", accessor.HttpContext!);
        
        return true;
    }
    
    // Only for development purposes // TODO: create some funny internal function that'll do the same
    public static async Task<bool> RevokeRefreshToken(Guid userId, DatabaseContext db, IHttpContextAccessor accessor)
    {
        var user = await db.Users.FindAsync(userId);
        if (user is null)
            return false;

        user.TokenVersion++;
        await db.SaveChangesAsync();
        
        return true;
    }
}