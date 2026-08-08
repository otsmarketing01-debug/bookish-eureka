// Simple in-memory rate limiter (token bucket / fixed window)
// Suitable for single-instance deployments. For multi-instance, use Redis.
import { RateLimitError } from "./errors";

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

// Periodically clean up expired buckets to prevent memory growth
const CLEANUP_INTERVAL = 5 * 60 * 1000; // 5 min
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt < now) buckets.delete(key);
  }
}

export type RateLimitOptions = {
  /** Max requests allowed in the window */
  limit: number;
  /** Window size in milliseconds */
  windowMs: number;
};

export function rateLimit(key: string, opts: RateLimitOptions): { remaining: number; resetAt: number } {
  cleanup();
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt < now) {
    const bucket: Bucket = { count: 1, resetAt: now + opts.windowMs };
    buckets.set(key, bucket);
    return { remaining: opts.limit - 1, resetAt: bucket.resetAt };
  }

  existing.count += 1;
  return {
    remaining: Math.max(0, opts.limit - existing.count),
    resetAt: existing.resetAt,
  };
}

/** Throws RateLimitError if the limit is exceeded. */
export function enforceRateLimit(key: string, opts: RateLimitOptions) {
  const { remaining } = rateLimit(key, opts);
  if (remaining === 0) {
    throw new RateLimitError(
      `Too many requests. Please try again in ${Math.ceil(opts.windowMs / 1000)} seconds.`
    );
  }
}

/** Express/Next.js helper: build a key from request identifier. */
export function clientKey(identifier: string, action: string) {
  return `rl:${action}:${identifier}`;
}
