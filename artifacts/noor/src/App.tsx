import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
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
import Mosques from "@/pages/mosques";
import IslamicCalendar from "@/pages/calendar";
import Dashboard from "@/pages/dashboard";
import Settings from "@/pages/settings";
import Login from "@/pages/login";
import Register from "@/pages/register";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: 1 },
  },
});

function AppLayout() {
  const { language } = useI18n();

  // Bump daily streak once on every app load (e.g. opening the app counts as activity)
  useEffect(() => {
    bumpStreak();
  }, []);

  return (
    <SidebarProvider style={{ "--sidebar-width": "17rem", "--sidebar-width-icon": "4rem" } as React.CSSProperties}>
      <div className="flex min-h-screen w-full bg-background text-foreground">

        <div className="hidden lg:block">
          <AppSidebar />
        </div>

        <div className="flex flex-col flex-1 w-full min-w-0 overflow-hidden">
          <main className="flex-1 overflow-y-auto pb-20 lg:pb-4">
            {/* key={language} forces page components to re-render on language change */}
            <Switch key={language}>
              <Route path="/" component={Home} />
              <Route path="/quran" component={QuranList} />
              <Route path="/quran/duas" component={QuranDuas} />
              <Route path="/quran/:id" component={SurahDetail} />
              <Route path="/prayer-times" component={PrayerTimes} />
              <Route path="/adhkar" component={Adhkar} />
              <Route path="/quiz" component={Quiz} />
              <Route path="/stories" component={Stories} />
              <Route path="/calendar" component={IslamicCalendar} />
              <Route path="/mosques" component={Mosques} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/settings" component={Settings} />
              <Route component={NotFound} />
            </Switch>
          </main>
        </div>
      </div>

      <div className="lg:hidden">
        <BottomNav />
      </div>
    </SidebarProvider>
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
