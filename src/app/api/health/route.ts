import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    nodeVersion: process.version,
    platform: process.platform,
    env: process.env.NODE_ENV,
  });
}
