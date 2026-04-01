import { useParams, Link } from "wouter";
import { useSurahDetail } from "@/hooks/use-external-api";
import { AudioPlayer } from "@/components/audio-player";
import { Loader2, ArrowLeft } from "lucide-react";

/** Convert western digits to Arabic-Indic numerals */
function toArabicNumeral(n: number): string {
  return n.toString().replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]);
}

export default function SurahDetail() {
  const params = useParams();
  const surahNumber = parseInt(params.id || "1", 10);
  const { data: surah, isLoading } = useSurahDetail(surahNumber);

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

        {/* ── Translations (numbered list) ── */}
        <div className="glass-card rounded-3xl p-6 md:p-8">
          <h3 className="text-lg font-bold text-foreground mb-6 pb-3 border-b border-border/50">
            Translation
          </h3>
          <div className="space-y-5">
            {surah.ayahs.map((ayah: any) => (
              <div key={ayah.number} className="flex gap-4">
                <span className="shrink-0 w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary text-sm font-bold">
                  {ayah.numberInSurah}
                </span>
                <p className="text-foreground leading-relaxed pt-1">{ayah.translation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
