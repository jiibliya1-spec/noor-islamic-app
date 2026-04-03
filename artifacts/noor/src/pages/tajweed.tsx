import { useState } from "react";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { TAJWEED_RULES, TAJWEED_CATEGORIES, RULE_CATEGORY } from "@/data/tajweed-data";

type Lang = "en" | "ar" | "fr" | "de";

export default function Tajweed() {
  const { language } = useI18n();
  const lang = (["en", "ar", "fr", "de"].includes(language) ? language : "en") as Lang;
  const dir = lang === "ar" ? "rtl" : "ltr";

  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered =
    activeCategory === "all"
      ? TAJWEED_RULES
      : TAJWEED_RULES.filter(r => RULE_CATEGORY[r.id] === activeCategory);

  const selected = selectedId ? TAJWEED_RULES.find(r => r.id === selectedId) : null;
  const selectedIdx = selectedId ? filtered.findIndex(r => r.id === selectedId) : -1;

  if (selected) {
    const prev = selectedIdx > 0 ? filtered[selectedIdx - 1] : null;
    const next = selectedIdx < filtered.length - 1 ? filtered[selectedIdx + 1] : null;

    return (
      <div className="p-4 md:p-8 max-w-3xl mx-auto min-h-full pb-24" dir={dir}>
        <button
          onClick={() => setSelectedId(null)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition mb-6 text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          {lang === "ar" ? "العودة إلى التجويد" : lang === "fr" ? "Retour au Tajweed" : lang === "de" ? "Zurück zum Tajweed" : "Back to Tajweed"}
        </button>

        {/* Rule header */}
        <div
          className="rounded-3xl p-6 mb-5 border"
          style={{ background: `${selected.color}18`, borderColor: `${selected.color}40` }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div
                className="text-5xl mb-3 font-bold"
                style={{ color: selected.color, fontFamily: "'Amiri', 'Uthmanic', serif" }}
              >
                {selected.arabicName}
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground">
                {selected.name[lang]}
              </h1>
            </div>
            <span className="text-4xl select-none mt-1">{selected.emoji}</span>
          </div>
        </div>

        {/* Explanation */}
        <div className="glass-card rounded-2xl p-5 mb-5">
          <h2 className="font-bold text-foreground mb-3 text-base">
            {lang === "ar" ? "الشرح" : lang === "fr" ? "Explication" : lang === "de" ? "Erklärung" : "Explanation"}
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">{selected.explanation[lang]}</p>
        </div>

        {/* Examples */}
        <div className="glass-card rounded-2xl p-5 mb-6">
          <h2 className="font-bold text-foreground mb-4 text-base">
            {lang === "ar" ? "الأمثلة" : lang === "fr" ? "Exemples" : lang === "de" ? "Beispiele" : "Examples"}
          </h2>
          <div className="flex flex-col gap-3">
            {selected.examples.map((ex, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 rounded-xl border"
                style={{ borderColor: `${selected.color}30`, background: `${selected.color}0a` }}
              >
                <div
                  className="text-2xl font-quran font-bold shrink-0"
                  style={{ color: selected.color, direction: "rtl" }}
                >
                  {ex.arabic}
                </div>
                <div className="text-sm text-muted-foreground">{ex.label[lang]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          {prev && (
            <button
              onClick={() => setSelectedId(prev.id)}
              className="flex-1 flex items-center justify-center gap-2 glass-card border border-border/40 rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition"
            >
              <ChevronLeft className="w-4 h-4 shrink-0" />
              <span className="truncate">{prev.name[lang]}</span>
            </button>
          )}
          {next && (
            <button
              onClick={() => setSelectedId(next.id)}
              className="flex-1 flex items-center justify-center gap-2 glass-card border border-border/40 rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition"
            >
              <span className="truncate">{next.name[lang]}</span>
              <ChevronRight className="w-4 h-4 shrink-0" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto min-h-full pb-24" dir={dir}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {lang === "ar" ? "أحكام التجويد" : lang === "fr" ? "Règles du Tajweed" : lang === "de" ? "Tajweed-Regeln" : "Tajweed Rules"}
            </h1>
            <p className="text-xs text-muted-foreground">
              {lang === "ar" ? "تعلّم أحكام تجويد القرآن الكريم" : lang === "fr" ? "Apprenez les règles de récitation du Coran" : lang === "de" ? "Lernen Sie die Regeln der Koranrezitation" : "Learn the rules of Quranic recitation"}
            </p>
          </div>
        </div>
      </div>

      {/* Banner */}
      <div className="glass-card rounded-2xl p-4 mb-6 border border-primary/20 bg-primary/5">
        <p className="font-quran text-xl text-primary text-center leading-loose" dir="rtl">
          وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا
        </p>
        <p className="text-xs text-muted-foreground text-center mt-1">
          {lang === "ar" ? "وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا — المزمل: ٤" : "\"And recite the Quran with measured recitation\" — Al-Muzzammil 73:4"}
        </p>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {TAJWEED_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
              activeCategory === cat.id
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border/40 text-muted-foreground hover:border-primary/50 hover:text-foreground"
            }`}
          >
            {cat.label[lang]}
          </button>
        ))}
      </div>

      {/* Rules grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map(rule => (
          <button
            key={rule.id}
            onClick={() => setSelectedId(rule.id)}
            className="glass-card border border-border/30 rounded-2xl p-5 text-start hover:border-primary/40 transition-all group"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div
                className="text-3xl font-bold font-quran"
                style={{ color: rule.color }}
              >
                {rule.arabicName}
              </div>
              <span className="text-2xl">{rule.emoji}</span>
            </div>
            <h3 className="font-bold text-foreground text-sm mb-1 group-hover:text-primary transition-colors">
              {rule.name[lang]}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {rule.explanation[lang].slice(0, 100)}…
            </p>
            <div className="flex items-center gap-1 mt-3">
              {rule.examples.slice(0, 3).map((ex, i) => (
                <span
                  key={i}
                  className="text-sm font-quran px-2 py-0.5 rounded-lg"
                  style={{ background: `${rule.color}18`, color: rule.color }}
                  dir="rtl"
                >
                  {ex.arabic}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
