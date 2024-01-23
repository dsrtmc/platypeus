using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Services;

namespace Server.Schema.Queries;

[QueryType]
public static class RaceQueries
{
    public static async Task<List<Racer>> GetRacers(Guid raceId, DatabaseContext db)
    {
        return await db.Racers.Include(r => r.User).Where(r => r.Race.Id == raceId).ToListAsync();
    }

    [UsePaging]
    // [UseProjection] // TODO: Figure out how to use it while keeping `.Include()` (separate methods seems obvious)
    [UseFiltering]
    [UseSorting]
    public static IQueryable<Race> GetRaces(DatabaseContext db) => db.Races.Include(r => r.Racers);
    
    public static List<Race> GetAllRaces(DatabaseContext db) => db.Races.Include(r => r.Racers).Include(r => r.Chatbox).ToList();
}