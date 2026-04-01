import { useParams, Link } from "wouter";
import { useSurahDetail } from "@/hooks/use-external-api";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { saveProgress } from "@/hooks/use-reading-progress";
import { AudioPlayer } from "@/components/audio-player";
import { Loader2, ArrowLeft, Bookmark, BookmarkCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function toArabicNumeral(n: number): string {
  return n.toString().replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]);
}

interface AyahData {
  number: number;
  numberInSurah: number;
  text: string;
  translation: string;
}

export default function SurahDetail() {
  const params = useParams();
  const surahNumber = parseInt(params.id || "1", 10);
  const { data: surah, isLoading } = useSurahDetail(surahNumber);
  const { isBookmarked, toggleBookmark } = useBookmarks();

  // Which verse is selected — drives the bottom sheet
  const [sheetAyah, setSheetAyah] = useState<AyahData | null>(null);

  const translationRef = useRef<HTMLDivElement>(null);

  // Scroll to a specific ayah if ?ayah=N is in the URL (from bookmarks / continue reading)
  useEffect(() => {
    if (!surah) return;
    const target = new URLSearchParams(window.location.search).get("ayah");
    if (!target) return;
    const el = document.getElementById(`ayah-${target}`);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 300);
    }
  }, [surah]);

  // Reading progress — observe each verse as it enters the viewport
  useEffect(() => {
    if (!surah || !translationRef.current) return;

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
      { threshold: 0.5, rootMargin: "0px 0px -10% 0px" }
    );

    const els = translationRef.current.querySelectorAll("[id^='ayah-']");
    els.forEach(el => observer.observe(el));
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

  const sheetBookmarked = sheetAyah ? isBookmarked(surahNumber, sheetAyah.numberInSurah) : false;

  return (
    <div className="min-h-screen pb-24">
      <AudioPlayer surahNumber={surahNumber} surahName={surah.englishName} />

      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        <Link
          href="/quran"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
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
            {surah.ayahs.map((ayah: AyahData) => (
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

        {/* Translation section — tap a verse to open the bookmark sheet */}
        <div className="glass-card rounded-3xl p-6 md:p-8" ref={translationRef}>
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-border/50">
            <h3 className="text-lg font-bold text-foreground">Translation</h3>
            <span className="text-xs text-muted-foreground">Tap a verse to bookmark</span>
          </div>

          <div className="space-y-1">
            {surah.ayahs.map((ayah: AyahData) => {
              const bookmarked = isBookmarked(surahNumber, ayah.numberInSurah);
              return (
                <button
                  key={ayah.number}
                  id={`ayah-${ayah.numberInSurah}`}
                  type="button"
                  onClick={() => setSheetAyah(ayah)}
                  className={`w-full text-left flex gap-3 rounded-2xl p-3 transition-colors active:scale-[0.99] ${
                    bookmarked
                      ? "bg-primary/10 border border-primary/25"
                      : "hover:bg-white/5 active:bg-white/5"
                  }`}
                >
                  {/* Verse number circle — gold bookmark icon when saved */}
                  <div className="shrink-0 flex flex-col items-center gap-0.5 mt-0.5">
                    <span className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary text-sm font-bold">
                      {ayah.numberInSurah}
                    </span>
                    {bookmarked && (
                      <Bookmark className="w-3 h-3 text-primary fill-primary" />
                    )}
                  </div>
                  <p className="text-foreground leading-relaxed pt-1 flex-1 text-sm">{ayah.translation}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Bookmark bottom sheet ── */}
      {sheetAyah && (
        <>
          {/* Backdrop — tap to dismiss */}
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setSheetAyah(null)}
          />

          {/* Sheet */}
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-white/10 rounded-t-3xl shadow-2xl">
            {/* Handle bar */}
            <div className="flex justify-center pt-4 pb-2">
              <div className="w-10 h-1 bg-white/20 rounded-full" />
            </div>

            {/* Verse preview */}
            <div className="px-6 pt-2 pb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                  {sheetAyah.numberInSurah}
                </span>
                <span className="text-xs text-muted-foreground font-medium">{surah.englishName} · Verse {sheetAyah.numberInSurah}</span>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed line-clamp-2">{sheetAyah.translation}</p>
            </div>

            {/* Divider */}
            <div className="border-t border-white/5 mx-6" />

            {/* Actions */}
            <div className="p-4 space-y-2 pb-8">
              <button
                type="button"
                onClick={() => {
                  toggleBookmark({
                    surahNumber,
                    surahName: surah.name,
                    surahEnglishName: surah.englishName,
                    ayahNumber: sheetAyah.numberInSurah,
                    text: sheetAyah.text,
                    translation: sheetAyah.translation,
                  });
                  setSheetAyah(null);
                }}
                className="w-full flex items-center gap-3 p-4 rounded-2xl bg-primary/10 border border-primary/20 hover:bg-primary/15 active:bg-primary/20 transition-colors"
              >
                {sheetBookmarked ? (
                  <>
                    <BookmarkCheck className="w-5 h-5 text-primary fill-primary/30 shrink-0" />
                    <span className="text-sm font-semibold text-primary">Remove bookmark</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm font-semibold text-primary">Bookmark this verse</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setSheetAyah(null)}
                className="w-full p-4 rounded-2xl text-sm text-muted-foreground hover:bg-white/5 active:bg-white/5 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
