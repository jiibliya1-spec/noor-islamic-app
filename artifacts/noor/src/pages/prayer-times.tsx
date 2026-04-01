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

/** Calculate bearing from user location to Kaaba (degrees, 0 = North, clockwise) */
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

  useEffect(() => {
    if (coords) {
      setQiblaAngle(calculateQibla(coords.lat, coords.lng));
    }
  }, [coords]);

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

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <form onSubmit={handleCitySearch} className="flex flex-1 gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={cityInput}
              onChange={e => setCityInput(e.target.value)}
              placeholder={language === "ar" ? "اسم المدينة، البلد (مثال: Mecca, SA)" : "City, Country (e.g. London, GB)"}
              className="w-full pl-9 pr-4 py-3 rounded-xl bg-card border border-white/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm"
            />
          </div>
          <button type="submit" className="px-5 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition">
            {language === "ar" ? "بحث" : "Search"}
          </button>
        </form>

        <button
          onClick={handleDetectLocation}
          disabled={loadingLoc}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-card border border-white/10 text-foreground hover:bg-white/10 transition text-sm font-medium"
        >
          {loadingLoc ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4 text-primary" />}
          {language === "ar" ? "موقعي" : "Use My Location"}
        </button>

        <select
          value={method}
          onChange={e => setMethod(e.target.value)}
          className="px-4 py-3 rounded-xl bg-card border border-white/10 text-foreground text-sm focus:outline-none"
        >
          <option value="1">Karachi</option>
          <option value="2">ISNA</option>
          <option value="3">Muslim World League</option>
          <option value="4">Umm Al-Qura</option>
          <option value="5">Egyptian Authority</option>
        </select>
      </div>

      {locError && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-6 text-sm text-red-300">
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
              <div className="flex flex-col items-center gap-4">
                {/* Compass dial */}
                <div className="relative w-48 h-48">
                  {/* Outer ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-white/20 bg-gradient-to-br from-card to-background" />

                  {/* Cardinal directions */}
                  {[
                    { label: "N", deg: 0, top: "4px", left: "50%", translate: "-50%, 0" },
                    { label: "S", deg: 180, bottom: "4px", left: "50%", translate: "-50%, 0" },
                    { label: "E", deg: 90, right: "4px", top: "50%", translate: "0, -50%" },
                    { label: "W", deg: 270, left: "4px", top: "50%", translate: "0, -50%" },
                  ].map(d => (
                    <span
                      key={d.label}
                      className="absolute text-xs font-bold text-muted-foreground select-none"
                      style={{
                        top: d.top,
                        bottom: (d as any).bottom,
                        left: d.left,
                        right: (d as any).right,
                        transform: `translate(${d.translate})`,
                      }}
                    >
                      {d.label}
                    </span>
                  ))}

                  {/* Tick marks */}
                  {Array.from({ length: 36 }).map((_, i) => {
                    const angle = i * 10;
                    const isMain = angle % 90 === 0;
                    const rad = (angle - 90) * (Math.PI / 180);
                    const r = 86;
                    const len = isMain ? 10 : 5;
                    const x1 = 96 + r * Math.cos(rad);
                    const y1 = 96 + r * Math.sin(rad);
                    const x2 = 96 + (r - len) * Math.cos(rad);
                    const y2 = 96 + (r - len) * Math.sin(rad);
                    return (
                      <svg key={i} className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 192 192">
                        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={isMain ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.15)"} strokeWidth={isMain ? 2 : 1} />
                      </svg>
                    );
                  })}

                  {/* Needle pointing to Qibla */}
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ transform: `rotate(${qiblaAngle}deg)`, transition: "transform 0.8s ease" }}
                  >
                    <svg viewBox="0 0 40 192" className="absolute w-5 h-24" style={{ top: "0", left: "50%", transform: "translateX(-50%)" }}>
                      {/* Kaaba symbol at tip */}
                      <polygon points="20,2 28,48 12,48" fill="hsl(var(--primary))" />
                      <polygon points="20,190 28,144 12,144" fill="rgba(255,255,255,0.3)" />
                      <rect x="16" y="48" width="8" height="96" fill="rgba(255,255,255,0.15)" />
                    </svg>
                  </div>

                  {/* Center dot */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-primary border-2 border-background z-10" />
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">{Math.round(qiblaAngle)}°</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {language === "ar" ? "من الشمال باتجاه القبلة" : "from North toward the Kaaba"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                  <Compass className="w-10 h-10 text-primary" />
                </div>
                <p className="text-muted-foreground text-sm max-w-xs">
                  {language === "ar"
                    ? "استخدم تحديد الموقع للحصول على اتجاه القبلة بدقة"
                    : "Use location detection to get the exact Qibla direction toward the Kaaba in Makkah."}
                </p>
                <button
                  onClick={handleDetectLocation}
                  disabled={loadingLoc}
                  className="px-5 py-2.5 bg-primary/20 text-primary rounded-xl text-sm font-semibold hover:bg-primary/30 transition border border-primary/30"
                >
                  {loadingLoc
                    ? <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
                    : null}
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
