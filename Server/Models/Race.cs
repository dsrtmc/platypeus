namespace Server.Models;

public class Race : BaseEntity
{
    // TODO: think whether a long ID like a GUID is worth it, maybe base64-ify it
    // lowkey idk if needed
    public List<User> Racers { get; set; } = new();

    public bool Private { get; set; } = false;
    
    public string? Password { get; set; }
    
    public Chatbox Chatbox { get; set; } = null!;
}

/*
 * create a race
 * the race starts
 * every racer can type and increase their wpm, therefore a wpm stat that's somehow connected to the racer should change
*/