using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Services;

public class DatabaseContext : DbContext
{
    public DatabaseContext(DbContextOptions<DatabaseContext> options)
        : base(options) {}

    public override int SaveChanges(bool acceptAllChangesOnSuccess)
    {
        OnUpdate();
        return base.SaveChanges(acceptAllChangesOnSuccess);
    }
    
    public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
    {
        OnUpdate();
        return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
    }
    
    /// <summary>
    /// Updates every modified <see cref="BaseEntity"/>'s <see cref="BaseEntity.UpdatedAt"/> field upon saving the changes to the database.
    /// </summary>
    private void OnUpdate()
    {
        // I have a note saying that it changes UpdatedAt everytime we USE the entity
        // not sure if that's any bit real so I keep it here to verify it later
        var entries = ChangeTracker.Entries();
        var now = DateTime.UtcNow;
        foreach (var entry in entries)
        {
            if (entry.Entity is not BaseEntity entity) continue;

            if (entry.State == EntityState.Modified)
                entity.UpdatedAt = now;
        }
    }

    public DbSet<User> Users { get; set; } = null!;
    public DbSet<Score> Scores { get; set; } = null!;
    public DbSet<Race> Races { get; set; } = null!;
    public DbSet<Racer> Racers { get; set; } = null!;
    public DbSet<Chatbox> Chatboxes { get; set; } = null!;
    public DbSet<Message> Messages { get; set; } = null!;
}