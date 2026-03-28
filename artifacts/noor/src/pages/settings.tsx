import { useI18n } from "@/lib/i18n";
import { useGetMe, useLogout } from "@workspace/api-client-react";
import { Globe, Bell, LogIn, LogOut, LayoutDashboard, MapPin, User } from "lucide-react";
import { Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
] as const;

export default function Settings() {
  const { language, setLanguage, t, dir } = useI18n();
  const { data: user } = useGetMe({ query: { retry: false } });
  const logout = useLogout();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await logout.mutateAsync();
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
              className={`flex items-center gap-3 p-3 rounded-xl font-semibold text-sm transition-all active:scale-95 ${
                language === lang.code
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-background/50 text-foreground hover:bg-white/10"
              }`}
            >
              <span className="text-xl">{lang.flag}</span>
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="glass-card rounded-2xl p-5 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-foreground">Notifications</h3>
            <p className="text-muted-foreground text-xs">Prayer time alerts</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-xl font-semibold text-sm active:scale-95 transition">
          Enable
        </button>
      </div>

      {/* Mosque finder */}
      <Link href="/mosques" className="glass-card rounded-2xl p-5 mb-4 flex items-center gap-3 active:scale-95 transition-transform cursor-pointer block">
        <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
          <MapPin className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-bold text-foreground">{t("mosques")}</h3>
          <p className="text-muted-foreground text-xs">Find mosques near you</p>
        </div>
      </Link>

      {/* App info */}
      <div className="text-center mt-8 text-muted-foreground text-xs space-y-1">
        <p className="text-gradient font-bold text-base font-quran">نُـور · NOOR</p>
        <p>Version 1.0.0</p>
        <p>May Allah accept your worship. 🤲</p>
      </div>
    </div>
  );
}
