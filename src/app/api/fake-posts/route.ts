import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, Number(searchParams.get("page") || "1"));
    const limit = Math.max(1, Math.min(100, Number(searchParams.get("limit") || "30")));

    const filePath = path.join(process.cwd(), "public", "fake_posts.json");
    const raw = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(raw) as { items: any[] };

    const items = Array.isArray(data.items) ? data.items : [];
    const total = items.length;

    const start = (page - 1) * limit;
    const end = start + limit;
    const pageItems = start < total ? items.slice(start, end) : [];

    const totalPages = Math.max(1, Math.ceil(total / limit));
    const hasMore = page < totalPages;

    return NextResponse.json({
      page,
      pageSize: limit,
      total,
      totalPages,
      hasMore,
      items: pageItems,
    }, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: "Failed to read fake_posts.json", details: e?.message },
      { status: 500 }
    );
  }
}
