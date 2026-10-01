import { NextResponse } from "next/server";
import { authenticateServerRequest } from "@/lib/auth/users";
import { updateUserProfileSchema } from "@/lib/validations/auth";
import { createAdminClient } from "@/lib/supabase/admin";

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

    const adminSupabase = createAdminClient();

    const safeUpdates: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (parseResult.data.displayName !== undefined) {
      safeUpdates.full_name = parseResult.data.displayName.trim();
    }

    const { data: updatedProfile, error } = await adminSupabase
      .from("profiles")
      .update(safeUpdates)
      .eq("id", authResult.uid)
      .select()
      .single();

    if (error) {
      console.error("[Users Me PATCH Database Error]", error);
      return NextResponse.json(
        { success: false, error: "Failed to update profile." },
        { status: 500 }
      );
    }

    const displayName = updatedProfile?.full_name || authResult.profile.displayName;

    return NextResponse.json({
      success: true,
      profile: {
        ...authResult.profile,
        displayName,
        phoneNumber: updatedProfile?.phone || authResult.profile.phoneNumber,
        updatedAt: updatedProfile?.updated_at || safeUpdates.updated_at,
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
