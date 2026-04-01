import { Link, useLocation } from "wouter";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import {
  Home, BookOpen, Clock, Heart, CalendarDays,
  MapPin, LayoutDashboard, Settings, LogIn, LogOut,
  HelpCircle, BookMarked
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const { t, language } = useI18n();
  const [location] = useLocation();
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    window.location.href = "/";
  };

  const menuItems = [
    { title: t("home"), url: "/", icon: Home },
    { title: t("quran"), url: "/quran", icon: BookOpen },
    { title: t("prayerTimes"), url: "/prayer-times", icon: Clock },
    { title: t("adhkar"), url: "/adhkar", icon: Heart },
    { title: t("quiz"), url: "/quiz", icon: HelpCircle },
    { title: t("stories"), url: "/stories", icon: BookMarked },
    { title: t("calendar"), url: "/calendar", icon: CalendarDays },
    { title: t("mosques"), url: "/mosques", icon: MapPin },
    { title: t("dashboard"), url: "/dashboard", icon: LayoutDashboard, auth: true },
    { title: t("settings"), url: "/settings", icon: Settings },
  ];

  return (
    <Sidebar className="border-r border-border/50 bg-sidebar/95 backdrop-blur-md">
      <SidebarHeader className="p-4 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <img src={`${import.meta.env.BASE_URL}images/noor-logo.png`} alt="Noor Logo" className="w-16 h-16 drop-shadow-lg object-contain" />
          <h1 className="text-2xl font-bold text-gradient uppercase tracking-widest font-quran">
            {language === 'ar' ? 'نُـور' : 'NOOR'}
          </h1>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 mt-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {menuItems.map((item) => {
                if (item.auth && !user) return null;
                const isActive = location === item.url || (item.url !== "/" && location.startsWith(item.url));
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                      <Link href={item.url} className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                        ${isActive ? 'bg-primary/15 text-primary shadow-sm' : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'}
                      `}>
                        <item.icon className={`w-5 h-5 ${isActive ? 'text-primary' : ''}`} />
                        <span className="font-medium text-[15px]">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/50">
        {user ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 px-2">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                {(user.user_metadata?.full_name || user.email || "U").charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-semibold truncate">
                  {user.user_metadata?.full_name || "User"}
                </span>
                <span className="text-xs text-muted-foreground truncate">{user.email}</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 w-full text-left text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>{t("logout")}</span>
            </button>
          </div>
        ) : (
          <Link href="/login" className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all">
            <LogIn className="w-5 h-5" />
            <span>{t("login")}</span>
          </Link>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
