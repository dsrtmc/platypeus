namespace Server.Utilities;

public class RandomGenerator
{
    private static readonly Random Generator = new Random(Guid.NewGuid().GetHashCode());

    /// <summary>
    /// Returns a random string of size <c>n</c>
    /// </summary>
    /// <param name="n">The size of the sequence</param>
    /// <returns>A sequence of random characters</returns>
    public static string GenerateRandomString(int n)
    {
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var stringChars = new char[n];

        lock (Generator)
        {
            for (var i = 0; i < n; i++)
                stringChars[i] = chars[Generator.Next(chars.Length)];
        }

        return new string(stringChars);
    }
}