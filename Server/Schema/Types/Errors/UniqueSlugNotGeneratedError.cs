namespace Server.Schema.Types.Errors;

public class UniqueSlugNotGeneratedError
{
    public UniqueSlugNotGeneratedError()
    {
        Message = "The server was unable to generate a unique slug for this race. Please, try again.";
    }
    
    public string Message { get; set; }
}