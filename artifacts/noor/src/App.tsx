import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import NotFound from "@/pages/not-found";

import { AppSidebar } from "@/components/app-sidebar";
import Home from "@/pages/home";
import QuranList from "@/pages/quran";
import SurahDetail from "@/pages/quran/surah";
import PrayerTimes from "@/pages/prayer-times";
import Adhkar from "@/pages/adhkar";
import Mosques from "@/pages/mosques";
import IslamicCalendar from "@/pages/calendar";
import Dashboard from "@/pages/dashboard";
import Settings from "@/pages/settings";
import Login from "@/pages/login";
import Register from "@/pages/register";

// Monkey patch fetch to auto-inject JWT token for internal APIs
const originalFetch = window.fetch;
window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  let urlStr = "";
  if (typeof input === "string") urlStr = input;
  else if (input instanceof URL) urlStr = input.toString();
  else if (input instanceof Request) urlStr = input.url;

  if (urlStr.startsWith("/api") && !urlStr.includes("alquran.cloud") && !urlStr.includes("aladhan.com") && !urlStr.includes("openstreetmap")) {
    const token = localStorage.getItem("noor_token");
    if (token) {
      init = init || {};
      init.headers = {
        ...init.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  }
  return originalFetch(input, init);
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
});

function Router() {
  return (
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
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const style = {
    "--sidebar-width": "18rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route>
              <SidebarProvider style={style as React.CSSProperties}>
                <div className="flex min-h-screen w-full bg-background text-foreground selection:bg-primary/30">
                  <AppSidebar />
                  <div className="flex flex-col flex-1 relative w-full overflow-hidden">
                    <header className="sticky top-0 z-40 flex items-center justify-between p-4 bg-background/50 backdrop-blur-xl border-b border-white/5 lg:hidden">
                      <SidebarTrigger className="text-primary hover:bg-white/10 p-2 rounded-lg" />
                      <span className="font-bold text-xl text-primary font-quran tracking-widest">NOOR</span>
                      <div className="w-8"></div> {/* spacer for centering */}
                    </header>
                    <main className="flex-1 overflow-y-auto w-full scroll-smooth">
                      <Router />
                    </main>
                  </div>
                </div>
              </SidebarProvider>
            </Route>
          </Switch>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
