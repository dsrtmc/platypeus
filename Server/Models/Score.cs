namespace Server.Models;

// TODO: add more properties, as of right now I don't know what
// probably some test data like language, setting etc.
public class Score : BaseEntity
{
    public int AverageWpm { get; init; }

    public int RawWpm { get; init; }

    public string Mode { get; init; } = null!; // "time", "words", "quote"

    public string Language { get; init; } = null!; // "english" 🥸

    public int Time { get; init; }
}