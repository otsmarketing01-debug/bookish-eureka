"use client";
import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, AlertCircle, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type EnvCheck = {
  key: string;
  present: boolean;
  required: boolean;
  description: string;
};

type Status = {
  env: { checks: EnvCheck[]; allRequiredPresent: boolean; smtpConfigured: boolean };
  timestamp: string;
};

export function SystemStatusCard() {
  const [status, setStatus] = useState<Status | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/system-status")
      .then((r) => r.json())
      .then((d) => setStatus(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center gap-2 p-5">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Checking system status…</span>
        </CardContent>
      </Card>
    );
  }

  if (!status) return null;

  const required = status.env.checks.filter((c) => c.required);
  const optional = status.env.checks.filter((c) => !c.required);
  const missingRequired = required.filter((c) => !c.present);
  const missingOptional = optional.filter((c) => !c.present);

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            {status.env.allRequiredPresent ? (
              <CheckCircle2 className="h-5 w-5 text-success" />
            ) : (
              <XCircle className="h-5 w-5 text-destructive" />
            )}
            System Status
          </h3>
          {status.env.allRequiredPresent ? (
            <Badge variant="outline" className="border-success/30 bg-success/10 text-success">Healthy</Badge>
          ) : (
            <Badge variant="outline" className="border-destructive/30 bg-destructive/10 text-destructive">Issues</Badge>
          )}
        </div>

        {missingRequired.length > 0 && (
          <div className="mt-3 rounded-md border border-destructive/30 bg-destructive/10 p-3">
            <p className="text-xs font-medium text-destructive">Missing required env vars:</p>
            <ul className="mt-1 space-y-0.5">
              {missingRequired.map((c) => (
                <li key={c.key} className="text-xs text-destructive">
                  <code className="rounded bg-background px-1">{c.key}</code> — {c.description}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            {status.env.smtpConfigured ? (
              <CheckCircle2 className="h-3.5 w-3.5 text-success" />
            ) : (
              <AlertCircle className="h-3.5 w-3.5 text-warning" />
            )}
            <span className="text-muted-foreground">SMTP: {status.env.smtpConfigured ? "configured" : "logging only"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-success" />
            <span className="text-muted-foreground">{required.length - missingRequired.length}/{required.length} required vars</span>
          </div>
        </div>

        {missingOptional.length > 0 && status.env.smtpConfigured === false && (
          <p className="mt-3 text-xs text-muted-foreground">
            To enable real email sending, set <code className="rounded bg-muted px-1">SMTP_HOST</code>, <code className="rounded bg-muted px-1">SMTP_USER</code>, and <code className="rounded bg-muted px-1">SMTP_PASS</code> in your <code className="rounded bg-muted px-1">.env</code> file.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
