import { useState, useEffect } from "react";
import { usePrayerTimesByCoords, usePrayerTimes } from "@/hooks/use-external-api";
import { MapPin, Loader2, Compass, Search } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const PRAYERS = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

const PRAYER_ICONS: Record<string, string> = {
  Fajr: "🌅",
  Sunrise: "☀️",
  Dhuhr: "🌞",
  Asr: "🌤",
  Maghrib: "🌆",
  Isha: "🌙",
};

const ARABIC_NAMES: Record<string, string> = {
  Fajr: "الفجر",
  Sunrise: "الشروق",
  Dhuhr: "الظهر",
  Asr: "العصر",
  Maghrib: "المغرب",
  Isha: "العشاء",
};

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

  const { data: coordData, isLoading: coordLoading } = usePrayerTimesByCoords(coords?.lat || 0, coords?.lng || 0);
  const { data: cityData, isLoading: cityLoading } = usePrayerTimes(submittedCity, submittedCountry);

  const data = coords ? coordData : cityData;
  const isLoading = coords ? coordLoading : cityLoading;
  const timings = data?.timings || null;

  const handleDetectLocation = () => {
    setLoadingLoc(true);
    setLocError(false);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
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
          <option value="1">University of Islamic Sciences, Karachi</option>
          <option value="2">Islamic Society of North America (ISNA)</option>
          <option value="3">Muslim World League</option>
          <option value="4">Umm Al-Qura, Makkah</option>
          <option value="5">Egyptian General Authority of Survey</option>
        </select>
      </div>

      {locError && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-6 text-sm text-red-300">
          {language === "ar" ? "تعذر تحديد موقعك. ابحث عن مدينة بدلاً من ذلك." : "Could not detect your location. Please search by city instead."}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-12 h-12 text-primary animate-spin" /></div>
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
              <div className="text-right">
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
                  <div className="text-3xl mb-2">{PRAYER_ICONS[prayer]}</div>
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

          {/* Qibla */}
          <div className="glass-card rounded-3xl p-8 mt-6 flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <Compass className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Qibla Direction</h3>
              <p className="text-muted-foreground mt-1 text-sm">
                Enable location access to get the Qibla direction from your exact position toward the Kaaba in Makkah.
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
          <MapPin className="w-16 h-16 text-primary/30 mb-4" />
          <p className="text-lg font-medium">
            {language === "ar" ? "ابحث عن مدينة أو استخدم موقعك" : "Search for a city or use your location to see prayer times"}
          </p>
          <button onClick={handleDetectLocation} className="mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm">
            {language === "ar" ? "تحديد موقعي" : "Detect My Location"}
          </button>
        </div>
      )}
    </div>
  );
}
