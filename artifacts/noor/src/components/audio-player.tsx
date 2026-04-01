import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, SkipBack, SkipForward, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const RECITERS = [
  { id: "ar.alafasy", name: "Mishary Alafasy" },
  { id: "ar.abdurrahmansudais", name: "Al-Sudais" },
  { id: "ar.mahermuaiqly", name: "Maher Muaiqly" },
];

interface AudioPlayerProps {
  surahNumber: number;
  surahName: string;
}

export function AudioPlayer({ surahNumber, surahName }: AudioPlayerProps) {
  const [reciter, setReciter] = useState(RECITERS[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
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

  if (!visible) return null;

  return (
    <div className="sticky top-0 z-40 w-full bg-card/95 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="flex items-center gap-2 px-3 py-2">
        {/* Icon + surah info */}
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
          <Volume2 className="w-4 h-4 text-primary" />
        </div>

        <div className="flex-1 min-w-0 hidden sm:block">
          <p className="text-xs font-semibold text-foreground truncate leading-tight">{surahName}</p>
        </div>

        {/* Reciter select */}
        <Select value={reciter} onValueChange={(v) => { setReciter(v); setIsPlaying(false); }}>
          <SelectTrigger className="h-7 w-[110px] text-xs bg-background/50 border-white/10 px-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {RECITERS.map(r => (
              <SelectItem key={r.id} value={r.id} className="text-xs">{r.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Controls */}
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

        {/* Close */}
        <button onClick={() => setVisible(false)} className="p-1 text-muted-foreground hover:text-foreground transition-colors ml-1">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress bar */}
      <div
        className="h-1 bg-background/60 cursor-pointer"
        onClick={handleSeek}
      >
        <div
          className="h-full bg-primary transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
