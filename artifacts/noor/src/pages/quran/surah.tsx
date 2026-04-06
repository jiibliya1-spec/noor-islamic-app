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
        <Link href="/quran" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" /> {isRtl ? "العودة إلى السور" : "Back to Surahs"}
        </Link>

        <div className="text-center mb-8 glass-card rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10" />
          <div className="relative z-10">
            <h1 className="text-5xl font-bold font-quran text-primary mb-3 leading-relaxed">{surah.name}</h1>
            <h2 className="text-2xl font-semibold text-foreground">{surah.englishName}</h2>
            <p className="text-muted-foreground mt-1">
              {surah.englishNameTranslation} · {surah.revelationType} · {surah.numberOfAyahs} {isRtl ? "آية" : "verses"}
            </p>
          </div>
        </div>

        {surahNumber !== 1 && surahNumber !== 9 && (
          <div className="text-center py-6 mb-4">
            <p className="text-4xl font-quran text-foreground leading-loose">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
          </div>
        )}

        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs text-muted-foreground font-medium">
            {isRtl
              ? `صفحة ${toArabicNumeral(currentPage + 1)} من ${toArabicNumeral(totalPages)}`
              : `Page ${currentPage + 1} of ${totalPages}`}
          </span>
          <button
            onClick={() => setShowTranslation(v => !v)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              showTranslation
                ? "bg-primary/20 text-primary border-primary/30"
                : "bg-white/5 text-muted-foreground border-white/10 hover:text-foreground"
            }`}
          >
            {showTranslation
              ? <><EyeOff className="w-3.5 h-3.5" />{isRtl ? "إخفاء الترجمة" : "Hide Translation"}</>
              : <><Eye className="w-3.5 h-3.5" />{isRtl ? "إظهار الترجمة" : "Show Translation"}</>
            }
          </button>
        </div>

        <div
          className="glass-card rounded-3xl p-6 md:p-10 mb-4 select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{ touchAction: "pan-y" }}
        >
          <p
            className="font-quran leading-[2.8] text-foreground text-3xl md:text-4xl"
            style={{ textAlign: "justify", textAlignLast: "right", direction: "rtl" }}
            dir="rtl"
            lang="ar"
          >
            {pageAyahs.map((ayah: AyahData) => (
              <span
                key={ayah.number}
                className="cursor-pointer hover:text-primary/90 transition-colors"
                onClick={() => openSheet(ayah)}
                title={isRtl ? "اضغط للخيارات" : "Tap for options"}
              >
                {ayah.text}
                <span
                  className="inline-flex items-center justify-center mx-1.5 text-primary"
                  style={{ fontFamily: "'Amiri', serif", fontSize: "0.75em", verticalAlign: "middle" }}
                >
                  ﴿{toArabicNumeral(ayah.numberInSurah)}﴾
                </span>
                {" "}
              </span>
            ))}
          </p>
        </div>

        {showTranslation && (
          <div className="glass-card rounded-3xl p-5 md:p-7 mb-4">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/50">
              <h3 className="text-base font-bold text-foreground">{isRtl ? "الترجمة" : "Translation"}</h3>
              <span className="text-xs text-muted-foreground">{isRtl ? "اضغط على آية للتفسير" : "Tap a verse for tafsir & options"}</span>
            </div>
            <div className="space-y-1">
              {pageAyahs.map((ayah: AyahData) => {
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
                    <button type="button" onClick={() => openSheet(ayah)} className="flex-1 text-left pt-1">
                      <p className="text-foreground leading-relaxed text-sm">{ayah.translation}</p>
                      <p className="text-[11px] text-muted-foreground mt-1 opacity-60">
                        {isRtl ? "اضغط للتفسير" : "Tap for tafsir"}
                      </p>
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleBookmark({
                        surahNumber, surahName: surah.name, surahEnglishName: surah.englishName,
                        ayahNumber: ayah.numberInSurah, text: ayah.text, translation: ayah.translation,
                      })}
                      className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-xl transition-all ${
                        bookmarked ? "text-primary bg-primary/15" : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                      }`}
                    >
                      {bookmarked ? <BookmarkCheck className="w-4 h-4 fill-primary/30" /> : <BookmarkPlus className="w-4 h-4" />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between gap-3 mt-2">
          <button
            onClick={goPrev}
            disabled={currentPage === 0}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold border transition-all ${
              currentPage === 0
                ? "opacity-30 cursor-not-allowed border-white/10 text-muted-foreground"
                : "border-primary/25 bg-primary/10 text-primary hover:bg-primary/20"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            {isRtl ? "السابق" : "Previous"}
          </button>

          <div className="flex items-center gap-1.5 flex-wrap justify-center max-w-[180px]">
            {Array.from({ length: Math.min(totalPages, 9) }).map((_, i) => {
              const isActive = totalPages <= 9 ? i === currentPage : Math.round((i / 8) * (totalPages - 1)) === currentPage;
              return (
                <div key={i} className={`rounded-full transition-all ${isActive ? "bg-primary w-4 h-2" : "bg-white/20 w-2 h-2"}`} />
              );
            })}
          </div>

          <button
            onClick={goNext}
            disabled={currentPage === totalPages - 1}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold border transition-all ${
              currentPage === totalPages - 1
                ? "opacity-30 cursor-not-allowed border-white/10 text-muted-foreground"
                : "border-primary/25 bg-primary/10 text-primary hover:bg-primary/20"
            }`}
          >
            {isRtl ? "التالي" : "Next"}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {sheetAyah && (
        <>
          <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={closeSheet} />
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-white/10 rounded-t-3xl shadow-2xl max-h-[80vh] flex flex-col">
            <div className="flex justify-center pt-4 pb-1 shrink-0">
              <div className="w-10 h-1 bg-white/20 rounded-full" />
            </div>

            {sheetView === "menu" && (
              <>
                <div className="px-6 pt-2 pb-4 shrink-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                      {sheetAyah.numberInSurah}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">
                      {surah.englishName} · {isRtl ? "آية" : "Verse"} {sheetAyah.numberInSurah}
                    </span>
                  </div>
                  <p className="font-quran text-xl text-foreground text-right leading-[2] mb-2 line-clamp-2" dir="rtl" lang="ar">
                    {sheetAyah.text}
                  </p>
                </div>
                <div className="border-t border-white/5 mx-6 shrink-0" />
                <div className="p-4 space-y-2 pb-8 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      toggleBookmark({ surahNumber, surahName: surah.name, surahEnglishName: surah.englishName, ayahNumber: sheetAyah.numberInSurah, text: sheetAyah.text, translation: sheetAyah.translation });
                      closeSheet();
                    }}
                    className="w-full flex items-center gap-3 p-4 rounded-2xl bg-primary/10 border border-primary/20 hover:bg-primary/15 transition-colors"
                  >
                    {sheetBookmarked
                      ? <><BookmarkCheck className="w-5 h-5 text-primary fill-primary/30 shrink-0" /><span className="text-sm font-semibold text-primary">{t("removeBookmark")}</span></>
                      : <><Bookmark className="w-5 h-5 text-primary shrink-0" /><span className="text-sm font-semibold text-primary">{t("bookmarkVerse")}</span></>
                    }
                  </button>
                  <button type="button" onClick={() => setSheetView("tafsir")} className="w-full flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/8 transition-colors">
                    <BookOpen className="w-5 h-5 text-primary shrink-0" />
                    <div className="text-left">
                      <p className="text-sm font-semibold text-foreground">{t("tafsir")}</p>
                      <p className="text-xs text-muted-foreground">{TAFSIR_SOURCE[language] || TAFSIR_SOURCE.en}</p>
                    </div>
                  </button>
                  <button type="button" onClick={() => setSheetView("words")} className="w-full flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/8 transition-colors">
                    <AlignLeft className="w-5 h-5 text-primary shrink-0" />
                    <div className="text-left">
                      <p className="text-sm font-semibold text-foreground">{t("wordMeanings")}</p>
                      <p className="text-xs text-muted-foreground">Meaning of each Arabic word</p>
                    </div>
                  </button>
                  <button type="button" onClick={closeSheet} className="w-full p-4 rounded-2xl text-sm text-muted-foreground hover:bg-white/5 transition-colors font-medium">
                    {t("cancel")}
                  </button>
                </div>
              </>
            )}

            {sheetView === "tafsir" && (
              <>
                <div className="px-4 pb-3 pt-1 flex items-center gap-3 shrink-0 border-b border-white/5">
                  <button onClick={() => setSheetView("menu")} className="p-1.5 rounded-xl hover:bg-white/10 transition-colors">
                    <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <div>
                    <p className="text-sm font-bold text-foreground">Tafsir · {surah.englishName} {sheetAyah.numberInSurah}</p>
                    <p className="text-xs text-primary">{TAFSIR_SOURCE[language] || TAFSIR_SOURCE.en}</p>
                  </div>
                </div>
                <div className="px-5 pt-3 pb-2 shrink-0">
                  <p className="font-quran text-lg text-foreground text-right leading-[2]" dir="rtl" lang="ar">{sheetAyah.text}</p>
                </div>
                <div className="flex-1 overflow-y-auto px-5 pb-8 pt-2">
                  {tafsirLoading && <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 text-primary animate-spin" /></div>}
                  {tafsirError && <p className="text-sm text-red-400 text-center py-6">Tafsir unavailable — check your connection.</p>}
                  {tafsirText && !tafsirLoading && (
                    <div className={`text-sm text-foreground/90 leading-relaxed ${language === "ar" ? "text-right" : ""}`} dir={language === "ar" ? "rtl" : "ltr"}>
                      {stripHtml(tafsirText).split("\n").map((para, i) => <p key={i} className="mb-3">{para}</p>)}
                    </div>
                  )}
                </div>
              </>
            )}

            {sheetView === "words" && (
              <>
                <div className="px-4 pb-3 pt-1 flex items-center gap-3 shrink-0 border-b border-white/5">
                  <button onClick={() => setSheetView("menu")} className="p-1.5 rounded-xl hover:bg-white/10 transition-colors">
                    <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <div>
                    <p className="text-sm font-bold text-foreground">Word Meanings · {surah.englishName} {sheetAyah.numberInSurah}</p>
                    <p className="text-xs text-muted-foreground">Quran.com — word-by-word</p>
                  </div>
                </div>
                <div className="px-5 pt-3 pb-2 shrink-0">
                  <p className="font-quran text-lg text-foreground text-right leading-[2]" dir="rtl" lang="ar">{sheetAyah.text}</p>
                </div>
                <div className="flex-1 overflow-y-auto px-5 pb-8 pt-2">
                  {wordsLoading && <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 text-primary animate-spin" /></div>}
                  {wordsError && <p className="text-sm text-red-400 text-center py-6">Word meanings unavailable — check your connection.</p>}
                  {wordData && !wordsLoading && wordData.length === 0 && <p className="text-sm text-muted-foreground text-center py-6">No word data available for this verse.</p>}
                  {wordData && !wordsLoading && wordData.length > 0 && (
                    <div className="grid grid-cols-2 gap-2">
                      {wordData.map((word, idx) => (
                        <div key={word.id ?? idx} className="bg-white/5 rounded-xl p-3 border border-white/8">
                          <p className="font-quran text-xl text-primary text-right leading-loose" dir="rtl" lang="ar">{word.text_uthmani}</p>
                          {word.transliteration?.text && <p className="text-xs text-muted-foreground italic mt-1">{word.transliteration.text}</p>}
                          {word.translation?.text && <p className="text-xs text-foreground font-medium mt-0.5">{word.translation.text}</p>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
