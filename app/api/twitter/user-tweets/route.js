import { NextResponse } from "next/server";

const TWITTER_API_KEY = process.env.REACT_APP_TWITTER_API;

function normalizeTweetsResponse(payload) {
  if (Array.isArray(payload?.tweets)) return payload.tweets;
  if (Array.isArray(payload?.data?.tweets)) return payload.data.tweets;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload)) return payload;
  return [];
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id"); // Twitter user ID
    const limit = searchParams.get("limit") || "10";

    if (!id) {
      return NextResponse.json(
        { error: "Missing required query param: id" },
        { status: 400 }
      );
    }

    if (!TWITTER_API_KEY) {
      return NextResponse.json(
        { error: "Missing TWITTER_API_KEY in env" },
        { status: 500 }
      );
    }

    // 🔥 twitterapi.io endpoint (user tweets)
    const upstreamUrl = `https://api.twitterapi.io/twitter/user/last_tweets?userId=${encodeURIComponent(
      id
    )}&count=${encodeURIComponent(limit)}`;

    const response = await fetch(upstreamUrl, {
      method: "GET",
      headers: {
        "X-API-Key": TWITTER_API_KEY,
      },
      cache: "no-store",
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return NextResponse.json(
        {
          error: data?.message || "Failed to fetch tweets",
          upstream: data,
        },
        { status: response.status }
      );
    }

    const tweets = normalizeTweetsResponse(data);

    return NextResponse.json({
      tweets,
      count: tweets.length,
    });
  } catch (error) {
    console.error("user-tweets error:", error);

    return NextResponse.json(
      { error: "Failed to fetch user tweets" },
      { status: 500 }
    );
  }
}