using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Server.Models;

[Index(nameof(Username), IsUnique = true)]
public class User : BaseEntity
{
    public User()
    {
        Username = "";
        Email = "";
        Password = "";
    }

    public User(string username, string email, string password)
    {
        Username = username;
        Email = email;
        Password = password;
    }
    
    public string Username { get; set; }

    public string Email { get; set; }

    public string GetEmail(IHttpContextAccessor accessor)
    {
        var claim = accessor.HttpContext!.User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier);
        if (claim is null || claim.Value.IsNullOrEmpty())
            return "";

        var userId = new Guid(claim.Value);
        if (userId != this.Id)
            return "";

        return this.Email;
    }
    
    [GraphQLIgnore]
    public string Password { get; set; }

    [UsePaging]
    public List<Score> Scores { get; set; } = new();
    
    [UsePaging]
    public List<Message> Messages { get; set; } = new();
}