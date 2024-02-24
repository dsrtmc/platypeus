namespace Server.Models;

public class Chatbox : BaseEntity
{
    [UsePaging]
    public List<Message> Messages { get; set; } = new();
}