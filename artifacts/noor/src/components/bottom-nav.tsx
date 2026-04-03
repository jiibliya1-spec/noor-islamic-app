import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Home, BookOpen, Clock, Heart, CalendarDays,
  MoreHorizontal, X,
  HelpCircle, BookMarked, Mic2, MapPin, Settings, LayoutDashboard,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";

// Five always-visible bottom tabs
const MAIN_TABS = [
  { icon: Home,         key: "home",        url: "/"             },
  { icon: BookOpen,     key: "quran",       url: "/quran"        },
  { icon: Clock,        key: "prayerTimes", url: "/prayer-times" },
  { icon: Heart,        key: "adhkar",      url: "/adhkar"       },
  { icon: CalendarDays, key: "calendar",    url: "/calendar"     },
];

// Items shown in the "More" full-screen overlay
const MORE_ITEMS = [
  { icon: HelpCircle,     key: "quiz",      url: "/quiz"      },
  { icon: BookMarked,     key: "stories",   url: "/stories"   },
  { icon: Mic2,           key: "tajweed",   url: "/tajweed"   },
  { icon: MapPin,         key: "mosques",   url: "/mosques"   },
  { icon: Settings,       key: "settings",  url: "/settings"  },
  { icon: LayoutDashboard,key: "dashboard", url: "/dashboard", auth: true },
];

export function BottomNav() {
  const [location]  = useLocation();
  const { t }       = useI18n();
  const { user }    = useAuth();
  const [moreOpen, setMoreOpen] = useState(false);

  const closeMore = () => setMoreOpen(false);

  // Is any "more" page currently active?
  const moreActive = MORE_ITEMS.some(
    (item) => item.url !== "/" && location.startsWith(item.url)
  );

  return (
    <>
      {/* ── Bottom tab bar ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-white/10 safe-area-pb">
        <div className="grid grid-cols-6 h-16">
          {/* Main 5 tabs */}
          {MAIN_TABS.map(({ icon: Icon, key, url }) => {
            const isActive = url === "/" ? location === "/" : location.startsWith(url);
            return (
              <Link
                key={key}
                href={url}
                onClick={closeMore}
                className={`flex flex-col items-center justify-center gap-1 transition-all active:scale-90 relative ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {isActive && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-primary" />
                )}
                <Icon className={`w-6 h-6 transition-transform ${isActive ? "scale-110" : ""}`} />
                <span className={`text-[9px] font-semibold leading-none ${isActive ? "text-primary" : ""}`}>
                  {t(key)}
                </span>
              </Link>
            );
          })}

          {/* More button — 6th slot */}
          <button
            onClick={() => setMoreOpen((v) => !v)}
            className={`flex flex-col items-center justify-center gap-1 transition-all active:scale-90 relative ${
              moreOpen || moreActive ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {(moreOpen || moreActive) && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-primary" />
            )}
            <MoreHorizontal className="w-6 h-6" />
            <span className="text-[9px] font-semibold leading-none">More</span>
          </button>
        </div>
      </nav>

      {/* ── "More" full-screen overlay ── */}
      {/* Backdrop */}
      {moreOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={closeMore}
        />
      )}

      {/* Slide-up panel */}
      <div
        className={`
          fixed bottom-0 left-0 right-0 z-50 md:hidden
          bg-card/98 backdrop-blur-2xl border-t border-white/10
          rounded-t-3xl shadow-2xl
          transition-transform duration-300 ease-out
          ${moreOpen ? "translate-y-0" : "translate-y-full"}
        `}
      >
        {/* Handle + header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <div className="w-10 h-1 rounded-full bg-white/20 mx-auto absolute left-1/2 -translate-x-1/2 top-3" />
          <h2 className="text-base font-bold text-foreground">More</h2>
          <button
            onClick={closeMore}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors active:scale-90"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation grid */}
        <div className="px-4 pb-6 pt-2 grid grid-cols-3 gap-3" style={{ paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom))" }}>
          {MORE_ITEMS.map(({ icon: Icon, key, url, auth }) => {
            if (auth && !user) return null;
            const isActive = location.startsWith(url);
            return (
              <Link
                key={key}
                href={url}
                onClick={closeMore}
                className={`
                  flex flex-col items-center justify-center gap-2.5
                  rounded-2xl p-4 min-h-[88px] transition-all active:scale-95
                  border
                  ${isActive
                    ? "bg-primary/15 border-primary/30 text-primary"
                    : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                  }
                `}
              >
                <div className={`w-11 h-11 rounded-full flex items-center justify-center ${isActive ? "bg-primary/20" : "bg-white/10"}`}>
                  <Icon className={`w-5 h-5 ${isActive ? "text-primary" : ""}`} />
                </div>
                <span className="text-xs font-semibold text-center leading-tight">
                  {t(key)}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Bottom safe area */}
        <div className="h-16" />
      </div>
    </>
  );
}
