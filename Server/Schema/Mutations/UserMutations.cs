using System.Security.Claims;
using HotChocolate.Subscriptions;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Schema.Subscriptions;
using Server.Schema.Types.Errors;
using Server.Services;
using Server.Utilities;

namespace Server.Schema.Mutations;

[MutationType]
public static class UserMutations
{
    // TODO: bad return value (???)
    // TODO: Not sure whether it shouldn't be a part of `RaceMutations`
    public static async Task<Race?> JoinRace(
        Guid userId, Guid raceId, DatabaseContext db,
        [Service] ITopicEventSender eventSender,
        CancellationToken cancellationToken
    ) {
        var user = await db.Users.FindAsync(userId);
        if (user is null)
            return null;

        var race = await db.Races.Include(r => r.Racers).FirstOrDefaultAsync(r => r.ID == raceId, cancellationToken);
        if (race is null)
            return null;

        if (!race.Racers.Contains(user))
            race.Racers.Add(user);

        await eventSender.SendAsync($"{nameof(Subscription.OnRaceJoinLeave)}_{raceId}", race, cancellationToken);
        
        await db.SaveChangesAsync(cancellationToken);

        return race;
    }
    
    public static async Task<Race?> LeaveRace(
        Guid userId, Guid raceId, DatabaseContext db,
        [Service] ITopicEventSender eventSender,
        CancellationToken cancellationToken
    ) {
        var user = await db.Users.FindAsync(userId);
        if (user is null)
            return null;
    
        var race = await db.Races.Include(r => r.Racers).FirstOrDefaultAsync(r => r.ID == raceId, cancellationToken);
        if (race is null)
            return null;
        
        if (race.Racers.Contains(user))
            race.Racers.Remove(user);
    
        await eventSender.SendAsync($"{nameof(Subscription.OnRaceJoinLeave)}_{raceId}", race, cancellationToken);
        
        await db.SaveChangesAsync(cancellationToken);
    
        return race;
    }
    
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
        string? username, string? email, string? password,
        DatabaseContext db,
        IHttpContextAccessor accessor)
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
    
    public static async Task<MutationResult<User, InvalidFieldError, IncorrectCredentialsError>> Login(
        string? username, string? password,
        DatabaseContext db,
        IHttpContextAccessor accessor)
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