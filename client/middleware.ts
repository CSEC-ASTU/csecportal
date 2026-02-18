import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  const protectedRoutes = ["/dashboard"];
  const authRoutes = ["/login", "/register"];

  // Redirect to login if not authenticated and accessing protected routes
  if (
    !authToken &&
    protectedRoutes.some((route) => pathname.startsWith(route))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  let isVerified = false;
  let role = "MEMBER";

  // Fetch verification status from API if token exists
  if (authToken) {
    try {
      const res = await fetch("http://localhost:5500/api/auth/check-verified", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        isVerified = data.isVerified;
        role = data.role;
      } else {
        console.error("Verification API error", res.status);
      }
    } catch (err) {
      console.error("Verification API call failed", err);
    }

    // ❗ Prevent unverified users from accessing dashboard
    if (!isVerified && pathname.startsWith("/dashboard")) {
      const url = request.nextUrl.clone();
      url.pathname = "/login/verification";
      return NextResponse.redirect(url);
    }

    // ✅ Allow unverified users to access login and register
    if (!isVerified && authRoutes.includes(pathname)) {
      return NextResponse.next();
    }

    // ✅ Redirect verified users away from login/register
    if (isVerified && authRoutes.includes(pathname)) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard/home";
      return NextResponse.redirect(url);
    }

    // 🔐 Restrict access to administration routes
    if (pathname.startsWith("/dashboard/administration") && role === "MEMBER") {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard/home";
      return NextResponse.redirect(url);
    }
  }

  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()"
  );

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth|public).*)"],
};
