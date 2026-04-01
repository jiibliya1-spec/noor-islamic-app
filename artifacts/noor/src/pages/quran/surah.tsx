import { useParams, Link } from "wouter";
import { useSurahDetail } from "@/hooks/use-external-api";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { AudioPlayer } from "@/components/audio-player";
import { Loader2, ArrowLeft, Bookmark, BookmarkCheck } from "lucide-react";
import { useEffect } from "react";

/** Convert western digits to Arabic-Indic numerals */
function toArabicNumeral(n: number): string {
  return n.toString().replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]);
}

export default function SurahDetail() {
  const params = useParams();
  const surahNumber = parseInt(params.id || "1", 10);
  const { data: surah, isLoading } = useSurahDetail(surahNumber);
  const { isBookmarked, toggleBookmark } = useBookmarks();

  // Scroll to a specific ayah if ?ayah=N is in the URL
  useEffect(() => {
    if (!surah) return;
    const target = new URLSearchParams(window.location.search).get("ayah");
    if (!target) return;
    const el = document.getElementById(`ayah-${target}`);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 150);
    }
  }, [surah]);

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
      {/* Sticky audio player at very top */}
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

        {/* ── Mushaf-style flowing Arabic text ── */}
        <div className="glass-card rounded-3xl p-6 md:p-10 mb-8">
          <p
            className="font-quran leading-[2.6] text-right text-foreground text-3xl md:text-4xl"
            dir="rtl"
            lang="ar"
          >
            {surah.ayahs.map((ayah: any) => (
              <span key={ayah.number}>
                {ayah.text}
                {/* Verse number marker in Arabic-Indic numerals */}
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

        {/* ── Translations with Bookmarks ── */}
        <div className="glass-card rounded-3xl p-6 md:p-8">
          <h3 className="text-lg font-bold text-foreground mb-6 pb-3 border-b border-border/50 flex items-center gap-2">
            Translation
            <span className="text-xs text-muted-foreground font-normal ml-auto">Tap verse to bookmark</span>
          </h3>
          <div className="space-y-3">
            {surah.ayahs.map((ayah: any) => {
              const bookmarked = isBookmarked(surahNumber, ayah.numberInSurah);
              return (
                <div
                  key={ayah.number}
                  id={`ayah-${ayah.numberInSurah}`}
                  className={`flex gap-3 rounded-2xl p-3 transition-colors group ${
                    bookmarked ? "bg-primary/8 border border-primary/20" : "hover:bg-white/5"
                  }`}
                >
                  <span className="shrink-0 w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary text-sm font-bold mt-0.5">
                    {ayah.numberInSurah}
                  </span>
                  <p className="text-foreground leading-relaxed pt-1 flex-1">{ayah.translation}</p>
                  <button
                    onClick={() =>
                      toggleBookmark({
                        surahNumber,
                        surahName: surah.name,
                        surahEnglishName: surah.englishName,
                        ayahNumber: ayah.numberInSurah,
                        text: ayah.text,
                        translation: ayah.translation,
                      })
                    }
                    className={`shrink-0 p-1.5 rounded-xl transition-all mt-0.5 ${
                      bookmarked
                        ? "text-primary"
                        : "text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-primary"
                    }`}
                    title={bookmarked ? "Remove bookmark" : "Bookmark this verse"}
                    aria-label={bookmarked ? "Remove bookmark" : "Bookmark verse"}
                  >
                    {bookmarked ? (
                      <BookmarkCheck className="w-5 h-5 fill-primary/20" />
                    ) : (
                      <Bookmark className="w-5 h-5" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
