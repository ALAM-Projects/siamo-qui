import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

// Define the roles required for specific routes
const allowedRoles: { [key: string]: string } = {
  "/admin": "Admin", // Only users with 'admin' role can access /admin
  "/admin/posts": "Admin", // Only users with 'user' role can access /dashboard
};
export default withAuth(function middleware(req) {
  // Use NextAuth's getServerSession to get the session
  const session = req.nextauth.token;

  if (!session) {
    return NextResponse.redirect(new URL("/unauthorized", req.url)); // Redirect if no token
  }

  const token = session.accessToken as string;

  // Check if the token exists in the session and verify it
  if (!token) {
    return NextResponse.redirect(new URL("/unauthorized", req.url)); // Redirect if no token
  }

  // Check if the user's role is allowed to access the requested page
  const requestedPath = req.nextUrl.pathname;

  // If the page requires role-based access
  if (
    allowedRoles[requestedPath] &&
    session.role !== allowedRoles[requestedPath]
  ) {
    return NextResponse.redirect(new URL("/forbidden", req.url)); // Redirect to /forbidden if role is unauthorized
  }

  // // All checks passed, allow the request to continue
  return NextResponse.next();
});

// Define which routes this middleware applies to
export const config = {
  matcher: ["/admin/:path*"],
};
