import { useEffect, useState } from "react";
import { Bell, X, Volume2 } from "lucide-react";
import type { AdhanBannerState } from "@/hooks/use-adhan-alarm";
import { useI18n } from "@/lib/i18n";

const PRAYER_LABELS: Record<string, Record<string, string>> = {
  Fajr:    { en: "Fajr",    ar: "الفجر",  fr: "Fajr",    de: "Fajr"    },
  Dhuhr:   { en: "Dhuhr",   ar: "الظهر",  fr: "Dhuhr",   de: "Dhuhr"   },
  Asr:     { en: "Asr",     ar: "العصر",  fr: "Asr",     de: "Asr"     },
  Maghrib: { en: "Maghrib", ar: "المغرب", fr: "Maghrib", de: "Maghrib" },
  Isha:    { en: "Isha",    ar: "العشاء", fr: "Isha",    de: "Isha"    },
};

interface Props {
  banner: AdhanBannerState;
  onDismiss: () => void;
}

export function AdhanBanner({ banner, onDismiss }: Props) {
  const { language } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (banner.visible) {
      setVisible(true);
      return undefined;
    } else {
      const t = setTimeout(() => setVisible(false), 400);
      return () => clearTimeout(t);
    }
  }, [banner.visible]);

  if (!visible) return null;

  const name = PRAYER_LABELS[banner.prayer]?.[language] ?? banner.prayer;
  const isAr = language === "ar";

  const title = isAr
    ? `حان وقت صلاة ${name}`
    : language === "fr"
    ? `Heure de la prière ${name}`
    : language === "de"
    ? `Zeit für das ${name}-Gebet`
    : `Time for ${name} prayer`;

  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[9999] w-[calc(100%-2rem)] max-w-sm transition-all duration-400 ${
        banner.visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="glass-card rounded-2xl p-4 shadow-2xl border border-primary/30 bg-background/95 backdrop-blur-xl flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
          <Volume2 className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-foreground text-sm leading-tight">{title}</p>
          <p className="text-xs text-primary font-mono font-semibold mt-0.5">{banner.time}</p>
        </div>
        <button
          onClick={onDismiss}
          aria-label="Dismiss"
          className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-white/10 transition shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

interface NotifPromptProps {
  onAllow: () => void;
  onDismiss: () => void;
}

export function AdhanPermissionPrompt({ onAllow, onDismiss }: NotifPromptProps) {
  const { language } = useI18n();
  const isAr = language === "ar";
  return (
    <div
      className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-[9998] w-[calc(100%-2rem)] max-w-sm"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="glass-card rounded-2xl p-4 shadow-2xl border border-primary/20 bg-background/95 backdrop-blur-xl">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
            <Bell className="w-4 h-4 text-primary" />
          </div>
          <p className="text-sm text-foreground leading-snug">
            {isAr
              ? "فعّل الإشعارات لتلقي أذان الصلاة في وقتها"
              : language === "fr"
              ? "Activez les notifications pour recevoir l'appel à la prière"
              : language === "de"
              ? "Benachrichtigungen aktivieren für den Gebetsruf"
              : "Enable notifications to receive the Adhan at prayer times"}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onDismiss}
            className="flex-1 py-2 rounded-xl text-xs font-semibold text-muted-foreground border border-border/40 hover:bg-white/5 transition"
          >
            {isAr ? "لاحقاً" : language === "fr" ? "Plus tard" : language === "de" ? "Später" : "Later"}
          </button>
          <button
            onClick={onAllow}
            className="flex-1 py-2 rounded-xl text-xs font-semibold bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition"
          >
            {isAr ? "تفعيل" : language === "fr" ? "Activer" : language === "de" ? "Aktivieren" : "Allow"}
          </button>
        </div>
      </div>
    </div>
  );
}
