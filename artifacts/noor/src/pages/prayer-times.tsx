import { useState, useEffect } from "react";
import { usePrayerTimesByCoords, usePrayerTimes } from "@/hooks/use-external-api";
import { loadPrayerPrefs, savePrayerPrefs } from "@/hooks/use-prayer-prefs";
import { useDeviceCompass } from "@/hooks/use-device-compass";
import {
  MapPin, Loader2, Compass, Search,
  Sunrise, Sun, Cloud, Sunset, Moon,
  AlertCircle, Navigation2,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

const PRAYERS = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

const ARABIC_NAMES: Record<string, string> = {
  Fajr: "الفجر", Sunrise: "الشروق", Dhuhr: "الظهر",
  Asr: "العصر", Maghrib: "المغرب", Isha: "العشاء",
};

const METHODS = [
  { value: "3", label: "Muslim World League" },
  { value: "5", label: "Egyptian General Authority" },
  { value: "1", label: "Karachi / Hanafi" },
  { value: "4", label: "Umm Al-Qura (Makkah)" },
  { value: "2", label: "ISNA (North America)" },
] as const;

function PrayerIcon({ prayer, className = "w-5 h-5" }: { prayer: string; className?: string }) {
  switch (prayer) {
    case "Fajr":    return <Sunrise className={className} />;
    case "Sunrise": return <Sun     className={className} />;
    case "Dhuhr":   return <Sun     className={className} />;
    case "Asr":     return <Cloud   className={className} />;
    case "Maghrib": return <Sunset  className={className} />;
    case "Isha":    return <Moon    className={className} />;
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

// ── Qibla Compass ──────────────────────────────────────────────────────────
//
// Design:
//   • Compass DIAL  — rotates by −deviceHeading (keeps N/E/S/W geographically
//     accurate as the phone rotates).
//   • Kaaba icon    — drawn at the CENTER of the dial (fixed over the dial).
//   • Gold needle   — rotates by (qiblaAngle − deviceHeading) so its tip
//     always points from the center TOWARD Makkah, regardless of phone heading.
//
// Formula:  needleAngle = qiblaAngle − deviceHeading
//           dialRotation = −deviceHeading
//
// No sensor: needle frozen at qiblaAngle (static bearing), dial at 0°.
// ──────────────────────────────────────────────────────────────────────────
interface QiblaCompassProps {
  qiblaAngle: number;
  deviceHeading: number | null;
  isLive: boolean;
  language: string;
}

function QiblaCompass({ qiblaAngle, deviceHeading, isLive, language }: QiblaCompassProps) {
  const dialRotation = deviceHeading !== null ? -deviceHeading : 0;
  const needleAngle  = deviceHeading !== null ? qiblaAngle - deviceHeading : qiblaAngle;
  const bearing      = Math.round(((qiblaAngle % 360) + 360) % 360);

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Status badge */}
      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
        isLive
          ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
          : "bg-primary/15 border-primary/25 text-primary"
      }`}>
        <span className={`w-2 h-2 rounded-full ${isLive ? "bg-emerald-400 animate-pulse" : "bg-primary"}`} />
        {isLive
          ? (language === "ar" ? "البوصلة مباشرة" : "Live Compass")
          : (language === "ar" ? "اتجاه ثابت" : "Static Bearing")}
      </div>

      {/* Compass */}
      <div className="relative w-64 h-64 select-none">
        <svg viewBox="0 0 240 240" className="w-full h-full" aria-label="Qibla compass">
          <defs>
            <radialGradient id="dialBg" cx="40%" cy="30%">
              <stop offset="0%"   stopColor="hsl(156,40%,14%)" />
              <stop offset="100%" stopColor="hsl(156,50%,7%)"  />
            </radialGradient>
            <radialGradient id="outerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="78%"  stopColor="transparent" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
            </radialGradient>
          </defs>

          {/* Outer glow */}
          <circle cx="120" cy="120" r="118" fill="url(#outerGlow)" />

          {/* Dial background */}
          <circle cx="120" cy="120" r="108"
            fill="url(#dialBg)"
            stroke="rgba(255,255,255,0.10)" strokeWidth="1.5"
          />

          {/* ── ROTATING DIAL ── */}
          <g style={{
            transform: `rotate(${dialRotation}deg)`,
            transformOrigin: "120px 120px",
            transition: isLive ? "transform 0.10s linear" : "none",
          }}>
            {/* Tick marks every 5° */}
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
                  stroke={isCardinal ? "rgba(255,255,255,0.45)" : isMajor ? "rgba(255,255,255,0.20)" : "rgba(255,255,255,0.07)"}
                  strokeWidth={isCardinal ? 2 : isMajor ? 1.5 : 1}
                />
              );
            })}
            {/* Cardinal labels */}
            <text x="120" y="30"  textAnchor="middle" dominantBaseline="middle" fill="#ef4444"                fontSize="16" fontWeight="800" fontFamily="Inter,system-ui,sans-serif">N</text>
            <text x="120" y="212" textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.40)" fontSize="13" fontWeight="600" fontFamily="Inter,system-ui,sans-serif">S</text>
            <text x="213" y="121" textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.40)" fontSize="13" fontWeight="600" fontFamily="Inter,system-ui,sans-serif">E</text>
            <text x="27"  y="121" textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.40)" fontSize="13" fontWeight="600" fontFamily="Inter,system-ui,sans-serif">W</text>
            {[
              { label: "NE", x: 185, y: 57  },
              { label: "SE", x: 185, y: 185 },
              { label: "SW", x: 55,  y: 185 },
              { label: "NW", x: 55,  y: 57  },
            ].map(({ label, x, y }) => (
              <text key={label} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
                fill="rgba(255,255,255,0.18)" fontSize="9" fontWeight="600"
                fontFamily="Inter,system-ui,sans-serif"
              >{label}</text>
            ))}
          </g>

          {/* ── NEEDLE — rotates to always point toward Makkah ── */}
          <g style={{
            transform: `rotate(${needleAngle}deg)`,
            transformOrigin: "120px 120px",
            transition: isLive ? "transform 0.10s linear" : "none",
          }}>
            {/* Tip glow */}
            <ellipse cx="120" cy="46" rx="6" ry="10"
              fill="hsl(var(--primary))" opacity="0.25"
            />
            {/* Gold tip (pointing up = toward Makkah) */}
            <polygon points="120,26 128,80 112,80"
              fill="hsl(var(--primary))" opacity="0.95"
            />
            {/* Tail (opposite direction) */}
            <polygon points="120,214 126,162 114,162"
              fill="rgba(255,255,255,0.15)"
            />
          </g>

          {/* ── KAABA at center (fixed, above needle) ── */}
          {/* Soft glow behind Kaaba */}
          <circle cx="120" cy="120" r="22"
            fill="hsl(var(--primary))" opacity="0.10"
          />
          {/* Cube body */}
          <rect x="106" y="109" width="28" height="22" rx="3"
            fill="#0d0d0d"
            stroke="hsl(var(--primary))" strokeWidth="1.8"
          />
          {/* Kiswah gold band */}
          <rect x="106" y="117" width="28" height="5"
            fill="hsl(var(--primary))" opacity="0.70"
          />
          {/* Door arch */}
          <path d="M115,131 Q120,124 125,131 L125,136 L115,136 Z"
            fill="hsl(var(--primary))" opacity="0.55"
          />
          {/* Left edge shadow */}
          <line x1="106" y1="109" x2="106" y2="131"
            stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.20"
          />
          {/* Center pin */}
          <circle cx="120" cy="120" r="4"
            fill="hsl(var(--primary))"
            stroke="hsl(var(--background))" strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* Bearing + hint */}
      <div className="text-center">
        <p className="text-5xl font-bold text-primary font-mono leading-none">{bearing}°</p>
        <p className="text-xs text-muted-foreground mt-2 max-w-[230px] leading-relaxed">
          {isLive
            ? (language === "ar"
                ? "السهم يشير دائماً نحو مكة المكرمة"
                : "The needle always points toward Makkah")
            : (language === "ar"
                ? `القبلة على بُعد ${bearing}° من الشمال`
                : `Qibla is ${bearing}° from North — enable compass for live tracking`)}
        </p>
      </div>
    </div>
  );
}

// ── Init from prefs ────────────────────────────────────────────────────────
function initFromPrefs() {
  const p = loadPrayerPrefs();
  return {
    cityInput:        p?.type === "city" ? `${p.city}, ${p.country}` : "",
    submittedCity:    p?.type === "city" ? (p.city    ?? "") : "",
    submittedCountry: p?.type === "city" ? (p.country ?? "") : "",
    coords:           p?.type === "coords" ? { lat: p.lat!, lng: p.lng! } : null,
    method:           p?.method ?? "3",
  };
}

export default function PrayerTimes() {
  const { language } = useI18n();
  const { heading: deviceHeading, permission, requestPermission } = useDeviceCompass();

  const initial = initFromPrefs();
  const [coords,           setCoords]           = useState<{ lat: number; lng: number } | null>(initial.coords);
  const [loadingLoc,       setLoadingLoc]        = useState(false);
  const [locError,         setLocError]          = useState(false);
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
    if (prefs) savePrayerPrefs({ ...prefs, method });
  }, [method]);

  const handleDetectLocation = () => {
    setLoadingLoc(true); setLocError(false);
    if (!("geolocation" in navigator)) { setLoadingLoc(false); setLocError(true); return; }
    navigator.geolocation.getCurrentPosition(
      pos => {
        const c = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setCoords(c); setSubmittedCity(""); setSubmittedCountry(""); setCityInput(""); setLoadingLoc(false);
        savePrayerPrefs({ type: "coords", lat: c.lat, lng: c.lng, method });
      },
      () => { setLoadingLoc(false); setLocError(true); },
      { timeout: 8000 }
    );
  };

  const handleCitySearch = (e: React.FormEvent) => {
    e.preventDefault();
    const parts = cityInput.trim().split(",");
    const city  = parts[0].trim(); const country = parts[1]?.trim() || "SA";
    if (!city) return;
    setCoords(null); setQiblaAngle(null);
    setSubmittedCity(city); setSubmittedCountry(country);
    savePrayerPrefs({ type: "city", city, country, method });
  };

  const dir           = language === "ar" ? "rtl" : "ltr";
  const currentPrayer = timings ? getCurrentPrayer(timings, timezone) : null;
  const nextPrayer    = timings ? getNextPrayer(timings, timezone)    : null;
  const locationLabel = coords
    ? (language === "ar" ? "موقعي الحالي" : "Current Location")
    : submittedCity || "";

  const compassLive = permission === "granted" && deviceHeading !== null;

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto min-h-full pb-20" dir={dir}>
      <h1 className="text-4xl font-bold text-foreground mb-8">
        {language === "ar" ? "مواقيت الصلاة" : "Prayer Times"}
      </h1>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <form onSubmit={handleCitySearch} className="flex flex-1 gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" value={cityInput} onChange={e => setCityInput(e.target.value)}
              placeholder={language === "ar" ? "المدينة، البلد (مثال: Berlin, DE)" : "City, Country (e.g. Berlin, DE)"}
              className="w-full pl-9 pr-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm"
            />
          </div>
          <button type="submit" className="px-5 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition">
            {language === "ar" ? "بحث" : "Search"}
          </button>
        </form>
        <button onClick={handleDetectLocation} disabled={loadingLoc}
          className="flex items-center gap-2 px-4 py-3 rounded-xl bg-card border border-border text-foreground hover:bg-white/10 transition text-sm font-medium">
          {loadingLoc ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4 text-primary" />}
          {language === "ar" ? "موقعي" : "My Location"}
        </button>
      </div>

      {/* Method selector */}
      <div className="mb-8">
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          {language === "ar" ? "طريقة الحساب" : "Calculation Method"}
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
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-6 text-sm text-red-400">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {language === "ar" ? "تعذر تحديد موقعك. ابحث عن مدينة بدلاً من ذلك." : "Could not detect your location. Please search by city instead."}
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
                  {language === "ar" ? "الصلاة القادمة" : "Next Prayer"}
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {language === "ar" ? ARABIC_NAMES[nextPrayer] : nextPrayer}
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
                    {language === "ar" ? ARABIC_NAMES[prayer] : prayer}
                  </h3>
                  <p className="text-3xl font-mono font-bold text-primary">{timings[prayer]}</p>
                  {isCurrent && (
                    <span className="text-xs text-primary font-semibold mt-2 block">
                      {language === "ar" ? "الآن" : "Current"}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Qibla Compass */}
          <div className="glass-card rounded-3xl p-8">
            <h3 className="text-xl font-bold text-foreground mb-6 text-center">
              {language === "ar" ? "اتجاه القبلة" : "Qibla Direction"}
            </h3>

            {qiblaAngle !== null ? (
              <div className="flex flex-col items-center gap-6">
                <QiblaCompass
                  qiblaAngle={qiblaAngle}
                  deviceHeading={deviceHeading}
                  isLive={compassLive}
                  language={language}
                />

                {/* Permission UI */}
                {permission === "unknown" && (
                  <button
                    onClick={requestPermission}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition shadow-lg shadow-primary/20"
                  >
                    <Navigation2 className="w-4 h-4" />
                    {language === "ar" ? "تفعيل البوصلة المباشرة" : "Enable Live Compass"}
                  </button>
                )}
                {permission === "denied" && (
                  <p className="text-xs text-muted-foreground text-center max-w-xs">
                    {language === "ar"
                      ? "تم رفض إذن الاستشعار. أعد تحميل الصفحة وامنح الإذن."
                      : "Sensor permission denied. Reload the page and allow motion access."}
                  </p>
                )}
                {permission === "unavailable" && (
                  <p className="text-xs text-muted-foreground text-center">
                    {language === "ar"
                      ? "لا يوجد استشعار في هذا الجهاز — الاتجاه ثابت."
                      : "No compass sensor — showing static bearing."}
                  </p>
                )}

                {/* Usage hint */}
                {compassLive && (
                  <div className="bg-primary/8 border border-primary/15 rounded-2xl px-5 py-3 text-center max-w-xs">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {language === "ar"
                        ? "امسك هاتفك أفقياً ودوّره حتى يشير رمز الكعبة (أعلى البوصلة) نحو مكة"
                        : "Hold phone flat and rotate until the Kaaba at the top points toward Makkah"}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 text-center py-4">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                  <Compass className="w-10 h-10 text-primary" />
                </div>
                <p className="text-muted-foreground text-sm max-w-xs">
                  {language === "ar"
                    ? "يظهر الاتجاه بعد تحديد الموقع"
                    : "Qibla direction appears after location is set."}
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {!isLoading && !timings && !apiError && (
        <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground gap-4">
          <MapPin className="w-16 h-16 text-primary/30" />
          <p className="text-lg font-medium">
            {language === "ar" ? "ابحث عن مدينة أو استخدم موقعك" : "Search for a city or use your location"}
          </p>
          <button onClick={handleDetectLocation}
            className="mt-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm">
            {language === "ar" ? "تحديد موقعي" : "Detect My Location"}
          </button>
        </div>
      )}
    </div>
  );
}
