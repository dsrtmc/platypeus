using Server.Models;
using Server.Services;

namespace Server.Schema.Queries;

public class UserQueries
{
    public List<User> GetAllUsers(DatabaseContext db)
    {
        return db.Users.ToList();
    }
}