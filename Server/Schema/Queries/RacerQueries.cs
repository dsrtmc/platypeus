using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Services;

namespace Server.Schema.Queries;

[QueryType]
public class RacerQueries
{
    
    [UsePaging]
    [UseFiltering]
    [UseSorting]
    public static IQueryable<Racer> GetRacers(DatabaseContext db)
        => db.Racers.Include(r => r.User);
}