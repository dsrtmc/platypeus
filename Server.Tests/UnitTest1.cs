#region

using HotChocolate.Execution;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Server.Services;
using Snapshooter.Xunit;

#endregion

namespace Server.Tests;

public class UnitTest1
{
    [Fact]
    public async Task SchemaChangeTest()
    {
        var schema = await TestServices.ExecutorProxy.GetSchemaAsync(default);
        schema.ToString().MatchSnapshot();
    }
    
    [Fact]
    public async Task FetchHello()
    {
        var result = await TestServices.ExecuteRequestAsync(b => b.SetQuery("{ hello }"));
        Assert.NotEmpty(result);
        result.MatchSnapshot();
    }
}

public static class TestServices
{
    static TestServices()
    {
        Services = new ServiceCollection()
            .AddLogging()
            .AddGraphQLServer()
            .AddTypes()
            .AddAuthorization()
            .AddMutationConventions()
            .RegisterDbContext<DatabaseContext>()
            .RegisterService<IHttpContextAccessor>()
            .AddInMemorySubscriptions()
            .AddProjections()
            .AddFiltering()
            .AddSorting().Services.AddSingleton(sp => new RequestExecutorProxy(
                sp.GetRequiredService<IRequestExecutorResolver>(), HotChocolate.Schema.DefaultName))
            .BuildServiceProvider();

        ExecutorProxy = Services.GetRequiredService<RequestExecutorProxy>();
    }
    
    public static IServiceProvider Services { get; }
    
    public static RequestExecutorProxy ExecutorProxy { get; }

    public static async Task<string> ExecuteRequestAsync(
        Action<IQueryRequestBuilder> configureRequest,
        CancellationToken cancellationToken = default)
    {
        await using var scope = Services.CreateAsyncScope();

        var requestBuilder = new QueryRequestBuilder();
        requestBuilder.SetServices(scope.ServiceProvider);
        configureRequest(requestBuilder);
        var request = requestBuilder.Create();

        await using var result = await ExecutorProxy.ExecuteAsync(request, cancellationToken);

        result.ExpectQueryResult();

        return result.ToJson();
    }
}
