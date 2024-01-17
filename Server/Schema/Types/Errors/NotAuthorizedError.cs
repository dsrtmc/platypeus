namespace Server.Schema.Types.Errors;

public class NotAuthorizedError
{
    public NotAuthorizedError()
    {
        Message = $"You are not authorized to perform this action.";
    }
    
    public string Message { get; set; }
}