namespace Server.Models;

public abstract class BaseEntity
{
    protected BaseEntity()
    {
        var now = DateTime.UtcNow;
        CreatedAt = now;
        UpdatedAt = now;
    }

    public Guid ID { get; init; }

    public DateTime CreatedAt { get; init; }

    public DateTime UpdatedAt { get; set; }
}