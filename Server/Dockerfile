FROM fedora:latest

RUN dnf -y update && dnf -y install dotnet-sdk-8.0

WORKDIR /app

ARG BUILD_CONFIGURATION=Release

COPY . .

RUN dotnet restore "./Server.csproj" --disable-parallel
RUN dotnet public "./Server.csproj" -c $BUILD_CONFIGURATION -o /app --no-restore

EXPOSE 5000

ENTRYPOINT ["dotnet", "Server.dll"]
