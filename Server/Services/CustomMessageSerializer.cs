using System.Text.Json;
using HotChocolate.Subscriptions;

namespace Server.Services;

public class CustomMessageSerializer : IMessageSerializer
{
    private readonly JsonSerializerOptions _serializerOptions;

    public CustomMessageSerializer(JsonSerializerOptions serializerOptions)
    {
        _serializerOptions = serializerOptions;
    }

    public string CompleteMessage => "complete";

    public string Serialize<TMessage>(TMessage message)
    {
        return JsonSerializer.Serialize(message, _serializerOptions);
    }

    public MessageEnvelope<TMessage> Deserialize<TMessage>(string serializedMessage)
    {
        var message = JsonSerializer.Deserialize<TMessage>(serializedMessage, _serializerOptions);
        var kind = string.Equals(serializedMessage, CompleteMessage, StringComparison.OrdinalIgnoreCase)
            ? MessageKind.Completed
            : MessageKind.Default;
        return new MessageEnvelope<TMessage>(message, kind);
    }
}
