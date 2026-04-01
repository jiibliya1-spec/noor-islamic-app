import { useState } from "react";
import { Clock, ChevronLeft, ChevronRight, BookOpen, Star } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { ISLAMIC_STORIES, STORY_CATEGORIES } from "@/data/stories-data";

type StoryCategory = typeof STORY_CATEGORIES[number]["id"];

const CATEGORY_ICON: Record<string, string> = {
  all: "📖",
  prophet: "🕌",
  companions: "🌙",
  prophets: "⭐",
  history: "📜",
};

export default function Stories() {
  const { language } = useI18n();
  const [category, setCategory] = useState<StoryCategory>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const isDir = language === "ar" ? "rtl" : "ltr";

  const filtered = category === "all" ? ISLAMIC_STORIES : ISLAMIC_STORIES.filter(s => s.category === category);
  const selected = selectedId ? ISLAMIC_STORIES.find(s => s.id === selectedId) : null;
  const selectedIdx = selectedId ? filtered.findIndex(s => s.id === selectedId) : -1;

  if (selected) {
    return (
      <div className="p-4 md:p-8 max-w-3xl mx-auto min-h-full pb-24" dir={isDir}>
        {/* Back */}
        <button
          onClick={() => setSelectedId(null)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition mb-6 text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          {language === "ar" ? "العودة إلى القصص" : "Back to Stories"}
        </button>

        {/* Story header */}
        <div className="glass-card rounded-3xl p-6 md:p-8 mb-5">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <span className="text-xs font-medium text-primary uppercase tracking-wider mb-2 block">
                {STORY_CATEGORIES.find(c => c.id === selected.category)?.[language === "ar" ? "ar" : "label"]}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                {language === "ar" ? selected.titleAr : selected.titleEn}
              </h1>
              {language !== "ar" && (
                <p className="text-base text-muted-foreground font-quran" dir="rtl">{selected.titleAr}</p>
              )}
            </div>
            <div className="flex items-center gap-1.5 bg-card px-3 py-1.5 rounded-full text-xs text-muted-foreground shrink-0 border border-border/40">
              <Clock className="w-3 h-3" />
              {selected.readingTime} {language === "ar" ? "دقائق" : "min"}
            </div>
          </div>

          {/* Arabic opening quote */}
          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 text-center mb-0">
            <p className="font-quran text-xl text-primary leading-relaxed" dir="rtl">
              {selected.arabicOpening}
            </p>
          </div>
        </div>

        {/* Story content */}
        <div className="glass-card rounded-3xl p-6 md:p-8 mb-5">
          <div className="prose prose-sm max-w-none">
            {selected.content.split("\n\n").map((para, i) => (
              <p key={i} className="text-foreground/90 leading-relaxed mb-4 last:mb-0 text-sm md:text-base">
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* Moral */}
        <div className="glass-card rounded-3xl p-6 border border-primary/20 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <Star className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-bold text-sm text-primary mb-1">
                {language === "ar" ? "العبرة" : "Moral of the Story"}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">{selected.moral}</p>
            </div>
          </div>
        </div>

        {/* Prev / Next nav */}
        <div className="flex gap-3">
          {selectedIdx > 0 && (
            <button
              onClick={() => setSelectedId(filtered[selectedIdx - 1].id)}
              className="flex-1 py-3 rounded-2xl border border-border/40 text-foreground hover:bg-white/5 transition flex items-center justify-center gap-2 text-sm font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              {language === "ar" ? "القصة السابقة" : "Previous"}
            </button>
          )}
          {selectedIdx < filtered.length - 1 && (
            <button
              onClick={() => setSelectedId(filtered[selectedIdx + 1].id)}
              className="flex-1 py-3 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/30 transition active:scale-95 flex items-center justify-center gap-2 text-sm font-medium"
            >
              {language === "ar" ? "القصة التالية" : "Next Story"}
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto min-h-full pb-24" dir={isDir}>
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
        {language === "ar" ? "القصص الإسلامية" : "Islamic Stories"}
      </h1>
      <p className="text-muted-foreground mb-8 text-sm">
        {language === "ar"
          ? "قصص النبي ﷺ والصحابة والأنبياء وتاريخ الإسلام"
          : "Stories of the Prophet ﷺ, Companions, Prophets & Islamic History"}
      </p>

      {/* Category filter */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
        {STORY_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id as StoryCategory)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
              category === cat.id
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "bg-card text-muted-foreground hover:bg-white/10 border border-border/40"
            }`}
          >
            <span>{CATEGORY_ICON[cat.id]}</span>
            {language === "ar" ? cat.ar : cat.label}
            <span className={`text-xs rounded-full px-2 py-0.5 ${
              category === cat.id ? "bg-white/20" : "bg-white/10"
            }`}>
              {cat.id === "all" ? ISLAMIC_STORIES.length : ISLAMIC_STORIES.filter(s => s.category === cat.id).length}
            </span>
          </button>
        ))}
      </div>

      {/* Story grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(story => (
          <button
            key={story.id}
            onClick={() => setSelectedId(story.id)}
            className="glass-card rounded-2xl p-5 text-left hover:border-primary/30 border border-transparent transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10 active:scale-[0.99] group"
          >
            {/* Category + read time */}
            <div className="flex items-center justify-between mb-3">
              <span className="flex items-center gap-1.5 text-xs font-medium text-primary">
                <span>{CATEGORY_ICON[story.category]}</span>
                {STORY_CATEGORIES.find(c => c.id === story.category)?.[language === "ar" ? "ar" : "label"]}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {story.readingTime} {language === "ar" ? "دقائق" : "min"}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-bold text-base text-foreground mb-1 group-hover:text-primary transition-colors">
              {language === "ar" ? story.titleAr : story.titleEn}
            </h3>
            {language !== "ar" && (
              <p className="text-sm text-muted-foreground font-quran mb-3" dir="rtl">{story.titleAr}</p>
            )}

            {/* Arabic opening snippet */}
            <p className="text-xs text-primary/70 font-quran border-r-2 border-primary/30 pr-3 mb-3" dir="rtl">
              {story.arabicOpening}
            </p>

            {/* Content preview */}
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
              {story.content.split("\n\n")[0].slice(0, 120)}…
            </p>

            <div className="flex items-center gap-1.5 mt-3 text-xs text-primary font-semibold">
              <BookOpen className="w-3.5 h-3.5" />
              {language === "ar" ? "اقرأ القصة" : "Read Story"}
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
