namespace Server.Models;

public class Racer : BaseEntity
{
    public Guid RaceId { get; set; }
    
    public Race Race { get; set; } = null!;

    public Guid UserId { get; set; }
    
    public User User { get; set; } = null!;
    
    public int Wpm { get; set; }
    
    public int WordsTyped { get; set; }
    
    public bool Finished { get; set; }
}

public class RacerDTO
{
    public Guid UserId { get; set; }
    
    public User User { get; set; } = null!;
    
    public int Wpm { get; set; }
    
    public int WordsTyped { get; set; }
    
    public bool Finished { get; set; }
}