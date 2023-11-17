using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Services;

namespace Server.Schema.Queries;

[QueryType]
public static class RaceQueries
{
    public static List<Race> GetAllRaces(DatabaseContext db) => db.Races.ToList();
}