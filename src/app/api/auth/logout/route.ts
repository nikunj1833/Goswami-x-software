import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch (err) {
    console.warn("[Logout] Server signOut notice:", err);
  }

  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully.",
  });

  // Clear legacy session / token cookies
  response.cookies.delete("session");
  response.cookies.delete("token");

  // Explicitly clear all Supabase auth cookies
  try {
    request.cookies.getAll().forEach((cookie) => {
      if (cookie.name.startsWith("sb-")) {
        response.cookies.delete(cookie.name);
      }
    });
  } catch {}

  return response;
}

