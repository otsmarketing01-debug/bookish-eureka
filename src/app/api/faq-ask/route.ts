import { NextResponse } from "next/server";
import { z } from "zod";
import ZAI from "z-ai-web-dev-sdk";
import { enforceRateLimit, clientKey } from "@/lib/rate-limit";
import { toErrorResponse, ValidationError } from "@/lib/errors";
import { services, siteConfig } from "@/lib/config";

const schema = z.object({
  question: z.string().min(5, "Please ask a complete question").max(500),
});

// Build a knowledge-rich system prompt from our business data so the LLM
// answers accurately about JHB Curtain Cleaning specifically.
function buildSystemPrompt(): string {
  const serviceLines = services
    .map((s) => `- ${s.name} (from ${s.priceFrom}): ${s.short}`)
    .join("\n");
  const faqLines = services
    .flatMap((s) => s.faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`))
    .join("\n");

  return `You are the friendly AI assistant for ${siteConfig.name}, a professional on-site curtain cleaning company in Johannesburg, South Africa.

COMPANY FACTS:
- Phone: ${siteConfig.phoneDisplay}
- Email: ${siteConfig.email}
- Address: ${siteConfig.address.street}, ${siteConfig.address.locality}, ${siteConfig.address.postalCode}
- Hours: ${siteConfig.hours.map((h) => `${h.days} ${h.time}`).join("; ")}
- Price range: ${siteConfig.priceRange}
- Rating: ${siteConfig.rating.value}/5 from ${siteConfig.rating.count}+ reviews
- Serves: All Johannesburg suburbs (Sandton, Randburg, Fourways, Roodepoort, Edenvale, Alberton, Rosebank) + Pretoria & Midrand
- Key differentiator: ON-SITE dry cleaning — no removal, no shrinkage, same-day usable

SERVICES:
${serviceLines}

COMMON Q&A:
${faqLines}

RULES:
1. Answer ONLY about curtain cleaning, blinds, upholstery, mattresses, rugs, fire-proofing, stain protection, and booking/pricing for this company.
2. Keep answers concise (2-4 sentences). Be warm and professional.
3. If a question is about pricing, give the "from" price and recommend a free on-site assessment for an exact quote.
4. If a question is outside our services, politely redirect to relevant services or suggest calling ${siteConfig.phoneDisplay}.
5. Always encourage the customer to book a free assessment or use the live chat for specifics.
6. Never invent prices, areas, or services not listed above.
7. Use South African English (Rands, "cellphone", etc.).`;
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    enforceRateLimit(clientKey(ip, "faq-ask"), { limit: 10, windowMs: 60 * 60 * 1000 });

    const body = await req.json().catch(() => null);
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      throw new ValidationError(parsed.error.issues[0]?.message ?? "Invalid question");
    }

    const zai = await ZAI.create();
    const completion = await zai.chat.completions.create({
      messages: [
        { role: "assistant", content: buildSystemPrompt() },
        { role: "user", content: parsed.data.question },
      ],
      thinking: { type: "disabled" },
    });

    const answer = completion.choices[0]?.message?.content?.trim();
    if (!answer) {
      throw new ValidationError("I couldn't generate an answer. Please try again or call us.");
    }

    return NextResponse.json({ answer });
  } catch (err) {
    const e = toErrorResponse(err);
    return NextResponse.json(e, { status: e.statusCode });
  }
}
