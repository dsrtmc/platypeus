namespace Server.Schema.Types.Errors;

public class InvalidFieldError
{
    public InvalidFieldError(string field, string? content, string? reason)
    {
        Message = $"The {field} \"{content}\" is invalid. {reason}";
    }
    
    public string Message { get; }
}