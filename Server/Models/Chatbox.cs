namespace Server.Models;

// TODO: some very funny stuff happening in my SQL code, some IDs are nullable and some are not.
// TODO: also for some reason `User` has a `RaceID` column in SQL lol hahah, there needs to be an investigation.
public class Chatbox : BaseEntity
{
    // maybe graphql ignore here once i figure it out? lol
    // public Guid? RaceId { get; set; }
    
    // public Race? Race { get; set; } = null!;

    public List<Message> Messages { get; set; } = new();
}