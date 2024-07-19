using System.Globalization;
using System.Reflection;
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
using Server.Middleware;
using Server.Services;
using Server.Services.Email;
using Server.Services.Races;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

Env.Load();

var environment = builder.Configuration.GetValue<string>("ASPNETCORE_ENVIRONMENT");
var __dev__ = environment == "Development";
Console.WriteLine($"The environment we are in: {environment}");

Helper.ValidateEnvironmentVariables();

// Database setup
builder.Services.AddDbContextPool<DatabaseContext>(o =>
{
    var postgresUrl = Environment.GetEnvironmentVariable("DATABASE_URL")!.Trim('\'');
    var uri = new Uri(postgresUrl);
    var userInfo = uri.UserInfo.Split(':');
    var userId = userInfo[0];
    var password = userInfo[1];
    var host = uri.Host;
    var port = uri.Port;
    var database = uri.PathAndQuery.Trim('/');
    var configuration = $"Server={host};Port={port};Password='{password}';Username='{userId}';Database={database}";
        
    o.UseNpgsql(configuration);
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
        pb.WithOrigins(Environment.GetEnvironmentVariable("CORS_ORIGIN")!)
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
        options.Cookie.SameSite = SameSiteMode.Lax;
        options.Cookie.HttpOnly = true;
        options.Cookie.Domain = Environment.GetEnvironmentVariable("COOKIE_DOMAIN");
        options.Cookie.IsEssential = true;
        options.Cookie.MaxAge = TimeSpan.FromDays(90);
        options.ExpireTimeSpan = TimeSpan.FromDays(90);
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
            TokenLimit = 150,
            TokensPerPeriod = 45
        });
    });
    
    options.RejectionStatusCode = 429;
    options.OnRejected = (context, _) =>
    {
        if (context.Lease.TryGetMetadata(MetadataName.RetryAfter, out var retryAfter))
        {
            context.HttpContext.Response.Headers.RetryAfter =
                ((int) retryAfter.TotalSeconds).ToString(NumberFormatInfo.InvariantInfo);
        }

        context.HttpContext.Response.StatusCode = StatusCodes.Status429TooManyRequests;
        context.HttpContext.Response.WriteAsync("Too many requests. Please try again later.");

        return new ValueTask();
    };
});

builder.Services.AddAuthorization();
builder.Services.AddHttpContextAccessor();

// TODO: read on max byte size for documents?
// TODO: read up on advanced operation complexity HotChocolate
// GraphQL setup
builder.Services
    .AddGraphQLServer()
    .SetMaxAllowedValidationErrors(10)
    .AllowIntrospection(__dev__)
    .AddHttpRequestInterceptor<IntrospectionInterceptor>()
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
        var redisUrl = Environment.GetEnvironmentVariable("REDIS_URL")!.Trim('\'');
        var uri = new Uri(redisUrl);
        var userInfo = uri.UserInfo.Split(':');
        var password = userInfo[1];
        var host = uri.Host;
        var port = uri.Port;
        var configuration = $"{host}:{port},password={password}";

        var options = ConfigurationOptions.Parse(configuration);
        
        Console.WriteLine($"REDIS CONFIGURATION STRING: {configuration}");
        try
        {
            return ConnectionMultiplexer.Connect(options);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"ConnectionMultiplexer.Connect threw an exception: {ex.Message}");
        }

        return ConnectionMultiplexer.Connect(options);
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
