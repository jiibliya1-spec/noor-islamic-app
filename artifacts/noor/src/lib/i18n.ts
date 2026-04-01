import { createContext, useContext, useState, useEffect, type ReactNode, createElement } from "react";

export type Language = "en" | "ar" | "fr" | "de";
export type Theme = "dark" | "light" | "system";

export const translations: Record<string, Record<Language, string>> = {
  home: { en: "Home", ar: "الرئيسية", fr: "Accueil", de: "Startseite" },
  quran: { en: "Quran", ar: "القرآن", fr: "Coran", de: "Koran" },
  prayerTimes: { en: "Prayer Times", ar: "مواقيت الصلاة", fr: "Heures de Prière", de: "Gebetszeiten" },
  adhkar: { en: "Adhkar", ar: "الأذكار", fr: "Adhkar", de: "Dhikr" },
  calendar: { en: "Calendar", ar: "التقويم", fr: "Calendrier", de: "Kalender" },
  mosques: { en: "Mosques", ar: "المساجد", fr: "Mosquées", de: "Moscheen" },
  dashboard: { en: "Dashboard", ar: "لوحة القيادة", fr: "Tableau de bord", de: "Dashboard" },
  settings: { en: "Settings", ar: "الإعدادات", fr: "Paramètres", de: "Einstellungen" },
  login: { en: "Login", ar: "تسجيل الدخول", fr: "Connexion", de: "Anmelden" },
  logout: { en: "Logout", ar: "تسجيل الخروج", fr: "Déconnexion", de: "Abmelden" },
  register: { en: "Register", ar: "إنشاء حساب", fr: "S'inscrire", de: "Registrieren" },
  nextPrayer: { en: "Next Prayer", ar: "الصلاة القادمة", fr: "Prochaine Prière", de: "Nächstes Gebet" },
  verseOfDay: { en: "Verse of the Day", ar: "آية اليوم", fr: "Verset du Jour", de: "Vers des Tages" },
  readMore: { en: "Read More", ar: "اقرأ المزيد", fr: "Lire la suite", de: "Weiterlesen" },
  searchCity: { en: "Search City", ar: "البحث عن مدينة", fr: "Chercher une ville", de: "Stadt suchen" },
  findNearMe: { en: "Find Near Me", ar: "ابحث بالقرب مني", fr: "Trouver près de moi", de: "En trouver près de moi" },
  morning: { en: "Morning", ar: "الصباح", fr: "Matin", de: "Morgen" },
  evening: { en: "Evening", ar: "المساء", fr: "Soir", de: "Abend" },
  sleep: { en: "Sleep", ar: "النوم", fr: "Sommeil", de: "Schlaf" },
  afterPrayer: { en: "After Prayer", ar: "بعد الصلاة", fr: "Après la Prière", de: "Nach dem Gebet" },
  daily: { en: "Daily", ar: "يومي", fr: "Quotidien", de: "Täglich" },
  completed: { en: "Completed!", ar: "اكتمل!", fr: "Terminé!", de: "Abgeschlossen!" },
  reset: { en: "Reset", ar: "إعادة", fr: "Réinitialiser", de: "Zurücksetzen" },
  language: { en: "Language", ar: "اللغة", fr: "Langue", de: "Sprache" },
  addEvent: { en: "Add Event", ar: "إضافة حدث", fr: "Ajouter un événement", de: "Ereignis hinzufügen" },
  islamicCalendar: { en: "Islamic Calendar", ar: "التقويم الإسلامي", fr: "Calendrier Islamique", de: "Islamischer Kalender" },
  appearance: { en: "Appearance", ar: "المظهر", fr: "Apparence", de: "Erscheinungsbild" },
  darkMode: { en: "Dark", ar: "داكن", fr: "Sombre", de: "Dunkel" },
  lightMode: { en: "Light", ar: "فاتح", fr: "Clair", de: "Hell" },
  systemMode: { en: "System", ar: "النظام", fr: "Système", de: "System" },
  quickAccess: { en: "Quick Access", ar: "وصول سريع", fr: "Accès rapide", de: "Schnellzugriff" },
  backToSurahs: { en: "Back to Surahs", ar: "العودة للسور", fr: "Retour aux sourates", de: "Zurück zu Suren" },
  notLoggedIn: { en: "Not logged in", ar: "غير مسجل", fr: "Non connecté", de: "Nicht angemeldet" },
  loginToSync: { en: "Login to sync your progress", ar: "سجّل دخولك لمزامنة تقدمك", fr: "Connectez-vous pour synchroniser", de: "Anmelden zum Synchronisieren" },
  prayerNotifications: { en: "Prayer Notifications", ar: "إشعارات الصلاة", fr: "Notifications de Prière", de: "Gebetsbenachrichtigungen" },
  comingSoon: { en: "Coming soon", ar: "قريباً", fr: "Bientôt disponible", de: "Demnächst" },
  mosqueFinder: { en: "Mosque Finder", ar: "البحث عن مسجد", fr: "Chercher mosquée", de: "Moschee finden" },
  findNearbyMosques: { en: "Find nearby mosques", ar: "ابحث عن مساجد قريبة", fr: "Trouver des mosquées proches", de: "Nahe Moscheen finden" },
};

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "system") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.classList.remove("light", "dark");
    root.classList.add(prefersDark ? "dark" : "light");
  } else {
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }
}

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const I18nContext = createContext<I18nContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
  dir: "ltr",
  theme: "dark",
  setTheme: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(
    () => (localStorage.getItem("noor_lang") as Language) || "en"
  );
  const [theme, setThemeState] = useState<Theme>(
    () => (localStorage.getItem("noor_theme") as Theme) || "dark"
  );

  const setLanguage = (lang: Language) => {
    localStorage.setItem("noor_lang", lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    setLanguageState(lang);
  };

  const setTheme = (t: Theme) => {
    localStorage.setItem("noor_theme", t);
    applyTheme(t);
    setThemeState(t);
  };

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
    applyTheme(theme);

    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyTheme("system");
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
    return undefined;
  }, []);

  const t = (key: string): string => {
    return translations[key]?.[language] ?? key;
  };

  return createElement(
    I18nContext.Provider,
    { value: { language, setLanguage, t, dir: language === "ar" ? "rtl" : "ltr", theme, setTheme } },
    children
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
