import { NextResponse } from "next/server";
import { searchPosts } from "@/lib/blog";
import { toErrorResponse, ValidationError } from "@/lib/errors";

// Public: search published blog posts by query string
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") ?? "";
    if (!q.trim()) {
      throw new ValidationError("Search query is required");
    }
    const posts = await searchPosts(q, 20);
    return NextResponse.json({ posts, query: q });
  } catch (err) {
    const e = toErrorResponse(err);
    return NextResponse.json(e, { status: e.statusCode });
  }
}
