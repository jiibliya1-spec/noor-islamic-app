import { createContext, useContext, useState, useEffect, type ReactNode, createElement } from "react";

export type Language = "en" | "ar" | "fr" | "de";
export type Theme = "dark" | "light" | "system";

export const translations: Record<string, Record<Language, string>> = {
  // Navigation
  home:             { en: "Home",             ar: "الرئيسية",          fr: "Accueil",             de: "Startseite" },
  quran:            { en: "Quran",            ar: "القرآن",             fr: "Coran",               de: "Koran" },
  prayerTimes:      { en: "Prayer Times",     ar: "مواقيت الصلاة",     fr: "Heures de Prière",    de: "Gebetszeiten" },
  adhkar:           { en: "Adhkar",           ar: "الأذكار",            fr: "Adhkar",              de: "Dhikr" },
  calendar:         { en: "Calendar",         ar: "التقويم",            fr: "Calendrier",          de: "Kalender" },
  mosques:          { en: "Mosques",          ar: "المساجد",            fr: "Mosquées",            de: "Moscheen" },
  dashboard:        { en: "Dashboard",        ar: "لوحة القيادة",       fr: "Tableau de bord",     de: "Dashboard" },
  settings:         { en: "Settings",         ar: "الإعدادات",          fr: "Paramètres",          de: "Einstellungen" },
  login:            { en: "Login",            ar: "تسجيل الدخول",       fr: "Connexion",           de: "Anmelden" },
  logout:           { en: "Logout",           ar: "تسجيل الخروج",       fr: "Déconnexion",         de: "Abmelden" },
  register:         { en: "Register",         ar: "إنشاء حساب",         fr: "S'inscrire",          de: "Registrieren" },
  quiz:             { en: "Islamic Quiz",     ar: "الاختبار الإسلامي",  fr: "Quiz Islamique",      de: "Islamisches Quiz" },
  stories:          { en: "Islamic Stories",  ar: "القصص الإسلامية",    fr: "Histoires Islamiques", de: "Islamische Geschichten" },
  tajweed:          { en: "Tajweed",          ar: "التجويد",             fr: "Tajweed",              de: "Tajweed" },

  // Prayer Times page
  myLocation:       { en: "My Location",      ar: "موقعي الحالي",      fr: "Ma position",         de: "Mein Standort" },
  searchCity:       { en: "Search City",      ar: "البحث عن مدينة",    fr: "Chercher une ville",  de: "Stadt suchen" },
  search:           { en: "Search",           ar: "بحث",               fr: "Rechercher",          de: "Suchen" },
  calculationMethod:{ en: "Calculation Method", ar: "طريقة الحساب",   fr: "Méthode de calcul",   de: "Berechnungsmethode" },
  liveCompass:      { en: "Live Compass",     ar: "البوصلة مباشرة",    fr: "Boussole en direct",  de: "Live-Kompass" },
  staticBearing:    { en: "Static Bearing",   ar: "اتجاه ثابت",        fr: "Relèvement fixe",     de: "Statische Peilung" },
  qiblaDirection:   { en: "Qibla Direction",  ar: "اتجاه القبلة",      fr: "Direction Qibla",     de: "Qibla-Richtung" },
  fromNorth:        { en: "from North",       ar: "من الشمال",          fr: "depuis le Nord",      de: "vom Norden" },
  rotateToAlign:    { en: "Rotate phone until the needle points at the Kaaba", ar: "أدر الهاتف حتى يشير السهم إلى الكعبة", fr: "Tournez jusqu'à ce que l'aiguille pointe vers la Kaaba", de: "Drehen bis die Nadel zur Kaaba zeigt" },
  needlePointsMakkah: { en: "The needle points toward Makkah", ar: "السهم يشير نحو مكة", fr: "L'aiguille pointe vers La Mecque", de: "Die Nadel zeigt nach Mekka" },
  enableCompassLive: { en: "Enable compass for live tracking", ar: "فعّل البوصلة للتتبع المباشر", fr: "Activez la boussole pour le suivi en direct", de: "Kompass für Live-Tracking aktivieren" },
  qiblaIs:          { en: "Qibla is",         ar: "القبلة على بُعد",   fr: "La Qibla est à",      de: "Qibla liegt bei" },

  // Desktop static Qibla panel
  qiblaDesktopPre:  { en: "Qibla is",         ar: "القبلة تبعد",       fr: "La Qibla est à",      de: "Qibla liegt bei" },
  qiblaDesktopSuf:  { en: "from True North",  ar: "من الشمال الحقيقي", fr: "du Nord géographique", de: "vom wahren Norden" },
  findNorthPre:     { en: "Use your phone's compass or look at the sun to find North, then turn", ar: "استخدم بوصلة هاتفك أو انظر إلى الشمس لتحديد اتجاه الشمال، ثم اتجه", fr: "Utilisez la boussole de votre téléphone ou le soleil pour trouver le Nord, puis tournez", de: "Nutzen Sie Ihren Handykompass oder die Sonne um Norden zu finden, dann drehen Sie sich" },
  findNorthSuf:     { en: "clockwise",         ar: "نحو اليمين",         fr: "vers la droite",       de: "im Uhrzeigersinn" },
  openOnPhone:      { en: "Open on your phone for the live compass", ar: "افتح على هاتفك للحصول على البوصلة الحية", fr: "Ouvrez sur votre téléphone pour la boussole en direct", de: "Auf dem Telefon für Live-Kompass öffnen" },
  scanQr:           { en: "Scan to open on phone", ar: "امسح للفتح على الهاتف", fr: "Scanner pour ouvrir sur téléphone", de: "Scannen zum Öffnen auf dem Telefon" },
  nextPrayer:       { en: "Next Prayer",       ar: "الصلاة القادمة",   fr: "Prochaine Prière",    de: "Nächstes Gebet" },
  currentPrayer:    { en: "Current Prayer",   ar: "الصلاة الحالية",    fr: "Prière actuelle",     de: "Aktuelles Gebet" },
  cityCountryPlaceholder: { en: "City, Country (e.g. Berlin, DE)", ar: "المدينة، البلد (مثال: Berlin, DE)", fr: "Ville, Pays (ex: Paris, FR)", de: "Stadt, Land (z.B. Berlin, DE)" },

  // Prayer names
  fajr:    { en: "Fajr",    ar: "الفجر",    fr: "Fajr",    de: "Fajr" },
  dhuhr:   { en: "Dhuhr",   ar: "الظهر",    fr: "Dhuhr",   de: "Dhuhr" },
  asr:     { en: "Asr",     ar: "العصر",    fr: "Asr",     de: "Asr" },
  maghrib: { en: "Maghrib", ar: "المغرب",   fr: "Maghrib", de: "Maghrib" },
  isha:    { en: "Isha",    ar: "العشاء",    fr: "Isha",    de: "Isha" },
  sunrise: { en: "Sunrise", ar: "الشروق",   fr: "Lever du soleil", de: "Sonnenaufgang" },

  // Home
  verseOfDay:   { en: "Verse of the Day",  ar: "آية اليوم",          fr: "Verset du Jour",       de: "Vers des Tages" },
  readMore:     { en: "Read More",         ar: "اقرأ المزيد",         fr: "Lire la suite",        de: "Weiterlesen" },
  quickAccess:  { en: "Quick Access",      ar: "وصول سريع",           fr: "Accès rapide",         de: "Schnellzugriff" },
  greeting:     { en: "Assalamu Alaikum",  ar: "السلام عليكم",        fr: "Assalamu Alaikum",     de: "Assalamu Alaikum" },
  today:        { en: "Today",             ar: "اليوم",               fr: "Aujourd'hui",          de: "Heute" },

  // Adhkar
  morning:      { en: "Morning",           ar: "الصباح",             fr: "Matin",                de: "Morgen" },
  evening:      { en: "Evening",           ar: "المساء",             fr: "Soir",                 de: "Abend" },
  sleep:        { en: "Sleep",             ar: "النوم",              fr: "Sommeil",              de: "Schlaf" },
  afterPrayer:  { en: "After Prayer",      ar: "بعد الصلاة",         fr: "Après la Prière",      de: "Nach dem Gebet" },
  daily:        { en: "Daily",             ar: "يومي",               fr: "Quotidien",            de: "Täglich" },
  completed:    { en: "Completed!",        ar: "اكتمل!",             fr: "Terminé!",             de: "Abgeschlossen!" },
  reset:        { en: "Reset",             ar: "إعادة",              fr: "Réinitialiser",        de: "Zurücksetzen" },
  times:        { en: "times",             ar: "مرة",                fr: "fois",                 de: "Mal" },

  // Settings
  language:     { en: "Language",          ar: "اللغة",              fr: "Langue",               de: "Sprache" },
  appearance:   { en: "Appearance",        ar: "المظهر",             fr: "Apparence",            de: "Erscheinungsbild" },
  darkMode:     { en: "Dark",              ar: "داكن",               fr: "Sombre",               de: "Dunkel" },
  lightMode:    { en: "Light",             ar: "فاتح",               fr: "Clair",                de: "Hell" },
  systemMode:   { en: "System",            ar: "النظام",             fr: "Système",              de: "System" },
  notLoggedIn:  { en: "Not logged in",     ar: "غير مسجل",           fr: "Non connecté",         de: "Nicht angemeldet" },
  loginToSync:  { en: "Login to sync your progress", ar: "سجّل دخولك لمزامنة تقدمك", fr: "Connectez-vous pour synchroniser", de: "Anmelden zum Synchronisieren" },
  prayerNotifications: { en: "Prayer Notifications", ar: "إشعارات الصلاة", fr: "Notifications de Prière", de: "Gebetsbenachrichtigungen" },
  comingSoon:   { en: "Coming soon",       ar: "قريباً",             fr: "Bientôt disponible",   de: "Demnächst" },
  mosqueFinder: { en: "Mosque Finder",     ar: "البحث عن مسجد",      fr: "Chercher mosquée",     de: "Moschee finden" },
  findNearbyMosques: { en: "Find nearby mosques", ar: "ابحث عن مساجد قريبة", fr: "Trouver des mosquées proches", de: "Nahe Moscheen finden" },
  chooseTheme:  { en: "Choose your display theme", ar: "اختر مظهر التطبيق", fr: "Choisissez votre thème", de: "Wählen Sie Ihr Design" },
  chooseLanguage: { en: "Choose your preferred language", ar: "اختر لغتك المفضلة", fr: "Choisissez votre langue", de: "Wählen Sie Ihre Sprache" },

  // Calendar
  addEvent:     { en: "Add Event",         ar: "إضافة حدث",          fr: "Ajouter un événement", de: "Ereignis hinzufügen" },
  islamicCalendar: { en: "Islamic Calendar", ar: "التقويم الإسلامي", fr: "Calendrier Islamique", de: "Islamischer Kalender" },

  // Quran
  backToSurahs: { en: "Back to Surahs",    ar: "العودة للسور",        fr: "Retour aux sourates",  de: "Zurück zu Suren" },
  translation:  { en: "Translation",       ar: "الترجمة",             fr: "Traduction",           de: "Übersetzung" },
  tapVerseHint: { en: "Tap a verse for tafsir & bookmarks", ar: "اضغط على آية للتفسير", fr: "Appuyez sur un verset pour tafsir", de: "Vers antippen für Tafsir" },
  bookmarkVerse: { en: "Bookmark this verse", ar: "إضافة إشارة للآية", fr: "Marquer ce verset",  de: "Vers als Lesezeichen" },
  removeBookmark: { en: "Remove bookmark", ar: "إزالة الإشارة",        fr: "Supprimer le signet",  de: "Lesezeichen entfernen" },
  tafsir:       { en: "View Tafsir",       ar: "عرض التفسير",         fr: "Voir le Tafsir",       de: "Tafsir anzeigen" },
  wordMeanings: { en: "Word Meanings",     ar: "معاني الكلمات",       fr: "Significations",       de: "Wortbedeutungen" },
  cancel:       { en: "Cancel",            ar: "إلغاء",               fr: "Annuler",              de: "Abbrechen" },
  saveProgress: { en: "Save Progress",     ar: "حفظ التقدم",          fr: "Sauvegarder",          de: "Fortschritt speichern" },
  saved:        { en: "Saved!",            ar: "تم الحفظ!",           fr: "Sauvegardé!",          de: "Gespeichert!" },
  verse:        { en: "Verse",             ar: "الآية",               fr: "Verset",               de: "Vers" },
  verses:       { en: "verses",            ar: "آيات",                fr: "versets",              de: "Verse" },
  findNearMe:   { en: "Find Near Me",      ar: "ابحث بالقرب مني",     fr: "Trouver près de moi",  de: "In meiner Nähe" },

  // General
  loading:      { en: "Loading...",        ar: "جارٍ التحميل...",     fr: "Chargement...",        de: "Laden..." },
  error:        { en: "Error",             ar: "خطأ",                fr: "Erreur",               de: "Fehler" },
  retry:        { en: "Try again",         ar: "حاول مرة أخرى",      fr: "Réessayer",            de: "Erneut versuchen" },
  back:         { en: "Back",              ar: "رجوع",               fr: "Retour",               de: "Zurück" },
  continueReading: { en: "Continue reading", ar: "متابعة القراءة",   fr: "Continuer la lecture", de: "Weiterlesen" },

  // Quiz UI
  quizCongrats:       { en: "Congratulations!",           ar: "أحسنت! أكملت جميع الأسئلة",   fr: "Félicitations!",              de: "Glückwunsch!" },
  quizAllAnswered:    { en: "You've answered all the questions in this category. Start fresh to go through them again!", ar: "لقد أجبت على جميع أسئلة هذه الفئة. هل تريد البدء من جديد؟", fr: "Vous avez répondu à toutes les questions de cette catégorie. Recommencez pour les reparcourir!", de: "Du hast alle Fragen in dieser Kategorie beantwortet. Starte neu, um sie wieder durchzugehen!" },
  quizChangeCategory: { en: "Change Category",            ar: "تغيير الفئة",                  fr: "Changer de catégorie",        de: "Kategorie wechseln" },
  quizStartFresh:     { en: "Start Fresh",                ar: "ابدأ من جديد",                 fr: "Recommencer",                 de: "Neu starten" },
  quizChooseCategory: { en: "Choose a Category",          ar: "اختر الفئة",                   fr: "Choisir une catégorie",       de: "Kategorie wählen" },
  quizTestKnowledge:  { en: "Test your knowledge — answered questions never repeat until you've seen them all", ar: "اختبر معلوماتك الإسلامية — الأسئلة المجابة لا تتكرر", fr: "Testez vos connaissances — les questions répondues ne se répètent pas", de: "Teste dein Wissen — beantwortete Fragen wiederholen sich nicht" },
  quizStartButton:    { en: "Start Quiz",                 ar: "ابدأ الاختبار",                fr: "Démarrer le quiz",            de: "Quiz starten" },
  quizExcellent:      { en: "Excellent!",                 ar: "ممتاز!",                       fr: "Excellent!",                  de: "Ausgezeichnet!" },
  quizVeryGood:       { en: "Very Good!",                 ar: "جيد جداً!",                    fr: "Très bien!",                  de: "Sehr gut!" },
  quizKeepLearning:   { en: "Good — Keep Learning!",     ar: "جيد — استمر في التعلم",        fr: "Bien — continuez à apprendre!", de: "Gut — weiter lernen!" },
  quizTryAgain:       { en: "Try Again!",                 ar: "حاول مرة أخرى",                fr: "Réessayez!",                  de: "Nochmal versuchen!" },
  quizCorrect:        { en: "Correct",                    ar: "صحيح",                         fr: "Correct",                     de: "Richtig" },
  quizWrong:          { en: "Wrong",                      ar: "خطأ",                          fr: "Faux",                        de: "Falsch" },
  quizScoreLabel:     { en: "Score",                      ar: "النتيجة",                      fr: "Score",                       de: "Punkte" },
  quizExplanation:    { en: "Explanation",                ar: "الشرح",                        fr: "Explication",                 de: "Erklärung" },
  quizNextQuestion:   { en: "Next Question",              ar: "السؤال التالي",                 fr: "Question suivante",           de: "Nächste Frage" },
  quizSeeResults:     { en: "See Results",                ar: "عرض النتائج",                  fr: "Voir les résultats",          de: "Ergebnisse sehen" },
  quizMoreQuestions:  { en: "More Questions",             ar: "أسئلة جديدة",                  fr: "Plus de questions",           de: "Mehr Fragen" },
  quizAllDone:        { en: "✓ All answered",             ar: "✓ اكتملت جميعها",              fr: "✓ Tout répondu",              de: "✓ Alle beantwortet" },
  quizRemaining:      { en: "remaining",                  ar: "متبقية",                       fr: "restantes",                   de: "verbleibend" },
  quizNeverRepeat:    { en: "Questions you answered won't appear again until you've seen them all", ar: "الأسئلة التي أجبت عليها لن تظهر مرة أخرى", fr: "Les questions répondues ne réapparaîtront pas avant que vous les ayez toutes vues", de: "Beantwortete Fragen erscheinen erst wieder, wenn du alle gesehen hast" },
  quizAnswered:       { en: "You answered",               ar: "أجبت بشكل صحيح على",           fr: "Vous avez répondu",           de: "Du hast beantwortet" },
  quizOutOf:          { en: "out of",                     ar: "من",                           fr: "sur",                         de: "von" },
  quizCorrectly:      { en: "correctly",                  ar: "سؤالاً بشكل صحيح",             fr: "correctement",                de: "richtig" },
  quizQuestionOf:     { en: "Question",                   ar: "السؤال",                       fr: "Question",                    de: "Frage" },
  quizOf:             { en: "of",                         ar: "من",                           fr: "sur",                         de: "von" },
  quizSelectDifficulty: { en: "Select Difficulty",        ar: "اختر المستوى",                 fr: "Choisir le niveau",           de: "Schwierigkeit wählen" },
  quizEasy:           { en: "Easy",                       ar: "سهل",                          fr: "Facile",                      de: "Einfach" },
  quizMedium:         { en: "Medium",                     ar: "متوسط",                        fr: "Moyen",                       de: "Mittel" },
  quizHard:           { en: "Hard",                       ar: "صعب",                          fr: "Difficile",                   de: "Schwer" },
  quizEasyDesc:       { en: "Basic Islamic knowledge — perfect for beginners", ar: "معلومات إسلامية أساسية — مناسبة للمبتدئين", fr: "Connaissances islamiques de base — parfait pour les débutants", de: "Grundlegendes islamisches Wissen — perfekt für Anfänger" },
  quizMediumDesc:     { en: "Intermediate level — requires good Islamic knowledge", ar: "مستوى متوسط — يتطلب معرفة إسلامية جيدة", fr: "Niveau intermédiaire — nécessite de bonnes connaissances islamiques", de: "Mittleres Niveau — erfordert gutes islamisches Wissen" },
  quizHardDesc:       { en: "Advanced level — detailed fiqh, history & hadith sciences", ar: "مستوى متقدم — فقه تفصيلي وتاريخ وعلوم الحديث", fr: "Niveau avancé — fiqh détaillé, histoire et sciences du hadith", de: "Fortgeschrittenes Niveau — detailliertes Fiqh, Geschichte & Hadiths" },
  quizDifficultyLabel:{ en: "Difficulty",                 ar: "المستوى",                      fr: "Niveau",                      de: "Schwierigkeit" },
  quizCorrectAnswer:  { en: "Correct answer:",            ar: "الإجابة الصحيحة:",             fr: "Bonne réponse:",              de: "Richtige Antwort:" },

  // Stories UI
  backToStories:   { en: "Back to Stories",       ar: "العودة إلى القصص",              fr: "Retour aux histoires",          de: "Zurück zu Geschichten" },
  moralOfStory:    { en: "Moral of the Story",    ar: "العبرة",                        fr: "La leçon de l'histoire",        de: "Moral der Geschichte" },
  readStory:       { en: "Read Story",            ar: "اقرأ القصة",                    fr: "Lire l'histoire",               de: "Geschichte lesen" },
  previousStory:   { en: "Previous",              ar: "القصة السابقة",                 fr: "Précédent",                     de: "Vorherige" },
  nextStory:       { en: "Next Story",            ar: "القصة التالية",                 fr: "Histoire suivante",             de: "Nächste Geschichte" },
  noStoriesYet:    { en: "No stories in this category yet.", ar: "لا توجد قصص في هذه الفئة", fr: "Pas encore d'histoires dans cette catégorie.", de: "Noch keine Geschichten in dieser Kategorie." },
  storiesSubtitle: { en: "Stories of the Prophet ﷺ, Companions, Prophets & Islamic History", ar: "قصص النبي ﷺ والصحابة والأنبياء وتاريخ الإسلام", fr: "Histoires du Prophète ﷺ, des Compagnons, des Prophètes & de l'Histoire Islamique", de: "Geschichten des Propheten ﷺ, der Gefährten, Propheten & Islamischer Geschichte" },
  minutesLabel:    { en: "min",                   ar: "دقائق",                         fr: "min",                           de: "min" },

  // Adhkar UI
  adhkarTitle:      { en: "Adhkar & Tasbeeh",                       ar: "الأذكار والتسبيح",     fr: "Adhkar & Tasbeeh",                           de: "Adhkar & Tasbeeh" },
  adhkarSubtitle:   { en: "Remember Allah and He will remember you", ar: "اذكر الله يذكرك",      fr: "Rappelle-toi d'Allah et Il se souviendra de toi", de: "Gedenke Allahs und Er wird dich gedenken" },
  adhkarDone:       { en: "Done!",                                   ar: "اكتمل!",               fr: "Terminé!",                                   de: "Fertig!" },
  adhkarTapCount:   { en: "Tap to count",                            ar: "انقر للعدّ",            fr: "Appuyez pour compter",                       de: "Tippen zum Zählen" },
  adhkarProgress:   { en: "Progress",                                ar: "التقدم",               fr: "Progression",                                de: "Fortschritt" },
  adhkarCompleted:  { en: "Completed",                               ar: "اكتمل",                fr: "Complété",                                   de: "Abgeschlossen" },
  adhkarNext:       { en: "Next",                                    ar: "التالي",               fr: "Suivant",                                    de: "Weiter" },
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
  }, [language, theme]);

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
