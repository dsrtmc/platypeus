namespace Server.Models;

public class Race : BaseEntity
{
    // lowkey idk if needed
    public List<User> Racers { get; set; } = new();
}

/*
 * create a race
 * the race starts
 * every racer can type and increase their wpm, therefore a wpm stat that's somehow connected to the racer should change
*/