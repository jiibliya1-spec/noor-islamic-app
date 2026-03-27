import { useState } from "react";
import { Play, RotateCcw, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUpdateAdhkarProgress } from "@workspace/api-client-react";

// Hardcoded for demo, normally fetched from DB or localized
const ADHKAR_CATEGORIES = {
  morning: [
    { id: "m1", text: "اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا", count: 1 },
    { id: "m2", text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ", count: 100 },
  ],
  evening: [
    { id: "e1", text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ", count: 1 },
    { id: "e2", text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ", count: 100 },
  ]
};

export default function Adhkar() {
  const [activeTab, setActiveTab] = useState<keyof typeof ADHKAR_CATEGORIES>("morning");
  const [activeDhikrIdx, setActiveDhikrIdx] = useState(0);
  const [count, setCount] = useState(0);
  const { toast } = useToast();
  const updateMutation = useUpdateAdhkarProgress();

  const list = ADHKAR_CATEGORIES[activeTab];
  const activeDhikr = list[activeDhikrIdx];

  const handleTap = async () => {
    if (count < activeDhikr.count) {
      if ("vibrate" in navigator) navigator.vibrate(50);
      setCount(prev => prev + 1);
      
      // Auto advance
      if (count + 1 === activeDhikr.count) {
        if ("vibrate" in navigator) navigator.vibrate([100, 50, 100]);
        toast({ title: "Completed!", description: "Moving to next dhikr." });
        
        // Sync to backend (don't await, let it sync in bg)
        updateMutation.mutate({ 
          dhikrId: activeDhikr.id, 
          data: { count: count + 1, completed: true } 
        });

        setTimeout(() => {
          if (activeDhikrIdx < list.length - 1) {
            setActiveDhikrIdx(prev => prev + 1);
            setCount(0);
          }
        }, 1000);
      }
    }
  };

  const handleReset = () => {
    setCount(0);
  };

  const progressPct = (count / activeDhikr.count) * 100;

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-4xl font-bold text-foreground mb-8">Adhkar & Tasbeeh</h1>
      
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-none">
        {(Object.keys(ADHKAR_CATEGORIES) as Array<keyof typeof ADHKAR_CATEGORIES>).map(cat => (
          <button
            key={cat}
            onClick={() => { setActiveTab(cat); setActiveDhikrIdx(0); setCount(0); }}
            className={`px-6 py-3 rounded-full text-lg font-semibold capitalize whitespace-nowrap transition-colors ${
              activeTab === cat ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-card text-muted-foreground hover:bg-white/10'
            }`}
          >
            {cat} Adhkar
          </button>
        ))}
      </div>

      <div className="glass-card rounded-3xl p-8 flex flex-col items-center text-center">
        
        <div className="flex items-center gap-2 mb-6 text-muted-foreground font-medium">
          Dhikr {activeDhikrIdx + 1} of {list.length}
        </div>

        <h2 className="text-4xl md:text-5xl font-quran text-foreground leading-loose mb-12" dir="rtl">
          {activeDhikr.text}
        </h2>

        {/* Big Tasbeeh Button */}
        <div className="relative w-64 h-64 mb-8 cursor-pointer select-none" onClick={handleTap}>
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle cx="128" cy="128" r="120" className="stroke-background fill-transparent stroke-[8]" />
            <circle 
              cx="128" cy="128" r="120" 
              className="stroke-primary fill-transparent stroke-[8] transition-all duration-300"
              strokeDasharray="753.98"
              strokeDashoffset={753.98 - (753.98 * progressPct) / 100}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-card to-background shadow-inner flex flex-col items-center justify-center active:scale-95 transition-transform">
            {count === activeDhikr.count ? (
              <CheckCircle2 className="w-20 h-20 text-primary" />
            ) : (
              <>
                <span className="text-6xl font-bold text-foreground font-mono">{count}</span>
                <span className="text-lg text-muted-foreground">/ {activeDhikr.count}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <button onClick={handleReset} className="w-14 h-14 rounded-full bg-card hover:bg-white/10 flex items-center justify-center text-muted-foreground transition-colors">
            <RotateCcw className="w-6 h-6" />
          </button>
        </div>

      </div>
    </div>
  );
}
