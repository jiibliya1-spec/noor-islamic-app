import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { Link } from "wouter";
import {
  Loader2, Heart, Award, Activity, Flame, BookMarked,
  BookOpen, Clock, HandHeart, Star,
} from "lucide-react";
import { loadStreakData, bumpStreak } from "@/hooks/use-streak";
import { getAdhkarTotal } from "@/hooks/use-adhkar-progress";

function getBookmarkCount(): number {
  try {
    const raw = localStorage.getItem("noor_quran_bookmarks");
    if (!raw) return 0;
    return (JSON.parse(raw) as unknown[]).length;
  } catch {
    return 0;
  }
}

export default function Dashboard() {
  const { user, loading } = useAuth();

  const [streakData]    = useState(() => bumpStreak());
  const [adhkarTotal]   = useState(() => getAdhkarTotal());
  const [bookmarkCount] = useState(() => getBookmarkCount());

  useEffect(() => {}, [streakData]);

  if (loading) return (
    <div className="flex justify-center p-20">
      <Loader2 className="w-12 h-12 text-primary animate-spin" />
    </div>
  );

  const displayName = user
    ? (user.user_metadata?.full_name || user.email || "User")
    : "Guest";

  const stats = [
    {
      label:     "Adhkar Completed",
      labelAr:   "أذكار مكتملة",
      value:     adhkarTotal.toString(),
      icon:      Activity,
      iconColor: "text-primary",
      bgColor:   "bg-primary/20",
    },
    {
      label:     "Saved Bookmarks",
      labelAr:   "الآيات المحفوظة",
      value:     bookmarkCount.toString(),
      icon:      BookMarked,
      iconColor: "text-rose-400",
      bgColor:   "bg-rose-500/20",
    },
    {
      label:     "Day Streak",
      labelAr:   "أيام متتالية",
      value:     `${streakData.streak} ${streakData.streak === 1 ? "Day" : "Days"}`,
      icon:      Flame,
      iconColor: "text-emerald-400",
      bgColor:   "bg-emerald-500/20",
    },
  ];

  const quickActions = [
    { label: "Read Quran",   href: "/quran",        icon: BookOpen,   color: "text-primary",     bg: "bg-primary/20" },
    { label: "Adhkar",       href: "/adhkar",        icon: HandHeart,  color: "text-rose-400",    bg: "bg-rose-500/20" },
    { label: "Prayer Times", href: "/prayer-times",  icon: Clock,      color: "text-amber-400",   bg: "bg-amber-500/20" },
    { label: "Quran Duas",   href: "/quran/duas",    icon: Star,       color: "text-indigo-400",  bg: "bg-indigo-500/20" },
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          {user ? `Assalamu Alaikum, ${displayName}` : "Your Dashboard"}
        </h1>
        <p className="text-muted-foreground">
          {user
            ? "Here is your spiritual journey summary."
            : "Log in to sync your progress across devices."}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map(stat => (
          <div key={stat.label} className="glass-card p-6 rounded-3xl flex items-center gap-6">
            <div className={`w-16 h-16 rounded-full ${stat.bgColor} flex items-center justify-center shrink-0`}>
              <stat.icon className={`w-8 h-8 ${stat.iconColor}`} />
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-semibold uppercase">{stat.label}</p>
              <p className="text-4xl font-bold text-foreground">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Streak details */}
      {streakData.streak > 0 && (
        <div className="glass-card rounded-3xl p-6 mb-6 flex items-center gap-4 border border-primary/15">
          <Flame className="w-8 h-8 text-emerald-400 shrink-0" />
          <div>
            <p className="font-bold text-foreground">
              {streakData.streak === 1
                ? "Welcome back! Your streak starts today."
                : `${streakData.streak}-day streak — keep it going!`}
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">
              Opening the app or completing adhkar counts toward your daily streak.
            </p>
          </div>
        </div>
      )}

      {/* Quick actions */}
      <h3 className="text-2xl font-bold mb-4 text-foreground">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {quickActions.map(a => (
          <Link
            key={a.href}
            href={a.href}
            className="glass-card rounded-2xl p-5 flex flex-col items-center gap-3 text-center hover:border-primary/30 transition-colors cursor-pointer active:scale-[0.98]"
          >
            <div className={`w-12 h-12 rounded-full ${a.bg} flex items-center justify-center`}>
              <a.icon className={`w-6 h-6 ${a.color}`} />
            </div>
            <span className="text-sm font-semibold text-foreground">{a.label}</span>
          </Link>
        ))}
      </div>

      {/* Login prompt for guests */}
      {!user && (
        <div className="glass-card rounded-3xl p-8 text-center border border-primary/15">
          <Heart className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Save your progress</h2>
          <p className="text-muted-foreground mb-6 text-sm">
            Create a free account to sync your streak, adhkar, and Quran bookmarks across devices.
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/register"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all text-sm"
            >
              Create Account
            </Link>
            <Link
              href="/login"
              className="px-6 py-3 border border-border/50 rounded-2xl font-semibold hover:bg-white/5 transition text-sm text-foreground"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}

      {/* Achievements placeholder */}
      {user && (
        <div className="glass-card rounded-3xl p-6 border border-primary/10">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-bold text-foreground">Achievements</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Complete adhkar, read Quran, and maintain your streak to earn achievements.
          </p>
        </div>
      )}
    </div>
  );
}
