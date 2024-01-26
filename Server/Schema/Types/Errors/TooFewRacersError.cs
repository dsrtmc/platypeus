namespace Server.Schema.Types.Errors;

public class TooFewRacersError
{
    public TooFewRacersError(Guid raceId)
    {
        Message = $"Race \"{raceId}\" has too few participants.";
    }
    
    public string Message { get; set; }
}