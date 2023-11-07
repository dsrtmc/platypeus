namespace Server.Schema.Types.Errors;

public class IncorrectCredentialsError
{
    public IncorrectCredentialsError() {}

    public string Message => "Incorrect credentials.";
}