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

function stripBismillah(text: string): string {
  const normalize = (s: string) =>
    s.replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED\u06E1\u0671]/g, "")
     .replace(/\s+/g, " ").trim();

  const normalized = normalize(text);
  const target = "\u0627\u0644\u0631\u062D\u064A\u0645";
  const idx = normalized.indexOf(target);
  if (idx === -1) return text;

  let origPos = 0;
  let normCount = 0;
  const endNorm = idx + target.length;
  while (origPos < text.length && normCount < endNorm) {
    const c = text[origPos];
    const skip = /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED\u06E1\u0671]/.test(c);
    if (!skip) normCount++;
    origPos++;
  }
  while (origPos < text.length && /[\s\n]/.test(text[origPos])) origPos++;
  return text.slice(origPos).trim() || text;
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

  const translationRef = useRef<HTMLDivElement>(null);

  // ✅ swipe (إضافة فقط)
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const distance = touchStartX.current - touchEndX.current;

    if (Math.abs(distance) < 50) return;

    if (distance > 0) {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    } else {
      window.scrollBy({ top: -window.innerHeight, behavior: "smooth" });
    }
  };

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
    if (!surah) return;
    const target = new URLSearchParams(window.location.search).get("ayah");
    if (!target) return;
    const el = document.getElementById(`ayah-${target}`);
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 350);
  }, [surah]);

  useEffect(() => {
    if (!surah) return;
    const existing = loadProgress();
    if (!existing || existing.surahNumber !== surahNumber) {
      saveProgress({ surahNumber, surahName: surah.name, surahEnglishName: surah.englishName, ayahNumber: 1 });
    }
  }, [surah, surahNumber]);

  useEffect(() => {
    if (!surah || !translationRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const n = parseInt(entry.target.id.replace("ayah-", ""), 10);
            if (!isNaN(n)) {
              setCurrentAyah(n);
              saveProgress({ surahNumber, surahName: surah.name, surahEnglishName: surah.englishName, ayahNumber: n });
            }
          }
        }
      },
      { threshold: 0.5 }
    );
    const els = translationRef.current.querySelectorAll("[id^='ayah-']");
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
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

  const sheetBookmarked = sheetAyah ? isBookmarked(surahNumber, sheetAyah.numberInSurah) : false;
  const isRtl = language === "ar";
  const hasBismillah = surahNumber !== 1 && surahNumber !== 9;

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
            · {t("verse")} {currentAyah}
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
        <Link href="/quran" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" /> {isRtl ? "العودة إلى السور" : "Back to Surahs"}
        </Link>

        {/* Header card */}
        <div className="text-center mb-10 glass-card rounded-3xl p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10" />
          <div className="relative z-10">
            <h1 className="text-5xl font-bold font-quran text-primary mb-4 leading-relaxed">{surah.name}</h1>
            <h2 className="text-2xl font-semibold text-foreground">{surah.englishName}</h2>
            <p className="text-muted-foreground mt-2">
              {surah.englishNameTranslation} · {surah.revelationType} · {surah.numberOfAyahs} {isRtl ? "آية" : "verses"}
            </p>
          </div>
        </div>

        {/* Bismillah */}
        {hasBismillah && (
          <div className="text-center mb-8">
            <p className="font-quran text-primary text-2xl">
              بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </p>
          </div>
        )}

        {/* Mushaf */}
        <div
          className="glass-card rounded-3xl p-6 md:p-10 mb-8"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <p className="font-quran leading-[2.6] text-right text-foreground text-3xl md:text-4xl" dir="rtl">
            {surah.ayahs.map((ayah: AyahData) => {

              const verseText =
                hasBismillah && ayah.numberInSurah === 1
                  ? ayah.text.replace(/^بِسْمِ.*?ٱلرَّحِيمِ\s*/, "")
                  : ayah.text;

              return (
                <span key={ayah.number}>
                  {verseText}
                  <span className="mx-2 text-primary">
                    ﴿{toArabicNumeral(ayah.numberInSurah)}﴾
                  </span>
                </span>
              );
            })}
          </p>
        </div>

        {/* Translation */}
        <div className="glass-card rounded-3xl p-6 md:p-8" ref={translationRef}>
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-border/50">
            <h3 className="text-lg font-bold text-foreground">{isRtl ? "الترجمة" : "Translation"}</h3>
            <span className="text-xs text-muted-foreground">{isRtl ? "اضغط على آية للتفسير" : "Tap a verse for tafsir & bookmarks"}</span>
          </div>

          <div className="space-y-1">
            {surah.ayahs.map((ayah: AyahData) => {
              const bookmarked = isBookmarked(surahNumber, ayah.numberInSurah);
              return (
                <div
                  key={ayah.number}
                  id={`ayah-${ayah.numberInSurah}`}
                  className={`flex gap-3 rounded-2xl p-3 transition-colors ${
                    bookmarked ? "bg-primary/10 border border-primary/25" : "border border-transparent hover:bg-white/5"
                  }`}
                >
                  <div className="shrink-0 flex items-start mt-0.5">
                    <span className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary text-sm font-bold">
                      {ayah.numberInSurah}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => openSheet(ayah)}
                    className="flex-1 text-left pt-1"
                  >
                    <p className="text-foreground leading-relaxed text-sm">{ayah.translation}</p>
                    <p className="text-[11px] text-muted-foreground mt-1 opacity-60">
                      {isRtl ? "اضغط للتفسير" : "Tap for tafsir"}
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleBookmark({
                      surahNumber,
                      surahName: surah.name,
                      surahEnglishName: surah.englishName,
                      ayahNumber: ayah.numberInSurah,
                      text: ayah.text,
                      translation: ayah.translation,
                    })}
                  >
                    {bookmarked ? <BookmarkCheck /> : <BookmarkPlus />}
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