namespace Server.Schema.Types.Errors;

public class ListTooLargeError
{
    public ListTooLargeError(int maxAllowedSize)
    {
        Message = $"One of the provided list types is longer than the maximum allowed size: {maxAllowedSize}";
    }
    
    public string Message { get; set; }
}