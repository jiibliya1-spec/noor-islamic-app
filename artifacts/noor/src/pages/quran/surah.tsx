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

        {/* Bismillah — سطر منفصل فوق الآيات */}
        {hasBismillah && (
          <div
            className="text-center mb-8"
            style={{
              paddingTop: "2.5rem",
              paddingBottom: "2.5rem",
              borderTop: "1px solid rgba(201,168,76,0.15)",
              borderBottom: "1px solid rgba(201,168,76,0.15)",
            }}
          >
            <p
              className="font-quran text-primary"
              style={{
                display: "block",
                width: "100%",
                textAlign: "center",
                fontSize: "2.25rem",
                lineHeight: "2.5",
                letterSpacing: "0.05em",
              }}
            >
              بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </p>
          </div>
        )}

        {/* Mushaf-style flowing Arabic */}
        <div className="glass-card rounded-3xl p-6 md:p-10 mb-8">
          <p className="font-quran leading-[2.6] text-right text-foreground text-3xl md:text-4xl" dir="rtl" lang="ar">
            {surah.ayahs.map((ayah: AyahData) => {
              const verseText = (hasBismillah && ayah.numberInSurah === 1)
                ? stripBismillah(ayah.text)
                : ayah.text;
              return (
                <span key={ayah.number}>
                  {verseText}
                  <span
                    className="inline-flex items-center justify-center mx-2 text-primary"
                    style={{ fontFamily: "'Amiri', serif", fontSize: "0.8em", verticalAlign: "middle" }}
                  >
                    ﴿{toArabicNumeral(ayah.numberInSurah)}﴾
                  </span>{" "}
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
                    title={bookmarked ? (isRtl ? "إزالة الإشارة" : "Remove bookmark") : (isRtl ? "إضافة إشارة" : "Bookmark verse")}
                    onClick={() => toggleBookmark({
                      surahNumber,
                      surahName: surah.name,
                      surahEnglishName: surah.englishName,
                      ayahNumber: ayah.numberInSurah,
                      text: ayah.text,
                      translation: ayah.translation,
                    })}
                    className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-xl transition-all ${
                      bookmarked
                        ? "text-primary bg-primary/15"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                    }`}
                  >
                    {bookmarked
                      ? <BookmarkCheck className="w-4 h-4 fill-primary/30" />
                      : <BookmarkPlus className="w-4 h-4" />
                    }
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ───── Bottom Sheet ───── */}
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
                      {surah.englishName} · Verse {sheetAyah.numberInSurah}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed line-clamp-2">{sheetAyah.translation}</p>
                </div>
                <div className="border-t border-white/5 mx-6 shrink-0" />
                <div className="p-4 space-y-2 pb-8 shrink-0">
                  <button
                    type="button"
                    onClick={() => { toggleBookmark({ surahNumber, surahName: surah.name, surahEnglishName: surah.englishName, ayahNumber: sheetAyah.numberInSurah, text: sheetAyah.text, translation: sheetAyah.translation }); closeSheet(); }}
                    className="w-full flex items-center gap-3 p-4 rounded-2xl bg-primary/10 border border-primary/20 hover:bg-primary/15 transition-colors"
                  >
                    {sheetBookmarked ? (
                      <><BookmarkCheck className="w-5 h-5 text-primary fill-primary/30 shrink-0" /><span className="text-sm font-semibold text-primary">{t("removeBookmark")}</span></>
                    ) : (
                      <><Bookmark className="w-5 h-5 text-primary shrink-0" /><span className="text-sm font-semibold text-primary">{t("bookmarkVerse")}</span></>
                    )}
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

