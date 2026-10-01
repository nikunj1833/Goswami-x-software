import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";
  const errorParam = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto") || "https";
  const isLocalEnv = process.env.NODE_ENV === "development";
  const redirectOrigin = isLocalEnv
    ? origin
    : forwardedHost
    ? `${forwardedProto}://${forwardedHost}`
    : origin;

  // Sanitize redirect target to prevent open-redirect vulnerabilities
  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/";
  const targetUrl = new URL(safeNext, redirectOrigin).toString();

  // Handle OAuth provider error (e.g., user canceled flow)
  if (errorParam) {
    console.error("[auth/callback] OAuth provider error:", errorParam, errorDescription);
    return NextResponse.redirect(`${redirectOrigin}/?error=${encodeURIComponent(errorParam)}`);
  }

  if (code) {
    // Construct the redirect response first so auth cookies can be written directly to it
    const response = NextResponse.redirect(targetUrl);
    response.headers.set("Cache-Control", "no-store, max-age=0");

    const url =
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      "https://pjjtytivwvmetapbysvq.supabase.co";
    const key =
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      "sb_publishable_iXMtChaLg5sidNk8u6WwHQ_ZxunEk75";

    const supabase = createServerClient(url, key, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    });

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data?.session) {
      return response;
    }

    console.error("[auth/callback] Exchange code error:", error?.message);
    return NextResponse.redirect(`${redirectOrigin}/?error=auth_exchange_failed`);
  }

  // If no code and no error, redirect to home
  return NextResponse.redirect(`${redirectOrigin}/?error=no_code`);
}

