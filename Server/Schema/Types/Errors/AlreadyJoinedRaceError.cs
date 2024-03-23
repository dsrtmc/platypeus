namespace Server.Schema.Types.Errors;

public class AlreadyJoinedRaceError
{
    public AlreadyJoinedRaceError(Guid? raceId, Guid? userId)
    {
        Message = $"The user \"{userId}\" is already a part of race \"{raceId}\"";
    }
    
    public AlreadyJoinedRaceError(Guid? raceId, string? username)
    {
        Message = $"The user \"{username}\" is already a part of race \"{raceId}\"";
    }
    
    public AlreadyJoinedRaceError(string? slug, string? username)
    {
        Message = $"The user \"{username}\" is already a part of race \"{slug}\"";
    }
    
    public string Message { get; set; }
}