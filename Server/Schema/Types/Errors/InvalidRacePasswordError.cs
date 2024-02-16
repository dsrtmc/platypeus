namespace Server.Schema.Types.Errors;

public class InvalidRacePasswordError
{
    public InvalidRacePasswordError(Guid? raceId, string? password)
    {
        Message = $"Incorrect password \"{password}\" for race \"{raceId}\"";
    }
    
    public string Message { get; set; }
}