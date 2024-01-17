namespace Server.Models;

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

    public List<Score> Scores { get; set; } = new();
}