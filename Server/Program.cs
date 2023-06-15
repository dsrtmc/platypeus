using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
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

builder.Services.AddGraphQLServer()
    .AddTypes()
    .RegisterDbContext<DatabaseContext>()
    .RegisterService<IHttpContextAccessor>();

builder.Services.AddHttpContextAccessor();

// Set up the JWT
// TODO: move secret somewhere else
builder.Services.AddAuthentication("jwt").AddJwtBearer("jwt", o =>
{
    o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuers = new List<string>
        {
            "http://localhost:5053",
            "https://localhost:7128"
        },
        ValidAudiences = new List<string>
        {
            "http://localhost:58384",
            "https://localhost:44356",
            "https://localhost:7218",
            "http://localhost:5053"
        },
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("secret-sadflkjasdjklasdjksldjaskfljakadev-key")),
        ValidateIssuer = true,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true
    };
});
builder.Services.AddAuthorization();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

// debug debug debug
IdentityModelEventSource.ShowPII = true;

app.Use((ctx, next) =>
{
    string? authorization = ctx.Request.Headers.Authorization;
    if (authorization is null) throw new Exception("Authorization header not present");
    
    try
    {
        var token = authorization.Split(" ")[1];
        Authentication.AssertValidToken(token, Environment.GetEnvironmentVariable("ACCESS_TOKEN_SECRET")!);
    }
    catch
    {
        throw new Exception("Incorrect token - not authenticated");
    }
    
    return next();
});

app.MapGet("/", () => "><((((*>");

// Setting up a basic development environment to help with authentication setup
// TODO: remove after implementing GraphQL
string CreateToken()
{
    var tokenHandler = new JwtSecurityTokenHandler();
    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("ACCESS_TOKEN_SECRET")));
    var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
    var claims = new List<Claim>
    {
        new Claim(ClaimTypes.Name, "name")
    };
    var token = new JwtSecurityToken(claims: claims, expires: DateTime.Now.AddDays(1), signingCredentials: credentials, issuer: "http://localhost:5053");
    return tokenHandler.WriteToken(token);
}

app.MapGet("/login", async (HttpContext ctx) =>
{
    var claims = new List<Claim> { new Claim("usr", "qwe") };
    var identity = new ClaimsIdentity(claims, "cookie");
    var user = new ClaimsPrincipal(identity);
     
    // figure out how signing in with jwt would work
    // await ctx.SignInAsync("jwt", user);
    return "logged in";
});
app.MapGet("/get-token", CreateToken);
app.MapGet("/secret", (ClaimsPrincipal user) => $"top secret").RequireAuthorization();

app.MapGraphQL();

app.Run();