"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  FaTwitter,
  FaHeart,
  FaRetweet,
  FaComment,
  FaEye,
  FaClock,
} from "react-icons/fa";
import { HiOutlineArrowLeft } from "react-icons/hi";

function getInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

function compactNumber(value = 0) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(Number(value || 0));
}

function normalizeUsersResponse(payload) {
  if (Array.isArray(payload?.users)) return payload.users;
  if (Array.isArray(payload?.data?.users)) return payload.data.users;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload)) return payload;
  return [];
}

function formatDeskLabel(value = "") {
  const cleaned = value.trim();
  if (!cleaned) return "India desk";

  return `${cleaned
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")} desk`;
}

function safeNumber(value) {
  return Number(value || 0);
}

function getTwitterProfileImage(apiUser) {
  return (
    apiUser?.profileImageUrl ||
    apiUser?.profile_image_url_https ||
    apiUser?.profile_image_url ||
    apiUser?.author?.profilePicture ||
    ""
  );
}

function getTweetDate(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function isSameLocalDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function getUserId(user) {
  return String(user?.id || user?.rest_id || user?.userId || "");
}

function getUserHandle(user) {
  if (user?.screen_name) return `@${user.screen_name}`;
  if (user?.author?.userName) return `@${user.author.userName}`;
  if (user?.userName) return `@${user.userName}`;
  return "@unknown";
}

function getUserDisplayName(user, fallback = "Unknown Account") {
  return user?.name || user?.author?.name || user?.fullName || fallback;
}

function getUserLink(user) {
  const screenName =
    user?.screen_name || user?.author?.userName || user?.userName || "";
  return screenName ? `https://x.com/${screenName}` : "";
}

function normalizeTweet(tweet, fallbackHandle = "@unknown", accountId = "", index = 0) {
  return {
    id:
      tweet?.id ||
      tweet?.rest_id ||
      `${accountId || "account"}-tweet-${index}`,
    accountId,
    platform: "twitter",
    handle:
      fallbackHandle ||
      (tweet?.author?.userName ? `@${tweet.author.userName}` : "@unknown"),
    content:
      tweet?.full_text ||
      tweet?.text ||
      tweet?.note_tweet?.note_tweet_results?.result?.text ||
      "No text available",
    time:
      tweet?.created_at ||
      tweet?.createdAt ||
      tweet?.tweet_created_at ||
      "Recent",
    likes: compactNumber(
      tweet?.favorite_count || tweet?.favoriteCount || tweet?.likeCount || 0
    ),
    retweets: compactNumber(tweet?.retweet_count || tweet?.retweetCount || 0),
    replies: compactNumber(tweet?.reply_count || tweet?.replyCount || 0),
    views: compactNumber(
      tweet?.view_count || tweet?.views || tweet?.viewCount || 0
    ),
    sortTime:
      tweet?.created_at ||
      tweet?.createdAt ||
      tweet?.tweet_created_at ||
      null,
  };
}

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [apiUsers, setApiUsers] = useState([]);
  const [postsByAccount, setPostsByAccount] = useState({});
  const [activeTab, setActiveTab] = useState("all");

  const profileSlug = String(params?.id || "");

  const basicProfile = useMemo(() => {
    const name = searchParams.get("name") || "Unknown Manager";
    const desk = searchParams.get("desk") || "";
    const role = searchParams.get("role") || "Desk Manager";
    const idsParam = searchParams.get("ids") || "";

    const ids = idsParam
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);

    return {
      id: profileSlug,
      name,
      role,
      desk: formatDeskLabel(desk),
      avatar: getInitials(name),
      ids,
    };
  }, [profileSlug, searchParams]);

  useEffect(() => {
    const fetchAll = async () => {
      if (!basicProfile.ids.length) {
        setError("No Twitter account IDs were provided for this profile.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const usersRes = await fetch(
          `/api/twitter/users?ids=${basicProfile.ids.join(",")}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        if (!usersRes.ok) {
          throw new Error("Failed to fetch Twitter users");
        }

        const usersData = await usersRes.json();
        const fetchedUsers = normalizeUsersResponse(usersData);
        setApiUsers(fetchedUsers);

        const tweetsResults = await Promise.all(
          basicProfile.ids.map(async (id) => {
            try {
              const res = await fetch(`/api/twitter/user-tweets?id=${id}&limit=10`, {
                method: "GET",
                cache: "no-store",
              });

              if (!res.ok) return [id, []];

              const data = await res.json();
              const tweets = Array.isArray(data?.tweets)
                ? data.tweets
                : Array.isArray(data?.data)
                  ? data.data
                  : Array.isArray(data)
                    ? data
                    : [];

              return [id, tweets];
            } catch {
              return [id, []];
            }
          })
        );

        setPostsByAccount(Object.fromEntries(tweetsResults));
      } catch (err) {
        console.error(err);
        setError("Unable to load profile details right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [basicProfile.ids]);

  const profile = useMemo(() => {
    const socials = basicProfile.ids.map((id, index) => {
      const apiUser =
        apiUsers.find((user) => getUserId(user) === String(id)) || null;

      const followers = safeNumber(
        apiUser?.followers || apiUser?.author?.followers
      );
      const following = safeNumber(
        apiUser?.following || apiUser?.author?.following
      );
      const tweets = safeNumber(
        apiUser?.statusesCount ||
          apiUser?.statuses_count ||
          apiUser?.author?.statusesCount
      );
      const likes = safeNumber(
        apiUser?.favouritesCount ||
          apiUser?.favorites_count ||
          apiUser?.author?.favouritesCount
      );

      const handle = getUserHandle(apiUser);

      const accountPosts = (postsByAccount[String(id)] || []).map((tweet, tweetIndex) =>
        normalizeTweet(tweet, handle, String(id), tweetIndex)
      );

      return {
        id: String(id),
        platform: "twitter",
        handle,
        accountName: getUserDisplayName(apiUser, `Account ${index + 1}`),
        link: getUserLink(apiUser),
        icon: FaTwitter,
        color: "#1DA1F2",
        followers,
        following,
        tweets,
        likes,
        verified: Boolean(apiUser?.isBlueVerified || apiUser?.verified),
        screenName: apiUser?.screen_name || apiUser?.author?.userName || "",
        profileImage: getTwitterProfileImage(apiUser),
        apiUser,
        posts:
          accountPosts.length > 0
            ? accountPosts.sort((a, b) => {
                const aDate = getTweetDate(a.sortTime);
                const bDate = getTweetDate(b.sortTime);

                if (!aDate && !bDate) return 0;
                if (!aDate) return 1;
                if (!bDate) return -1;
                return bDate.getTime() - aDate.getTime();
              })
            : [
                {
                  id: `${id}-profile-bio`,
                  accountId: String(id),
                  platform: "twitter",
                  handle,
                  content:
                    apiUser?.description ||
                    apiUser?.author?.description ||
                    "No recent tweet data is available from the Twitter endpoint yet.",
                  time: "Profile bio",
                  likes: compactNumber(likes),
                  retweets: "—",
                  replies: "—",
                  views: "—",
                  sortTime: null,
                },
              ],
      };
    });

    const totals = socials.reduce(
      (acc, social) => {
        acc.followers += social.followers;
        acc.following += social.following;
        acc.tweets += social.tweets;
        acc.likes += social.likes;
        return acc;
      },
      { followers: 0, following: 0, tweets: 0, likes: 0 }
    );

    const allPosts = socials
      .flatMap((social) => social.posts)
      .sort((a, b) => {
        const aDate = getTweetDate(a.sortTime);
        const bDate = getTweetDate(b.sortTime);

        if (!aDate && !bDate) return 0;
        if (!aDate) return 1;
        if (!bDate) return -1;
        return bDate.getTime() - aDate.getTime();
      });

    const now = new Date();
    const tweetsTodayCount = Object.values(postsByAccount).reduce((acc, tweets) => {
      const count = (tweets || []).filter((tweet) => {
        const created =
          getTweetDate(tweet?.createdAt) ||
          getTweetDate(tweet?.created_at) ||
          getTweetDate(tweet?.tweet_created_at);

        return created ? isSameLocalDay(created, now) : false;
      }).length;

      return acc + count;
    }, 0);

    const primaryImage =
      socials.find((item) => item.profileImage)?.profileImage || "";

    return {
      id: profileSlug,
      name: basicProfile.name,
      role: basicProfile.role,
      desk: basicProfile.desk,
      avatar: basicProfile.avatar,
      socials,
      stats: {
        tweetsToday: tweetsTodayCount,
        totalTweets: totals.tweets,
        uploadsToday: 0,
        accounts: socials.length,
      },
      posts: allPosts,
      liveMetrics: {
        followers: totals.followers,
        following: totals.following,
        tweets: totals.tweets,
        likes: totals.likes,
        verified: socials.some((item) => item.verified),
        profileImage: primaryImage,
      },
    };
  }, [apiUsers, postsByAccount, basicProfile, profileSlug]);

  const visiblePosts = useMemo(() => {
    if (activeTab === "all") return profile.posts;
    const selected = profile.socials.find((social) => social.id === activeTab);
    return selected?.posts || [];
  }, [activeTab, profile]);

  if (!profileSlug) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800">Profile not found</h2>
          <button
            onClick={() => router.back()}
            className="mt-4 text-indigo-600 hover:text-indigo-700"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-slate-100 rounded-lg transition"
            >
              <HiOutlineArrowLeft className="w-5 h-5 text-slate-600" />
            </button>

            <div>
              <h1 className="text-lg font-semibold text-slate-800">
                {profile.name}
              </h1>
              <p className="text-xs text-slate-500">
                {profile.role} · {profile.desk}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {error ? (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-6">
          <div className="flex lg:flex-row md:flex-row flex-col justify-between align-center gap-4 flex-wrap">
            <div className="flex lg:flex-row md:flex-row flex-col md:max-w-[60%] lg:max-w-[70%] max-w-[100%] items-center md:items-center lg:items-center justify-start gap-4 flex-wrap">
              {profile.liveMetrics.profileImage ? (
                <img
                  src={profile.liveMetrics.profileImage}
                  alt={profile.name}
                  className="w-20 h-20 rounded-full object-cover border border-slate-200"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                  {profile.avatar}
                </div>
              )}

              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-800">
                  {profile.name}
                </h2>
                <p className="text-slate-500">
                  {profile.role} · {profile.desk}
                </p>

                <div className="flex flex-wrap gap-4 mt-3">
                  {profile.socials.map((social) => {
                    const content = (
                      <>
                        <social.icon style={{ color: social.color }} />
                        <span className="text-sm text-slate-700">
                          {social.handle}
                        </span>
                        <span className="text-xs text-slate-400">
                          · {social.accountName}
                        </span>
                      </>
                    );

                    if (social.link) {
                      return (
                        <a
                          key={social.id}
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border hover:bg-slate-100 transition"
                        >
                          {content}
                        </a>
                      );
                    }

                    return (
                      <div
                        key={social.id}
                        className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border"
                      >
                        {content}
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-500">
                  <span>
                    Followers:{" "}
                    <strong className="text-slate-800">
                      {loading ? "..." : compactNumber(profile.liveMetrics.followers)}
                    </strong>
                  </span>
                  <span>
                    Following:{" "}
                    <strong className="text-slate-800">
                      {loading ? "..." : compactNumber(profile.liveMetrics.following)}
                    </strong>
                  </span>
                  <span>
                    Verified:{" "}
                    <strong className="text-slate-800">
                      {profile.liveMetrics.verified ? "Yes" : "No"}
                    </strong>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex md:max-w-[40%] lg:max-w-[30%] max-w-[100%] items-center justify-center gap-4 border-slate-200 flex-wrap">
              <div className="flex flex-col items-center bg-indigo-50 border-2 border-indigo-200 rounded-2xl px-5 py-4 min-w-[130px] shadow-sm">
                <div className="text-3xl font-extrabold text-indigo-700 leading-none">
                  {loading ? "..." : profile.stats.tweetsToday}
                </div>
                <div className="text-sm font-semibold text-indigo-700 mt-2">
                  Tweets today
                </div>
                <div className="text-[11px] text-slate-500 text-center mt-1">
                  Based on combined account activity
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-slate-800">
                  {loading ? "..." : compactNumber(profile.stats.totalTweets)}
                </div>
                <div className="text-xs text-slate-500">Total tweets</div>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-slate-800">
                  {loading ? "..." : compactNumber(profile.liveMetrics.likes)}
                </div>
                <div className="text-xs text-slate-500">Likes</div>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-slate-800">
                  {profile.stats.accounts}
                </div>
                <div className="text-xs text-slate-500">Accounts</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex flex-wrap border-b border-slate-200">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-3 text-sm font-medium transition ${
                activeTab === "all"
                  ? "text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/30"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              All
            </button>

            {profile.socials.map((social) => (
              <button
                key={social.id}
                onClick={() => setActiveTab(social.id)}
                className={`px-4 py-3 text-sm font-medium transition ${
                  activeTab === social.id
                    ? "text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/30"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {social.handle}
              </button>
            ))}
          </div>

          <div className="divide-y divide-slate-100">
            {visiblePosts.map((post) => (
              <div key={post.id} className="p-5 hover:bg-slate-50 transition">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <FaTwitter className="text-[#1DA1F2] text-lg" />
                  <span className="font-medium text-slate-800">
                    {post.handle}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <FaClock className="w-3 h-3" /> {post.time}
                  </span>
                </div>

                <p className="text-slate-700 mb-3">{post.content}</p>

                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <FaHeart className="text-red-400" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaRetweet className="text-green-500" /> {post.retweets}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaComment className="text-blue-400" /> {post.replies}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaEye className="text-slate-400" /> {post.views}
                  </span>
                </div>
              </div>
            ))}

            {!loading && visiblePosts.length === 0 ? (
              <div className="p-6 text-sm text-slate-500">
                No posts available for this handle.
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}