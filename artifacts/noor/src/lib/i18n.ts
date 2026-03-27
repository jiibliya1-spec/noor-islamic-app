import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { createElement } from "react";

export type Language = "en" | "ar" | "fr" | "de";

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
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const I18nContext = createContext<I18nContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
  dir: "ltr",
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(
    () => (localStorage.getItem("noor_lang") as Language) || "en"
  );

  const setLanguage = (lang: Language) => {
    localStorage.setItem("noor_lang", lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    setLanguageState(lang);
  };

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, []);

  const t = (key: string): string => {
    return translations[key]?.[language] ?? key;
  };

  return createElement(I18nContext.Provider, { value: { language, setLanguage, t, dir: language === "ar" ? "rtl" : "ltr" } }, children);
}

export function useI18n() {
  return useContext(I18nContext);
}
