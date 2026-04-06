import { useParams, Link } from "wouter";
import { useSurahDetail, useTafsir, useWordMeanings } from "@/hooks/use-external-api";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { saveProgress, loadProgress } from "@/hooks/use-reading-progress";
import { AudioPlayer } from "@/components/audio-player";
import { useI18n } from "@/lib/i18n";
import {
  Loader2, ArrowLeft, Bookmark, BookmarkCheck,
  BookOpen, AlignLeft, ChevronLeft, ChevronRight,
  Save, CheckCircle2, BookmarkPlus, Languages,
} from "lucide-react";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";

type SheetView = "menu" | "tafsir" | "words" | "translation";
const AYAHS_PER_PAGE = 10;

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
  const [currentPage, setCurrentPage] = useState(0);
  const [saveFlash, setSaveFlash] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

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

  const hasBismillah = surahNumber !== 1 && surahNumber !== 9;

  // الآيات كاملة بدون حذف أي آية
  const ayahs = useMemo(() => {
    if (!surah) return [];
    return surah.ayahs;
  }, [surah]);

  const totalPages = Math.ceil(ayahs.length / AYAHS_PER_PAGE);

  const currentAyahs = useMemo(() => {
    const start = currentPage * AYAHS_PER_PAGE;
    return ayahs.slice(start, start + AYAHS_PER_PAGE);
  }, [ayahs, currentPage]);

  const currentAyahNumber = currentAyahs[0]?.numberInSurah ?? 1;
  const isRtl = language === "ar";

  useEffect(() => {
    if (!surah) return;
    const existing = loadProgress();
    if (!existing || existing.surahNumber !== surahNumber) {
      saveProgress({ surahNumber, surahName: surah.name, surahEnglishName: surah.englishName, ayahNumber: 1 });
    }
  }, [surah, surahNumber]);

  useEffect(() => {
    if (surah) {
      saveProgress({
        surahNumber,
        surahName: surah.name,
        surahEnglishName: surah.englishName,
        ayahNumber: currentAyahNumber,
      });
    }
  }, [currentPage, surah, surahNumber, currentAyahNumber]);

  const handleSaveProgress = useCallback(() => {
    if (!surah) return;
    saveProgress({ surahNumber, surahName: surah.name, surahEnglishName: surah.englishName, ayahNumber: currentAyahNumber });
    setSaveFlash(true);
    setTimeout(() => setSaveFlash(false), 2000);
  }, [surah, surahNumber, currentAyahNumber]);

  const goNext = useCallback(() => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(p => p + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage, totalPages]);

  const goPrev = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage(p => p - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx < 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><Loader2 className="w-12 h-12 text-primary animate-spin" /></div>;
  }

  if (!surah) return <div className="p-8 text-center text-red-500">Surah not found.</div>;

  const sheetBookmarked = sheetAyah ? isBookmarked(surahNumber, sheetAyah.numberInSurah) : false;
  const isFirstPage = currentPage === 0;

  return (
    <div className="min-h-screen pb-8" dir="rtl">
      <AudioPlayer surahNumber={surahNumber} surahName={surah.englishName} />

      {/* Top bar */}
      <div className="sticky top-[57px] z-30 w-full bg-background/90 backdrop-blur-md border-b border-white/5 px-4 py-2 flex items-center justify-between gap-3" dir="ltr">
        <Link href="/quran" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" />
          {isRtl ? "السور" : "Surahs"}
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {isRtl ? surah.name : surah.englishName} · {t("verse")} {currentAyahNumber}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* زر الترجمة */}
          <button
            onClick={() => setShowTranslation(v => !v)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
              showTranslation
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border/50 text-muted-foreground hover:text-primary hover:border-primary/40"
            }`}
          >
            <Languages className="w-3.5 h-3.5" />
            {isRtl ? "ترجمة" : "Translation"}
          </button>
          {/* زر حفظ التقدم */}
          <button
            onClick={handleSaveProgress}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
              saveFlash
                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                : "bg-card border-border/50 text-muted-foreground hover:text-primary hover:border-primary/40"
            }`}
          >
            {saveFlash ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-6">

        {/* Header السورة */}
        <div className="text-center mb-6 glass-card rounded-3xl py-8 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10" />
          <div className="relative z-10">
            <h1 className="text-5xl font-bold font-quran text-primary mb-3 leading-relaxed">{surah.name}</h1>
            <h2 className="text-xl font-semibold text-foreground">{surah.englishName}</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              {surah.englishNameTranslation} · {surah.revelationType} · {surah.numberOfAyahs} {isRtl ? "آية" : "verses"}
            </p>
          </div>
        </div>

        {/* البسملة — فقط في الصفحة الأولى */}
        {hasBismillah && isFirstPage && (
          <div className="text-center my-6 py-6"
            style={{
              borderTop: "1px solid rgba(201,168,76,0.2)",
              borderBottom: "1px solid rgba(201,168,76,0.2)",
            }}
          >
            <p className="font-quran text-primary text-4xl leading-loose" dir="rtl">
              بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </p>
          </div>
        )}

        {/* صفحة المصحف قابلة للـ swipe */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="select-none"
        >
          {/* النص العربي بتصميم المصحف */}
          <div className="glass-card rounded-3xl px-6 py-8 mb-4">
            <p
              className="font-quran text-foreground text-right leading-[3] text-[1.65rem] md:text-4xl"
              dir="rtl"
              lang="ar"
              style={{ textAlign: "justify", textAlignLast: "right" }}
            >
              {currentAyahs.map((ayah: AyahData) => {
                // للسور التي تبدأ بالبسملة: في الآية 1 نُظهرها كاملة لكن بدون البسملة المكررة
                // البسملة معروضة منفردة فوق، لكن الآية 1 تحتوي أحياناً على بسملة + باقي الآية
                // الحل: نظهر الآية 1 كاملة دائماً
                return (
                  <span key={ayah.number}>
                    {ayah.text}
                    {" "}
                    <span
                      className="text-primary inline-block"
                      style={{ fontFamily: "'Amiri', serif", fontSize: "0.75em" }}
                    >
                      ﴿{toArabicNumeral(ayah.numberInSurah)}﴾
                    </span>
                    {" "}
                  </span>
                );
              })}
            </p>
          </div>

          {/* الترجمة — تظهر فقط إذا ضغط المستخدم على زر الترجمة */}
          {showTranslation && (
            <div className="glass-card rounded-3xl px-5 py-5 mb-4" dir={isRtl ? "rtl" : "ltr"}>
              <div className="space-y-3">
                {currentAyahs.map((ayah: AyahData) => {
                  const bookmarked = isBookmarked(surahNumber, ayah.numberInSurah);
                  return (
                    <div
                      key={ayah.number}
                      className={`flex gap-3 rounded-2xl p-3 transition-colors cursor-pointer ${
                        bookmarked ? "bg-primary/10 border border-primary/25" : "border border-transparent hover:bg-white/5"
                      }`}
                      onClick={() => openSheet(ayah)}
                    >
                      <span className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xs font-bold shrink-0 mt-0.5">
                        {ayah.numberInSurah}
                      </span>
                      <div className="flex-1">
                        <p className="text-foreground/90 leading-relaxed text-sm">{ayah.translation}</p>
                        <p className="text-[10px] text-muted-foreground mt-1 opacity-50">
                          {isRtl ? "اضغط للتفسير والإشارة" : "Tap for tafsir & bookmark"}
                        </p>
                      </div>
                      <button
                        type="button"
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
                        }}
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

          {/* Navigation مباشرة تحت الصفحة */}
          <div className="flex items-center justify-between gap-3 mt-4 mb-6" dir="ltr">
            <button
              onClick={goPrev}
              disabled={currentPage === 0}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-card border border-border/50 text-foreground font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5 transition-all active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
              {isRtl ? "السابقة" : "Prev"}
            </button>

            <div className="flex flex-col items-center gap-1.5">
              <span className="text-sm font-bold text-primary tabular-nums">
                {currentPage + 1} / {totalPages}
              </span>
              <div className="flex gap-1">
                {Array.from({ length: Math.min(totalPages, 9) }).map((_, i) => {
                  const isActive = i === Math.min(currentPage, 8) || (currentPage >= 8 && i === 8);
                  return (
                    <div
                      key={i}
                      className={`rounded-full transition-all duration-200 ${
                        isActive ? "w-4 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-primary/25"
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            <button
              onClick={goNext}
              disabled={currentPage === totalPages - 1}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary/90 transition-all active:scale-95"
            >
              {isRtl ? "التالية" : "Next"}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Sheet للتفسير والإشارة */}
      {sheetAyah && (
        <>
          <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={closeSheet} />
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-white/10 rounded-t-3xl shadow-2xl max-h-[85vh] flex flex-col" dir={isRtl ? "rtl" : "ltr"}>
            <div className="flex justify-center pt-4 pb-1 shrink-0">
              <div className="w-10 h-1 bg-white/20 rounded-full" />
            </div>

            {sheetView === "menu" && (
              <>
                <div className="px-6 pt-2 pb-4 shrink-0">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                      {sheetAyah.numberInSurah}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">
                      {surah.englishName} · {isRtl ? "الآية" : "Verse"} {sheetAyah.numberInSurah}
                    </span>
                  </div>
                  <p className="font-quran text-xl text-foreground text-right leading-[2.2] mb-2" dir="rtl">{sheetAyah.text}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2" dir={isRtl ? "rtl" : "ltr"}>{sheetAyah.translation}</p>
                </div>
                <div className="border-t border-white/5 mx-6 shrink-0" />
                <div className="p-4 space-y-2 pb-8 shrink-0">
                  <button
                    type="button"
                    onClick={() => { toggleBookmark({ surahNumber, surahName: surah.name, surahEnglishName: surah.englishName, ayahNumber: sheetAyah.numberInSurah, text: sheetAyah.text, translation: sheetAyah.translation }); closeSheet(); }}
                    className="w-full flex items-center gap-3 p-4 rounded-2xl bg-primary/10 border border-primary/20 hover:bg-primary/15 transition-colors"
                  >
                    {sheetBookmarked
                      ? <><BookmarkCheck className="w-5 h-5 text-primary fill-primary/30 shrink-0" /><span className="text-sm font-semibold text-primary">{t("removeBookmark")}</span></>
                      : <><Bookmark className="w-5 h-5 text-primary shrink-0" /><span className="text-sm font-semibold text-primary">{t("bookmarkVerse")}</span></>
                    }
                  </button>
                  <button type="button" onClick={() => setSheetView("tafsir")} className="w-full flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/8 transition-colors">
                    <BookOpen className="w-5 h-5 text-primary shrink-0" />
                    <div className={isRtl ? "text-right" : "text-left"}>
                      <p className="text-sm font-semibold text-foreground">{t("tafsir")}</p>
                      <p className="text-xs text-muted-foreground">{TAFSIR_SOURCE[language] || TAFSIR_SOURCE.en}</p>
                    </div>
                  </button>
                  <button type="button" onClick={() => setSheetView("words")} className="w-full flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/8 transition-colors">
                    <AlignLeft className="w-5 h-5 text-primary shrink-0" />
                    <div className={isRtl ? "text-right" : "text-left"}>
                      <p className="text-sm font-semibold text-foreground">{t("wordMeanings")}</p>
                      <p className="text-xs text-muted-foreground">Quran.com — word-by-word</p>
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
                  <p className="font-quran text-xl text-foreground text-right leading-[2.2]" dir="rtl" lang="ar">{sheetAyah.text}</p>
                </div>
                <div className="flex-1 overflow-y-auto px-5 pb-8 pt-2">
                  {tafsirLoading && <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 text-primary animate-spin" /></div>}
                  {tafsirError && <p className="text-sm text-red-400 text-center py-6">Tafsir unavailable.</p>}
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
                  <p className="font-quran text-xl text-foreground text-right leading-[2.2]" dir="rtl" lang="ar">{sheetAyah.text}</p>
                </div>
                <div className="flex-1 overflow-y-auto px-5 pb-8 pt-2">
                  {wordsLoading && <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 text-primary animate-spin" /></div>}
                  {wordsError && <p className="text-sm text-red-400 text-center py-6">Word meanings unavailable.</p>}
                  {wordData && !wordsLoading && wordData.length === 0 && <p className="text-sm text-muted-foreground text-center py-6">No word data available.</p>}
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
