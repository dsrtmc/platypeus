using HotChocolate.Execution;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Server.Services;
using Snapshooter.Xunit;

namespace Server.Tests;

public class UnitTest1
{
    [Fact]
    public async Task Test1()
    {
        var schema = await new ServiceCollection().AddGraphQLServer()
            .AddTypes()
            .AddAuthorization()
            .AddMutationConventions()
            .RegisterDbContext<DatabaseContext>()
            .RegisterService<IHttpContextAccessor>()
            .AddInMemorySubscriptions()
            .AddProjections()
            .AddFiltering()
            .AddSorting()
            .BuildSchemaAsync();
        
        schema.ToString().MatchSnapshot();
    }
}