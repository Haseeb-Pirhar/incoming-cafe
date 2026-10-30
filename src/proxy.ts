import { NextResponse, type NextRequest } from "next/server";
import { getAuthCookies } from "@/utils/cookies";
import { createHeaders } from "./api";
import { API_URL } from "./constants";

// Bina login ke open
const PUBLIC_PATHS = [
  "/",
  "/dashboard",
  "/terms-and-conditions",
  "/privacy-policy",
];

// Sirf logged-out users (login/signup)
const NO_AUTH_PATHS = [
  "/auth/login",
  "/auth/store-login",
  "/signup",
  "/signup/verify-otp",
  "/signup/complete-profile",
  "/forgot-password",
];

const isPathMatch = (pathname: string, paths: string[]) =>
  paths.some((path) => pathname === path || pathname.startsWith(`${path}/`));

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)", { source: "/" }],
};

export const proxy = async (request: NextRequest) => {
  const authCookies = await getAuthCookies();
  const pathname = request.nextUrl.pathname;
  const headers = new Headers(request.headers);
  const token = authCookies?.accessToken;
  const user = authCookies?.user;

  headers.set("x-current-path", pathname);

  if (
    request.headers.get("next-action") !== null ||
    pathname.startsWith("/api-v1")
  ) {
    return NextResponse.next();
  }

  // Proxy API
  if (pathname.startsWith("/api")) {
    const headersInit = await createHeaders(request.headers);
    const proxyHeaders = new Headers(headersInit);

    const contentType = proxyHeaders.get("Content-Type");
    const fetchHeaders: Record<string, string> = {
      Authorization: proxyHeaders.get("Authorization") ?? "",
    };
    // FormData pe Content-Type mat force karo (boundary toot jati hai)
    if (contentType && !contentType.includes("multipart/form-data")) {
      fetchHeaders["Content-Type"] = contentType;
    } else if (!contentType) {
      // only set json if body is not FormData-ish; leave unset when missing
      // fetchHeaders["Content-Type"] = "application/json";
    }

    return fetch(new URL(`${pathname}${request.nextUrl.search}`, API_URL), {
      body: request.body,
      method: request.method,
      headers: fetchHeaders,
      // @ts-expect-error duplex needed for streaming body in some runtimes
      duplex: "half",
    }).catch((e) => {
      console.error(`${pathname} ==> ${JSON.stringify(e)}`);
      return NextResponse.json({ error: "Proxy failed" }, { status: 502 });
    });
  }

  const isPublicRoute = isPathMatch(pathname, PUBLIC_PATHS);
  const isNoAuthRoute = isPathMatch(pathname, NO_AUTH_PATHS);
  const isAuthenticated = Boolean(token && user);

  // Public marketplace + legal pages
  if (isPublicRoute) {
    return NextResponse.next({ headers });
  }

  // Login/signup: logged-in user ko home bhejo
  if (isNoAuthRoute) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next({ headers });
  }

  // Admin panel sirf admin
  if (pathname.startsWith("/admin")) {
    if (!isAuthenticated || user?.type !== "admin") {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = isAuthenticated ? "/" : "/auth/store-login";
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Super-admin panel
  if (pathname.startsWith("/super-admin")) {
    if (!isAuthenticated || user?.type !== "superAdmin") {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = isAuthenticated ? "/" : "/auth/store-login";
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Store / business panel
  if (pathname.startsWith("/store")) {
    if (!isAuthenticated || user?.type !== "business") {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = isAuthenticated ? "/" : "/auth/store-login";
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next({ headers });
};
