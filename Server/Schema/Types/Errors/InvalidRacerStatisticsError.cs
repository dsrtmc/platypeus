namespace Server.Schema.Types.Errors;

public class InvalidRacerStatisticsError
{
    public InvalidRacerStatisticsError(Guid userId, Guid raceId)
    {
        Message = $"No statistics found for user \"{userId}\" in race \"{raceId}\".";
    }
    
    public string Message { get; set; }
}