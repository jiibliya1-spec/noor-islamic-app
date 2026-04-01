import { useI18n } from "@/lib/i18n";
import { useGetMe, useLogout } from "@workspace/api-client-react";
import { Globe, Bell, LogIn, LogOut, LayoutDashboard, MapPin, User } from "lucide-react";
import { Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";

const LANGUAGES = [
  { code: "en", label: "English",  short: "EN" },
  { code: "ar", label: "العربية", short: "AR" },
  { code: "fr", label: "Français", short: "FR" },
  { code: "de", label: "Deutsch",  short: "DE" },
] as const;

export default function Settings() {
  const { language, setLanguage, t, dir } = useI18n();
  const { data: user } = useGetMe({ query: { retry: false } });
  const logout = useLogout();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    try { await logout.mutateAsync(); } catch {}
    localStorage.removeItem("noor_token");
    queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
    window.location.href = "/";
  };

  return (
    <div className="p-4 max-w-2xl mx-auto min-h-full pb-6" dir={dir}>
      <h1 className="text-2xl font-bold text-foreground mb-6">{t("settings")}</h1>

      {/* User card */}
      <div className="glass-card rounded-2xl p-5 mb-4">
        {user ? (
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl shrink-0">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-lg text-foreground truncate">{user.name}</p>
              <p className="text-muted-foreground text-sm truncate">{user.email}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
              <User className="w-7 h-7 text-muted-foreground" />
            </div>
            <div>
              <p className="font-bold text-foreground">Not logged in</p>
              <p className="text-muted-foreground text-sm">Login to sync your progress</p>
            </div>
          </div>
        )}
      </div>

      {/* Auth buttons — mobile prominent (hidden in sidebar on desktop) */}
      <div className="grid grid-cols-2 gap-3 mb-6 lg:hidden">
        {user ? (
          <>
            <Link href="/dashboard" className="glass-card rounded-2xl p-4 flex flex-col items-center gap-2 active:scale-95 transition-transform">
              <LayoutDashboard className="w-6 h-6 text-primary" />
              <span className="text-sm font-semibold text-foreground">{t("dashboard")}</span>
            </Link>
            <button
              onClick={handleLogout}
              disabled={logout.isPending}
              className="glass-card rounded-2xl p-4 flex flex-col items-center gap-2 active:scale-95 transition-transform text-red-400"
            >
              <LogOut className="w-6 h-6" />
              <span className="text-sm font-semibold">{t("logout")}</span>
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="glass-card rounded-2xl p-4 flex flex-col items-center gap-2 active:scale-95 transition-transform border border-primary/30">
              <LogIn className="w-6 h-6 text-primary" />
              <span className="text-sm font-semibold text-primary">{t("login")}</span>
            </Link>
            <Link href="/register" className="glass-card rounded-2xl p-4 flex flex-col items-center gap-2 active:scale-95 transition-transform">
              <User className="w-6 h-6 text-muted-foreground" />
              <span className="text-sm font-semibold text-foreground">{t("register")}</span>
            </Link>
          </>
        )}
      </div>

      {/* Language */}
      <div className="glass-card rounded-2xl p-5 mb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
            <Globe className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-foreground">{t("language")}</h3>
            <p className="text-muted-foreground text-xs">Choose your preferred language</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                language === lang.code
                  ? "bg-primary text-primary-foreground"
                  : "bg-background/50 text-foreground hover:bg-white/10 border border-white/10"
              }`}
            >
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                language === lang.code ? "bg-white/20 text-white" : "bg-primary/20 text-primary"
              }`}>
                {lang.short}
              </span>
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="glass-card rounded-2xl p-5 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-foreground">Prayer Notifications</h3>
            <p className="text-muted-foreground text-xs">Coming soon</p>
          </div>
          <div className="w-10 h-6 rounded-full bg-white/10 relative">
            <div className="w-4 h-4 rounded-full bg-muted-foreground absolute top-1 left-1" />
          </div>
        </div>
      </div>

      {/* Mosque Finder */}
      <div className="glass-card rounded-2xl p-5">
        <Link href="/mosques" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-foreground">Mosque Finder</h3>
            <p className="text-muted-foreground text-xs">Find nearby mosques</p>
          </div>
          <span className="text-muted-foreground text-lg">›</span>
        </Link>
      </div>
    </div>
  );
}
