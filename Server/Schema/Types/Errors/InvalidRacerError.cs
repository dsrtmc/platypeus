namespace Server.Schema.Types.Errors;

public class InvalidRacerError
{
    public InvalidRacerError(Guid? raceId, Guid? userId)
    {
        Message = $"User \"{userId}\" is not a part of the race \"{raceId}\".";
    }
    
    public InvalidRacerError(Guid? raceId, string? username)
    {
        Message = $"User \"{username}\" is not a part of the race \"{raceId}\".";
    }
    
    public string Message { get; set; }
}