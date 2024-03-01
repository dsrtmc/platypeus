namespace Server.Models;

public class Race : BaseEntity
{
    public User Host { get; set; } = null!;
    
    [UsePaging]
    public List<Racer> Racers { get; set; } = new();

    public string Mode { get; init; } = null!; // "time", "words", "quote"

    public int ModeSetting { get; init; } // "time" -> 15; "words" -> 25 etc.
    
    public string Content { get; init; } = null!;
    
    /// <summary>
    /// Specifies whether the race has started, which initiates the countdown before the race is running.
    /// </summary>
    public bool Started { get; set; }
    
    /// <summary>
    /// Specifies whether the race is running, which means the racers can type.
    /// </summary>
    public bool Running { get; set; }
    
    public bool Finished { get; set; }

    public bool Private { get; set; } = false;
    
    public string? Password { get; set; }

    public string Slug { get; set; } = null!;
    
    public DateTime? StartTime { get; set; }
    
    public Guid ChatboxId { get; set; }
    
    public Chatbox Chatbox { get; set; } = null!;
}