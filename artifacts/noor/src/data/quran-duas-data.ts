type Lang = "en" | "ar" | "fr" | "de";
type L = Record<Lang, string>;

export interface QuranicDua {
  id: number;
  arabic: string;
  transliteration: string;
  reference: string;
  referenceL: L;
  translation: L;
  description: L;
}

export const QURANIC_DUAS: QuranicDua[] = [
  {
    id: 1,
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-naar",
    reference: "2:201",
    referenceL: { en: "Al-Baqarah 2:201", ar: "البقرة ٢:٢٠١", fr: "Al-Baqarah 2:201", de: "Al-Baqara 2:201" },
    translation: {
      en: "Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.",
      ar: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
      fr: "Notre Seigneur, donne-nous le bien en ce monde et le bien dans l'au-delà et préserve-nous du châtiment du Feu.",
      de: "Unser Herr, gib uns das Gute in dieser Welt und das Gute im Jenseits und schütze uns vor der Strafe des Feuers.",
    },
    description: {
      en: "The most comprehensive dua in the Quran — the Prophet ﷺ used to recite it frequently. It asks for goodness in every dimension of life.",
      ar: "من أجمع أدعية القرآن الكريم، وكان النبي ﷺ يكثر منه. يجمع خيري الدنيا والآخرة في كلمات موجزة.",
      fr: "L'une des invocations les plus complètes du Coran, que le Prophète ﷺ récitait souvent. Elle demande le bien sous toutes ses formes.",
      de: "Das umfassendste Bittgebet im Koran — der Prophet ﷺ rezitierte es häufig. Es bittet um das Gute in allen Lebensbereichen.",
    },
  },
  {
    id: 2,
    arabic: "رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنتَ مَوْلَانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
    transliteration: "Rabbana la tu'akhidhna in nasina aw akhta'na, Rabbana wala tahmil 'alayna isran kama hamaltahu 'alal-ladhina min qablina, Rabbana wala tuhammilna ma la taqata lana bihi, wa'fu 'anna waghfir lana warhamna, anta mawlana fansurna 'alal-qawmil-kafirin",
    reference: "2:286",
    referenceL: { en: "Al-Baqarah 2:286", ar: "البقرة ٢:٢٨٦", fr: "Al-Baqarah 2:286", de: "Al-Baqara 2:286" },
    translation: {
      en: "Our Lord, do not impose blame upon us if we have forgotten or erred. Our Lord, and lay not upon us a burden like that which You laid upon those before us. Our Lord, and burden us not with that which we have no ability to bear. And pardon us; and forgive us; and have mercy upon us. You are our protector, so give us victory over the disbelieving people.",
      ar: "رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا، رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا، وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا أَنتَ مَوْلَانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
      fr: "Notre Seigneur, ne nous châtie pas si nous oublions ou si nous commettons des erreurs. Notre Seigneur, ne nous impose pas le fardeau que Tu as imposé à ceux d'avant nous. Notre Seigneur, ne nous charge pas de ce que nous n'avons pas la force de porter. Pardonne-nous, absous-nous et fais-nous miséricorde. Tu es notre Maître, accorde-nous la victoire sur les peuples mécréants.",
      de: "Unser Herr, bestrafe uns nicht, wenn wir vergessen oder irren. Unser Herr, belege uns nicht mit einer Last wie der, die Du denen vor uns auferlegt hast. Unser Herr, belaste uns nicht mit dem, wofür wir keine Kraft haben. Vergib uns, erlasse uns unsere Schuld und erbarme Dich unser. Du bist unser Beschützer.",
    },
    description: {
      en: "The closing verses of Surah Al-Baqarah. The Prophet ﷺ said: 'Whoever recites the last two verses of Surah Al-Baqarah at night, they will suffice him.' (Bukhari)",
      ar: "خاتمة سورة البقرة. قال النبي ﷺ: 'من قرأ بالآيتين من آخر سورة البقرة في ليلة كفتاه' (رواه البخاري).",
      fr: "Les versets de clôture de la Sourate Al-Baqarah. Le Prophète ﷺ a dit : 'Quiconque récite les deux derniers versets de la Sourate Al-Baqarah dans la nuit, cela lui suffira.' (Bukhari)",
      de: "Die Schlussverse der Sure Al-Baqara. Der Prophet ﷺ sagte: 'Wer die letzten zwei Verse der Sure Al-Baqara in der Nacht rezitiert, werden sie ihm genügen.' (Bukhari)",
    },
  },
  {
    id: 3,
    arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ الْوَهَّابُ",
    transliteration: "Rabbana la tuzigh qulubana ba'da idh hadaytana wahab lana min ladunka rahmatan innaka antal-Wahhab",
    reference: "3:8",
    referenceL: { en: "Âl 'Imrân 3:8", ar: "آل عمران ٣:٨", fr: "Âl 'Imrân 3:8", de: "Âl 'Imrân 3:8" },
    translation: {
      en: "Our Lord, let not our hearts deviate after You have guided us and grant us from Yourself mercy. Indeed, You are the Bestower.",
      ar: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً إِنَّكَ أَنتَ الْوَهَّابُ",
      fr: "Notre Seigneur, ne laisse pas nos cœurs dévier après que Tu nous as guidés et accorde-nous de Ta part une miséricorde. Tu es vraiment le Grand Donateur.",
      de: "Unser Herr, lass unsere Herzen nicht abirren, nachdem Du uns geleitet hast, und schenke uns von Dir Barmherzigkeit. Wahrlich, Du bist der große Schenker.",
    },
    description: {
      en: "A dua for steadfastness in faith after receiving guidance. Recited by the deeply rooted in knowledge (ar-rasikhuna fil-'ilm).",
      ar: "دعاء الثبات على الهداية بعد نعمة الإيمان، يرددها الراسخون في العلم خشيةً من الزيغ.",
      fr: "Une invocation pour la constance dans la foi après avoir reçu la guidance. Récitée par ceux qui sont profondément enracinés dans la connaissance.",
      de: "Ein Bittgebet für die Standhaftigkeit im Glauben nach der Rechtleitung. Es wird von den tief in der Erkenntnis Verwurzelten rezitiert.",
    },
  },
  {
    id: 4,
    arabic: "رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا وَإِسْرَافَنَا فِي أَمْرِنَا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
    transliteration: "Rabbana ighfir lana dhunubana wa israfana fi amrina wa thabbit aqdamana wansurna 'alal-qawmil-kafirin",
    reference: "3:147",
    referenceL: { en: "Âl 'Imrân 3:147", ar: "آل عمران ٣:١٤٧", fr: "Âl 'Imrân 3:147", de: "Âl 'Imrân 3:147" },
    translation: {
      en: "Our Lord, forgive us our sins and the excesses we committed in our affairs, make our feet firm, and grant us victory over the disbelieving people.",
      ar: "رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا وَإِسْرَافَنَا فِي أَمْرِنَا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
      fr: "Notre Seigneur, pardonne-nous nos péchés et nos excès en nos affaires, affermis nos pas et accorde-nous la victoire sur les peuples mécréants.",
      de: "Unser Herr, vergib uns unsere Sünden und unsere Maßlosigkeit in unseren Angelegenheiten, mache unsere Schritte fest und verleihe uns den Sieg über das ungläubige Volk.",
    },
    description: {
      en: "The dua of the companions at the Battle of Uhud. A comprehensive prayer asking for forgiveness, steadfastness, and divine support.",
      ar: "دعاء الصحابة يوم أُحُد. جامع للمغفرة والثبات والنصر على الأعداء.",
      fr: "L'invocation des compagnons lors de la bataille d'Ouhoud. Une prière complète demandant pardon, constance et soutien divin.",
      de: "Das Bittgebet der Gefährten bei der Schlacht von Uhud — ein umfassendes Gebet um Vergebung, Standhaftigkeit und göttliche Unterstützung.",
    },
  },
  {
    id: 5,
    arabic: "رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
    transliteration: "Rabbana dhalamna anfusana wa-il-lam taghfir lana watarhamna lanakunanna minal-khasirin",
    reference: "7:23",
    referenceL: { en: "Al-A'raf 7:23", ar: "الأعراف ٧:٢٣", fr: "Al-A'raf 7:23", de: "Al-A'raf 7:23" },
    translation: {
      en: "Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.",
      ar: "رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
      fr: "Notre Seigneur, nous avons fait du tort à nos âmes. Si Tu ne nous pardonnes pas et ne nous fais pas miséricorde, nous serons assurément du nombre des perdants.",
      de: "Unser Herr, wir haben uns selbst Unrecht getan. Wenn Du uns nicht vergibst und Dich unser nicht erbarmst, werden wir gewiss zu den Verlierern gehören.",
    },
    description: {
      en: "The dua of our father Adam and his wife Eve, seeking forgiveness after their trial. A model of sincere repentance and acknowledgment of one's shortcomings.",
      ar: "دعاء أبينا آدم وزوجه حواء عليهما السلام بعد الابتلاء، نموذج التوبة الصادقة والإقرار بالذنب.",
      fr: "L'invocation de notre père Adam et de son épouse Ève après leur épreuve. Un modèle de repentir sincère et de reconnaissance de ses manquements.",
      de: "Das Bittgebet unseres Vaters Adam und seiner Frau Eva nach ihrer Prüfung — ein Modell aufrichtiger Reue und des Eingestehens eigener Fehler.",
    },
  },
  {
    id: 6,
    arabic: "رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا",
    transliteration: "Rabbana atina min ladunka rahmatan wahayyi' lana min amrina rashada",
    reference: "18:10",
    referenceL: { en: "Al-Kahf 18:10", ar: "الكهف ١٨:١٠", fr: "Al-Kahf 18:10", de: "Al-Kahf 18:10" },
    translation: {
      en: "Our Lord, grant us from Yourself mercy and prepare for us from our affair right guidance.",
      ar: "رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا",
      fr: "Notre Seigneur, accorde-nous de Ta part une miséricorde et prépare pour nous une conduite droite dans notre situation.",
      de: "Unser Herr, gewähre uns von Dir Barmherzigkeit und bereite uns in unserer Angelegenheit rechte Führung.",
    },
    description: {
      en: "The dua of the People of the Cave (As-hab al-Kahf), young believers who took refuge in a cave to protect their faith. Recite when seeking guidance and divine mercy.",
      ar: "دعاء أصحاب الكهف الفتية المؤمنين الذين لجأوا إلى الكهف حفاظاً على إيمانهم. يُستحب ترديده عند طلب الهداية والرحمة.",
      fr: "L'invocation des Gens de la Caverne (As-hab al-Kahf), de jeunes croyants qui cherchèrent refuge dans une grotte pour protéger leur foi.",
      de: "Das Bittgebet der Höhlenbewohner (As-hab al-Kahf), junger Gläubiger, die in einer Höhle Zuflucht suchten, um ihren Glauben zu schützen.",
    },
  },
  {
    id: 7,
    arabic: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي ۚ رَبَّنَا وَتَقَبَّلْ دُعَاءِ",
    transliteration: "Rabbi j'alni muqimas-salati wa-min dhurriyyati, Rabbana wa taqabbal du'a'",
    reference: "14:40",
    referenceL: { en: "Ibrahim 14:40", ar: "إبراهيم ١٤:٤٠", fr: "Ibrahim 14:40", de: "Ibrahim 14:40" },
    translation: {
      en: "My Lord, make me an establisher of prayer, and [many] from my descendants. Our Lord, and accept my supplication.",
      ar: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي رَبَّنَا وَتَقَبَّلْ دُعَاءِ",
      fr: "Mon Seigneur, fais de moi quelqu'un qui accomplit la prière, ainsi que de ma descendance. Notre Seigneur, exauce mon invocation.",
      de: "Mein Herr, mach mich zu einem, der das Gebet verrichtet, und auch meine Nachkommen. Unser Herr, nimm mein Gebet an.",
    },
    description: {
      en: "Dua of Prophet Ibrahim ﷺ asking for himself and his descendants to be steadfast in prayer. A beautiful dua for one's family.",
      ar: "دعاء النبي إبراهيم ﷺ لنفسه وذريته بإقامة الصلاة. من أجمل الأدعية للذرية.",
      fr: "Invocation du Prophète Ibrahim ﷺ pour lui-même et ses descendants, demandant la constance dans la prière.",
      de: "Das Bittgebet des Propheten Ibrahim ﷺ für sich selbst und seine Nachkommen um Standhaftigkeit im Gebet.",
    },
  },
  {
    id: 8,
    arabic: "رَّبِّ أَدْخِلْنِي مُدْخَلَ صِدْقٍ وَأَخْرِجْنِي مُخْرَجَ صِدْقٍ وَاجْعَل لِّي مِن لَّدُنكَ سُلْطَانًا نَّصِيرًا",
    transliteration: "Rabbi adkhilni mudkhala sidqin wa-akhrijni mukhraja sidqin waj'al li min ladunka sultanan nasira",
    reference: "17:80",
    referenceL: { en: "Al-Isra 17:80", ar: "الإسراء ١٧:٨٠", fr: "Al-Isra' 17:80", de: "Al-Isra 17:80" },
    translation: {
      en: "My Lord, cause me to enter a sound entrance and to exit a sound exit and grant me from Yourself a supporting authority.",
      ar: "رَّبِّ أَدْخِلْنِي مُدْخَلَ صِدْقٍ وَأَخْرِجْنِي مُخْرَجَ صِدْقٍ وَاجْعَل لِّي مِن لَّدُنكَ سُلْطَانًا نَّصِيرًا",
      fr: "Seigneur, fais-moi entrer d'une façon sincère et fais-moi sortir d'une façon sincère et accorde-moi de Ta part une autorité victorieuse.",
      de: "Mein Herr, lass mich aufrichtig eintreten und aufrichtig austreten, und gewähre mir von Dir eine helfende Autorität.",
    },
    description: {
      en: "Recited when entering and leaving any place — a home, a city, or any new chapter in life. Asks for divine support in every transition.",
      ar: "يُقرأ عند الدخول والخروج من أي مكان أو مرحلة جديدة في الحياة. يطلب التوفيق والعون الإلهي في كل انتقال.",
      fr: "Récité en entrant et en sortant de tout lieu — une maison, une ville, ou tout nouveau chapitre de la vie.",
      de: "Rezitiert beim Betreten und Verlassen eines Ortes — eines Hauses, einer Stadt oder eines neuen Lebensabschnitts.",
    },
  },
  {
    id: 9,
    arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
    transliteration: "Rabbana hab lana min azwajina wa-dhurriyyatina qurrata a'yunin waj'alna lil-muttaqina imama",
    reference: "25:74",
    referenceL: { en: "Al-Furqan 25:74", ar: "الفرقان ٢٥:٧٤", fr: "Al-Furqan 25:74", de: "Al-Furqan 25:74" },
    translation: {
      en: "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous.",
      ar: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
      fr: "Notre Seigneur, accorde-nous, de nos épouses et de notre progéniture, ce qui réjouira nos yeux, et fais de nous un modèle pour les pieux.",
      de: "Unser Herr, schenke uns von unseren Ehefrauen und unserer Nachkommenschaft Freude unserer Augen und mache uns zum Vorbild für die Gottesfürchtigen.",
    },
    description: {
      en: "The dua of 'Ibad ar-Rahman (the servants of the Most Merciful). Recite it often to ask for a righteous family and a legacy of goodness.",
      ar: "دعاء عباد الرحمن الوارد في سورة الفرقان. يُكثر منه طلباً للذرية الصالحة وإمامة المتقين.",
      fr: "L'invocation des 'Ibad ar-Rahman (serviteurs du Très Miséricordieux). Récitez-la souvent pour demander une famille pieuse.",
      de: "Das Bittgebet der 'Ibad ar-Rahman (Diener des Allbarmherzigen). Oft rezitiert für eine rechtschaffene Familie.",
    },
  },
  {
    id: 10,
    arabic: "رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ وَلَا تَجْعَلْ فِي قُلُوبِنَا غِلًّا لِّلَّذِينَ آمَنُوا رَبَّنَا إِنَّكَ رَءُوفٌ رَّحِيمٌ",
    transliteration: "Rabbana ighfir lana wali-ikhwaninal-ladhina sabaquna bil-imani wala taj'al fi qulubina ghillal-lilladhina amanu, Rabbana innaka Ra'ufur-Rahim",
    reference: "59:10",
    referenceL: { en: "Al-Hashr 59:10", ar: "الحشر ٥٩:١٠", fr: "Al-Hashr 59:10", de: "Al-Hashr 59:10" },
    translation: {
      en: "Our Lord, forgive us and our brothers who preceded us in faith and put not in our hearts any resentment toward those who have believed. Our Lord, indeed You are Kind and Merciful.",
      ar: "رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ وَلَا تَجْعَلْ فِي قُلُوبِنَا غِلًّا لِّلَّذِينَ آمَنُوا رَبَّنَا إِنَّكَ رَءُوفٌ رَّحِيمٌ",
      fr: "Notre Seigneur, pardonne-nous ainsi qu'à nos frères qui nous ont précédés dans la foi et ne mets dans nos cœurs aucune rancœur envers ceux qui ont cru. Notre Seigneur, Tu es vraiment Compatissant et Miséricordieux.",
      de: "Unser Herr, vergib uns und unseren Brüdern, die uns im Glauben vorausgegangen sind, und lass in unseren Herzen keinen Groll gegen die Gläubigen entstehen. Unser Herr, wahrlich Du bist Gütig und Barmherzig.",
    },
    description: {
      en: "A dua for all Muslims — past, present, and future — asking for forgiveness and unity of hearts. Shows the deep brotherhood of the believers.",
      ar: "دعاء لكل المسلمين في كل الأزمان، يطلب المغفرة ووحدة القلوب وسلامة الصدور من الغل.",
      fr: "Une invocation pour tous les musulmans — passés, présents et futurs — demandant pardon et unité des cœurs.",
      de: "Ein Bittgebet für alle Muslime — vergangen, gegenwärtig und zukünftig — das Vergebung und Einheit der Herzen erbittet.",
    },
  },
  {
    id: 11,
    arabic: "رَبِّ زِدْنِي عِلْمًا",
    transliteration: "Rabbi zidni 'ilma",
    reference: "20:114",
    referenceL: { en: "Taha 20:114", ar: "طه ٢٠:١١٤", fr: "Taha 20:114", de: "Taha 20:114" },
    translation: {
      en: "My Lord, increase me in knowledge.",
      ar: "رَبِّ زِدْنِي عِلْمًا",
      fr: "Mon Seigneur, accrois mes connaissances.",
      de: "Mein Herr, vermehre mein Wissen.",
    },
    description: {
      en: "The shortest and most eloquent dua for knowledge. Allah commanded the Prophet ﷺ to ask only for increase in knowledge, showing its supreme importance in Islam.",
      ar: "أوجز دعاء للعلم وأبلغه. أمر الله نبيه ﷺ أن يطلب الزيادة في العلم فقط، مما يدل على علو منزلته في الإسلام.",
      fr: "L'invocation la plus courte et la plus éloquente pour la connaissance. Allah a commandé au Prophète ﷺ de demander uniquement l'augmentation du savoir.",
      de: "Das kürzeste und eloquenteste Bittgebet um Wissen. Allah befahl dem Propheten ﷺ, nur um Wissensmehrung zu bitten.",
    },
  },
  {
    id: 12,
    arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَصْلِحْ لِي فِي ذُرِّيَّتِي ۖ إِنِّي تُبْتُ إِلَيْكَ وَإِنِّي مِنَ الْمُسْلِمِينَ",
    transliteration: "Rabbi awzi'ni an ashkura ni'matakal-lati an'amta 'alayya wa 'ala walidayya wa an a'mala salihan tardahu wa-aslih li fi dhurriyyati, inni tubtu ilayka wa-inni minal-muslimin",
    reference: "46:15",
    referenceL: { en: "Al-Ahqaf 46:15", ar: "الأحقاف ٤٦:١٥", fr: "Al-Ahqaf 46:15", de: "Al-Ahqaf 46:15" },
    translation: {
      en: "My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents, and to do righteousness of which You will approve, and make righteous for me my offspring. Indeed, I have repented to You, and indeed, I am of the Muslims.",
      ar: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَصْلِحْ لِي فِي ذُرِّيَّتِي إِنِّي تُبْتُ إِلَيْكَ وَإِنِّي مِنَ الْمُسْلِمِينَ",
      fr: "Mon Seigneur, inspire-moi à être reconnaissant pour Tes bienfaits dont Tu m'as comblé, ainsi que mes parents, et que j'accomplisse une bonne œuvre qui T'agrée. Rends vertueux mes descendants. Je me repens à Toi et je suis du nombre des soumis.",
      de: "Mein Herr, befähige mich, Dir für Deine Gnade dankbar zu sein, die Du mir und meinen Eltern erwiesen hast, rechtschaffen zu handeln, womit Du zufrieden bist, und meiner Nachkommenschaft das Rechte einzugeben. Ich bereue zu Dir und bin einer der Muslime.",
    },
    description: {
      en: "Recommended to be recited when reaching the age of 40. Combines gratitude, righteous action, concern for offspring, repentance, and proclamation of Islam.",
      ar: "يُستحب قراءتها عند بلوغ الأربعين. تجمع الشكر والعمل الصالح والاهتمام بالذرية والتوبة والإسلام.",
      fr: "Recommandée à réciter en atteignant l'âge de 40 ans. Elle combine gratitude, action juste, souci pour la progéniture, repentir et proclamation de l'Islam.",
      de: "Empfohlen beim Erreichen des 40. Lebensjahres. Vereint Dankbarkeit, rechtschaffenes Handeln, Sorge um die Nachkommenschaft, Reue und Bekenntnis zum Islam.",
    },
  },
];
