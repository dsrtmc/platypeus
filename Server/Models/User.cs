using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Server.Services;

namespace Server.Models;

// TODO: private profile
[Index(nameof(Username), IsUnique = true)]
public class User : BaseEntity
{
    public User()
    {
        Username = "";
        Email = "";
        Password = "";
    }

    public User(string username, string email, string password)
    {
        Username = username;
        Email = email;
        Password = password;
    }
    
    public string Username { get; set; }

    public string Email { get; set; }

    public string GetEmail(IHttpContextAccessor accessor)
    {
        var claim = accessor.HttpContext!.User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier);
        if (claim is null || claim.Value.IsNullOrEmpty())
            return "";

        var userId = new Guid(claim.Value);
        if (userId != this.Id)
            return "";

        return this.Email;
    }
    
    /*
     * Works if we don't try and project it (which we can't do anyways because we're using paginated fields).
     * Assuming projections support nested pagination, then we'd have to use `db.Scores.Count` instead and
     * rely on data loaders, otherwise we're left with the N+1 problem.
     */
    public int GetScoreCount(DatabaseContext db)
    {
        return this.Scores.Count(s => s.UserId == this.Id);
    }
    
    public double GetAverageWpm(DatabaseContext db)
    {
        if (this.Scores.IsNullOrEmpty())
            return 0;
        
        return this.Scores.Average(s => s.Wpm);
    }

    [GraphQLIgnore]
    public string Password { get; set; }

    [UsePaging]
    public List<Score> Scores { get; set; } = new();
    
    [UsePaging]
    public List<Message> Messages { get; set; } = new();
}