namespace Server.Models;

// TODO: think whether a long ID like a GUID is worth it, maybe base64-ify it
// TODO: maybe just don't have Racers && RacerStatistics? instead we could just do `public List<RacerStatistics> Racers` maybe?
// ^^^^: it seems like it'd make sense, and really simplify our code as well. i think it even makes sense for a `Racer` to hold his stats? idk
public class Race : BaseEntity
{
    public User Host { get; set; } = null!;
    
    public List<Racer> Racers { get; set; } = new();

    public string Mode { get; init; } = null!; // "time", "words", "quote"

    public int ModeSetting { get; init; } // "time" -> 15; "words" -> 25 etc.
    
    // TODO: maybe change name xd `race content` sounds shit
    public string Content { get; init; } = null!;
    
    public bool Running { get; set; }
    
    public bool Finished { get; set; }

    public bool Private { get; set; } = false;
    
    public string? Password { get; set; }
    
    public DateTime StartTime { get; set; }
    
    public Guid ChatboxId { get; set; }
    
    public Chatbox Chatbox { get; set; } = null!;
}

/*
 * create a race
 * the race starts
 * every racer can type and increase their wpm, therefore a wpm stat that's somehow connected to the racer should change
*/