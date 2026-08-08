// Password hashing using Node's built-in crypto (scrypt) — no native deps.
import crypto from "crypto";

const KEY_LEN = 64;
const SALT_LEN = 16;

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(SALT_LEN).toString("hex");
  const hash = crypto
    .scryptSync(password, salt, KEY_LEN)
    .toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const test = crypto.scryptSync(password, salt, KEY_LEN).toString("hex");
  // timing-safe compare
  const a = Buffer.from(hash, "hex");
  const b = Buffer.from(test, "hex");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
