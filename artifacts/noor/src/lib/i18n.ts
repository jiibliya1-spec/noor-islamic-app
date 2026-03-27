import { create } from "zustand";

type Language = "en" | "ar" | "fr" | "de";

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

export const translations: Translations = {
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
  nextPrayer: { en: "Next Prayer", ar: "الصلاة القادمة", fr: "Prochaine Prière", de: "Nächstes Gebet" },
  verseOfDay: { en: "Verse of the Day", ar: "آية اليوم", fr: "Verset du Jour", de: "Vers des Tages" },
  readMore: { en: "Read More", ar: "اقرأ المزيد", fr: "Lire la suite", de: "Weiterlesen" },
  searchCity: { en: "Search City", ar: "البحث عن مدينة", fr: "Chercher une ville", de: "Stadt suchen" },
  findNearMe: { en: "Find Near Me", ar: "ابحث بالقرب مني", fr: "Trouver près de moi", de: "In meiner Nähe finden" },
};

interface I18nState {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations | string) => string;
}

export const useI18n = create<I18nState>((set, get) => ({
  language: (localStorage.getItem("noor_lang") as Language) || "en",
  setLanguage: (lang) => {
    localStorage.setItem("noor_lang", lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    set({ language: lang });
  },
  t: (key) => {
    const lang = get().language;
    if (translations[key] && translations[key][lang]) {
      return translations[key][lang];
    }
    return key as string; // fallback
  },
}));
