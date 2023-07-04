namespace Server.Models;

// TODO: add more properties, as of right now I don't know what
// probably some test data like language, setting etc.
public class Score : BaseEntity
{
    public string AverageWpm { get; init; } = null!;

    public string RawWpm { get; init; } = null!;
    
    public int Time { get; init; }
}