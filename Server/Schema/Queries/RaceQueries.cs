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
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public static IQueryable<Race> GetRaces(DatabaseContext db) => db.Races;
    
    public static List<Race> GetAllRaces(DatabaseContext db) => db.Races.Include(r => r.Racers).Include(r => r.Chatbox).ToList();
}