import { useState, useEffect, useCallback } from "react";
import { usePrayerTimesByCoords, usePrayerTimes } from "@/hooks/use-external-api";
import { loadPrayerPrefs, savePrayerPrefs } from "@/hooks/use-prayer-prefs";
import { useDeviceCompass } from "@/hooks/use-device-compass";
import { useAdhanAlarm, savePrayerTimings } from "@/hooks/use-adhan-alarm";
import {
  MapPin, Loader2, Compass, Search,
  Sunrise, Sun, Cloud, Sunset, Moon,
  AlertCircle, Navigation2, CheckCircle2,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

const PRAYERS = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
type Lang = "en" | "ar" | "fr" | "de";
type Tab = "times" | "mosques";

const PRAYER_NAMES: Record<Lang, Record<string, string>> = {
  en: { Fajr: "Fajr", Sunrise: "Sunrise", Dhuhr: "Dhuhr", Asr: "Asr", Maghrib: "Maghrib", Isha: "Isha" },
  ar: { Fajr: "الفجر", Sunrise: "الشروق", Dhuhr: "الظهر", Asr: "العصر", Maghrib: "المغرب", Isha: "العشاء" },
  fr: { Fajr: "Fajr", Sunrise: "Lever", Dhuhr: "Dhuhr", Asr: "Asr", Maghrib: "Maghrib", Isha: "Isha" },
  de: { Fajr: "Fajr", Sunrise: "Aufgang", Dhuhr: "Dhuhr", Asr: "Asr", Maghrib: "Maghrib", Isha: "Isha" },
};

const METHODS = [
  { value: "3", label: "Muslim World League" },
  { value: "5", label: "Egyptian General Authority" },
  { value: "1", label: "Karachi / Hanafi" },
  { value: "4", label: "Umm Al-Qura (Makkah)" },
  { value: "2", label: "ISNA (North America)" },
] as const;

// الطريقة الافتراضية حسب البلد
function getDefaultMethod(lat: number, lng: number): string {
  // أوروبا
  if (lat > 35 && lat < 72 && lng > -25 && lng < 45) return "3"; // Muslim World League
  // أمريكا الشمالية
  if (lat > 15 && lat < 72 && lng < -50) return "2"; // ISNA
  // السعودية والخليج
  if (lat > 15 && lat < 32 && lng > 35 && lng < 60) return "4"; // Umm Al-Qura
  // مصر وشمال أفريقيا
  if (lat > 20 && lat < 38 && lng > -15 && lng < 37) return "5"; // Egyptian
  // الهند وباكستان
  if (lat > 5 && lat < 38 && lng > 60 && lng < 100) return "1"; // Karachi
  return "3"; // افتراضي
}

interface Mosque {
  id: number;
  name: string;
  lat: number;
  lon: number;
  distance: number;
  address?: string;
}

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatDistance(m: number): string {
  if (m < 1000) return Math.round(m) + " m";
  return (m / 1000).toFixed(1) + " km";
}

function MosqueCard({ mosque, userLat, userLng, lang }: {
  mosque: Mosque;
  userLat: number;
  userLng: number;
  lang: Lang;
}) {
  const mapsUrl = "https://www.google.com/maps/dir/" + userLat + "," + userLng + "/" + mosque.lat + "," + mosque.lon;
  const isRtl = lang === "ar";

  return (
    <div className="glass-card rounded-2xl p-4 flex items-start gap-4">
      {/* أيقونة المسجد */}
      <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
          <path d="M12 2L8 6H4v2h1l1 12h12L19 8h1V6h-4L12 2z" fill="currentColor" opacity="0.2"/>
          <path d="M12 2L8 6H4v2h1l1 12h12L19 8h1V6h-4L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M10 20v-6h4v6" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 2v2M8 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-foreground text-sm truncate">
          {mosque.name || (lang === "ar" ? "مسجد" : lang === "fr" ? "Mosquée" : lang === "de" ? "Moschee" : "Mosque")}
        </h3>
        {mosque.address && (
          <p className="text-xs text-muted-foreground mt-0.5 truncate">{mosque.address}</p>
        )}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
            {formatDistance(mosque.distance)}
          </span>
        </div>
      </div>

      {/* زر الاتجاه */}
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all active:scale-95"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="3 11 22 2 13 21 11 13 3 11"/>
        </svg>
        {lang === "ar" ? "اتجاه" : lang === "fr" ? "Itinéraire" : lang === "de" ? "Route" : "Go"}
      </a>
    </div>
  );
}

function PrayerIcon({ prayer, className = "w-5 h-5" }: { prayer: string; className?: string }) {
  switch (prayer) {
    case "Fajr": return <Sunrise className={className} />;
    case "Sunrise": return <Sun className={className} />;
    case "Dhuhr": return <Sun className={className} />;
    case "Asr": return <Cloud className={className} />;
    case "Maghrib": return <Sunset className={className} />;
    case "Isha": return <Moon className={className} />;
    default: return <Sun className={className} />;
  }
}

function calculateQibla(lat: number, lng: number): number {
  const kLat = 21.4225 * (Math.PI / 180);
  const kLng = 39.8262 * (Math.PI / 180);
  const uLat = lat * (Math.PI / 180);
  const dLng = kLng - lng * (Math.PI / 180);
  const y = Math.sin(dLng) * Math.cos(kLat);
  const x = Math.cos(uLat) * Math.sin(kLat) - Math.sin(uLat) * Math.cos(kLat) * Math.cos(dLng);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

function getNowMins(timezone: string): number {
  try {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit", minute: "2-digit", hour12: false, timeZone: timezone,
    }).format(new Date());
    const [h, m] = fmt.split(":").map(Number);
    return h * 60 + m;
  } catch {
    const n = new Date();
    return n.getHours() * 60 + n.getMinutes();
  }
}

function getCurrentPrayer(timings: Record<string, string>, timezone: string): string {
  const nowMins = getNowMins(timezone);
  let current = "Isha";
  for (const p of PRAYERS.filter(p => p !== "Sunrise")) {
    const [h, m] = (timings[p] || "00:00").split(":").map(Number);
    if (nowMins >= h * 60 + m) current = p;
  }
  return current;
}

function getNextPrayer(timings: Record<string, string>, timezone: string): string {
  const nowMins = getNowMins(timezone);
  for (const p of PRAYERS.filter(p => p !== "Sunrise")) {
    const [h, m] = (timings[p] || "00:00").split(":").map(Number);
    if (nowMins < h * 60 + m) return p;
  }
  return "Fajr";
}

interface QiblaCompassProps {
  qiblaAngle: number;
  deviceHeading: number | null;
  isLive: boolean;
  t: (key: string) => string;
}

function QiblaCompass({ qiblaAngle, deviceHeading, isLive, t }: QiblaCompassProps) {
  const bearing = Math.round(((qiblaAngle % 360) + 360) % 360);
  const [showQr, setShowQr] = useState(false);
  const appUrl = typeof window !== "undefined" ? window.location.href : "";

  if (isLive) {
    const heading = deviceHeading ?? 0;
    const needleRotation = qiblaAngle - heading;
    const diff = Math.abs(((heading - qiblaAngle + 540) % 360) - 180);
    const isAligned = diff <= 5;
    const alignedColor = "#22c55e";
    const needleColor = isAligned ? alignedColor : "hsl(var(--primary))";
    const ringStroke = isAligned ? "rgba(34,197,94,0.55)" : "rgba(255,255,255,0.10)";

    return (
      <div className="flex flex-col items-center gap-5">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border bg-emerald-500/15 border-emerald-500/30 text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          {t("liveCompass")}
        </div>
        <div className="relative w-64 h-64 select-none">
          <svg viewBox="0 0 240 240" className="w-full h-full">
            <defs>
              <radialGradient id="dialBg" cx="40%" cy="30%">
                <stop offset="0%" stopColor="hsl(156,40%,14%)" />
                <stop offset="100%" stopColor="hsl(156,50%,7%)" />
              </radialGradient>
              <radialGradient id="outerGlow" cx="50%" cy="50%" r="50%">
                <stop offset="78%" stopColor="transparent" />
                <stop offset="100%" stopColor={isAligned ? "#22c55e" : "hsl(var(--primary))"} stopOpacity="0.20" />
              </radialGradient>
            </defs>
            <circle cx="120" cy="120" r="118" fill="url(#outerGlow)" />
            <circle cx="120" cy="120" r="108" fill="url(#dialBg)"
              stroke={ringStroke} strokeWidth={isAligned ? 3 : 1.5}
              style={{ transition: "stroke 0.4s ease, stroke-width 0.4s ease" }} />
            {Array.from({ length: 72 }).map((_, i) => {
              const deg = i * 5;
              const isCardinal = deg % 90 === 0;
              const isMajor = deg % 30 === 0;
              const rad = (deg - 90) * (Math.PI / 180);
              const r1 = 100, r2 = isCardinal ? 78 : isMajor ? 86 : 93;
              return (
                <line key={i}
                  x1={120 + r1 * Math.cos(rad)} y1={120 + r1 * Math.sin(rad)}
                  x2={120 + r2 * Math.cos(rad)} y2={120 + r2 * Math.sin(rad)}
                  stroke={isCardinal ? "rgba(255,255,255,0.50)" : isMajor ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.07)"}
                  strokeWidth={isCardinal ? 2 : isMajor ? 1.5 : 1}
                />
              );
            })}
            <text x="120" y="30" textAnchor="middle" dominantBaseline="middle" fill="#ef4444" fontSize="16" fontWeight="800" fontFamily="Inter,system-ui,sans-serif">N</text>
            <text x="120" y="212" textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.40)" fontSize="13" fontWeight="600" fontFamily="Inter,system-ui,sans-serif">S</text>
            <text x="213" y="121" textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.40)" fontSize="13" fontWeight="600" fontFamily="Inter,system-ui,sans-serif">E</text>
            <text x="27" y="121" textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.40)" fontSize="13" fontWeight="600" fontFamily="Inter,system-ui,sans-serif">W</text>
            <circle cx="120" cy="36" r="14" fill="hsl(var(--primary))" opacity="0.15" />
            <rect x="111" y="26" width="18" height="16" rx="2" fill="#0a0a0a" stroke="hsl(var(--primary))" strokeWidth="1.8" />
            <rect x="111" y="32" width="18" height="4" fill="hsl(var(--primary))" opacity="0.8" />
            <path d="M114,42 Q120,36 126,42 L126,43 L114,43 Z" fill="hsl(var(--primary))" opacity="0.6" />
            <g style={{ transform: "rotate(" + needleRotation + "deg)", transformOrigin: "120px 120px", transition: "transform 0.10s linear" }}>
              <polygon points="120,32 127,82 113,82" fill={needleColor} opacity="0.95" style={{ transition: "fill 0.4s ease" }} />
              <polygon points="120,210 125,162 115,162" fill="rgba(255,255,255,0.12)" />
              <circle cx="120" cy="120" r="7" fill="hsl(var(--background))" stroke={needleColor} strokeWidth="2.5" style={{ transition: "stroke 0.4s ease" }} />
              <circle cx="120" cy="120" r="3.5" fill={needleColor} style={{ transition: "fill 0.4s ease" }} />
            </g>
          </svg>
        </div>
        <div className="text-center">
          <p className="text-5xl font-bold font-mono leading-none"
            style={{ color: isAligned ? "#22c55e" : "hsl(var(--primary))", transition: "color 0.4s ease" }}>
            {bearing}°
          </p>
          {isAligned ? (
            <p className="text-base font-bold mt-2 animate-pulse flex items-center justify-center gap-2" style={{ color: "#22c55e" }} dir="rtl">
              هذه هي القبلة <CheckCircle2 className="w-4 h-4 inline-block" />
            </p>
          ) : (
            <p className="text-xs text-muted-foreground mt-2 max-w-[240px] leading-relaxed">{t("rotateToAlign")}</p>
          )}
        </div>
      </div>
    );
  }

  const qr = "https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=" + encodeURIComponent(appUrl) + "&bgcolor=0d1a0f&color=c9a84c&qzone=2";

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border bg-primary/15 border-primary/25 text-primary">
        <span className="w-2 h-2 rounded-full bg-primary" />
        {t("qiblaDirection")}
      </div>
      <p className="text-base font-semibold text-foreground text-center leading-snug">
        {t("qiblaDesktopPre")} <span className="text-primary font-bold font-mono text-xl">{bearing}°</span> {t("qiblaDesktopSuf")}
      </p>
      <div className="relative w-64 h-64 select-none">
        <svg viewBox="0 0 240 240" className="w-full h-full">
          <defs>
            <radialGradient id="roseBg" cx="40%" cy="30%">
              <stop offset="0%" stopColor="hsl(156,40%,14%)" />
              <stop offset="100%" stopColor="hsl(156,50%,7%)" />
            </radialGradient>
          </defs>
          <circle cx="120" cy="120" r="118" fill="hsl(var(--primary))" opacity="0.07" />
          <circle cx="120" cy="120" r="108" fill="url(#roseBg)" stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" />
          {Array.from({ length: 16 }).map((_, i) => {
            const deg = i * 22.5;
            const isCard = deg % 90 === 0;
            const rad = (deg - 90) * (Math.PI / 180);
            const r1 = 100, r2 = isCard ? 76 : 90;
            return (
              <line key={i}
                x1={120 + r1 * Math.cos(rad)} y1={120 + r1 * Math.sin(rad)}
                x2={120 + r2 * Math.cos(rad)} y2={120 + r2 * Math.sin(rad)}
                stroke={isCard ? "rgba(255,255,255,0.40)" : "rgba(255,255,255,0.12)"}
                strokeWidth={isCard ? 2 : 1}
              />
            );
          })}
          <text x="120" y="30" textAnchor="middle" dominantBaseline="middle" fill="#ef4444" fontSize="17" fontWeight="800">N</text>
          <text x="120" y="212" textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.35)" fontSize="14" fontWeight="600">S</text>
          <text x="213" y="121" textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.35)" fontSize="14" fontWeight="600">E</text>
          <text x="27" y="121" textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.35)" fontSize="14" fontWeight="600">W</text>
          <circle cx="120" cy="120" r="5" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="2" />
          <g style={{ transform: "rotate(" + bearing + "deg)", transformOrigin: "120px 120px" }}>
            <line x1="120" y1="120" x2="120" y2="36" stroke="hsl(var(--primary))" strokeWidth="8" strokeLinecap="round" opacity="0.10" />
            <line x1="120" y1="120" x2="120" y2="44" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
            <polygon points="120,18 110,46 130,46" fill="hsl(var(--primary))" opacity="0.95" />
            <rect x="111" y="14" width="18" height="14" rx="2" fill="#0d0d0d" stroke="hsl(var(--primary))" strokeWidth="1.5" />
            <rect x="111" y="19" width="18" height="3.5" fill="hsl(var(--primary))" opacity="0.75" />
            <rect x="116" y="22" width="8" height="6" rx="1" fill="hsl(var(--primary))" opacity="0.45" />
          </g>
        </svg>
      </div>
      <div className="w-full max-w-sm bg-card border border-border rounded-2xl px-4 py-3 text-center">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t("findNorthPre")} <span className="text-primary font-bold font-mono">{bearing}°</span> {t("findNorthSuf")}
        </p>
      </div>
      <div className="flex flex-col items-center gap-2 w-full max-w-sm">
        <button onClick={() => setShowQr(q => !q)} className="w-full flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary text-sm font-semibold rounded-xl px-4 py-2.5 transition-colors">
          {t("openOnPhone")}
        </button>
        {showQr && (
          <div className="flex flex-col items-center gap-1.5 pt-1">
            <img src={qr} alt="QR code" width={140} height={140} className="rounded-xl border border-primary/20" />
            <p className="text-xs text-muted-foreground">{t("scanQr")}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function initFromPrefs() {
  const p = loadPrayerPrefs();
  return {
    cityInput: p?.type === "city" ? p.city + ", " + p.country : "",
    submittedCity: p?.type === "city" ? (p.city ?? "") : "",
    submittedCountry: p?.type === "city" ? (p.country ?? "") : "",
    coords: p?.type === "coords" ? { lat: p.lat!, lng: p.lng! } : null,
    method: p?.method ?? "3",
  };
}

export default function PrayerTimes() {
  const { language, t } = useI18n();
  const lang = (["en", "ar", "fr", "de"].includes(language) ? language : "en") as Lang;
  const { heading: deviceHeading, permission, requestPermission } = useDeviceCompass();

  const initial = initFromPrefs();
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(initial.coords);
  const [loadingLoc, setLoadingLoc] = useState(false);
  const [locError, setLocError] = useState<string | null>(null);
  const [cityInput, setCityInput] = useState(initial.cityInput);
  const [submittedCity, setSubmittedCity] = useState(initial.submittedCity);
  const [submittedCountry, setSubmittedCountry] = useState(initial.submittedCountry);
  const [method, setMethod] = useState(initial.method);
  const [qiblaAngle, setQiblaAngle] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("times");

  // المساجد
  const [mosques, setMosques] = useState<Mosque[]>([]);
  const [mosquesLoading, setMosquesLoading] = useState(false);
  const [mosquesError, setMosquesError] = useState<string | null>(null);
  const [mosqueSearch, setMosqueSearch] = useState("");

  const { data: coordData, isLoading: coordLoading, error: coordError } =
    usePrayerTimesByCoords(coords?.lat ?? 0, coords?.lng ?? 0, method);
  const { data: cityData, isLoading: cityLoading, error: cityError } =
    usePrayerTimes(submittedCity, submittedCountry, method);

  const data = coords ? coordData : cityData;
  const isLoading = coords ? coordLoading : cityLoading;
  const apiError = coords ? coordError : cityError;
  const timings = data?.timings ?? null;
  const timezone: string = data?.meta?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;

  const { banner, dismissBanner, playFromTap } = useAdhanAlarm(timings, language);

  // جلب المساجد من Overpass API
  const fetchMosques = useCallback(async (lat: number, lng: number) => {
    setMosquesLoading(true);
    setMosquesError(null);
    try {
      // نبحث في radius 5km كامل المدينة
      const query = "[out:json][timeout:25];(node[\"amenity\"=\"place_of_worship\"][\"religion\"=\"muslim\"](around:5000," + lat + "," + lng + ");way[\"amenity\"=\"place_of_worship\"][\"religion\"=\"muslim\"](around:5000," + lat + "," + lng + "););out center;";
      const res = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: query,
      });
      const json = await res.json();
      const elements = json.elements || [];
      const result: Mosque[] = elements
        .map((el: any) => {
          const elLat = el.lat ?? el.center?.lat;
          const elLon = el.lon ?? el.center?.lon;
          if (!elLat || !elLon) return null;
          const dist = getDistance(lat, lng, elLat, elLon);
          return {
            id: el.id,
            name: el.tags?.name || el.tags?.["name:ar"] || el.tags?.["name:en"] || "",
            lat: elLat,
            lon: elLon,
            distance: dist,
            address: [el.tags?.["addr:street"], el.tags?.["addr:housenumber"], el.tags?.["addr:city"]]
              .filter(Boolean).join(" "),
          };
        })
        .filter(Boolean)
        .sort((a: Mosque, b: Mosque) => a.distance - b.distance);
      setMosques(result);
    } catch {
      setMosquesError(language === "ar" ? "تعذر تحميل المساجد." : "Could not load mosques.");
    } finally {
      setMosquesLoading(false);
    }
  }, [language]);

  useEffect(() => { if (timings) savePrayerTimings(timings); }, [timings]);

  useEffect(() => {
    if (coords) {
      setQiblaAngle(calculateQibla(coords.lat, coords.lng));
      // جلب المساجد تلقائياً
      fetchMosques(coords.lat, coords.lng);
    }
  }, [coords, fetchMosques]);

  useEffect(() => {
    const lat​​​​​​​​​​​​​​​​
