import { NextResponse } from "next/server";
import { authenticateServerRequest } from "@/lib/auth/users";
import { updateUserProfileSchema } from "@/lib/validations/auth";
import { getAdminApp } from "@/lib/firebase/admin";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const authResult = await authenticateServerRequest(request);

    if (!authResult) {
      return NextResponse.json(
        { success: false, error: "Unauthorized." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      profile: authResult.profile,
    });
  } catch (err) {
    console.error("[Users Me GET Error]", err);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve profile." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const authResult = await authenticateServerRequest(request);

    if (!authResult) {
      return NextResponse.json(
        { success: false, error: "Unauthorized." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const parseResult = updateUserProfileSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: parseResult.error.issues[0]?.message || "Invalid update data.",
        },
        { status: 400 }
      );
    }

    const displayName = parseResult.data.displayName?.trim() || authResult.profile.displayName;
    const email = parseResult.data.email !== undefined ? parseResult.data.email : authResult.profile.email;
    const now = new Date().toISOString();

    try {
      const { db: adminDb } = getAdminApp();
      await adminDb.collection("users").doc(authResult.uid).update({
        displayName,
        ...(email !== undefined ? { email } : {}),
        updatedAt: now,
      });
    } catch (e) {
      console.warn("[Users Me PATCH] Firestore sync warning:", e instanceof Error ? e.message : e);
    }

    return NextResponse.json({
      success: true,
      profile: {
        ...authResult.profile,
        displayName,
        email,
        updatedAt: now,
      },
    });
  } catch (err) {
    console.error("[Users Me PATCH Error]", err);
    return NextResponse.json(
      { success: false, error: "Failed to update profile." },
      { status: 500 }
    );
  }
}
