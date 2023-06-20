import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  // forward the cookies
  const cookies = request.cookies.getAll();
  for (const cookie of cookies) {
    response.cookies.set(cookie.name, cookie.value); // idk why error
  }
  return response;
}

// export const config = {
//   matcher: "/(.*)",
// };
