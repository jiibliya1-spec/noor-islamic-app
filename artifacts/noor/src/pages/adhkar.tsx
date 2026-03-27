import { useState, useCallback } from "react";
import { RotateCcw, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useToast } from "@/hooks/use-toast";

interface Dhikr {
  id: string;
  arabic: string;
  translation: string;
  transliteration?: string;
  count: number;
}

const ADHKAR: Record<string, Dhikr[]> = {
  morning: [
    {
      id: "m1", count: 1,
      arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
      translation: "I seek refuge in Allah from the accursed devil.",
      transliteration: "A'udhu billahi min ash-shaytaan ir-rajeem",
    },
    {
      id: "m2", count: 1,
      arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
      translation: "O Allah, by You we enter the morning and by You we enter the evening, by You we live and by You we die, and to You is the Resurrection.",
      transliteration: "Allahumma bika asbahna wa bika amsayna wa bika nahya wa bika namutu wa ilayk an-nushur",
    },
    {
      id: "m3", count: 100,
      arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
      translation: "Glory be to Allah and praise be to Him.",
      transliteration: "SubhanAllahi wa bihamdih",
    },
    {
      id: "m4", count: 100,
      arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
      translation: "There is none worthy of worship in truth except Allah Alone, He has no partners, to Him belongs the dominion, and to Him belongs all praise, and He is Able to do all things.",
      transliteration: "La ilaha illallahu wahdahu la sharika lahu, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir",
    },
    {
      id: "m5", count: 3,
      arabic: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي",
      translation: "O Allah, grant me health in my body. O Allah, grant me health in my hearing. O Allah, grant me health in my sight.",
      transliteration: "Allahumma 'afini fi badani, Allahumma 'afini fi sam'i, Allahumma 'afini fi basari",
    },
    {
      id: "m6", count: 1,
      arabic: "حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
      translation: "Allah is sufficient for me. There is none worthy of worship but He. I have placed my trust in Him; He is Lord of the Majestic Throne.",
      transliteration: "Hasbiyallahu la ilaha illa huwa 'alayhi tawakkaltu wa huwa rabbul 'arshil 'azim",
    },
  ],
  evening: [
    {
      id: "e1", count: 1,
      arabic: "اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ",
      translation: "O Allah, by You we enter the evening and by You we enter the morning, by You we live and by You we die, and to You is the return.",
      transliteration: "Allahumma bika amsayna wa bika asbahna wa bika nahya wa bika namutu wa ilayk al-masir",
    },
    {
      id: "e2", count: 1,
      arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ",
      translation: "We have entered the evening and the entire dominion belongs to Allah, and all praise is for Allah.",
      transliteration: "Amsayna wa amsal-mulku lillahi walhamdu lillah",
    },
    {
      id: "e3", count: 100,
      arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
      translation: "Glory be to Allah and praise be to Him.",
      transliteration: "SubhanAllahi wa bihamdih",
    },
    {
      id: "e4", count: 7,
      arabic: "حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
      translation: "Allah is sufficient for me. There is none worthy of worship but He. I have placed my trust in Him.",
      transliteration: "Hasbiyallahu la ilaha illa huwa 'alayhi tawakkaltu wa huwa rabbul 'arshil 'azim",
    },
    {
      id: "e5", count: 1,
      arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ",
      translation: "O Allah, You are my Lord, there is none worthy of worship but You. You created me and I am Your servant.",
      transliteration: "Allahumma anta rabbi la ilaha illa anta, khalaqtani wa ana 'abduka",
    },
  ],
  sleep: [
    {
      id: "s1", count: 1,
      arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
      translation: "In Your name O Allah, I die and I live.",
      transliteration: "Bismika Allahumma amutu wa ahya",
    },
    {
      id: "s2", count: 3,
      arabic: "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ",
      translation: "O Allah, protect me from Your punishment on the Day when You resurrect Your servants.",
      transliteration: "Allahumma qini 'adhabaka yawma tab'athu 'ibadak",
    },
    {
      id: "s3", count: 33,
      arabic: "سُبْحَانَ اللَّهِ",
      translation: "Glory be to Allah.",
      transliteration: "SubhanAllah",
    },
    {
      id: "s4", count: 33,
      arabic: "الْحَمْدُ لِلَّهِ",
      translation: "All praise is for Allah.",
      transliteration: "Alhamdulillah",
    },
    {
      id: "s5", count: 34,
      arabic: "اللَّهُ أَكْبَرُ",
      translation: "Allah is the Greatest.",
      transliteration: "Allahu Akbar",
    },
  ],
  afterPrayer: [
    {
      id: "ap1", count: 3,
      arabic: "أَسْتَغْفِرُ اللَّهَ",
      translation: "I seek forgiveness from Allah.",
      transliteration: "Astaghfirullah",
    },
    {
      id: "ap2", count: 1,
      arabic: "اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",
      translation: "O Allah, You are Peace and from You is peace. Blessed are You, O Possessor of majesty and honor.",
      transliteration: "Allahumma antas-salamu wa minkas-salamu tabarakta ya dhal-jalali wal-ikram",
    },
    {
      id: "ap3", count: 33,
      arabic: "سُبْحَانَ اللَّهِ",
      translation: "Glory be to Allah.",
      transliteration: "SubhanAllah",
    },
    {
      id: "ap4", count: 33,
      arabic: "الْحَمْدُ لِلَّهِ",
      translation: "All praise is for Allah.",
      transliteration: "Alhamdulillah",
    },
    {
      id: "ap5", count: 34,
      arabic: "اللَّهُ أَكْبَرُ",
      translation: "Allah is the Greatest.",
      transliteration: "Allahu Akbar",
    },
  ],
  daily: [
    {
      id: "d1", count: 3,
      arabic: "بِسْمِ اللَّهِ",
      translation: "In the name of Allah.",
      transliteration: "Bismillah",
    },
    {
      id: "d2", count: 100,
      arabic: "لَا إِلَهَ إِلَّا اللَّهُ",
      translation: "There is none worthy of worship except Allah.",
      transliteration: "La ilaha illallah",
    },
    {
      id: "d3", count: 10,
      arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ",
      translation: "O Allah, send blessings upon Muhammad.",
      transliteration: "Allahumma salli 'ala Muhammad",
    },
    {
      id: "d4", count: 100,
      arabic: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ",
      translation: "I seek the forgiveness of Allah and I turn to Him in repentance.",
      transliteration: "Astaghfirullaha wa atubu ilayh",
    },
  ],
};

const CATEGORY_LABELS: Record<string, Record<string, string>> = {
  morning: { en: "Morning", ar: "الصباح", fr: "Matin", de: "Morgen" },
  evening: { en: "Evening", ar: "المساء", fr: "Soir", de: "Abend" },
  sleep: { en: "Sleep", ar: "النوم", fr: "Sommeil", de: "Schlaf" },
  afterPrayer: { en: "After Prayer", ar: "بعد الصلاة", fr: "Après Salat", de: "Nach Gebet" },
  daily: { en: "Daily", ar: "يومي", fr: "Quotidien", de: "Täglich" },
};

export default function Adhkar() {
  const { language } = useI18n();
  const [activeCategory, setActiveCategory] = useState("morning");
  const [dhikrIndex, setDhikrIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [showTranslit, setShowTranslit] = useState(false);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const list = ADHKAR[activeCategory];
  const dhikr = list[dhikrIndex];
  const progressPct = Math.min((count / dhikr.count) * 100, 100);
  const isComplete = count >= dhikr.count;

  const handleTap = useCallback(() => {
    if (isComplete) return;
    if ("vibrate" in navigator) navigator.vibrate(30);
    const newCount = count + 1;
    setCount(newCount);

    if (newCount >= dhikr.count) {
      if ("vibrate" in navigator) navigator.vibrate([80, 40, 80]);
      setCompletedIds(prev => new Set([...prev, dhikr.id]));
      toast({ title: language === "ar" ? "اكتمل! 🌟" : "Completed! 🌟", description: dhikr.arabic });
    }
  }, [count, dhikr, isComplete, language, toast]);

  const goNext = () => {
    if (dhikrIndex < list.length - 1) {
      setDhikrIndex(prev => prev + 1);
      setCount(0);
    }
  };

  const goPrev = () => {
    if (dhikrIndex > 0) {
      setDhikrIndex(prev => prev - 1);
      setCount(0);
    }
  };

  const handleReset = () => {
    setCount(0);
    setCompletedIds(prev => { const s = new Set(prev); s.delete(dhikr.id); return s; });
  };

  const switchCategory = (cat: string) => {
    setActiveCategory(cat);
    setDhikrIndex(0);
    setCount(0);
  };

  const strokeDash = 2 * Math.PI * 110;

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto min-h-full pb-20" dir={language === "ar" ? "rtl" : "ltr"}>
      <h1 className="text-4xl font-bold text-foreground mb-8">
        {language === "ar" ? "الأذكار والتسبيح" : "Adhkar & Tasbeeh"}
      </h1>

      {/* Category Tabs */}
      <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-none">
        {Object.keys(ADHKAR).map(cat => {
          const label = CATEGORY_LABELS[cat][language] ?? CATEGORY_LABELS[cat]["en"];
          const done = ADHKAR[cat].every(d => completedIds.has(d.id));
          return (
            <button
              key={cat}
              onClick={() => switchCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-card text-muted-foreground hover:bg-white/10"
              }`}
            >
              {done && <CheckCircle2 className="w-4 h-4" />}
              {label}
            </button>
          );
        })}
      </div>

      {/* Main Card */}
      <div className="glass-card rounded-3xl p-6 md:p-10 flex flex-col items-center text-center">
        {/* Counter info */}
        <div className="flex items-center justify-between w-full mb-6 text-sm text-muted-foreground font-medium">
          <button onClick={goPrev} disabled={dhikrIndex === 0} className="p-2 rounded-full hover:bg-white/10 disabled:opacity-30 transition">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span>{language === "ar" ? `الذكر ${dhikrIndex + 1} من ${list.length}` : `Dhikr ${dhikrIndex + 1} of ${list.length}`}</span>
          <button onClick={goNext} disabled={dhikrIndex === list.length - 1} className="p-2 rounded-full hover:bg-white/10 disabled:opacity-30 transition">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Arabic Text */}
        <p className="text-3xl md:text-4xl font-quran text-foreground leading-loose mb-4 text-center" dir="rtl">
          {dhikr.arabic}
        </p>

        {/* Translation */}
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-2 max-w-xl">
          {dhikr.translation}
        </p>

        {/* Transliteration toggle */}
        {dhikr.transliteration && (
          <button
            onClick={() => setShowTranslit(p => !p)}
            className="text-xs text-primary underline mb-6"
          >
            {showTranslit ? "Hide" : "Show"} transliteration
          </button>
        )}
        {showTranslit && dhikr.transliteration && (
          <p className="text-sm italic text-muted-foreground mb-6">{dhikr.transliteration}</p>
        )}

        {/* Tasbeeh Counter Circle */}
        <div
          className="relative cursor-pointer select-none mb-8 active:scale-95 transition-transform"
          style={{ width: 240, height: 240 }}
          onClick={handleTap}
        >
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 240 240">
            <circle cx="120" cy="120" r="110" className="stroke-background fill-transparent" strokeWidth="10" />
            <circle
              cx="120" cy="120" r="110"
              className="fill-transparent transition-all duration-300"
              stroke={isComplete ? "hsl(var(--primary))" : "hsl(var(--primary))"}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={strokeDash}
              strokeDashoffset={strokeDash - (strokeDash * progressPct) / 100}
            />
          </svg>
          <div className="absolute inset-3 rounded-full bg-gradient-to-br from-card to-background shadow-inner flex flex-col items-center justify-center">
            {isComplete ? (
              <div className="flex flex-col items-center">
                <CheckCircle2 className="w-16 h-16 text-primary mb-1" />
                <span className="text-primary font-semibold text-sm">
                  {language === "ar" ? "اكتمل" : "Done!"}
                </span>
              </div>
            ) : (
              <>
                <span className="text-5xl font-bold text-foreground font-mono">{count}</span>
                <span className="text-lg text-muted-foreground">/ {dhikr.count}</span>
                <span className="text-xs text-muted-foreground/60 mt-1">
                  {language === "ar" ? "انقر للعدّ" : "Tap to count"}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-4 items-center">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-card text-muted-foreground hover:bg-white/10 transition text-sm font-medium"
          >
            <RotateCcw className="w-4 h-4" />
            {language === "ar" ? "إعادة" : "Reset"}
          </button>
          {isComplete && dhikrIndex < list.length - 1 && (
            <button
              onClick={goNext}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition text-sm font-medium"
            >
              {language === "ar" ? "التالي" : "Next Dhikr"}
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Progress list */}
      <div className="mt-8 glass-card rounded-3xl p-6">
        <h3 className="font-bold text-lg mb-4 text-foreground">
          {language === "ar" ? "التقدم في الجلسة" : "Session Progress"}
        </h3>
        <div className="space-y-3">
          {list.map((d, i) => {
            const done = completedIds.has(d.id);
            const active = i === dhikrIndex;
            return (
              <button
                key={d.id}
                onClick={() => { setDhikrIndex(i); setCount(done ? d.count : 0); }}
                className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all text-left ${
                  active ? "bg-primary/20 border border-primary/40" : "hover:bg-white/5"
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                  done ? "bg-primary text-primary-foreground" : active ? "bg-primary/20 text-primary" : "bg-white/10 text-muted-foreground"
                }`}>
                  {done ? "✓" : i + 1}
                </div>
                <span className="text-sm font-quran text-foreground truncate" dir="rtl">{d.arabic}</span>
                <span className="text-xs text-muted-foreground ml-auto shrink-0">×{d.count}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
