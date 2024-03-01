namespace Server.Schema.Types.Errors;

public class UsernameTakenError
{
    public UsernameTakenError(string username)
    {
        Message = $"The username \"{username}\" is already taken.";
    }
    
    public string Message { get; set; }
}