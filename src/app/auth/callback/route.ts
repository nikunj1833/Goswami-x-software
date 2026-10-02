import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSiteUrl } from "@/lib/auth/url";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";
  const errorParam = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto") || "https";
  const isLocalEnv =
    process.env.NODE_ENV === "development" &&
    (origin.includes("localhost") || origin.includes("127.0.0.1"));

  const redirectOrigin = isLocalEnv
    ? origin
    : forwardedHost && !forwardedHost.includes("localhost")
    ? `${forwardedProto}://${forwardedHost}`
    : getSiteUrl();

  // Sanitize redirect target to prevent open-redirect vulnerabilities
  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/";
  const targetUrl = new URL(safeNext, redirectOrigin).toString();

  // Handle OAuth provider error (e.g., user canceled flow)
  if (errorParam) {
    console.error("[auth/callback] OAuth provider error:", errorParam, errorDescription);
    return NextResponse.redirect(`${redirectOrigin}/?error=${encodeURIComponent(errorParam)}`);
  }

  if (code) {
    const cookieStore = await cookies();
    const isSecure =
      redirectOrigin.startsWith("https://") ||
      process.env.NODE_ENV === "production";

    console.log("[AuthTrace][OAuth Callback Reached]", {
      hasCode: Boolean(code),
      hasError: Boolean(errorParam),
      targetUrl,
      isSecure,
    });

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
          const reqCookies = request.cookies.getAll();
          const storeCookies = cookieStore.getAll();
          const map = new Map<string, { name: string; value: string }>();
          for (const c of storeCookies) {
            map.set(c.name, c);
          }
          for (const c of reqCookies) {
            map.set(c.name, c);
          }
          return Array.from(map.values());
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            const normalizedOptions = {
              ...options,
              path: options?.path ?? "/",
              sameSite: (options?.sameSite as "lax" | "strict" | "none") ?? "lax",
              secure: isSecure,
            };
            try {
              cookieStore.set(name, value, normalizedOptions);
            } catch {}
            response.cookies.set(name, value, normalizedOptions);
          });
        },
      },
    });

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    console.log("[AuthTrace][Code Exchange Result]", {
      success: !error && Boolean(data?.session),
      hasSession: Boolean(data?.session),
      hasUser: Boolean(data?.session?.user),
      provider: data?.session?.user?.app_metadata?.provider ?? null,
      hasEmail: Boolean(data?.session?.user?.email),
      errorName: error?.name,
      errorMessage: error?.message,
    });

    if (!error && data?.session) {
      return response;
    }

    console.warn("[auth/callback] Server code exchange warning:", error?.message);
    // If server code exchange encounters an issue (e.g. PKCE cookie partition),
    // redirect with code to allow the browser client (which holds the verifier) to complete exchange
    const clientExchangeUrl = new URL(safeNext, redirectOrigin);
    clientExchangeUrl.searchParams.set("code", code);
    return NextResponse.redirect(clientExchangeUrl.toString());
  }

  // If no code and no error, redirect to home
  return NextResponse.redirect(`${redirectOrigin}/?error=no_code`);
}


