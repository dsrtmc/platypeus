using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Server.Models;
using Server.Utilities;

namespace Server.Services;

public class DatabaseContext : DbContext
{
    public DatabaseContext(DbContextOptions<DatabaseContext> options)
        : base(options) {}
    
    /// <summary>
    /// <para>Applies <see cref="DateTimeOffsetConverter"/>'s conversion to every <see cref="DateTimeOffset"/> value to ensure data consistency.</para>
    /// <para>see: https://github.com/npgsql/npgsql/issues/4176</para>
    /// </summary>
    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
        configurationBuilder
            .Properties<DateTimeOffset>()
            .HaveConversion<DateTimeOffsetConverter>();
    }

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
        var entries = ChangeTracker.Entries();
        var now = DateTimeOffset.UtcNow;
        
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