import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { toErrorResponse, AuthenticationError, AuthorizationError, ValidationError } from "@/lib/errors";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

const ALLOWED = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 6 * 1024 * 1024; // 6MB

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new AuthenticationError();
    if (session.user.role !== "admin") throw new AuthorizationError();

    const formData = await req.formData();
    const file = formData.get("file");
    if (!file || !(file instanceof File)) {
      throw new ValidationError("No file provided");
    }
    if (!ALLOWED.includes(file.type)) {
      throw new ValidationError(`Unsupported file type: ${file.type}. Allowed: JPEG, PNG, WebP`);
    }
    if (file.size > MAX_SIZE) {
      throw new ValidationError("File too large (max 6MB)");
    }

    const ext = file.type.split("/")[1];
    const name = `${crypto.randomBytes(12).toString("hex")}.${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "gallery", "uploads");
    await mkdir(uploadDir, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(uploadDir, name), buffer);

    return NextResponse.json({ url: `/gallery/uploads/${name}`, name });
  } catch (err) {
    const e = toErrorResponse(err);
    return NextResponse.json(e, { status: e.statusCode });
  }
}
