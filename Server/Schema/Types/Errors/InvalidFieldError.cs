namespace Server.Schema.Types.Errors;

public class InvalidFieldError
{
    public InvalidFieldError(string field, string? content)
    {
        Message = $"The {field} \"{content}\" is invalid.";
    }
    
    public string Message { get; }
}