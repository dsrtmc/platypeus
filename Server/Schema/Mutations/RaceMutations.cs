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
        DatabaseContext db,
        [Service] IHttpContextAccessor accessor
    ) {
        var race = new Race
        {
            Racers = new List<User>()
        };
        
        db.Races.Add(race);
        await db.SaveChangesAsync();
        
        return race;
    }
}