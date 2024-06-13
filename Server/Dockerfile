# Build stage
# TODO: terrible, it is windows, we do not want windows, we want linux :)
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /source
COPY . .
RUN dotnet restore "./Server.csproj" --disable-parallel
RUN dotnet public "./Server.csproj" -c release -o /app --no-restore

# Serve stage
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS build
WORKDIR /app
COPY --from=build /app ./

EXPOSE 5000

ENTRYPOINT ["dotnet", "Server.dll"]