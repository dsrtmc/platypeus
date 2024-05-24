using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;
using Server.Helpers;
using Server.Schema.Subscriptions;

namespace Server.Services;

public class RaceManagementService : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;
    
    public RaceManagementService(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            await FinishCompletedRaces(stoppingToken);
            await Task.Delay(TimeSpan.FromSeconds(1), stoppingToken);
        }
    }

    private async Task FinishCompletedRaces(CancellationToken stoppingToken)
    {
        using var scope = _serviceProvider.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<DatabaseContext>();
        var eventSender = scope.ServiceProvider.GetRequiredService<ITopicEventSender>();

        var now = DateTimeOffset.UtcNow;
        
        // removes time-based races after they've ended or any other races after 5 minutes
        var racesToFinish = await db.Races
            .Where(r => !r.Finished && r.StartTime.HasValue && (
                r.Mode == "time" && r.StartTime.Value.AddSeconds(r.ModeSetting) <= now ||
                r.Mode != "time" && r.StartTime.Value.AddMinutes(5) <= now))
            .ToListAsync(stoppingToken);
        
        Console.WriteLine($"The races to finish count: {racesToFinish.Count}");
        if (racesToFinish.Count > 0)
        {
            Console.WriteLine("WE ASDFJKLASDKLFJLFASDFJKLJASDFKL");
            Console.WriteLine("WE ASDFJKLASDKLFJLFASDFJKLJASDFKL");
            Console.WriteLine("WE ASDFJKLASDKLFJLFASDFJKLJASDFKL");
            Console.WriteLine("WE ASDFJKLASDKLFJLFASDFJKLJASDFKL");
            Console.WriteLine("WE ASDFJKLASDKLFJLFASDFJKLJASDFKL");
        }

        foreach (var race in racesToFinish)
        {
            race.Finished = true;
            // use the event sender here
            var message = new RaceEventMessage { Finished = true };
            await eventSender.SendAsync(Helper.EncodeOnRaceEventToken(race.Id), message, stoppingToken);
            Console.WriteLine($"We just finished the race with id: {race.Id}");
        }

        await db.SaveChangesAsync(stoppingToken);
    }
}