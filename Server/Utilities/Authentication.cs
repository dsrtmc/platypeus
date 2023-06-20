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
    
    private static string CreateToken(User user, string secret, DateTime expires)
    {
        // TODO: check secret for null in case bad .env
        var tokenHandler = new JsonWebTokenHandler();
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var descriptor = new SecurityTokenDescriptor
        {
            SigningCredentials = credentials,
            Claims = new Dictionary<string, object>
            {
                { ClaimTypes.NameIdentifier, user.ID },
            },
            Expires = expires
        };
        return tokenHandler.CreateToken(descriptor);
    }
}