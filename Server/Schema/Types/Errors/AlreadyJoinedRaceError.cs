namespace Server.Schema.Types.Errors;

// TODO: Maybe don't use IDs in every error, they're supposed to be potentially helpful for normal people too, so I guess use usernames in some places?
public class AlreadyJoinedRaceError
{
    public AlreadyJoinedRaceError(Guid? raceId, Guid? userId)
    {
        Message = $"The user \"{userId}\" is already a part of race \"{raceId}\"";
    }
    
    public string Message { get; set; }
}