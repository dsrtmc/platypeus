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
    // TODO: move it to message mutations
    public static async Task<bool> SendMessage(
        Guid userId, Guid chatboxId, string content,
        DatabaseContext db, [Service] ITopicEventSender eventSender,
        CancellationToken cancellationToken
    ) {
        var user = await db.Users.FindAsync(userId);
        if (user is null)
            return false;

        var chatbox = await db.Chatboxes
            .Include(c => c.Messages)
                .ThenInclude(m => m.Author)
            .FirstOrDefaultAsync(c => c.Id == chatboxId, cancellationToken);
        if (chatbox is null)
            return false;

        var message = new Message
        {
            Author = user,
            Content = content
        };
        
        await eventSender.SendAsync(Helper.EncodeOnChatboxEventToken(chatboxId), chatbox, cancellationToken);
        
        chatbox.Messages.Add(message);
        
        await db.SaveChangesAsync(cancellationToken);
        
        return true;
    }
    
    public static async Task<Chatbox?> JoinChatbox(
        Guid userId, Guid chatboxId, DatabaseContext db,
        [Service] ITopicEventSender eventSender,
        CancellationToken cancellationToken
    ) {
        var user = await db.Users.FindAsync(userId);
        if (user is null)
            return null;

        var chatbox = await db.Chatboxes.Include(c => c.Messages).FirstOrDefaultAsync(c => c.Id == chatboxId, cancellationToken);
        if (chatbox is null)
            return null;

        await eventSender.SendAsync(Helper.EncodeOnChatboxEventToken(chatboxId), chatbox, cancellationToken);
        
        await db.SaveChangesAsync(cancellationToken);

        return chatbox;
    }
    
    // TODO: bad return value (???)
    // TODO: Not sure whether it shouldn't be a part of `RaceMutations`
    public static async Task<Race?> JoinRace(
        Guid? userId, Guid raceId, string? password,
        DatabaseContext db,
        [Service] ITopicEventSender eventSender,
        CancellationToken cancellationToken
    ) {
        if (userId is null)
            return null;
        
        var user = await db.Users.FindAsync(userId);
        if (user is null)
            return null;

        var race = await db.Races.Include(r => r.Racers).Include(r => r.Chatbox).FirstOrDefaultAsync(r => r.Id == raceId, cancellationToken);
        if (race is null)
            return null;

        // abcdefghijklmnopqrstuvwxyz
        if (race.Private && race.Password != password)
            return null;

        if (race.Racers.FirstOrDefault(racer => racer.Id == user.Id) is null)
            race.Racers.Add(user);

        await eventSender.SendAsync(Helper.EncodeOnRaceJoinLeaveToken(raceId), race, cancellationToken);
        
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
    
        var race = await db.Races.Include(r => r.Racers).FirstOrDefaultAsync(r => r.Id == raceId, cancellationToken);
        if (race is null)
            return null;

        if (race.Racers.FirstOrDefault(racer => racer.Id == user.Id) is not null)
            race.Racers.Remove(user);
    
        await eventSender.SendAsync(Helper.EncodeOnRaceJoinLeaveToken(raceId), race, cancellationToken);
        
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