import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useI18n } from "@/lib/i18n";
import { usePrayerTimesByCoords } from "@/hooks/use-external-api";
import { BookOpen, Clock, Heart, CalendarDays, MapPin, LogIn, Sunrise, Sun, Cloud, Sunset, Moon } from "lucide-react";
import { format } from "date-fns";
import { useGetMe } from "@workspace/api-client-react";

const PRAYERS = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

function PrayerIcon({ name, className = "w-5 h-5" }: { name: string; className?: string }) {
  switch (name) {
    case "Fajr":    return <Sunrise className={className} />;
    case "Dhuhr":   return <Sun className={className} />;
    case "Asr":     return <Cloud className={className} />;
    case "Maghrib": return <Sunset className={className} />;
    case "Isha":    return <Moon className={className} />;
    default:        return <Sun className={className} />;
  }
}

function getNextPrayer(timings: Record<string, string>): { name: string; time: string } | null {
  const now = new Date();
  const nowMins = now.getHours() * 60 + now.getMinutes();
  for (const name of PRAYERS) {
    const [h, m] = (timings[name] || "00:00").split(":").map(Number);
    if (nowMins < h * 60 + m) return { name, time: timings[name] };
  }
  return { name: "Fajr", time: timings["Fajr"] };
}

export default function Home() {
  const { t, language } = useI18n();
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const { data: user } = useGetMe({ query: { retry: false } });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        pos => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setLocation({ lat: 21.4225, lng: 39.8262 })
      );
    } else {
      setLocation({ lat: 21.4225, lng: 39.8262 });
    }
    return () => clearInterval(timer);
  }, []);

  const { data: prayerData } = usePrayerTimesByCoords(location?.lat || 0, location?.lng || 0);
  const timings = prayerData?.timings;
  const nextPrayer = timings ? getNextPrayer(timings) : null;

  const hijriDate = new Intl.DateTimeFormat("en-u-ca-islamic", {
    day: "numeric", month: "long", year: "numeric",
  }).format(time);

  const dir = language === "ar" ? "rtl" : "ltr";

  const quickLinks = [
    { label: t("quran"),       url: "/quran",         icon: BookOpen  },
    { label: t("prayerTimes"), url: "/prayer-times",  icon: Clock     },
    { label: t("adhkar"),      url: "/adhkar",        icon: Heart     },
    { label: t("calendar"),    url: "/calendar",      icon: CalendarDays },
    { label: t("mosques"),     url: "/mosques",       icon: MapPin    },
  ];

  return (
    <div className="min-h-full" dir={dir}>
      {/* Mobile top header */}
      <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-background/90 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gradient tracking-widest font-quran">نُور</span>
          <span className="text-lg font-bold text-primary tracking-widest">NOOR</span>
        </div>
        {user ? (
          <Link href="/settings">
            <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </Link>
        ) : (
          <Link href="/login" className="flex items-center gap-1.5 text-sm font-semibold text-primary bg-primary/10 px-3 py-2 rounded-xl active:bg-primary/20 transition">
            <LogIn className="w-4 h-4" /> Login
          </Link>
        )}
      </header>

      <div className="p-4 space-y-4 max-w-2xl mx-auto lg:max-w-7xl lg:p-8 lg:space-y-8">

        {/* Hero: Date + Clock */}
        <div className="relative overflow-hidden rounded-2xl p-6 glass-card text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none rounded-2xl" />
          <p className="text-primary text-sm font-semibold mb-1">{hijriDate}</p>
          <h1 className="text-5xl font-bold text-foreground font-mono tracking-tighter mb-1">
            {format(time, "HH:mm")}
            <span className="text-2xl text-muted-foreground">:{format(time, "ss")}</span>
          </h1>
          <p className="text-muted-foreground text-sm">{format(time, "EEEE, MMMM do yyyy")}</p>
        </div>

        {/* Next prayer — compact card */}
        {nextPrayer ? (
          <Link href="/prayer-times">
            <div className="glass-card rounded-2xl p-4 flex items-center justify-between active:scale-[0.98] transition-transform cursor-pointer border-l-4 border-l-primary">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <PrayerIcon name={nextPrayer.name} className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">{t("nextPrayer")}</p>
                  <p className="text-xl font-bold text-foreground">{nextPrayer.name}</p>
                </div>
              </div>
              <span className="text-3xl font-mono font-bold text-primary">{nextPrayer.time}</span>
            </div>
          </Link>
        ) : (
          <Link href="/prayer-times">
            <div className="glass-card rounded-2xl p-4 flex items-center justify-between animate-pulse">
              <div className="h-12 bg-white/5 rounded-xl flex-1 mr-4" />
              <div className="h-8 w-20 bg-white/5 rounded-xl" />
            </div>
          </Link>
        )}

        {/* All prayer times row */}
        {timings && (
          <div className="glass-card rounded-2xl p-4">
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest mb-3">{t("prayerTimes")}</p>
            <div className="grid grid-cols-5 gap-1">
              {PRAYERS.map(p => {
                const isNext = nextPrayer?.name === p;
                return (
                  <div key={p} className={`flex flex-col items-center p-2 rounded-xl transition ${isNext ? "bg-primary/20 border border-primary/40" : ""}`}>
                    <div className={`mb-1 ${isNext ? "text-primary" : "text-muted-foreground"}`}>
                      <PrayerIcon name={p} className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] text-muted-foreground font-medium">{p}</span>
                    <span className={`text-xs font-bold font-mono mt-0.5 ${isNext ? "text-primary" : "text-foreground"}`}>{timings[p]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Verse of the Day */}
        <div className="glass-card rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute -right-4 -top-6 text-8xl text-white/5 font-serif font-bold select-none">"</div>
          <p className="text-xs text-primary font-semibold tracking-widest uppercase mb-3">{t("verseOfDay")}</p>
          <p className="text-2xl leading-loose font-quran text-foreground mb-3 text-right" dir="rtl">
            ٱللَّهُ نُورُ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضِ
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            "Allah is the Light of the heavens and the earth..."
          </p>
          <p className="text-xs font-semibold text-primary mt-2">— Surah An-Nur [24:35]</p>
        </div>

        {/* Quick nav grid */}
        <div>
          <h3 className="text-base font-bold text-foreground mb-3">Quick Access</h3>
          <div className="grid grid-cols-3 gap-3 lg:grid-cols-5">
            {quickLinks.map(link => (
              <Link
                href={link.url}
                key={link.url}
                className="glass-card rounded-2xl p-4 flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform cursor-pointer hover:border-primary/30"
              >
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <link.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-center text-foreground leading-tight">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
