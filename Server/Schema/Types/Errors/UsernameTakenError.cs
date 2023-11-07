namespace Server.Schema.Types.Errors;

public class UsernameTakenError
{
    public UsernameTakenError(string username)
    {
        Username = username;
    }
    
    private string Username { get; set; }
    
    public string Message => $"The username \"{Username}\" is already taken.";
}