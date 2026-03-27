import { useGetMe, useGetAdhkarProgress, useGetFavorites } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Loader2, Heart, Award, Activity } from "lucide-react";

export default function Dashboard() {
  const { data: user, isLoading: userLoading } = useGetMe({ query: { retry: false }});
  const { data: progress } = useGetAdhkarProgress();
  const { data: favs } = useGetFavorites();

  if (userLoading) return <div className="flex justify-center p-20"><Loader2 className="w-12 h-12 text-primary animate-spin" /></div>;

  if (!user) {
    return (
      <div className="p-8 text-center max-w-lg mx-auto mt-20 glass-card rounded-3xl">
        <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
        <p className="text-muted-foreground mb-8">You need to be logged in to view your dashboard and progress.</p>
        <Link href="/login" className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold">Login Now</Link>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen">
      <h1 className="text-4xl font-bold text-foreground mb-2">Assalamu Alaikum, {user.name}</h1>
      <p className="text-muted-foreground mb-10">Here is your spiritual journey summary.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="glass-card p-6 rounded-3xl flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            <Activity className="w-8 h-8 text-primary" />
          </div>
          <div>
            <p className="text-muted-foreground text-sm font-semibold uppercase">Adhkar Completed</p>
            <p className="text-4xl font-bold text-foreground">{progress?.filter(p => p.completed).length || 0}</p>
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-rose-500/20 flex items-center justify-center">
            <Heart className="w-8 h-8 text-rose-500" />
          </div>
          <div>
            <p className="text-muted-foreground text-sm font-semibold uppercase">Saved Favorites</p>
            <p className="text-4xl font-bold text-foreground">{favs?.length || 0}</p>
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <Award className="w-8 h-8 text-emerald-500" />
          </div>
          <div>
            <p className="text-muted-foreground text-sm font-semibold uppercase">Current Streak</p>
            <p className="text-4xl font-bold text-foreground">3 Days</p>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-6">Recent Activity</h3>
      <div className="glass-card rounded-3xl p-6 min-h-[200px] flex items-center justify-center text-muted-foreground">
        No recent activity found. Start reading Quran or Adhkar!
      </div>
    </div>
  );
}
