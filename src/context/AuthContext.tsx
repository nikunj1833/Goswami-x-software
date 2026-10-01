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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => createClient(), []);

  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

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

        const email = sbUser.email || "";
        const fallbackName =
          (sbUser.user_metadata?.full_name as string | undefined) ||
          (sbUser.user_metadata?.name as string | undefined) ||
          (email ? email.split("@")[0] : "User");

        if (!profile) {
          // Create profile record if not present, adhering to RLS (id = auth.uid())
          await supabase.from("profiles").insert({
            id: sbUser.id,
            full_name: fallbackName,
          });
        }

        const displayName = profile?.full_name || fallbackName;

        return {
          id: sbUser.id,
          uid: sbUser.id,
          email,
          displayName,
          name: displayName,
          phoneNumber: profile?.phone || sbUser.phone || null,
          role: "user",
          createdAt: sbUser.created_at,
        };
      } catch (err) {
        console.error("[AuthContext] Profile sync error:", err);
        const email = sbUser.email || "";
        const displayName =
          (sbUser.user_metadata?.full_name as string | undefined) ||
          (email ? email.split("@")[0] : "User");
        return {
          id: sbUser.id,
          uid: sbUser.id,
          email,
          displayName,
          name: displayName,
          phoneNumber: sbUser.phone || null,
          role: "user",
          createdAt: sbUser.created_at,
        };
      }
    },
    [supabase]
  );

  // Initialize session and listen for auth state updates
  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      try {
        const {
          data: { session: initialSession },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.warn("[AuthContext] Initial session check warning:", error.message);
        }

        if (mounted) {
          setSession(initialSession);
          setSupabaseUser(initialSession?.user ?? null);
          if (initialSession?.user) {
            const email = initialSession.user.email || "";
            const fallbackName =
              (initialSession.user.user_metadata?.full_name as string | undefined) ||
              (initialSession.user.user_metadata?.name as string | undefined) ||
              (email ? email.split("@")[0] : "User");

            // Set immediate provisional profile so UI doesn't delay
            setUser({
              id: initialSession.user.id,
              uid: initialSession.user.id,
              email,
              displayName: fallbackName,
              name: fallbackName,
              phoneNumber: initialSession.user.phone || null,
              role: "user",
              createdAt: initialSession.user.created_at,
            });

            const profile = await syncUserProfile(initialSession.user);
            if (mounted && profile) setUser(profile);
          }
        }
      } catch (err) {
        console.error("[AuthContext] Init auth error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
      if (!mounted) return;
      setSession(currentSession);
      setSupabaseUser(currentSession?.user ?? null);

      if (currentSession?.user) {
        const email = currentSession.user.email || "";
        const fallbackName =
          (currentSession.user.user_metadata?.full_name as string | undefined) ||
          (currentSession.user.user_metadata?.name as string | undefined) ||
          (email ? email.split("@")[0] : "User");

        // Immediate user profile update to avoid any render delay
        setUser((prev) => prev ?? {
          id: currentSession.user.id,
          uid: currentSession.user.id,
          email,
          displayName: fallbackName,
          name: fallbackName,
          phoneNumber: currentSession.user.phone || null,
          role: "user",
          createdAt: currentSession.user.created_at,
        });
        setIsAuthOpen(false);

        const profile = await syncUserProfile(currentSession.user);
        if (mounted && profile) {
          setUser(profile);
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase, syncUserProfile]);

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
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        return { error: error.message };
      }

      return {};
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to initiate Google login.";
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
