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
      keyDiagnostics: {
        length: config.privateKey ? config.privateKey.length : 0,
        startsWithDash: Boolean(config.privateKey?.startsWith("-")),
        containsBegin: Boolean(config.privateKey?.includes("BEGIN")),
        containsPrivate: Boolean(config.privateKey?.toLowerCase().includes("private")),
        containsRsa: Boolean(config.privateKey?.includes("RSA")),
        hasNewlines: Boolean(config.privateKey?.includes("\n")),
        isHex: Boolean(config.privateKey && /^[0-9a-fA-F]+$/.test(config.privateKey)),
        isBase64Candidate: Boolean(config.privateKey && /^[A-Za-z0-9+/=\r\n]+$/.test(config.privateKey)),
      },
    },
  });
}
