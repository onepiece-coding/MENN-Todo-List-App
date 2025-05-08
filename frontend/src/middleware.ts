import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // Pages Protect
  if (pathname.startsWith("/tasks")) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Determine which paths the middleware applies to
export const config = { matcher: ["/tasks/:path*"] };
