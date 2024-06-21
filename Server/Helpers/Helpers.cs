#region

using System.Text.RegularExpressions;
using Server.Schema.Subscriptions;
using Server.Schema.Types.Errors;
using Server.Schema.Types.Mutations;

#endregion

namespace Server.Helpers;

public static class Helper
{
    // TODO: Extend validation
    // TODO: prune resolver arguments (ChilliCream video) maybe idk
    /// <summary>
    /// Validates the provided input and returns a list of errors.
    /// </summary>
    /// <param name="input">The user's <see cref="LoginInput"/></param>
    /// <returns>A list containing all errors.</returns>
    public static List<object> Validate(this LoginInput input)
    {
        var errors = new List<object>();
        
        if (input.Username is null)
            errors.Add(new InvalidFieldError("username", input.Username, "Cannot be empty."));
        
        if (input.Password is null)
            errors.Add(new InvalidFieldError("password", input.Password, "Cannot be empty."));

        return errors;
    }
    
    /// <summary>
    /// Validates the provided input and returns a list of errors.
    /// </summary>
    /// <param name="input">The user's <see cref="RegisterInput"/></param>
    /// <returns>A list containing all errors.</returns>
    public static List<object> Validate(this RegisterInput input)
    {
        var errors = new List<object>();
        
        if (input.Username is null)
            errors.Add(new InvalidFieldError("username", input.Username, "Cannot be empty."));
        
        if (input.Username is not null && input.Username.Length < 3)
            errors.Add(new InvalidFieldError("username", input.Username, "Too short."));
        
        if (input.Email is null)
            errors.Add(new InvalidFieldError("email", input.Email, "Cannot be empty."));
        
        if (input.Email is not null && !IsValidEmail(input.Email))
            errors.Add(new InvalidFieldError("email", input.Email, "Invalid format."));
        
        if (input.Password is null)
            errors.Add(new InvalidFieldError("password", input.Password, "Cannot be empty."));
        
        if (input.Password is not null && input.Password.Length < 8)
            errors.Add(new InvalidFieldError("password", input.Password, "Too short."));

        return errors;
    }

    private static bool IsValidEmail(string email)
    {
        const string pattern = @"[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+"; // ihateregex.io/expr/email/

        return Regex.IsMatch(email, pattern);
    }
    
    public static void ValidateEnvironmentVariables()
    {
        var gmailUsername = Environment.GetEnvironmentVariable("GMAIL_USERNAME");
        if (gmailUsername is null or "")
            throw new InvalidOperationException("Environment variable GMAIL_USERNAME must be set.");
        
        var gmailPassword = Environment.GetEnvironmentVariable("GMAIL_PASSWORD");
        if (gmailPassword is null or "")
            throw new InvalidOperationException("Environment variable GMAIL_PASSWORD must be set.");
        
        var port = Environment.GetEnvironmentVariable("PORT");
        if (port is null or "")
            throw new InvalidOperationException("Environment variable PORT must be set.");
        
        var databaseUrl = Environment.GetEnvironmentVariable("DATABASE_URL");
        if (databaseUrl is null or "")
            throw new InvalidOperationException("Environment variable DATABASE_URL must be set.");
        
        var redisUrl = Environment.GetEnvironmentVariable("REDIS_URL");
        if (redisUrl is null or "")
            throw new InvalidOperationException("Environment variable REDIS_URL must be set.");

        var authenticationCookieName = Environment.GetEnvironmentVariable("AUTHENTICATION_COOKIE_NAME");
        if (authenticationCookieName is null or "")
            throw new InvalidOperationException("Environment variable AUTHENTICATION_COOKIE_NAME must be set.");
        
        var corsOrigin = Environment.GetEnvironmentVariable("CORS_ORIGIN");
        if (corsOrigin is null or "")
            throw new InvalidOperationException("Environment variable CORS_ORIGIN must be set.");
    }
    
    public static string EncodeOnRaceEventToken(Guid? raceId) => $"{nameof(RaceSubscriptions.OnRaceEvent)}_{raceId}";
    public static string EncodeOnChatboxEventToken(Guid? chatboxId) => $"{nameof(ChatboxSubscriptions.OnChatboxEvent)}_{chatboxId}";
}