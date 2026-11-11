import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const results: Record<string, unknown> = {
    status: "ok",
    nodeVersion: process.version,
    platform: process.platform,
    env: process.env.NODE_ENV,
  };

  const testImports: [string, () => Promise<unknown>][] = [
    ["validation", () => import("@/lib/validations/contact")],
    ["emailClient", () => import("@/lib/email/client")],
    ["whatsappClient", () => import("@/lib/whatsapp/client")],
    ["rateLimit", () => import("@/lib/security/rateLimit")],
    ["firebaseAdminApp", () => import("firebase-admin/app")],
    ["firebaseAdminAuth", () => import("firebase-admin/auth")],
    ["firebaseAdminFirestore", () => import("firebase-admin/firestore")],
    ["libFirebaseAdmin", () => import("@/lib/firebase/admin")],
  ];

  for (const [name, fn] of testImports) {
    try {
      await fn();
      results[name] = "ok";
    } catch (err: unknown) {
      results[name] = {
        error: err instanceof Error ? err.message : String(err),
        stack: err instanceof Error ? err.stack?.split("\n").slice(0, 3) : undefined,
      };
    }
  }

  return NextResponse.json(results);
}
