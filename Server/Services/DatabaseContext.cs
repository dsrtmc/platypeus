using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Services;

internal class DatabaseContext : DbContext
{
    public DatabaseContext(DbContextOptions<DatabaseContext> options)
        : base(options) {}

    public DbSet<User> Users => Set<User>();
}