import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useI18n } from "@/lib/i18n";
import { usePrayerTimesByCoords } from "@/hooks/use-external-api";
import { BookOpen, Clock, Heart, CalendarDays, MapPin } from "lucide-react";
import { format } from "date-fns";

export default function Home() {
  const { t } = useI18n();
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setLocation({ lat: 21.4225, lng: 39.8262 }) // Fallback Makkah
      );
    } else {
      setLocation({ lat: 21.4225, lng: 39.8262 });
    }
    return () => clearInterval(timer);
  }, []);

  const { data: prayerData } = usePrayerTimesByCoords(location?.lat || 0, location?.lng || 0);

  const hijriDate = new Intl.DateTimeFormat('en-u-ca-islamic', {
    day: 'numeric', month: 'long', year: 'numeric'
  }).format(time);

  const quickLinks = [
    { title: t("quran"), url: "/quran", icon: BookOpen, color: "from-emerald-500 to-teal-700" },
    { title: t("prayerTimes"), url: "/prayer-times", icon: Clock, color: "from-blue-500 to-indigo-700" },
    { title: t("adhkar"), url: "/adhkar", icon: Heart, color: "from-rose-500 to-red-700" },
    { title: t("calendar"), url: "/calendar", icon: CalendarDays, color: "from-amber-500 to-orange-700" },
    { title: t("mosques"), url: "/mosques", icon: MapPin, color: "from-purple-500 to-violet-700" },
  ];

  return (
    <div className="min-h-full pb-20 p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Hero Clock Card */}
      <div className="relative overflow-hidden rounded-3xl p-8 md:p-12 glass-card text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
        <h2 className="text-xl md:text-2xl font-medium text-primary mb-2">{hijriDate}</h2>
        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 font-mono tracking-tighter">
          {format(time, 'HH:mm:ss')}
        </h1>
        <p className="text-muted-foreground text-lg">{format(time, 'EEEE, MMMM do yyyy')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Next Prayer */}
        <div className="glass-card rounded-3xl p-6 lg:col-span-1 border-l-4 border-l-primary">
          <h3 className="text-lg font-semibold text-muted-foreground flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-primary" /> {t("nextPrayer")}
          </h3>
          {prayerData ? (
            <div className="space-y-4">
              {['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map(prayer => (
                <div key={prayer} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                  <span className="font-medium text-foreground">{prayer}</span>
                  <span className="text-primary font-mono bg-primary/10 px-3 py-1 rounded-lg">
                    {prayerData.timings[prayer]}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="animate-pulse space-y-4">
              {[1,2,3,4,5].map(i => <div key={i} className="h-10 bg-white/5 rounded-lg w-full" />)}
            </div>
          )}
        </div>

        {/* Verse of the Day */}
        <div className="glass-card rounded-3xl p-8 lg:col-span-2 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute -right-10 -top-10 text-9xl text-white/5 font-serif font-bold">"</div>
          <h3 className="text-primary text-sm font-semibold tracking-widest uppercase mb-6">{t("verseOfDay")}</h3>
          <p className="text-3xl md:text-4xl leading-relaxed font-quran text-foreground mb-6 text-right" dir="rtl">
            ٱللَّهُ نُورُ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضِ ۚ مَثَلُ نُورِهِۦ كَمِشْكَوٰةٍ فِيهَا مِصْبَاحٌ
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            "Allah is the Light of the heavens and the earth. The example of His light is like a niche within which is a lamp..."
          </p>
          <p className="text-sm font-semibold text-primary mt-4">— Surah An-Nur [24:35]</p>
        </div>

      </div>

      {/* Quick Nav */}
      <h3 className="text-2xl font-bold text-foreground mt-12 mb-6">Quick Navigation</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {quickLinks.map(link => (
          <Link href={link.url} key={link.title} className="group relative overflow-hidden rounded-2xl glass-card p-6 flex flex-col items-center justify-center gap-4 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
            <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${link.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
              <link.icon className="w-7 h-7 text-white" />
            </div>
            <span className="font-semibold text-foreground">{link.title}</span>
          </Link>
        ))}
      </div>

    </div>
  );
}
