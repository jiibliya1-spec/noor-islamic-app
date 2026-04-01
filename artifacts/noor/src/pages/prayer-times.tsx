import { useState, useEffect } from "react";
import { usePrayerTimesByCoords, usePrayerTimes } from "@/hooks/use-external-api";
import { MapPin, Loader2, Compass, Search, Sunrise, Sun, Cloud, Sunset, Moon } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const PRAYERS = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

const ARABIC_NAMES: Record<string, string> = {
  Fajr: "الفجر",
  Sunrise: "الشروق",
  Dhuhr: "الظهر",
  Asr: "العصر",
  Maghrib: "المغرب",
  Isha: "العشاء",
};

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
  const userLat = lat * (Math.PI / 180);
  const dLng = kaabaLng - lng * (Math.PI / 180);
  const y = Math.sin(dLng) * Math.cos(kaabaLat);
  const x =
    Math.cos(userLat) * Math.sin(kaabaLat) -
    Math.sin(userLat) * Math.cos(kaabaLat) * Math.cos(dLng);
  const bearing = Math.atan2(y, x) * (180 / Math.PI);
  return (bearing + 360) % 360;
}

function getCurrentPrayer(timings: Record<string, string>): string {
  const now = new Date();
  const nowMins = now.getHours() * 60 + now.getMinutes();
  let current = "Isha";
  for (const prayer of PRAYERS.filter(p => p !== "Sunrise")) {
    const [h, m] = (timings[prayer] || "00:00").split(":").map(Number);
    if (nowMins >= h * 60 + m) current = prayer;
  }
  return current;
}

function getNextPrayer(timings: Record<string, string>): string {
  const now = new Date();
  const nowMins = now.getHours() * 60 + now.getMinutes();
  for (const prayer of PRAYERS.filter(p => p !== "Sunrise")) {
    const [h, m] = (timings[prayer] || "00:00").split(":").map(Number);
    if (nowMins < h * 60 + m) return prayer;
  }
  return "Fajr";
}

/** SVG-based compass — needle rotates via SVG transform attribute (reliable, no CSS conflict) */
function QiblaCompass({ angle, language }: { angle: number; language: string }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <svg viewBox="0 0 220 220" className="w-52 h-52" role="img" aria-label="Qibla compass">
        {/* Outer ring */}
        <circle cx="110" cy="110" r="105" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <circle cx="110" cy="110" r="100" fill="url(#compassGrad)" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />

        <defs>
          <radialGradient id="compassGrad" cx="40%" cy="30%">
            <stop offset="0%" stopColor="hsl(156,45%,16%)" />
            <stop offset="100%" stopColor="hsl(156,51%,8%)" />
          </radialGradient>
        </defs>

        {/* Tick marks */}
        {Array.from({ length: 36 }).map((_, i) => {
          const deg = i * 10;
          const isMajor = deg % 90 === 0;
          const rad = (deg - 90) * (Math.PI / 180);
          const r1 = 92, r2 = isMajor ? 78 : 84;
          return (
            <line
              key={i}
              x1={110 + r1 * Math.cos(rad)}
              y1={110 + r1 * Math.sin(rad)}
              x2={110 + r2 * Math.cos(rad)}
              y2={110 + r2 * Math.sin(rad)}
              stroke={isMajor ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.12)"}
              strokeWidth={isMajor ? 2 : 1}
            />
          );
        })}

        {/* Cardinal directions — fixed, never rotate */}
        <text x="110" y="22" textAnchor="middle" fill="#ef4444" fontSize="15" fontWeight="bold" fontFamily="Inter,sans-serif">N</text>
        <text x="110" y="208" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="13" fontFamily="Inter,sans-serif">S</text>
        <text x="200" y="115" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="13" fontFamily="Inter,sans-serif">E</text>
        <text x="20" y="115" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="13" fontFamily="Inter,sans-serif">W</text>

        {/* Needle group — rotate around center (110,110) */}
        <g
          transform={`rotate(${angle}, 110, 110)`}
          style={{ transition: "transform 1s ease" }}
        >
          {/* Gold tip — points to Qibla (upward in natural state = north = 0°) */}
          <polygon
            points="110,20 117,72 103,72"
            fill="hsl(var(--primary))"
            opacity="0.95"
          />
          <rect x="107" y="72" width="6" height="38" rx="3" fill="hsl(var(--primary))" opacity="0.8" />

          {/* Gray tail — points away from Qibla */}
          <rect x="107" y="110" width="6" height="38" rx="3" fill="rgba(255,255,255,0.2)" />
          <polygon
            points="110,200 117,148 103,148"
            fill="rgba(255,255,255,0.2)"
          />
        </g>

        {/* Center dot */}
        <circle cx="110" cy="110" r="7" fill="hsl(var(--primary))" stroke="hsl(var(--background))" strokeWidth="3" />

        {/* Kaaba icon at needle tip (tiny square) */}
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

export default function PrayerTimes() {
  const { language } = useI18n();
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [loadingLoc, setLoadingLoc] = useState(false);
  const [locError, setLocError] = useState(false);
  const [cityInput, setCityInput] = useState("");
  const [submittedCity, setSubmittedCity] = useState("");
  const [submittedCountry, setSubmittedCountry] = useState("");
  const [method, setMethod] = useState("2");
  const [qiblaAngle, setQiblaAngle] = useState<number | null>(null);

  const { data: coordData, isLoading: coordLoading } = usePrayerTimesByCoords(coords?.lat || 0, coords?.lng || 0);
  const { data: cityData, isLoading: cityLoading } = usePrayerTimes(submittedCity, submittedCountry);

  const data = coords ? coordData : cityData;
  const isLoading = coords ? coordLoading : cityLoading;
  const timings = data?.timings || null;

  // Set qibla from GPS coordinates
  useEffect(() => {
    if (coords) {
      setQiblaAngle(calculateQibla(coords.lat, coords.lng));
    }
  }, [coords]);

  // Set qibla from city search result (uses meta lat/lng from API response)
  useEffect(() => {
    if (cityData?.meta?.latitude && cityData?.meta?.longitude) {
      setQiblaAngle(calculateQibla(
        parseFloat(cityData.meta.latitude),
        parseFloat(cityData.meta.longitude)
      ));
    }
  }, [cityData]);

  const handleDetectLocation = () => {
    setLoadingLoc(true);
    setLocError(false);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const c = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setCoords(c);
          setLoadingLoc(false);
          setSubmittedCity("");
          setSubmittedCountry("");
        },
        () => {
          setLoadingLoc(false);
          setLocError(true);
        },
        { timeout: 8000 }
      );
    } else {
      setLoadingLoc(false);
      setLocError(true);
    }
  };

  const handleCitySearch = (e: React.FormEvent) => {
    e.preventDefault();
    const parts = cityInput.trim().split(",");
    const city = parts[0].trim();
    const country = parts[1]?.trim() || "SA";
    setCoords(null);
    setQiblaAngle(null);
    setSubmittedCity(city);
    setSubmittedCountry(country);
  };

  const dir = language === "ar" ? "rtl" : "ltr";
  const currentPrayer = timings ? getCurrentPrayer(timings) : null;
  const nextPrayer = timings ? getNextPrayer(timings) : null;

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto min-h-full pb-20" dir={dir}>
      <h1 className="text-4xl font-bold text-foreground mb-8">
        {language === "ar" ? "مواقيت الصلاة" : "Prayer Times"}
      </h1>

      {/* Search controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <form onSubmit={handleCitySearch} className="flex flex-1 gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={cityInput}
              onChange={e => setCityInput(e.target.value)}
              placeholder={language === "ar" ? "اسم المدينة، البلد (مثال: Mecca, SA)" : "City, Country (e.g. London, GB)"}
              className="w-full pl-9 pr-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm"
            />
          </div>
          <button type="submit" className="px-5 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition">
            {language === "ar" ? "بحث" : "Search"}
          </button>
        </form>

        <button
          onClick={handleDetectLocation}
          disabled={loadingLoc}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-card border border-border text-foreground hover:bg-white/10 transition text-sm font-medium"
        >
          {loadingLoc ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4 text-primary" />}
          {language === "ar" ? "موقعي" : "Use My Location"}
        </button>

        <select
          value={method}
          onChange={e => setMethod(e.target.value)}
          className="px-4 py-3 rounded-xl bg-card border border-border text-foreground text-sm focus:outline-none"
        >
          <option value="1">Karachi</option>
          <option value="2">ISNA</option>
          <option value="3">Muslim World League</option>
          <option value="4">Umm Al-Qura</option>
          <option value="5">Egyptian Authority</option>
        </select>
      </div>

      {locError && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-6 text-sm text-red-400">
          {language === "ar"
            ? "تعذر تحديد موقعك. ابحث عن مدينة بدلاً من ذلك."
            : "Could not detect your location. Please search by city instead."}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
      ) : timings ? (
        <>
          {data?.date && (
            <div className="text-center mb-6 text-muted-foreground text-sm">
              {data.date.readable} — {data.meta?.timezone}
            </div>
          )}

          {/* Next prayer highlight */}
          {nextPrayer && (
            <div className="glass-card rounded-3xl p-6 mb-6 border-l-4 border-l-primary flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest mb-1">
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {PRAYERS.map(prayer => {
              const isCurrent = prayer === currentPrayer;
              const isNext = prayer === nextPrayer;
              return (
                <div
                  key={prayer}
                  className={`glass-card rounded-2xl p-6 text-center transition-all ${
                    isCurrent ? "border-primary/60 bg-primary/10" :
                    isNext ? "border-primary/30" : "border-white/5"
                  }`}
                >
                  <div className={`flex justify-center mb-2 ${isCurrent || isNext ? "text-primary" : "text-muted-foreground"}`}>
                    <PrayerIcon prayer={prayer} className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-muted-foreground text-sm uppercase tracking-widest mb-1">
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
          <div className="glass-card rounded-3xl p-8 mt-6">
            <h3 className="text-xl font-bold text-foreground mb-6 text-center">
              {language === "ar" ? "اتجاه القبلة" : "Qibla Direction"}
            </h3>

            {qiblaAngle !== null ? (
              <QiblaCompass angle={qiblaAngle} language={language} />
            ) : (
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                  <Compass className="w-10 h-10 text-primary" />
                </div>
                <p className="text-muted-foreground text-sm max-w-xs">
                  {language === "ar"
                    ? "ابحث عن مدينة أو استخدم موقعك لمعرفة اتجاه القبلة"
                    : "Search for a city or use your location to see the Qibla direction toward the Kaaba."}
                </p>
                <button
                  onClick={handleDetectLocation}
                  disabled={loadingLoc}
                  className="px-5 py-2.5 bg-primary/20 text-primary rounded-xl text-sm font-semibold hover:bg-primary/30 transition border border-primary/30"
                >
                  {loadingLoc ? <Loader2 className="w-4 h-4 animate-spin inline mr-2" /> : null}
                  {language === "ar" ? "تحديد موقعي" : "Detect My Location"}
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
          <MapPin className="w-16 h-16 text-primary/30 mb-4" />
          <p className="text-lg font-medium">
            {language === "ar"
              ? "ابحث عن مدينة أو استخدم موقعك"
              : "Search for a city or use your location to see prayer times"}
          </p>
          <button
            onClick={handleDetectLocation}
            className="mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm"
          >
            {language === "ar" ? "تحديد موقعي" : "Detect My Location"}
          </button>
        </div>
      )}
    </div>
  );
}
