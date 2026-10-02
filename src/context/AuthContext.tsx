"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import type { User as SupabaseUser, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { getAuthCallbackUrl } from "@/lib/auth/url";

export interface UserProfile {
  id: string;
  uid: string;
  email: string;
  displayName: string;
  name: string;
  phoneNumber?: string | null;
  role?: string;
  createdAt?: string;
}

export interface AuthContextType {
  user: UserProfile | null;
  supabaseUser: SupabaseUser | null;
  session: Session | null;
  loading: boolean;
  authError: string | null;
  clearAuthError: () => void;
  isAuthOpen: boolean;
  openAuth: (mode?: string) => void;
  closeAuth: () => void;
  signInWithGoogle: () => Promise<{ error?: string }>;
  signInWithOtp: (email: string) => Promise<{ success: boolean; error?: string }>;
  verifyOtp: (email: string, token: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  getIdToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function buildUserProfile(
  sbUser: SupabaseUser,
  profile?: { full_name?: string | null; phone?: string | null } | null
): UserProfile {
  const email = sbUser.email || "";
  const rawName =
    profile?.full_name ||
    (sbUser.user_metadata?.full_name as string | undefined) ||
    (sbUser.user_metadata?.name as string | undefined) ||
    (email ? email.split("@")[0] : "User");

  return {
    id: sbUser.id,
    uid: sbUser.id,
    email,
    displayName: rawName,
    name: rawName,
    phoneNumber: profile?.phone || sbUser.phone || null,
    role: "user",
    createdAt: sbUser.created_at,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => createClient(), []);

  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const clearAuthError = useCallback(() => setAuthError(null), []);

  // Sync Supabase user with public.profiles record
  const syncUserProfile = useCallback(
    async (sbUser: SupabaseUser | null): Promise<UserProfile | null> => {
      if (!sbUser) return null;

      try {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", sbUser.id)
          .maybeSingle();

        const baseProfile = buildUserProfile(sbUser, profile);

        if (!profile) {
          try {
            await supabase.from("profiles").insert({
              id: sbUser.id,
              full_name: baseProfile.name,
            });
          } catch {}
        }

        return baseProfile;
      } catch (err) {
        console.warn("[AuthContext] Profile sync notice:", err);
        return buildUserProfile(sbUser);
      }
    },
    [supabase]
  );

  // Initialize session and subscribe to auth changes
  useEffect(() => {
    let mounted = true;

    // Detect OAuth errors passed in URL
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const errorParam = params.get("error");
      const errorDesc = params.get("error_description");

      let detectedError: string | null = null;
      if (errorParam) {
        detectedError = errorDesc ? `${errorParam}: ${errorDesc}` : errorParam;
      } else if (window.location.hash && window.location.hash.includes("error")) {
        const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
        const hashErr = hashParams.get("error");
        const hashDesc = hashParams.get("error_description");
        if (hashErr) {
          detectedError = hashDesc ? `${hashErr}: ${hashDesc}` : hashErr;
        }
      }

      if (detectedError && mounted) {
        console.error("[AuthContext] OAuth error detected from URL:", detectedError);
        setAuthError(detectedError);
        const cleanUrl = new URL(window.location.href);
        cleanUrl.searchParams.delete("error");
        cleanUrl.searchParams.delete("error_description");
        cleanUrl.searchParams.delete("error_code");
        if (cleanUrl.hash.includes("error")) {
          cleanUrl.hash = "";
        }
        window.history.replaceState({}, document.title, cleanUrl.toString());
      }
    }

    // 1. Initial session fetch
    async function initAuth() {
      try {
        const {
          data: { session: initialSession },
          error,
        } = await supabase.auth.getSession();

        console.log("[AuthTrace][Browser getSession Result]", {
          hasSession: Boolean(initialSession),
          hasUser: Boolean(initialSession?.user),
          provider: initialSession?.user?.app_metadata?.provider ?? null,
          hasEmail: Boolean(initialSession?.user?.email),
          error: error?.message,
        });

        if (mounted) {
          if (initialSession?.user) {
            setSession(initialSession);
            setSupabaseUser(initialSession.user);
            const profile = await syncUserProfile(initialSession.user);
            if (mounted) setUser(profile);
          } else {
            setSession(null);
            setSupabaseUser(null);
            setUser(null);
          }
        }
      } catch (err) {
        console.error("[AuthContext] Init auth error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    initAuth();

    // 2. Subscribe once to onAuthStateChange
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      if (!mounted) return;

      console.log("[AuthTrace][onAuthStateChange Event]", {
        event,
        hasSession: Boolean(currentSession),
        hasUser: Boolean(currentSession?.user),
        provider: currentSession?.user?.app_metadata?.provider ?? null,
        hasEmail: Boolean(currentSession?.user?.email),
      });

      if (event === "SIGNED_OUT") {
        setSession(null);
        setSupabaseUser(null);
        setUser(null);
        return;
      }

      if (event === "INITIAL_SESSION") {
        if (currentSession?.user) {
          setSession(currentSession);
          setSupabaseUser(currentSession.user);
          const profile = await syncUserProfile(currentSession.user);
          if (mounted) setUser(profile);
        }
        return;
      }

      if (currentSession?.user) {
        setSession(currentSession);
        setSupabaseUser(currentSession.user);
        setIsAuthOpen(false);
        const profile = await syncUserProfile(currentSession.user);
        if (mounted) setUser(profile);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase, syncUserProfile]);

  useEffect(() => {
    console.log("[AuthTrace][AuthContext Final User State]", {
      hasUser: Boolean(user),
      hasSupabaseUser: Boolean(supabaseUser),
      hasSession: Boolean(session),
      loading,
      userInitial: user?.name ? user.name.charAt(0) : null,
      emailInitial: user?.email ? user.email.charAt(0) : null,
    });
  }, [user, supabaseUser, session, loading]);

  const openAuth = useCallback((mode?: string) => {
    void mode;
    setIsAuthOpen(true);
  }, []);

  const closeAuth = useCallback(() => {
    setIsAuthOpen(false);
  }, []);

  /**
   * Initiates Google OAuth authentication via Supabase Auth
   */
  const signInWithGoogle = useCallback(async () => {
    try {
      setAuthError(null);
      const callbackUrl = getAuthCallbackUrl();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: callbackUrl,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        setAuthError(error.message);
        return { error: error.message };
      }

      return {};
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to initiate Google login.";
      setAuthError(msg);
      return { error: msg };
    }
  }, [supabase]);

  /**
   * Dispatches a real 6-digit OTP code to the provided email address via Supabase Auth
   */
  const signInWithOtp = useCallback(
    async (email: string) => {
      try {
        const cleanEmail = email.trim().toLowerCase();
        const { error } = await supabase.auth.signInWithOtp({
          email: cleanEmail,
          options: {
            shouldCreateUser: true,
          },
        });

        if (error) {
          return { success: false, error: error.message };
        }

        return { success: true };
      } catch (err: unknown) {
        const msg =
          err instanceof Error
            ? err.message
            : "An unexpected error occurred while sending OTP.";
        return { success: false, error: msg };
      }
    },
    [supabase]
  );

  /**
   * Verifies the 6-digit OTP token and establishes an authenticated Supabase session
   */
  const verifyOtp = useCallback(
    async (email: string, token: string) => {
      try {
        const cleanEmail = email.trim().toLowerCase();
        const cleanToken = token.trim();

        const { data, error } = await supabase.auth.verifyOtp({
          email: cleanEmail,
          token: cleanToken,
          type: "email",
        });

        if (error) {
          return { success: false, error: error.message };
        }

        if (data.session && data.user) {
          setSession(data.session);
          setSupabaseUser(data.user);
          const profile = await syncUserProfile(data.user);
          setUser(profile);
          setIsAuthOpen(false);
        }

        return { success: true };
      } catch (err: unknown) {
        const msg =
          err instanceof Error
            ? err.message
            : "An unexpected error occurred during OTP verification.";
        return { success: false, error: msg };
      }
    },
    [supabase, syncUserProfile]
  );

  /**
   * Signs out of Supabase and clears local user/session state
   */
  const signOut = useCallback(async () => {
    try {
      await supabase.auth.signOut();
      await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    } catch (err) {
      console.error("[AuthContext] Sign out error:", err);
    } finally {
      setUser(null);
      setSupabaseUser(null);
      setSession(null);
    }
  }, [supabase]);

  /**
   * Returns current access token for authenticated API requests
   */
  const getIdToken = useCallback(async () => {
    if (!session) {
      const { data } = await supabase.auth.getSession();
      return data.session?.access_token || null;
    }
    return session.access_token || null;
  }, [session, supabase]);

  return (
    <AuthContext.Provider
      value={{
        user,
        supabaseUser,
        session,
        loading,
        authError,
        clearAuthError,
        isAuthOpen,
        openAuth,
        closeAuth,
        signInWithGoogle,
        signInWithOtp,
        verifyOtp,
        signOut,
        getIdToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
