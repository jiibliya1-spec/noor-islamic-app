import { useState } from "react";
import { Link } from "wouter";
import { useSurahList } from "@/hooks/use-external-api";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { loadProgress, clearProgress } from "@/hooks/use-reading-progress";
import type { ReadingProgress } from "@/hooks/use-reading-progress";
import { Search, Loader2, Bookmark, BookmarkCheck, Trash2, ChevronDown, ChevronUp, BookOpen, ChevronRight, X, Star } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function QuranList() {
  const { data: surahs, isLoading } = useSurahList();
  const [search, setSearch] = useState("");
  const { language } = useI18n();
  const { bookmarks, removeBookmark } = useBookmarks();
  const [bookmarksExpanded, setBookmarksExpanded] = useState(true);
  const [progress, setProgress] = useState<ReadingProgress | null>(() => loadProgress());

  const filteredSurahs = surahs?.filter(s =>
    s.englishName.toLowerCase().includes(search.toLowerCase()) ||
    s.name.includes(search) ||
    s.englishNameTranslation.toLowerCase().includes(search.toLowerCase()) ||
    String(s.number).includes(search)
  );

  const dir = language === "ar" ? "rtl" : "ltr";
  const sortedBookmarks = [...bookmarks].sort((a, b) => b.savedAt - a.savedAt);

  type Lang = "en" | "ar" | "fr" | "de";
  const lang = (["en", "ar", "fr", "de"].includes(language) ? language : "en") as Lang;

  const t = {
    quran:           { en: "The Holy Quran",                   ar: "القرآن الكريم",         fr: "Le Saint Coran",               de: "Der Heilige Koran" },
    continueReading: { en: "Continue reading",                 ar: "متابعة القراءة",         fr: "Continuer la lecture",         de: "Weiterlesen" },
    verse:           { en: "Verse",                            ar: "الآية",                  fr: "Verset",                       de: "Vers" },
    myBookmarks:     { en: "My Bookmarks",                     ar: "إشاراتي",               fr: "Mes signets",                  de: "Lesezeichen" },
    noBookmarks:     { en: "No bookmarks yet — tap any verse", ar: "لا توجد إشارات بعد",   fr: "Aucun signet — appuyez sur un verset", de: "Noch keine Lesezeichen" },
    search:          { en: "Search surah name...",             ar: "ابحث عن سورة...",       fr: "Rechercher une sourate...",    de: "Sure suchen..." },
    duasTitle:       { en: "Quranic Duas & Completion Duas",   ar: "أدعية من القرآن وأدعية الختم", fr: "Duas Coraniques & Complétion", de: "Koranische Duas & Abschluss" },
    duasDesc:        { en: "12 Quranic duas · 6 Khatm duas",   ar: "١٢ دعاء قرآني · ٦ أدعية خت", fr: "12 duas coraniques · 6 duas de clôture", de: "12 Koranische Duas · 6 Khatm Duas" },
  } as const;

  return (
    <div className="min-h-full" dir={dir}>
      {/* Sticky search header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-white/5 px-4 py-3">
        <h1 className="text-xl font-bold text-foreground mb-2">{t.quran[lang]}</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="search"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-card border border-white/10 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary"
            placeholder={t.search[lang]}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="p-4">
        {/* ── Continue Reading banner ── */}
        {progress && (
          <div className="mb-4 glass-card rounded-2xl overflow-hidden flex items-stretch border border-primary/20">
            <Link
              href={`/quran/${progress.surahNumber}?ayah=${progress.ayahNumber}`}
              className="flex items-center gap-3 p-4 flex-1 min-w-0 cursor-pointer active:bg-white/5 transition-colors"
            >
              <div className="w-10 h-10 bg-primary/15 rounded-full flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-0.5">
                  {t.continueReading[lang]}
                </p>
                <p className="font-bold text-sm text-foreground truncate">
                  {progress.surahEnglishName}
                  <span className="font-normal text-muted-foreground ml-2 text-xs">
                    {t.verse[lang]} {progress.ayahNumber}
                  </span>
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
            </Link>
            <button
              onClick={() => { clearProgress(); setProgress(null); }}
              className="px-3 border-l border-white/5 text-muted-foreground hover:text-foreground transition-colors"
              title="Dismiss"
              aria-label="Dismiss reading progress"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ── Duas entry card ── */}
        <Link
          href="/quran/duas"
          className="mb-5 glass-card rounded-2xl p-4 flex items-center gap-4 border border-primary/15 hover:border-primary/30 active:scale-[0.98] transition-all cursor-pointer"
        >
          <div className="w-11 h-11 bg-primary/15 rounded-xl flex items-center justify-center shrink-0">
            <Star className="w-5 h-5 text-primary fill-primary/30" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm text-foreground">{t.duasTitle[lang]}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{t.duasDesc[lang]}</p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
        </Link>

        {/* ── My Bookmarks section ── */}
        <div className="mb-5">
          <button
            onClick={() => setBookmarksExpanded(v => !v)}
            className="w-full flex items-center justify-between py-2 px-1 text-sm font-bold text-primary uppercase tracking-wider"
          >
            <span className="flex items-center gap-2">
              <Bookmark className="w-4 h-4" />
              {t.myBookmarks[lang]}
              {bookmarks.length > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-primary/15 text-primary rounded-full text-xs font-bold">
                  {bookmarks.length}
                </span>
              )}
            </span>
            {bookmarksExpanded
              ? <ChevronUp className="w-4 h-4 text-muted-foreground" />
              : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </button>

          {bookmarksExpanded && (
            <div className="mt-2 space-y-2">
              {sortedBookmarks.length === 0 ? (
                <p className="text-xs text-muted-foreground px-2 py-3">{t.noBookmarks[lang]}</p>
              ) : (
                sortedBookmarks.map(b => (
                  <div key={b.id} className="glass-card rounded-xl overflow-hidden flex items-stretch">
                    <Link
                      href={`/quran/${b.surahNumber}?ayah=${b.ayahNumber}`}
                      className="flex items-start gap-3 p-3 flex-1 min-w-0 active:bg-white/5 transition-colors cursor-pointer"
                    >
                      <div className="shrink-0 w-9 h-9 bg-primary/15 rounded-full flex items-center justify-center text-primary text-xs font-bold">
                        {b.surahNumber}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-semibold text-sm text-foreground">{b.surahEnglishName}</span>
                          <span className="shrink-0 text-xs text-muted-foreground">
                            {t.verse[lang]} {b.ayahNumber}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate leading-relaxed">{b.translation}</p>
                      </div>
                      <BookmarkCheck className="w-4 h-4 text-primary shrink-0 mt-0.5 fill-primary/20" />
                    </Link>
                    <button
                      onClick={() => removeBookmark(b.surahNumber, b.ayahNumber)}
                      className="px-3 border-l border-white/5 text-muted-foreground hover:text-red-400 transition-colors"
                      title="Remove bookmark"
                      aria-label="Remove bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* ── Surah list ── */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : (
          <div className="space-y-2">
            {filteredSurahs?.map(surah => (
              <Link
                key={surah.number}
                href={`/quran/${surah.number}`}
                className="glass-card rounded-2xl p-4 flex items-center justify-between active:scale-[0.98] transition-transform cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center font-mono font-bold text-primary text-sm shrink-0">
                    {surah.number}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm">{surah.englishName}</h3>
                    <p className="text-xs text-muted-foreground">{surah.englishNameTranslation} · {surah.numberOfAyahs} ayahs</p>
                  </div>
                </div>
                <span className="font-quran text-xl text-primary shrink-0 ml-2">{surah.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
