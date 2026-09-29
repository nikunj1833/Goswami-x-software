"use client";

import React, { createContext, useContext, useState, useCallback, useSyncExternalStore } from "react";

export interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthOpen: boolean;
  authMode: "signin" | "signup";
  openAuth: (mode?: "signin" | "signup") => void;
  closeAuth: () => void;
  setAuthMode: (mode: "signin" | "signup") => void;
  signIn: (email: string) => { success: boolean; error?: string };
  signUp: (name: string, email: string) => { success: boolean; error?: string };
  signOut: () => void;
}

const STORAGE_KEY = "ng-user";

let memoryUser: User | null = null;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  const handleStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      notify();
    }
  };
  window.addEventListener("storage", handleStorage);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", handleStorage);
  };
}

function getSnapshot(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEY);
}

function getServerSnapshot(): string | null {
  return null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

  const rawUser = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  let user: User | null = null;
  if (rawUser) {
    try {
      user = JSON.parse(rawUser);
    } catch {
      user = null;
    }
  } else if (memoryUser) {
    user = memoryUser;
  }

  const openAuth = useCallback((mode: "signin" | "signup" = "signin") => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  }, []);

  const closeAuth = useCallback(() => {
    setIsAuthOpen(false);
  }, []);

  const signIn = useCallback((email: string) => {
    const trimmedEmail = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return { success: false, error: "Please enter a valid email address." };
    }
    const derivedName = trimmedEmail
      .split("@")[0]
      .replace(/[._-]+/g, " ")
      .replace(/\b\w/g, (ch) => ch.toUpperCase());

    const newUser: User = { name: derivedName, email: trimmedEmail };
    memoryUser = newUser;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } catch {}
    notify();
    setIsAuthOpen(false);
    return { success: true };
  }, []);

  const signUp = useCallback((name: string, email: string) => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (trimmedName.length < 2) {
      return { success: false, error: "Please enter your full name." };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return { success: false, error: "Please enter a valid email address." };
    }

    const newUser: User = { name: trimmedName, email: trimmedEmail };
    memoryUser = newUser;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } catch {}
    notify();
    setIsAuthOpen(false);
    return { success: true };
  }, []);

  const signOut = useCallback(() => {
    memoryUser = null;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    notify();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthOpen,
        authMode,
        openAuth,
        closeAuth,
        setAuthMode,
        signIn,
        signUp,
        signOut,
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
