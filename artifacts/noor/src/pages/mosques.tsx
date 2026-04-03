import { useState, useEffect, useRef } from "react";
import { MapPin, Search, Navigation2, Loader2, ExternalLink, AlertCircle, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const MOSQUE_LOC_KEY = "noor_mosque_location";

interface SavedLoc { lat: number; lng: number; label: string; }
interface Mosque {
  id: number;
  lat: number;
  lon: number;
  tags: Record<string, string>;
  distanceKm?: number;
}

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatDist(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(1)} km`;
}

function getMosqueName(tags: Record<string, string>): string {
  return tags["name"] || tags["name:en"] || tags["name:ar"] || "Unnamed Mosque";
}

function getAddress(tags: Record<string, string>): string {
  const parts: string[] = [];
  if (tags["addr:housenumber"]) parts.push(tags["addr:housenumber"]);
  if (tags["addr:street"]) parts.push(tags["addr:street"]);
  if (tags["addr:city"] || tags["addr:suburb"]) parts.push(tags["addr:city"] || tags["addr:suburb"]);
  return parts.join(", ");
}

export default function Mosques() {
  const { language } = useI18n();
  const isRtl = language === "ar";

  const [userLoc, setUserLoc] = useState<{ lat: number; lng: number; label: string } | null>(null);
  const [loadingLoc, setLoadingLoc] = useState(false);
  const [locError, setLocError] = useState<string | null>(null);

  const [cityInput, setCityInput] = useState("");
  const [mosqueSearch, setMosqueSearch] = useState("");

  const [mosques, setMosques] = useState<Mosque[]>([]);
  const [loadingMosques, setLoadingMosques] = useState(false);
  const [mosqueError, setMosqueError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  // Restore last location from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(MOSQUE_LOC_KEY);
      if (raw) {
        const loc: SavedLoc = JSON.parse(raw);
        setUserLoc(loc);
      }
    } catch { /* ignore */ }
  }, []);

  // Fetch mosques whenever userLoc changes
  useEffect(() => {
    if (!userLoc) return;
    fetchMosques(userLoc.lat, userLoc.lng);
  }, [userLoc]);

  async function fetchMosques(lat: number, lng: number) {
    setLoadingMosques(true);
    setMosqueError(null);
    try {
      const query = `[out:json];node["amenity"="place_of_worship"]["religion"="muslim"](around:5000,${lat},${lng});out body;`;
      const res = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: `data=${encodeURIComponent(query)}`,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      if (!res.ok) throw new Error("Overpass API error");
      const data = await res.json();
      const results: Mosque[] = (data.elements || []).map((m: Mosque) => ({
        ...m,
        distanceKm: haversineKm(lat, lng, m.lat, m.lon),
      }));
      results.sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0));
      setMosques(results);
    } catch {
      setMosqueError(isRtl ? "تعذر تحميل المساجد. حاول مرة أخرى." : "Could not load mosques. Please try again.");
    } finally {
      setLoadingMosques(false);
    }
  }

  function persistLoc(loc: SavedLoc) {
    try { localStorage.setItem(MOSQUE_LOC_KEY, JSON.stringify(loc)); } catch { /* ignore */ }
    setUserLoc(loc);
  }

  function handleDetectLocation() {
    setLoadingLoc(true); setLocError(null);
    if (!("geolocation" in navigator)) {
      setLoadingLoc(false);
      setLocError(isRtl
        ? "الموقع الجغرافي غير مدعوم في هذا المتصفح."
        : "Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => {
        setLoadingLoc(false);
        persistLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude, label: isRtl ? "موقعي الحالي" : "My Location" });
        setCityInput("");
      },
      (err) => {
        setLoadingLoc(false);
        if (err.code === err.PERMISSION_DENIED) {
          setLocError(isRtl
            ? "تم رفض إذن الموقع. افتح الإعدادات > الخصوصية > خدمات الموقع وفعّلها لهذا المتصفح."
            : "Location permission denied. Open Settings → Privacy → Location Services and enable it for your browser.");
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          setLocError(isRtl
            ? "تعذر تحديد الموقع. تأكد من تفعيل GPS."
            : "Location unavailable. Ensure GPS is enabled and try again.");
        } else {
          setLocError(isRtl
            ? "انتهت مهلة طلب الموقع. حاول مرة أخرى."
            : "Location request timed out. Please try again.");
        }
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
    );
  }

  async function handleCitySearch(e: React.FormEvent) {
    e.preventDefault();
    const q = cityInput.trim();
    if (!q) return;
    setLoadingLoc(true); setLocError(null);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=1`);
      const data = await res.json();
      if (data && data.length > 0) {
        persistLoc({ lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon), label: data[0].display_name.split(",")[0] });
      } else {
        setLocError(isRtl ? "لم يتم العثور على المدينة." : "City not found.");
      }
    } catch {
      setLocError(isRtl ? "خطأ في البحث." : "Search error. Try again.");
    } finally {
      setLoadingLoc(false);
    }
  }

  // Filter mosques by name search
  const filtered = mosqueSearch.trim()
    ? mosques.filter(m => {
        const name = getMosqueName(m.tags).toLowerCase();
        const arName = (m.tags["name:ar"] || "").toLowerCase();
        const q = mosqueSearch.toLowerCase();
        return name.includes(q) || arName.includes(q);
      })
    : mosques;

  const t = {
    title: { en: "Mosque Finder", ar: "البحث عن مساجد" },
    detectBtn: { en: "Near Me", ar: "بالقرب مني" },
    searchPlaceholder: { en: "City or address...", ar: "المدينة أو العنوان..." },
    mosquePlaceholder: { en: "Filter by mosque name...", ar: "ابحث باسم المسجد..." },
    directions: { en: "Directions", ar: "الاتجاهات" },
    noMosques: { en: "No mosques found within 5 km.", ar: "لم يتم العثور على مساجد في نطاق 5 كم." },
    results: { en: "mosques found", ar: "مسجد وُجد" },
    loading: { en: "Searching for mosques...", ar: "جارٍ البحث عن مساجد..." },
    prompt: { en: "Enter a city or use your location to find nearby mosques.", ar: "أدخل مدينة أو استخدم موقعك للعثور على المساجد القريبة." },
    getDir: { en: "Get Directions", ar: "الحصول على الاتجاهات" },
  };
  const lang = (["en", "ar"].includes(language) ? language : "en") as "en" | "ar";

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto min-h-full pb-24" dir={isRtl ? "rtl" : "ltr"}>
      <h1 className="text-4xl font-bold text-foreground mb-6">{t.title[lang]}</h1>

      {/* Location search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <form onSubmit={handleCitySearch} className="flex flex-1 gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              value={cityInput}
              onChange={e => setCityInput(e.target.value)}
              placeholder={t.searchPlaceholder[lang]}
              className="w-full pl-9 pr-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm"
            />
          </div>
          <button type="submit" className="px-5 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition">
            {lang === "ar" ? "بحث" : "Search"}
          </button>
        </form>
        <button
          onClick={handleDetectLocation}
          disabled={loadingLoc}
          className="flex items-center gap-2 px-4 py-3 rounded-xl bg-card border border-border text-foreground hover:bg-white/10 transition text-sm font-medium"
        >
          {loadingLoc ? <Loader2 className="w-4 h-4 animate-spin" /> : <Navigation2 className="w-4 h-4 text-primary" />}
          {t.detectBtn[lang]}
        </button>
      </div>

      {/* Errors */}
      {locError && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-4 text-sm text-red-400">
          <AlertCircle className="w-4 h-4 shrink-0" />{locError}
          <button onClick={() => setLocError(null)} className="ml-auto"><X className="w-3.5 h-3.5" /></button>
        </div>
      )}

      {/* Current location badge */}
      {userLoc && (
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-4 h-4 text-primary shrink-0" />
          <span className="text-sm font-semibold text-foreground truncate">{userLoc.label}</span>
          {!loadingMosques && mosques.length > 0 && (
            <span className="ml-auto text-xs text-muted-foreground shrink-0">{mosques.length} {t.results[lang]}</span>
          )}
        </div>
      )}

      {/* Mosque name filter (only shown when results exist) */}
      {mosques.length > 0 && (
        <div className="relative mb-5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="search"
            value={mosqueSearch}
            onChange={e => setMosqueSearch(e.target.value)}
            placeholder={t.mosquePlaceholder[lang]}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-card border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm"
          />
        </div>
      )}

      {/* Loading */}
      {loadingMosques && (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-muted-foreground">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-sm">{t.loading[lang]}</p>
        </div>
      )}

      {/* Error */}
      {mosqueError && !loadingMosques && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-4 text-sm text-red-400">
          <AlertCircle className="w-4 h-4 shrink-0" />{mosqueError}
        </div>
      )}

      {/* Prompt */}
      {!userLoc && !loadingLoc && (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-4 text-muted-foreground">
          <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center">
            <MapPin className="w-10 h-10 text-primary" />
          </div>
          <p className="text-sm max-w-xs">{t.prompt[lang]}</p>
          <button onClick={handleDetectLocation} className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm">
            {t.detectBtn[lang]}
          </button>
        </div>
      )}

      {/* No results */}
      {!loadingMosques && userLoc && mosques.length === 0 && !mosqueError && (
        <div className="text-center py-12 text-muted-foreground">
          <MapPin className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">{t.noMosques[lang]}</p>
        </div>
      )}

      {/* Mosque list */}
      {!loadingMosques && filtered.length > 0 && (
        <div className="space-y-3">
          {filtered.map(m => {
            const name = getMosqueName(m.tags);
            const arName = m.tags["name:ar"];
            const address = getAddress(m.tags);
            const dist = m.distanceKm !== undefined ? formatDist(m.distanceKm) : null;
            const gmapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${m.lat},${m.lon}`;

            return (
              <div key={m.id} className="glass-card rounded-2xl p-4 border border-white/5 hover:border-primary/20 transition-colors">
                <div className="flex items-start gap-3">
                  {/* Distance badge */}
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/15 flex flex-col items-center justify-center">
                    <MapPin className="w-4 h-4 text-primary" />
                    {dist && <span className="text-[10px] text-primary font-bold leading-tight">{dist}</span>}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground text-sm leading-snug truncate">{name}</h3>
                    {arName && arName !== name && (
                      <p className="text-primary font-quran text-base text-right leading-relaxed" dir="rtl">{arName}</p>
                    )}
                    {address && (
                      <p className="text-xs text-muted-foreground mt-1 truncate">{address}</p>
                    )}
                    {!address && m.tags["addr:postcode"] && (
                      <p className="text-xs text-muted-foreground mt-1">{m.tags["addr:postcode"]}</p>
                    )}
                  </div>
                </div>

                <a
                  href={gmapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition text-sm font-semibold"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {t.getDir[lang]}
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
