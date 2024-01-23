namespace Server.Models;

public class Racer : BaseEntity
{
    public Race Race { get; set; } = null!;

    public User User { get; set; } = null!;
    
    public int Wpm { get; set; }
    
    public bool Finished { get; set; }
}