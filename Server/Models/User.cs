namespace Server.Models;

public class User : BaseEntity
{
    public string Username { get; set; } = null!;

    public string Email { get; set; } = null!;
    
    public string Password { get; set; } = null!;

    // LEGACY; leftover after JWT // TODO: remove it
    public int TokenVersion { get; set; }
}