namespace Server.Models;

public class RacerStatistics : BaseEntity
{
    public User Racer { get; set; } = null!;
    
    public int Wpm { get; set; }
}