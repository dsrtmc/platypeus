namespace Server.Schema.Types.Errors;

// TODO: maybe add slugs to error messages? hmm think about it
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
    
    public string Message { get; set; }
}