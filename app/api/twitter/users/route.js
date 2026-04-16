import { NextResponse } from "next/server";

const API_BASE = "https://api.twitterapi.io";

function chunkArray(items, size) {
  const chunks = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

function normalizeCsv(value = "") {
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

async function twitterFetch(path, searchParams = {}) {
  const apiKey = process.env.NEXT_PUBLIC_TWITTERAPI_KEY;

  if (!apiKey) {
    throw new Error("Missing NEXT_PUBLIC_TWITTERAPI_KEY in environment variables");
  }

  const url = new URL(`${API_BASE}${path}`);
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "X-API-Key": apiKey,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.msg || data?.error || "Twitter API request failed");
  }

  return data;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const ids = normalizeCsv(searchParams.get("ids"));
    const usernames = normalizeCsv(searchParams.get("usernames"));

    const users = [];

    // Use batch endpoint for IDs
    const idChunks = chunkArray(ids, 10);
    for (const chunk of idChunks) {
      const data = await twitterFetch("/twitter/user/batch_info_by_ids", {
        userIds: chunk.join(","),
      });

      console.log(data);

      if (Array.isArray(data?.users)) {
        users.push(...data.users);
      }
    }


    return NextResponse.json({
      ok: true,
      count: users.length,
      users,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error.message || "Unexpected server error",
      },
      { status: 500 }
    );
  }
}