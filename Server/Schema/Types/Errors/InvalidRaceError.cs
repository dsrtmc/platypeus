namespace Server.Schema.Types.Errors;

public class InvalidRaceError
{
    public InvalidRaceError(Guid id)
    {
        Message = $"No race with id \"{id}\".";
    }
    
    public string Message { get; set; }
}