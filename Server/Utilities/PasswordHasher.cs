using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Konscious.Security.Cryptography;

namespace Server.Utilities;

public static class PasswordHasher
{
    /// <summary>
    /// Stores indices of different parts of the encoded argon2 hash format.
    /// </summary>
    private enum EncodedParameters
    {
        /// <summary>The Argon2 implementation; can be one of: <see cref="Argon2i"/>, <see cref="Argon2d"/>, <see cref="Argon2id"/>.</summary>
        Type = 1,
        /// <summary>The Argon2 version; as of right now, hard-coded to 19 (v1.3).</summary>
        Version,
        /// <summary>The memory cost, iterations and the degree of parallelism.</summary>
        Options,
        /// <summary>The salt in Base64 format.</summary>
        Salt,
        /// <summary>The actual hash in Base64 format.</summary>
        Hash
    }

    /// <summary>
    /// Stores the algorithm configuration.
    /// </summary>
    public readonly struct HashOptions
    {
        public HashOptions() {}

        /// <summary>The length of the produces unencoded hash.</summary>
        public int HashLength { get; init; } = 32;
        
        /// <summary>The salt to protect the data against rainbow table attacks.</summary>
        /// <remarks>You shouldn't set your own salt. <see cref="PasswordHasher.Hash"/> will generate a random one by default.</remarks>
        public string? Salt { get; init; } = null;
        
        /// <summary>The length (in bytes) of the salt.</summary>
        public int SaltLength { get; init; } = 16;
        
        /// <summary>The amount of memory to be used by the hash function.</summary>
        public int MemorySize { get; init; } = 1024 * 1024;
        
        /// <summary>The amount of CPU threads to be used by the hash function.</summary>
        /// <remarks>Changing the setting affects the resulting hash</remarks>
        public int Parallelism { get; init; } = 12;
        
        /// <summary>The amount of iterations used by the hash function.</summary>
        public int Iterations { get; init; } = 2;

        public override string ToString() => JsonSerializer.Serialize(this);
    }
    
    /// <summary>
    /// Hashes and encodes the supplied <paramref name="password" />.
    /// </summary>
    /// <param name="password">The password to hash</param>
    /// <param name="hashOptions">Allows to specify different options for the hashing algorithm</param>
    /// <returns>An encoded representation of the supplied <paramref name="password"/></returns>
    public static async Task<string> Hash(string password, HashOptions? hashOptions = null)
    {
        var options = hashOptions ?? new HashOptions();
        using var argon2 = new Argon2id(Encoding.UTF8.GetBytes(password));
        
        // Only create a new salt if there's no custom salt provided
        var salt = options.Salt is not null ? Convert.FromBase64String(options.Salt) : CreateSalt(options.SaltLength);

        // Configure argon2 options
        argon2.Salt = salt;
        argon2.MemorySize = options.MemorySize;
        argon2.Iterations = options.Iterations;
        argon2.DegreeOfParallelism = options.Parallelism;

        /* For some reason,this causes an absurd memory leak that fixes itself from time to time.
         * I have absolutely no idea what causes it and there's likely no way for me to fix that. */
        var hash = await argon2.GetBytesAsync(options.HashLength);

        // Convert salt and hash into Base64 format
        var saltBase64 = Convert.ToBase64String(salt);
        var hashBase64 = Convert.ToBase64String(hash);
        
        // Return fully encoded argon2 hash
        return FormatHash(argon2, saltBase64, hashBase64);
    }

    /// <summary>
    /// Verifies the given hash and the password by taking the <paramref name="hash"/>'s salt and hashing the <paramref name="password"/> with that salt.
    /// </summary>
    /// <param name="hash">An encoded argon2 hash</param>
    /// <param name="password">The password to verify</param>
    /// <returns><c>true</c> if the password is correct, <c>false</c> otherwise</returns>
    /// <exception cref="InvalidHashFormatException">An error has occured while trying to parse the hash encoding</exception>
    public static async Task<bool> Verify(string hash, string password)
    {
        // Grab the salt and the hash from the provided encoded hash
        var decodedOldHash = hash.Split('$');
        
        string oldSalt;
        string oldHash;
        try
        {
            oldSalt = decodedOldHash[(int) EncodedParameters.Salt];
            oldHash = decodedOldHash[(int) EncodedParameters.Hash];
        }
        catch (IndexOutOfRangeException)
        {
            Console.WriteLine("index out of range");
            throw new InvalidHashFormatException(hash);
        }
        
        // Hash the given password using the provided hash's salt
        var encodedNewHash = await Hash(password, new HashOptions { Salt = oldSalt });
        
        // Grab just the hash from the new encoded hash
        var deserializedNewHash = encodedNewHash.Split('$');
        var newHash = deserializedNewHash[(int) EncodedParameters.Hash];

        return newHash == oldHash;
    }

    /// <summary>
    /// Encodes the hash in the conventional argon2 format.
    /// </summary>
    /// <param name="argon">The Argon2 object so as to access <see cref="EncodedParameters.Options"/></param>
    /// <param name="salt"><see cref="EncodedParameters.Salt"/></param>
    /// <param name="hash"><see cref="EncodedParameters.Hash"/></param>
    /// <returns></returns>
    private static string FormatHash(Argon2 argon, string salt, string hash)
    {
        // Version is v=19 because Argon2 1.3 => 0x13 == 19
        return $"${argon.GetType().Name.ToLower()}$v=19$m={argon.MemorySize},t={argon.Iterations},p={argon.DegreeOfParallelism}${salt}${hash}";
    }

    /// <summary>
    /// Creates a random salt.
    /// </summary>
    /// <param name="length">Sets the salt length</param>
    /// <returns>The <c>byte[]</c> containing the salt.</returns>
    private static byte[] CreateSalt(int length = 16)
    {
        var buffer = new byte[length];
        var rng = RandomNumberGenerator.Create();
        rng.GetBytes(buffer);
        return buffer;
    }
}

public class InvalidHashFormatException : Exception
{
    public InvalidHashFormatException(string hash)
    {
        throw new Exception($"Invalid hash format ({hash})");
    }
}