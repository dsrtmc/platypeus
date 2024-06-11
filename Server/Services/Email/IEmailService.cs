namespace Server.Services.Email;

public interface IEmailService
{
    void SendEmail(EmailData data);
    
    Task SendEmailAsync(EmailData data);
}

public class EmailData
{
    public string RecipientEmail { get; set; } = null!;

    public string RecipientName { get; set; } = null!;

    public string Subject { get; set; } = null!;

    public string Body { get; set; } = null!;
}