type Lang = "en" | "ar" | "fr" | "de";
type L = Record<Lang, string>;

export interface CompletionDua {
  id: number;
  arabic: string;
  transliteration: string;
  source: L;
  translation: L;
  note: L;
}

export const COMPLETION_DUAS: CompletionDua[] = [
  {
    id: 1,
    arabic: "اللَّهُمَّ ارْحَمْنِي بِالْقُرْآنِ، وَاجْعَلْهُ لِي إِمَامًا وَنُورًا وَهُدًى وَرَحْمَةً، اللَّهُمَّ ذَكِّرْنِي مِنْهُ مَا نَسِيتُ، وَعَلِّمْنِي مِنْهُ مَا جَهِلْتُ، وَارْزُقْنِي تِلَاوَتَهُ آنَاءَ اللَّيْلِ وَأَطْرَافَ النَّهَارِ، وَاجْعَلْهُ لِي حُجَّةً يَا رَبَّ الْعَالَمِينَ",
    transliteration: "Allahummar-hamni bil-Qur'an, waj'alhu li imaman wa nuran wa hudaw wa rahmah, Allahumma dhakkirni minhu ma nasitu, wa 'allimni minhu ma jahiltu, warzuqni tilawatahu ana'al-layli wa-atrafa-n-nahari, waj'alhu li hujjatan ya Rabbal-'alamin",
    source: {
      en: "Reported from the Prophet ﷺ (Ibn Abi Shaybah, Al-Hakim — authenticated)",
      ar: "مرويّ عن النبي ﷺ (ابن أبي شيبة والحاكم — صحّحه بعض العلماء)",
      fr: "Rapporté du Prophète ﷺ (Ibn Abi Shaybah, Al-Hakim — authentifié)",
      de: "Überliefert vom Propheten ﷺ (Ibn Abi Shaybah, Al-Hakim — authentifiziert)",
    },
    translation: {
      en: "O Allah, have mercy on me through the Quran, make it for me a guide, a light, a guidance, and a mercy. O Allah, remind me of what I have forgotten from it, teach me what I am ignorant of, grant me its recitation during the hours of the night and the ends of the day, and make it a proof for me, O Lord of the worlds.",
      ar: "اللَّهُمَّ ارْحَمْنِي بِالْقُرْآنِ، وَاجْعَلْهُ لِي إِمَامًا وَنُورًا وَهُدًى وَرَحْمَةً، اللَّهُمَّ ذَكِّرْنِي مِنْهُ مَا نَسِيتُ، وَعَلِّمْنِي مِنْهُ مَا جَهِلْتُ، وَارْزُقْنِي تِلَاوَتَهُ آنَاءَ اللَّيْلِ وَأَطْرَافَ النَّهَارِ، وَاجْعَلْهُ لِي حُجَّةً يَا رَبَّ الْعَالَمِينَ",
      fr: "Ô Allah, aie pitié de moi grâce au Coran, fais-en pour moi un guide, une lumière, une direction et une miséricorde. Ô Allah, rappelle-moi ce que j'en ai oublié, enseigne-moi ce que j'en ignore, accorde-moi de le réciter aux heures de la nuit et aux extrémités du jour, et fais-en une preuve en ma faveur, ô Seigneur des mondes.",
      de: "O Allah, erbarme Dich meiner durch den Koran, mach ihn zu meinem Führer, einem Licht, einer Rechtleitung und einer Barmherzigkeit. O Allah, erinnere mich an das, was ich davon vergessen habe, lehre mich, was ich nicht weiß, schenke mir seine Rezitation in den Stunden der Nacht und an den Enden des Tages.",
    },
    note: {
      en: "The main dua for completing the Quran — recited after finishing the entire mushaf. Combines praise, gratitude, and asking for continued attachment to the Book of Allah.",
      ar: "الدعاء الرئيسي لختم القرآن الكريم، يُقرأ بعد الانتهاء من المصحف الشريف. يجمع الحمد والشكر والطلب بدوام الصلة بكتاب الله.",
      fr: "L'invocation principale pour la complétion du Coran — récitée après avoir terminé tout le mushaf. Combine louange, gratitude et demande d'attachement continu au Livre d'Allah.",
      de: "Das Hauptbittgebet zur Vollendung des Korans — nach dem Abschluss des gesamten Mushaf rezitiert. Vereint Lob, Dankbarkeit und die Bitte um anhaltende Verbundenheit mit dem Buch Allahs.",
    },
  },
  {
    id: 2,
    arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ",
    transliteration: "Subhanakal-lahumma wa bihamdika, ash-hadu an la ilaha illa anta, astaghfiruka wa atubu ilayk",
    source: {
      en: "Authentic hadith (Muslim, Abu Dawud) — recited at the end of gatherings",
      ar: "حديث صحيح (مسلم وأبو داود) — يُقال في ختام كل مجلس",
      fr: "Hadith authentique (Muslim, Abu Dawud) — récité à la fin des réunions",
      de: "Authentischer Hadith (Muslim, Abu Dawud) — am Ende von Versammlungen rezitiert",
    },
    translation: {
      en: "Glory be to You, O Allah, and by Your praise. I testify that there is no god but You. I seek Your forgiveness and I repent to You.",
      ar: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ",
      fr: "Gloire à Toi, ô Allah, et par Tes louanges. Je témoigne qu'il n'y a de dieu que Toi. Je Te demande pardon et je me repens à Toi.",
      de: "Herrlichkeit sei Dir, o Allah, und durch Dein Lob. Ich bezeuge, dass es keinen Gott außer Dir gibt. Ich bitte Dich um Vergebung und bereue zu Dir.",
    },
    note: {
      en: "Recited to close the Quran completion gathering (khatma). The Prophet ﷺ said this dua 'expiates whatever wrong occurred during the gathering.'",
      ar: "يُختتم به مجلس الختم. قال النبي ﷺ إن هذا الذكر 'كفّارة ما كان في المجلس من لغو'.",
      fr: "Récité pour clôturer la réunion de complétion du Coran (khatma). Le Prophète ﷺ a dit que cette invocation 'expie tout ce qui s'est mal passé durant la réunion.'",
      de: "Rezitiert zum Abschluss der Koranvollendungsversammlung (Khatma). Der Prophet ﷺ sagte, dieses Bittgebet 'sühnt alles, was in der Versammlung falsch lief.'",
    },
  },
  {
    id: 3,
    arabic: "اللَّهُمَّ إِنِّي عَبْدُكَ، وَابْنُ عَبْدِكَ، وَابْنُ أَمَتِكَ، نَاصِيَتِي بِيَدِكَ، مَاضٍ فِيَّ حُكْمُكَ، عَدْلٌ فِيَّ قَضَاؤُكَ، أَسْأَلُكَ بِكُلِّ اسْمٍ هُوَ لَكَ سَمَّيْتَ بِهِ نَفْسَكَ أَوْ أَنْزَلْتَهُ فِي كِتَابِكَ، أَوْ عَلَّمْتَهُ أَحَدًا مِنْ خَلْقِكَ، أَوِ اسْتَأْثَرْتَ بِهِ فِي عِلْمِ الْغَيْبِ عِنْدَكَ، أَنْ تَجْعَلَ الْقُرْآنَ رَبِيعَ قَلْبِي، وَنُورَ صَدْرِي، وَجَلَاءَ حُزْنِي، وَذَهَابَ هَمِّي",
    transliteration: "Allahumma inni 'abduka wabnu 'abdika wabnu amatika, nasiyati bi-yadika, madin fiyya hukmuka, 'adlun fiyya qada'uka, as'aluka bi-kulli ismin huwa laka sammayta bihi nafsaka, aw anzaltahu fi kitabika, aw 'allamtahu ahadan min khalqika, awista'tharta bihi fi 'ilmil-ghaybi 'indaka, an taj'alal-Qur'ana rabi'a qalbi wa-nura sadri wa-jala'a huzni wa-dhahaba hammi",
    source: {
      en: "Authentic (Ahmad, Ibn Hibban) — from the hadith of 'Abdullah ibn Mas'ud ‌رضي الله عنه",
      ar: "صحيح (أحمد وابن حبان) — من حديث عبد الله بن مسعود رضي الله عنه",
      fr: "Authentique (Ahmad, Ibn Hibban) — du hadith de 'Abdullah ibn Mas'ud ‌رضي الله عنه",
      de: "Authentisch (Ahmad, Ibn Hibban) — aus dem Hadith von 'Abdullah ibn Mas'ud ‌رضي الله عنه",
    },
    translation: {
      en: "O Allah, I am Your servant, son of Your servant, son of Your female servant. My forelock is in Your hand; Your command over me is forever executed; Your decree over me is just. I ask You by every name belonging to You which You have named Yourself, or revealed in Your Book, or taught to any of Your creation, or kept to Yourself in the knowledge of the unseen, to make the Quran the spring of my heart, the light of my breast, the banisher of my sadness, and the reliever of my distress.",
      ar: "اللَّهُمَّ إِنِّي عَبْدُكَ وَابْنُ عَبْدِكَ، نَاصِيَتِي بِيَدِكَ، أَسْأَلُكَ أَنْ تَجْعَلَ الْقُرْآنَ رَبِيعَ قَلْبِي، وَنُورَ صَدْرِي، وَجَلَاءَ حُزْنِي، وَذَهَابَ هَمِّي",
      fr: "Ô Allah, je suis Ton serviteur, fils de Ton serviteur, fils de Ta servante. Mon destin est entre Tes mains... Je Te demande de faire du Coran le printemps de mon cœur, la lumière de ma poitrine, le dissipateur de ma tristesse et le soulagement de mon angoisse.",
      de: "O Allah, ich bin Dein Diener, Sohn Deines Dieners... Ich bitte Dich, den Koran zum Frühling meines Herzens, zum Licht meiner Brust, zum Vertreiber meiner Traurigkeit und zur Linderung meines Kummers zu machen.",
    },
    note: {
      en: "One of the greatest duas connected to the Quran. The Prophet ﷺ said whoever recites it, Allah will remove his grief and replace it with joy. Recite upon completion of the Quran.",
      ar: "من أعظم الأدعية المتعلقة بالقرآن. قال النبي ﷺ: 'إلا أذهب الله حزنه وأبدله مكانه فرحاً'. يُقرأ عند ختم القرآن.",
      fr: "L'une des plus grandes invocations liées au Coran. Le Prophète ﷺ a dit que celui qui la récite, Allah éloignera son chagrin et le remplacera par la joie.",
      de: "Eines der größten Bittgebete in Verbindung mit dem Koran. Der Prophet ﷺ sagte, wer es rezitiert, wird Allah seine Trauer nehmen und durch Freude ersetzen.",
    },
  },
  {
    id: 4,
    arabic: "آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ ۚ وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ",
    transliteration: "Amanar-Rasulu bima unzila ilayhi mir-Rabbihi wal-mu'minun, kullun amana billahi wa-mala'ikatihi wa-kutubihi wa-rusulihi, la nufarriqu bayna ahadin mir-rusulihi, wa qalu sami'na wa-ata'na, ghufranaka Rabbana wa-ilaykal-masir",
    source: {
      en: "Al-Baqarah 2:285 — The Prophet ﷺ said these two closing verses of Al-Baqarah suffice whoever recites them at night (Bukhari & Muslim)",
      ar: "البقرة ٢:٢٨٥ — قال النبي ﷺ: 'من قرأ الآيتين من آخر سورة البقرة في ليلة كفتاه' (متفق عليه)",
      fr: "Al-Baqarah 2:285 — Le Prophète ﷺ a dit que ces deux versets de clôture suffisent à celui qui les récite la nuit (Bukhari & Muslim)",
      de: "Al-Baqara 2:285 — Der Prophet ﷺ sagte, diese beiden Schlussverse der Al-Baqara genügen demjenigen, der sie nachts rezitiert (Bukhari & Muslim)",
    },
    translation: {
      en: "The Messenger has believed in what was revealed to him from his Lord, and [so have] the believers. All of them have believed in Allah and His angels and His books and His messengers, [saying], 'We make no distinction between any of His messengers.' And they say, 'We hear and we obey. [We seek] Your forgiveness, our Lord, and to You is the [final] destination.'",
      ar: "آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ، كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ، لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ، وَقَالُوا سَمِعْنَا وَأَطَعْنَا غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ",
      fr: "Le Messager a cru en ce qui lui a été révélé par son Seigneur, et les croyants aussi. Chacun a cru en Allah, en Ses anges, en Ses livres et en Ses messagers. 'Nous n'établissons de distinction entre aucun de Ses messagers.' Et ils dirent: 'Nous avons entendu et nous avons obéi. Pardonne-nous, notre Seigneur. C'est vers Toi que se fait le retour.'",
      de: "Der Gesandte glaubt an das, was zu ihm von seinem Herrn herabgesandt wurde, und [so tun es] die Gläubigen. Sie alle glauben an Allah, Seine Engel, Seine Bücher und Seine Gesandten. 'Wir machen keinen Unterschied zwischen Seinen Gesandten.' Und sie sagen: 'Wir hören und gehorchen. [Wir erbitten] Deine Vergebung, unser Herr.'",
    },
    note: {
      en: "Traditionally recited at the beginning of every Quran completion gathering. These two closing verses of Surah Al-Baqarah carry immense virtue.",
      ar: "يُقرأ تقليدياً في بداية كل ختمة. لهذين الختامين من سورة البقرة فضل عظيم جاء في الحديث الصحيح.",
      fr: "Traditionnellement récité au début de chaque réunion de complétion du Coran. Ces deux versets de clôture de la Sourate Al-Baqarah ont une immense vertu.",
      de: "Traditionell zu Beginn jeder Koranvollendungsversammlung rezitiert. Diese beiden Schlussverse der Sure Al-Baqara haben immense Tugend.",
    },
  },
  {
    id: 5,
    arabic: "اللَّهُمَّ اجْعَلْنَا مِمَّنْ يُجِلُّ الْقُرْآنَ، اللَّهُمَّ اجْعَلْنَا مِمَّنْ يَتْلُو كِتَابَكَ آنَاءَ اللَّيْلِ وَأَطْرَافَ النَّهَارِ، اللَّهُمَّ اجْعَلِ الْقُرْآنَ حُجَّتَنَا لَا حُجَّةً عَلَيْنَا، اللَّهُمَّ ارْزُقْنَا بِهِ عِلْمًا نَافِعًا وَعَمَلًا صَالِحًا وَرِزْقًا وَاسِعًا",
    transliteration: "Allahumma ij'alna mimman yujalillul-Qur'an, Allahumma ij'alna mimman yatlu kitabaka ana'al-layli wa-atrafa-n-nahari, Allahummaj'alil-Qur'ana hujjatana la hujjatan 'alayna, Allahummar-zuqna bihi 'ilman nafi'an wa-'amalan saliha wa rizqan wasi'a",
    source: {
      en: "Reported from the scholars of the Salaf — recited as a supplication for Quran completion gatherings",
      ar: "مأثور عن علماء السلف الصالح، يُقرأ في مجالس ختم القرآن الكريم",
      fr: "Rapporté des savants du Salaf — récité comme supplication lors des réunions de complétion du Coran",
      de: "Von den Gelehrten der Salaf überliefert — als Bittgebet bei Koranvollendungsversammlungen rezitiert",
    },
    translation: {
      en: "O Allah, make us among those who venerate the Quran. O Allah, make us among those who recite Your Book in the hours of the night and the ends of the day. O Allah, make the Quran a proof for us and not against us. O Allah, provide us through it with beneficial knowledge, righteous deeds, and ample provision.",
      ar: "اللَّهُمَّ اجْعَلْنَا مِمَّنْ يُجِلُّ الْقُرْآنَ، اجْعَلْنَا مِمَّنْ يَتْلُوهُ آنَاءَ اللَّيْلِ وَأَطْرَافَ النَّهَارِ، اجْعَلْهُ حُجَّةً لَنَا لَا عَلَيْنَا، وَارْزُقْنَا بِهِ عِلْمًا نَافِعًا وَعَمَلًا صَالِحًا",
      fr: "Ô Allah, fais de nous ceux qui vénèrent le Coran. Ô Allah, fais de nous ceux qui récitent Ton Livre aux heures de la nuit et aux extrémités du jour. Ô Allah, fais du Coran une preuve en notre faveur et non contre nous. Dote-nous grâce à lui d'une connaissance utile, d'œuvres vertueuses et d'une subsistance abondante.",
      de: "O Allah, mach uns zu denen, die den Koran ehren. O Allah, mach uns zu denen, die Dein Buch in den Stunden der Nacht und an den Enden des Tages rezitieren. O Allah, mach den Koran zu einem Beweis für uns und nicht gegen uns.",
    },
    note: {
      en: "A comprehensive supplication for all participants in a Quran completion gathering — asking for continued love of the Quran, beneficial knowledge, and steadfastness.",
      ar: "دعاء جامع لجميع الحاضرين في مجلس الختم يطلب دوام محبة القرآن والعلم النافع والثبات.",
      fr: "Une supplication complète pour tous les participants à une réunion de complétion du Coran — demandant un amour continu du Coran, la connaissance utile et la constance.",
      de: "Ein umfassendes Bittgebet für alle Teilnehmer einer Koranvollendungsversammlung — um anhaltende Liebe zum Koran, nützliches Wissen und Standhaftigkeit.",
    },
  },
  {
    id: 6,
    arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ، اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
    transliteration: "Allahumma salli 'ala Muhammadin wa 'ala ali Muhammadin kama sallayta 'ala Ibrahima wa 'ala ali Ibrahim, innaka Hamidun Majid; Allahumma barik 'ala Muhammadin wa 'ala ali Muhammadin kama barakta 'ala Ibrahima wa 'ala ali Ibrahima innaka Hamidun Majid",
    source: {
      en: "The Ibrahimiyya Salawat — Bukhari and Muslim — recited in every prayer and highly recommended at Quran completion",
      ar: "الصلاة الإبراهيمية — متفق عليه — تُقرأ في كل صلاة وتُستحب بعد ختم القرآن",
      fr: "La Salawat Ibrahimiyya — Bukhari et Muslim — récitée dans chaque prière et hautement recommandée lors de la complétion du Coran",
      de: "Die Ibrahimiyya Salawat — Bukhari und Muslim — in jedem Gebet rezitiert und bei der Koranvollendung sehr empfohlen",
    },
    translation: {
      en: "O Allah, send blessings upon Muhammad and the family of Muhammad, as You sent blessings upon Ibrahim and the family of Ibrahim. Indeed, You are Praiseworthy and Glorious. O Allah, bless Muhammad and the family of Muhammad as You blessed Ibrahim and the family of Ibrahim. Indeed, You are Praiseworthy and Glorious.",
      ar: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
      fr: "Ô Allah, envoie Tes bénédictions sur Muhammad et sur la famille de Muhammad, comme Tu as envoyé Tes bénédictions sur Ibrahim et sur la famille d'Ibrahim. Certes, Tu es Digne de louanges, Plein de Gloire.",
      de: "O Allah, sende Segen auf Muhammad und die Familie Muhammads, wie Du Segen gesandt hast auf Ibrahim und die Familie Ibrahims. Wahrlich, Du bist Lobenswert und Herrlich.",
    },
    note: {
      en: "Always begin and end any dua, especially at Quran completion, with salawat on the Prophet ﷺ. The Prophet ﷺ said duas are 'suspended between heaven and earth' until salawat is sent upon him.",
      ar: "يُستحب افتتاح كل دعاء وختمه بالصلاة على النبي ﷺ. قال ﷺ: 'كل دعاء محجوب حتى يُصلى على النبي'.",
      fr: "Commencez et terminez toujours toute invocation, surtout lors de la complétion du Coran, par des salawat sur le Prophète ﷺ.",
      de: "Beginne und beende immer jedes Bittgebet, insbesondere bei der Koranvollendung, mit Salawat auf den Propheten ﷺ.",
    },
  },
];
