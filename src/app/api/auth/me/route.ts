import { NextResponse } from "next/server";
import { authenticateServerRequest } from "@/lib/auth/users";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const authResult = await authenticateServerRequest(request);

    if (!authResult) {
      return NextResponse.json(
        {
          authenticated: false,
          error: "Unauthorized. Please sign in.",
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        uid: authResult.profile.uid,
        phoneNumber: authResult.profile.phoneNumber,
        displayName: authResult.profile.displayName,
        email: authResult.profile.email,
        role: authResult.profile.role,
        status: authResult.profile.status,
        authProvider: authResult.profile.authProvider,
      },
    });
  } catch (err) {
    console.error("[Auth Me Error]", err);
    return NextResponse.json(
      {
        authenticated: false,
        error: "Failed to authenticate session.",
      },
      { status: 500 }
    );
  }
}
