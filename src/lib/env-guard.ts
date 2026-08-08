// Environment integrity guard.
// Validates that critical environment variables are present at startup.
// Used by the admin system-status API to surface configuration issues.

type EnvCheck = {
  key: string;
  present: boolean;
  required: boolean;
  description: string;
};

const REQUIRED_VARS: { key: string; description: string }[] = [
  { key: "AUTH_SECRET", description: "NextAuth session encryption secret" },
  { key: "DATABASE_URL", description: "Prisma database connection string" },
  { key: "NEXTAUTH_URL", description: "NextAuth canonical URL" },
];

const OPTIONAL_VARS: { key: string; description: string }[] = [
  { key: "SMTP_HOST", description: "SMTP server hostname (for real email)" },
  { key: "SMTP_USER", description: "SMTP username" },
  { key: "SMTP_PASS", description: "SMTP password" },
  { key: "SMTP_FROM", description: "From address for outgoing email" },
  { key: "NEXT_PUBLIC_CHAT_PORT", description: "Chat service port" },
];

export function checkEnv(): { checks: EnvCheck[]; allRequiredPresent: boolean; smtpConfigured: boolean } {
  const checks: EnvCheck[] = [
    ...REQUIRED_VARS.map((v) => ({
      key: v.key,
      present: !!process.env[v.key],
      required: true,
      description: v.description,
    })),
    ...OPTIONAL_VARS.map((v) => ({
      key: v.key,
      present: !!process.env[v.key],
      required: false,
      description: v.description,
    })),
  ];

  const allRequiredPresent = checks.filter((c) => c.required).every((c) => c.present);
  const smtpConfigured = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

  return { checks, allRequiredPresent, smtpConfigured };
}

/** Log a warning at startup if required env vars are missing. */
export function warnIfEnvIncomplete() {
  const { checks, allRequiredPresent, smtpConfigured } = checkEnv();
  if (!allRequiredPresent) {
    const missing = checks.filter((c) => c.required && !c.present).map((c) => c.key);
    console.error(`[env] ⚠ Missing required environment variables: ${missing.join(", ")}`);
    console.error("[env] The app may not function correctly. Check your .env file.");
  }
  if (!smtpConfigured) {
    console.warn("[env] ℹ SMTP not configured — emails will be logged but not sent. Set SMTP_HOST, SMTP_USER, SMTP_PASS to enable real email.");
  }
}
