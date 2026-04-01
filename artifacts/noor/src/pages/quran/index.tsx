import { useState } from "react";
import { Link } from "wouter";
import { useSurahList } from "@/hooks/use-external-api";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { Search, Loader2, Bookmark, BookmarkCheck, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function QuranList() {
  const { data: surahs, isLoading } = useSurahList();
  const [search, setSearch] = useState("");
  const { language } = useI18n();
  const { bookmarks, removeBookmark } = useBookmarks();
  const [bookmarksExpanded, setBookmarksExpanded] = useState(true);

  const filteredSurahs = surahs?.filter(s =>
    s.englishName.toLowerCase().includes(search.toLowerCase()) ||
    s.name.includes(search) ||
    s.englishNameTranslation.toLowerCase().includes(search.toLowerCase()) ||
    String(s.number).includes(search)
  );

  const dir = language === "ar" ? "rtl" : "ltr";
  const sortedBookmarks = [...bookmarks].sort((a, b) => b.savedAt - a.savedAt);

  const labels = {
    myBookmarks: { en: "My Bookmarks", ar: "إشاراتي", fr: "Mes signets", de: "Meine Lesezeichen" },
    noBookmarks: { en: "No bookmarks yet — tap the bookmark icon on any verse", ar: "لا توجد إشارات بعد", fr: "Aucun signet — appuyez sur l'icône de signet", de: "Noch keine Lesezeichen" },
    verse: { en: "Verse", ar: "الآية", fr: "Verset", de: "Vers" },
    search: { en: "Search surah name...", ar: "ابحث عن سورة...", fr: "Rechercher une sourate...", de: "Sure suchen..." },
    quran: { en: "The Holy Quran", ar: "القرآن الكريم", fr: "Le Saint Coran", de: "Der Heilige Koran" },
  } as const;
  type Lang = "en" | "ar" | "fr" | "de";
  const lang = (language as Lang) in labels.myBookmarks ? (language as Lang) : "en";

  return (
    <div className="min-h-full" dir={dir}>
      {/* Sticky search header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-white/5 px-4 py-3">
        <h1 className="text-xl font-bold text-foreground mb-2">{labels.quran[lang]}</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="search"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-card border border-white/10 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary"
            placeholder={labels.search[lang]}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="p-4">
        {/* ── My Bookmarks section ── */}
        <div className="mb-5">
          <button
            onClick={() => setBookmarksExpanded(v => !v)}
            className="w-full flex items-center justify-between py-2 px-1 text-sm font-bold text-primary uppercase tracking-wider"
          >
            <span className="flex items-center gap-2">
              <Bookmark className="w-4 h-4" />
              {labels.myBookmarks[lang]}
              {bookmarks.length > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-primary/15 text-primary rounded-full text-xs font-bold">
                  {bookmarks.length}
                </span>
              )}
            </span>
            {bookmarksExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </button>

          {bookmarksExpanded && (
            <div className="mt-2 space-y-2">
              {sortedBookmarks.length === 0 ? (
                <p className="text-xs text-muted-foreground px-2 py-3">{labels.noBookmarks[lang]}</p>
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
                            {labels.verse[lang]} {b.ayahNumber}
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
