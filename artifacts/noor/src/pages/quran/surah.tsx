import { useParams, Link } from "wouter";
import { useSurahDetail } from "@/hooks/use-external-api";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { saveProgress } from "@/hooks/use-reading-progress";
import { AudioPlayer } from "@/components/audio-player";
import { Loader2, ArrowLeft, Bookmark, BookmarkCheck, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/** Convert western digits to Arabic-Indic numerals */
function toArabicNumeral(n: number): string {
  return n.toString().replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]);
}

export default function SurahDetail() {
  const params = useParams();
  const surahNumber = parseInt(params.id || "1", 10);
  const { data: surah, isLoading } = useSurahDetail(surahNumber);
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [selectedAyah, setSelectedAyah] = useState<number | null>(null);
  const translationRef = useRef<HTMLDivElement>(null);

  // Close popup when clicking outside the translation section
  useEffect(() => {
    if (selectedAyah === null) return;
    const close = () => setSelectedAyah(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [selectedAyah]);

  // Scroll to a specific ayah if ?ayah=N is in the URL
  useEffect(() => {
    if (!surah) return;
    const target = new URLSearchParams(window.location.search).get("ayah");
    if (!target) return;
    const el = document.getElementById(`ayah-${target}`);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 200);
    }
  }, [surah]);

  // Track reading progress — save the last ayah that enters the viewport
  useEffect(() => {
    if (!surah) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const n = parseInt(entry.target.id.replace("ayah-", ""), 10);
            if (!isNaN(n)) {
              saveProgress({
                surahNumber,
                surahName: surah.name,
                surahEnglishName: surah.englishName,
                ayahNumber: n,
              });
            }
          }
        }
      },
      { threshold: 0.4 }
    );
    const els = translationRef.current?.querySelectorAll("[id^='ayah-']");
    els?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [surah, surahNumber]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!surah) return <div className="p-8 text-center text-red-500">Surah not found</div>;

  return (
    <div className="min-h-screen pb-24">
      <AudioPlayer surahNumber={surahNumber} surahName={surah.englishName} />

      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        <Link href="/quran" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Surahs
        </Link>

        {/* Header */}
        <div className="text-center mb-10 glass-card rounded-3xl p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10" />
          <div className="relative z-10">
            <h1 className="text-5xl font-bold font-quran text-primary mb-4 leading-relaxed">{surah.name}</h1>
            <h2 className="text-2xl font-semibold text-foreground">{surah.englishName}</h2>
            <p className="text-muted-foreground mt-2">
              {surah.englishNameTranslation} • {surah.revelationType} • {surah.numberOfAyahs} Ayahs
            </p>
          </div>
        </div>

        {/* Bismillah */}
        {surahNumber !== 1 && surahNumber !== 9 && (
          <div className="text-center py-8 mb-6">
            <p className="text-4xl font-quran text-foreground leading-loose">
              بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </p>
          </div>
        )}

        {/* Mushaf-style flowing Arabic text */}
        <div className="glass-card rounded-3xl p-6 md:p-10 mb-8">
          <p
            className="font-quran leading-[2.6] text-right text-foreground text-3xl md:text-4xl"
            dir="rtl"
            lang="ar"
          >
            {surah.ayahs.map((ayah: any) => (
              <span key={ayah.number}>
                {ayah.text}
                <span
                  className="inline-flex items-center justify-center mx-2 text-primary"
                  style={{ fontFamily: "'Amiri', serif", fontSize: "0.8em", verticalAlign: "middle" }}
                  aria-label={`Verse ${ayah.numberInSurah}`}
                >
                  ﴿{toArabicNumeral(ayah.numberInSurah)}﴾
                </span>
                {" "}
              </span>
            ))}
          </p>
        </div>

        {/* Translations — tap a verse to bookmark */}
        <div className="glass-card rounded-3xl p-6 md:p-8" ref={translationRef}>
          <h3 className="text-lg font-bold text-foreground mb-1 pb-3 border-b border-border/50">
            Translation
          </h3>
          <p className="text-xs text-muted-foreground mb-5 pt-1">Tap any verse to bookmark it</p>

          <div className="space-y-1">
            {surah.ayahs.map((ayah: any) => {
              const bookmarked = isBookmarked(surahNumber, ayah.numberInSurah);
              const popupOpen = selectedAyah === ayah.numberInSurah;

              return (
                <div key={ayah.number} id={`ayah-${ayah.numberInSurah}`}>
                  {/* Verse row — tappable */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedAyah(prev => prev === ayah.numberInSurah ? null : ayah.numberInSurah);
                    }}
                    className={`flex gap-3 rounded-2xl p-3 transition-colors cursor-pointer select-none ${
                      bookmarked
                        ? "bg-primary/8 border border-primary/20"
                        : popupOpen
                        ? "bg-white/5 border border-white/10"
                        : "hover:bg-white/5"
                    }`}
                  >
                    {/* Verse number + bookmark indicator */}
                    <div className="shrink-0 flex items-start gap-1 mt-0.5">
                      {bookmarked && (
                        <Bookmark className="w-3 h-3 text-primary fill-primary mt-2 shrink-0" />
                      )}
                      <span className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary text-sm font-bold shrink-0">
                        {ayah.numberInSurah}
                      </span>
                    </div>
                    <p className="text-foreground leading-relaxed pt-1 flex-1">{ayah.translation}</p>
                  </div>

                  {/* Inline popup — appears below the tapped verse */}
                  {popupOpen && (
                    <div
                      onClick={e => e.stopPropagation()}
                      className="mx-3 mb-2 flex items-center gap-2 bg-card border border-primary/20 rounded-xl px-3 py-2 shadow-lg"
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark({
                            surahNumber,
                            surahName: surah.name,
                            surahEnglishName: surah.englishName,
                            ayahNumber: ayah.numberInSurah,
                            text: ayah.text,
                            translation: ayah.translation,
                          });
                          setSelectedAyah(null);
                        }}
                        className="flex-1 flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors py-1"
                      >
                        {bookmarked ? (
                          <>
                            <BookmarkCheck className="w-4 h-4 fill-primary/20" />
                            Remove bookmark
                          </>
                        ) : (
                          <>
                            <Bookmark className="w-4 h-4" />
                            Bookmark this verse
                          </>
                        )}
                      </button>
                      <div className="w-px h-5 bg-border/60 shrink-0" />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAyah(null);
                        }}
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors py-1 px-1"
                      >
                        <X className="w-3.5 h-3.5" />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
