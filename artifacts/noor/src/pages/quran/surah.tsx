import { useParams, Link } from "wouter";
import { useSurahDetail, useTafsir, useWordMeanings } from "@/hooks/use-external-api";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { saveProgress, loadProgress } from "@/hooks/use-reading-progress";
import { AudioPlayer } from "@/components/audio-player";
import { useI18n } from "@/lib/i18n";
import {
  Loader2, ArrowLeft, Bookmark, BookmarkCheck,
  BookOpen, AlignLeft, ChevronLeft, Save, CheckCircle2, BookmarkPlus,
} from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

type SheetView = "menu" | "tafsir" | "words";

function toArabicNumeral(n: number): string {
  return n.toString().replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]);
}

interface AyahData {
  number: number;
  numberInSurah: number;
  text: string;
  translation: string;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

const TAFSIR_SOURCE: Record<string, string> = {
  ar: "التفسير الميسر — وزارة الشؤون الإسلامية السعودية",
  en: "Tafhim al-Quran — Maududi",
  fr: "Tafhim al-Quran — Maududi",
  de: "Tafhim al-Quran — Maududi",
};

export default function SurahDetail() {
  const params = useParams();
  const surahNumber = parseInt(params.id || "1", 10);
  const { data: surah, isLoading } = useSurahDetail(surahNumber);
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { language, t } = useI18n();

  const [sheetAyah, setSheetAyah] = useState<AyahData | null>(null);
  const [sheetView, setSheetView] = useState<SheetView>("menu");
  const [currentAyah, setCurrentAyah] = useState(1);
  const [saveFlash, setSaveFlash] = useState(false);

  // NEW
  const [showTranslation, setShowTranslation] = useState(false);
  const [page, setPage] = useState(0);
  const ayahsPerPage = 10;

  const translationRef = useRef<HTMLDivElement>(null);

  const { data: tafsirText, isLoading: tafsirLoading, isError: tafsirError } = useTafsir(
    surahNumber,
    sheetAyah?.numberInSurah ?? 0,
    language,
    sheetView === "tafsir" && sheetAyah !== null
  );

  const { data: wordData, isLoading: wordsLoading, isError: wordsError } = useWordMeanings(
    surahNumber,
    sheetAyah?.numberInSurah ?? 0,
    sheetView === "words" && sheetAyah !== null
  );

  const openSheet = (ayah: AyahData) => { setSheetAyah(ayah); setSheetView("menu"); };
  const closeSheet = () => { setSheetAyah(null); setSheetView("menu"); };

  const isRtl = language === "ar";
  const hasBismillah = surahNumber !== 1 && surahNumber !== 9;

  // PAGINATION
  const pages: AyahData[][] = [];
  if (surah) {
    for (let i = 0; i < surah.ayahs.length; i += ayahsPerPage) {
      pages.push(surah.ayahs.slice(i, i + ayahsPerPage));
    }
  }

  const handleNext = () => {
    if (page < pages.length - 1) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };

  useEffect(() => {
    if (!surah) return;
    const existing = loadProgress();
    if (!existing || existing.surahNumber !== surahNumber) {
      saveProgress({ surahNumber, surahName: surah.name, surahEnglishName: surah.englishName, ayahNumber: 1 });
    }
  }, [surah, surahNumber]);

  const handleSaveProgress = useCallback(() => {
    if (!surah) return;
    saveProgress({ surahNumber, surahName: surah.name, surahEnglishName: surah.englishName, ayahNumber: currentAyah });
    setSaveFlash(true);
    setTimeout(() => setSaveFlash(false), 2000);
  }, [surah, currentAyah]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><Loader2 className="w-12 h-12 animate-spin" /></div>;
  }

  if (!surah) return <div className="p-8 text-center text-red-500">Surah not found.</div>;

  const sheetBookmarked = sheetAyah ? isBookmarked(surahNumber, sheetAyah.numberInSurah) : false;

  return (
    <div className="min-h-screen pb-28">
      <AudioPlayer surahNumber={surahNumber} surahName={surah.englishName} />

      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        <Link href="/quran" className="inline-flex items-center gap-2 mb-6">
          <ArrowLeft className="w-5 h-5" />
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-quran">{surah.name}</h1>
          <h2>{surah.englishName}</h2>
        </div>

        {hasBismillah && (
          <div className="text-center mb-6 font-quran text-2xl">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </div>
        )}

        {/* Quran */}
        <div className="p-6 rounded-2xl bg-white/5">
          <div className="font-quran text-3xl leading-[2.6] text-right" dir="rtl">
            {pages[page]?.map((ayah: AyahData) => (
              <span key={ayah.number}>
                {ayah.text}
                <span className="mx-2 text-primary">
                  ﴿{toArabicNumeral(ayah.numberInSurah)}﴾
                </span>
              </span>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <button onClick={handlePrev} className="px-4 py-2 bg-white/10 rounded-xl">
              {isRtl ? "السابق" : "Previous"}
            </button>
            <button onClick={handleNext} className="px-4 py-2 bg-white/10 rounded-xl">
              {isRtl ? "التالي" : "Next"}
            </button>
          </div>
        </div>

        {/* Translation */}
        <div className="mt-6">
          <div className="flex justify-between mb-3">
            <h3>{isRtl ? "الترجمة" : "Translation"}</h3>
            <button onClick={() => setShowTranslation(!showTranslation)}>
              {showTranslation ? "Hide" : "Show"}
            </button>
          </div>

          {showTranslation && pages[page]?.map((ayah: AyahData) => {
            const bookmarked = isBookmarked(surahNumber, ayah.numberInSurah);

            return (
              <div key={ayah.number} className="flex gap-2 p-2 border rounded">
                <span>{ayah.numberInSurah}</span>
                <p className="flex-1">{ayah.translation}</p>
                <button onClick={() => toggleBookmark({
                  surahNumber,
                  surahName: surah.name,
                  surahEnglishName: surah.englishName,
                  ayahNumber: ayah.numberInSurah,
                  text: ayah.text,
                  translation: ayah.translation,
                })}>
                  {bookmarked ? <BookmarkCheck /> : <BookmarkPlus />}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Sheet بقى كيف كان */}
    </div>
  );
}