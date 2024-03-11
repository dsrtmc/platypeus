import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const cookies = request.cookies.getAll();
  for (const cookie of cookies) {
    response.cookies.set(cookie.name, cookie.value);
  }

  return response;
}

// export const config = {
//   matcher: "/(.*)",
// };
