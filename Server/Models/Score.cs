using Microsoft.EntityFrameworkCore;
using Server.Services;

namespace Server.Models;

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

/// <summary>
/// Stores the monthly summary of a user's scores.
/// </summary>
public class UserMonthlySummary
{
    /// <summary>The average <see cref="Score.Wpm" /> of aggregated user's scores from a particular month.</summary>
    public int Wpm { get; set; }
    
    /// <summary>The average <see cref="Score.RawWpm" /> of aggregated user's scores from a particular month.</summary>
    public int RawWpm { get; set; }
    
    /// <summary>
    /// This date is likely to be assigned from the first score of that period, therefore only the month && the year matter.
    /// </summary>
    public DateTimeOffset Date { get; set; }
}
