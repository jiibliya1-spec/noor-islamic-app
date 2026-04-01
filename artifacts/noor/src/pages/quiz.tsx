import { useState, useMemo } from "react";
import { CheckCircle2, XCircle, RotateCcw, Trophy, ChevronRight, BookOpen, HelpCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { QUIZ_QUESTIONS, QUIZ_CATEGORIES } from "@/data/quiz-data";

type Category = typeof QUIZ_CATEGORIES[number]["id"];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Quiz() {
  const { language } = useI18n();
  const [category, setCategory] = useState<Category>("all");
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState(QUIZ_QUESTIONS);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [wrongIds, setWrongIds] = useState<string[]>([]);

  const isDir = language === "ar" ? "rtl" : "ltr";

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: QUIZ_QUESTIONS.length };
    QUIZ_QUESTIONS.forEach(q => {
      counts[q.category] = (counts[q.category] || 0) + 1;
    });
    return counts;
  }, []);

  const startQuiz = () => {
    const filtered = category === "all" ? QUIZ_QUESTIONS : QUIZ_QUESTIONS.filter(q => q.category === category);
    setQuestions(shuffle(filtered));
    setQIndex(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
    setWrongIds([]);
    setStarted(true);
  };

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const q = questions[qIndex];
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
  const pct = Math.round((score / total) * 100);

  if (!started) {
    return (
      <div className="p-4 md:p-8 max-w-3xl mx-auto min-h-full pb-24" dir={isDir}>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          {language === "ar" ? "الاختبار الإسلامي" : "Islamic Quiz"}
        </h1>
        <p className="text-muted-foreground mb-8 text-sm">
          {language === "ar"
            ? "اختبر معلوماتك الإسلامية"
            : "Test your knowledge of Islam — history, Quran, fiqh, prophets & companions"}
        </p>

        <div className="glass-card rounded-3xl p-6 mb-6">
          <h2 className="font-bold text-lg mb-4 text-foreground">
            {language === "ar" ? "اختر الفئة" : "Choose a Category"}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {QUIZ_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id as Category)}
                className={`p-4 rounded-2xl text-left transition-all border ${
                  category === cat.id
                    ? "bg-primary/15 border-primary text-primary"
                    : "bg-card border-border/40 text-foreground hover:bg-white/5"
                }`}
              >
                <div className="font-semibold text-sm mb-1">
                  {language === "ar" ? cat.ar : cat.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {categoryCounts[cat.id] || QUIZ_QUESTIONS.length}{" "}
                  {language === "ar" ? "سؤال" : "questions"}
                </div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={startQuiz}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-lg shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-95"
        >
          {language === "ar" ? "ابدأ الاختبار" : "Start Quiz"}
        </button>
      </div>
    );
  }

  if (finished) {
    const grade = pct >= 90 ? "🌟" : pct >= 70 ? "👍" : pct >= 50 ? "📚" : "🔄";
    const gradeLabel = pct >= 90
      ? (language === "ar" ? "ممتاز!" : "Excellent!")
      : pct >= 70
      ? (language === "ar" ? "جيد جداً!" : "Very Good!")
      : pct >= 50
      ? (language === "ar" ? "جيد — استمر في التعلم" : "Good — Keep Learning!")
      : (language === "ar" ? "حاول مرة أخرى" : "Try Again!");

    return (
      <div className="p-4 md:p-8 max-w-3xl mx-auto min-h-full pb-24 flex flex-col items-center" dir={isDir}>
        <div className="glass-card rounded-3xl p-8 w-full text-center mb-6">
          <div className="text-7xl mb-4">{grade}</div>
          <h2 className="text-3xl font-bold text-foreground mb-2">{gradeLabel}</h2>
          <p className="text-muted-foreground mb-6">
            {language === "ar"
              ? `أجبت بشكل صحيح على ${score} من ${total} سؤال`
              : `You answered ${score} out of ${total} correctly`}
          </p>

          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="flex flex-col items-center">
              <Trophy className="w-8 h-8 text-primary mb-1" />
              <span className="text-3xl font-bold text-primary">{score}</span>
              <span className="text-xs text-muted-foreground">{language === "ar" ? "صحيح" : "Correct"}</span>
            </div>
            <div className="w-px h-16 bg-border/30" />
            <div className="flex flex-col items-center">
              <XCircle className="w-8 h-8 text-destructive/70 mb-1" />
              <span className="text-3xl font-bold text-destructive/70">{total - score}</span>
              <span className="text-xs text-muted-foreground">{language === "ar" ? "خطأ" : "Wrong"}</span>
            </div>
            <div className="w-px h-16 bg-border/30" />
            <div className="flex flex-col items-center">
              <HelpCircle className="w-8 h-8 text-muted-foreground mb-1" />
              <span className="text-3xl font-bold text-foreground">{pct}%</span>
              <span className="text-xs text-muted-foreground">{language === "ar" ? "النتيجة" : "Score"}</span>
            </div>
          </div>

          <div className="h-3 rounded-full bg-border/30 mb-6 overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-1000"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <div className="flex gap-3 w-full">
          <button
            onClick={() => { setStarted(false); }}
            className="flex-1 py-3.5 rounded-2xl border border-border/50 text-foreground font-semibold hover:bg-white/5 transition flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            {language === "ar" ? "تغيير الفئة" : "Change Category"}
          </button>
          <button
            onClick={startQuiz}
            className="flex-1 py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/20 transition active:scale-95 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            {language === "ar" ? "حاول مجدداً" : "Try Again"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto min-h-full pb-24" dir={isDir}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {language === "ar" ? "الاختبار الإسلامي" : "Islamic Quiz"}
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {language === "ar"
              ? `السؤال ${qIndex + 1} من ${total}`
              : `Question ${qIndex + 1} of ${total}`}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
          <Trophy className="w-4 h-4" />
          <span className="font-bold">{score}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 rounded-full bg-border/30 mb-6 overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${((qIndex + (answered ? 1 : 0)) / total) * 100}%` }}
        />
      </div>

      {/* Category badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-card border border-border/40 text-xs text-muted-foreground mb-4">
        <BookOpen className="w-3 h-3" />
        {QUIZ_CATEGORIES.find(c => c.id === q.category)?.[language === "ar" ? "ar" : "label"]}
      </div>

      {/* Question */}
      <div className="glass-card rounded-3xl p-6 mb-5">
        <p className="text-lg md:text-xl font-semibold text-foreground leading-snug">
          {q.question}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-5">
        {q.options.map((opt, i) => {
          const isCorrect = i === q.answer;
          const isSelected = i === selected;
          let cls = "w-full p-4 rounded-2xl border text-left font-medium transition-all text-sm md:text-base ";
          if (!answered) {
            cls += "border-border/40 bg-card text-foreground hover:bg-white/5 hover:border-primary/40 active:scale-[0.98]";
          } else if (isCorrect) {
            cls += "border-green-500/60 bg-green-500/10 text-green-400";
          } else if (isSelected) {
            cls += "border-red-500/60 bg-red-500/10 text-red-400";
          } else {
            cls += "border-border/20 bg-card/50 text-muted-foreground opacity-60";
          }

          return (
            <button key={i} className={cls} onClick={() => handleSelect(i)}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                  !answered
                    ? "bg-white/10 text-muted-foreground"
                    : isCorrect
                    ? "bg-green-500/20 text-green-400"
                    : isSelected
                    ? "bg-red-500/20 text-red-400"
                    : "bg-white/5 text-muted-foreground"
                }`}>
                  {answered ? (isCorrect ? <CheckCircle2 className="w-4 h-4" /> : isSelected ? <XCircle className="w-4 h-4" /> : String.fromCharCode(65 + i)) : String.fromCharCode(65 + i)}
                </div>
                <span>{opt}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Explanation (shown after answering) */}
      {answered && (
        <div className="glass-card rounded-2xl p-5 mb-5 border border-primary/20">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
              <BookOpen className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="font-semibold text-sm text-primary mb-1">
                {language === "ar" ? "الشرح" : "Explanation"}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{q.explanation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Next button */}
      {answered && (
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          {qIndex < total - 1
            ? (language === "ar" ? "السؤال التالي" : "Next Question")
            : (language === "ar" ? "عرض النتائج" : "See Results")}
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
