import { createClient as createServerClient } from "@/lib/supabase/server";
import { createClient as createApiClient, type User as SupabaseUser } from "@supabase/supabase-js";
import { createAdminClient } from "@/lib/supabase/admin";

export interface UserProfile {
  id: string;
  uid: string;
  phoneNumber?: string | null;
  phoneNumberNormalized?: string | null;
  displayName: string;
  email?: string | null;
  photoURL?: string | null;
  role: "user" | "admin";
  status: "active" | "suspended";
  authProvider: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthenticateServerResult {
  uid: string;
  role: string;
  profile: UserProfile;
  supabaseUser: SupabaseUser;
}

/**
 * Verifies Supabase session from cookies or Authorization Bearer header.
 * Ensures corresponding public.profiles record exists in Supabase.
 */
export async function authenticateServerRequest(
  request: Request
): Promise<AuthenticateServerResult | null> {
  let user: SupabaseUser | null = null;

  // 1. Try checking session via Supabase server cookies
  try {
    const supabaseServer = await createServerClient();
    const { data, error } = await supabaseServer.auth.getUser();
    if (!error && data?.user) {
      user = data.user;
    }
  } catch {
    // Cookie context unavailable or no session cookie
  }

  // 2. Fallback to Authorization: Bearer <access_token> header
  if (!user) {
    const authHeader = request.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split("Bearer ")[1]?.trim();
      if (token) {
        try {
          const directClient = createApiClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
          );
          const { data, error } = await directClient.auth.getUser(token);
          if (!error && data?.user) {
            user = data.user;
          }
        } catch {
          // Token verification failure
        }
      }
    }
  }

  if (!user) {
    return null;
  }

  // 3. Query or initialize profile in public.profiles table
  let profileRecord: {
    id: string;
    full_name: string | null;
    phone: string | null;
    created_at?: string;
    updated_at?: string;
  } | null = null;

  try {
    const adminSupabase = createAdminClient();
    const { data } = await adminSupabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (!data) {
      const fallbackName =
        (user.user_metadata?.full_name as string | undefined) ||
        (user.user_metadata?.name as string | undefined) ||
        (user.email ? user.email.split("@")[0] : "User");

      const { data: inserted } = await adminSupabase
        .from("profiles")
        .insert({
          id: user.id,
          full_name: fallbackName,
          phone: user.phone || null,
        })
        .select()
        .single();
      profileRecord = inserted;
    } else {
      profileRecord = data;
    }
  } catch (dbErr) {
    console.error("[authenticateServerRequest] Profile sync warning:", dbErr);
  }

  const email = user.email || null;
  const displayName =
    profileRecord?.full_name ||
    (user.user_metadata?.full_name as string | undefined) ||
    (user.user_metadata?.name as string | undefined) ||
    (email ? email.split("@")[0] : "User");

  const profile: UserProfile = {
    id: user.id,
    uid: user.id,
    displayName,
    email,
    phoneNumber: profileRecord?.phone || user.phone || null,
    phoneNumberNormalized: profileRecord?.phone || user.phone || null,
    photoURL: (user.user_metadata?.avatar_url as string | undefined) || null,
    role: "user",
    status: "active",
    authProvider: user.app_metadata?.provider || "google",
    createdAt: profileRecord?.created_at || user.created_at,
    updatedAt: profileRecord?.updated_at || user.updated_at,
  };

  return {
    uid: user.id,
    role: "user",
    profile,
    supabaseUser: user,
  };
}

/**
 * Legacy stub for deprecated WhatsApp auth flow (preserved for backward compatibility).
 */
export async function getOrCreateWhatsAppUser(
  phoneNumberNormalized: string,
  displayNameInput?: string
) {
  return {
    customToken: "deprecated",
    uid: "legacy-whatsapp-user",
    isNewUser: false,
    profile: {
      id: "legacy-whatsapp-user",
      uid: "legacy-whatsapp-user",
      phoneNumber: phoneNumberNormalized,
      displayName: displayNameInput || "User",
      role: "user" as const,
      status: "active" as const,
      authProvider: "whatsapp" as const,
    },
  };
}
