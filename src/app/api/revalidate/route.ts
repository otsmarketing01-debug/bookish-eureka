import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// Webhook to revalidate blog cache when content changes.
// In production this would be called by Sanity/a CMS. Here it revalidates blog routes.
export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const secret = process.env.AUTH_SECRET;
    // Simple bearer-token guard
    if (secret && authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const slug = typeof body?.slug === "string" ? body.slug : null;

    revalidatePath("/blog");
    revalidatePath("/blog", "page");
    if (slug) {
      revalidatePath(`/blog/${slug}`);
    } else {
      revalidatePath("/blog/[slug]", "page");
    }

    return NextResponse.json({ revalidated: true, slug });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Revalidation failed" },
      { status: 500 }
    );
  }
}
