using System.Runtime.CompilerServices;
using Server.Schema.Subscriptions;
using Server.Schema.Types.Errors;
using Server.Schema.Types.Mutations;

namespace Server.Helpers;

public static class Helper
{
    // TODO: Extend validation before deployment
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
            errors.Add(new InvalidFieldError("username", input.Username));
        
        if (input.Password is null)
            errors.Add(new InvalidFieldError("password", input.Password));

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
            errors.Add(new InvalidFieldError("username", input.Username));
        
        if (input.Email is null)
            errors.Add(new InvalidFieldError("email", input.Email));
        
        if (input.Password is null)
            errors.Add(new InvalidFieldError("password", input.Password));

        return errors;
    }

    public static string EncodeOnRaceEventToken(Guid? raceId) => $"{nameof(RaceSubscriptions.OnRaceEvent)}_{raceId}";
    public static string EncodeOnChatboxEventToken(Guid? chatboxId) => $"{nameof(ChatboxSubscriptions.OnChatboxEvent)}_{chatboxId}";
}