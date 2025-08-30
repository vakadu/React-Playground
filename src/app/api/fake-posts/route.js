import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

export const dynamic = "force-dynamic";

const tokenToIndex = new Map([["0", 0]]);

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const pageToken = (searchParams.get("pageToken") || "0").toString();
    const limit = Math.max(1, Math.min(100, Number(searchParams.get("limit") || "30")));

    const filePath = path.join(process.cwd(), "public", "fake_posts.json");
    const raw = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(raw);
    const items = Array.isArray(data.items) ? data.items : [];
    const total = items.length;

    const start = tokenToIndex.get(pageToken) ?? 0;
    const end = Math.min(start + limit, total);

    const pageItems = start < total ? items.slice(start, end) : [];
    const hasMore = end < total;

    let nextPageToken = null;
    if (hasMore) {
      nextPageToken = crypto.randomUUID();
      tokenToIndex.set(nextPageToken, end);
    }

    return NextResponse.json(
      {
        pageToken,
        nextPageToken,
        pageSize: limit,
        total,
        hasMore,
        items: pageItems,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to read fake_posts.json", details: e?.message },
      { status: 500 }
    );
  }
}
