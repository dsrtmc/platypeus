namespace Server.Models;

// TODO: think whether a long ID like a GUID is worth it, maybe base64-ify it
public class Race : BaseEntity
{
    public User Host { get; set; } = null!;
    
    // lowkey idk if needed
    public List<User> Racers { get; set; } = new();
    
    public string Mode { get; init; } = null!; // "time", "words", "quote"

    public int ModeSetting { get; init; } // "time" -> 15; "words" -> 25 etc.
    
    // TODO: maybe change name xd `race content` sounds shit
    public string Content { get; init; } = null!;
    
    public bool Running { get; set; }
    
    public bool Finished { get; set; }

    public bool Private { get; set; } = false;
    
    public string? Password { get; set; }
    
    public Guid ChatboxId { get; set; }
    
    public Chatbox Chatbox { get; set; } = null!;
}

/*
 * create a race
 * the race starts
 * every racer can type and increase their wpm, therefore a wpm stat that's somehow connected to the racer should change
*/