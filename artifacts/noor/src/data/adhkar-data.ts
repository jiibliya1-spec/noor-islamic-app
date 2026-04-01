export interface Dhikr {
  id: string;
  arabic: string;
  transliteration: string;
  translation: string;
  count: number;
  source?: string;
}

export const ADHKAR_DATA: Record<string, Dhikr[]> = {
  morning: [
    {
      id: "m1", count: 1,
      arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
      transliteration: "A'udhu billahi min ash-shaytaanir-rajeem",
      translation: "I seek refuge in Allah from the accursed devil.",
      source: "Quran 16:98",
    },
    {
      id: "m2", count: 1,
      arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
      transliteration: "Allahumma bika asbahna wa bika amsayna wa bika nahya wa bika namutu wa ilayk an-nushur",
      translation: "O Allah, by You we enter the morning and by You we enter the evening, by You we live and by You we die, and to You is the Resurrection.",
      source: "Abu Dawud",
    },
    {
      id: "m3", count: 1,
      arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
      transliteration: "Asbahna wa asbahal-mulku lillahi walhamdu lillahi la ilaha illallahu wahdahu la sharika lah",
      translation: "We have entered the morning and the entire dominion belongs to Allah. Praise is for Allah. There is none worthy of worship but Allah, alone, without partner.",
      source: "Muslim",
    },
    {
      id: "m4", count: 1,
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذَا الْيَوْمِ فَتْحَهُ وَنَصْرَهُ وَنُورَهُ وَبَرَكَتَهُ وَهُدَاهُ",
      transliteration: "Allahumma inni as'aluka khayra hadhal-yawmi fathahu wa nasrahu wa nurahu wa barakatahu wa hudah",
      translation: "O Allah, I ask You for the good of this day, its victories, its light, its blessings, and its guidance.",
      source: "Abu Dawud",
    },
    {
      id: "m5", count: 1,
      arabic: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ",
      transliteration: "Allahumma 'afini fi badani, Allahumma 'afini fi sam'i, Allahumma 'afini fi basari, la ilaha illa anta",
      translation: "O Allah, grant me health in my body. O Allah, grant me health in my hearing. O Allah, grant me health in my sight. There is none worthy of worship but You.",
      source: "Abu Dawud",
    },
    {
      id: "m6", count: 1,
      arabic: "حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
      transliteration: "Hasbiyallahu la ilaha illa huwa 'alayhi tawakkaltu wa huwa rabbul 'arshil 'azim",
      translation: "Allah is sufficient for me. There is none worthy of worship but He. I have placed my trust in Him; He is Lord of the Majestic Throne.",
      source: "Abu Dawud",
    },
    {
      id: "m7", count: 3,
      arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
      transliteration: "Bismillahil-ladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i wa huwas-sami'ul-'alim",
      translation: "In the name of Allah, with Whose name nothing on earth or in the heavens can cause harm, and He is the All-Hearing, the All-Knowing.",
      source: "Abu Dawud, Tirmidhi",
    },
    {
      id: "m8", count: 100,
      arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
      transliteration: "SubhanAllahi wa bihamdih",
      translation: "Glory be to Allah and praise be to Him.",
      source: "Bukhari, Muslim",
    },
    {
      id: "m9", count: 1,
      arabic: "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا",
      transliteration: "Radhitu billahi rabban, wa bil-islami dinan, wa bi-Muhammadin sallallahu 'alayhi wa sallam nabiyya",
      translation: "I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad ﷺ as my Prophet.",
      source: "Abu Dawud, Tirmidhi",
    },
    {
      id: "m10", count: 10,
      arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
      transliteration: "La ilaha illallahu wahdahu la sharika lahu, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir",
      translation: "There is none worthy of worship in truth except Allah alone. He has no partners. To Him belongs the dominion, and to Him belongs all praise. He is Able to do all things.",
      source: "Bukhari",
    },
  ],

  evening: [
    {
      id: "e1", count: 1,
      arabic: "اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ",
      transliteration: "Allahumma bika amsayna wa bika asbahna wa bika nahya wa bika namutu wa ilayk al-masir",
      translation: "O Allah, by You we enter the evening and by You we enter the morning, by You we live and by You we die, and to You is the return.",
      source: "Abu Dawud",
    },
    {
      id: "e2", count: 1,
      arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
      transliteration: "Amsayna wa amsal-mulku lillahi walhamdu lillahi la ilaha illallahu wahdahu la sharika lah",
      translation: "We have entered the evening and the entire dominion belongs to Allah. All praise is for Allah. There is none worthy of worship but Allah, alone, without partner.",
      source: "Muslim",
    },
    {
      id: "e3", count: 1,
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا فِيهَا وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ مَا فِيهَا",
      transliteration: "Allahumma inni as'aluka khayra hadhihi al-laylati wa khayra ma fiha wa a'udhu bika min sharrha wa sharri ma fiha",
      translation: "O Allah, I ask You for the good of this night and the good of what is in it, and I seek refuge in You from its evil and the evil of what is in it.",
      source: "Muslim",
    },
    {
      id: "e4", count: 7,
      arabic: "حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
      transliteration: "Hasbiyallahu la ilaha illa huwa 'alayhi tawakkaltu wa huwa rabbul 'arshil 'azim",
      translation: "Allah is sufficient for me. There is none worthy of worship but He. I have placed my trust in Him; He is Lord of the Majestic Throne.",
      source: "Abu Dawud",
    },
    {
      id: "e5", count: 1,
      arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ",
      transliteration: "Allahumma anta rabbi la ilaha illa anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastata't",
      translation: "O Allah, You are my Lord. There is none worthy of worship but You. You created me and I am Your servant, and I abide by Your covenant and promise as best I can.",
      source: "Bukhari",
    },
    {
      id: "e6", count: 100,
      arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
      transliteration: "SubhanAllahi wa bihamdih",
      translation: "Glory be to Allah and praise be to Him.",
      source: "Bukhari, Muslim",
    },
    {
      id: "e7", count: 3,
      arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
      transliteration: "A'udhu bikalimatillahit-tammati min sharri ma khalaq",
      translation: "I seek refuge in the perfect words of Allah from the evil of that which He has created.",
      source: "Muslim",
    },
    {
      id: "e8", count: 1,
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fid-dunya wal-akhira",
      translation: "O Allah, I ask You for pardon and well-being in this life and the Hereafter.",
      source: "Abu Dawud, Ibn Majah",
    },
  ],

  afterPrayer: [
    {
      id: "ap1", count: 3,
      arabic: "أَسْتَغْفِرُ اللَّهَ",
      transliteration: "Astaghfirullah",
      translation: "I seek forgiveness from Allah.",
      source: "Muslim",
    },
    {
      id: "ap2", count: 1,
      arabic: "اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",
      transliteration: "Allahumma antas-salamu wa minkas-salamu tabarakta ya dhal-jalali wal-ikram",
      translation: "O Allah, You are Peace and from You is peace. Blessed are You, O Possessor of majesty and honor.",
      source: "Muslim",
    },
    {
      id: "ap3", count: 33,
      arabic: "سُبْحَانَ اللَّهِ",
      transliteration: "SubhanAllah",
      translation: "Glory be to Allah.",
      source: "Muslim",
    },
    {
      id: "ap4", count: 33,
      arabic: "الْحَمْدُ لِلَّهِ",
      transliteration: "Alhamdulillah",
      translation: "All praise is for Allah.",
      source: "Muslim",
    },
    {
      id: "ap5", count: 34,
      arabic: "اللَّهُ أَكْبَرُ",
      transliteration: "Allahu Akbar",
      translation: "Allah is the Greatest.",
      source: "Muslim",
    },
    {
      id: "ap6", count: 1,
      arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
      transliteration: "La ilaha illallahu wahdahu la sharika lahu, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir",
      translation: "There is none worthy of worship except Allah alone, without partner. To Him belongs the dominion and all praise, and He is Able to do all things.",
      source: "Muslim",
    },
    {
      id: "ap7", count: 1,
      arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
      transliteration: "Allahumma a'inni 'ala dhikrika wa shukrika wa husni 'ibadatik",
      translation: "O Allah, help me to remember You, to give thanks to You, and to worship You well.",
      source: "Abu Dawud, Ahmad",
    },
    {
      id: "ap8", count: 1,
      arabic: "آيَةُ الْكُرْسِيِّ: اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ",
      transliteration: "Ayatul Kursi: Allahu la ilaha illa huwal-hayyul-qayyum, la ta'khudhuhu sinatun wa la nawm...",
      translation: "Ayat al-Kursi: Allah — there is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep...",
      source: "Bukhari",
    },
  ],

  sleep: [
    {
      id: "s1", count: 1,
      arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
      transliteration: "Bismika Allahumma amutu wa ahya",
      translation: "In Your name O Allah, I die and I live.",
      source: "Bukhari",
    },
    {
      id: "s2", count: 3,
      arabic: "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ",
      transliteration: "Allahumma qini 'adhabaka yawma tab'athu 'ibadak",
      translation: "O Allah, protect me from Your punishment on the Day when You resurrect Your servants.",
      source: "Abu Dawud, Ahmad",
    },
    {
      id: "s3", count: 1,
      arabic: "الَّلهُمَّ بِاسْمِكَ أَحْيَا وَأَمُوتُ",
      transliteration: "Allahumma bismika ahya wa amut",
      translation: "O Allah, in Your name I live and die.",
      source: "Bukhari",
    },
    {
      id: "s4", count: 33,
      arabic: "سُبْحَانَ اللَّهِ",
      transliteration: "SubhanAllah",
      translation: "Glory be to Allah.",
      source: "Bukhari, Muslim",
    },
    {
      id: "s5", count: 33,
      arabic: "الْحَمْدُ لِلَّهِ",
      transliteration: "Alhamdulillah",
      translation: "All praise is for Allah.",
      source: "Bukhari, Muslim",
    },
    {
      id: "s6", count: 34,
      arabic: "اللَّهُ أَكْبَرُ",
      transliteration: "Allahu Akbar",
      translation: "Allah is the Greatest.",
      source: "Bukhari, Muslim",
    },
    {
      id: "s7", count: 1,
      arabic: "اللَّهُمَّ خَلَقْتَ نَفْسِي وَأَنْتَ تَتَوَفَّاهَا لَكَ مَمَاتُهَا وَمَحْيَاهَا إِنْ أَحْيَيْتَهَا فَاحْفَظْهَا",
      transliteration: "Allahumma khalaqta nafsi wa anta tatawaffaha, laka mamatuha wa mahyaha, in ahyaytaha fahfazha",
      translation: "O Allah, You created my soul and You will take it. Its death and life belong to You. If You keep it alive, then protect it.",
      source: "Muslim",
    },
    {
      id: "s8", count: 1,
      arabic: "اللَّهُمَّ أَسْلَمْتُ نَفْسِي إِلَيْكَ وَفَوَّضْتُ أَمْرِي إِلَيْكَ وَأَلْجَأْتُ ظَهْرِي إِلَيْكَ رَهْبَةً وَرَغْبَةً إِلَيْكَ",
      transliteration: "Allahumma aslamtu nafsi ilayka wa fawwadtu amri ilayka wa alja'tu zahri ilayka, rahbatan wa raghbatan ilayk",
      translation: "O Allah, I submit myself to You, I entrust my affairs to You, and I lean upon You in hope and fear of You.",
      source: "Bukhari, Muslim",
    },
  ],

  eating: [
    {
      id: "eat1", count: 1,
      arabic: "بِسْمِ اللَّهِ",
      transliteration: "Bismillah",
      translation: "In the name of Allah. (Said before eating)",
      source: "Bukhari, Muslim",
    },
    {
      id: "eat2", count: 1,
      arabic: "بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ",
      transliteration: "Bismillahi wa 'ala barakatillah",
      translation: "In the name of Allah and with the blessings of Allah. (Full supplication before eating)",
      source: "Abu Dawud",
    },
    {
      id: "eat3", count: 1,
      arabic: "بِسْمِ اللَّهِ أَوَّلَهُ وَآخِرَهُ",
      transliteration: "Bismillahi awwalahu wa akhirah",
      translation: "In the name of Allah at its beginning and at its end. (If you forget to say Bismillah at the start, say this)",
      source: "Abu Dawud, Tirmidhi",
    },
    {
      id: "eat4", count: 1,
      arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
      transliteration: "Alhamdulillahil-ladhi at'amani hadha wa razaqanihi min ghayri hawlin minni wa la quwwa",
      translation: "All praise is for Allah who fed me this and provided it for me without any might or power on my part. (After eating)",
      source: "Abu Dawud, Tirmidhi",
    },
    {
      id: "eat5", count: 1,
      arabic: "اللَّهُمَّ بَارِكْ لَنَا فِيهِ وَأَطْعِمْنَا خَيْرًا مِنْهُ",
      transliteration: "Allahumma barik lana fihi wa at'imna khayran minh",
      translation: "O Allah, bless us in it and give us better than it. (After drinking milk)",
      source: "Tirmidhi, Ibn Majah",
    },
    {
      id: "eat6", count: 1,
      arabic: "اللَّهُمَّ أَطْعِمْ مَنْ أَطْعَمَنِي وَاسْقِ مَنْ سَقَانِي",
      transliteration: "Allahumma at'im man at'amani wasqi man saqani",
      translation: "O Allah, feed the one who fed me and give drink to the one who gave me drink.",
      source: "Muslim",
    },
  ],

  travel: [
    {
      id: "tr1", count: 1,
      arabic: "اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنقَلِبُونَ",
      transliteration: "Allahu akbar, Allahu akbar, Allahu akbar. Subhanal-ladhi sakhkhara lana hadha wa ma kunna lahu muqrinin, wa inna ila rabbina lamunqalibun",
      translation: "Allah is the Greatest (×3). Glory be to Him who has subjected this to us and we could not have subdued it ourselves. And indeed, to our Lord we will surely return. (Said when mounting a vehicle)",
      source: "Abu Dawud, Tirmidhi",
    },
    {
      id: "tr2", count: 1,
      arabic: "اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى وَمِنَ الْعَمَلِ مَا تَرْضَى",
      transliteration: "Allahumma inna nas'aluka fi safarina hadhal-birra wat-taqwa wa minal-'amali ma tarda",
      translation: "O Allah, we ask You for righteousness and piety on this journey of ours, and for deeds that please You.",
      source: "Muslim",
    },
    {
      id: "tr3", count: 1,
      arabic: "اللَّهُمَّ اطْوِ لَنَا الأَرْضَ وَهَوِّنْ عَلَيْنَا السَّفَرَ",
      transliteration: "Allahumma iwil-lana al-arda wa hawwin 'alayna as-safar",
      translation: "O Allah, compress the earth for us and make the journey easy for us.",
      source: "Ahmad",
    },
    {
      id: "tr4", count: 1,
      arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
      transliteration: "A'udhu bikalimatillahit-tammati min sharri ma khalaq",
      translation: "I seek refuge in the perfect words of Allah from the evil of that which He has created. (Said when stopping at a place during travel)",
      source: "Muslim",
    },
    {
      id: "tr5", count: 1,
      arabic: "اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ وَالْخَلِيفَةُ فِي الأَهْلِ",
      transliteration: "Allahumma antas-sahibu fis-safari wal-khalifatu fil-ahl",
      translation: "O Allah, You are my companion on this journey and the Guardian of my family in my absence.",
      source: "Muslim, Tirmidhi",
    },
    {
      id: "tr6", count: 1,
      arabic: "آيِبُونَ تَائِبُونَ عَابِدُونَ لِرَبِّنَا حَامِدُونَ",
      transliteration: "Ayibuna, ta'ibuna, 'abiduna, li-rabbina hamidun",
      translation: "We return, repent, worship, and praise our Lord. (Said when returning from travel)",
      source: "Bukhari, Muslim",
    },
  ],
};

export const CATEGORY_META: Record<string, { en: string; ar: string; fr: string; de: string; icon: string }> = {
  morning: { en: "Morning", ar: "أذكار الصباح", fr: "Matin", de: "Morgen", icon: "🌅" },
  evening: { en: "Evening", ar: "أذكار المساء", fr: "Soir", de: "Abend", icon: "🌙" },
  afterPrayer: { en: "After Prayer", ar: "أذكار بعد الصلاة", fr: "Après Salat", de: "Nach Gebet", icon: "🤲" },
  sleep: { en: "Sleep", ar: "أذكار النوم", fr: "Sommeil", de: "Schlaf", icon: "😴" },
  eating: { en: "Eating", ar: "أذكار الأكل", fr: "Repas", de: "Essen", icon: "🍽️" },
  travel: { en: "Travel", ar: "أذكار السفر", fr: "Voyage", de: "Reise", icon: "✈️" },
};
