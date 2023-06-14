using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Server.Services;

var builder = WebApplication.CreateBuilder(args);

DotNetEnv.Env.Load();

builder.Services.AddDbContextPool<DatabaseContext>(o =>
{
    o.UseNpgsql(Environment.GetEnvironmentVariable("DATABASE_CONNECTION_STRING"));
});

// Set up the JWT
// TODO: move secret somewhere else
builder.Services.AddAuthentication("jwt").AddJwtBearer("jwt", o =>
{
    o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = "http://localhost:5053",
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

app.MapGet("/", () => "><((((*>");

// Setting up a basic development environment to help with authentication setup
// TODO: remove after implementing GraphQL

string CreateToken()
{
    var tokenHandler = new JwtSecurityTokenHandler();
    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("secret-sadflkjasdjklasdjksldjaskfljakadev-key"));
    var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
    var claims = new List<Claim>
    {
        new Claim(ClaimTypes.Name, "name")
    };
    var token = new JwtSecurityToken(claims: claims, expires: DateTime.Now.AddDays(1), signingCredentials: credentials);
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

app.Run();