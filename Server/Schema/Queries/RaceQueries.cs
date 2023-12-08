using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Services;

namespace Server.Schema.Queries;

[QueryType]
public static class RaceQueries
{
    public static async Task<List<RacerStatistics>> GetRacersStatistics(Guid raceId, DatabaseContext db)
    {
        return await db.RacerStatistics.Where(rs => rs.Race.Id == raceId).ToListAsync();
    }
    
    public static List<Race> GetAllRaces(DatabaseContext db) => db.Races.Include(r => r.Racers).Include(r => r.Chatbox).ToList();
}