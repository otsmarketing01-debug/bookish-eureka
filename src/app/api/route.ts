import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    name: "JHB Curtain Cleaning API",
    status: "ok",
    endpoints: ["/api/contact", "/api/chat-rooms", "/api/chat/messages", "/api/leads", "/api/blog", "/api/revalidate", "/api/auth"],
  });
}