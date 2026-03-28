import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { I18nProvider } from "@/lib/i18n";
import { BottomNav } from "@/components/bottom-nav";
import NotFound from "@/pages/not-found";

import { AppSidebar } from "@/components/app-sidebar";
import Home from "@/pages/home";
import QuranList from "@/pages/quran/index";
import SurahDetail from "@/pages/quran/surah";
import PrayerTimes from "@/pages/prayer-times";
import Adhkar from "@/pages/adhkar";
import Mosques from "@/pages/mosques";
import IslamicCalendar from "@/pages/calendar";
import Dashboard from "@/pages/dashboard";
import Settings from "@/pages/settings";
import Login from "@/pages/login";
import Register from "@/pages/register";

// Resolve base API URL — supports VITE_API_URL for external deployments
const API_BASE = (import.meta.env.VITE_API_URL as string | undefined) || "";

// Auto-inject JWT token for all internal API requests
const originalFetch = window.fetch;
window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  let urlStr = "";
  if (typeof input === "string") urlStr = input;
  else if (input instanceof URL) urlStr = input.toString();
  else if (input instanceof Request) urlStr = input.url;

  if (urlStr.startsWith("/api")) {
    const token = localStorage.getItem("noor_token");
    init = init || {};
    if (token) {
      init.headers = { ...init.headers, Authorization: `Bearer ${token}` };
    }
    if (API_BASE && typeof input === "string") {
      input = API_BASE + input;
    }
  }
  return originalFetch(input, init);
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: 1 },
  },
});

function AppLayout() {
  return (
    /* Desktop: sidebar layout. Mobile: full-screen + bottom nav */
    <SidebarProvider style={{ "--sidebar-width": "17rem", "--sidebar-width-icon": "4rem" } as React.CSSProperties}>
      <div className="flex min-h-screen w-full bg-background text-foreground">

        {/* Sidebar — hidden on mobile, shown on lg+ */}
        <div className="hidden lg:block">
          <AppSidebar />
        </div>

        {/* Main content area */}
        <div className="flex flex-col flex-1 w-full min-w-0 overflow-hidden">
          <main className="flex-1 overflow-y-auto pb-20 lg:pb-4">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/quran" component={QuranList} />
              <Route path="/quran/:id" component={SurahDetail} />
              <Route path="/prayer-times" component={PrayerTimes} />
              <Route path="/adhkar" component={Adhkar} />
              <Route path="/calendar" component={IslamicCalendar} />
              <Route path="/mosques" component={Mosques} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/settings" component={Settings} />
              <Route component={NotFound} />
            </Switch>
          </main>
        </div>
      </div>

      {/* Bottom nav — mobile only */}
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
      </I18nProvider>
    </QueryClientProvider>
  );
}

export default App;
