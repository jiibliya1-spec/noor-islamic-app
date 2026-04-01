import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ChevronDown, ChevronUp, BookOpen, Star } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { QURANIC_DUAS } from "@/data/quran-duas-data";
import { COMPLETION_DUAS } from "@/data/quran-completion-duas-data";

type Lang = "en" | "ar" | "fr" | "de";
type Tab = "quranic" | "completion";

function DuaCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="glass-card rounded-2xl overflow-hidden border border-white/5">
      {children}
    </div>
  );
}

export default function QuranDuas() {
  const { language } = useI18n();
  const lang = (["en", "ar", "fr", "de"].includes(language) ? language : "en") as Lang;
  const dir = lang === "ar" ? "rtl" : "ltr";
  const [tab, setTab] = useState<Tab>("quranic");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const t = {
    title:      { en: "Quranic Duas",        ar: "أدعية من القرآن",   fr: "Invocations du Coran",  de: "Koranische Bittgebete" },
    tabQ:       { en: "Quranic Duas",        ar: "أدعية قرآنية",      fr: "Duas Coraniques",       de: "Quran-Duas" },
    tabC:       { en: "Completion Duas",     ar: "أدعية الختم",       fr: "Duas de Complétion",    de: "Abschluss-Duas" },
    source:     { en: "Source",              ar: "المصدر",             fr: "Source",                de: "Quelle" },
    translation:{ en: "Translation",         ar: "الترجمة",            fr: "Traduction",            de: "Übersetzung" },
    transliter: { en: "Transliteration",     ar: "النطق",             fr: "Translittération",      de: "Transliteration" },
    note:       { en: "Note",               ar: "ملاحظة",             fr: "Note",                  de: "Hinweis" },
    reference:  { en: "Reference",           ar: "المرجع",             fr: "Référence",             de: "Referenz" },
    back:       { en: "Back to Quran",       ar: "العودة للقرآن",     fr: "Retour au Coran",       de: "Zurück zum Koran" },
    subtitle:   { en: "Authentic duas from the Quran and for its completion",
                  ar: "أدعية صحيحة من القرآن الكريم وأدعية ختمه",
                  fr: "Invocations authentiques du Coran et pour sa complétion",
                  de: "Authentische Bittgebete aus dem Koran und für seinen Abschluss" },
  } as const;

  return (
    <div className="min-h-full pb-24" dir={dir}>
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-white/5 px-4 py-3">
        <Link href="/quran" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-sm mb-2 transition-colors">
          <ArrowLeft className="w-4 h-4" /> {t.back[lang]}
        </Link>
        <h1 className="text-xl font-bold text-foreground">{t.title[lang]}</h1>
        <p className="text-xs text-muted-foreground mt-0.5">{t.subtitle[lang]}</p>

        {/* Tabs */}
        <div className="flex gap-2 mt-3">
          {(["quranic", "completion"] as Tab[]).map(tabKey => (
            <button
              key={tabKey}
              onClick={() => setTab(tabKey)}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
                tab === tabKey
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {tabKey === "quranic" ? t.tabQ[lang] : t.tabC[lang]}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-3">
        {tab === "quranic" ? (
          QURANIC_DUAS.map(dua => {
            const open = expandedId === dua.id;
            return (
              <DuaCard key={dua.id}>
                {/* Reference badge */}
                <div className="px-4 pt-4 pb-2 flex items-center gap-2">
                  <Star className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="text-xs font-bold text-primary">{dua.referenceL[lang]}</span>
                </div>

                {/* Arabic text */}
                <div className="px-4 pb-3">
                  <p
                    className="font-quran text-2xl text-foreground leading-[2.2] text-right"
                    dir="rtl"
                    lang="ar"
                  >
                    {dua.arabic}
                  </p>
                </div>

                {/* Translation (always visible) */}
                <div className="px-4 pb-3 border-t border-white/5 pt-3">
                  <p className="text-sm text-foreground/90 leading-relaxed">{dua.translation[lang]}</p>
                </div>

                {/* Expand toggle */}
                <button
                  onClick={() => setExpandedId(open ? null : dua.id)}
                  className="w-full flex items-center justify-between px-4 py-3 text-xs text-muted-foreground hover:text-foreground border-t border-white/5 transition-colors"
                >
                  <span className="font-medium">{open ? "Less" : "Transliteration & Note"}</span>
                  {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {open && (
                  <div className="px-4 pb-4 space-y-3 border-t border-white/5 pt-3">
                    {/* Transliteration */}
                    <div>
                      <p className="text-xs text-primary font-semibold mb-1">{t.transliter[lang]}</p>
                      <p className="text-xs text-muted-foreground italic leading-relaxed">{dua.transliteration}</p>
                    </div>
                    {/* Note */}
                    <div>
                      <p className="text-xs text-primary font-semibold mb-1">{t.note[lang]}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{dua.description[lang]}</p>
                    </div>
                  </div>
                )}
              </DuaCard>
            );
          })
        ) : (
          COMPLETION_DUAS.map(dua => {
            const open = expandedId === dua.id;
            return (
              <DuaCard key={dua.id}>
                {/* Source badge */}
                <div className="px-4 pt-4 pb-2 flex items-start gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-primary leading-relaxed">{dua.source[lang]}</span>
                </div>

                {/* Arabic text */}
                <div className="px-4 pb-3">
                  <p
                    className="font-quran text-xl text-foreground leading-[2.2] text-right"
                    dir="rtl"
                    lang="ar"
                  >
                    {dua.arabic}
                  </p>
                </div>

                {/* Translation (always visible) */}
                <div className="px-4 pb-3 border-t border-white/5 pt-3">
                  <p className="text-sm text-foreground/90 leading-relaxed">{dua.translation[lang]}</p>
                </div>

                {/* Expand toggle */}
                <button
                  onClick={() => setExpandedId(open ? null : dua.id)}
                  className="w-full flex items-center justify-between px-4 py-3 text-xs text-muted-foreground hover:text-foreground border-t border-white/5 transition-colors"
                >
                  <span className="font-medium">{open ? "Less" : "Transliteration & Note"}</span>
                  {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {open && (
                  <div className="px-4 pb-4 space-y-3 border-t border-white/5 pt-3">
                    <div>
                      <p className="text-xs text-primary font-semibold mb-1">{t.transliter[lang]}</p>
                      <p className="text-xs text-muted-foreground italic leading-relaxed">{dua.transliteration}</p>
                    </div>
                    <div>
                      <p className="text-xs text-primary font-semibold mb-1">{t.note[lang]}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{dua.note[lang]}</p>
                    </div>
                  </div>
                )}
              </DuaCard>
            );
          })
        )}
      </div>
    </div>
  );
}
