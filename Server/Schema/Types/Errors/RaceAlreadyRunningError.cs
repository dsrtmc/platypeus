namespace Server.Schema.Types.Errors;

public class RaceAlreadyRunningError
{
    public RaceAlreadyRunningError(Guid raceId)
    {
        Message = $"Race \"{raceId}\" is already running.";
    }

    public string Message { get; set; }
}