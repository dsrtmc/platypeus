using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Schema.Subscriptions;
using Server.Services;

namespace Server.Schema.Mutations;

[MutationType]
public static class RaceMutations
{
    public static async Task<Race> CreateRace(
        bool isPrivate,
        string? password,
        DatabaseContext db,
        [Service] IHttpContextAccessor accessor
    ) {
        // if (unlisted) password = null; // could be funny to add that, seems like it'd make sense.
        var race = new Race
        {
            Racers = new List<User>(),
            Private = isPrivate,
            Chatbox = new Chatbox(),
            Password = password
        };
        
        db.Races.Add(race);
        await db.SaveChangesAsync();
        
        return race;
    }
}