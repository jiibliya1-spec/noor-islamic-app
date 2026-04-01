import { useParams, Link } from "wouter";
import { useSurahDetail } from "@/hooks/use-external-api";
import { AudioPlayer } from "@/components/audio-player";
import { Loader2, ArrowLeft } from "lucide-react";

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

        <div className="text-center mb-12 glass-card rounded-3xl p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10"></div>
          <div className="relative z-10">
            <h1 className="text-5xl font-bold font-quran text-primary mb-4 leading-relaxed">{surah.name}</h1>
            <h2 className="text-2xl font-semibold text-foreground">{surah.englishName}</h2>
            <p className="text-muted-foreground mt-2">{surah.englishNameTranslation} • {surah.revelationType} • {surah.numberOfAyahs} Ayahs</p>
          </div>
        </div>

        {surahNumber !== 1 && surahNumber !== 9 && (
          <div className="text-center py-8 mb-8">
            <h3 className="text-4xl font-quran text-foreground leading-loose">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</h3>
          </div>
        )}

        <div className="space-y-10">
          {surah.ayahs.map((ayah: any) => (
            <div key={ayah.number} className="glass-card rounded-2xl p-6 md:p-8">
              <div className="flex justify-between items-start gap-6 mb-6">
                <div className="w-10 h-10 shrink-0 bg-background border border-primary/20 rounded-full flex items-center justify-center font-mono text-sm font-bold text-primary">
                  {ayah.numberInSurah}
                </div>
                <p className="text-3xl md:text-4xl leading-loose font-quran text-right text-foreground" dir="rtl">
                  {ayah.text}
                </p>
              </div>
              <div className="border-t border-white/5 pt-4">
                <p className="text-lg text-muted-foreground leading-relaxed">{ayah.translation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
