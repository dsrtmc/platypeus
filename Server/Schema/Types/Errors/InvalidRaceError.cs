namespace Server.Schema.Types.Errors;

public class InvalidRaceError
{
    public InvalidRaceError(Guid? raceId)
    {
        Message = $"No race with id \"{raceId}\".";
    }
    
    public string Message { get; set; }
}