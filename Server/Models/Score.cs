namespace Server.Models;

// TODO: add more properties, as of right now I don't know what
// probably some test data like language, setting etc.
public class Score : BaseEntity
{
    public int AverageWpm { get; init; }

    public int RawWpm { get; init; }

    public string Mode { get; init; } = null!; // "time", "words", "quote"

    public int ModeSetting { get; init; } // "time" -> 15; "words" -> 25 etc.

    public string Language { get; init; } = null!; // "english" 🥸

    public User? User { get; set; }
    
    [GraphQLIgnore]
    public Guid? UserID { get; set; }
}