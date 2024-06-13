using HotChocolate.Subscriptions;
using Server.Helpers;
using Server.Schema.Subscriptions;

namespace Server.Services.Races;

// i don't like the name of these classes but it's fine
public class RaceManagementService : BackgroundService
{
    private readonly IRaceFinisher _raceFinisher;
    private readonly ITopicEventSender _eventSender;
    private readonly IServiceScopeFactory _serviceScopeFactory;
    
    public RaceManagementService(IRaceFinisher raceFinisher, ITopicEventSender eventSender, IServiceScopeFactory serviceScopeFactory)
    {
        _raceFinisher = raceFinisher;
        _eventSender = eventSender;
        _serviceScopeFactory = serviceScopeFactory;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            await FinishCompletedRaces(stoppingToken);
            
            await Task.Delay(TimeSpan.FromMilliseconds(500), stoppingToken);
        }
    }

    private async Task FinishCompletedRaces(CancellationToken stoppingToken)
    {
        var raceToFinishIds = new List<Guid>();
    
        var race = _raceFinisher.PeekQueue();
        while (race is not null)
        {
            // Ensure race has a valid start time
            if (race.StartTime is null)
                break; // Exit loop (should never happen)
        
            var now = DateTimeOffset.UtcNow;
            var endTime = race.StartTime.Value.AddSeconds(race.Mode == "time" ? race.ModeSetting : 60);

            // No need to check further if the first race in queue is not to be finished.
            if (endTime > now) break;
            
            raceToFinishIds.Add(race.Id);
            _raceFinisher.Dequeue();
            race = _raceFinisher.PeekQueue();
        }

        // If there are races to finish, update their status
        if (raceToFinishIds.Count == 0) return;
        
        // Use IServiceScopeFactory to access DbContext
        using var scope = _serviceScopeFactory.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<DatabaseContext>();

        var racesToFinish = db.Races.Where(r => raceToFinishIds.Contains(r.Id));
        
        foreach (var raceToFinish in racesToFinish)
        {
            raceToFinish.Finished = true;
            
            foreach (var racer in raceToFinish.Racers)
                racer.Finished = true;
            
            var message = new RaceEventMessage { Finished = true, Racers = raceToFinish.Racers };
            await _eventSender.SendAsync(Helper.EncodeOnRaceEventToken(raceToFinish.Id), message, stoppingToken);
        }
        
        await db.SaveChangesAsync(stoppingToken);
        
        Console.WriteLine($"We just finished {raceToFinishIds.Count} races.");
    }
}