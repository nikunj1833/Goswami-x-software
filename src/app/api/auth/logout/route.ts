import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST() {
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

  // Clear any legacy session / auth cookies
  response.cookies.delete("session");
  response.cookies.delete("token");

  return response;
}
