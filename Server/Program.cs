using System.Threading.RateLimiting;
using HotChocolate.Execution;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Logging;
using Server.Schema.Types.Directives;
using Server.Services;

var builder = WebApplication.CreateBuilder(args);

DotNetEnv.Env.Load();

// Database setup
builder.Services.AddDbContextPool<DatabaseContext>(o =>
{
    o.UseNpgsql(Environment.GetEnvironmentVariable("DATABASE_CONNECTION_STRING"));
});

// CORS setup
builder.Services.AddCors((o) =>
{
    o.AddPolicy("default", pb =>
    {
        pb.WithOrigins("http://localhost:3000") // TODO: .env variable
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

// TODO: rename
// TODO: see if there's an easy way to return an errors "sorry you're rate limited" rather than just making the user wait
// TODO: change values in prod and idk before deployment and stuff
// Rate limiting
var myOptions = new TokenBucketRateLimiterOptions
{
    AutoReplenishment = true,
    QueueLimit = 1,
    QueueProcessingOrder = QueueProcessingOrder.OldestFirst,
    ReplenishmentPeriod = TimeSpan.FromMinutes(1),
    TokenLimit = 1000,
    TokensPerPeriod = 100
};

const string tokenPolicy = "token";

builder.Configuration.GetSection(MyRateLimitOptions.MyRateLimit).Bind(myOptions);

builder.Services.AddRateLimiter(_ => _
    .AddTokenBucketLimiter(policyName: tokenPolicy, options =>
    {
        options.TokenLimit = myOptions.TokenLimit;
        options.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
        options.QueueLimit = myOptions.QueueLimit;
        options.ReplenishmentPeriod = myOptions.ReplenishmentPeriod;
        options.TokensPerPeriod = myOptions.TokensPerPeriod;
        options.AutoReplenishment = myOptions.AutoReplenishment;
    }));

// Cookies setup
builder.Services
    .AddAuthentication("default")
    .AddCookie("default", options => {
        options.Cookie.Name = Environment.GetEnvironmentVariable("AUTHENTICATION_COOKIE_NAME");
        // Only in development, change in prod; TODO: debug/prod .env variables
        options.Cookie.SecurePolicy = CookieSecurePolicy.None;
        // Apparently Chrome does not allow SameSite: None unless you're using the Secure flag with it
        options.Cookie.SameSite = SameSiteMode.Lax;
    });

builder.Services.AddAuthorization();
builder.Services.AddHttpContextAccessor();

// GraphQL setup
builder.Services
    .AddGraphQLServer()
    // TODO: read what this one does, what kind of validation it refers to
    .SetMaxAllowedValidationErrors(10)
        // TODO: I guess disable introspection, we don't need it, even role-based
    .AllowIntrospection(true) // !__prod__?
    .AddMaxExecutionDepthRule(10, skipIntrospectionFields: true)
    .ModifyRequestOptions(o =>
    {
        o.Complexity.Enable = true;
        o.Complexity.DefaultComplexity = 1;
        o.Complexity.DefaultResolverComplexity = 5;
        o.Complexity.MaximumAllowed = 1500;
        // TODO: consider persistent queries
        // TODO: maybe make it dev only? ↓
        o.IncludeExceptionDetails = true;
        // TODO: Configure the execution timeout for production
        // o.ExecutionTimeout = TimeSpan.FromMilliseconds(300);
    })
    .AddTypes()
    .AddAuthorization()
    .AddMutationConventions()
    .RegisterDbContext<DatabaseContext>()
    .RegisterService<IHttpContextAccessor>()
    .AddInMemorySubscriptions()
    .AddProjections()
    .AddFiltering()
    .AddSorting();

var app = builder.Build();

app.UseHttpLogging();

app.UseCors("default");

app.UseAuthentication();
app.UseAuthorization();

if (app.Environment.IsDevelopment())
    IdentityModelEventSource.ShowPII = true;

// Write the GraphQL schema to a file
var executor = await app.Services.GetRequestExecutorAsync();
await File.WriteAllTextAsync("schema.graphql", executor.Schema.ToString());

app.UseRateLimiter();

// REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE
app.MapGet("/", () => "><((((*>");
app.MapGet("/secret", () => $"top secret");

app.UseWebSockets();
app.MapGraphQL().RequireRateLimiting(tokenPolicy);

app.Run();

// JWT setup
// builder.Services.AddAuthentication(o =>
// {
//     o.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
//     o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//     o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//     o.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
//     o.RequireAuthenticatedSignIn = false;
// }).AddJwtBearer(o =>
// {
//     o.TokenValidationParameters = new TokenValidationParameters
//     {
//         // TODO: add issuer/audience
//         IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("ACCESS_TOKEN_SECRET")!)),
//         ValidateIssuerSigningKey = true,
//         ValidateIssuer = false, // probably true
//         ValidateAudience = false, // probably true
//         ClockSkew = TimeSpan.Zero
//     };
// });

// TODO: Move it somewhere
public class MyRateLimitOptions
{
    public const string MyRateLimit = "MyRateLimit";
    public int PermitLimit { get; set; } = 100;
    public int Window { get; set; } = 10;
    public int ReplenishmentPeriod { get; set; } = 2;
    public int QueueLimit { get; set; } = 2;
    public int SegmentsPerWindow { get; set; } = 8;
    public int TokenLimit { get; set; } = 10;
    public int TokenLimit2 { get; set; } = 20;
    public int TokensPerPeriod { get; set; } = 4;
    public bool AutoReplenishment { get; set; } = false;
};
