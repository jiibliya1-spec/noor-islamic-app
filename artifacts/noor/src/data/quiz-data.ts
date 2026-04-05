export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // ============================================================
  // HISTORY - Medium to Hard
  // ============================================================
  {
    id: "h1", category: "history", difficulty: "hard",
    question: {
      en: "After the Prophet's death, some tribes refused to pay Zakat. Which Caliph insisted on fighting them despite opposition from some companions?",
      ar: "بعد وفاة النبي ﷺ، رفضت بعض القبائل دفع الزكاة. أي خليفة أصر على قتالهم رغم معارضة بعض الصحابة؟",
      fr: "Après la mort du Prophète, certaines tribus refusèrent de payer la Zakat. Quel Calife insista pour les combattre malgré l'opposition de certains compagnons?",
      de: "Nach dem Tod des Propheten weigerten sich einige Stämme Zakat zu zahlen. Welcher Kalif bestand darauf sie zu bekämpfen trotz des Widerstands einiger Gefährten?"
    },
    options: {
      en: ["Umar ibn al-Khattab", "Uthman ibn Affan", "Abu Bakr al-Siddiq", "Ali ibn Abi Talib"],
      ar: ["عمر بن الخطاب", "عثمان بن عفان", "أبو بكر الصديق", "علي بن أبي طالب"],
      fr: ["Umar ibn al-Khattab", "Uthman ibn Affan", "Abu Bakr al-Siddiq", "Ali ibn Abi Talib"],
      de: ["Umar ibn al-Khattab", "Uthman ibn Affan", "Abu Bakr al-Siddiq", "Ali ibn Abi Talib"]
    },
    answer: 2,
    explanation: {
      en: "Abu Bakr (RA) famously declared: 'By Allah, if they withhold even a rope they used to give to the Prophet, I will fight them for it.' This established Zakat as a compulsory pillar of Islam.",
      ar: "قال أبو بكر رضي الله عنه: 'والله لو منعوني عقالاً كانوا يؤدونه لرسول الله لقاتلتهم عليه.' وهذا أثبت الزكاة ركناً إلزامياً في الإسلام.",
      fr: "Abu Bakr déclara: 'Par Allah, s'ils retiennent ne serait-ce qu'une corde qu'ils donnaient au Prophète, je les combattrai pour cela.'",
      de: "Abu Bakr erklärte: 'Bei Allah, wenn sie auch nur ein Seil zurückhalten das sie dem Propheten gaben, werde ich sie dafür bekämpfen.'"
    }
  },
  {
    id: "h2", category: "history", difficulty: "hard",
    question: {
      en: "Which battle in 636 CE led to the Muslim conquest of the Levant (Syria and Palestine) and the end of Byzantine rule there?",
      ar: "أي معركة في عام 636م أدت إلى الفتح الإسلامي للشام (سوريا وفلسطين) ونهاية الحكم البيزنطي هناك؟",
      fr: "Quelle bataille en 636 EC a conduit à la conquête musulmane du Levant (Syrie et Palestine) et à la fin de la domination byzantine?",
      de: "Welche Schlacht im Jahr 636 n. Chr. führte zur muslimischen Eroberung der Levante (Syrien und Palästina) und zum Ende der byzantinischen Herrschaft dort?"
    },
    options: {
      en: ["Battle of Qadisiyyah", "Battle of Yarmouk", "Battle of Ajnadayn", "Battle of Hunayn"],
      ar: ["معركة القادسية", "معركة اليرموك", "معركة أجنادين", "معركة حنين"],
      fr: ["Bataille de Qadisiyyah", "Bataille de Yarmouk", "Bataille d'Ajnadayn", "Bataille de Hunayn"],
      de: ["Schlacht von Qadisiyya", "Schlacht am Yarmouk", "Schlacht von Ajnadayn", "Schlacht von Hunayn"]
    },
    answer: 1,
    explanation: {
      en: "The Battle of Yarmouk (636 CE) was a decisive Muslim victory against the Byzantines, led by Khalid ibn al-Walid. It opened the Levant to Muslim rule, including Jerusalem and Damascus.",
      ar: "معركة اليرموك (636م) كانت انتصاراً حاسماً للمسلمين بقيادة خالد بن الوليد، وفتحت الشام بما فيها القدس ودمشق للحكم الإسلامي.",
      fr: "La bataille de Yarmouk fut une victoire décisive des musulmans contre les Byzantins, ouvrant le Levant à la domination musulmane.",
      de: "Die Schlacht am Yarmouk war ein entscheidender muslimischer Sieg gegen die Byzantiner und öffnete die Levante für muslimische Herrschaft."
    }
  },
  {
    id: "h3", category: "history", difficulty: "hard",
    question: {
      en: "Which dynasty established the first standing army and navy in Islamic history, and moved the capital from Medina to Damascus?",
      ar: "أي سلالة أسست أول جيش نظامي وأسطول بحري في التاريخ الإسلامي، ونقلت العاصمة من المدينة إلى دمشق؟",
      fr: "Quelle dynastie a établi la première armée permanente et la première marine de l'histoire islamique, et a déplacé la capitale de Médine à Damas?",
      de: "Welche Dynastie etablierte die erste stehende Armee und Marine in der islamischen Geschichte und verlegte die Hauptstadt von Medina nach Damaskus?"
    },
    options: {
      en: ["Abbasid Dynasty", "Umayyad Dynasty", "Fatimid Dynasty", "Ottoman Dynasty"],
      ar: ["الدولة العباسية", "الدولة الأموية", "الدولة الفاطمية", "الدولة العثمانية"],
      fr: ["Dynastie Abbasside", "Dynastie Omeyyade", "Dynastie Fatimide", "Dynastie Ottomane"],
      de: ["Abbasiden-Dynastie", "Umayyaden-Dynastie", "Fatimiden-Dynastie", "Osmanische Dynastie"]
    },
    answer: 1,
    explanation: {
      en: "The Umayyad Dynasty (661-750 CE), founded by Muawiyah ibn Abi Sufyan, centralized Islamic governance and expanded the empire from Spain to India, establishing the first permanent Muslim navy.",
      ar: "الدولة الأموية (661-750م) أسسها معاوية بن أبي سفيان، ووسعت الإمبراطورية من الأندلس إلى الهند، وأسست أول أسطول بحري دائم للمسلمين.",
      fr: "La dynastie omeyyade centralisa le gouvernement islamique et établit la première marine musulmane permanente.",
      de: "Die Umayyaden-Dynastie zentralisierte die islamische Regierungsführung und etablierte die erste ständige muslimische Marine."
    }
  },
  {
    id: "h4", category: "history", difficulty: "hard",
    question: {
      en: "Which city served as the capital of the Abbasid Caliphate and became the center of the Islamic Golden Age?",
      ar: "أي مدينة كانت عاصمة الخلافة العباسية وأصبحت مركز العصر الذهبي الإسلامي؟",
      fr: "Quelle ville servit de capitale au Califat Abbasside et devint le centre de l'Âge d'Or islamique?",
      de: "Welche Stadt diente als Hauptstadt des Abbasiden-Kalifats und wurde zum Zentrum des Islamischen Goldenen Zeitalters?"
    },
    options: {
      en: ["Cairo", "Damascus", "Baghdad", "Cordoba"],
      ar: ["القاهرة", "دمشق", "بغداد", "قرطبة"],
      fr: ["Le Caire", "Damas", "Bagdad", "Cordoue"],
      de: ["Kairo", "Damaskus", "Bagdad", "Córdoba"]
    },
    answer: 2,
    explanation: {
      en: "Baghdad, founded in 762 CE by Caliph Al-Mansur, was home to the House of Wisdom (Bayt al-Hikma), where scholars advanced mathematics, astronomy, medicine, and philosophy during the Islamic Golden Age.",
      ar: "بغداد، أسسها الخليفة المنصور عام 762م، كانت موطناً لبيت الحكمة حيث تقدم العلماء في الرياضيات والفلك والطب والفلسفة.",
      fr: "Bagdad, fondée en 762 EC, abritait la Maison de la Sagesse où les savants firent progresser les sciences.",
      de: "Bagdad, gegründet 762 n. Chr., beherbergte das Haus der Weisheit wo Gelehrte Wissenschaften vorantrieben."
    }
  },
  {
    id: "h5", category: "history", difficulty: "hard",
    question: {
      en: "What was the outcome of the Battle of Siffin (657 CE) between Ali ibn Abi Talib and Muawiyah?",
      ar: "ماذا كانت نتيجة معركة صفين (657م) بين علي بن أبي طالب ومعاوية؟",
      fr: "Quel fut le résultat de la Bataille de Siffin (657 EC) entre Ali ibn Abi Talib et Muawiyah?",
      de: "Was war das Ergebnis der Schlacht von Siffin (657 n. Chr.) zwischen Ali ibn Abi Talib und Muawiyah?"
    },
    options: {
      en: ["Decisive victory for Ali", "Decisive victory for Muawiyah", "Stalemate leading to arbitration", "Both sides withdrew without fighting"],
      ar: ["انتصار حاسم لعلي", "انتصار حاسم لمعاوية", "جمود أدى إلى التحكيم", "انسحب الجانبان دون قتال"],
      fr: ["Victoire décisive d'Ali", "Victoire décisive de Muawiyah", "Impasse menant à l'arbitrage", "Les deux camps se retirèrent sans combattre"],
      de: ["Entscheidender Sieg für Ali", "Entscheidender Sieg für Muawiyah", "Pattsituation die zu Schlichtung führte", "Beide Seiten zogen sich ohne Kampf zurück"]
    },
    answer: 2,
    explanation: {
      en: "The battle ended in a stalemate when Muawiyah's soldiers raised Qurans on their spears, calling for arbitration. Ali agreed to arbitration, which led to the Kharijite secession and later his assassination.",
      ar: "انتهت المعركة بالجمود حين رفع جند معاوية المصاحف على رماحهم داعين للتحكيم. أدى ذلك إلى انشقاق الخوارج واستشهاد علي لاحقاً.",
      fr: "La bataille se termina par une impasse et un arbitrage, menant à la sécession kharijite.",
      de: "Die Schlacht endete in einer Pattsituation und führte zur Schlichtung, die zur Abspaltung der Charidschiten führte."
    }
  },

  // ============================================================
  // QURAN - Medium to Hard
  // ============================================================
  {
    id: "q1", category: "quran", difficulty: "hard",
    question: {
      en: "Which surah contains the longest verse (ayat) in the entire Quran?",
      ar: "أي سورة تحتوي على أطول آية في القرآن الكريم كله؟",
      fr: "Quelle sourate contient le plus long verset (ayat) du Coran?",
      de: "Welche Sure enthält den längsten Vers (Ayat) im gesamten Quran?"
    },
    options: {
      en: ["Al-Baqarah", "Al-Imran", "An-Nisa", "Al-Ma'idah"],
      ar: ["البقرة", "آل عمران", "النساء", "المائدة"],
      fr: ["Al-Baqarah", "Al-Imran", "An-Nisa", "Al-Ma'idah"],
      de: ["Al-Baqarah", "Al-Imran", "An-Nisa", "Al-Ma'idah"]
    },
    answer: 0,
    explanation: {
      en: "Ayat al-Dayn (verse 282 of Surah Al-Baqarah) is the longest verse in the Quran, dealing with debt contracts and the importance of written documentation.",
      ar: "آية الدين (الآية 282 من سورة البقرة) هي أطول آية في القرآن، وتتعلق بعقود الدين وأهمية التوثيق الكتابي.",
      fr: "Ayat al-Dayn (verset 282 de la sourate Al-Baqarah) est le plus long verset du Coran, traitant des contrats de dette.",
      de: "Ayat al-Dayn (Vers 282 von Sure Al-Baqarah) ist der längste Vers im Quran über Schuldverträge."
    }
  },
  {
    id: "q2", category: "quran", difficulty: "hard",
    question: {
      en: "Which surah is named after a battle that never actually occurred?",
      ar: "أي سورة سُميت على اسم معركة لم تحدث قط؟",
      fr: "Quelle sourate est nommée d'après une bataille qui n'a jamais eu lieu?",
      de: "Welche Sure ist nach einer Schlacht benannt die nie stattfand?"
    },
    options: {
      en: ["Al-Fath", "Al-Ahzab", "Al-Anfal", "Al-Hashr"],
      ar: ["الفتح", "الأحزاب", "الأنفال", "الحشر"],
      fr: ["Al-Fath", "Al-Ahzab", "Al-Anfal", "Al-Hashr"],
      de: ["Al-Fath", "Al-Ahzab", "Al-Anfal", "Al-Hashr"]
    },
    answer: 0,
    explanation: {
      en: "Surah Al-Fath (The Victory) refers to the Treaty of Hudaybiyyah, which the Quran called a 'clear victory' — even though no battle was fought. The treaty led to the eventual conquest of Mecca.",
      ar: "سورة الفتح تشير إلى صلح الحديبية الذي وصفه القرآن بأنه 'فتح مبين' — رغم عدم وقوع معركة.",
      fr: "La sourate Al-Fath fait référence au traité de Hudaybiyyah, qualifié de 'victoire éclatante' bien qu'aucune bataille n'ait eu lieu.",
      de: "Sure Al-Fath bezieht sich auf den Vertrag von Hudaibiyya, den der Quran als 'klaren Sieg' bezeichnete."
    }
  },
  {
    id: "q3", category: "quran", difficulty: "hard",
    question: {
      en: "What is the name of the only companion mentioned by name in the Quran?",
      ar: "ما اسم الصحابي الوحيد المذكور باسمه في القرآن الكريم؟",
      fr: "Quel est le nom du seul compagnon mentionné par son nom dans le Coran?",
      de: "Wie heißt der einzige Gefährte der namentlich im Quran erwähnt wird?"
    },
    options: {
      en: ["Zayd ibn Harithah", "Abu Bakr al-Siddiq", "Bilal ibn Rabah", "Khalid ibn al-Walid"],
      ar: ["زيد بن حارثة", "أبو بكر الصديق", "بلال بن رباح", "خالد بن الوليد"],
      fr: ["Zayd ibn Harithah", "Abu Bakr al-Siddiq", "Bilal ibn Rabah", "Khalid ibn al-Walid"],
      de: ["Zayd ibn Haritha", "Abu Bakr al-Siddiq", "Bilal ibn Rabah", "Chalid ibn al-Walid"]
    },
    answer: 0,
    explanation: {
      en: "Zayd ibn Harithah (RA), the Prophet's adopted son, is mentioned by name in Surah Al-Ahzab (33:37) regarding his divorce and the Prophet's marriage to Zaynab bint Jahsh.",
      ar: "زيد بن حارثة رضي الله عنه، الابن بالتبني للنبي ﷺ، مذكور باسمه في سورة الأحزاب (33:37).",
      fr: "Zayd ibn Harithah, le fils adoptif du Prophète, est mentionné par son nom dans la sourate Al-Ahzab.",
      de: "Zayd ibn Haritha, der Adoptivsohn des Propheten, wird namentlich in Sure Al-Ahzab erwähnt."
    }
  },
  {
    id: "q4", category: "quran", difficulty: "hard",
    question: {
      en: "Which surah is known for containing the command for Muslims to lower their gaze?",
      ar: "أي سورة تُعرف باحتوائها على الأمر للمسلمين بغض البصر؟",
      fr: "Quelle sourate est connue pour contenir l'ordre aux musulmans de baisser leur regard?",
      de: "Welche Sure ist bekannt für den Befehl an Muslime ihren Blick zu senken?"
    },
    options: {
      en: ["Surah Al-Mu'minun", "Surah An-Nur", "Surah Al-Ahzab", "Surah Al-Hujurat"],
      ar: ["سورة المؤمنون", "سورة النور", "سورة الأحزاب", "سورة الحجرات"],
      fr: ["Sourate Al-Mu'minun", "Sourate An-Nur", "Sourate Al-Ahzab", "Sourate Al-Hujurat"],
      de: ["Sure Al-Mu'minun", "Sure An-Nur", "Sure Al-Ahzab", "Sure Al-Hudschurat"]
    },
    answer: 1,
    explanation: {
      en: "Surah An-Nur (Chapter 24, verses 30-31) commands believing men and women to lower their gaze and guard their modesty.",
      ar: "سورة النور (الفصل 24، الآيات 30-31) تأمر الرجال والنساء المؤمنين بغض البصر وحفظ العفة.",
      fr: "La sourate An-Nur ordonne aux hommes et femmes croyants de baisser leur regard.",
      de: "Sure An-Nur befiehlt gläubigen Männern und Frauen ihren Blick zu senken."
    }
  },
  {
    id: "q5", category: "quran", difficulty: "hard",
    question: {
      en: "What is the meaning of 'Mudawwanah' in Islamic scholarship?",
      ar: "ما معنى 'المدونة' في الدراسات الإسلامية؟",
      fr: "Quelle est la signification de 'Mudawwanah' dans les études islamiques?",
      de: "Was bedeutet 'Mudawwanah' in der islamischen Gelehrsamkeit?"
    },
    options: {
      en: ["A collection of poetry", "A written compilation of legal rulings", "A biography of the Prophet", "A commentary on the Quran"],
      ar: ["مجموعة شعرية", "تجميع مكتوب للأحكام الفقهية", "سيرة النبي ﷺ", "تفسير للقرآن"],
      fr: ["Un recueil de poésie", "Une compilation écrite de jugements juridiques", "Une biographie du Prophète", "Un commentaire du Coran"],
      de: ["Eine Gedichtsammlung", "Eine schriftliche Sammlung von Rechtsurteilen", "Eine Biographie des Propheten", "Ein Kommentar zum Quran"]
    },
    answer: 1,
    explanation: {
      en: "Al-Mudawwanah al-Kubra is a foundational text of the Maliki school of law, compiled by Sahnun from the teachings of Imam Malik.",
      ar: "المدونة الكبرى هي نص تأسيسي للمذهب المالكي، جمعها سحنون من تعاليم الإمام مالك.",
      fr: "Al-Mudawwanah al-Kubra est un texte fondateur de l'école Malikite de jurisprudence.",
      de: "Al-Mudawwanah al-Kubra ist ein grundlegender Text der malikitischen Rechtsschule."
    }
  },

  // ============================================================
  // FIQH - Medium to Hard
  // ============================================================
  {
    id: "f1", category: "fiqh", difficulty: "hard",
    question: {
      en: "What is the minimum amount of wealth (nisab) for Zakat on silver in grams?",
      ar: "ما هو أقل نصاب للزكاة على الفضة بالغرامات؟",
      fr: "Quel est le montant minimum (nisab) pour la Zakat sur l'argent en grammes?",
      de: "Was ist der Mindestbetrag (Nisab) für Zakat auf Silber in Gramm?"
    },
    options: {
      en: ["85 grams", "200 grams", "595 grams", "1000 grams"],
      ar: ["85 غرام", "200 غرام", "595 غرام", "1000 غرام"],
      fr: ["85 grammes", "200 grammes", "595 grammes", "1000 grammes"],
      de: ["85 Gramm", "200 Gramm", "595 Gramm", "1000 Gramm"]
    },
    answer: 2,
    explanation: {
      en: "The nisab for silver is 595 grams (approximately 52.5 tola). For gold, it is 85 grams. Zakat is 2.5% of wealth held for one lunar year above this threshold.",
      ar: "نصاب الفضة هو 595 غراماً، ونصاب الذهب 85 غراماً. الزكاة هي 2.5% من المال المملوك حولاً كاملاً.",
      fr: "Le nisab pour l'argent est de 595 grammes, et pour l'or 85 grammes. La Zakat est de 2,5% sur les biens détenus pendant une année lunaire.",
      de: "Der Nisab für Silber beträgt 595 Gramm und für Gold 85 Gramm. Zakat beträgt 2,5% des über einem Jahr gehaltenen Vermögens."
    }
  },
  {
    id: "f2", category: "fiqh", difficulty: "hard",
    question: {
      en: "In which situation is it permissible to combine Dhuhr and Asr prayers without traveling?",
      ar: "في أي حالة يجوز الجمع بين صلاتي الظهر والعصر بدون سفر؟",
      fr: "Dans quelle situation est-il permis de combiner les prières de Dhuhr et Asr sans voyager?",
      de: "In welcher Situation ist es erlaubt Dhuhr und Asr zu kombinieren ohne zu reisen?"
    },
    options: {
      en: ["During rain or extreme weather", "When one is ill", "During Friday sermon", "Never, only during travel"],
      ar: ["عند المطر أو الطقس القاسي", "عند المرض", "أثناء خطبة الجمعة", "أبداً، فقط أثناء السفر"],
      fr: ["Pendant la pluie ou le mauvais temps", "En cas de maladie", "Pendant le sermon du vendredi", "Jamais, seulement en voyage"],
      de: ["Bei Regen oder extremem Wetter", "Bei Krankheit", "Während der Freitagspredigt", "Nie, nur auf Reisen"]
    },
    answer: 0,
    explanation: {
      en: "Many scholars permit combining prayers (jam') due to rain, heavy snow, mud, or strong cold winds to ease hardship. This is based on hadith where the Prophet combined prayers during rain.",
      ar: "يجيز كثير من العلماء الجمع بين الصلوات بسبب المطر أو الثلج أو الوحل تخفيفاً للمشقة، استناداً إلى فعل النبي ﷺ.",
      fr: "De nombreux savants permettent de combiner les prières en raison de la pluie ou du mauvais temps, selon la pratique du Prophète.",
      de: "Viele Gelehrte erlauben das Kombinieren von Gebeten wegen Regen oder schlechtem Wetter basierend auf der Praxis des Propheten."
    }
  },
  {
    id: "f3", category: "fiqh", difficulty: "hard",
    question: {
      en: "What is the Islamic ruling on tattooing (warsh)?",
      ar: "ما هو الحكم الإسلامي للوشم (الوارش)؟",
      fr: "Quel est le jugement islamique sur le tatouage (warsh)?",
      de: "Was ist das islamische Urteil über Tätowierungen (Warsch)?"
    },
    options: {
      en: ["Permissible for women only", "Permissible if not painful", "Forbidden (haram) because it changes Allah's creation", "Permissible with small designs"],
      ar: ["جائز للنساء فقط", "جائز إذا لم يكن مؤلماً", "حرام لأنه تغيير لخلق الله", "جائز بتصاميم صغيرة"],
      fr: ["Permis pour les femmes seulement", "Permis si indolore", "Interdit (haram) car cela modifie la création d'Allah", "Permis avec de petits motifs"],
      de: ["Nur für Frauen erlaubt", "Erlaubt wenn nicht schmerzhaft", "Verboten (Haram) weil es Allahs Schöpfung verändert", "Erlaubt mit kleinen Designs"]
    },
    answer: 2,
    explanation: {
      en: "The Prophet ﷺ cursed the one who does tattoos and the one who gets them done. It is considered haram because it alters Allah's creation and causes unnecessary pain.",
      ar: "لعن النبي ﷺ الواشمة والمستوشمة، والوشم حرام لأنه تغيير لخلق الله ويسبب ألماً لا داعي له.",
      fr: "Le Prophète a maudit celui qui fait des tatouages et celui qui se fait tatouer. C'est haram car cela modifie la création d'Allah.",
      de: "Der Prophet verfluchte den der Tätowierungen macht und den der sie bekommt. Es ist haram weil es Allahs Schöpfung verändert."
    }
  },
  {
    id: "f4", category: "fiqh", difficulty: "hard",
    question: {
      en: "What is the difference between 'fard' and 'wajib' in Islamic jurisprudence?",
      ar: "ما الفرق بين 'الفرض' و 'الواجب' في الفقه الإسلامي؟",
      fr: "Quelle est la différence entre 'fard' et 'wajib' en jurisprudence islamique?",
      de: "Was ist der Unterschied zwischen 'Fard' und 'Wadschib' in der islamischen Rechtswissenschaft?"
    },
    options: {
      en: ["No difference — same meaning", "Fard is from Quran, wajib is from Sunnah only", "Fard is obligatory with certainty, wajib is obligatory but less than fard in Hanafi school", "Fard is for men, wajib for women"],
      ar: ["لا فرق — نفس المعنى", "الفرض من القرآن والواجب من السنة فقط", "الفرض واجب بيقين، والواجب أقل درجة في المذهب الحنفي", "الفرض للرجال والواجب للنساء"],
      fr: ["Pas de différence", "Fard vient du Coran, wajib seulement de la Sunna", "Fard est obligatoire avec certitude, wajib est obligatoire mais moins que fard selon l'école hanafite", "Fard pour les hommes, wajib pour les femmes"],
      de: ["Kein Unterschied", "Fard kommt aus dem Quran, Wadschib nur aus der Sunna", "Fard ist mit Sicherheit verpflichtend, Wadschib ist verpflichtend aber weniger als Fard in der hanafitischen Schule", "Fard für Männer, Wadschib für Frauen"]
    },
    answer: 2,
    explanation: {
      en: "In Hanafi fiqh, 'fard' is proven by definitive evidence (Quran/mutawatir hadith) and denying it is disbelief. 'Wajib' is proven by speculative evidence — missing it is sinful but doesn't constitute disbelief.",
      ar: "في الفقه الحنفي، 'الفرض' ثابت بدليل قطعي (قرآن/حديث متواتر) وجحده كفر. 'الواجب' ثابت بدليل ظني — تركه إثم لا كفر.",
      fr: "Dans le fiqh hanafite, 'fard' est prouvé par des preuves définitives, 'wajib' par des preuves spéculatives.",
      de: "In der hanafitischen Fiqh ist 'Fard' durch definitive Beweise belegt, 'Wadschib' durch spekulative Beweise."
    }
  },

  // ============================================================
  // PROPHETS - Medium to Hard
  // ============================================================
  {
    id: "p1", category: "prophets", difficulty: "hard",
    question: {
      en: "Which prophet was swallowed by a giant fish and later forgiven after repenting?",
      ar: "أي نبي ابتلعه حوت كبير ثم غُفر له بعد توبته؟",
      fr: "Quel prophète fut avalé par un poisson géant puis pardonné après son repentir?",
      de: "Welcher Prophet wurde von einem riesigen Fisch verschluckt und später nach seiner Reue vergeben?"
    },
    options: {
      en: ["Prophet Musa", "Prophet Ayyub", "Prophet Yunus", "Prophet Yusuf"],
      ar: ["النبي موسى", "النبي أيوب", "النبي يونس", "النبي يوسف"],
      fr: ["Prophète Moussa", "Prophète Ayyub", "Prophète Yunus", "Prophète Yusuf"],
      de: ["Prophet Musa", "Prophet Ayyub", "Prophet Yunus", "Prophet Yusuf"]
    },
    answer: 2,
    explanation: {
      en: "Prophet Yunus (Jonah) left his people without Allah's permission. After being swallowed by a whale, he called out: 'La ilaha illa Anta, subhanaka, inni kuntu min al-zalimin' — 'There is no god but You, glory be to You, I was among the wrongdoers.'",
      ar: "النبي يونس عليه السلام ترك قومه دون إذن الله. نادى في بطن الحوت: 'لا إله إلا أنت سبحانك إني كنت من الظالمين'.",
      fr: "Le prophète Yunus (Jonas) appela depuis le ventre de la baleine: 'Il n'y a de dieu que Toi, gloire à Toi, j'étais parmi les injustes.'",
      de: "Prophet Yunus (Jona) rief aus dem Wal: 'Es gibt keinen Gott außer Dir, gepriesen seist Du, ich war einer der Ungerechten.'"
    }
  },
  {
    id: "p2", category: "prophets", difficulty: "hard",
    question: {
      en: "Which prophet was known as 'Khatim al-Anbiya' (Seal of the Prophets)?",
      ar: "أي نبي عُرف بـ'خاتم الأنبياء'؟",
      fr: "Quel prophète était connu comme 'Khatim al-Anbiya' (Sceau des Prophètes)?",
      de: "Welcher Prophet war als 'Khatim al-Anbiya' (Siegel der Propheten) bekannt?"
    },
    options: {
      en: ["Prophet Isa", "Prophet Ibrahim", "Prophet Muhammad ﷺ", "Prophet Musa"],
      ar: ["النبي عيسى", "النبي إبراهيم", "النبي محمد ﷺ", "النبي موسى"],
      fr: ["Prophète Isa", "Prophète Ibrahim", "Prophète Muhammad ﷺ", "Prophète Moussa"],
      de: ["Prophet Isa", "Prophet Ibrahim", "Prophet Muhammad ﷺ", "Prophet Musa"]
    },
    answer: 2,
    explanation: {
      en: "The Quran states: 'Muhammad is not the father of any of your men, but he is the Messenger of Allah and the Seal of the Prophets.' (33:40) — indicating no prophet will come after him.",
      ar: "القرآن يقول: {مَّا كَانَ مُحَمَّدٌ أَبَا أَحَدٍ مِّن رِّجَالِكُمْ وَلَٰكِن رَّسُولَ اللَّهِ وَخَاتَمَ النَّبِيِّينَ} (33:40).",
      fr: "Le Coran dit: 'Muhammad n'est le père d'aucun de vos hommes, mais il est le Messager d'Allah et le Sceau des Prophètes.' (33:40)",
      de: "Der Quran sagt: 'Muhammad ist nicht der Vater eines eurer Männer, aber er ist der Gesandte Allahs und das Siegel der Propheten.' (33:40)"
    }
  },
  {
    id: "p3", category: "prophets", difficulty: "hard",
    question: {
      en: "Which prophet is known for his patience and was restored to health, wealth, and family after a severe trial?",
      ar: "أي نبي اشتُهر بصبره وأُعيدت له صحته وثروته وعائلته بعد محنة شديدة؟",
      fr: "Quel prophète est connu pour sa patience et fut restauré en santé, richesse et famille après une dure épreuve?",
      de: "Welcher Prophet ist für seine Geduld bekannt und wurde nach einer schweren Prüfung in Gesundheit, Reichtum und Familie wiederhergestellt?"
    },
    options: {
      en: ["Prophet Yunus", "Prophet Ayyub", "Prophet Yaqub", "Prophet Zakariyya"],
      ar: ["النبي يونس", "النبي أيوب", "النبي يعقوب", "النبي زكريا"],
      fr: ["Prophète Yunus", "Prophète Ayyub", "Prophète Yaqub", "Prophète Zakariyya"],
      de: ["Prophet Yunus", "Prophet Ayyub", "Prophet Yaqub", "Prophet Zakariyya"]
    },
    answer: 1,
    explanation: {
      en: "Prophet Ayyub (Job) lost his wealth, children, and health. He remained patient for 18 years. When he called upon Allah, Allah restored him with even more than he had lost, saying 'Strike with your foot — this is a cool bath.' (38:42)",
      ar: "فقد النبي أيوب ثروته وأولاده وصحته. صبر 18 سنة. فلما دعا ربه، رده الله إليه بأفضل مما كان، وقال: {ارْكُضْ بِرِجْلِكَ هَٰذَا مُغْتَسَلٌ بَارِدٌ وَشَرَابٌ} (38:42)",
      fr: "Le prophète Ayyub (Job) perdit sa richesse, ses enfants et sa santé. Il resta patient 18 ans. Allah le restaura ensuite.",
      de: "Prophet Ayyub (Hiob) verlor Reichtum, Kinder und Gesundheit. Er blieb 18 Jahre geduldig. Allah stellte ihn wieder her."
    }
  },
  {
    id: "p4", category: "prophets", difficulty: "hard",
    question: {
      en: "Which prophet was given the miracle of the staff turning into a snake and the shining hand?",
      ar: "أي نبي أُعطي معجزة العصا التي تتحول إلى ثعبان واليد البيضاء؟",
      fr: "Quel prophète reçut le miracle du bâton se transformant en serpent et de la main brillante?",
      de: "Welcher Prophet erhielt das Wunder des Stabs der zur Schlange wird und der leuchtenden Hand?"
    },
    options: {
      en: ["Prophet Sulayman", "Prophet Dawud", "Prophet Musa", "Prophet Isa"],
      ar: ["النبي سليمان", "النبي داوود", "النبي موسى", "النبي عيسى"],
      fr: ["Prophète Sulayman", "Prophète Dawud", "Prophète Moussa", "Prophète Isa"],
      de: ["Prophet Sulayman", "Prophet Dawud", "Prophet Musa", "Prophet Isa"]
    },
    answer: 2,
    explanation: {
      en: "Prophet Musa (Moses) was given nine clear signs including his staff becoming a serpent and his hand shining white when placed in his garment. These were shown to Pharaoh and his court.",
      ar: "أُعطي النبي موسى عليه السلام تسع آيات بينات من بينها العصا واليد البيضاء. أظهرها لفرعون وملئه.",
      fr: "Le prophète Moussa (Moïse) reçut neuf signes clairs dont son bâton et sa main brillante, montrés à Pharaon.",
      de: "Prophet Musa (Moses) erhielt neun klare Zeichen darunter seinen Stab und seine leuchtende Hand, die dem Pharao gezeigt wurden."
    }
  },

  // ============================================================
  // COMPANIONS - Medium to Hard
  // ============================================================
  {
    id: "c1", category: "companions", difficulty: "hard",
    question: {
      en: "Which companion was known as 'The Interpreter of the Quran' (Tarjuman al-Quran) due to his deep knowledge of tafsir?",
      ar: "أي صحابي عُرف بـ'ترجمان القرآن' بسبب معرفته العميقة بالتفسير؟",
      fr: "Quel compagnon était connu comme 'l'Interprète du Coran' (Tarjuman al-Quran) pour sa profonde connaissance du tafsir?",
      de: "Welcher Gefährte war als 'Der Interpret des Qurans' (Tardschuman al-Quran) für sein tiefes Wissen über Tafsir bekannt?"
    },
    options: {
      en: ["Abdullah ibn Masud", "Abdullah ibn Abbas", "Abdullah ibn Umar", "Abdullah ibn Amr"],
      ar: ["عبد الله بن مسعود", "عبد الله بن عباس", "عبد الله بن عمر", "عبد الله بن عمرو"],
      fr: ["Abdullah ibn Masud", "Abdullah ibn Abbas", "Abdullah ibn Umar", "Abdullah ibn Amr"],
      de: ["Abdullah ibn Masud", "Abdullah ibn Abbas", "Abdullah ibn Umar", "Abdullah ibn Amr"]
    },
    answer: 1,
    explanation: {
      en: "Abdullah ibn Abbas (RA), the Prophet's cousin, was called 'Tarjuman al-Quran' because of his exceptional ability to interpret Quranic verses. The Prophet ﷺ prayed for him: 'O Allah, grant him understanding of the religion and teach him interpretation.'",
      ar: "عبد الله بن عباس رضي الله عنه، ابن عم النبي، دُعي 'ترجمان القرآن' لقدرته الاستثنائية على تفسير الآيات. دعا له النبي ﷺ: 'اللهم فقهه في الدين وعلمه التأويل.'",
      fr: "Abdullah ibn Abbas, cousin du Prophète, fut appelé 'Tarjuman al-Quran' pour sa capacité exceptionnelle à interpréter le Coran.",
      de: "Abdullah ibn Abbas, der Cousin des Propheten, wurde 'Tardschuman al-Quran' genannt für seine außergewöhnliche Fähigkeit den Quran zu interpretieren."
    }
  },
  {
    id: "c2", category: "companions", difficulty: "hard",
    question: {
      en: "Which companion was the first to give the Adhan in Islam?",
      ar: "أي صحابي كان أول من أذن في الإسلام؟",
      fr: "Quel compagnon fut le premier à appeler l'Adhan en Islam?",
      de: "Welcher Gefährte rief als erster den Adhan im Islam?"
    },
    options: {
      en: ["Abdullah ibn Zayd", "Bilal ibn Rabah", "Abu Mahdhurah", "Umar ibn al-Khattab"],
      ar: ["عبد الله بن زيد", "بلال بن رباح", "أبو محذورة", "عمر بن الخطاب"],
      fr: ["Abdullah ibn Zayd", "Bilal ibn Rabah", "Abu Mahdhurah", "Umar ibn al-Khattab"],
      de: ["Abdullah ibn Zayd", "Bilal ibn Rabah", "Abu Mahdhura", "Umar ibn al-Khattab"]
    },
    answer: 0,
    explanation: {
      en: "Abdullah ibn Zayd (RA) saw the Adhan in a dream. When he told the Prophet ﷺ, the Prophet said it was a true vision and instructed Bilal to call it. So Abdullah ibn Zayd was the first to conceive the Adhan, while Bilal was the first to call it.",
      ar: "رأى عبد الله بن زيد الأذان في المنام. قال له النبي ﷺ: 'إنها رؤيا حق، ألقها على بلال.' فكان عبد الله أول من ألهم بالأذان، وبلال أول من نادى به.",
      fr: "Abdullah ibn Zayd vit l'Adhan en rêve. Le Prophète dit que c'était une vraie vision et demanda à Bilal de l'appeler.",
      de: "Abdullah ibn Zayd sah den Adhan im Traum. Der Prophet sagte es sei eine wahre Vision und bat Bilal ihn zu rufen."
    }
  },
  {
    id: "c3", category: "companions", difficulty: "hard",
    question: {
      en: "Which companion was martyred at the Battle of Uhud and was called 'Sayyid al-Shuhada' (Master of the Martyrs) by the Prophet ﷺ?",
      ar: "أي صحابي استشهد في غزوة أحد ودعاه النبي ﷺ 'سيد الشهداء'؟",
      fr: "Quel compagnon fut martyrisé à la bataille d'Uhud et fut appelé 'Sayyid al-Shuhada' par le Prophète?",
      de: "Welcher Gefährte wurde in der Schlacht von Uhud gemartert und vom Propheten 'Sayyid al-Schuhada' genannt?"
    },
    options: {
      en: ["Mus'ab ibn Umayr", "Hamzah ibn Abdul-Muttalib", "Anas ibn Nadr", "Abdullah ibn Jahsh"],
      ar: ["مصعب بن عمير", "حمزة بن عبد المطلب", "أنس بن النضر", "عبد الله بن جحش"],
      fr: ["Mus'ab ibn Umayr", "Hamzah ibn Abd al-Muttalib", "Anas ibn Nadr", "Abdullah ibn Jahsh"],
      de: ["Mus'ab ibn Umayr", "Hamza ibn Abd al-Muttalib", "Anas ibn Nadr", "Abdullah ibn Dschahsch"]
    },
    answer: 1,
    explanation: {
      en: "Hamzah ibn Abdul-Muttalib (RA), the Prophet's uncle, was killed by Wahshi ibn Harb at Uhud. The Prophet ﷺ said: 'The best of martyrs is Hamzah ibn Abdul-Muttalib.'",
      ar: "حمزة بن عبد المطلب رضي الله عنه، عم النبي، قتله وحشي بن حرب في أحد. قال النبي ﷺ: 'سيد الشهداء حمزة بن عبد المطلب.'",
      fr: "Hamzah ibn Abd al-Muttalib, l'oncle du Prophète, fut tué à Uhud. Le Prophète dit: 'Le meilleur des martyrs est Hamzah.'",
      de: "Hamza ibn Abd al-Muttalib, der Onkel des Propheten, wurde bei Uhud getötet. Der Prophet sagte: 'Der beste der Märtyrer ist Hamza.'"
    }
  },
  {
    id: "c4", category: "companions", difficulty: "hard",
    question: {
      en: "Which companion was known as 'The Truthful' (al-Siddiq) for his immediate and unquestioning belief in the Prophet's Night Journey?",
      ar: "أي صحابي عُرف بـ'الصديق' لتصديقه الفوري للرسول في رحلة الإسراء والمعراج؟",
      fr: "Quel compagnon était connu comme 'le Véridique' (al-Siddiq) pour sa croyance immédiate et sans questionnement au Voyage Nocturne du Prophète?",
      de: "Welcher Gefährte war als 'der Wahrhaftige' (as-Siddiq) bekannt für seinen sofortigen und fraglosen Glauben an die Nachtreise des Propheten?"
    },
    options: {
      en: ["Umar ibn al-Khattab", "Uthman ibn Affan", "Abu Bakr al-Siddiq", "Ali ibn Abi Talib"],
      ar: ["عمر بن الخطاب", "عثمان بن عفان", "أبو بكر الصديق", "علي بن أبي طالب"],
      fr: ["Umar ibn al-Khattab", "Uthman ibn Affan", "Abu Bakr al-Siddiq", "Ali ibn Abi Talib"],
      de: ["Umar ibn al-Khattab", "Uthman ibn Affan", "Abu Bakr al-Siddiq", "Ali ibn Abi Talib"]
    },
    answer: 2,
    explanation: {
      en: "When disbelievers mocked the Prophet's ﷺ Night Journey, Abu Bakr said: 'If he said it, then it is true.' The Prophet ﷺ then gave him the title 'al-Siddiq' (the Truthful/Verifier of Truth).",
      ar: "حين سخر الكفار من رحلة الإسراء، قال أبو بكر: 'إن قالها لقد صدق.' فلقبه النبي ﷺ بـ'الصديق'.",
      fr: "Quand les mécréants raillèrent le Voyage Nocturne, Abu Bakr dit: 'S'il l'a dit, c'est vrai.' Le Prophète lui donna alors le titre d'al-Siddiq.",
      de: "Als die Ungläubigen die Nachtreise verspotteten, sagte Abu Bakr: 'Wenn er es sagte, ist es wahr.' Der Prophet gab ihm den Titel 'as-Siddiq'."
    }
  },
  {
    id: "c5", category: "companions", difficulty: "hard",
    question: {
      en: "Which companion was the first to embrace Islam from among the youth?",
      ar: "أي صحابي كان أول من أسلم من الشباب؟",
      fr: "Quel compagnon fut le premier à embrasser l'Islam parmi les jeunes?",
      de: "Welcher Gefährte war der erste der den Islam aus der Jugend annahm?"
    },
    options: {
      en: ["Zayd ibn Harithah", "Ali ibn Abi Talib", "Mus'ab ibn Umayr", "Abdullah ibn Masud"],
      ar: ["زيد بن حارثة", "علي بن أبي طالب", "مصعب بن عمير", "عبد الله بن مسعود"],
      fr: ["Zayd ibn Harithah", "Ali ibn Abi Talib", "Mus'ab ibn Umayr", "Abdullah ibn Masud"],
      de: ["Zayd ibn Haritha", "Ali ibn Abi Talib", "Mus'ab ibn Umayr", "Abdullah ibn Masud"]
    },
    answer: 1,
    explanation: {
      en: "Ali ibn Abi Talib (RA) was only about 10 years old when he accepted Islam, making him the first youth to embrace Islam, after Khadijah (first woman) and Abu Bakr (first free man).",
      ar: "علي بن أبي طالب رضي الله عنه كان عمره 10 سنوات تقريباً حين أسلم، فكان أول شباب أسلم، بعد خديجة وأبي بكر.",
      fr: "Ali ibn Abi Talib n'avait qu'environ 10 ans quand il accepta l'Islam, le premier jeune à embrasser l'Islam.",
      de: "Ali ibn Abi Talib war nur etwa 10 Jahre alt als er den Islam annahm, der erste Jugendliche der den Islam annahm."
    }
  }
];