// here for now, no idea whether it's good to keep it here forever
let accessToken = "";

export function getAccessToken(): string {
  return accessToken;
}

export function setAccessToken(token: string): void {
  accessToken = token;
}
