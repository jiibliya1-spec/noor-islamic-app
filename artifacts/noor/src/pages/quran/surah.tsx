import { useParams, Link } from "wouter";
import { useSurahDetail, useTafsir, useWordMeanings } from "@/hooks/use-external-api";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { saveProgress, loadProgress } from "@/hooks/use-reading-progress";
import { AudioPlayer } from "@/components/audio-player";
import { useI18n } from "@/lib/i18n";
import {
  Loader2, ArrowLeft, Bookmark, BookmarkCheck,
  BookOpen, AlignLeft, ChevronLeft,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

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

// Strip any HTML tags that might come from the tafsir API
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
  const { language } = useI18n();

  // Bottom sheet state
  const [sheetAyah, setSheetAyah] = useState<AyahData | null>(null);
  const [sheetView, setSheetView] = useState<SheetView>("menu");

  const translationRef = useRef<HTMLDivElement>(null);

  // Lazy-fetch tafsir only when the tafsir panel is open
  const {
    data: tafsirText,
    isLoading: tafsirLoading,
    isError: tafsirError,
  } = useTafsir(
    surahNumber,
    sheetAyah?.numberInSurah ?? 0,
    language,
    sheetView === "tafsir" && sheetAyah !== null
  );

  // Lazy-fetch word meanings only when words panel is open
  const {
    data: wordData,
    isLoading: wordsLoading,
    isError: wordsError,
  } = useWordMeanings(
    surahNumber,
    sheetAyah?.numberInSurah ?? 0,
    sheetView === "words" && sheetAyah !== null
  );

  // Open sheet and reset to menu view
  const openSheet = (ayah: AyahData) => {
    setSheetAyah(ayah);
    setSheetView("menu");
  };

  const closeSheet = () => {
    setSheetAyah(null);
    setSheetView("menu");
  };

  // Scroll to specific ayah from URL (?ayah=N) — used by "Continue reading" & bookmarks
  useEffect(() => {
    if (!surah) return;
    const target = new URLSearchParams(window.location.search).get("ayah");
    if (!target) return;
    const el = document.getElementById(`ayah-${target}`);
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 350);
  }, [surah]);

  // Save progress when surah first loads (or when switching surahs)
  useEffect(() => {
    if (!surah) return;
    const existing = loadProgress();
    if (!existing || existing.surahNumber !== surahNumber) {
      saveProgress({
        surahNumber,
        surahName: surah.name,
        surahEnglishName: surah.englishName,
        ayahNumber: 1,
      });
    }
  }, [surah, surahNumber]);

  // IntersectionObserver — auto-update progress as user reads
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
      { threshold: 0.5 }
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

  if (!surah) return <div className="p-8 text-center text-red-500">Surah not found.</div>;

  const sheetBookmarked = sheetAyah ? isBookmarked(surahNumber, sheetAyah.numberInSurah) : false;

  return (
    <div className="min-h-screen pb-28">
      <AudioPlayer surahNumber={surahNumber} surahName={surah.englishName} />

      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        <Link
          href="/quran"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Surahs
        </Link>

        {/* Header card */}
        <div className="text-center mb-10 glass-card rounded-3xl p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10" />
          <div className="relative z-10">
            <h1 className="text-5xl font-bold font-quran text-primary mb-4 leading-relaxed">{surah.name}</h1>
            <h2 className="text-2xl font-semibold text-foreground">{surah.englishName}</h2>
            <p className="text-muted-foreground mt-2">
              {surah.englishNameTranslation} · {surah.revelationType} · {surah.numberOfAyahs} verses
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

        {/* Mushaf-style flowing Arabic */}
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
                >
                  ﴿{toArabicNumeral(ayah.numberInSurah)}﴾
                </span>{" "}
              </span>
            ))}
          </p>
        </div>

        {/* Translation — tap a verse to open the sheet */}
        <div className="glass-card rounded-3xl p-6 md:p-8" ref={translationRef}>
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-border/50">
            <h3 className="text-lg font-bold text-foreground">Translation</h3>
            <span className="text-xs text-muted-foreground">Tap a verse for tafsir & bookmarks</span>
          </div>

          <div className="space-y-1">
            {surah.ayahs.map((ayah: AyahData) => {
              const bookmarked = isBookmarked(surahNumber, ayah.numberInSurah);
              return (
                <button
                  key={ayah.number}
                  id={`ayah-${ayah.numberInSurah}`}
                  type="button"
                  onClick={() => openSheet(ayah)}
                  className={`w-full text-left flex gap-3 rounded-2xl p-3 transition-colors active:scale-[0.99] ${
                    bookmarked
                      ? "bg-primary/10 border border-primary/25"
                      : "hover:bg-white/5 active:bg-white/5"
                  }`}
                >
                  <div className="shrink-0 flex flex-col items-center gap-0.5 mt-0.5">
                    <span className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary text-sm font-bold">
                      {ayah.numberInSurah}
                    </span>
                    {bookmarked && <Bookmark className="w-3 h-3 text-primary fill-primary" />}
                  </div>
                  <p className="text-foreground leading-relaxed pt-1 flex-1 text-sm">{ayah.translation}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ───── Bottom Sheet ───── */}
      {sheetAyah && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={closeSheet}
          />

          {/* Sheet */}
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-white/10 rounded-t-3xl shadow-2xl max-h-[80vh] flex flex-col">
            {/* Drag handle */}
            <div className="flex justify-center pt-4 pb-1 shrink-0">
              <div className="w-10 h-1 bg-white/20 rounded-full" />
            </div>

            {/* ── MENU view ── */}
            {sheetView === "menu" && (
              <>
                {/* Verse preview */}
                <div className="px-6 pt-2 pb-4 shrink-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                      {sheetAyah.numberInSurah}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">
                      {surah.englishName} · Verse {sheetAyah.numberInSurah}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed line-clamp-2">
                    {sheetAyah.translation}
                  </p>
                </div>

                <div className="border-t border-white/5 mx-6 shrink-0" />

                <div className="p-4 space-y-2 pb-8 shrink-0">
                  {/* Bookmark */}
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
                      closeSheet();
                    }}
                    className="w-full flex items-center gap-3 p-4 rounded-2xl bg-primary/10 border border-primary/20 hover:bg-primary/15 transition-colors"
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

                  {/* Tafsir */}
                  <button
                    type="button"
                    onClick={() => setSheetView("tafsir")}
                    className="w-full flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/8 transition-colors"
                  >
                    <BookOpen className="w-5 h-5 text-primary shrink-0" />
                    <div className="text-left">
                      <p className="text-sm font-semibold text-foreground">View Tafsir</p>
                      <p className="text-xs text-muted-foreground">
                        {TAFSIR_SOURCE[language] || TAFSIR_SOURCE.en}
                      </p>
                    </div>
                  </button>

                  {/* Word Meanings */}
                  <button
                    type="button"
                    onClick={() => setSheetView("words")}
                    className="w-full flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/8 transition-colors"
                  >
                    <AlignLeft className="w-5 h-5 text-primary shrink-0" />
                    <div className="text-left">
                      <p className="text-sm font-semibold text-foreground">Word Meanings</p>
                      <p className="text-xs text-muted-foreground">Meaning of each Arabic word</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={closeSheet}
                    className="w-full p-4 rounded-2xl text-sm text-muted-foreground hover:bg-white/5 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}

            {/* ── TAFSIR view ── */}
            {sheetView === "tafsir" && (
              <>
                {/* Header */}
                <div className="px-4 pb-3 pt-1 flex items-center gap-3 shrink-0 border-b border-white/5">
                  <button
                    onClick={() => setSheetView("menu")}
                    className="p-1.5 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      Tafsir · {surah.englishName} {sheetAyah.numberInSurah}
                    </p>
                    <p className="text-xs text-primary">{TAFSIR_SOURCE[language] || TAFSIR_SOURCE.en}</p>
                  </div>
                </div>

                {/* Arabic preview */}
                <div className="px-5 pt-3 pb-2 shrink-0">
                  <p className="font-quran text-lg text-foreground text-right leading-[2]" dir="rtl" lang="ar">
                    {sheetAyah.text}
                  </p>
                </div>

                {/* Tafsir content */}
                <div className="flex-1 overflow-y-auto px-5 pb-8 pt-2">
                  {tafsirLoading && (
                    <div className="flex justify-center py-8">
                      <Loader2 className="w-6 h-6 text-primary animate-spin" />
                    </div>
                  )}
                  {tafsirError && (
                    <p className="text-sm text-red-400 text-center py-6">
                      Tafsir unavailable — check your connection.
                    </p>
                  )}
                  {tafsirText && !tafsirLoading && (
                    <div className={`text-sm text-foreground/90 leading-relaxed ${language === "ar" ? "text-right" : ""}`}
                      dir={language === "ar" ? "rtl" : "ltr"}
                    >
                      {stripHtml(tafsirText).split("\n").map((para, i) => (
                        <p key={i} className="mb-3">{para}</p>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* ── WORD MEANINGS view ── */}
            {sheetView === "words" && (
              <>
                {/* Header */}
                <div className="px-4 pb-3 pt-1 flex items-center gap-3 shrink-0 border-b border-white/5">
                  <button
                    onClick={() => setSheetView("menu")}
                    className="p-1.5 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      Word Meanings · {surah.englishName} {sheetAyah.numberInSurah}
                    </p>
                    <p className="text-xs text-muted-foreground">Quran.com — word-by-word</p>
                  </div>
                </div>

                {/* Arabic preview */}
                <div className="px-5 pt-3 pb-2 shrink-0">
                  <p className="font-quran text-lg text-foreground text-right leading-[2]" dir="rtl" lang="ar">
                    {sheetAyah.text}
                  </p>
                </div>

                {/* Word list */}
                <div className="flex-1 overflow-y-auto px-5 pb-8 pt-2">
                  {wordsLoading && (
                    <div className="flex justify-center py-8">
                      <Loader2 className="w-6 h-6 text-primary animate-spin" />
                    </div>
                  )}
                  {wordsError && (
                    <p className="text-sm text-red-400 text-center py-6">
                      Word meanings unavailable — check your connection.
                    </p>
                  )}
                  {wordData && !wordsLoading && wordData.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-6">No word data available for this verse.</p>
                  )}
                  {wordData && !wordsLoading && wordData.length > 0 && (
                    <div className="grid grid-cols-2 gap-2">
                      {wordData.map((word, idx) => (
                        <div
                          key={word.id ?? idx}
                          className="bg-white/5 rounded-xl p-3 border border-white/8"
                        >
                          <p className="font-quran text-xl text-primary text-right leading-loose" dir="rtl" lang="ar">
                            {word.text_uthmani}
                          </p>
                          {word.transliteration?.text && (
                            <p className="text-xs text-muted-foreground italic mt-1">
                              {word.transliteration.text}
                            </p>
                          )}
                          {word.translation?.text && (
                            <p className="text-xs text-foreground font-medium mt-0.5">
                              {word.translation.text}
                            </p>
                          )}
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
