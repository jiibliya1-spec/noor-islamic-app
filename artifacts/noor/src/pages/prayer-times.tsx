import { useState, useEffect } from “react”;
import { usePrayerTimesByCoords, usePrayerTimes } from “@/hooks/use-external-api”;
import { loadPrayerPrefs, savePrayerPrefs } from “@/hooks/use-prayer-prefs”;
import { useDeviceCompass } from “@/hooks/use-device-compass”;
import { useAdhanAlarm, savePrayerTimings } from “@/hooks/use-adhan-alarm”;
import {
MapPin, Loader2, Compass, Search,
Sunrise, Sun, Cloud, Sunset, Moon,
AlertCircle, Navigation2, CheckCircle2,
} from “lucide-react”;
import { useI18n } from “@/lib/i18n”;
const PRAYERS = [“Fajr”, “Sunrise”, “Dhuhr”, “Asr”, “Maghrib”, “Isha”];
type Lang = “en” | “ar” | “fr” | “de”;
const PRAYER_NAMES: Record<Lang, Record<string, string>> = {
en: { Fajr: “Fajr”, Sunrise: “Sunrise”, Dhuhr: “Dhuhr”,   Asr: “Asr”,  Maghrib: “Maghrib”, Isha: “Isha” },
ar: { Fajr: “الفجر”, Sunrise: “الشروق”, Dhuhr: “الظهر”,  Asr: “العصر”, Maghrib: “المغرب”,  Isha: “العشاء” },
fr: { Fajr: “Fajr”, Sunrise: “Lever”,   Dhuhr: “Dhuhr”,   Asr: “Asr”,  Maghrib: “Maghrib”, Isha: “Isha” },
de: { Fajr: “Fajr”, Sunrise: “Aufgang”, Dhuhr: “Dhuhr”,   Asr: “Asr”,  Maghrib: “Maghrib”, Isha: “Isha” },
};
const METHODS = [
{ value: “3”, label: “Muslim World League” },
{ value: “5”, label: “Egyptian General Authority” },
{ value: “1”, label: “Karachi / Hanafi” },
{ value: “4”, label: “Umm Al-Qura (Makkah)” },
{ value: “2”, label: “ISNA (North America)” },
] as const;
function PrayerIcon({ prayer, className = “w-5 h-5” }: { prayer: string; className?: string }) {
switch (prayer) {
case “Fajr”:    return <Sunrise className={className} />;
case “Sunrise”: return <Sun     className={className} />;
case “Dhuhr”:   return <Sun     className={className} />;
case “Asr”:     return <Cloud   className={className} />;
case “Maghrib”: return <Sunset  className={className} />;
case “Isha”:    return <Moon    className={className} />;
default:        return <Sun     className={className} />;
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
const fmt = new Intl.DateTimeFormat(“en-GB”, {
hour: “2-digit”, minute: “2-digit”, hour12: false, timeZone: timezone,
}).format(new Date());
const [h, m] = fmt.split(”:”).map(Number);
return h * 60 + m;
} catch {
const n = new Date();
return n.getHours() * 60 + n.getMinutes();
}
}
function getCurrentPrayer(timings: Record<string, string>, timezone: string): string {
const nowMins = getNowMins(timezone);
let current = “Isha”;
for (const p of PRAYERS.filter(p => p !== “Sunrise”)) {
const [h, m] = (timings[p] || “00:00”).split(”:”).map(Number);
if (nowMins >= h * 60 + m) current = p;
}
return current;
}
function getNextPrayer(timings: Record<string, string>, timezone: string): string {
const nowMins = getNowMins(timezone);
for (const p of PRAYERS.filter(p => p !== “Sunrise”)) {
const [h, m] = (timings[p] || “00:00”).split(”:”).map(Number);
if (nowMins < h * 60 + m) return p;
}
return “Fajr”;
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
const appUrl = typeof window !== “undefined” ? window.location.href : “”;
if (isLive) {
const needleRotation = deviceHeading ?? qiblaAngle;
const diff = ((needleRotation - qiblaAngle + 360) % 360);
const isAligned = diff <= 5 || diff >= 355;
const alignedColor = “#22c55e”;
const needleColor  = isAligned ? alignedColor : “hsl(var(–primary))”;
const ringStroke   = isAligned ? “rgba(34,197,94,0.55)” : “rgba(255,255,255,0.10)”;
const kaabaRad = (qiblaAngle - 90) * (Math.PI / 180);
const kaabaR   = 82;
const kaabaX   = 120 + kaabaR * Math.cos(kaabaRad);
const kaabaY   = 120 + kaabaR * Math.sin(kaabaRad);

return (
  <div className="flex flex-col items-center gap-5">
    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border bg-emerald-500/15 border-emerald-500/30 text-emerald-400">
      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      {t("liveCompass")}
    </div>

    <div className="relative w-64 h-64 select-none">
      <svg viewBox="0 0 240 240" className="w-full h-full" aria-label="Qibla live compass">
        <defs>
          <radialGradient id="dialBg" cx="40%" cy="30%">
            <stop offset="0%"   stopColor="hsl(156,40%,14%)" />
            <stop offset="100%" stopColor="hsl(156,50%,7%)"  />
          </radialGradient>
          <radialGradient id="outerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="78%"  stopColor="transparent" />
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
          const isMajor    = deg % 30 === 0;
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
        <text x="120" y="30"  textAnchor="middle" dominantBaseline="middle" fill="#ef4444"                fontSize="16" fontWeight="800" fontFamily="Inter,system-ui,sans-serif">N</text>
        <text x="120" y="212" textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.40)" fontSize="13" fontWeight="600" fontFamily="Inter,system-ui,sans-serif">S</text>
        <text x="213" y="121" textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.40)" fontSize="13" fontWeight="600" fontFamily="Inter,system-ui,sans-serif">E</text>
        <text x="27"  y="121" textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.40)" fontSize="13" fontWeight="600" fontFamily="Inter,system-ui,sans-serif">W</text>
        <circle cx={kaabaX} cy={kaabaY} r="13" fill="hsl(var(--primary))" opacity="0.18" />
        <rect x={kaabaX - 9} y={kaabaY - 8} width="18" height="15" rx="2" fill="#0d0d0d" stroke="hsl(var(--primary))" strokeWidth="1.6" />
        <rect x={kaabaX - 9} y={kaabaY - 2} width="18" height="4" fill="hsl(var(--primary))" opacity="0.75" />
        <path d={`M${kaabaX-3},${kaabaY+7} Q${kaabaX},${kaabaY+2} ${kaabaX+3},${kaabaY+7} L${kaabaX+3},${kaabaY+8} L${kaabaX-3},${kaabaY+8} Z`} fill="hsl(var(--primary))" opacity="0.55" />
        <g style={{ transform: `rotate(${needleRotation}deg)`, transformOrigin: "120px 120px", transition: "transform 0.10s linear" }}>
          <ellipse cx="120" cy="50" rx="5" ry="9" fill={needleColor} opacity="0.22"
            style={{ transition: "fill 0.4s ease" }} />
          <polygon points="120,28 127,82 113,82" fill={needleColor} opacity="0.95"
            style={{ transition: "fill 0.4s ease" }} />
          <polygon points="120,212 125,162 115,162" fill="rgba(255,255,255,0.15)" />
          <circle cx="120" cy="120" r="6" fill="hsl(var(--background))" stroke={needleColor} strokeWidth="2"
            style={{ transition: "stroke 0.4s ease" }} />
          <circle cx="120" cy="120" r="3" fill={needleColor}
            style={{ transition: "fill 0.4s ease" }} />
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
‎          هذه هي القبلة
          <CheckCircle2 className="w-4 h-4 inline-block" />
        </p>
      ) : (
        <p className="text-xs text-muted-foreground mt-2 max-w-[240px] leading-relaxed">{t("rotateToAlign")}</p>
      )}
    </div>
  </div>
);


}
const qr = https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(appUrl)}&bgcolor=0d1a0f&color=c9a84c&qzone=2;
return (
<div className="flex flex-col items-center gap-4 w-full">
<div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border bg-primary/15 border-primary/25 text-primary">
<span className="w-2 h-2 rounded-full bg-primary" />
{t(“qiblaDirection”)}
</div>

  <p className="text-base font-semibold text-foreground text-center leading-snug">
    {t("qiblaDesktopPre")}{" "}
    <span className="text-primary font-bold font-mono text-xl">{bearing}°</span>{" "}
    {t("qiblaDesktopSuf")}
  </p>

  <div className="relative w-64 h-64 select-none">
    <svg viewBox="0 0 240 240" className="w-full h-full" aria-label="Qibla direction compass">
      <defs>
        <radialGradient id="roseBg" cx="40%" cy="30%">
          <stop offset="0%"   stopColor="hsl(156,40%,14%)" />
          <stop offset="100%" stopColor="hsl(156,50%,7%)"  />
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
      <text x="120" y="30"  textAnchor="middle" dominantBaseline="middle" fill="#ef4444"                fontSize="17" fontWeight="800" fontFamily="Inter,system-ui,sans-serif">N</text>
      <text x="120" y="212" textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.35)" fontSize="14" fontWeight="600" fontFamily="Inter,system-ui,sans-serif">S</text>
      <text x="213" y="121" textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.35)" fontSize="14" fontWeight="600" fontFamily="Inter,system-ui,sans-serif">E</text>
      <text x="27"  y="121" textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.35)" fontSize="14" fontWeight="600" fontFamily="Inter,system-ui,sans-serif">W</text>
      <text x="120" y="145" textAnchor="middle" dominantBaseline="middle"
        fill="rgba(255,255,255,0.18)" fontSize="11" fontFamily="Inter,system-ui,sans-serif">
        {bearing}°
      </text>
      <circle cx="120" cy="120" r="5" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="2" />
      <g style={{ transform: `rotate(${bearing}deg)`, transformOrigin: "120px 120px" }}>
        <line x1="120" y1="120" x2="120" y2="36"
          stroke="hsl(var(--primary))" strokeWidth="8" strokeLinecap="round" opacity="0.10" />
        <line x1="120" y1="120" x2="120" y2="44"
          stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
        <polygon points="120,18 110,46 130,46" fill="hsl(var(--primary))" opacity="0.95" />
        <rect x="111" y="14" width="18" height="14" rx="2"
          fill="#0d0d0d" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <rect x="111" y="19" width="18" height="3.5"
          fill="hsl(var(--primary))" opacity="0.75" />
        <rect x="116" y="22" width="8" height="6" rx="1"
          fill="hsl(var(--primary))" opacity="0.45" />
      </g>
    </svg>
  </div>

  <div className="w-full max-w-sm bg-card border border-border rounded-2xl px-4 py-3 text-center">
    <p className="text-sm text-muted-foreground leading-relaxed">
      {t("findNorthPre")}{" "}
      <span className="text-primary font-bold font-mono">{bearing}°</span>{" "}
      {t("findNorthSuf")}
    </p>
  </div>

  <div className="flex flex-col items-center gap-2 w-full max-w-sm">
    <button
      onClick={() => setShowQr(q => !q)}
      className="w-full flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary text-sm font-semibold rounded-xl px-4 py-2.5 transition-colors"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="8" height="8" rx="1"/><rect x="14" y="2" width="8" height="8" rx="1"/>
        <rect x="2" y="14" width="8" height="8" rx="1"/><rect x="14" y="17" width="3" height="3"/>
        <rect x="19" y="14" width="3" height="3"/><rect x="14" y="14" width="3" height="1"/>
      </svg>
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
cityInput:        p?.type === “city” ? ${p.city}, ${p.country} : “”,
submittedCity:    p?.type === “city” ? (p.city    ?? “”) : “”,
submittedCountry: p?.type === “city” ? (p.country ?? “”) : “”,
coords:           p?.type === “coords” ? { lat: p.lat!, lng: p.lng! } : null,
method:           p?.method ?? “3”,
};
}
export default function PrayerTimes() {
const { language, t } = useI18n();
const lang = ([“en”,“ar”,“fr”,“de”].includes(language) ? language : “en”) as Lang;
const { heading: deviceHeading, permission, requestPermission } = useDeviceCompass();
const initial = initFromPrefs();
const [coords,           setCoords]           = useState<{ lat: number; lng: number } | null>(initial.coords);
const [loadingLoc,       setLoadingLoc]        = useState(false);
const [locError,         setLocError]          = useState<string | null>(null);
const [cityInput,        setCityInput]         = useState(initial.cityInput);
const [submittedCity,    setSubmittedCity]     = useState(initial.submittedCity);
const [submittedCountry, setSubmittedCountry] = useState(initial.submittedCountry);
const [method,           setMethod]            = useState(initial.method);
const [qiblaAngle,       setQiblaAngle]        = useState<number | null>(null);
const { data: coordData, isLoading: coordLoading, error: coordError } =
usePrayerTimesByCoords(coords?.lat ?? 0, coords?.lng ?? 0, method);
const { data: cityData,  isLoading: cityLoading,  error: cityError  } =
usePrayerTimes(submittedCity, submittedCountry, method);
const data      = coords ? coordData : cityData;
const isLoading = coords ? coordLoading : cityLoading;
const apiError  = coords ? coordError  : cityError;
const timings   = data?.timings ?? null;
const timezone: string = data?.meta?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
const { banner, dismissBanner, playFromTap } = useAdhanAlarm(timings, language);
useEffect(() => {
if (timings) savePrayerTimings(timings);
}, [timings]);
useEffect(() => {
if (coords) setQiblaAngle(calculateQibla(coords.lat, coords.lng));
}, [coords]);
useEffect(() => {
const lat = cityData?.meta?.latitude  ? parseFloat(cityData.meta.latitude)  : null;
const lng = cityData?.meta?.longitude ? parseFloat(cityData.meta.longitude) : null;
if (lat !== null && lng !== null) setQiblaAngle(calculateQibla(lat, lng));
}, [cityData]);
useEffect(() => {
const prefs = loadPrayerPrefs();
if (prefs) savePrayerPrefs({ …prefs, method });
}, [method]);
useEffect(() => {
const prefs = loadPrayerPrefs();
if (prefs) return;
if (!(“geolocation” in navigator)) return;
navigator.geolocation.getCurrentPosition(
pos => {
const c = { lat: pos.coords.latitude, lng: pos.coords.longitude };
setCoords(c);
setCityInput(””); setSubmittedCity(””); setSubmittedCountry(””);
savePrayerPrefs({ type: “coords”, lat: c.lat, lng: c.lng, method: “3” });
},
() => {}
);
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
const handleDetectLocation = () => {
setLoadingLoc(true); setLocError(null);
if (!(“geolocation” in navigator)) {
setLoadingLoc(false);
setLocError(language === “ar”
‎? “الموقع الجغرافي غير مدعوم في هذا المتصفح.”
: “Geolocation is not supported by your browser.”);
return;
}
navigator.geolocation.getCurrentPosition(
pos => {
const c = { lat: pos.coords.latitude, lng: pos.coords.longitude };
setCoords(c); setSubmittedCity(””); setSubmittedCountry(””); setCityInput(””); setLoadingLoc(false);
savePrayerPrefs({ type: “coords”, lat: c.lat, lng: c.lng, method });
},
(err) => {
setLoadingLoc(false);
if (err.code === err.PERMISSION_DENIED) {
setLocError(language === “ar”
‎? “تم رفض إذن الموقع. افتح الإعدادات > الخصوصية > خدمات الموقع وفعّلها لهذا التطبيق.”
: “Location permission denied. Please open Settings → Privacy → Location Services and enable it for this browser.”);
} else if (err.code === err.POSITION_UNAVAILABLE) {
setLocError(language === “ar”
‎? “تعذر تحديد الموقع. تأكد من تفعيل GPS.”
: “Location unavailable. Ensure GPS is enabled and try again.”);
} else {
setLocError(language === “ar”
‎? “انتهت مهلة طلب الموقع. حاول مرة أخرى.”
: “Location request timed out. Please try again.”);
}
},
{ enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
);
};
const handleCitySearch = (e: React.FormEvent) => {
e.preventDefault();
const parts = cityInput.trim().split(”,”);
const city  = parts[0].trim(); const country = parts[1]?.trim() || “SA”;
if (!city) return;
setCoords(null); setQiblaAngle(null);
setSubmittedCity(city); setSubmittedCountry(country);
savePrayerPrefs({ type: “city”, city, country, method });
};
const dir           = language === “ar” ? “rtl” : “ltr”;
const currentPrayer = timings ? getCurrentPrayer(timings, timezone) : null;
const nextPrayer    = timings ? getNextPrayer(timings, timezone)    : null;
const locationLabel = coords ? t(“myLocation”) : submittedCity || “”;
const compassLive   = permission === “granted” && deviceHeading !== null;
return (
<div className="p-4 md:p-8 max-w-5xl mx-auto min-h-full pb-20" dir={dir}>
<h1 className="text-4xl font-bold text-foreground mb-8">
{t(“prayerTimes”)}
</h1>

  {/* Search */}
  <div className="flex flex-col sm:flex-row gap-3 mb-6">
    <form onSubmit={handleCitySearch} className="flex flex-1 gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input type="text" value={cityInput} onChange={e => setCityInput(e.target.value)}
          placeholder={t("cityCountryPlaceholder")}
          className="w-full pl-9 pr-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm"
        />
      </div>
      <button type="submit" className="px-5 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition">
        {t("search")}
      </button>
    </form>
    <button onClick={handleDetectLocation} disabled={loadingLoc}
      className="flex items-center gap-2 px-4 py-3 rounded-xl bg-card border border-border text-foreground hover:bg-white/10 transition text-sm font-medium">
      {loadingLoc ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4 text-primary" />}
      {t("myLocation")}
    </button>
  </div>

  {/* Method selector */}
  <div className="mb-8">
    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
      {t("calculationMethod")}
    </label>
    <div className="flex flex-wrap gap-2">
      {METHODS.map(m => (
        <button key={m.value} onClick={() => setMethod(m.value)}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            method === m.value
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-card border border-border/50 text-muted-foreground hover:bg-white/10"
          }`}>
          {m.label}
        </button>
      ))}
    </div>
  </div>

  {/* Errors */}
  {locError && (
    <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-6 text-sm text-red-400">
      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
      <span>{locError}</span>
    </div>
  )}
  {apiError && !isLoading && (
    <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-6 text-sm text-red-400">
      <AlertCircle className="w-4 h-4 shrink-0" />
      {language === "ar" ? "لم يتم العثور على المدينة." : "City not found. Check the name and country code (e.g. Berlin, DE)."}
    </div>
  )}

  {isLoading && <div className="flex justify-center py-20"><Loader2 className="w-12 h-12 text-primary animate-spin" /></div>}

  {!isLoading && timings && (
    <>
      {/* Location + date bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary shrink-0" />
          <span className="font-semibold text-foreground">{locationLabel}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {data?.date?.readable && <span>{data.date.readable}</span>}
          {timezone && (
            <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium">{timezone}</span>
          )}
        </div>
      </div>

      {/* Next prayer */}
      {nextPrayer && (
        <div className="glass-card rounded-3xl p-6 mb-6 border-l-4 border-l-primary flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest mb-1">
              {t("nextPrayer")}
            </p>
            <p className="text-3xl font-bold text-foreground">
              {PRAYER_NAMES[lang][nextPrayer]}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <PrayerIcon prayer={nextPrayer} className="w-8 h-8 text-primary" />
            <span className="text-5xl font-mono font-bold text-primary">{timings[nextPrayer]}</span>
          </div>
        </div>
      )}

      {/* Prayer grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {PRAYERS.map(prayer => {
          const isCurrent = prayer === currentPrayer, isNext = prayer === nextPrayer;
          return (
            <div key={prayer}
              className={`glass-card rounded-2xl p-6 text-center transition-all ${
                isCurrent ? "border-primary/60 bg-primary/10" : isNext ? "border-primary/30" : "border-white/5"
              }`}>
              <div className={`flex justify-center mb-2 ${isCurrent || isNext ? "text-primary" : "text-muted-foreground"}`}>
                <PrayerIcon prayer={prayer} className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-muted-foreground text-xs uppercase tracking-widest mb-1">
                {PRAYER_NAMES[lang][prayer]}
              </h3>
              <p className="text-3xl font-mono font-bold text-primary">{timings[prayer]}</p>
              {isCurrent && (
                <span className="text-xs text-primary font-semibold mt-2 block">
                  {t("currentPrayer")}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Qibla Compass */}
      <div className="glass-card rounded-3xl p-8">
        <h3 className="text-xl font-bold text-foreground mb-6 text-center">
          {t("qiblaDirection")}
        </h3>

        {qiblaAngle !== null ? (
          <div className="flex flex-col items-center gap-6">
            <QiblaCompass
              qiblaAngle={qiblaAngle}
              deviceHeading={deviceHeading}
              isLive={compassLive}
              t={t}
            />

            {permission === "unknown" && (
              <button
                onClick={requestPermission}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition shadow-lg shadow-primary/20"
              >
                <Navigation2 className="w-4 h-4" />
                {t("liveCompass")}
              </button>
            )}
            {permission === "denied" && (
              <p className="text-xs text-muted-foreground text-center max-w-xs">
                {t("enableCompassLive")}
              </p>
            )}
            {permission === "unavailable" && (
              <p className="text-xs text-muted-foreground text-center">
                {t("staticBearing")}
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 text-center py-4">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
              <Compass className="w-10 h-10 text-primary" />
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">
              {t("qiblaDirection")}
            </p>
          </div>
        )}
      </div>
    </>
  )}

  {!isLoading && !timings && !apiError && (
    <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground gap-4">
      <MapPin className="w-16 h-16 text-primary/30" />
      <p className="text-lg font-medium">{t("searchCity")}</p>
      <button onClick={handleDetectLocation}
        className="mt-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm">
        {t("myLocation")}
      </button>
    </div>
  )}

  {/* Adhan Banner */}
  {banner.visible && (
    <div
      className="fixed bottom-20 left-4 right-4 z-50 rounded-2xl border border-primary/40 bg-card shadow-2xl shadow-primary/20 px-5 py-4 flex items-center justify-between gap-4"
      style={{ backdropFilter: "blur(12px)" }}
    >
      <div>
        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest mb-0.5">
          {language === "ar" ? "حان وقت الصلاة" : "Prayer Time"}
        </p>
        <p className="text-xl font-bold text-foreground">
          {PRAYER_NAMES[lang][banner.prayer] ?? banner.prayer}
        </p>
        <p className="text-sm font-mono text-primary">{banner.time}</p>
      </div>

      <div className="flex flex-col items-end gap-2">
        {banner.requiresTap ? (
          <button
            onClick={() => playFromTap(banner.audioUrl)}
            className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition"
          >
‎            اضغط لسماع الأذان
          </button>
        ) : (
          <p className="text-xs text-primary font-semibold animate-pulse">
            {language === "ar" ? "يُشغَّل الأذان..." : "Playing Adhan..."}
          </p>
        )}
        <button
          onClick={dismissBanner}
          className="text-xs text-muted-foreground hover:text-foreground transition"
        >
          {language === "ar" ? "إغلاق" : "Dismiss"}
        </button>
      </div>
    </div>
  )}
</div>


);
}