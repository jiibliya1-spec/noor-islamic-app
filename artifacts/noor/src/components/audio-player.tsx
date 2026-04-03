import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, SkipBack, SkipForward, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function pad3(n: number): string {
  return String(n).padStart(3, "0");
}

const RECITERS = [
  {
    id: "mishari",
    name: "Mishary Alafasy",
    nameAr: "مشاري العفاسي",
    url: (n: number) => `https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/${n}.mp3`,
  },
  {
    id: "khalid_jalil",
    name: "Khalid Al-Jalil",
    nameAr: "خالد الجليل",
    url: (n: number) => `https://server10.mp3quran.net/jleel/${pad3(n)}.mp3`,
  },
  {
    id: "yasser_dosari",
    name: "Yasser Al-Dosari",
    nameAr: "ياسر الدوسري",
    url: (n: number) => `https://server11.mp3quran.net/yasser/${pad3(n)}.mp3`,
  },
  {
    id: "islam_sobhi",
    name: "Islam Sobhi",
    nameAr: "إسلام صبحي",
    url: (n: number) => `https://server14.mp3quran.net/islam/Rewayat-Hafs-A-n-Assem/${pad3(n)}.mp3`,
  },
  {
    id: "abdul_basit",
    name: "Abdul Basit",
    nameAr: "عبد الباسط عبد الصمد",
    url: (n: number) => `https://download.quranicaudio.com/qdc/abdul_baset/mujawwad/${n}.mp3`,
  },
];

interface AudioPlayerProps {
  surahNumber: number;
  surahName: string;
}

export function AudioPlayer({ surahNumber, surahName }: AudioPlayerProps) {
  const [reciterId, setReciterId] = useState(RECITERS[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const reciter = RECITERS.find(r => r.id === reciterId) ?? RECITERS[0];
  const audioUrl = reciter.url(surahNumber);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      setIsPlaying(false);
      setProgress(0);
    }
  }, [audioUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(isNaN(p) ? 0 : p);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !audioRef.current.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = ratio * audioRef.current.duration;
  };

  const handleReciterChange = (id: string) => {
    setReciterId(id);
    setIsPlaying(false);
  };

  if (!visible) return null;

  return (
    <div className="sticky top-0 z-40 w-full bg-card/95 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        crossOrigin="anonymous"
      />

      <div className="flex items-center gap-2 px-3 py-2">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
          <Volume2 className="w-4 h-4 text-primary" />
        </div>

        <div className="flex-1 min-w-0 hidden sm:block">
          <p className="text-xs font-semibold text-foreground truncate leading-tight">{surahName}</p>
          <p className="text-[10px] text-muted-foreground truncate leading-tight">{reciter.nameAr}</p>
        </div>

        <Select value={reciterId} onValueChange={handleReciterChange}>
          <SelectTrigger className="h-7 w-[130px] text-xs bg-background/50 border-white/10 px-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {RECITERS.map(r => (
              <SelectItem key={r.id} value={r.id} className="text-xs">
                <span className="block leading-tight">{r.name}</span>
                <span className="block text-[10px] text-muted-foreground font-arabic">{r.nameAr}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-1 shrink-0">
          <button className="p-1 text-muted-foreground hover:text-foreground transition-colors">
            <SkipBack className="w-4 h-4" />
          </button>
          <button
            onClick={togglePlay}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:scale-105 transition-all"
          >
            {isPlaying
              ? <Pause className="w-4 h-4 fill-current" />
              : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>
          <button className="p-1 text-muted-foreground hover:text-foreground transition-colors">
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        <button onClick={() => setVisible(false)} className="p-1 text-muted-foreground hover:text-foreground transition-colors ml-1">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="h-1 bg-background/60 cursor-pointer" onClick={handleSeek}>
        <div className="h-full bg-primary transition-all duration-100" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
