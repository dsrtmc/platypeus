using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Server.Utilities;

/// <summary>
/// Converts any DateTimeOffset value to its UTC representation.
/// Helps avoid Npgsql's exception `Cannot write DateTimeOffset with Offset=01:00:00 to PostgreSQL type 'timestamp with time zone'`
/// </summary>
public class DateTimeOffsetConverter : ValueConverter<DateTimeOffset, DateTimeOffset>
{
    public DateTimeOffsetConverter()
        : base(
            d => d.ToUniversalTime(),
            d => d.ToUniversalTime())
    {
    }
}
