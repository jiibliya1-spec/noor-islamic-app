import { useState, useCallback } from "react";
import { RotateCcw, CheckCircle2, ChevronRight, ChevronLeft, BookOpen } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useToast } from "@/hooks/use-toast";
import { ADHKAR_DATA, CATEGORY_META } from "@/data/adhkar-data";

export default function Adhkar() {
  const { language } = useI18n();
  const [activeCategory, setActiveCategory] = useState("morning");
  const [dhikrIndex, setDhikrIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const list = ADHKAR_DATA[activeCategory];
  const dhikr = list[dhikrIndex];
  const isComplete = count >= dhikr.count;
  const progressPct = Math.min((count / dhikr.count) * 100, 100);
  const strokeDash = 2 * Math.PI * 110;

  const handleTap = useCallback(() => {
    if (isComplete) return;
    if ("vibrate" in navigator) navigator.vibrate(30);
    const next = count + 1;
    setCount(next);
    if (next >= dhikr.count) {
      if ("vibrate" in navigator) navigator.vibrate([80, 40, 80]);
      setCompletedIds(prev => new Set([...prev, dhikr.id]));
      toast({
        title: language === "ar" ? "اكتمل! 🌟" : "Completed! 🌟",
        description: dhikr.arabic,
      });
    }
  }, [count, dhikr, isComplete, language, toast]);

  const goNext = () => {
    if (dhikrIndex < list.length - 1) {
      setDhikrIndex(i => i + 1);
      setCount(0);
    }
  };

  const goPrev = () => {
    if (dhikrIndex > 0) {
      setDhikrIndex(i => i - 1);
      setCount(0);
    }
  };

  const switchCategory = (cat: string) => {
    setActiveCategory(cat);
    setDhikrIndex(0);
    setCount(0);
  };

  const isDir = language === "ar" ? "rtl" : "ltr";

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto min-h-full pb-24" dir={isDir}>
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
        {language === "ar" ? "الأذكار والتسبيح" : "Adhkar & Tasbeeh"}
      </h1>
      <p className="text-muted-foreground mb-8 text-sm">
        {language === "ar" ? "اذكر الله يذكرك" : "Remember Allah and He will remember you"}
      </p>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
        {Object.keys(ADHKAR_DATA).map(cat => {
          const meta = CATEGORY_META[cat];
          const label = meta[language as keyof typeof meta] ?? meta.en;
          const done = ADHKAR_DATA[cat].every(d => completedIds.has(d.id));
          return (
            <button
              key={cat}
              onClick={() => switchCategory(cat)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-card text-muted-foreground hover:bg-white/10 border border-border/40"
              }`}
            >
              <span className="text-base">{meta.icon}</span>
              {done && <CheckCircle2 className="w-3.5 h-3.5" />}
              {label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main counter card */}
        <div className="lg:col-span-2">
          <div className="glass-card rounded-3xl p-6 md:p-8 flex flex-col items-center text-center">
            {/* Navigation row */}
            <div className="flex items-center justify-between w-full mb-5 text-sm text-muted-foreground font-medium">
              <button
                onClick={goPrev}
                disabled={dhikrIndex === 0}
                className="p-2 rounded-full hover:bg-white/10 disabled:opacity-30 transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span>
                {language === "ar"
                  ? `الذكر ${dhikrIndex + 1} من ${list.length}`
                  : `${dhikrIndex + 1} / ${list.length}`}
              </span>
              <button
                onClick={goNext}
                disabled={dhikrIndex === list.length - 1}
                className="p-2 rounded-full hover:bg-white/10 disabled:opacity-30 transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Arabic text */}
            <p className="text-2xl md:text-3xl font-quran text-foreground leading-loose mb-4 text-center" dir="rtl">
              {dhikr.arabic}
            </p>

            {/* Transliteration — always visible */}
            <p className="text-sm italic text-primary/80 mb-3 max-w-lg">
              {dhikr.transliteration}
            </p>

            {/* Translation */}
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-2 max-w-lg">
              {dhikr.translation[language as keyof typeof dhikr.translation] ?? dhikr.translation.en}
            </p>

            {/* Source */}
            {dhikr.source && (
              <div className="flex items-center gap-1.5 mb-6 text-xs text-muted-foreground/60">
                <BookOpen className="w-3 h-3" />
                <span>{dhikr.source}</span>
              </div>
            )}

            {/* Tasbeeh Circle */}
            <div
              className="relative cursor-pointer select-none mb-6 active:scale-95 transition-transform"
              style={{ width: 220, height: 220 }}
              onClick={handleTap}
            >
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 240 240">
                <circle cx="120" cy="120" r="110" className="stroke-border fill-transparent" strokeWidth="8" />
                <circle
                  cx="120" cy="120" r="110"
                  className="fill-transparent transition-all duration-300"
                  stroke="hsl(var(--primary))"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={strokeDash}
                  strokeDashoffset={strokeDash - (strokeDash * progressPct) / 100}
                />
              </svg>
              <div className="absolute inset-3 rounded-full bg-gradient-to-br from-card to-background shadow-inner flex flex-col items-center justify-center">
                {isComplete ? (
                  <div className="flex flex-col items-center">
                    <CheckCircle2 className="w-14 h-14 text-primary mb-1" />
                    <span className="text-primary font-semibold text-sm">
                      {language === "ar" ? "اكتمل!" : "Done!"}
                    </span>
                  </div>
                ) : (
                  <>
                    <span className="text-5xl font-bold text-foreground font-mono">{count}</span>
                    <span className="text-base text-muted-foreground">/ {dhikr.count}</span>
                    <span className="text-[11px] text-muted-foreground/50 mt-1">
                      {language === "ar" ? "انقر للعدّ" : "Tap to count"}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-3 items-center">
              <button
                onClick={() => {
                  setCount(0);
                  setCompletedIds(prev => { const s = new Set(prev); s.delete(dhikr.id); return s; });
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-card text-muted-foreground hover:bg-white/10 transition text-sm font-medium border border-border/40"
              >
                <RotateCcw className="w-4 h-4" />
                {language === "ar" ? "إعادة" : "Reset"}
              </button>
              {isComplete && dhikrIndex < list.length - 1 && (
                <button
                  onClick={goNext}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition text-sm font-medium"
                >
                  {language === "ar" ? "التالي" : "Next"}
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Progress list */}
        <div className="glass-card rounded-3xl p-5">
          <h3 className="font-bold text-base mb-4 text-foreground">
            {language === "ar" ? "التقدم" : "Progress"}
          </h3>
          <div className="space-y-2">
            {list.map((d, i) => {
              const done = completedIds.has(d.id);
              const active = i === dhikrIndex;
              return (
                <button
                  key={d.id}
                  onClick={() => { setDhikrIndex(i); setCount(done ? d.count : 0); }}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all text-left ${
                    active ? "bg-primary/20 border border-primary/40" : "hover:bg-white/5"
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                    done ? "bg-primary text-primary-foreground" : active ? "bg-primary/20 text-primary" : "bg-white/10 text-muted-foreground"
                  }`}>
                    {done ? "✓" : i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-quran text-foreground truncate block" dir="rtl">{d.arabic.split(" ").slice(0, 4).join(" ")}…</span>
                    <span className="text-[10px] text-muted-foreground">×{d.count}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Category completion */}
          <div className="mt-4 pt-4 border-t border-border/30">
            <div className="text-xs text-muted-foreground mb-1">
              {language === "ar" ? "اكتمل" : "Completed"}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-border/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${(list.filter(d => completedIds.has(d.id)).length / list.length) * 100}%` }}
                />
              </div>
              <span className="text-xs font-medium text-foreground">
                {list.filter(d => completedIds.has(d.id)).length}/{list.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
