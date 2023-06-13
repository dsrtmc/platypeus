using Microsoft.EntityFrameworkCore;
using Server.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<DatabaseContext>(o =>
{
    o.UseNpgsql(Environment.GetEnvironmentVariable("DATABASE_CONNECTION_STRING"));
});

DotNetEnv.Env.Load();

var app = builder.Build();

app.MapGet("/", () => "Hello World!");
app.MapGet("/user-count", (DatabaseContext db) => $"{db.Users.Count()} users");

app.Run();
