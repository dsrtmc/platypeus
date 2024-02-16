namespace Server.Schema.Types.Errors;

public class InvalidChatboxError
{
    public InvalidChatboxError(Guid? chatboxId)
    {
        Message = $"No chatbox found with id: \"{chatboxId}\"";
    }
    
    public string Message { get; set; }
}