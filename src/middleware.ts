import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decryptData } from "./services/crypto/crypto";
import {
  authRoutes,
  frontendProtectedRoutes,
  frontendRoutes,
  protectedRoutesBasePath,
} from "./assets/constants/frontend-routes";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const redirectPath = req.nextUrl.searchParams.get("redirect");
  const isProtectedRoute = protectedRoutesBasePath.some((route) =>
    path.startsWith(route)
  );
  const isPublicAuthRoute = authRoutes.includes(path);

  const cookie = cookies().get("token")?.value;
  const session: { token: string; auth: boolean } = cookie
    ? JSON.parse(decryptData(cookie as string))
    : { token: "", auth: false };

  const getRoutePermissions = cookies().get("routePermissions")?.value;
  const routePermitted =
    getRoutePermissions &&
    JSON.parse(decryptData(getRoutePermissions)).includes(path);

  const isBlocked = () =>
    frontendProtectedRoutes.includes(path) && !routePermitted;

  if (isProtectedRoute && !session?.auth) {
    return NextResponse.redirect(
      new URL(
        `${frontendRoutes.LOGIN}?redirect=${encodeURIComponent(path)}`,
        req.nextUrl
      )
    );
  }

  if (session?.auth) {
    if (isPublicAuthRoute) {
      return NextResponse.redirect(
        new URL(
          redirectPath ? redirectPath : frontendRoutes.DASHBOARD,
          req.nextUrl
        )
      );
    }
    return NextResponse.next();
  } else {
    if (isPublicAuthRoute) {
      if (isBlocked()) {
        return NextResponse.redirect(
          new URL(frontendRoutes.LOGIN, req.nextUrl)
        );
      }
    }
  }

  if (!routePermitted) {
    const res = NextResponse.next();
    res.cookies.delete("routePermissions");
    return res;
  }

  // return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
