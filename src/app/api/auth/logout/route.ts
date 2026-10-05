import { NextResponse, type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  void request;
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully.",
  });

  // Clear session / token cookies
  response.cookies.delete("session");
  response.cookies.delete("token");

  return response;
}
