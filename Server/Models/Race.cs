using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models;

public class Race : BaseEntity
{
    public User Host { get; set; } = null!;
    
    [UsePaging]
    public List<Racer> Racers { get; set; } = new();

    [NotMapped]
    public static int MaxAllowedRacers { get; set; } = 8;

    public string Mode { get; init; } = null!; // "time", "words", "quote"

    public int ModeSetting { get; init; } // "time" -> 15; "words" -> 25 etc.
    
    public string Content { get; init; } = null!;
    
    /// <summary>
    /// Specifies whether the race is running, which means the racers can type.
    /// </summary>
    public bool Running { get; set; }
    
    public bool Finished { get; set; }

    public bool Unlisted { get; set; } = false;

    public string Slug { get; set; } = null!;
    
    public DateTimeOffset? StartTime { get; set; }
    
    public Guid ChatboxId { get; set; }
    
    public Chatbox Chatbox { get; set; } = null!;
}