import { Link, useLocation } from "wouter";
import { Home, BookOpen, Clock, Heart, MoreHorizontal, CalendarDays } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const tabs = [
  { icon: Home,         key: "home",         url: "/" },
  { icon: BookOpen,     key: "quran",        url: "/quran" },
  { icon: Clock,        key: "prayerTimes",  url: "/prayer-times" },
  { icon: Heart,        key: "adhkar",       url: "/adhkar" },
  { icon: CalendarDays, key: "calendar",     url: "/calendar" },
  { icon: MoreHorizontal, key: "settings",  url: "/settings" },
];

export function BottomNav() {
  const [location] = useLocation();
  const { t } = useI18n();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-white/10 pb-safe">
      <div className="grid grid-cols-6 h-16">
        {tabs.map(({ icon: Icon, key, url }) => {
          const isActive = url === "/" ? location === "/" : location.startsWith(url);
          return (
            <Link
              key={key}
              href={url}
              className={`flex flex-col items-center justify-center gap-1 transition-colors active:scale-95 ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className={`w-6 h-6 transition-transform ${isActive ? "scale-110" : ""}`} />
              <span className={`text-[9px] font-semibold leading-none ${isActive ? "text-primary" : ""}`}>
                {t(key)}
              </span>
              {isActive && (
                <span className="absolute top-0 w-6 h-0.5 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
