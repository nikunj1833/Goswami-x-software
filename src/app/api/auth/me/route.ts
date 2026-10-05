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
        displayName: authResult.profile.displayName,
        email: authResult.profile.email,
        photoURL: authResult.profile.photoURL,
        phoneNumber: authResult.profile.phoneNumber,
        role: authResult.profile.role,
        status: authResult.profile.status,
        authProvider: authResult.profile.authProvider,
        createdAt: authResult.profile.createdAt,
        updatedAt: authResult.profile.updatedAt,
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
