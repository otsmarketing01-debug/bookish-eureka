import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { toErrorResponse, ValidationError, AuthenticationError, AuthorizationError } from "@/lib/errors";
import crypto from "crypto";

// PayFast payment gateway integration (South African payment processor)
// https://developers.payfast.co.za/

const schema = z.object({
  bookingId: z.string().min(1),
  amount: z.number().min(1).max(100000),
  itemName: z.string().max(100),
});

// PayFast sandbox vs live
const PF_HOST = process.env.PAYFAST_ENV === "production"
  ? "https://www.payfast.co.za"
  : "https://sandbox.payfast.co.za";
const PF_MERCHANT_ID = process.env.PAYFAST_MERCHANT_ID || "10000100"; // sandbox default
const PF_MERCHANT_KEY = process.env.PAYFAST_MERCHANT_KEY || "46f0cd694581a";
const PF_RETURN_URL = process.env.PAYFAST_RETURN_URL || "https://jhbcurtaincleaning.co.za/book?status=success";
const PF_CANCEL_URL = process.env.PAYFAST_CANCEL_URL || "https://jhbcurtaincleaning.co.za/book?status=cancelled";
const PF_NOTIFY_URL = process.env.PAYFAST_NOTIFY_URL || "https://jhbcurtaincleaning.co.za/api/payfast/notify";

function generateSignature(data: Record<string, string>): string {
  const paramString = Object.entries(data)
    .filter(([_, v]) => v !== "")
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join("&");
  return crypto.createHash("md5").update(paramString).digest("hex");
}

// POST: create a PayFast payment redirect
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new AuthenticationError();
    if (session.user.role !== "admin") throw new AuthorizationError();

    const body = await req.json().catch(() => null);
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      throw new ValidationError(parsed.error.issues[0]?.message ?? "Invalid input");
    }

    const { bookingId, amount, itemName } = parsed.data;

    const paymentData: Record<string, string> = {
      merchant_id: PF_MERCHANT_ID,
      merchant_key: PF_MERCHANT_KEY,
      return_url: PF_RETURN_URL,
      cancel_url: PF_CANCEL_URL,
      notify_url: PF_NOTIFY_URL,
      name_first: "JHB",
      name_last: "Curtain Cleaning",
      email_address: "info@jhbcurtaincleaning.co.za",
      m_payment_id: bookingId,
      amount: amount.toFixed(2),
      item_name: itemName,
    };

    const signature = generateSignature(paymentData);
    paymentData.signature = signature;

    return NextResponse.json({
      paymentUrl: `${PF_HOST}/eng/process`,
      paymentData,
    });
  } catch (err) {
    const e = toErrorResponse(err);
    return NextResponse.json(e, { status: e.statusCode });
  }
}
