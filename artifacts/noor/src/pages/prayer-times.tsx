import { useState, useEffect } from "react";
import { usePrayerTimesByCoords, usePrayerTimes } from "@/hooks/use-external-api";
import { loadPrayerPrefs, savePrayerPrefs } from "@/hooks/use-prayer-prefs";
import { MapPin, Loader2, Compass, Search, Sunrise, Sun, Cloud, Sunset, Moon, AlertCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const PRAYERS = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

const ARABIC_NAMES: Record<string, string> = {
  Fajr:    "الفجر",
  Sunrise: "الشروق",
  Dhuhr:   "الظهر",
  Asr:     "العصر",
  Maghrib: "المغرب",
  Isha:    "العشاء",
};

// Calculation methods in the order the user requested
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
    case "Sunrise": return <Sun className={className} />;
    case "Dhuhr":   return <Sun className={className} />;
    case "Asr":     return <Cloud className={className} />;
    case "Maghrib": return <Sunset className={className} />;
    case "Isha":    return <Moon className={className} />;
    default:        return <Sun className={className} />;
  }
}

function calculateQibla(lat: number, lng: number): number {
  const kaabaLat = 21.4225 * (Math.PI / 180);
  const kaabaLng = 39.8262 * (Math.PI / 180);
  const userLat  = lat * (Math.PI / 180);
  const dLng     = kaabaLng - lng * (Math.PI / 180);
  const y = Math.sin(dLng) * Math.cos(kaabaLat);
  const x =
    Math.cos(userLat) * Math.sin(kaabaLat) -
    Math.sin(userLat) * Math.cos(kaabaLat) * Math.cos(dLng);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

/**
 * Get minutes-since-midnight in the given IANA timezone.
 * The AlAdhan API returns the correct timezone in meta.timezone —
 * use it directly so current/next prayer detection matches the searched city.
 * Falls back to device local time if the timezone string is invalid.
 */
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

function QiblaCompass({ angle, language }: { angle: number; language: string }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <svg viewBox="0 0 220 220" className="w-52 h-52" role="img" aria-label="Qibla compass">
        <circle cx="110" cy="110" r="105" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <circle cx="110" cy="110" r="100" fill="url(#cGrad)" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
        <defs>
          <radialGradient id="cGrad" cx="40%" cy="30%">
            <stop offset="0%" stopColor="hsl(156,45%,16%)" />
            <stop offset="100%" stopColor="hsl(156,51%,8%)" />
          </radialGradient>
        </defs>
        {Array.from({ length: 36 }).map((_, i) => {
          const deg = i * 10, isMajor = deg % 90 === 0;
          const rad = (deg - 90) * (Math.PI / 180), r1 = 92, r2 = isMajor ? 78 : 84;
          return (
            <line key={i}
              x1={110 + r1 * Math.cos(rad)} y1={110 + r1 * Math.sin(rad)}
              x2={110 + r2 * Math.cos(rad)} y2={110 + r2 * Math.sin(rad)}
              stroke={isMajor ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.12)"}
              strokeWidth={isMajor ? 2 : 1}
            />
          );
        })}
        <text x="110" y="22"  textAnchor="middle" fill="#ef4444" fontSize="15" fontWeight="bold" fontFamily="Inter,sans-serif">N</text>
        <text x="110" y="208" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="13" fontFamily="Inter,sans-serif">S</text>
        <text x="200" y="115" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="13" fontFamily="Inter,sans-serif">E</text>
        <text x="20"  y="115" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="13" fontFamily="Inter,sans-serif">W</text>
        <g transform={`rotate(${angle}, 110, 110)`} style={{ transition: "transform 1s ease" }}>
          <polygon points="110,20 117,72 103,72"   fill="hsl(var(--primary))" opacity="0.95" />
          <rect    x="107" y="72"  width="6" height="38" rx="3" fill="hsl(var(--primary))" opacity="0.8" />
          <rect    x="107" y="110" width="6" height="38" rx="3" fill="rgba(255,255,255,0.2)" />
          <polygon points="110,200 117,148 103,148" fill="rgba(255,255,255,0.2)" />
        </g>
        <circle cx="110" cy="110" r="7" fill="hsl(var(--primary))" stroke="hsl(var(--background))" strokeWidth="3" />
        <g transform={`rotate(${angle}, 110, 110)`}>
          <rect x="105" y="12" width="10" height="10" rx="1" fill="hsl(var(--primary-foreground))" opacity="0.6" />
        </g>
      </svg>
      <div className="text-center">
        <p className="text-4xl font-bold text-primary">{Math.round(angle)}°</p>
        <p className="text-sm text-muted-foreground mt-1">
          {language === "ar" ? "من الشمال باتجاه القبلة" : "from North toward the Kaaba"}
        </p>
      </div>
    </div>
  );
}

// ── Initialise state from localStorage (auto-restore last search) ─────────
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

  const initial = initFromPrefs();
  const [coords,           setCoords]           = useState<{ lat: number; lng: number } | null>(initial.coords);
  const [loadingLoc,       setLoadingLoc]        = useState(false);
  const [locError,         setLocError]          = useState(false);
  const [cityInput,        setCityInput]         = useState(initial.cityInput);
  const [submittedCity,    setSubmittedCity]     = useState(initial.submittedCity);
  const [submittedCountry, setSubmittedCountry] = useState(initial.submittedCountry);
  const [method,           setMethod]            = useState(initial.method);
  const [qiblaAngle,       setQiblaAngle]        = useState<number | null>(null);

  // ── API calls ─────────────────────────────────────────────────────────────
  const {
    data: coordData,
    isLoading: coordLoading,
    error: coordError,
  } = usePrayerTimesByCoords(coords?.lat ?? 0, coords?.lng ?? 0, method);

  const {
    data: cityData,
    isLoading: cityLoading,
    error: cityError,
  } = usePrayerTimes(submittedCity, submittedCountry, method);

  const data      = coords ? coordData : cityData;
  const isLoading = coords ? coordLoading : cityLoading;
  const apiError  = coords ? coordError  : cityError;
  const timings   = data?.timings ?? null;

  // AlAdhan returns the correct IANA timezone in meta.timezone — use it directly.
  // No external timezone lookup is needed. Fallback to browser TZ if API meta is missing.
  const timezone: string =
    data?.meta?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;

  // ── Qibla from GPS ────────────────────────────────────────────────────────
  useEffect(() => {
    if (coords) setQiblaAngle(calculateQibla(coords.lat, coords.lng));
  }, [coords]);

  // ── Qibla from city API meta ──────────────────────────────────────────────
  useEffect(() => {
    const lat = cityData?.meta?.latitude  ? parseFloat(cityData.meta.latitude)  : null;
    const lng = cityData?.meta?.longitude ? parseFloat(cityData.meta.longitude) : null;
    if (lat !== null && lng !== null) setQiblaAngle(calculateQibla(lat, lng));
  }, [cityData]);

  // ── Persist method changes when a location is already saved ──────────────
  useEffect(() => {
    const prefs = loadPrayerPrefs();
    if (prefs) savePrayerPrefs({ ...prefs, method });
  }, [method]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleDetectLocation = () => {
    setLoadingLoc(true);
    setLocError(false);
    if (!("geolocation" in navigator)) { setLoadingLoc(false); setLocError(true); return; }
    navigator.geolocation.getCurrentPosition(
      pos => {
        const c = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setCoords(c);
        setSubmittedCity("");
        setSubmittedCountry("");
        setCityInput("");
        setLoadingLoc(false);
        savePrayerPrefs({ type: "coords", lat: c.lat, lng: c.lng, method });
      },
      () => { setLoadingLoc(false); setLocError(true); },
      { timeout: 8000 }
    );
  };

  const handleCitySearch = (e: React.FormEvent) => {
    e.preventDefault();
    const parts   = cityInput.trim().split(",");
    const city    = parts[0].trim();
    const country = parts[1]?.trim() || "SA";
    if (!city) return;
    setCoords(null);
    setQiblaAngle(null);
    setSubmittedCity(city);
    setSubmittedCountry(country);
    savePrayerPrefs({ type: "city", city, country, method });
  };

  const dir           = language === "ar" ? "rtl" : "ltr";
  const currentPrayer = timings ? getCurrentPrayer(timings, timezone) : null;
  const nextPrayer    = timings ? getNextPrayer(timings, timezone)    : null;
  const locationLabel = coords
    ? (language === "ar" ? "موقعي الحالي" : "Current Location")
    : submittedCity || "";

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto min-h-full pb-20" dir={dir}>
      <h1 className="text-4xl font-bold text-foreground mb-8">
        {language === "ar" ? "مواقيت الصلاة" : "Prayer Times"}
      </h1>

      {/* ── Search controls ─────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <form onSubmit={handleCitySearch} className="flex flex-1 gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={cityInput}
              onChange={e => setCityInput(e.target.value)}
              placeholder={
                language === "ar"
                  ? "المدينة، البلد (مثال: Berlin, DE)"
                  : "City, Country (e.g. Berlin, DE)"
              }
              className="w-full pl-9 pr-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition"
          >
            {language === "ar" ? "بحث" : "Search"}
          </button>
        </form>

        <button
          onClick={handleDetectLocation}
          disabled={loadingLoc}
          className="flex items-center gap-2 px-4 py-3 rounded-xl bg-card border border-border text-foreground hover:bg-white/10 transition text-sm font-medium"
        >
          {loadingLoc ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4 text-primary" />}
          {language === "ar" ? "موقعي" : "My Location"}
        </button>
      </div>

      {/* ── Method selector ─────────────────────────────────────────────── */}
      <div className="mb-8">
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          {language === "ar" ? "طريقة الحساب" : "Calculation Method"}
        </label>
        <div className="flex flex-wrap gap-2">
          {METHODS.map(m => (
            <button
              key={m.value}
              onClick={() => setMethod(m.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                method === m.value
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card border border-border/50 text-muted-foreground hover:bg-white/10"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Error messages ──────────────────────────────────────────────── */}
      {locError && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-6 text-sm text-red-400">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {language === "ar"
            ? "تعذر تحديد موقعك. ابحث عن مدينة بدلاً من ذلك."
            : "Could not detect your location. Please search by city instead."}
        </div>
      )}
      {apiError && !isLoading && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-6 text-sm text-red-400">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {language === "ar"
            ? "لم يتم العثور على المدينة. تأكد من الاسم واختصار البلد (مثال: Berlin, DE)."
            : "City not found. Check the name and country code (e.g. Berlin, DE)."}
        </div>
      )}

      {/* ── Loading ─────────────────────────────────────────────────────── */}
      {isLoading && (
        <div className="flex justify-center py-20">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
      )}

      {/* ── Results ─────────────────────────────────────────────────────── */}
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
                <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
                  {timezone}
                </span>
              )}
            </div>
          </div>

          {/* Next prayer highlight */}
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

          {/* Prayer time cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {PRAYERS.map(prayer => {
              const isCurrent = prayer === currentPrayer;
              const isNext    = prayer === nextPrayer;
              return (
                <div
                  key={prayer}
                  className={`glass-card rounded-2xl p-6 text-center transition-all ${
                    isCurrent ? "border-primary/60 bg-primary/10" :
                    isNext    ? "border-primary/30" : "border-white/5"
                  }`}
                >
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
              <QiblaCompass angle={qiblaAngle} language={language} />
            ) : (
              <div className="flex flex-col items-center gap-3 text-center py-4">
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

      {/* ── Empty state ─────────────────────────────────────────────────── */}
      {!isLoading && !timings && !apiError && (
        <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground gap-4">
          <MapPin className="w-16 h-16 text-primary/30" />
          <p className="text-lg font-medium">
            {language === "ar"
              ? "ابحث عن مدينة أو استخدم موقعك"
              : "Search for a city or use your location"}
          </p>
          <button
            onClick={handleDetectLocation}
            className="mt-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm"
          >
            {language === "ar" ? "تحديد موقعي" : "Detect My Location"}
          </button>
        </div>
      )}
    </div>
  );
}
