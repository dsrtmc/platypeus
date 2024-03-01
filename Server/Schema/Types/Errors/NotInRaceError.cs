namespace Server.Schema.Types.Errors;

public class NotInRaceError
{
    public NotInRaceError(Guid? raceId, string? username)
    {
        Message = $"User \"{username}\" is not in race \"{raceId}\".";
    }
    
    public string Message { get; set; }
}