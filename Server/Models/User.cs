using Microsoft.EntityFrameworkCore;

namespace Server.Models;

[Index(nameof(Username), IsUnique = true)]
public class User : BaseEntity
{
    public User(string username, string email, string password)
    {
        Username = username;
        Email = email;
        Password = password;
    }
    
    public string Username { get; set; }

    public string Email { get; set; }
    
    public string Password { get; set; }

    [UsePaging]
    public List<Score> Scores { get; set; } = new();
    
    [UsePaging]
    public List<Message> Messages { get; set; } = new();
}