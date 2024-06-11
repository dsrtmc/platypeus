using System.Threading.Tasks.Dataflow;
using MailKit.Net.Smtp;
using MimeKit;
using MimeKit.Text;

namespace Server.Services.Email;

public class EmailService : IEmailService
{
    private readonly string _smtpServer = "smtp.gmail.com";
    private readonly int _smtpPort = 587;
    private readonly string _smtpUser;
    private readonly string _smtpPass;

    public EmailService(string username, string password)
    {
        _smtpUser = username;
        _smtpPass = password;
    }
    
    public Task SendEmailAsync(EmailData data)
    {
        throw new NotImplementedException();
    }

    public void SendEmail(EmailData data)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress("platypeus", "platypeus@platypeus.platypeus"));
        message.To.Add(new MailboxAddress(data.RecipientName, data.RecipientEmail));
        message.Subject = data.Subject;
        message.Body = new TextPart(TextFormat.Html)
        {
            Text = data.Body
        };

        using var smtp = new SmtpClient();
        smtp.Connect(_smtpServer, _smtpPort, MailKit.Security.SecureSocketOptions.StartTls);
        smtp.Authenticate(_smtpUser, _smtpPass);
        smtp.Send(message);
        smtp.Disconnect(true);
    }
}