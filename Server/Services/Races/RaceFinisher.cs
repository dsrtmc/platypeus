using Microsoft.IdentityModel.Tokens;
using Server.Models;

namespace Server.Services.Races;

// not a good name methinks, RaceFinishingService? :)
public class RaceFinisher : IRaceFinisher
{
    private readonly Queue<Race> _races = new();
    
    public void Enqueue(Race race) => _races.Enqueue(race);

    public Race Dequeue() => _races.Dequeue();

    public Race? PeekQueue()
    {
        if (_races.IsNullOrEmpty())
            return null;
        
        return _races.Peek();   
    }

    public bool IsQueueEmpty() => _races.IsNullOrEmpty();
}