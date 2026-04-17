"use client";

import { useEffect, useMemo, useState } from "react";
import { FaGlobeAsia } from "react-icons/fa";
import { HiOutlineArrowUp } from "react-icons/hi";
import { MdOutlineAnalytics } from "react-icons/md";
import { FiExternalLink, FiRefreshCw } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";

const twitterUsersSeed = [{'desk': '',
  'handlerName': 'Amna Fayyaz',
  'id': '1996213399236325376',
  'accountName': 'Lakhsmi Kumar',
  'link': 'https://x.com/itslakshmikumar'},
 {'desk': '',
  'handlerName': 'Zubia Ishfaq',
  'id': '1825223654361485312',
  'accountName': 'Shakti Tara',
  'link': 'https://x.com/CarolMarti81931'},
 {'desk': '',
  'handlerName': 'Zubia Ishfaq',
  'id': '2036716840718589952',
  'accountName': 'Hill State Digital',
  'link': 'https://x.com/hill_state'},
 {'desk': '',
  'handlerName': 'Hamdan ali',
  'id': '1971660619498901506',
  'accountName': 'Sangeeta',
  'link': 'https://x.com/sangeeta_speak?s=11'},
 {'desk': '',
  'handlerName': 'Hamdan ali',
  'id': '2037275559894347776',
  'accountName': 'Hamdan Ali',
  'link': 'https://x.com/hamdan_ali_786?s=11'},
 {'desk': '',
  'handlerName': 'Raheela Kokab',
  'id': '1998247009996996609',
  'accountName': 'Aruvi Dhuta',
  'link': 'https://x.com/AruviDhuta432'},
 {'desk': '',
  'handlerName': 'Raheela Kokab',
  'id': '1999413119249186821',
  'accountName': 'South India Insider',
  'link': 'https://x.com/SouthInsiderX'},
 {'desk': 'Northeast ',
  'handlerName': 'Ilsa Azhar',
  'id': '2016372902380318720',
  'accountName': 'Nilakshi Rabha',
  'link': 'https://x.com/nilakshirabhaa?s=21'},
 {'desk': 'Northeast ',
  'handlerName': 'Ilsa Azhar',
  'id': '2004100784611643395',
  'accountName': 'Rebecca',
  'link': 'https://x.com/rebecca_us_/status/2042143820683354610?s=46'},
 {'desk': 'Northeast',
  'handlerName': 'Areesha Nisar',
  'id': '2022275498139848704',
  'accountName': 'Divya Yadav',
  'link': 'https://x.com/divyayadav98178?s=21'},
 {'desk': 'Northeast ',
  'handlerName': 'Areesha Nisar',
  'id': '2014338436342468608',
  'accountName': 'Radhica',
  'link': 'https://x.com/radhika_shar_ma?s=21'},
 {'desk': 'Northeast ',
  'handlerName': 'Areesha Nisar',
  'id': '2018632682503274496',
  'accountName': 'Voice of North East',
  'link': 'https://x.com/vnorth__?s=21'},
 {'desk': 'Northeast ',
  'handlerName': 'Hasnain Iqbal',
  'id': '2042212150928625664',
  'accountName': 'Jyouti ',
  'link': 'https://x.com/jyouti29?s=21'},
 {'desk': 'Northeast',
  'handlerName': 'Hasnain Iqbal ',
  'id': '2001265759218274305',
  'accountName': 'Saanvi',
  'link': 'https://x.com/saanvi7956661?s=21'},
 {'desk': 'kashmir',
  'handlerName': 'madiha',
  'id': '1951606527204179968',
  'accountName': 'chensihaan',
  'link': 'https://x.com/chensihaaan'},
 {'desk': 'kashmir',
  'handlerName': 'madiha',
  'id': '1780965413687275520',
  'accountName': 'azad kashmir affairs',
  'link': 'https://x.com/AzadKashAffairs'},
 {'desk': 'kashmir',
  'handlerName': 'madiha',
  'id': '2037887920921575424',
  'accountName': 'the hidden truth',
  'link': ' https://x.com/TheHidTruth'},
 {'desk': 'Northeast',
  'handlerName': 'Ramsha Waheed',
  'id': '2012393490680823809',
  'accountName': 'Naira Seth',
  'link': 'https://x.com/Naira_Seth1'},
 {'desk': 'Kashmir',
  'handlerName': 'Noor ul ain',
  'id': '2042113334397263872',
  'accountName': 'Kashmiri Dastaar',
  'link': 'https://x.com/kashmiriDastaar'},
 {'desk': 'Kashmir ',
  'handlerName': 'Noor ul ain',
  'id': '2023437543782719488',
  'accountName': 'Kashmiri Diary',
  'link': 'https://x.com/kashmiri_diary'},
 {'desk': 'Northeast',
  'handlerName': 'Ramsha Waheed',
  'id': '31580938',
  'accountName': 'South Asian Files',
  'link': 'https://x.com/SouthAsianF'},
 {'desk': 'Def & FP',
  'handlerName': 'Abdullah Altaf',
  'id': '1704520963407413248',
  'accountName': 'Armed Forces Update',
  'link': 'https://x.com/ArmedUpdat1947'},
 {'desk': 'Def & FP',
  'handlerName': 'Abdullah Altaf',
  'id': '2004468166039420928',
  'accountName': 'India Decode',
  'link': 'https://x.com/IndiaDecodeIn'},
 {'desk': 'Def & FP',
  'handlerName': 'Mannan ',
  'id': '1458342747291672576',
  'accountName': 'Tactical Tribune ',
  'link': 'https://x.com/TacticalTribun?t=uzMD33Hc5qjN6Bphg3frRg&s=09'},
 {'desk': 'Def & FP',
  'handlerName': 'Mannan ',
  'id': '1437746448221802500',
  'accountName': 'AM Raad',
  'link': 'https://x.com/Raad_Pak?t=A6sW42kUHO7W3hc4c_oxAA&s=09'},
 {'desk': 'Def & FP',
  'handlerName': 'Tahama Asad',
  'id': '1859510292197277696',
  'accountName': 'Defence Watch',
  'link': 'https://x.com/_defensewatch/status/1996088422100795680?s=20'},
 {'desk': 'Def & FP',
  'handlerName': 'Tahama Asad',
  'id': '1645352391045271552',
  'accountName': 'South Asian Prespective ',
  'link': 'https://x.com/SAnPerspective'},
 {'desk': 'Def & FP',
  'handlerName': 'Wasif',
  'id': '1534486471041744896',
  'accountName': 'Defence Outpost',
  'link': 'https://x.com/ODA_Foxtrot'},
 {'desk': 'Def & FP',
  'handlerName': 'Wasif',
  'id': '1707079118012235776',
  'accountName': 'IronClad',
  'link': 'https://x.com/NavCom24'},
 {'desk': 'Def & FP',
  'handlerName': 'Dawood',
  'id': '2001881107621625856',
  'accountName': 'Asia Terrance Talk',
  'link': 'https://x.com/asia_now43https://www.facebook.com/share/1GAWE23BHe/'},
 {'desk': 'Def & FP',
  'handlerName': 'Musawir',
  'id': '1700196190699057152',
  'accountName': 'Musawir',
  'link': 'https://x.com/MusawarYDF'},
 {'desk': 'Def & FP',
  'handlerName': 'Musawir ',
  'id': '1997286841901539328',
  'accountName': 'Marie Catherine',
  'link': 'https://x.com/Decrypter_Inde'},
 {'desk': 'Def & FP',
  'handlerName': 'Musawir ',
  'id': '2000597725403131904',
  'accountName': 'Center for Conflict and resolution studies ',
  'link': 'https://x.com/conflict_f9314'},
 {'desk': 'Northeast',
  'handlerName': 'Tooba Akram ',
  'id': "",
  'accountName': 'Sush Sarma',
  'link': 'https://x.com/freedomthop3'},
 {'desk': 'Def & Common Themes',
  'handlerName': 'Yasir',
  'id': '1015292559604813824',
  'accountName': 'Yasir Rasool',
  'link': 'https://x.com/@YasirRasool007'},
 {'desk': 'Common Themes',
  'handlerName': 'Yasir',
  'id': '1597275364664934402',
  'accountName': 'Voice of Bharat',
  'link': 'https://x.com/bharatdiaries24'},
 {'desk': 'Northern Hindi ',
  'handlerName': 'Asim',
  'id': '1990400694504103936',
  'accountName': 'Urvikirpa ',
  'link': 'https://x.com/UrviKirpa'},
 {'desk': 'Boom Pakistan ',
  'handlerName': 'common Theme',
  'id': '2030359856432242689',
  'accountName': 'Boom Pakistan ',
  'link': 'https://x.com/TheBoomPakistan'}]

const deskGradients = [
  "from-sky-50 to-white",
  "from-rose-50 to-white",
  "from-emerald-50 to-white",
  "from-violet-50 to-white",
  "from-amber-50 to-white",
  "from-cyan-50 to-white",
];

function getInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

function extractXHandle(link = "") {
  try {
    const url = new URL(link.trim());
    const parts = url.pathname.split("/").filter(Boolean);
    return parts[0] ? `@${parts[0]}` : "@unknown";
  } catch {
    return "@unknown";
  }
}

function slugify(value = "") {
  return value.toLowerCase().trim().replace(/\s+/g, "-");
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

function getApiUserById(apiUsers = [], id) {
  return apiUsers.find(
    (user) =>
      String(user?.id) === String(id) ||
      String(user?.rest_id) === String(id) ||
      String(user?.userId) === String(id)
  );
}

function normalizeDesk(value = "") {
  const cleaned = value.trim();
  if (!cleaned) return "india";
  return cleaned.toLowerCase();
}

function formatDeskLabel(value = "") {
  const normalized = normalizeDesk(value);
  return normalized
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function buildManagers(seedUsers, apiUsers) {
  const grouped = {};

  seedUsers.forEach((item, index) => {
    const key = item.handlerName.trim().toLowerCase();
    const apiUser = getApiUserById(apiUsers, item.id);
    const normalizedDesk = normalizeDesk(item.desk);

    if (!grouped[key]) {
      grouped[key] = {
        id: slugify(item.handlerName),
        initials: getInitials(item.handlerName),
        name: item.handlerName.trim(),
        role: `${formatDeskLabel(normalizedDesk)} Desk Manager`,
        desk: formatDeskLabel(normalizedDesk),
        deskKey: normalizedDesk,
        bgGradient: deskGradients[index % deskGradients.length],
        socials: [],
        stats: {
          accounts: 0,
          tweets: 0,
          followers: 0,
          following: 0,
          likes: 0,
        },
      };
    }

    const metrics = {
      tweets: Number(apiUser?.statusesCount || 0),
      followers: Number(apiUser?.followers || 0),
      following: Number(apiUser?.following || 0),
      likes: Number(apiUser?.favouritesCount || 0),
    };

    grouped[key].socials.push({
      id: item.id,
      accountName: item.accountName,
      handle: extractXHandle(item.link),
      link: item.link.trim(),
      apiUser,
      metrics,
    });

    grouped[key].stats.accounts += 1;
    grouped[key].stats.tweets += metrics.tweets;
    grouped[key].stats.followers += metrics.followers;
    grouped[key].stats.following += metrics.following;
    grouped[key].stats.likes += metrics.likes;
  });

  return Object.values(grouped);
}

const ManagerCard = ({ manager }) => {
  const router = useRouter();

  return (
    <div className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover animate-fadeIn">
      <div
        onClick={() => {
  const ids = manager.socials.map((s) => s.id).filter(Boolean).join(",");
  router.push(
    `/profile/${manager.id}?name=${encodeURIComponent(manager.name)}&desk=${encodeURIComponent(manager.desk)}&role=${encodeURIComponent(manager.role)}&ids=${encodeURIComponent(ids)}`
  );
}}
        className="cursor-pointer"
      >
        <div
          className={`p-5 pb-3 border-b border-slate-100 bg-gradient-to-r ${manager.bgGradient}`}
        >
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg shadow-inner">
              {manager.initials}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">{manager.name}</h3>
              <p className="text-xs text-indigo-600">
                {manager.role} · {manager.desk}
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex flex-wrap gap-2">
            {manager.socials.map((social) => (
              <Link
                key={social.id}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 bg-gray-100/80 hover:bg-gray-200 transition rounded-full px-3 py-1.5 text-xs font-medium text-indigo-700 border"
              >
                <span>{social.handle}</span>
                <span className="text-slate-400">·</span>
                <span>{social.accountName}</span>
                <FiExternalLink className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
              <p className="text-[11px] text-slate-500">Accounts</p>
              <p className="text-lg font-bold text-slate-800">
                {manager.stats.accounts}
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
              <p className="text-[11px] text-slate-500">Followers</p>
              <p className="text-lg font-bold text-slate-800">
                {compactNumber(manager.stats.followers)}
              </p>
            </div>
          </div>

          <div className="pt-1 flex justify-start items-center gap-4 text-[11px] text-slate-500 border-t border-slate-50 mt-1">
            <div className="flex justify-center items-center gap-2">
              <div className="w-3 h-3 bg-[#1a8cd8] rounded-[4px]"></div>
              <span>Tweets {compactNumber(manager.stats.tweets)}</span>
            </div>
            <div className="flex justify-center items-center gap-2">
              <div className="w-3 h-3 bg-[#e24b4a] rounded-[4px]"></div>
              <span>Likes {compactNumber(manager.stats.likes)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function IndiaDeskDashboard() {
  const [mounted, setMounted] = useState(false);
  const [todayDate, setTodayDate] = useState("");
  const [activeDesk, setActiveDesk] = useState("");
  const [twitterUsers, setTwitterUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    setTodayDate(formattedDate);
  }, []);

  const fetchTwitterUsers = async (isRefresh = false) => {
    try {
      setError("");
      if (isRefresh) setRefreshing(true);
      else setLoading(true);

      const userIds = twitterUsersSeed.map((u) => u.id).join(",");

      const res = await fetch(`/api/twitter/users?ids=${userIds}`, {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch batch twitter users");
      }

      const data = await res.json();
      setTwitterUsers(normalizeUsersResponse(data));
    } catch (err) {
      console.error(err);
      setError("Unable to load Twitter batch user data right now.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTwitterUsers();
  }, []);

  const deskOptions = useMemo(() => {
    const deskMap = new Map();

    twitterUsersSeed.forEach((user) => {
      const key = normalizeDesk(user.desk);

      if (!deskMap.has(key)) {
        deskMap.set(key, {
          key,
          label: `${formatDeskLabel(key)} desk`,
        });
      }
    });

    return Array.from(deskMap.values()).sort((a, b) =>
      a.label.localeCompare(b.label)
    );
  }, []);

  useEffect(() => {
    if (!activeDesk && deskOptions.length > 0) {
      setActiveDesk(deskOptions[0].key);
    }
  }, [activeDesk, deskOptions]);

  const filteredSeedUsers = useMemo(() => {
    if (!activeDesk) return twitterUsersSeed;
    return twitterUsersSeed.filter(
      (user) => normalizeDesk(user.desk) === activeDesk
    );
  }, [activeDesk]);

  const managersData = useMemo(() => {
    return buildManagers(filteredSeedUsers, twitterUsers);
  }, [filteredSeedUsers, twitterUsers]);

  const dashboardStats = useMemo(() => {
    return managersData.reduce(
      (acc, manager) => {
        acc.totalPosts += manager.stats.tweets;
        acc.totalReach += manager.stats.followers;
        acc.engagements += manager.stats.likes;
        acc.activeAccounts += manager.stats.accounts;
        return acc;
      },
      {
        totalPosts: 0,
        totalReach: 0,
        engagements: 0,
        activeAccounts: 0,
      }
    );
  }, [managersData]);

  if (!mounted) return null;

  return (
    <div className="font-sans antialiased bg-gradient-to-br from-slate-50 to-gray-100 min-h-[90vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-slate-700">
              <MdOutlineAnalytics className="w-6 h-6 text-indigo-500" />
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Desk overview
              </h1>
            </div>
            <p className="text-slate-500 text-sm mt-1 flex items-center gap-1">
              Today, {todayDate}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {deskOptions.map((desk) => (
              <button
                key={desk.key}
                onClick={() => setActiveDesk(desk.key)}
                className={
                  activeDesk === desk.key
                    ? "inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
                    : "inline-flex items-center gap-2 bg-white text-indigo-600 border border-indigo-200 hover:bg-gray-50 text-sm font-medium px-4 py-2 rounded-lg transition shadow-sm"
                }
              >
                {desk.label}
              </button>
            ))}

            <button
              onClick={() => fetchTwitterUsers(true)}
              className="inline-flex items-center gap-2 bg-white text-slate-700 border border-slate-200 hover:bg-gray-50 text-sm font-medium px-4 py-2 rounded-lg transition shadow-sm"
              disabled={refreshing}
            >
              <FiRefreshCw className={refreshing ? "w-4 h-4 animate-spin" : "w-4 h-4"} />
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>

        {error ? (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <div className="bg-white rounded-2xl shadow-card p-5 border border-slate-100 transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium flex items-center gap-1">
                  Total Posts
                </p>
                <p className="text-3xl font-extrabold text-slate-800 mt-1">
                  {loading ? "..." : compactNumber(dashboardStats.totalPosts)}
                </p>
              </div>
            </div>
            <div className="bg-emerald-50 py-1 px-2 rounded-full text-emerald-700 text-xs font-semibold inline-flex items-center gap-1 mt-2">
              <HiOutlineArrowUp className="w-3 h-3" /> Live from batch API
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-5 border border-slate-100 transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover">
            <p className="text-slate-400 text-sm font-medium flex items-center gap-1">
              Total reach
            </p>
            <p className="text-3xl font-extrabold text-slate-800 mt-1">
              {loading ? "..." : compactNumber(dashboardStats.totalReach)}
            </p>
            <p className="text-xs text-slate-400 mt-1">followers across filtered accounts</p>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-5 border border-slate-100 transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover">
            <p className="text-slate-400 text-sm font-medium flex items-center gap-1">
              Engagements
            </p>
            <p className="text-3xl font-extrabold text-slate-800 mt-1">
              {loading ? "..." : compactNumber(dashboardStats.engagements)}
            </p>
            <p className="text-xs text-slate-400 mt-1">favourites from returned profiles</p>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-5 border border-slate-100 transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover">
            <p className="text-slate-400 text-sm font-medium flex items-center gap-1">
              Active accounts
            </p>
            <p className="text-3xl font-extrabold text-slate-800 mt-1">
              {loading ? "..." : dashboardStats.activeAccounts}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {managersData.length} managers, {dashboardStats.activeAccounts} handles
            </p>
          </div>
        </div>

        <div className="mb-4 flex flex-col items-start md:items-center md:flex-row gap-2 border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2 text-slate-700">
            <FaGlobeAsia className="w-5 h-5 text-indigo-500" />
            <h2 className="text-xl font-semibold text-slate-700">
              Managers — {activeDesk ? `${formatDeskLabel(activeDesk)} desk` : "All desks"}
            </h2>
          </div>
          <div className="bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full ml-2">
            {managersData.length} active profiles
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-card border border-slate-100 p-5 animate-pulse"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-12 w-12 rounded-full bg-slate-200" />
                    <div className="flex-1">
                      <div className="h-4 w-32 bg-slate-200 rounded mb-2" />
                      <div className="h-3 w-24 bg-slate-100 rounded" />
                    </div>
                  </div>
                  <div className="h-9 bg-slate-100 rounded-xl mb-3" />
                  <div className="h-9 bg-slate-100 rounded-xl mb-3" />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-16 bg-slate-100 rounded-xl" />
                    <div className="h-16 bg-slate-100 rounded-xl" />
                  </div>
                </div>
              ))
            : managersData.map((manager) => (
                <ManagerCard key={manager.id} manager={manager} />
              ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .shadow-card {
          box-shadow:
            0 8px 20px rgba(0, 0, 0, 0.03),
            0 2px 6px rgba(0, 0, 0, 0.05);
        }
        .shadow-card-hover {
          box-shadow:
            0 20px 25px -12px rgba(0, 0, 0, 0.1),
            0 4px 8px -4px rgba(0, 0, 0, 0.02);
        }
      `}</style>
    </div>
  );
}