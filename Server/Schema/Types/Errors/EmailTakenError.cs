namespace Server.Schema.Types.Errors;

public class EmailTakenError
{
    public EmailTakenError(string email)
    {
        Message = $"The email \"{email}\" is already taken.";
    }
    
    public string Message { get; set; }
}