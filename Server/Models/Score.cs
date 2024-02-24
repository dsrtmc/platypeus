using Microsoft.EntityFrameworkCore;
using Server.Services;

namespace Server.Models;

// TODO: add more properties, as of right now I don't know what
public class Score : BaseEntity
{
    public Score()
    {
    }
    
    public int Wpm { get; init; }

    public int RawWpm { get; init; }

    public string Mode { get; init; } = null!; // "time", "words", "quote"

    public int ModeSetting { get; init; } // "time" -> 15; "words" -> 25 etc.

    public string Content { get; init; } = null!;

    public string Language { get; init; } = null!; // "english" 🥸
    
    public float Accuracy { get; init; }

    public List<int> WpmStats { get; set; } = new();

    public List<int> RawStats { get; set; } = new();
    
    public Guid? UserId { get; set; }

    public User? User { get; set; }
}
