import { useEffect, useRef } from "react";

const ADHAN_URL = "https://www.islamcan.com/audio/adhan/azan1.mp3";
const PRAYERS   = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;

const PRAYER_LABELS: Record<string, Record<string, string>> = {
  Fajr:    { en: "Fajr",    ar: "الفجر",  fr: "Fajr",    de: "Fajr"    },
  Dhuhr:   { en: "Dhuhr",   ar: "الظهر",  fr: "Dhuhr",   de: "Dhuhr"   },
  Asr:     { en: "Asr",     ar: "العصر",  fr: "Asr",     de: "Asr"     },
  Maghrib: { en: "Maghrib", ar: "المغرب", fr: "Maghrib", de: "Maghrib" },
  Isha:    { en: "Isha",    ar: "العشاء", fr: "Isha",    de: "Isha"    },
};

function alarmTitle(prayer: string, lang: string) {
  const name = PRAYER_LABELS[prayer]?.[lang] ?? prayer;
  if (lang === "ar") return `حان وقت صلاة ${name}`;
  if (lang === "fr") return `Heure de la prière ${name}`;
  if (lang === "de") return `Zeit für das ${name}-Gebet`;
  return `Time for ${name} prayer`;
}

export function requestAdhanPermission() {
  if (typeof window === "undefined") return;
  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission();
  }
}

export function useAdhanAlarm(
  timings: Record<string, string> | null | undefined,
  language: string
) {
  const firedRef = useRef<Set<string>>(new Set());
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!timings) return;

    const check = () => {
      const now  = new Date();
      const hhmm = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      const day  = now.toDateString();

      for (const prayer of PRAYERS) {
        const pTime = (timings[prayer] ?? "").slice(0, 5);
        if (pTime !== hhmm) continue;

        const key = `${day}-${prayer}-${hhmm}`;
        if (firedRef.current.has(key)) continue;
        firedRef.current.add(key);

        // Play Adhan
        try {
          if (!audioRef.current) {
            const a = new Audio();
            a.crossOrigin = "anonymous";
            a.src = ADHAN_URL;
            audioRef.current = a;
          }
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(() => {
            // Autoplay blocked — try after user gesture fallback
          });
        } catch {/* silently ignore */}

        // Show notification
        if ("Notification" in window && Notification.permission === "granted") {
          try {
            new Notification(alarmTitle(prayer, language), {
              body: pTime,
              icon: "/noor/images/noor-logo.png",
              tag:  key,
            });
          } catch {/* silently ignore */}
        }
      }
    };

    check();
    const id = setInterval(check, 30_000);
    return () => clearInterval(id);
  }, [timings, language]);
}
