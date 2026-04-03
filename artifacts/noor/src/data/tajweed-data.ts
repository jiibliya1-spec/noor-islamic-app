export interface TajweedRule {
  id: string;
  name: { en: string; ar: string; fr: string; de: string };
  arabicName: string;
  explanation: { en: string; ar: string; fr: string; de: string };
  examples: { arabic: string; label: { en: string; ar: string; fr: string; de: string } }[];
  color: string;
  emoji: string;
}

export const TAJWEED_RULES: TajweedRule[] = [
  {
    id: "noon-izhar",
    arabicName: "الإظهار",
    color: "#4ade80",
    emoji: "🔊",
    name: { en: "Izhar (Clear Pronunciation)", ar: "الإظهار", fr: "Izhar (Prononciation Claire)", de: "Izhar (Klare Aussprache)" },
    explanation: {
      en: "When Noon Sakinah (نْ) or Tanween is followed by a Halqi (throat) letter (ء ه ع ح غ خ), the Noon is pronounced clearly without any nasal sound (Ghunnah). The six throat letters are remembered by the phrase 'Harf al-Halq'.",
      ar: "إذا جاء بعد النون الساكنة أو التنوين أحد الحروف الحلقية الستة (أ هـ ع ح غ خ)، وجب إظهار النون إظهاراً صريحاً واضحاً دون غنة. وسُميت هذه الحروف حلقية لأنها تخرج من الحلق.",
      fr: "Quand le Noon Sakinah (نْ) ou le Tanween est suivi d'une lettre gutturale (ء ه ع ح غ خ), le Noon est prononcé clairement sans nasalisation. Ces six lettres sont appelées lettres de la gorge.",
      de: "Wenn auf Noon Sakinah (نْ) oder Tanween ein Kehlbuchstabe folgt (ء ه ع ح غ خ), wird das Noon klar ohne Nasalklang ausgesprochen. Diese sechs Buchstaben werden Halq-Buchstaben genannt.",
    },
    examples: [
      { arabic: "مَنْ آمَنَ", label: { en: "Noon + Hamza", ar: "نون + همزة", fr: "Noon + Hamza", de: "Noon + Hamza" } },
      { arabic: "مِنْ عِلْمٍ", label: { en: "Noon + Ayn", ar: "نون + عين", fr: "Noon + Ayn", de: "Noon + Ayn" } },
      { arabic: "مِنْ هُدًى", label: { en: "Noon + Ha", ar: "نون + هاء", fr: "Noon + Ha", de: "Noon + Ha" } },
    ],
  },
  {
    id: "noon-idgham",
    arabicName: "الإدغام",
    color: "#f59e0b",
    emoji: "🔀",
    name: { en: "Idgham (Merging)", ar: "الإدغام", fr: "Idgham (Fusion)", de: "Idgham (Verschmelzung)" },
    explanation: {
      en: "When Noon Sakinah or Tanween is followed by one of six letters (ي ن م و ل ر), the Noon merges into the following letter. This has two types: Idgham with Ghunnah (ي ن م و) where nasalisation is held for 2 counts, and Idgham without Ghunnah (ل ر) where there is no nasal sound.",
      ar: "إذا جاء بعد النون الساكنة أو التنوين أحد حروف (ي ن م و ل ر) وجب الإدغام. وهو نوعان: إدغام بغنة (ي ن م و): تُدغم النون في هذه الحروف مع الغنة لمقدار حركتين. وإدغام بغير غنة (ل ر): تُدغم النون فيهما دون غنة.",
      fr: "Quand le Noon Sakinah ou le Tanween est suivi d'une des six lettres (ي ن م و ل ر), le Noon est fusionné dans la lettre suivante. Il y a deux types: avec Ghunnah (ي ن م و) et sans Ghunnah (ل ر).",
      de: "Wenn auf Noon Sakinah oder Tanween einer der sechs Buchstaben (ي ن م و ل ر) folgt, verschmilzt das Noon mit dem folgenden Buchstaben. Es gibt zwei Arten: mit Ghunnah (ي ن م و) und ohne Ghunnah (ل ر).",
    },
    examples: [
      { arabic: "مِن نِّعْمَةٍ", label: { en: "Idgham with Ghunnah (Noon)", ar: "إدغام بغنة (نون)", fr: "Idgham avec Ghunnah (Noon)", de: "Idgham mit Ghunnah (Noon)" } },
      { arabic: "مِن وَلِيٍّ", label: { en: "Idgham with Ghunnah (Waw)", ar: "إدغام بغنة (واو)", fr: "Idgham avec Ghunnah (Waw)", de: "Idgham mit Ghunnah (Waw)" } },
      { arabic: "مِن لَّدُنْهُ", label: { en: "Idgham without Ghunnah (Lam)", ar: "إدغام بلا غنة (لام)", fr: "Idgham sans Ghunnah (Lam)", de: "Idgham ohne Ghunnah (Lam)" } },
    ],
  },
  {
    id: "noon-iqlab",
    arabicName: "الإقلاب",
    color: "#a78bfa",
    emoji: "🔄",
    name: { en: "Iqlab (Conversion)", ar: "الإقلاب", fr: "Iqlab (Conversion)", de: "Iqlab (Umwandlung)" },
    explanation: {
      en: "When Noon Sakinah or Tanween is followed by the letter Ba (ب), the Noon is converted to a Meem (م) sound and pronounced with Ghunnah for two counts. In the Quran, this is marked with a small Meem (م) above the letter.",
      ar: "إذا جاء بعد النون الساكنة أو التنوين حرف الباء (ب)، وجب قلب النون ميماً مع إخفائها والغنة بمقدار حركتين. وعلامته في المصحف: ميم صغيرة (م) فوق الحرف.",
      fr: "Quand le Noon Sakinah ou le Tanween est suivi de Ba (ب), le Noon est converti en un son Meem (م) avec Ghunnah pendant deux temps. Dans le Coran, cela est marqué par un petit Meem au-dessus.",
      de: "Wenn auf Noon Sakinah oder Tanween der Buchstabe Ba (ب) folgt, wird das Noon in einen Meem-Laut umgewandelt und mit Ghunnah für zwei Zählungen ausgesprochen. Im Quran durch ein kleines Meem markiert.",
    },
    examples: [
      { arabic: "أَنبِئُونِي", label: { en: "Noon → Meem before Ba", ar: "النون تُقلب ميماً قبل الباء", fr: "Noon → Meem avant Ba", de: "Noon → Meem vor Ba" } },
      { arabic: "سَمِيعٌ بَصِيرٌ", label: { en: "Tanween Damma + Ba", ar: "تنوين الضم + الباء", fr: "Tanween Damma + Ba", de: "Tanween Damma + Ba" } },
    ],
  },
  {
    id: "noon-ikhfa",
    arabicName: "الإخفاء",
    color: "#38bdf8",
    emoji: "🫁",
    name: { en: "Ikhfa (Concealment)", ar: "الإخفاء الحقيقي", fr: "Ikhfa (Dissimulation)", de: "Ikhfa (Verbergung)" },
    explanation: {
      en: "When Noon Sakinah or Tanween is followed by any of the remaining 15 letters, the Noon is neither fully pronounced nor fully merged. It is concealed — held in a nasal position between Izhar and Idgham — for two counts. The 15 letters are: ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك.",
      ar: "إذا جاء بعد النون الساكنة أو التنوين أحد الحروف الخمسة عشر الباقية (ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك)، وجب إخفاء النون بغنة مقدار حركتين، أي النطق بها بين الإظهار والإدغام.",
      fr: "Quand le Noon Sakinah ou le Tanween est suivi de l'une des 15 lettres restantes (ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك), le Noon est dissimulé avec nasalisation pendant deux temps.",
      de: "Wenn auf Noon Sakinah oder Tanween einer der übrigen 15 Buchstaben folgt, wird das Noon zwei Zählungen lang nasalisiert gehalten — zwischen klarer Aussprache und Verschmelzung.",
    },
    examples: [
      { arabic: "مِن تَحْتِهِمْ", label: { en: "Ikhfa before Ta", ar: "إخفاء قبل التاء", fr: "Ikhfa avant Ta", de: "Ikhfa vor Ta" } },
      { arabic: "كُنتُمْ", label: { en: "Ikhfa (Noon + Ta)", ar: "إخفاء (نون + تاء)", fr: "Ikhfa (Noon + Ta)", de: "Ikhfa (Noon + Ta)" } },
      { arabic: "إِن كُنتُمْ", label: { en: "Ikhfa before Kaf", ar: "إخفاء قبل الكاف", fr: "Ikhfa avant Kaf", de: "Ikhfa vor Kaf" } },
    ],
  },
  {
    id: "meem-ikhfa",
    arabicName: "الإخفاء الشفوي",
    color: "#fb923c",
    emoji: "👄",
    name: { en: "Ikhfa Shafawi (Labial Concealment)", ar: "الإخفاء الشفوي", fr: "Ikhfa Shafawi (Dissimulation Labiale)", de: "Ikhfa Shafawi (Labiale Verbergung)" },
    explanation: {
      en: "When a Meem Sakinah (مْ) is followed by the letter Ba (ب), the Meem is concealed at the lips (Shafawi = labial) with Ghunnah for two counts. Both lips come together but the Meem is not fully pronounced.",
      ar: "إذا جاء بعد الميم الساكنة حرف الباء (ب)، وجب إخفاء الميم شفوياً مع الغنة بمقدار حركتين. والشفوي نسبة إلى الشفتين، لأن مخرج الميم والباء كليهما من الشفتين.",
      fr: "Quand Meem Sakinah (مْ) est suivi de Ba (ب), le Meem est dissimulé aux lèvres avec Ghunnah pendant deux temps. Les deux lèvres se joignent mais le Meem n'est pas pleinement prononcé.",
      de: "Wenn Meem Sakinah (مْ) von Ba (ب) gefolgt wird, wird das Meem an den Lippen mit Ghunnah für zwei Zählungen verborgen.",
    },
    examples: [
      { arabic: "وَمَا هُم بِمُؤْمِنِينَ", label: { en: "Meem + Ba", ar: "ميم + باء", fr: "Meem + Ba", de: "Meem + Ba" } },
      { arabic: "أَعْصِم بِرَأْسِي", label: { en: "Ikhfa Shafawi example", ar: "مثال الإخفاء الشفوي", fr: "Exemple Ikhfa Shafawi", de: "Ikhfa Shafawi Beispiel" } },
    ],
  },
  {
    id: "meem-idgham",
    arabicName: "الإدغام الشفوي",
    color: "#f472b6",
    emoji: "🫦",
    name: { en: "Idgham Shafawi (Labial Merging)", ar: "الإدغام الشفوي", fr: "Idgham Shafawi (Fusion Labiale)", de: "Idgham Shafawi (Labiale Verschmelzung)" },
    explanation: {
      en: "When a Meem Sakinah is followed by another Meem (م), the first Meem is merged into the second with Ghunnah for two counts. This is called Shafawi (labial) because the Meem is articulated at the lips.",
      ar: "إذا جاء بعد الميم الساكنة ميم أخرى (م م)، وجب إدغام الأولى في الثانية مع الغنة بمقدار حركتين. وسُمي شفوياً لأن مخرج الميم من الشفتين.",
      fr: "Quand Meem Sakinah est suivi d'un autre Meem, le premier est fusionné dans le second avec Ghunnah pour deux temps.",
      de: "Wenn Meem Sakinah von einem anderen Meem gefolgt wird, verschmilzt das erste in das zweite mit Ghunnah für zwei Zählungen.",
    },
    examples: [
      { arabic: "كَمْ مِن فِئَةٍ", label: { en: "Meem + Meem", ar: "ميم + ميم", fr: "Meem + Meem", de: "Meem + Meem" } },
      { arabic: "فَاحْكُم مَّا أُمِرْتَ", label: { en: "Idgham Shafawi", ar: "إدغام شفوي", fr: "Idgham Shafawi", de: "Idgham Shafawi" } },
    ],
  },
  {
    id: "madd-tabii",
    arabicName: "المد الطبيعي",
    color: "#34d399",
    emoji: "〰️",
    name: { en: "Natural Madd (Elongation)", ar: "المد الطبيعي", fr: "Madd Naturel (Allongement)", de: "Natürliches Madd (Dehnung)" },
    explanation: {
      en: "Madd is the elongation of a vowel sound. The Natural Madd (Tabi'i) occurs when one of the three letters of Madd (ا و ي) follows its corresponding short vowel — Alif after Fatha, Waw after Damma, Ya after Kasra — and is not followed by a Hamza or Sukoon. It is elongated for 2 counts (Harakaat).",
      ar: "المد في اللغة هو الزيادة والطول. والمد الطبيعي هو ما لا تقوم ذات الحرف إلا به، ولا يزيد على حركتين. ويكون بأحد حروف المد الثلاثة (ا و ي) إذا لم يكن بعدها همز أو سكون.",
      fr: "Le Madd est l'allongement d'une voyelle. Le Madd Naturel se produit quand l'une des trois lettres de Madd (ا و ي) suit sa voyelle courte correspondante sans être suivie d'une Hamza ou d'un Sukoon. Il dure 2 temps.",
      de: "Madd ist die Dehnung eines Vokalklangs. Das Natürliche Madd entsteht, wenn einer der drei Madd-Buchstaben (ا و ي) auf seine kurze Vokalentsprechung folgt ohne nachfolgendes Hamza oder Sukoon. Dauer: 2 Zählungen.",
    },
    examples: [
      { arabic: "كِتَابٌ", label: { en: "Alif after Fatha (2 counts)", ar: "الألف بعد الفتحة (حركتان)", fr: "Alif après Fatha (2 temps)", de: "Alif nach Fatha (2 Zählungen)" } },
      { arabic: "يَقُولُ", label: { en: "Waw after Damma (2 counts)", ar: "الواو بعد الضمة (حركتان)", fr: "Waw après Damma (2 temps)", de: "Waw nach Damma (2 Zählungen)" } },
      { arabic: "قِيلَ", label: { en: "Ya after Kasra (2 counts)", ar: "الياء بعد الكسرة (حركتان)", fr: "Ya après Kasra (2 temps)", de: "Ya nach Kasra (2 Zählungen)" } },
    ],
  },
  {
    id: "madd-muttasil",
    arabicName: "المد المتصل",
    color: "#60a5fa",
    emoji: "📏",
    name: { en: "Connected Madd (4-5 counts)", ar: "المد المتصل الواجب", fr: "Madd Connecté (4-5 temps)", de: "Verbundenes Madd (4-5 Zählungen)" },
    explanation: {
      en: "When a Madd letter is immediately followed by a Hamza (ء) within the same word, it must be elongated for 4 to 5 counts. It is called 'Muttasil' (connected) because the Madd letter and the Hamza are in the same word. This is obligatory (Wajib).",
      ar: "المد المتصل الواجب: هو أن يأتي حرف المد وبعده الهمزة في كلمة واحدة. ويجب مده بمقدار 4 إلى 5 حركات. وسُمي متصلاً لاتصال الهمزة بحرف المد في كلمة واحدة.",
      fr: "Quand une lettre de Madd est immédiatement suivie d'un Hamza dans le même mot, elle doit être allongée de 4 à 5 temps. Appelé 'Muttasil' (connecté) car la lettre Madd et le Hamza sont dans le même mot.",
      de: "Wenn ein Madd-Buchstabe direkt von einem Hamza im selben Wort gefolgt wird, muss er für 4-5 Zählungen gedehnt werden. 'Muttasil' (verbunden), weil Madd-Buchstabe und Hamza im selben Wort stehen.",
    },
    examples: [
      { arabic: "جَآءَ", label: { en: "Alif + Hamza (4-5 counts)", ar: "ألف + همزة (4-5 حركات)", fr: "Alif + Hamza (4-5 temps)", de: "Alif + Hamza (4-5 Zählungen)" } },
      { arabic: "السُّوءَ", label: { en: "Waw + Hamza", ar: "واو + همزة", fr: "Waw + Hamza", de: "Waw + Hamza" } },
      { arabic: "جِيءَ", label: { en: "Ya + Hamza", ar: "ياء + همزة", fr: "Ya + Hamza", de: "Ya + Hamza" } },
    ],
  },
  {
    id: "madd-munfasil",
    arabicName: "المد المنفصل",
    color: "#a3e635",
    emoji: "↔️",
    name: { en: "Separated Madd (4-5 counts)", ar: "المد المنفصل الجائز", fr: "Madd Séparé (4-5 temps)", de: "Getrenntes Madd (4-5 Zählungen)" },
    explanation: {
      en: "When a Madd letter at the end of one word is followed by a Hamza at the beginning of the next word, it can be elongated for 4 to 5 counts. It is permitted (Ja'iz) — meaning it is acceptable to elongate or to read at 2 counts. Most Quranic reciters elongate for 4-5 counts.",
      ar: "المد المنفصل الجائز: هو أن يقع حرف المد في آخر الكلمة والهمزة في أول الكلمة التالية. ومده جائز بمقدار 4 إلى 5 حركات. وسُمي منفصلاً لانفصال الهمزة عن حرف المد في كلمتين.",
      fr: "Quand une lettre de Madd en fin de mot est suivie d'un Hamza au début du mot suivant, elle peut être allongée de 4 à 5 temps. C'est permis (Ja'iz) — la plupart des récitateurs allongent 4-5 temps.",
      de: "Wenn ein Madd-Buchstabe am Ende eines Wortes von einem Hamza am Anfang des nächsten Wortes gefolgt wird, kann er für 4-5 Zählungen gedehnt werden (erlaubt/Ja'iz).",
    },
    examples: [
      { arabic: "يَا أَيُّهَا", label: { en: "Alif at end, Hamza at start", ar: "ألف في الآخر، همزة في الأول", fr: "Alif en fin, Hamza au début", de: "Alif am Ende, Hamza am Anfang" } },
      { arabic: "قُولُوا آمَنَّا", label: { en: "Separated Madd example", ar: "مثال المد المنفصل", fr: "Exemple de Madd séparé", de: "Getrenntes Madd Beispiel" } },
    ],
  },
  {
    id: "qalqalah",
    arabicName: "القلقلة",
    color: "#e879f9",
    emoji: "💥",
    name: { en: "Qalqalah (Echo/Bounce)", ar: "القلقلة", fr: "Qalqalah (Écho/Rebond)", de: "Qalqalah (Echo/Abprallen)" },
    explanation: {
      en: "Qalqalah is a vibrating or echoing sound produced when one of the five Qalqalah letters (ق ط ب ج د — remembered as 'Qutb Jad') appears with Sukoon (no vowel). The sound is produced with a slight bounce after the letter. It is stronger when stopping at the end of a word (Major Qalqalah) than within a word (Minor Qalqalah).",
      ar: "القلقلة: اضطراب الصوت عند النطق بالحرف ساكناً حتى يُسمع له نبرة قوية. وحروفها خمسة مجموعة في كلمة 'قطب جد' (ق ط ب ج د). وهي نوعان: صغرى (في وسط الكلمة) وكبرى (في آخر الكلمة عند الوقف).",
      fr: "La Qalqalah est un son vibrant produit quand l'une des cinq lettres (ق ط ب ج د — 'Qutb Jad') apparaît avec Sukoon. Elle est plus forte lors d'un arrêt (Majeure) que dans un mot (Mineure).",
      de: "Qalqalah ist ein vibrierender Klang, wenn einer der fünf Buchstaben (ق ط ب ج د — 'Qutb Jad') mit Sukoon erscheint. Er ist stärker beim Anhalten (Major Qalqalah) als mitten im Wort (Minor).",
    },
    examples: [
      { arabic: "يَقْطَعُونَ", label: { en: "Qalqalah on Qaf (minor)", ar: "قلقلة القاف (صغرى)", fr: "Qalqalah sur Qaf (mineure)", de: "Qalqalah auf Qaf (Minor)" } },
      { arabic: "الْحَقِّۖ", label: { en: "Qalqalah on Qaf at pause (major)", ar: "قلقلة القاف عند الوقف (كبرى)", fr: "Qalqalah sur Qaf à la pause (majeure)", de: "Qalqalah auf Qaf bei Pause (Major)" } },
      { arabic: "خَلَقَ", label: { en: "Qalqalah on Qaf at word end", ar: "قلقلة القاف في آخر الكلمة", fr: "Qalqalah sur Qaf en fin de mot", de: "Qalqalah auf Qaf am Wortende" } },
    ],
  },
  {
    id: "ghunnah",
    arabicName: "الغنة",
    color: "#fb7185",
    emoji: "🎵",
    name: { en: "Ghunnah (Nasalisation)", ar: "الغنة", fr: "Ghunnah (Nasalisation)", de: "Ghunnah (Nasalklang)" },
    explanation: {
      en: "Ghunnah is the nasal humming sound produced through the nose. It is an essential part of several Tajweed rules. The Meem and Noon letters always carry a Ghunnah when they have a Shadda (ّ) — they must be held for 2 counts with a nasal sound. Ghunnah is also present in Ikhfa, Idgham with Ghunnah, and Iqlab.",
      ar: "الغنة: صوت لذيذ يخرج من الخيشوم، ولا عمل للسان فيه. وهي من أحكام الميم والنون المشددتين اللتين تُمدان بمقدار حركتين مع إخراج الغنة من الأنف. وتوجد الغنة أيضاً في الإخفاء والإدغام بغنة والإقلاب.",
      fr: "La Ghunnah est le son nasal produit à travers le nez. Quand Meem ou Noon ont une Shadda, ils sont tenus 2 temps avec Ghunnah. La Ghunnah est aussi présente dans Ikhfa, Idgham avec Ghunnah, et Iqlab.",
      de: "Ghunnah ist der nasale Summklang aus der Nase. Wenn Meem oder Noon eine Shadda haben, werden sie 2 Zählungen mit Ghunnah gehalten. Ghunnah kommt auch in Ikhfa, Idgham mit Ghunnah und Iqlab vor.",
    },
    examples: [
      { arabic: "إِنَّ", label: { en: "Noon with Shadda (2 counts Ghunnah)", ar: "النون المشددة (غنة حركتين)", fr: "Noon avec Shadda (2 temps Ghunnah)", de: "Noon mit Shadda (2 Zählungen Ghunnah)" } },
      { arabic: "ثُمَّ", label: { en: "Meem with Shadda (2 counts Ghunnah)", ar: "الميم المشددة (غنة حركتين)", fr: "Meem avec Shadda (2 temps Ghunnah)", de: "Meem mit Shadda (2 Zählungen Ghunnah)" } },
    ],
  },
  {
    id: "lam-shams-qamar",
    arabicName: "لام شمسية وقمرية",
    color: "#facc15",
    emoji: "☀️🌙",
    name: { en: "Solar & Lunar Lam (Al-Shamsiyyah & Al-Qamariyyah)", ar: "اللام الشمسية والقمرية", fr: "Lam Solaire et Lunaire", de: "Sonnen- und Mond-Lam" },
    explanation: {
      en: "The definite article 'Al-' (ال) has two pronunciations. Solar Lam (Shamsiyyah): when followed by one of 14 solar letters (ت ث د ذ ر ز س ش ص ض ط ظ ل ن), the Lam is assimilated (merged) into the following letter which takes a Shadda. Lunar Lam (Qamariyyah): when followed by one of 14 lunar letters, the Lam is pronounced clearly.",
      ar: "للام في 'ال' التعريف حالتان: الشمسية: إذا جاء بعد اللام حرف شمسي (ت ث د ذ ر ز س ش ص ض ط ظ ل ن) أُدغمت اللام فيه وأُخذ الحرف بالشدة. القمرية: إذا جاء بعدها حرف قمري، نُطقت اللام ظاهرة.",
      fr: "L'article défini 'Al-' a deux prononciations. Lam Solaire: quand suivi d'une des 14 lettres solaires, le Lam est assimilé dans la lettre suivante (Shadda). Lam Lunaire: quand suivi d'une lettre lunaire, le Lam est clairement prononcé.",
      de: "Der bestimmte Artikel 'Al-' hat zwei Aussprachen. Sonnen-Lam: gefolgt von einem der 14 Sonnenbuchstaben wird das Lam verschmolzen (Shadda auf dem Folgebuchstaben). Mond-Lam: gefolgt von einem Mondbuchstaben wird das Lam klar ausgesprochen.",
    },
    examples: [
      { arabic: "الشَّمْسُ", label: { en: "Solar Lam — Shin (merged)", ar: "لام شمسية — الشين (مُدغمة)", fr: "Lam Solaire — Shin (fusionné)", de: "Sonnen-Lam — Shin (verschmolzen)" } },
      { arabic: "النُّورُ", label: { en: "Solar Lam — Noon (merged)", ar: "لام شمسية — النون (مُدغمة)", fr: "Lam Solaire — Noon (fusionné)", de: "Sonnen-Lam — Noon (verschmolzen)" } },
      { arabic: "الْقُرْآنُ", label: { en: "Lunar Lam — Qaf (clear)", ar: "لام قمرية — القاف (ظاهرة)", fr: "Lam Lunaire — Qaf (clair)", de: "Mond-Lam — Qaf (klar)" } },
      { arabic: "الْمُؤْمِنُونَ", label: { en: "Lunar Lam — Meem (clear)", ar: "لام قمرية — الميم (ظاهرة)", fr: "Lam Lunaire — Meem (clair)", de: "Mond-Lam — Meem (klar)" } },
    ],
  },
  {
    id: "waqf",
    arabicName: "الوقف",
    color: "#94a3b8",
    emoji: "⏸️",
    name: { en: "Waqf (Stopping Rules)", ar: "الوقف وأحكامه", fr: "Waqf (Règles d'Arrêt)", de: "Waqf (Stopp-Regeln)" },
    explanation: {
      en: "Waqf means stopping during recitation. It has specific rules: (1) Mandatory Stop (م Waqf Lazim) — must stop here; (2) Preferred Stop (قلى) — better to stop; (3) Acceptable Stop (ج) — may stop or continue; (4) Preferred Continuation (صلى) — better to continue; (5) Mandatory Continuation (لا) — must not stop here; (6) Equal (قف) — equal to stop or continue. When stopping at the end of a word, the final vowel is dropped.",
      ar: "الوقف: قطع الصوت على آخر الكلمة زمناً يُتنفس فيه عادةً. أنواعه: الوقف اللازم (م): يجب الوقف عنده. وقف الأولى (قلى): الوقف أولى. وقف الجائز (ج): جائز الوقف والوصل. ووصل الأولى (صلى): الوصل أولى. وعدم الوقف (لا): لا يجوز الوقف. والمتعانق (∴): يُوقف على أحدهما.",
      fr: "Le Waqf signifie s'arrêter lors de la récitation. Types: Arrêt obligatoire (م), Arrêt préféré (قلى), Arrêt acceptable (ج), Continuation préférée (صلى), Continuation obligatoire (لا), Égal (قف). Lors d'un arrêt, la voyelle finale est supprimée.",
      de: "Waqf bedeutet das Anhalten beim Rezitieren. Arten: Pflichtiger Stopp (م), Bevorzugter Stopp (قلى), Akzeptabler Stopp (ج), Bevorzugte Fortsetzung (صلى), Pflichtfortsetzung (لا), Gleich (قف). Beim Stoppen wird der letzte Vokal weggelassen.",
    },
    examples: [
      { arabic: "مَالِكِ يَوْمِ الدِّينِ ۝", label: { en: "Natural stop at verse end", ar: "الوقف الطبيعي عند نهاية الآية", fr: "Arrêt naturel en fin de verset", de: "Natürlicher Stopp am Versende" } },
      { arabic: "وَمَا يَعْلَمُ تَأْوِيلَهُ إِلَّا اللَّهُ ۗ", label: { en: "Waqf Lazim — must stop", ar: "وقف لازم — يجب الوقف", fr: "Waqf Lazim — arrêt obligatoire", de: "Waqf Lazim — Pflichtiger Stopp" } },
    ],
  },
  {
    id: "tafkhim-tarqiq",
    arabicName: "التفخيم والترقيق",
    color: "#f97316",
    emoji: "🔡",
    name: { en: "Tafkhim & Tarqiq (Heavy & Light Letters)", ar: "التفخيم والترقيق", fr: "Tafkhim & Tarqiq (Lettres Lourdes & Légères)", de: "Tafkhim & Tarqiq (Schwere & Leichte Buchstaben)" },
    explanation: {
      en: "Letters in Arabic are either Heavy (Mufakhkham/Tafkhim) — pronounced with the back of the tongue raised toward the palate, producing a fuller sound — or Light (Muraqqaq/Tarqiq) — pronounced with no raising. The seven always-heavy letters are: خ ص ض غ ط ق ظ (remembered as 'Khuss Dha Ghiz Taquz'). The letter Ra and the letter Lam in Allah (لله) can be either heavy or light depending on context.",
      ar: "حروف القرآن تنقسم إلى: مفخّمة: ترتفع فيها طبقة الصوت وتمتلئ الفم بصداها. ومرقّقة: ينخفض فيها الصوت. الحروف دائمة التفخيم سبعة: (خ ص ض غ ط ق ظ). وبعض الحروف يتفخم أحياناً ويُرقق أحياناً كالراء ولام لفظ الجلالة.",
      fr: "Les lettres arabes sont soit Lourdes (Tafkhim) — prononcées avec la langue levée vers le palais — soit Légères (Tarqiq). Les sept lettres toujours lourdes sont: خ ص ض غ ط ق ظ. La lettre Ra et le Lam d'Allah peuvent être lourdes ou légères selon le contexte.",
      de: "Arabische Buchstaben sind entweder Schwer (Tafkhim) — mit angehobenem Zungenrücken — oder Leicht (Tarqiq). Die sieben immer schweren Buchstaben: خ ص ض غ ط ق ظ. Ra und das Lam in 'Allah' können je nach Kontext schwer oder leicht sein.",
    },
    examples: [
      { arabic: "الطَّيِّبَاتُ", label: { en: "Tta — always heavy letter", ar: "الطاء — دائماً مفخّمة", fr: "Tta — toujours lettre lourde", de: "Tta — immer schwerer Buchstabe" } },
      { arabic: "اللَّهُ", label: { en: "Allah's Lam — heavy after Fatha/Damma", ar: "لام الجلالة — مفخّمة بعد الفتحة والضمة", fr: "Lam d'Allah — lourd après Fatha/Damma", de: "Lam Allahs — schwer nach Fatha/Damma" } },
    ],
  },
];

export const TAJWEED_CATEGORIES = [
  { id: "all",     label: { en: "All Rules", ar: "جميع الأحكام", fr: "Toutes les Règles", de: "Alle Regeln" } },
  { id: "noon",    label: { en: "Noon & Tanween", ar: "النون والتنوين", fr: "Noon & Tanween", de: "Noon & Tanween" } },
  { id: "meem",    label: { en: "Meem Sakinah", ar: "الميم الساكنة", fr: "Meem Sakinah", de: "Meem Sakinah" } },
  { id: "madd",    label: { en: "Madd (Elongation)", ar: "أحكام المد", fr: "Madd (Allongement)", de: "Madd (Dehnung)" } },
  { id: "other",   label: { en: "Other Rules", ar: "أحكام أخرى", fr: "Autres Règles", de: "Weitere Regeln" } },
];

export const RULE_CATEGORY: Record<string, string> = {
  "noon-izhar": "noon",
  "noon-idgham": "noon",
  "noon-iqlab": "noon",
  "noon-ikhfa": "noon",
  "meem-ikhfa": "meem",
  "meem-idgham": "meem",
  "madd-tabii": "madd",
  "madd-muttasil": "madd",
  "madd-munfasil": "madd",
  "qalqalah": "other",
  "ghunnah": "other",
  "lam-shams-qamar": "other",
  "waqf": "other",
  "tafkhim-tarqiq": "other",
};
