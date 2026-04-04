import { useState } from "react";
import {
  Clock, ChevronLeft, ChevronRight, BookOpen, Star,
  BookMarked, Users, Sparkles, ScrollText, Lightbulb, Library,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { LucideIcon } from "lucide-react";

import { ISLAMIC_STORIES, STORY_CATEGORIES } from "@/data/stories-data";

type StoryCategory = typeof STORY_CATEGORIES[number]["id"];

const CAT_META: Record<string, {
  icon: LucideIcon;
  color: string;
  activeClass: string;
  badgeClass: string;
}> = {
  all:        { icon: Library,     color: "#4ade80", activeClass: "bg-primary text-primary-foreground shadow-primary/30",        badgeClass: "bg-white/25" },
  prophet:    { icon: BookMarked,  color: "#f59e0b", activeClass: "bg-amber-500  text-white          shadow-amber-500/30",       badgeClass: "bg-white/25" },
  companions: { icon: Users,       color: "#818cf8", activeClass: "bg-indigo-500 text-white          shadow-indigo-500/30",      badgeClass: "bg-white/25" },
  prophets:   { icon: Sparkles,    color: "#f472b6", activeClass: "bg-pink-500   text-white          shadow-pink-500/30",        badgeClass: "bg-white/25" },
  history:    { icon: ScrollText,  color: "#fb923c", activeClass: "bg-orange-500 text-white          shadow-orange-500/30",      badgeClass: "bg-white/25" },
  moral:      { icon: Lightbulb,   color: "#34d399", activeClass: "bg-emerald-500 text-white         shadow-emerald-500/30",     badgeClass: "bg-white/25" },
};

export default function Stories() {
  const { language, t } = useI18n();
  const [category, setCategory] = useState<StoryCategory>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const isDir = language === "ar" ? "rtl" : "ltr";

  const filtered = category === "all"
    ? ISLAMIC_STORIES
    : ISLAMIC_STORIES.filter(s => s.category === category);

  const selected = selectedId ? ISLAMIC_STORIES.find(s => s.id === selectedId) : null;
  const selectedIdx = selectedId ? filtered.findIndex(s => s.id === selectedId) : -1;

  /* ─── Story detail view ─── */
  if (selected) {
    const catMeta = CAT_META[selected.category] ?? CAT_META.all;
    const CatIcon = catMeta.icon;

    return (
      <div className="p-4 md:p-8 max-w-3xl mx-auto w-full pb-24" dir={isDir}>
        {/* Back */}
        <button
          onClick={() => setSelectedId(null)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition mb-6 text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          {t("backToStories")}
        </button>

        {/* Story hero */}
        <div
          className="rounded-3xl mb-5 overflow-hidden shadow-lg"
          style={{ background: selected.bg || "linear-gradient(135deg,#1a472a 0%,#2d6a4f 100%)" }}
        >
          <div className="flex justify-center pt-8 pb-2">
            <div className="w-20 h-20 rounded-full bg-white/15 flex items-center justify-center">
              <CatIcon className="w-10 h-10 text-white/90" />
            </div>
          </div>
          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-medium text-white/70 uppercase tracking-wider mb-2 block">
                  {(() => {
                    const cat = STORY_CATEGORIES.find(c => c.id === selected.category);
                    return cat ? ((cat as Record<string, string>)[language] ?? cat.label) : "";
                  })()}
                </span>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {(selected.title as Record<string, string>)[language] ?? selected.title.en}
                </h1>
                {language !== "ar" && (
                  <p className="text-base text-white/70 font-quran" dir="rtl">{selected.title.ar}</p>
                )}
              </div>
              <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-full text-xs text-white/80 shrink-0">
                <Clock className="w-3 h-3" />
                {selected.readingTime} {t("minutesLabel")}
              </div>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-2xl p-4 text-center">
              <p className="font-quran text-xl text-white leading-relaxed" dir="rtl">
                {selected.arabicOpening}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="glass-card rounded-3xl p-6 md:p-8 mb-5">
          <div className="prose prose-sm max-w-none">
            {((selected.content as Record<string, string>)[language] ?? selected.content.en)
              .split("\n\n")
              .map((para, i) => (
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
                {t("moralOfStory")}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {(selected.moral as Record<string, string>)[language] ?? selected.moral.en}
              </p>
            </div>
          </div>
        </div>

        {/* Prev / Next */}
        <div className="flex gap-3">
          {selectedIdx > 0 && (
            <button
              onClick={() => setSelectedId(filtered[selectedIdx - 1].id)}
              className="flex-1 py-3 rounded-2xl border border-border/40 text-foreground hover:bg-white/5 transition flex items-center justify-center gap-2 text-sm font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              {t("previousStory")}
            </button>
          )}
          {selectedIdx < filtered.length - 1 && (
            <button
              onClick={() => setSelectedId(filtered[selectedIdx + 1].id)}
              className="flex-1 py-3 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/30 transition active:scale-95 flex items-center justify-center gap-2 text-sm font-medium"
            >
              {t("nextStory")}
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  /* ─── Story list view ─── */
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto w-full pb-24" dir={isDir}>
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-1">
        {t("stories")}
      </h1>
      <p className="text-muted-foreground mb-6 text-sm">
        {t("storiesSubtitle")}
      </p>

      {/* ── Category filter row ── */}
      <div
        className="flex gap-2.5 mb-8 overflow-x-auto pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {STORY_CATEGORIES.map((cat) => {
          const meta = CAT_META[cat.id] ?? CAT_META.all;
          const CatIcon = meta.icon;
          const isActive = category === cat.id;
          const count = cat.id === "all"
            ? ISLAMIC_STORIES.length
            : ISLAMIC_STORIES.filter(s => s.category === cat.id).length;
          const label = (cat as Record<string, string>)[language] ?? cat.label;

          return (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id as StoryCategory)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold whitespace-nowrap flex-shrink-0
                transition-all duration-200 shadow-md
                ${isActive
                  ? `${meta.activeClass} shadow-lg scale-[1.03]`
                  : "bg-card/80 text-muted-foreground hover:bg-white/10 border border-border/40 hover:border-border/60 hover:scale-[1.01]"
                }
              `}
            >
              <CatIcon className="w-4 h-4" />
              <span>{label}</span>
              <span
                className={`
                  text-xs font-bold rounded-full px-2 py-0.5 min-w-[1.5rem] text-center
                  ${isActive ? meta.badgeClass : "bg-white/10 text-muted-foreground"}
                `}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Story grid ── */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          {t("noStoriesYet")}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((story) => {
            const meta = CAT_META[story.category] ?? CAT_META.all;
            const StoryIcon = meta.icon;
            return (
              <button
                key={story.id}
                onClick={() => setSelectedId(story.id)}
                className="glass-card rounded-2xl overflow-hidden text-left hover:border-primary/30 border border-transparent transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 active:scale-[0.99] group"
              >
                {/* Icon banner */}
                <div
                  className="h-24 flex items-center justify-center"
                  style={{ background: story.bg || "linear-gradient(135deg,#1a472a 0%,#2d6a4f 100%)" }}
                >
                  <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center">
                    <StoryIcon className="w-7 h-7 text-white/90" />
                  </div>
                </div>

                <div className="p-5">
                  {/* Category chip + read time */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: `${meta.color}22`, color: meta.color }}
                    >
                      <StoryIcon className="w-3 h-3" />
                      {(() => {
                        const cat = STORY_CATEGORIES.find(c => c.id === story.category);
                        return cat ? ((cat as Record<string, string>)[language] ?? cat.label) : "";
                      })()}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {story.readingTime} {t("minutesLabel")}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-base text-foreground mb-1 group-hover:text-primary transition-colors">
                    {(story.title as Record<string, string>)[language] ?? story.title.en}
                  </h3>
                  {language !== "ar" && (
                    <p className="text-sm text-muted-foreground font-quran mb-3" dir="rtl">
                      {story.title.ar}
                    </p>
                  )}

                  {/* Arabic snippet */}
                  <p className="text-xs text-primary/70 font-quran border-r-2 border-primary/30 pr-3 mb-3 line-clamp-1" dir="rtl">
                    {story.arabicOpening}
                  </p>

                  {/* Preview */}
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {((story.content as Record<string, string>)[language] ?? story.content.en)
                      .split("\n\n")[0]
                      .slice(0, 120)}…
                  </p>

                  <div className="flex items-center gap-1.5 mt-3 text-xs text-primary font-semibold">
                    <BookOpen className="w-3.5 h-3.5" />
                    {t("readStory")}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
