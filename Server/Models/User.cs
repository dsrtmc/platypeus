namespace Server.Models;

public class User : BaseEntity
{
    public string Username { get; set; } = null!;

    public string Email { get; set; } = null!;
    
    public string Password { get; set; } = null!;
    
    // TODO: Probably not needed? idk we can just do a field resolver if it's possible with hot chocolate (no way it's not)
    public List<Score> Scores { get; set; } = new();
}