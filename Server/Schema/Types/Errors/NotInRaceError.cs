namespace Server.Schema.Types.Errors;

public class NotInRaceError
{
    public NotInRaceError(Guid? raceId, string? username)
    {
        Message = $"User \"{username}\" is not in race \"{raceId}\".";
    }
    
    public NotInRaceError(string? slug, string? username)
    {
        Message = $"User \"{username}\" is not in race \"{slug}\".";
    }
    
    public string Message { get; set; }
}