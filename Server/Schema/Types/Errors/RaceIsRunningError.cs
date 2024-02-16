namespace Server.Schema.Types.Errors;

public class RaceIsRunningError
{
    public RaceIsRunningError()
    {
        Message = $"You are not allowed to perform this action while the race is running.";
    }
    
    public string Message { get; set; }
}