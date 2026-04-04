import { useEffect, useRef, useState, useCallback } from "react";

const ADHAN_URL       = "https://www.islamcan.com/audio/adhan/azan1.mp3";
const FAJR_ADHAN_URL  = "https://www.islamcan.com/audio/adhan/fajrazan.mp3";
const PRAYERS         = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;
const TIMINGS_KEY     = "noor_prayer_timings";
const ENABLED_KEY     = "noor_adhan_enabled";

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

export function isAdhanEnabled(): boolean {
  try {
    const v = localStorage.getItem(ENABLED_KEY);
    return v === null ? true : v === "true";
  } catch {
    return true;
  }
}

export function setAdhanEnabled(enabled: boolean): void {
  try {
    localStorage.setItem(ENABLED_KEY, String(enabled));
  } catch {}
}

export function savePrayerTimings(timings: Record<string, string>): void {
  try {
    localStorage.setItem(TIMINGS_KEY, JSON.stringify(timings));
    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: "PRAYER_TIMINGS",
        timings,
      });
    }
  } catch {}
}

export function requestAdhanPermission(): void {
  if (typeof window === "undefined") return;
  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission();
  }
}

export interface AdhanBannerState {
  visible: boolean;
  prayer: string;
  time: string;
}

export function useAdhanAlarm(
  timings: Record<string, string> | null | undefined,
  language: string
) {
  const firedRef  = useRef<Set<string>>(new Set());
  const audioRef  = useRef<HTMLAudioElement | null>(null);
  const fajrRef   = useRef<HTMLAudioElement | null>(null);

  const [banner, setBanner] = useState<AdhanBannerState>({
    visible: false,
    prayer: "",
    time: "",
  });

  const dismissBanner = useCallback(() => {
    setBanner(prev => ({ ...prev, visible: false }));
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
    if (fajrRef.current)  { fajrRef.current.pause();  fajrRef.current.currentTime  = 0; }
  }, []);

  useEffect(() => {
    const getTimings = (): Record<string, string> | null => {
      if (timings) return timings;
      try {
        const raw = localStorage.getItem(TIMINGS_KEY);
        return raw ? JSON.parse(raw) : null;
      } catch {
        return null;
      }
    };

    const check = () => {
      if (!isAdhanEnabled()) return;
      const t = getTimings();
      if (!t) return;

      const now  = new Date();
      const hhmm = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      const day  = now.toDateString();

      for (const prayer of PRAYERS) {
        const pTime = (t[prayer] ?? "").slice(0, 5);
        if (pTime !== hhmm) continue;

        const key = `${day}-${prayer}-${hhmm}`;
        if (firedRef.current.has(key)) continue;
        firedRef.current.add(key);

        const isFajr = prayer === "Fajr";

        try {
          const audioUrl = isFajr ? FAJR_ADHAN_URL : ADHAN_URL;
          const ref      = isFajr ? fajrRef : audioRef;
          if (!ref.current) {
            const a = new Audio();
            a.crossOrigin = "anonymous";
            a.src = audioUrl;
            ref.current = a;
          }
          ref.current.currentTime = 0;
          ref.current.play().catch(() => {});
        } catch {}

        setBanner({ visible: true, prayer, time: pTime });

        if ("Notification" in window && Notification.permission === "granted") {
          try {
            new Notification(alarmTitle(prayer, language), {
              body: pTime,
              icon: "/noor/images/noor-logo.png",
              tag:  key,
            });
          } catch {}
        }
      }
    };

    check();
    const id = setInterval(check, 30_000);
    return () => clearInterval(id);
  }, [timings, language]);

  return { banner, dismissBanner };
}
