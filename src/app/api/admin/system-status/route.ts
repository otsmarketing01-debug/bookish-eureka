import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { checkEnv } from "@/lib/env-guard";
import { toErrorResponse, AuthenticationError, AuthorizationError } from "@/lib/errors";

// Admin: system status (env health, SMTP config, service health)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new AuthenticationError();
    if (session.user.role !== "admin") throw new AuthorizationError();

    const { checks, allRequiredPresent, smtpConfigured } = checkEnv();

    return NextResponse.json({
      env: { checks, allRequiredPresent, smtpConfigured },
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    const e = toErrorResponse(err);
    return NextResponse.json(e, { status: e.statusCode });
  }
}
