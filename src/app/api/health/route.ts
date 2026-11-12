import { NextResponse } from "next/server";
import { getFirebaseServerConfig } from "@/lib/env";
import { hasFirebaseServerCredentials } from "@/lib/firebase/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  const config = getFirebaseServerConfig();
  const hasServerCredentials = hasFirebaseServerCredentials();

  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    firebase: {
      configured: hasServerCredentials,
      hasProjectId: Boolean(config.projectId),
      hasClientEmail: Boolean(config.clientEmail),
      hasPrivateKey: Boolean(config.privateKey),
      clientEmailValid: Boolean(config.clientEmail?.includes("@")),
      privateKeyValid: Boolean(config.privateKey?.includes("BEGIN PRIVATE KEY")),
    },
  });
}
