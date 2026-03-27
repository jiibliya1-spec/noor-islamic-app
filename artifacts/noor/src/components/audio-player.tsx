import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, SkipBack, SkipForward } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const RECITERS = [
  { id: "ar.alafasy", name: "Mishary Rashid Alafasy" },
  { id: "ar.abdurrahmansudais", name: "Abdul Rahman Al-Sudais" },
  { id: "ar.mahermuaiqly", name: "Maher Al Muaiqly" },
];

interface AudioPlayerProps {
  surahNumber: number;
  surahName: string;
}

export function AudioPlayer({ surahNumber, surahName }: AudioPlayerProps) {
  const [reciter, setReciter] = useState(RECITERS[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const audioUrl = `https://cdn.islamic.network/quran/audio-surah/128/${reciter}/${surahNumber}.mp3`;

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
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-card/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-4 flex flex-col md:flex-row items-center gap-4 z-50">
      <audio 
        ref={audioRef} 
        src={audioUrl} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
      
      <div className="flex items-center gap-4 flex-1 w-full">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
          <Volume2 className="w-6 h-6 text-primary" />
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <span className="font-bold text-foreground truncate">{surahName}</span>
          
          <div className="w-full h-1.5 bg-background rounded-full mt-2 overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-100" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end shrink-0">
        <Select value={reciter} onValueChange={setReciter}>
          <SelectTrigger className="w-[160px] bg-background/50 border-white/10">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {RECITERS.map(r => (
              <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
            <SkipBack className="w-5 h-5" />
          </button>
          <button 
            onClick={togglePlay}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:scale-105 hover:shadow-lg hover:shadow-primary/30 transition-all"
          >
            {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
          </button>
          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
            <SkipForward className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
