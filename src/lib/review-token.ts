import crypto from "crypto";

// Signed token utilities for review requests.
// Tokens encode a booking ID + HMAC signature so review links can't be forged
// and only validate against the intended (completed) booking.

const SECRET = process.env.AUTH_SECRET;
if (!SECRET) {
  throw new Error("AUTH_SECRET is required to sign review tokens");
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", SECRET).update(payload).digest("hex").slice(0, 24);
}

/** Create a review token for a booking ID. */
export function createReviewToken(bookingId: string): string {
  const payload = bookingId;
  const sig = sign(payload);
  // base64url(payload) + "." + sig
  const b64 = Buffer.from(payload).toString("base64url");
  return `${b64}.${sig}`;
}

/** Verify a review token and return the booking ID, or null if invalid. */
export function verifyReviewToken(token: string): string | null {
  try {
    const [b64, sig] = token.split(".");
    if (!b64 || !sig) return null;
    const payload = Buffer.from(b64, "base64url").toString("utf8");
    const expectedSig = sign(payload);
    // timing-safe compare
    const a = Buffer.from(sig, "hex");
    const b = Buffer.from(expectedSig, "hex");
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
    return payload;
  } catch {
    return null;
  }
}
