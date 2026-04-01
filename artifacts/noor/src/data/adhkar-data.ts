export type Lang = "en" | "ar" | "fr" | "de";
export type L = Record<Lang, string>;

export interface Dhikr {
  id: string;
  arabic: string;
  transliteration: string;
  translation: L;
  count: number;
  source?: string;
}

export const ADHKAR_DATA: Record<string, Dhikr[]> = {
  morning: [
    {
      id: "m1", count: 1,
      arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
      transliteration: "A'udhu billahi min ash-shaytaanir-rajeem",
      translation: {
        en: "I seek refuge in Allah from the accursed devil.",
        ar: "أعوذ بالله وأستجير به من الشيطان الرجيم المطرود من رحمة الله.",
        fr: "Je cherche refuge auprès d'Allah contre le Shaytan le maudit.",
        de: "Ich suche Zuflucht bei Allah vor dem verfluchten Shaytan.",
      },
      source: "Quran 16:98",
    },
    {
      id: "m2", count: 1,
      arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
      transliteration: "Allahumma bika asbahna wa bika amsayna wa bika nahya wa bika namutu wa ilayk an-nushur",
      translation: {
        en: "O Allah, by You we enter the morning and by You we enter the evening, by You we live and by You we die, and to You is the Resurrection.",
        ar: "اللهم بقدرتك وتوفيقك أصبحنا وأمسينا، وبك نحيا ونموت، وإليك المرجع والمآب يوم البعث.",
        fr: "Ô Allah, c'est par Toi que nous entrons dans le matin et par Toi dans le soir, par Toi nous vivons et mourons, et c'est vers Toi que sera la Résurrection.",
        de: "O Allah, durch Dich treten wir in den Morgen und in den Abend ein, durch Dich leben und sterben wir, und zu Dir ist die Auferstehung.",
      },
      source: "Abu Dawud",
    },
    {
      id: "m3", count: 1,
      arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
      transliteration: "Asbahna wa asbahal-mulku lillahi walhamdu lillahi la ilaha illallahu wahdahu la sharika lah",
      translation: {
        en: "We have entered the morning and the entire dominion belongs to Allah. Praise is for Allah. There is none worthy of worship but Allah, alone, without partner.",
        ar: "دخلنا في الصباح والملك كله لله وحده، والحمد لله وحده، لا معبود بحق إلا الله وحده لا شريك له.",
        fr: "Nous avons commencé le matin et toute la royauté appartient à Allah. La louange est pour Allah. Il n'y a de dieu digne d'adoration qu'Allah seul, sans associé.",
        de: "Wir sind in den Morgen eingetreten und alle Herrschaft gehört Allah. Lob sei Allah. Es gibt keinen Gott außer Allah, allein, ohne Partner.",
      },
      source: "Muslim",
    },
    {
      id: "m4", count: 1,
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذَا الْيَوْمِ فَتْحَهُ وَنَصْرَهُ وَنُورَهُ وَبَرَكَتَهُ وَهُدَاهُ",
      transliteration: "Allahumma inni as'aluka khayra hadhal-yawmi fathahu wa nasrahu wa nurahu wa barakatahu wa hudah",
      translation: {
        en: "O Allah, I ask You for the good of this day, its victories, its light, its blessings, and its guidance.",
        ar: "اللهم إني أسألك خير هذا اليوم من فتح ونصر وتوفيق وبركة وهداية إلى الصراط المستقيم.",
        fr: "Ô Allah, je Te demande le bien de ce jour, ses victoires, sa lumière, ses bénédictions et sa guidance.",
        de: "O Allah, ich bitte Dich um das Gute dieses Tages, seine Siege, sein Licht, seine Segnungen und seine Führung.",
      },
      source: "Abu Dawud",
    },
    {
      id: "m5", count: 1,
      arabic: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ",
      transliteration: "Allahumma 'afini fi badani, Allahumma 'afini fi sam'i, Allahumma 'afini fi basari, la ilaha illa anta",
      translation: {
        en: "O Allah, grant me health in my body. O Allah, grant me health in my hearing. O Allah, grant me health in my sight. There is none worthy of worship but You.",
        ar: "اللهم أعطني العافية والصحة في جسدي وسمعي وبصري، لا إله إلا أنت وحدك.",
        fr: "Ô Allah, accorde-moi la santé dans mon corps. Ô Allah, accorde-moi la santé dans mon ouïe. Ô Allah, accorde-moi la santé dans ma vue. Il n'y a de dieu que Toi.",
        de: "O Allah, gib mir Gesundheit in meinem Körper. O Allah, gib mir Gesundheit in meinem Gehör. O Allah, gib mir Gesundheit in meinem Sehvermögen. Es gibt keinen Gott außer Dir.",
      },
      source: "Abu Dawud",
    },
    {
      id: "m6", count: 1,
      arabic: "حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
      transliteration: "Hasbiyallahu la ilaha illa huwa 'alayhi tawakkaltu wa huwa rabbul 'arshil 'azim",
      translation: {
        en: "Allah is sufficient for me. There is none worthy of worship but He. I have placed my trust in Him; He is Lord of the Majestic Throne.",
        ar: "يكفيني الله وحده، لا معبود بحق سواه، عليه اعتمدت وتوكلت، وهو رب العرش العظيم.",
        fr: "Allah me suffit. Il n'y a de dieu que Lui. En Lui j'ai placé ma confiance; Il est le Seigneur du Trône Majestueux.",
        de: "Allah genügt mir. Es gibt keinen Gott außer Ihm. Auf Ihn vertraue ich; Er ist der Herr des majestätischen Thrones.",
      },
      source: "Abu Dawud",
    },
    {
      id: "m7", count: 3,
      arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
      transliteration: "Bismillahil-ladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i wa huwas-sami'ul-'alim",
      translation: {
        en: "In the name of Allah, with Whose name nothing on earth or in the heavens can cause harm, and He is the All-Hearing, the All-Knowing.",
        ar: "باسم الله الذي لا يؤذي ولا يضر مع ذكر اسمه شيء في الأرض ولا في السماء، وهو يسمع كل شيء ويعلم كل شيء.",
        fr: "Au nom d'Allah, avec Dont le nom rien sur terre ni dans les cieux ne peut causer de tort, et Il est le Tout-Entendant, l'Omniscient.",
        de: "Im Namen Allahs, mit dessen Namen kein Ding auf Erden oder im Himmel schaden kann, und Er ist der Allhörende, der Allwissende.",
      },
      source: "Abu Dawud, Tirmidhi",
    },
    {
      id: "m8", count: 100,
      arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
      transliteration: "SubhanAllahi wa bihamdih",
      translation: {
        en: "Glory be to Allah and praise be to Him.",
        ar: "أُنزِّه الله عن كل نقص وعيب، وأحمده على نعمه وفضله.",
        fr: "Gloire à Allah et louange à Lui.",
        de: "Preis sei Allah und Lob sei Ihm.",
      },
      source: "Bukhari, Muslim",
    },
    {
      id: "m9", count: 1,
      arabic: "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا",
      transliteration: "Radhitu billahi rabban, wa bil-islami dinan, wa bi-Muhammadin sallallahu 'alayhi wa sallam nabiyya",
      translation: {
        en: "I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad ﷺ as my Prophet.",
        ar: "رضيت واطمأننت بأن الله ربي، والإسلام ديني، ومحمد صلى الله عليه وسلم نبيي ورسولي.",
        fr: "Je suis satisfait d'Allah comme Seigneur, de l'Islam comme religion, et de Muhammad ﷺ comme Prophète.",
        de: "Ich bin zufrieden mit Allah als meinem Herrn, mit dem Islam als meiner Religion, und mit Muhammad ﷺ als meinem Propheten.",
      },
      source: "Abu Dawud, Tirmidhi",
    },
    {
      id: "m10", count: 10,
      arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
      transliteration: "La ilaha illallahu wahdahu la sharika lahu, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir",
      translation: {
        en: "There is none worthy of worship in truth except Allah alone. He has no partners. To Him belongs the dominion, and to Him belongs all praise. He is Able to do all things.",
        ar: "لا معبود بحق إلا الله وحده لا شريك له، له الملك وله الحمد، وهو على كل شيء قدير.",
        fr: "Il n'y a de dieu digne d'adoration qu'Allah seul, sans associé. À Lui la royauté, à Lui la louange, et Il est Omnipuissant.",
        de: "Es gibt keinen Gott außer Allah allein. Er hat keine Partner. Ihm gehört die Herrschaft, Ihm gebührt aller Lobpreis. Er ist zu allem fähig.",
      },
      source: "Bukhari",
    },
  ],

  evening: [
    {
      id: "e1", count: 1,
      arabic: "اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ",
      transliteration: "Allahumma bika amsayna wa bika asbahna wa bika nahya wa bika namutu wa ilayk al-masir",
      translation: {
        en: "O Allah, by You we enter the evening and by You we enter the morning, by You we live and by You we die, and to You is the return.",
        ar: "اللهم بقدرتك دخلنا المساء والصباح، وبك نحيا ونموت، وإليك المرجع يوم القيامة.",
        fr: "Ô Allah, c'est par Toi que nous entrons dans le soir et dans le matin, par Toi nous vivons et mourons, et c'est vers Toi le retour.",
        de: "O Allah, durch Dich treten wir in den Abend und in den Morgen ein, durch Dich leben und sterben wir, und zu Dir ist die Rückkehr.",
      },
      source: "Abu Dawud",
    },
    {
      id: "e2", count: 1,
      arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
      transliteration: "Amsayna wa amsal-mulku lillahi walhamdu lillahi la ilaha illallahu wahdahu la sharika lah",
      translation: {
        en: "We have entered the evening and the entire dominion belongs to Allah. All praise is for Allah. There is none worthy of worship but Allah, alone, without partner.",
        ar: "دخل علينا المساء والملك كله لله، والحمد لله، لا إله إلا الله وحده لا شريك له.",
        fr: "Nous avons commencé le soir et toute la royauté appartient à Allah. Toute louange est pour Allah. Il n'y a de dieu qu'Allah, seul, sans associé.",
        de: "Wir sind in den Abend eingetreten und alle Herrschaft gehört Allah. Aller Lobpreis gebührt Allah. Es gibt keinen Gott außer Allah, allein, ohne Partner.",
      },
      source: "Muslim",
    },
    {
      id: "e3", count: 1,
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا فِيهَا وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ مَا فِيهَا",
      transliteration: "Allahumma inni as'aluka khayra hadhihi al-laylati wa khayra ma fiha wa a'udhu bika min sharrha wa sharri ma fiha",
      translation: {
        en: "O Allah, I ask You for the good of this night and the good of what is in it, and I seek refuge in You from its evil and the evil of what is in it.",
        ar: "اللهم إني أسألك خير هذه الليلة وما فيها من خير، وأستعيذ بك من شرها وشر ما فيها.",
        fr: "Ô Allah, je Te demande le bien de cette nuit et le bien de ce qu'elle contient, et je cherche refuge en Toi contre son mal et le mal de ce qu'elle contient.",
        de: "O Allah, ich bitte Dich um das Gute dieser Nacht und das Gute, was in ihr ist, und ich suche Zuflucht bei Dir vor ihrem Bösen und dem Bösen, was in ihr ist.",
      },
      source: "Muslim",
    },
    {
      id: "e4", count: 7,
      arabic: "حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
      transliteration: "Hasbiyallahu la ilaha illa huwa 'alayhi tawakkaltu wa huwa rabbul 'arshil 'azim",
      translation: {
        en: "Allah is sufficient for me. There is none worthy of worship but He. I have placed my trust in Him; He is Lord of the Majestic Throne.",
        ar: "يكفيني الله، لا إله إلا هو، عليه توكلت واعتمدت، وهو رب العرش العظيم.",
        fr: "Allah me suffit. Il n'y a de dieu que Lui. En Lui j'ai mis ma confiance; Il est le Seigneur du Trône Majestueux.",
        de: "Allah genügt mir. Es gibt keinen Gott außer Ihm. Auf Ihn vertraue ich; Er ist der Herr des majestätischen Thrones.",
      },
      source: "Abu Dawud",
    },
    {
      id: "e5", count: 1,
      arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ",
      transliteration: "Allahumma anta rabbi la ilaha illa anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastata't",
      translation: {
        en: "O Allah, You are my Lord. There is none worthy of worship but You. You created me and I am Your servant, and I abide by Your covenant and promise as best I can.",
        ar: "اللهم أنت ربي وخالقي، لا إله إلا أنت، خلقتني وأنا عبدك، وأنا على عهدك ووعدك بقدر استطاعتي.",
        fr: "Ô Allah, Tu es mon Seigneur. Il n'y a de dieu que Toi. Tu m'as créé et je suis Ton serviteur, et j'observe Ton pacte et Ta promesse du mieux que je peux.",
        de: "O Allah, Du bist mein Herr. Es gibt keinen Gott außer Dir. Du hast mich erschaffen und ich bin Dein Diener, und ich halte so gut ich kann Deinen Bund und Dein Versprechen.",
      },
      source: "Bukhari",
    },
    {
      id: "e6", count: 100,
      arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
      transliteration: "SubhanAllahi wa bihamdih",
      translation: {
        en: "Glory be to Allah and praise be to Him.",
        ar: "تنزيه لله عن كل نقص، وحمد له على كل نعمة.",
        fr: "Gloire à Allah et louange à Lui.",
        de: "Preis sei Allah und Lob sei Ihm.",
      },
      source: "Bukhari, Muslim",
    },
    {
      id: "e7", count: 3,
      arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
      transliteration: "A'udhu bikalimatillahit-tammati min sharri ma khalaq",
      translation: {
        en: "I seek refuge in the perfect words of Allah from the evil of that which He has created.",
        ar: "أستجير بكلمات الله الكاملة التامة من شر كل ما خلقه.",
        fr: "Je cherche refuge dans les paroles parfaites d'Allah contre le mal de ce qu'Il a créé.",
        de: "Ich suche Zuflucht in Allahs vollkommenen Worten vor dem Bösen dessen, was Er erschaffen hat.",
      },
      source: "Muslim",
    },
    {
      id: "e8", count: 1,
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fid-dunya wal-akhira",
      translation: {
        en: "O Allah, I ask You for pardon and well-being in this life and the Hereafter.",
        ar: "اللهم إني أسألك العفو والمغفرة، والعافية والصحة في الدنيا والآخرة.",
        fr: "Ô Allah, je Te demande le pardon et le bien-être en cette vie et dans l'au-delà.",
        de: "O Allah, ich bitte Dich um Vergebung und Wohlergehen in diesem Leben und im Jenseits.",
      },
      source: "Abu Dawud, Ibn Majah",
    },
  ],

  afterPrayer: [
    {
      id: "ap1", count: 3,
      arabic: "أَسْتَغْفِرُ اللَّهَ",
      transliteration: "Astaghfirullah",
      translation: {
        en: "I seek forgiveness from Allah.",
        ar: "أطلب المغفرة والتوبة من الله.",
        fr: "Je demande pardon à Allah.",
        de: "Ich bitte Allah um Vergebung.",
      },
      source: "Muslim",
    },
    {
      id: "ap2", count: 1,
      arabic: "اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",
      transliteration: "Allahumma antas-salamu wa minkas-salamu tabarakta ya dhal-jalali wal-ikram",
      translation: {
        en: "O Allah, You are Peace and from You is peace. Blessed are You, O Possessor of majesty and honor.",
        ar: "اللهم أنت السلام ومنك يأتي السلام، تباركت يا صاحب الجلال والإكرام.",
        fr: "Ô Allah, Tu es la Paix et de Toi vient la paix. Béni sois-Tu, Ô Possesseur de majesté et d'honneur.",
        de: "O Allah, Du bist der Friede und von Dir kommt der Friede. Gesegnet seist Du, O Besitzer von Majestät und Ehre.",
      },
      source: "Muslim",
    },
    {
      id: "ap3", count: 33,
      arabic: "سُبْحَانَ اللَّهِ",
      transliteration: "SubhanAllah",
      translation: {
        en: "Glory be to Allah.",
        ar: "تنزيه لله عن كل نقص.",
        fr: "Gloire à Allah.",
        de: "Preis sei Allah.",
      },
      source: "Muslim",
    },
    {
      id: "ap4", count: 33,
      arabic: "الْحَمْدُ لِلَّهِ",
      transliteration: "Alhamdulillah",
      translation: {
        en: "All praise is for Allah.",
        ar: "جميع الحمد والشكر لله وحده.",
        fr: "Toute louange est pour Allah.",
        de: "Aller Lobpreis gebührt Allah.",
      },
      source: "Muslim",
    },
    {
      id: "ap5", count: 34,
      arabic: "اللَّهُ أَكْبَرُ",
      transliteration: "Allahu Akbar",
      translation: {
        en: "Allah is the Greatest.",
        ar: "الله أعظم وأكبر من كل شيء.",
        fr: "Allah est le Plus Grand.",
        de: "Allah ist der Größte.",
      },
      source: "Muslim",
    },
    {
      id: "ap6", count: 1,
      arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
      transliteration: "La ilaha illallahu wahdahu la sharika lahu, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir",
      translation: {
        en: "There is none worthy of worship except Allah alone, without partner. To Him belongs the dominion and all praise, and He is Able to do all things.",
        ar: "لا إله إلا الله وحده لا شريك له، له الملك وله الحمد، وهو على كل شيء قدير.",
        fr: "Il n'y a de dieu qu'Allah seul, sans associé. À Lui la royauté et toute louange, et Il est Omnipuissant.",
        de: "Es gibt keinen Gott außer Allah allein, ohne Partner. Ihm gehört die Herrschaft und aller Lobpreis, und Er ist zu allem fähig.",
      },
      source: "Muslim",
    },
    {
      id: "ap7", count: 1,
      arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
      transliteration: "Allahumma a'inni 'ala dhikrika wa shukrika wa husni 'ibadatik",
      translation: {
        en: "O Allah, help me to remember You, to give thanks to You, and to worship You well.",
        ar: "اللهم أعنّي وساعدني على ذكرك وشكرك وحسن عبادتك.",
        fr: "Ô Allah, aide-moi à me souvenir de Toi, à Te rendre grâce, et à T'adorer convenablement.",
        de: "O Allah, hilf mir, Dich zu gedenken, Dir zu danken und Dich gut anzubeten.",
      },
      source: "Abu Dawud, Ahmad",
    },
    {
      id: "ap8", count: 1,
      arabic: "آيَةُ الْكُرْسِيِّ: اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ",
      transliteration: "Ayatul Kursi: Allahu la ilaha illa huwal-hayyul-qayyum...",
      translation: {
        en: "Ayat al-Kursi — The Throne Verse: Allah, there is no deity except Him, the Ever-Living, the Sustainer of existence.",
        ar: "آية الكرسي: اللَّه لا معبود بحق إلا هو، الحي الدائم القيوم القائم على كل شيء.",
        fr: "Le Verset du Trône : Allah — il n'y a de divinité que Lui, le Vivant, le Subsistant par Lui-même.",
        de: "Der Thronvers: Allah – es gibt keine Gottheit außer Ihm, dem Ewig-Lebenden, dem Beständigen.",
      },
      source: "Bukhari",
    },
  ],

  sleep: [
    {
      id: "s1", count: 1,
      arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
      transliteration: "Bismika Allahumma amutu wa ahya",
      translation: {
        en: "In Your name O Allah, I die and I live.",
        ar: "باسمك اللهم أنام كأنني أموت، وبك أحيا إذا أيقظتني.",
        fr: "En Ton nom, ô Allah, je meurs et je vis.",
        de: "In Deinem Namen, o Allah, sterbe und lebe ich.",
      },
      source: "Bukhari",
    },
    {
      id: "s2", count: 3,
      arabic: "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ",
      transliteration: "Allahumma qini 'adhabaka yawma tab'athu 'ibadak",
      translation: {
        en: "O Allah, protect me from Your punishment on the Day when You resurrect Your servants.",
        ar: "اللهم أجرني واحفظني من عذابك يوم تبعث الخلق للحساب.",
        fr: "Ô Allah, protège-moi de Ton châtiment le Jour où Tu ressusciteras Tes serviteurs.",
        de: "O Allah, schütze mich vor Deiner Strafe an dem Tag, an dem Du Deine Diener auferweckst.",
      },
      source: "Abu Dawud, Ahmad",
    },
    {
      id: "s3", count: 1,
      arabic: "الَّلهُمَّ بِاسْمِكَ أَحْيَا وَأَمُوتُ",
      transliteration: "Allahumma bismika ahya wa amut",
      translation: {
        en: "O Allah, in Your name I live and die.",
        ar: "اللهم باسمك وبذكرك أحيا وأموت.",
        fr: "Ô Allah, en Ton nom je vis et je meurs.",
        de: "O Allah, in Deinem Namen lebe und sterbe ich.",
      },
      source: "Bukhari",
    },
    {
      id: "s4", count: 33,
      arabic: "سُبْحَانَ اللَّهِ",
      transliteration: "SubhanAllah",
      translation: {
        en: "Glory be to Allah.",
        ar: "تنزيه لله عن كل نقص.",
        fr: "Gloire à Allah.",
        de: "Preis sei Allah.",
      },
      source: "Bukhari, Muslim",
    },
    {
      id: "s5", count: 33,
      arabic: "الْحَمْدُ لِلَّهِ",
      transliteration: "Alhamdulillah",
      translation: {
        en: "All praise is for Allah.",
        ar: "جميع الحمد لله على نعمه.",
        fr: "Toute louange est pour Allah.",
        de: "Aller Lobpreis gebührt Allah.",
      },
      source: "Bukhari, Muslim",
    },
    {
      id: "s6", count: 34,
      arabic: "اللَّهُ أَكْبَرُ",
      transliteration: "Allahu Akbar",
      translation: {
        en: "Allah is the Greatest.",
        ar: "الله أعظم وأكبر من كل شيء.",
        fr: "Allah est le Plus Grand.",
        de: "Allah ist der Größte.",
      },
      source: "Bukhari, Muslim",
    },
    {
      id: "s7", count: 1,
      arabic: "اللَّهُمَّ خَلَقْتَ نَفْسِي وَأَنْتَ تَتَوَفَّاهَا، لَكَ مَمَاتُهَا وَمَحْيَاهَا، إِنْ أَحْيَيْتَهَا فَاحْفَظْهَا",
      transliteration: "Allahumma khalaqta nafsi wa anta tatawaffaha, laka mamatuha wa mahyaha, in ahyaytaha fahfazha",
      translation: {
        en: "O Allah, You created my soul and You will take it. Its death and life belong to You. If You keep it alive, then protect it.",
        ar: "اللهم أنت خلقت روحي وأنت تتوفاها، لك موتها وحياتها، فإن أبقيتها فاحفظها.",
        fr: "Ô Allah, Tu as créé mon âme et c'est Toi qui la reprendras. Sa mort et sa vie T'appartiennent. Si Tu la maintiens en vie, protège-la.",
        de: "O Allah, Du hast meine Seele erschaffen und Du wirst sie nehmen. Ihr Tod und ihr Leben gehören Dir. Wenn Du sie am Leben erhältst, dann beschütze sie.",
      },
      source: "Muslim",
    },
    {
      id: "s8", count: 1,
      arabic: "اللَّهُمَّ أَسْلَمْتُ نَفْسِي إِلَيْكَ وَفَوَّضْتُ أَمْرِي إِلَيْكَ وَأَلْجَأْتُ ظَهْرِي إِلَيْكَ رَهْبَةً وَرَغْبَةً إِلَيْكَ",
      transliteration: "Allahumma aslamtu nafsi ilayka wa fawwadtu amri ilayka wa alja'tu zahri ilayka, rahbatan wa raghbatan ilayk",
      translation: {
        en: "O Allah, I submit myself to You, I entrust my affairs to You, and I lean upon You in hope and fear of You.",
        ar: "اللهم أسلمت نفسي وفوضت أمري إليك وألجأت ظهري إليك، خوفاً منك ورجاءً فيك.",
        fr: "Ô Allah, je me soumets à Toi, je confie mes affaires à Toi, et je m'appuie sur Toi dans l'espoir et la crainte de Toi.",
        de: "O Allah, ich ergebe mich Dir, ich vertraue meine Angelegenheiten Dir an und stütze mich auf Dich in Hoffnung und Furcht vor Dir.",
      },
      source: "Bukhari, Muslim",
    },
  ],

  eating: [
    {
      id: "eat1", count: 1,
      arabic: "بِسْمِ اللَّهِ",
      transliteration: "Bismillah",
      translation: {
        en: "In the name of Allah. (Said before eating)",
        ar: "أبدأ بذكر اسم الله قبل الأكل.",
        fr: "Au nom d'Allah. (Dit avant de manger)",
        de: "Im Namen Allahs. (Vor dem Essen gesagt)",
      },
      source: "Bukhari, Muslim",
    },
    {
      id: "eat2", count: 1,
      arabic: "بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ",
      transliteration: "Bismillahi wa 'ala barakatillah",
      translation: {
        en: "In the name of Allah and with the blessings of Allah.",
        ar: "أبدأ طعامي باسم الله وبركته.",
        fr: "Au nom d'Allah et avec les bénédictions d'Allah.",
        de: "Im Namen Allahs und mit den Segnungen Allahs.",
      },
      source: "Abu Dawud",
    },
    {
      id: "eat3", count: 1,
      arabic: "بِسْمِ اللَّهِ أَوَّلَهُ وَآخِرَهُ",
      transliteration: "Bismillahi awwalahu wa akhirah",
      translation: {
        en: "In the name of Allah at its beginning and at its end. (If you forgot to say Bismillah at the start)",
        ar: "باسم الله في أول الطعام وآخره. (تُقال إذا نسي ذكر الله في البداية)",
        fr: "Au nom d'Allah au début et à la fin. (Si vous avez oublié de dire Bismillah au début)",
        de: "Im Namen Allahs am Anfang und am Ende. (Wenn man Bismillah zu Beginn vergessen hat)",
      },
      source: "Abu Dawud, Tirmidhi",
    },
    {
      id: "eat4", count: 1,
      arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
      transliteration: "Alhamdulillahil-ladhi at'amani hadha wa razaqanihi min ghayri hawlin minni wa la quwwa",
      translation: {
        en: "All praise is for Allah who fed me this and provided it for me without any might or power on my part. (After eating)",
        ar: "الحمد لله الذي أطعمني ورزقني هذا الطعام دون حول مني أو قوة. (بعد الأكل)",
        fr: "Toute louange est pour Allah qui m'a nourri de ceci et me l'a accordé sans aucune force ni puissance de ma part. (Après manger)",
        de: "Aller Lobpreis gebührt Allah, der mich damit gespeist und es mir bereitgestellt hat, ohne jede Kraft oder Macht meinerseits. (Nach dem Essen)",
      },
      source: "Abu Dawud, Tirmidhi",
    },
    {
      id: "eat5", count: 1,
      arabic: "اللَّهُمَّ بَارِكْ لَنَا فِيهِ وَأَطْعِمْنَا خَيْرًا مِنْهُ",
      transliteration: "Allahumma barik lana fihi wa at'imna khayran minh",
      translation: {
        en: "O Allah, bless us in it and give us better than it.",
        ar: "اللهم بارك لنا فيما رزقتنا وارزقنا خيراً منه.",
        fr: "Ô Allah, bénis-nous en cela et donne-nous mieux que cela.",
        de: "O Allah, segne uns darin und gib uns Besseres davon.",
      },
      source: "Tirmidhi, Ibn Majah",
    },
    {
      id: "eat6", count: 1,
      arabic: "اللَّهُمَّ أَطْعِمْ مَنْ أَطْعَمَنِي وَاسْقِ مَنْ سَقَانِي",
      transliteration: "Allahumma at'im man at'amani wasqi man saqani",
      translation: {
        en: "O Allah, feed the one who fed me and give drink to the one who gave me drink.",
        ar: "اللهم أطعم من أطعمني وارزقه، واسق من سقاني وبارك له.",
        fr: "Ô Allah, nourris celui qui m'a nourri et abreuve celui qui m'a abreuvé.",
        de: "O Allah, ernähre denjenigen, der mich ernährt hat und gib demjenigen zu trinken, der mir zu trinken gegeben hat.",
      },
      source: "Muslim",
    },
  ],

  travel: [
    {
      id: "tr1", count: 1,
      arabic: "اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنقَلِبُونَ",
      transliteration: "Allahu akbar, Allahu akbar, Allahu akbar. Subhanal-ladhi sakhkhara lana hadha wa ma kunna lahu muqrinin, wa inna ila rabbina lamunqalibun",
      translation: {
        en: "Allah is the Greatest (×3). Glory be to Him who has subjected this to us and we could not have subdued it ourselves. And indeed, to our Lord we will surely return. (When mounting a vehicle)",
        ar: "الله أكبر ثلاثاً، سبحان الذي سخر لنا هذه الوسيلة وما كنا له مطيقين، وإنا إلى ربنا لراجعون. (تُقال عند ركوب المركوب)",
        fr: "Allah est le Plus Grand (×3). Gloire à Celui qui nous a soumis cela alors que nous n'aurions pu le maîtriser seuls. Et en vérité, nous retournerons vers notre Seigneur. (En montant un véhicule)",
        de: "Allah ist der Größte (×3). Preis sei Ihm, der uns dies unterworfen hat, obwohl wir es nicht hätten bezwingen können. Und wahrlich, zu unserem Herrn werden wir zurückkehren. (Beim Besteigen eines Fahrzeugs)",
      },
      source: "Abu Dawud, Tirmidhi",
    },
    {
      id: "tr2", count: 1,
      arabic: "اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى وَمِنَ الْعَمَلِ مَا تَرْضَى",
      transliteration: "Allahumma inna nas'aluka fi safarina hadhal-birra wat-taqwa wa minal-'amali ma tarda",
      translation: {
        en: "O Allah, we ask You for righteousness and piety on this journey, and for deeds that please You.",
        ar: "اللهم إنا نسألك في سفرنا هذا البر والتقوى والأعمال الصالحة التي ترضاها.",
        fr: "Ô Allah, nous Te demandons dans ce voyage la droiture, la piété et les actes qui Te plaisent.",
        de: "O Allah, wir bitten Dich auf dieser Reise um Rechtschaffenheit, Gottesfurcht und Taten, die Dir gefallen.",
      },
      source: "Muslim",
    },
    {
      id: "tr3", count: 1,
      arabic: "اللَّهُمَّ اطْوِ لَنَا الأَرْضَ وَهَوِّنْ عَلَيْنَا السَّفَرَ",
      transliteration: "Allahumma iwil-lana al-arda wa hawwin 'alayna as-safar",
      translation: {
        en: "O Allah, compress the earth for us and make the journey easy for us.",
        ar: "اللهم قرّب لنا المسافة وسهّل علينا هذا السفر.",
        fr: "Ô Allah, rapproche la terre pour nous et facilite-nous le voyage.",
        de: "O Allah, verkürze für uns die Erde und erleichtere uns die Reise.",
      },
      source: "Ahmad",
    },
    {
      id: "tr4", count: 1,
      arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
      transliteration: "A'udhu bikalimatillahit-tammati min sharri ma khalaq",
      translation: {
        en: "I seek refuge in the perfect words of Allah from the evil of that which He has created. (When stopping at a place during travel)",
        ar: "أستجير بكلمات الله الكاملة من شر كل ما خلق. (تُقال عند النزول في مكان أثناء السفر)",
        fr: "Je cherche refuge dans les paroles parfaites d'Allah contre le mal de ce qu'Il a créé. (Lors d'un arrêt en voyage)",
        de: "Ich suche Zuflucht in Allahs vollkommenen Worten vor dem Bösen dessen, was Er erschaffen hat. (Bei einer Rast während der Reise)",
      },
      source: "Muslim",
    },
    {
      id: "tr5", count: 1,
      arabic: "اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ وَالْخَلِيفَةُ فِي الأَهْلِ",
      transliteration: "Allahumma antas-sahibu fis-safari wal-khalifatu fil-ahl",
      translation: {
        en: "O Allah, You are my companion on this journey and the Guardian of my family in my absence.",
        ar: "اللهم أنت رفيقي في هذا السفر وحافظ أهلي في غيابي.",
        fr: "Ô Allah, Tu es mon compagnon dans ce voyage et le Gardien de ma famille en mon absence.",
        de: "O Allah, Du bist mein Begleiter auf dieser Reise und der Beschützer meiner Familie in meiner Abwesenheit.",
      },
      source: "Muslim, Tirmidhi",
    },
    {
      id: "tr6", count: 1,
      arabic: "آيِبُونَ تَائِبُونَ عَابِدُونَ لِرَبِّنَا حَامِدُونَ",
      transliteration: "Ayibuna, ta'ibuna, 'abiduna, li-rabbina hamidun",
      translation: {
        en: "We return, repent, worship, and praise our Lord. (Said when returning from travel)",
        ar: "راجعون تائبون عابدون لربنا حامدون له. (تُقال عند العودة من السفر)",
        fr: "Nous revenons, nous nous repentissons, nous adorons et louons notre Seigneur. (Lors du retour de voyage)",
        de: "Wir kehren zurück, bereuen, beten an und loben unseren Herrn. (Beim Zurückkehren von der Reise)",
      },
      source: "Bukhari, Muslim",
    },
  ],
};

export const CATEGORY_META: Record<string, { en: string; ar: string; fr: string; de: string; icon: string }> = {
  morning:    { en: "Morning",     ar: "أذكار الصباح",       fr: "Matin",       de: "Morgen",       icon: "🌅" },
  evening:    { en: "Evening",     ar: "أذكار المساء",       fr: "Soir",        de: "Abend",        icon: "🌙" },
  afterPrayer:{ en: "After Prayer",ar: "أذكار بعد الصلاة",   fr: "Après Salat", de: "Nach Gebet",   icon: "🤲" },
  sleep:      { en: "Sleep",       ar: "أذكار النوم",        fr: "Sommeil",     de: "Schlaf",       icon: "😴" },
  eating:     { en: "Eating",      ar: "أذكار الأكل",        fr: "Repas",       de: "Essen",        icon: "🍽️" },
  travel:     { en: "Travel",      ar: "أذكار السفر",        fr: "Voyage",      de: "Reise",        icon: "✈️" },
};
