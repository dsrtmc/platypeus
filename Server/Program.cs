using System.Security.Claims;
using System.Text;
using System.Text.Json.Nodes;
using HotChocolate.Execution;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using Server.Services;
using Server.Utilities;

var builder = WebApplication.CreateBuilder(args);

DotNetEnv.Env.Load();

builder.Services.AddDbContextPool<DatabaseContext>(o =>
{
    o.UseNpgsql(Environment.GetEnvironmentVariable("DATABASE_CONNECTION_STRING"));
});

// CORS setup
builder.Services.AddCors((o) =>
{
    o.AddPolicy("default", pb =>
    {
        pb.WithOrigins("http://localhost:3000") // TODO: .env variable
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

// JWT setup
builder.Services.AddAuthentication(o =>
{
    o.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    o.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
    o.RequireAuthenticatedSignIn = false;
}).AddJwtBearer(o =>
{
    o.TokenValidationParameters = new TokenValidationParameters
    {
        // TODO: add issuer/audience
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("ACCESS_TOKEN_SECRET")!)),
        ValidateIssuerSigningKey = true,
        ValidateIssuer = false, // probably true
        ValidateAudience = false, // probably true
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddAuthorization();
builder.Services.AddHttpContextAccessor();

// GraphQL setup
builder.Services.AddGraphQLServer()
    .AddTypes()
    .AddAuthorization()
    .RegisterDbContext<DatabaseContext>()
    .RegisterService<IHttpContextAccessor>();

var app = builder.Build();

app.UseHttpLogging();

app.UseCors("default");

app.UseAuthentication();
app.UseAuthorization();

if (app.Environment.IsDevelopment())
    IdentityModelEventSource.ShowPII = true;

// Write the GraphQL schema to a file
var executor = await app.Services.GetRequestExecutorAsync();
await File.WriteAllTextAsync("schema.graphql", executor.Schema.ToString());

// REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE
app.MapGet("/", () => "><((((*>");
app.MapGet("/secret", () => $"top secret").RequireAuthorization();

// TODO: make POST later, GET for easier development
app.MapGet("/refresh-token", (IHttpContextAccessor accessor, DatabaseContext db) =>
{
    // bad name
    var invalidJson = new JsonObject { ["ok"] = false, ["accessToken"] = "" };
    
    // TODO: make better validation and error handling
    var token = accessor.HttpContext!.Request.Cookies["jid"];
    if (token is null)
        return invalidJson;

    var data = Authentication.ValidateToken(token, Environment.GetEnvironmentVariable("REFRESH_TOKEN_SECRET")!);
    if (data is null)
        return invalidJson;

    if (!data.IsValid)
    {
        Console.WriteLine("data is invalid");
        if (data.Exception is not null)
            Console.WriteLine($"exception: {data.Exception.Message}");
        return invalidJson;
    }

    // The claim should never be empty and should always be a string
    var user = db.Users.Find(new Guid((data.Claims[ClaimTypes.NameIdentifier] as string)!));
    if (user is null)
        return invalidJson;

    // refresh the refresh token
    accessor.HttpContext.Response.Headers.SetCookie = $"jid={Authentication.CreateRefreshToken(user)}";

    return new JsonObject { ["ok"] = true, ["accessToken"] = Authentication.CreateAccessToken(user) };
});

app.MapGraphQL();

app.Run();