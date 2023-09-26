using System.Security.Claims;
using System.Text;
using Konscious.Security.Cryptography;
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
    public static async Task<User> Register(string username, string email, string password, DatabaseContext db, IHttpContextAccessor accessor)
    {
        var hashedPassword = await PasswordHasher.Hash(password);
        var user = new User
        {
            Username = username,
            Email = email,
            Password = hashedPassword
        };
        await db.Users.AddAsync(user);
        await db.SaveChangesAsync();
        await accessor.HttpContext!.SignInAsync("default", new ClaimsPrincipal(
            new ClaimsIdentity(new[] { new Claim(ClaimTypes.NameIdentifier, user!.ID.ToString()) }, "default")
        ));
        return user;
    }

    public static async Task<User?> Login(string username, string password, DatabaseContext db, IHttpContextAccessor accessor)
    {
        // TODO: better validation
        var user = await db.Users.FirstOrDefaultAsync(u => u.Username == username);

        if (user is null)
        {
            Console.WriteLine("user is null");
            return null;
        }

        if (!await PasswordHasher.Verify(user.Password, password))
        {
            Console.WriteLine("password is incorrect");
            return null;
        }

        await accessor.HttpContext!.SignInAsync("default", new ClaimsPrincipal(
            new ClaimsIdentity(new[] { new Claim(ClaimTypes.NameIdentifier, user!.ID.ToString()) }, "default")
        ));

        return user;
    }

    public static async Task<bool> Logout(DatabaseContext db, IHttpContextAccessor accessor)
    {
        await accessor.HttpContext!.SignOutAsync();
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