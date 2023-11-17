using HotChocolate.Execution;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Logging;
using Server.Services;

var builder = WebApplication.CreateBuilder(args);

DotNetEnv.Env.Load();

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
builder.Services.AddGraphQLServer()
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

// REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE
app.MapGet("/", () => "><((((*>");
app.MapGet("/secret", () => $"top secret").RequireAuthorization();

app.MapGraphQL();

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
