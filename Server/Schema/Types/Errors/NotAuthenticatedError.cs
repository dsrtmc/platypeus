namespace Server.Schema.Types.Errors;

public class NotAuthenticatedError
{
    public NotAuthenticatedError()
    {
        Message = "You must be logged in to create a race. Please log in or sign up to access this feature.";
    }
    
    public string Message { get; set; }
}