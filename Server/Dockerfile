FROM fedora:latest

ARG BUILD_CONFIGURATION=Release

RUN dnf -y update && dnf -y install dotnet-sdk-8.0
RUN dnf -y install redis

WORKDIR /app

COPY Server.csproj . 

RUN dotnet restore "./Server.csproj" --disable-parallel

COPY . .
# COPY .env.production .env ???????????

RUN dotnet publish "./Server.csproj" -c $BUILD_CONFIGURATION -o /app --no-restore

COPY . .

ENV ASPNETCORE_URLS=http://+:8080
ENV PORT=8080

EXPOSE 8080

CMD dotnet Server.dll
