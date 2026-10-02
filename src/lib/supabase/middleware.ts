import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // Skip auth session refresh on OAuth callback itself to prevent request contention
  if (request.nextUrl.pathname.startsWith("/auth/callback")) {
    return supabaseResponse;
  }

  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://pjjtytivwvmetapbysvq.supabase.co";
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    "sb_publishable_iXMtChaLg5sidNk8u6WwHQ_ZxunEk75";

  const isSecure =
    request.nextUrl.protocol === "https:" ||
    process.env.NODE_ENV === "production";

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, {
            ...options,
            path: options?.path ?? "/",
            sameSite: (options?.sameSite as "lax" | "strict" | "none") ?? "lax",
            secure: isSecure,
          })
        );
      },
    },
  });

  // Refreshes the Auth session cookie when needed
  await supabase.auth.getUser();

  return supabaseResponse;
}
