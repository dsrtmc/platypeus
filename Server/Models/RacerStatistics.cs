namespace Server.Models;

public class RacerStatistics : BaseEntity
{
    public Race Race { get; set; } = null!;

    public User Racer { get; set; } = null!;
    
    public int Wpm { get; set; }
}