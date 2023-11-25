namespace Server.Models;

public class Message : BaseEntity
{
    public User Author { get; set; } = null!;

    public Chatbox Chatbox { get; set; } = null!;

    public string Content { get; set; } = null!;
}