using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using Server.Models;

namespace Server.Utilities;

public static class Authentication
{
    public static TokenValidationResult? ValidateToken(string token, string secret)
    {
        var tokenHandler = new JsonWebTokenHandler();
        
        var tokenValidationParameters = new TokenValidationParameters
        {
            // TODO: add issuer/audience
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret)),
            ValidateIssuerSigningKey = true,
            ValidateAudience = false,
            ValidateIssuer = false,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero,
        };
        
        return tokenHandler.ValidateToken(token, tokenValidationParameters);
    }

    public static string CreateAccessToken(User user) =>
        CreateToken(user, Environment.GetEnvironmentVariable("ACCESS_TOKEN_SECRET")!, DateTime.Now.AddMinutes(5));
    
    public static string CreateRefreshToken(User user) =>
        CreateToken(user, Environment.GetEnvironmentVariable("REFRESH_TOKEN_SECRET")!, DateTime.Now.AddDays(31));

    public static void SendRefreshToken(string token, HttpContext context)
    {
        var cookieOptions = new CookieOptions
        {
            Path = "/refresh-token",
            HttpOnly = true
            // Secure = __prod__, // TODO
        };
        context.Response.Cookies.Append(Environment.GetEnvironmentVariable("REFRESH_TOKEN_COOKIE_NAME")!, token, cookieOptions);
    }

    private static string CreateToken(User user, string secret, DateTime expires)
    {
        // TODO: check secret for null in case bad .env
        var tokenHandler = new JsonWebTokenHandler();
        
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        
        var descriptor = new SecurityTokenDescriptor
        {
            SigningCredentials = credentials,
            Expires = expires,
            Claims = new Dictionary<string, object>
            {
                { ClaimTypes.NameIdentifier, user.ID },
                { ClaimTypes.Version, user.TokenVersion }
            }
        };
        
        return tokenHandler.CreateToken(descriptor);
    }
}