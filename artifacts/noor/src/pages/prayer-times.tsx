import { useState, useEffect } from "react";
import { usePrayerTimesByCoords } from "@/hooks/use-external-api";
import { MapPin, Loader2, Compass } from "lucide-react";
import { format } from "date-fns";

export default function PrayerTimes() {
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [loadingLoc, setLoadingLoc] = useState(true);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setLoadingLoc(false);
        },
        () => {
          setLocation({ lat: 21.4225, lng: 39.8262 }); // Makkah
          setLoadingLoc(false);
        }
      );
    } else {
      setLocation({ lat: 21.4225, lng: 39.8262 });
      setLoadingLoc(false);
    }
  }, []);

  const { data, isLoading } = usePrayerTimesByCoords(location?.lat || 0, location?.lng || 0);

  const prayers = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Prayer Times</h1>
        <div className="inline-flex items-center gap-2 bg-card/50 px-4 py-2 rounded-full border border-white/10 text-muted-foreground">
          <MapPin className="w-4 h-4 text-primary" />
          {loadingLoc ? "Detecting location..." : "Based on your location"}
        </div>
      </div>

      {(isLoading || loadingLoc) ? (
        <div className="flex justify-center py-20"><Loader2 className="w-12 h-12 text-primary animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prayers.map((prayer, i) => (
            <div key={prayer} className="glass-card rounded-3xl p-8 text-center hover:border-primary/50 transition-colors group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-2xl font-bold text-muted-foreground group-hover:text-foreground mb-4">{prayer}</h3>
              <div className="text-5xl font-mono font-bold text-primary mb-2">
                {data?.timings[prayer]}
              </div>
              <p className="text-sm text-muted-foreground uppercase tracking-widest mt-4">Prayer {i+1}</p>
            </div>
          ))}
          
          {/* Qibla Direction placeholder */}
          <div className="glass-card rounded-3xl p-8 text-center md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center border-primary/20">
            <Compass className="w-16 h-16 text-primary mb-4" />
            <h3 className="text-2xl font-bold text-foreground">Qibla Direction</h3>
            <p className="text-muted-foreground mt-2">
              If enabled, your compass points towards Makkah. (Requires device sensors)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
