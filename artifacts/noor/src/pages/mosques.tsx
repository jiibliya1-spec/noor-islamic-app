import { useState } from "react";
import { useMosquesNearBy, useGeocodeCity } from "@/hooks/use-external-api";
import { MapPin, Search, Navigation } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Mosques() {
  const [city, setCity] = useState("");
  const [searchCity, setSearchCity] = useState("");
  
  const { data: geocode, isLoading: geocodeLoading } = useGeocodeCity(searchCity);
  const [userLoc, setUserLoc] = useState<{lat: number, lng: number} | null>(null);

  const finalLat = userLoc?.lat || geocode?.lat;
  const finalLng = userLoc?.lng || geocode?.lon;

  const { data: mosques, isLoading: mosquesLoading } = useMosquesNearBy(finalLat || null, finalLng || null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setUserLoc(null);
    setSearchCity(city);
  };

  const handleNearMe = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        setCity("");
        setSearchCity("");
        setUserLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen flex flex-col">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Nearby Mosques</h1>
        
        <div className="flex flex-col md:flex-row gap-4 max-w-2xl">
          <form onSubmit={handleSearch} className="relative flex-1">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
            <Input 
              value={city}
              onChange={e => setCity(e.target.value)}
              placeholder="Search by city..." 
              className="pl-12 py-6 bg-card/50 border-white/10"
            />
          </form>
          <Button onClick={handleNearMe} className="py-6 px-6 bg-primary text-primary-foreground font-bold text-lg rounded-xl flex items-center gap-2">
            <Navigation className="w-5 h-5" /> Find Near Me
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
        <div className="lg:col-span-2 glass-card rounded-3xl overflow-hidden h-[500px] lg:h-auto border-white/10 relative">
          {finalLat && finalLng ? (
            <iframe 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${finalLng-0.05},${finalLat-0.05},${finalLng+0.05},${finalLat+0.05}&layer=mapnik&marker=${finalLat},${finalLng}`}
              className="absolute inset-0 grayscale-[0.2] contrast-[0.9] invert-[0.9]" // CSS hack for dark mode map
            ></iframe>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <MapPin className="w-16 h-16 mb-4 opacity-50" />
              <p>Search or use location to view map</p>
            </div>
          )}
        </div>

        <div className="glass-card rounded-3xl p-6 overflow-y-auto max-h-[500px] lg:max-h-full">
          <h2 className="text-xl font-bold mb-4">Results</h2>
          
          {(geocodeLoading || mosquesLoading) && <p className="text-primary animate-pulse">Searching...</p>}
          
          {!mosquesLoading && mosques && mosques.length === 0 && finalLat && (
            <p className="text-muted-foreground">No mosques found nearby.</p>
          )}

          <div className="space-y-4">
            {mosques?.map((m: any) => (
              <div key={m.id} className="p-4 bg-background/50 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors">
                <h3 className="font-bold text-foreground text-lg">{m.tags.name || "Unknown Mosque"}</h3>
                {m.tags["name:ar"] && <p className="text-primary font-quran text-right my-1" dir="rtl">{m.tags["name:ar"]}</p>}
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {m.tags.addr_street || ""} {m.tags.addr_city || ""}
                </p>
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${m.lat},${m.lon}`}
                  target="_blank" rel="noreferrer"
                  className="text-primary text-sm font-semibold hover:underline mt-3 inline-block"
                >
                  Get Directions
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
