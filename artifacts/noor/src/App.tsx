import { useState, useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Menu } from "lucide-react";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { AuthProvider } from "@/lib/auth";
import { BottomNav } from "@/components/bottom-nav";
import { bumpStreak } from "@/hooks/use-streak";
import NotFound from "@/pages/not-found";

import { AppSidebar } from "@/components/app-sidebar";
import Home from "@/pages/home";
import QuranList from "@/pages/quran/index";
import SurahDetail from "@/pages/quran/surah";
import QuranDuas from "@/pages/quran/duas";
import PrayerTimes from "@/pages/prayer-times";
import Adhkar from "@/pages/adhkar";
import Quiz from "@/pages/quiz";
import Stories from "@/pages/stories";
import Tajweed from "@/pages/tajweed";
import Mosques from "@/pages/mosques";
import IslamicCalendar from "@/pages/calendar";
import Dashboard from "@/pages/dashboard";
import Settings from "@/pages/settings";
import Login from "@/pages/login";
import Register from "@/pages/register";
import { requestAdhanPermission } from "@/hooks/use-adhan-alarm";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: 1 },
  },
});

const LS_KEY = "noor_sidebar_open";
const SIDEBAR_W = 272; // px

function AppLayout() {
  const { language } = useI18n();

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => {
    try {
      const v = localStorage.getItem(LS_KEY);
      return v === null ? true : v !== "false";
    } catch {
      return true;
    }
  });

  const toggleSidebar = () => {
    setSidebarOpen((prev) => {
      const next = !prev;
      try { localStorage.setItem(LS_KEY, String(next)); } catch {}
      return next;
    });
  };

  useEffect(() => {
    bumpStreak();
    requestAdhanPermission();
  }, []);

  const isRTL = language === "ar";

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="relative flex min-h-screen w-full bg-background text-foreground overflow-x-hidden"
    >
      {/* ── Desktop sidebar (fixed, slides in/out) ── */}
      <aside
        className="hidden lg:flex flex-col fixed top-0 left-0 h-full z-40"
        style={{
          width: SIDEBAR_W,
          transform: sidebarOpen ? "translateX(0)" : `translateX(-${SIDEBAR_W}px)`,
          transition: "transform 300ms cubic-bezier(0.4,0,0.2,1)",
          willChange: "transform",
        }}
      >
        <AppSidebar />
      </aside>

      {/* ── Main content column ── */}
      <div
        className="flex flex-col flex-1 w-full min-w-0"
        style={{
          marginLeft: 0,
          paddingLeft: sidebarOpen ? SIDEBAR_W : 0,
          transition: "padding-left 300ms cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Desktop top-bar with hamburger */}
        <div className="hidden lg:flex items-center h-12 px-3 border-b border-border/20 bg-background/90 backdrop-blur-sm sticky top-0 z-30 shrink-0">
          <button
            onClick={toggleSidebar}
            aria-label={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
            title={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
            className="flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-4">
          <Switch key={language}>
            <Route path="/" component={Home} />
            <Route path="/quran" component={QuranList} />
            <Route path="/quran/duas" component={QuranDuas} />
            <Route path="/quran/:id" component={SurahDetail} />
            <Route path="/prayer-times" component={PrayerTimes} />
            <Route path="/adhkar" component={Adhkar} />
            <Route path="/quiz" component={Quiz} />
            <Route path="/stories" component={Stories} />
            <Route path="/tajweed" component={Tajweed} />
            <Route path="/calendar" component={IslamicCalendar} />
            <Route path="/mosques" component={Mosques} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/settings" component={Settings} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <div className="lg:hidden">
        <BottomNav />
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <AuthProvider>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route component={AppLayout} />
              </Switch>
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </AuthProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}

export default App;
