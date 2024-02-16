namespace Server.Schema.Types.Errors;

public class InvalidUserError
{
    public InvalidUserError(Guid? userId)
    {
        Message = $"No such user with id: \"{userId}\"";
    }
    
    public string Message { get; set; }
}