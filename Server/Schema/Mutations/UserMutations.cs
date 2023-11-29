using System.Security.Claims;
using HotChocolate.Subscriptions;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Server.Helpers;
using Server.Models;
using Server.Schema.Subscriptions;
using Server.Schema.Types.Errors;
using Server.Schema.Types.Mutations;
using Server.Services;
using Server.Utilities;

namespace Server.Schema.Mutations;

[MutationType]
public static class UserMutations
{
    public static async Task<bool> DeleteUser(Guid userId, DatabaseContext db)
    {
        var user = await db.Users.FindAsync(userId);
        
        if (user is null)
            return false;
        
        db.Users.Remove(user);
        await db.SaveChangesAsync();
        
        return true;
    }
    
    public static async Task<MutationResult<User, InvalidFieldError, UsernameTakenError>> Register(
        RegisterInput input,
        DatabaseContext db,
        IHttpContextAccessor accessor)
    {
        var errors = input.Validate();

        if (errors.Count > 0)
            return new(errors);
        
        if (db.Users.FirstOrDefault(u => u.Username == input.Username) is not null)
            return new UsernameTakenError(input.Username!);
        
        var hashedPassword = await PasswordHasher.Hash(input.Password!);
        var user = new User(input.Username!, input.Email!, hashedPassword);
        
        await db.Users.AddAsync(user);
        await db.SaveChangesAsync();
        
        await accessor.HttpContext!.SignInAsync("default", new ClaimsPrincipal(
            new ClaimsIdentity(new[] { new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()) }, "default")
        ));
        
        return user;
    }
    
    public static async Task<MutationResult<User, InvalidFieldError, IncorrectCredentialsError>> Login(
        LoginInput input,
        DatabaseContext db,
        IHttpContextAccessor accessor)
    {
        var errors = input.Validate();
        
        var user = await db.Users.FirstOrDefaultAsync(u => u.Username == input.Username);

        if (user is null)
            errors.Add(new IncorrectCredentialsError());
        
        // TODO: I guess we can end the validation here? Then only check the password? hmm...
        if (errors.Count > 0)
            return new(errors);

        if (!await PasswordHasher.Verify(user!.Password, input.Password!))
            return new(new IncorrectCredentialsError());

        await accessor.HttpContext!.SignInAsync("default", new ClaimsPrincipal(
            new ClaimsIdentity(new[] { new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()) }, "default")
        ));

        return user;
    }

    public static async Task<bool> Logout(DatabaseContext db, IHttpContextAccessor accessor)
    {
        await accessor.HttpContext!.SignOutAsync();
        return true;
    }
}