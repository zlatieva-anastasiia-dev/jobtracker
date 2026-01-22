import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default function proxy(request: NextRequest) {
  const token = request.cookies.get("sb-access-token");
  const path = request.nextUrl.pathname;

  const isProtectedPath = path.startsWith("/jobs");
  const isAuthPage = path.startsWith("/login");

  if (isProtectedPath && !token) {
    console.log("Redirecting to /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (isAuthPage && token) {
    console.log("Redirecting to /jobs");
    return NextResponse.redirect(new URL("/jobs", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/jobs/:path*", "/login"],
};
