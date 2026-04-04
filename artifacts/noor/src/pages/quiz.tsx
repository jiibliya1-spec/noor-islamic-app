import { useState, useMemo } from "react";
import {
  CheckCircle2, XCircle, RotateCcw, Trophy, ChevronRight,
  BookOpen, HelpCircle, Star, RefreshCw, PartyPopper, ThumbsUp, BookMarked,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { QUIZ_QUESTIONS, QUIZ_CATEGORIES } from "@/data/quiz-data";

type Category = typeof QUIZ_CATEGORIES[number]["id"];

const SEEN_KEY = "noor_quiz_seen";

function loadSeenIds(): Set<string> {
  try {
    const raw = localStorage.getItem(SEEN_KEY);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch { return new Set(); }
}

function markSeen(id: string): void {
  try {
    const seen = loadSeenIds();
    seen.add(id);
    localStorage.setItem(SEEN_KEY, JSON.stringify([...seen]));
  } catch { /* ignore */ }
}

function resetSeenForCategory(ids: string[]): void {
  try {
    const seen = loadSeenIds();
    ids.forEach(id => seen.delete(id));
    localStorage.setItem(SEEN_KEY, JSON.stringify([...seen]));
  } catch { /* ignore */ }
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function GradeIcon({ pct }: { pct: number }) {
  if (pct >= 90) return <Trophy className="w-16 h-16 text-primary" />;
  if (pct >= 70) return <ThumbsUp className="w-16 h-16 text-emerald-400" />;
  if (pct >= 50) return <BookMarked className="w-16 h-16 text-blue-400" />;
  return <RotateCcw className="w-16 h-16 text-muted-foreground" />;
}

export default function Quiz() {
  const { language, t } = useI18n();
  const [category, setCategory] = useState<Category>("all");
  const [started, setStarted] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [questions, setQuestions] = useState(QUIZ_QUESTIONS);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [wrongIds, setWrongIds] = useState<string[]>([]);

  const isDir = language === "ar" ? "rtl" : "ltr";

  const unseenCounts = useMemo(() => {
    const seen = loadSeenIds();
    const counts: Record<string, { unseen: number; total: number }> = {};
    for (const cat of QUIZ_CATEGORIES) {
      const catQs = cat.id === "all" ? QUIZ_QUESTIONS : QUIZ_QUESTIONS.filter(q => q.category === cat.id);
      counts[cat.id] = { unseen: catQs.filter(q => !seen.has(q.id)).length, total: catQs.length };
    }
    return counts;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, showCongrats]);

  const startQuiz = () => {
    const allForCat = category === "all" ? QUIZ_QUESTIONS : QUIZ_QUESTIONS.filter(q => q.category === category);
    const seen = loadSeenIds();
    const available = allForCat.filter(q => !seen.has(q.id));

    if (available.length === 0) {
      setShowCongrats(true);
      return;
    }

    setQuestions(shuffle(available));
    setQIndex(0); setSelected(null); setAnswered(false);
    setScore(0); setFinished(false); setWrongIds([]);
    setStarted(true); setShowCongrats(false);
  };

  const startFresh = () => {
    const allForCat = category === "all" ? QUIZ_QUESTIONS : QUIZ_QUESTIONS.filter(q => q.category === category);
    resetSeenForCategory(allForCat.map(q => q.id));
    setShowCongrats(false);
    const shuffled = shuffle(allForCat);
    setQuestions(shuffled);
    setQIndex(0); setSelected(null); setAnswered(false);
    setScore(0); setFinished(false); setWrongIds([]);
    setStarted(true);
  };

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const q = questions[qIndex];
    markSeen(q.id);
    if (idx === q.answer) {
      setScore(s => s + 1);
    } else {
      setWrongIds(prev => [...prev, q.id]);
    }
  };

  const handleNext = () => {
    if (qIndex < questions.length - 1) {
      setQIndex(i => i + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  };

  const q = questions[qIndex];
  const total = questions.length;
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;

  // ── Congratulations screen ──────────────────────────────────────────────
  if (showCongrats) {
    return (
      <div className="p-4 md:p-8 max-w-3xl mx-auto min-h-full pb-24 flex flex-col items-center" dir={isDir}>
        <div className="glass-card rounded-3xl p-10 w-full text-center">
          <div className="flex justify-center mb-4">
            <PartyPopper className="w-16 h-16 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-3">{t("quizCongrats")}</h2>
          <p className="text-muted-foreground mb-8 text-sm leading-relaxed">{t("quizAllAnswered")}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => { setShowCongrats(false); setStarted(false); }}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-border/50 text-foreground font-semibold hover:bg-white/5 transition text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              {t("quizChangeCategory")}
            </button>
            <button
              onClick={startFresh}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/20 text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              {t("quizStartFresh")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Category picker (lobby) ─────────────────────────────────────────────
  if (!started) {
    return (
      <div className="p-4 md:p-8 max-w-3xl mx-auto min-h-full pb-24" dir={isDir}>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{t("quiz")}</h1>
        <p className="text-muted-foreground mb-8 text-sm">{t("quizTestKnowledge")}</p>

        <div className="glass-card rounded-3xl p-6 mb-6">
          <h2 className="font-bold text-lg mb-4 text-foreground">{t("quizChooseCategory")}</h2>
          <div className="grid grid-cols-2 gap-3">
            {QUIZ_CATEGORIES.map(cat => {
              const counts = unseenCounts[cat.id] ?? { unseen: 0, total: 0 };
              const allDone = counts.unseen === 0;
              const catLabel = (cat as Record<string, string>)[language] ?? cat.label;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id as Category)}
                  className={`p-4 rounded-2xl text-left transition-all border ${
                    category === cat.id
                      ? "bg-primary/15 border-primary text-primary"
                      : "bg-card border-border/40 text-foreground hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-semibold text-sm">{catLabel}</div>
                    {allDone && <Star className="w-3.5 h-3.5 text-primary" />}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {allDone
                      ? t("quizAllDone")
                      : `${counts.unseen} ${t("quizRemaining")} / ${counts.total}`}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={startQuiz}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-lg shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-95"
        >
          {t("quizStartButton")}
        </button>
      </div>
    );
  }

  // ── Results screen ──────────────────────────────────────────────────────
  if (finished) {
    const gradeLabel = pct >= 90 ? t("quizExcellent")
      : pct >= 70 ? t("quizVeryGood")
      : pct >= 50 ? t("quizKeepLearning")
      : t("quizTryAgain");

    return (
      <div className="p-4 md:p-8 max-w-3xl mx-auto min-h-full pb-24 flex flex-col items-center" dir={isDir}>
        <div className="glass-card rounded-3xl p-8 w-full text-center mb-6">
          <div className="flex justify-center mb-4">
            <GradeIcon pct={pct} />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">{gradeLabel}</h2>
          <p className="text-muted-foreground mb-6">
            {t("quizAnswered")} {score} {t("quizOutOf")} {total} {t("quizCorrectly")}
          </p>
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="flex flex-col items-center">
              <Trophy className="w-8 h-8 text-primary mb-1" />
              <span className="text-3xl font-bold text-primary">{score}</span>
              <span className="text-xs text-muted-foreground">{t("quizCorrect")}</span>
            </div>
            <div className="w-px h-16 bg-border/30" />
            <div className="flex flex-col items-center">
              <XCircle className="w-8 h-8 text-destructive/70 mb-1" />
              <span className="text-3xl font-bold text-destructive/70">{total - score}</span>
              <span className="text-xs text-muted-foreground">{t("quizWrong")}</span>
            </div>
            <div className="w-px h-16 bg-border/30" />
            <div className="flex flex-col items-center">
              <HelpCircle className="w-8 h-8 text-muted-foreground mb-1" />
              <span className="text-3xl font-bold text-foreground">{pct}%</span>
              <span className="text-xs text-muted-foreground">{t("quizScoreLabel")}</span>
            </div>
          </div>
          <div className="h-3 rounded-full bg-border/30 mb-2 overflow-hidden">
            <div className="h-full rounded-full bg-primary transition-all duration-1000" style={{ width: `${pct}%` }} />
          </div>
          <p className="text-xs text-muted-foreground">{t("quizNeverRepeat")}</p>
        </div>
        <div className="flex gap-3 w-full">
          <button
            onClick={() => { setStarted(false); setFinished(false); }}
            className="flex-1 py-3.5 rounded-2xl border border-border/50 text-foreground font-semibold hover:bg-white/5 transition flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            {t("quizChangeCategory")}
          </button>
          <button
            onClick={startQuiz}
            className="flex-1 py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/20 transition active:scale-95 flex items-center justify-center gap-2"
          >
            <ChevronRight className="w-4 h-4" />
            {t("quizMoreQuestions")}
          </button>
        </div>
      </div>
    );
  }

  // ── Active quiz ─────────────────────────────────────────────────────────
  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto min-h-full pb-24" dir={isDir}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("quiz")}</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {t("quizQuestionOf")} {qIndex + 1} {t("quizOf")} {total}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
          <Trophy className="w-4 h-4" />
          <span className="font-bold">{score}</span>
        </div>
      </div>

      <div className="h-2 rounded-full bg-border/30 mb-6 overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${((qIndex + (answered ? 1 : 0)) / total) * 100}%` }}
        />
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-card border border-border/40 text-xs text-muted-foreground mb-4">
        <BookOpen className="w-3 h-3" />
        {(() => {
          const cat = QUIZ_CATEGORIES.find(c => c.id === q.category);
          return cat ? ((cat as Record<string, string>)[language] ?? cat.label) : "";
        })()}
      </div>

      <div className="glass-card rounded-3xl p-6 mb-5">
        <p className="text-lg md:text-xl font-semibold text-foreground leading-snug">
          {(q.question as Record<string, string>)[language] ?? q.question.en}
        </p>
      </div>

      <div className="space-y-3 mb-5">
        {((q.options as Record<string, string[]>)[language] ?? q.options.en).map((opt, i) => {
          const isCorrect = i === q.answer, isSelected = i === selected;
          let cls = "w-full p-4 rounded-2xl border text-left font-medium transition-all text-sm md:text-base ";
          if (!answered) cls += "border-border/40 bg-card text-foreground hover:bg-white/5 hover:border-primary/40 active:scale-[0.98]";
          else if (isCorrect) cls += "border-green-500/60 bg-green-500/10 text-green-400";
          else if (isSelected) cls += "border-red-500/60 bg-red-500/10 text-red-400";
          else cls += "border-border/20 bg-card/50 text-muted-foreground opacity-60";
          return (
            <button key={i} className={cls} onClick={() => handleSelect(i)}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                  !answered ? "bg-white/10 text-muted-foreground"
                  : isCorrect ? "bg-green-500/20 text-green-400"
                  : isSelected ? "bg-red-500/20 text-red-400"
                  : "bg-white/5 text-muted-foreground"
                }`}>
                  {answered
                    ? (isCorrect ? <CheckCircle2 className="w-4 h-4" /> : isSelected ? <XCircle className="w-4 h-4" /> : String.fromCharCode(65 + i))
                    : String.fromCharCode(65 + i)}
                </div>
                <span>{opt}</span>
              </div>
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="glass-card rounded-2xl p-5 mb-5 border border-primary/20">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
              <BookOpen className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="font-semibold text-sm text-primary mb-1">{t("quizExplanation")}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {(q.explanation as Record<string, string>)[language] ?? q.explanation.en}
              </p>
            </div>
          </div>
        </div>
      )}

      {answered && (
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          {qIndex < total - 1 ? t("quizNextQuestion") : t("quizSeeResults")}
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
