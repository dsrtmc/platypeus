namespace Server.Models;

// TODO: think whether a long ID like a GUID is worth it, maybe base64-ify it
public class Race : BaseEntity
{
    public User Host { get; set; } = null!;
    
    [UsePaging]
    public List<Racer> Racers { get; set; } = new();

    public string Mode { get; init; } = null!; // "time", "words", "quote"

    public int ModeSetting { get; init; } // "time" -> 15; "words" -> 25 etc.
    
    public string Content { get; init; } = null!;
    
    public bool Started { get; set; }
    
    public bool Running { get; set; }
    
    public bool Finished { get; set; }

    public bool Private { get; set; } = false;
    
    public string? Password { get; set; }
    
    public DateTime StartTime { get; set; }
    
    public Guid ChatboxId { get; set; }
    
    public Chatbox Chatbox { get; set; } = null!;
}