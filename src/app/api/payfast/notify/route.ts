import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import crypto from "crypto";

// PayFast ITN (Instant Transaction Notification) webhook handler
// PayFast sends a POST to this endpoint when a payment is completed.
// https://developers.payfast.co.za/?#itn

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const data: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      data[key] = String(value);
    }

    const { pf_payment_id, payment_status, m_payment_id, amount_gross, signature } = data;

    if (!m_payment_id || !signature) {
      return NextResponse.json({ status: "error", message: "Missing required fields" }, { status: 400 });
    }

    // Verify signature
    const PF_MERCHANT_KEY = process.env.PAYFAST_MERCHANT_KEY || "46f0cd694581a";
    const dataForSig = { ...data };
    delete dataForSig.signature;
    const paramString = Object.entries(dataForSig)
      .filter(([_, v]) => v !== "")
      .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
      .join("&");
    const expectedSig = crypto.createHash("md5").update(paramString).digest("hex");

    if (signature !== expectedSig) {
      console.error("[payfast] signature mismatch");
      return NextResponse.json({ status: "error", message: "Invalid signature" }, { status: 400 });
    }

    // Update booking status if payment is complete
    if (payment_status === "COMPLETE") {
      const bookingId = m_payment_id;
      const booking = await db.booking.findUnique({ where: { id: bookingId } });
      if (booking) {
        await db.booking.update({
          where: { id: bookingId },
          data: { status: "confirmed" },
        });
        console.log(`[payfast] Booking ${bookingId} confirmed — payment R${amount_gross} (PF ID: ${pf_payment_id})`);
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (err) {
    console.error("[payfast] ITN error:", err);
    return NextResponse.json({ status: "error", message: "Internal error" }, { status: 500 });
  }
}
