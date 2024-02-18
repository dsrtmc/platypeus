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

    // TODO: wrong place for the TODO BUT read up on about paginated list types, it's simple when it comes to queries but how do we make sure that-
    // TODO: ↑ every single list type like `user { scores }` is paginated?
    public List<Score> Scores { get; set; } = new();
}