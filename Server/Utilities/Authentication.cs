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
    public static void AssertValidToken(string token, string secret)
    {
        var tokenHandler = new JsonWebTokenHandler();
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
        var tokenValidationParameters = new TokenValidationParameters
        {
            IssuerSigningKey = key,
            ValidateIssuerSigningKey = true,
            ValidateAudience = false,
            ValidateIssuer = false
        };
        // lol surely that's not how you write code in C#
        var result = tokenHandler.ValidateToken(token, tokenValidationParameters);
        if (result.Exception is not null) throw result.Exception;
    }

    public static string CreateAccessToken(User user) =>
        CreateToken(user, Environment.GetEnvironmentVariable("ACCESS_TOKEN_SECRET")!, DateTime.Now.AddMinutes(15));
    
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
                { ClaimTypes.Name, "xd" },
            },
        };
        return tokenHandler.CreateToken(descriptor);
    }
}