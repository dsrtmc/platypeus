using Server.Models;

namespace Server.Services.Races;

public interface IRaceFinisher
{
    void Enqueue(Race race);
    
    Race Dequeue();
    
    bool IsQueueEmpty();
    
    Race? PeekQueue();
}