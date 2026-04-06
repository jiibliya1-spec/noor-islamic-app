import { useParams, Link } from "wouter";
import { useSurahDetail, useTafsir, useWordMeanings } from "@/hooks/use-external-api";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { saveProgress, loadProgress } from "@/hooks/use-reading-progress";
import { AudioPlayer } from "@/components/audio-player";
import { useI18n } from "@/lib/i18n";
import {
  Loader2, ArrowLeft, Bookmark, BookmarkCheck,
  BookOpen, AlignLeft, ChevronLeft, ChevronRight, Save, CheckCircle2, BookmarkPlus, Eye, EyeOff,
} from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

type SheetView = "menu" | "tafsir" | "words";

const AYAHS_PER_PAGE = 15;

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

// Strip the Bismillah prefix from the first ayah of surahs (except Al-Fatiha=1 and At-Tawbah=9)
function stripBismillah(text: string): string {
  return text
    .replace(/^بِسْمِ\s+ٱللَّهِ\s+ٱلرَّحْمَٰنِ\s+ٱلرَّحِيمِ\s*/u, "")
    .replace(/^بِسْمِ\s+اللَّهِ\s+الرَّحْمَٰنِ\s+الرَّحِيمِ\s*/u, "")
    .replace(/^بِسۡمِ\s+ٱللَّهِ\s+ٱلرَّحۡمَٰنِ\s+ٱلرَّحِيمِ\s*/u, "")
    .trim();
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

const TAFSIR_SOURCE: Record<string, string> = {
  ar: "التفسير الميسر — وزارة الشؤون الإسلامية السعودية",
  en: "Tafhim al-Quran — Sayyid Abul Ala Maududi",
  fr: "Tafhim al-Quran — Sayyid Abul Ala Maududi",
  de: "Tafhim al-Quran — Sayyid Abul Ala Maududi",
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
  const [currentPage, setCurrentPage] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

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

  useEffect(() => {
    setCurrentPage(0);
    setShowTranslation(false);
  }, [surahNumber]);

  useEffect(() => {
    if (!surah) return;
    const target = new URLSearchParams(window.location.search).get("ayah");
    if (!target) return;
    const targetNum = parseInt(target, 10);
    if (!isNaN(targetNum)) {
      const pageIndex = Math.floor((targetNum - 1) / AYAHS_PER_PAGE);
      setCurrentPage(pageIndex);
    }
  }, [surah]);

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
  }, [surah, surahNumber, currentAyah]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><Loader2 className="w-12 h-12 text-primary animate-spin" /></div>;
  }

  if (!surah) return <div className="p-8 text-center text-red-500">Surah not found.</div>;

  const processedAyahs: AyahData[] = surah.ayahs.map((ayah: AyahData) => {
    if (ayah.numberInSurah === 1 && surahNumber !== 1 && surahNumber !== 9) {
      return { ...ayah, text: stripBismillah(ayah.text) };
    }
    return ayah;
  });

  const pages = chunkArray(processedAyahs, AYAHS_PER_PAGE);
  const totalPages = pages.length;
  const pageAyahs = pages[currentPage] ?? [];

  const goNext = () => {
    if (currentPage < totalPages - 1) {
      const nextPageFirstAyah = pages[currentPage + 1]?.[0];
      setCurrentPage(p => p + 1);
      if (nextPageFirstAyah && surah) {
        setCurrentAyah(nextPageFirstAyah.numberInSurah);
        saveProgress({ surahNumber, surahName: surah.name, surahEnglishName: surah.englishName, ayahNumber: nextPageFirstAyah.numberInSurah });
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goPrev = () => {
    if (currentPage > 0) {
      const prevPageFirstAyah = pages[currentPage - 1]?.[0];
      setCurrentPage(p => p - 1);
      if (prevPageFirstAyah && surah) {
        setCurrentAyah(prevPageFirstAyah.numberInSurah);
        saveProgress({ surahNumber, surahName: surah.name, surahEnglishName: surah.englishName, ayahNumber: prevPageFirstAyah.numberInSurah });
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 55) {
      if (dx < 0) goNext();
      else goPrev();
    }
  };

  const sheetBookmarked = sheetAyah ? isBookmarked(surahNumber, sheetAyah.numberInSurah) : false;
  const isRtl = language === "ar";
  const firstAyahNum = pageAyahs[0]?.numberInSurah ?? 1;
  const lastAyahNum = pageAyahs[pageAyahs.length - 1]?.numberInSurah ?? 1;

  return (
    <div className="min-h-screen pb-28">
      <AudioPlayer surahNumber={surahNumber} surahName={surah.englishName} />

      {/* Save Progress bar */}
      <div className="sticky top-[57px] z-30 w-full bg-background/90 backdrop-blur-md border-b border-white/5 px-4 py-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground min-w-0">
          <span className="truncate font-medium text-foreground/80">
            {isRtl ? surah.name : surah.englishName}
          </span>
          <span className="text-muted-foreground shrink-0">
            · {isRtl ? "آيات" : "verses"} {firstAyahNum}–{lastAyahNum}
          </span>
        </div>
        <button
          onClick={handleSaveProgress}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
            saveFlash
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              : "bg-primary/15 text-primary border border-primary/25 hover:bg-primary/25"
          }`}
        >
          {saveFlash
            ? <><CheckCircle2 className="w-3.5 h-3.5" />{t("saved")}</>
            : <><Save className="w-3.5 h-3.5" />{t("saveProgress")}</>
          }
        </button>
      </div>

      <div className="p-4 md:p-8 max-w-4xl mx-auto">