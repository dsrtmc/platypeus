using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Schema.Subscriptions;
using Server.Services;

namespace Server.Schema.Queries;

[QueryType]
public static class RaceQueries
{
    [UsePaging]
    // [UseProjection]
    [UseFiltering]
    [UseSorting]
    public static IQueryable<Race> GetRaces(DatabaseContext db)
        => db.Races
            .Include(r => r.Host)
            .Include(r => r.Racers)
                .ThenInclude(r => r.User);

    [UseSingleOrDefault]
    [UseProjection]
    [UseFiltering]
    public static IQueryable<Race?> GetRace(DatabaseContext db)
    {
        // not sure whether the return type should be nullable if I'm using UseSingleOrDefault
        return db.Races;
    }
}