namespace Server.Schema.Mutations;

[MutationType]
public static class ScoreMutations
{
    public static async Task<bool> CreateScore(string averageWpm, string rawWpm, int time)
    {
        return true;
    }
}