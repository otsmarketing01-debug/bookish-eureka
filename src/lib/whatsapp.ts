// WhatsApp Business API integration for automated message dispatch.
// Uses the WhatsApp Cloud API (Meta Graph API) for sending templated
// messages. Requires WHATSAPP_TOKEN and WHATSAPP_PHONE_NUMBER_ID env vars.
//
// In development/without credentials, falls back to generating wa.me links
// that can be sent manually or via the admin notification system.

import { siteConfig } from "@/lib/config";

type WhatsAppMessage = {
  to: string; // phone number in international format (e.g. "27825550000")
  template?: string;
  text?: string;
};

/**
 * Send a WhatsApp message via the WhatsApp Cloud API.
 * Returns true if sent, false if fell back to link generation.
 */
export async function sendWhatsAppMessage(msg: WhatsAppMessage): Promise<{ sent: boolean; link?: string; error?: string }> {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const cleanNumber = msg.to.replace(/[^0-9]/g, "");

  // If no API credentials, generate a wa.me link (manual dispatch)
  if (!token || !phoneNumberId) {
    const text = msg.text || "";
    const link = `https://wa.me/${cleanNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
    return { sent: false, link };
  }

  // Send via WhatsApp Cloud API
  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: cleanNumber,
          type: "text",
          text: { body: msg.text || "" },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("[whatsapp] API error:", error);
      return { sent: false, error };
    }

    return { sent: true };
  } catch (err: any) {
    console.error("[whatsapp] dispatch failed:", err?.message);
    return { sent: false, error: err?.message };
  }
}

/**
 * Send a review request via WhatsApp 2 hours after booking completion.
 * Uses a pre-populated message with the signed review link.
 */
export async function sendWhatsAppReviewRequest(params: {
  customerName: string;
  customerPhone: string;
  serviceName: string;
  reviewUrl: string;
}): Promise<{ sent: boolean; link?: string }> {
  const firstName = params.customerName.split(" ")[0];
  const message = `Hi ${firstName}! 👋

Thanks for choosing ${siteConfig.shortName} for your ${params.serviceName.toLowerCase()}. We hope you're delighted with the result!

We'd love your feedback — it takes 30 seconds and helps other Johannesburg homeowners:

${params.reviewUrl}

Thank you! 🙏
The ${siteConfig.name} team`;

  return sendWhatsAppMessage({
    to: params.customerPhone,
    text: message,
  });
}

/**
 * Send a booking confirmation via WhatsApp.
 */
export async function sendWhatsAppBookingConfirmation(params: {
  customerName: string;
  customerPhone: string;
  serviceName: string;
  date: string;
  slot: string;
}): Promise<{ sent: boolean; link?: string }> {
  const firstName = params.customerName.split(" ")[0];
  const message = `Hi ${firstName}! ✅

Your booking with ${siteConfig.shortName} is confirmed:

• Service: ${params.serviceName}
• Date: ${params.date}
• Time: ${params.slot}

We'll call you on the day to confirm our arrival time. If you need to reschedule, call ${siteConfig.phoneDisplay}.

See you soon!
The ${siteConfig.name} team`;

  return sendWhatsAppMessage({
    to: params.customerPhone,
    text: message,
  });
}
