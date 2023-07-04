using System.Diagnostics;
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
    .AddMutationConventions()
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
    var resultJson = new JsonObject
    {
        ["accessToken"] = "",
        ["error"] = "",
    };
    
    // TODO: make better validation and error handling
    var token = accessor.HttpContext!.Request.Cookies[Environment.GetEnvironmentVariable("REFRESH_TOKEN_COOKIE_NAME")!];
    if (token is null)
    {
        resultJson["error"] = "token is null";
        return resultJson;
    }

    var result = Authentication.ValidateToken(token, Environment.GetEnvironmentVariable("REFRESH_TOKEN_SECRET")!);
    if (result is null)
    {
        resultJson["error"] = "token validation result is null";
        return resultJson;
    }
    
    if (!result.IsValid)
    {
        resultJson["error"] = "token validation result is invalid";
        if (result.Exception is not null)
            Console.WriteLine($"Token validation exception: {result.Exception.Message}");
        
        return resultJson;
    }
    
    // The claims should never be empty and should always be strings
    var userIdClaim = (string)result.Claims[ClaimTypes.NameIdentifier];
    var tokenVersionClaim = (int)result.Claims[ClaimTypes.Version];
    
    var user = db.Users.Find(new Guid(userIdClaim!));
    if (user is null)
    {
        resultJson["error"] = "cannot find user with such an id";
        return resultJson;
    }

    if (user.TokenVersion != tokenVersionClaim)
    {
        resultJson["error"] = "incorrect token version";
        return resultJson;
    }

    // refresh the refresh token
    Authentication.SendRefreshToken(Authentication.CreateRefreshToken(user), accessor.HttpContext!);

    resultJson["accessToken"] = Authentication.CreateAccessToken(user);
    return resultJson;
});

app.MapGraphQL();

app.Run();