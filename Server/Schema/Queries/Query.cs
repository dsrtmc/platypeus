using Server.Models;
using Server.Services;

namespace Server.Schema.Queries;

[QueryType]
public static class Query
{
    public static List<User> GetAllUsers(DatabaseContext db)
    {
        return db.Users.ToList();
    }

    public static User GetUser() => new User
    {
        Username = "test",
        Email = "test@test.com"
    };
}