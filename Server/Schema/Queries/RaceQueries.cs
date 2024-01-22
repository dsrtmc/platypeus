using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Services;

namespace Server.Schema.Queries;

[QueryType]
public static class RaceQueries
{
    public static async Task<List<RacerStatistics>> GetRacersStatistics(Guid raceId, DatabaseContext db)
    {
        return await db.RacerStatistics.Include(rs => rs.Racer).Where(rs => rs.Race.Id == raceId).ToListAsync();
    }

    [UsePaging]
    // [UseProjection] // TODO: Figure out how to use it while keeping `.Include()` (separate methods seems obvious)
    [UseFiltering]
    [UseSorting]
    public static IQueryable<Race> GetRaces(DatabaseContext db) => db.Races.Include(r => r.RacerStatistics).Include(r => r.Racers);
    
    public static List<Race> GetAllRaces(DatabaseContext db) => db.Races.Include(r => r.Racers).Include(r => r.Chatbox).ToList();
}