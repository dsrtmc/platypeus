using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.RateLimiting;
using DotNetEnv;
using HotChocolate.Execution;
using HotChocolate.Subscriptions;
using HotChocolate.Types.Pagination;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Server.Helpers;
using Server.Services;
using Server.Services.Email;
using Server.Services.Races;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

Env.Load();

var environment = builder.Configuration.GetValue<string>("ASPNETCORE_ENVIRONMENT");
var __dev__ = environment == "Development";

Helper.ValidateEnvironmentVariables();

Console.WriteLine("THIS IS THE POSTGRES DTAABASE STRING!!!!!!!!!!1111");
Console.WriteLine("THIS IS THE POSTGRES DTAABASE STRING!!!!!!!!!!1111"); Console.WriteLine("THIS IS THE POSTGRES DTAABASE STRING!!!!!!!!!!1111"); Console.WriteLine(Environment.GetEnvironmentVariable("DATABASE_URL")!.Trim('\'')); 
// Database setup
builder.Services.AddDbContextPool<DatabaseContext>(o =>
{
    o.UseNpgsql(Environment.GetEnvironmentVariable("DATABASE_URL")!.Trim('\''));
    o.EnableSensitiveDataLogging(__dev__);
});

// Mailer setup
builder.Services.AddTransient<IEmailService, EmailService>(_ => new EmailService
(
    Environment.GetEnvironmentVariable("GMAIL_USERNAME")!,
    Environment.GetEnvironmentVariable("GMAIL_PASSWORD")!
));

// Register the custom JSON serializer options
builder.Services.AddSingleton(new JsonSerializerOptions
{
    PropertyNameCaseInsensitive = true,
    ReferenceHandler = ReferenceHandler.Preserve
});

// Register the custom message serializer
builder.Services.AddSingleton<IMessageSerializer, CustomMessageSerializer>();

builder.Services.AddHostedService<RaceManagementService>();

// probably stupid :p
builder.Services.AddSingleton<IRaceFinisher, RaceFinisher>();

builder.Services.AddHttpLogging(_ => {});

// CORS setup
builder.Services.AddCors(o =>
{
    o.AddPolicy("default", pb =>
    {
        pb.WithOrigins(Environment.GetEnvironmentVariable("CORS_ORIGIN")!) // TODO: .env variable
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

// Cookies setup
builder.Services
    .AddAuthentication("default")
    .AddCookie("default", options => {
        options.Cookie.Name = Environment.GetEnvironmentVariable("AUTHENTICATION_COOKIE_NAME");
        options.Cookie.SecurePolicy = __dev__ ? CookieSecurePolicy.None : CookieSecurePolicy.Always;
        options.Cookie.SameSite = __dev__ ? SameSiteMode.Lax : SameSiteMode.Strict;
        options.Cookie.HttpOnly = !__dev__;
    });

// Forwarded headers setup
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
});

// Rate limiter setup
builder.Services.AddRateLimiter(options =>
{
    options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(httpContext =>
    {
        var ipAddress = httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";
        return RateLimitPartition.GetTokenBucketLimiter(ipAddress, _ => new TokenBucketRateLimiterOptions
        {
            AutoReplenishment = true,
            QueueLimit = 1,
            QueueProcessingOrder = QueueProcessingOrder.OldestFirst,
            ReplenishmentPeriod = TimeSpan.FromMinutes(1),
            TokenLimit = 200,
            TokensPerPeriod = 60
        });
    });
    
    options.RejectionStatusCode = 429;
});

builder.Services.AddAuthorization();
builder.Services.AddHttpContextAccessor();

// TODO: read on max byte size for documents?
// TODO: consider persistent queries
// TODO: read up on advanced operation complexity HotChocolate
// GraphQL setup
builder.Services
    .AddGraphQLServer()
    .SetMaxAllowedValidationErrors(10)
    .AllowIntrospection(__dev__)
    .AddMaxExecutionDepthRule(10, skipIntrospectionFields: true)
    .ModifyRequestOptions(o =>
    {
        o.Complexity.Enable = true;
        o.Complexity.DefaultComplexity = 1;
        o.Complexity.DefaultResolverComplexity = 5;
        o.Complexity.MaximumAllowed = 10000;
        o.IncludeExceptionDetails = __dev__;
        o.ExecutionTimeout = TimeSpan.FromSeconds(5);
    })
    .AddTypes()
    .AddAuthorization()
    .AddMutationConventions()
    .RegisterDbContext<DatabaseContext>()
    .RegisterService<IHttpContextAccessor>()
    .RegisterService<IEmailService>()
    .AddRedisSubscriptions(_ =>
    {
        var redisUrl = Environment.GetEnvironmentVariable("REDIS_URL")!;
        var uri = new Uri(redisUrl);
        var userInfo = uri.UserInfo.Split(':');
        var password = userInfo[1];
        var host = uri.Host;
        var port = uri.Port;
        var configuration = $"{host}:{port},password={password}";
        return ConnectionMultiplexer.Connect(configuration);
    })
    .SetPagingOptions(new PagingOptions
    {
        RequirePagingBoundaries = true
    })
    .AddProjections()
    .AddFiltering()
    .AddSorting();

var app = builder.Build();

app.UseHttpLogging();

app.UseCors("default");
app.UseForwardedHeaders();

app.UseAuthentication();
app.UseAuthorization();

// Write the GraphQL schema to a file
var executor = await app.Services.GetRequestExecutorAsync();
await File.WriteAllTextAsync("schema.graphql", executor.Schema.ToString());

app.UseRateLimiter();

app.MapGet("/secret", () => $"top secret");

app.UseWebSockets();
app.MapGraphQL();

app.Run();