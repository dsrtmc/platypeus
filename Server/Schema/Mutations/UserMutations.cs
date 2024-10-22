using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Server.Helpers;
using Server.Models;
using Server.Schema.Types.Errors;
using Server.Schema.Types.Mutations;
using Server.Services;
using Server.Services.Email;
using Server.Utilities;

namespace Server.Schema.Mutations;

[MutationType]
public static class UserMutations
{
    /// <summary>
    /// Deletes the user from the database.
    /// </summary>
    /// <param name="userId">The ID of the user to be deleted.</param>
    /// <param name="db">Our database context</param>
    /// <returns><c>true</c> if the user is successfully removed from the database, <c>false</c> otherwise.</returns>
    public static async Task<bool> DeleteUser(Guid userId, DatabaseContext db)
    {
        var user = await db.Users.FindAsync(userId);
        
        if (user is null)
            return false;
        
        db.Users.Remove(user);
        await db.SaveChangesAsync();
        
        return true;
    }
    
    public static async Task<MutationResult<User, InvalidFieldError, UsernameTakenError, EmailTakenError>> Register(
        RegisterInput input,
        DatabaseContext db,
        IHttpContextAccessor accessor)
    {
        var errors = input.Validate();

        if (errors.Count > 0)
            return new(errors);
        
        if (db.Users.FirstOrDefault(u => u.Username == input.Username) is not null)
            return new UsernameTakenError(input.Username!);
        
        if (db.Users.FirstOrDefault(u => u.Email == input.Email) is not null)
            return new EmailTakenError(input.Email!);
        
        var hashedPassword = await PasswordHasher.Hash(input.Password!);
        var user = new User(input.Username!, input.Email!, hashedPassword);
        
        await db.Users.AddAsync(user);
        await db.SaveChangesAsync();
        
        await accessor.HttpContext!.SignInAsync("default", new ClaimsPrincipal(
            new ClaimsIdentity(new[] { new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()) }, "default")
        ), new AuthenticationProperties
        {
            IsPersistent = true,
            AllowRefresh = true,
            ExpiresUtc = DateTimeOffset.UtcNow.AddDays(120)
        });
        
        return user;
    }
    
    public static async Task<MutationResult<User, InvalidFieldError, IncorrectCredentialsError>> Login(
        LoginInput input,
        DatabaseContext db,
        IHttpContextAccessor accessor)
    {
        var errors = input.Validate();
        
        if (errors.Count > 0)
            return new(errors);
        
        var user = await db.Users.FirstOrDefaultAsync(u => u.Username == input.Username);

        if (user is null)
            return new IncorrectCredentialsError();

        if (!await PasswordHasher.Verify(user!.Password, input.Password!))
            return new IncorrectCredentialsError();

        await accessor.HttpContext!.SignInAsync("default", new ClaimsPrincipal(
            new ClaimsIdentity(new[] { new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()) }, "default")
        ));

        return user;
    }

    public static async Task<bool> Logout(DatabaseContext db, IHttpContextAccessor accessor)
    {
        // I don't know if it can ever happen, but it's funny to just always return true so I added a filler `if` statement.
        if (accessor.HttpContext is null)
            return false;
        
        await accessor.HttpContext!.SignOutAsync();
        return true;
    }
    
    public static bool SendHelloEmail(string email, string name, IEmailService emailService)
    {
        var data = new EmailData
        {
            Body = "hello, this is a test email :)",
            Subject = "test email from platypeus :)",
            RecipientEmail = email,
            RecipientName = name,
        };
        
        emailService.SendEmail(data);
        
        return true;
    }
}