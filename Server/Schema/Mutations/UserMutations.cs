using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Server.Models;
using Server.Schema.Types.Errors;
using Server.Services;
using Server.Utilities;

namespace Server.Schema.Mutations;

[MutationType]
public static class UserMutations
{
    public static async Task<MutationResult<User, InvalidFieldError, UsernameTakenError>> Register(string? username, string? email, string? password, DatabaseContext db, IHttpContextAccessor accessor)
    {
        // TODO: better validation
        var errors = new List<object>();
        if (username is null)
            errors.Add(new InvalidFieldError("username", username));
        
        if (email is null)
            errors.Add(new InvalidFieldError("email", email));
        
        if (password is null)
            errors.Add(new InvalidFieldError("password", password));

        if (errors.Count > 0)
            return new(errors);
        
        if (db.Users.FirstOrDefault(u => u.Username == username) is not null)
            return new UsernameTakenError(username!);
        
        var hashedPassword = await PasswordHasher.Hash(password!);
        var user = new User
        {
            Username = username!,
            Email = email!,
            Password = hashedPassword
        };
        
        await db.Users.AddAsync(user);
        await db.SaveChangesAsync();
        
        await accessor.HttpContext!.SignInAsync("default", new ClaimsPrincipal(
            new ClaimsIdentity(new[] { new Claim(ClaimTypes.NameIdentifier, user.ID.ToString()) }, "default")
        ));
        
        return user;
    }
    
    public static async Task<MutationResult<User, InvalidFieldError, IncorrectCredentialsError>> Login(string? username, string? password, DatabaseContext db, IHttpContextAccessor accessor)
    {
        // TODO: better validation
        var errors = new List<object>();
        if (username is null)
            errors.Add(new InvalidFieldError("username", username));
        
        if (password is null)
            errors.Add(new InvalidFieldError("password", password));
        
        var user = await db.Users.FirstOrDefaultAsync(u => u.Username == username);

        if (user is null)
            errors.Add(new IncorrectCredentialsError());
        
        // TODO: I guess we can end the validation here? Then only check the password? hmm...
        if (errors.Count > 0)
            return new(errors);

        if (!await PasswordHasher.Verify(user!.Password, password!))
            return new(new IncorrectCredentialsError());

        await accessor.HttpContext!.SignInAsync("default", new ClaimsPrincipal(
            new ClaimsIdentity(new[] { new Claim(ClaimTypes.NameIdentifier, user.ID.ToString()) }, "default")
        ));

        return user;
    }

    public static async Task<bool> Logout(DatabaseContext db, IHttpContextAccessor accessor)
    {
        await accessor.HttpContext!.SignOutAsync();
        return true;
    }
}