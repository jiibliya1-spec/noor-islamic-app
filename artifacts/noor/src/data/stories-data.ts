export type Lang = "en" | "ar" | "fr" | "de";
export type L = Record<Lang, string>;

export interface IslamicStory {
  id: string;
  category: "prophet" | "companions" | "history" | "prophets" | "moral";
  title: L;
  arabicOpening: string;
  content: L;
  moral: L;
  readingTime: number;
  bg?: string;
  emoji?: string;
}

export const ISLAMIC_STORIES: IslamicStory[] = [
  {
    id: "s1",
    category: "prophet",
    title: {
      en: "The Character of the Prophet ﷺ",
      ar: "أخلاق النبي ﷺ",
      fr: "Le Caractère du Prophète ﷺ",
      de: "Der Charakter des Propheten ﷺ",
    },
    arabicOpening: "وَإِنَّكَ لَعَلَىٰ خُلُقٍ عَظِيمٍ — القلم: ٤",
    content: {
      en: `The Prophet Muhammad ﷺ was described by Allah in the Quran as being "upon a great moral character" (68:4). His wife Aisha (RA), when asked about his character, replied: "His character was the Quran."

The Prophet ﷺ was the most generous of people. He never refused anyone who asked him. Anas ibn Malik, who served the Prophet for ten years, said: "He never said 'uff' (a word of irritation) to me, and he never said 'why did you do it?' when I did something, nor 'why didn't you do it?' when I didn't."

Once, a Bedouin man came and pulled the Prophet's cloak so roughly that it left a mark on his neck. He then demanded: "Give me from the wealth of Allah that is with you!" The Prophet ﷺ turned to him, smiled, and ordered that he be given a gift.

When the Prophet ﷺ walked in the streets, he would greet children, inquire about the sick, and never look down on the poor. He would visit the sick regardless of their faith. When a young Jewish boy who used to serve him fell ill, the Prophet ﷺ visited him and invited him to Islam. The boy looked at his father, who nodded. The boy embraced Islam, and the Prophet left saying: "Praise be to Allah who saved him from the Fire."

His humility was extraordinary. He would sit on the floor, eat with his fingers, and mend his own shoes. He refused special honor saying: "I am only a servant. I eat as a servant eats and I sit as a servant sits."`,
      ar: `وصف الله نبيه محمداً ﷺ في القرآن الكريم بأنه "عَلَىٰ خُلُقٍ عَظِيمٍ" (القلم: 4). وحين سُئلت زوجته عائشة رضي الله عنها عن خُلقه قالت: "كان خُلقه القرآن."

كان النبي ﷺ أجود الناس وأكرمهم، لم يرد سائلاً قط. وقال أنس بن مالك الذي خدمه عشر سنين: "ما قال لي قط أفٍّ، ولا قال لشيء فعلته: لِمَ فعلته؟ ولا لشيء لم أفعله: لِمَ لم تفعله؟"

وجاء رجل من البادية فجذب رداء النبي ﷺ جذباً شديداً حتى أثّر في عنقه، ثم قال: "يا محمد، أعطني من مال الله الذي عندك!" فالتفت إليه النبي ﷺ وابتسم وأمر أن يُعطى.

كان ﷺ إذا مشى في الطرقات يسلّم على الأطفال ويزور المرضى ولا يحتقر فقيراً. وزار يوماً غلاماً يهودياً كان يخدمه وقد مرض، وعرض عليه الإسلام، فنظر الغلام إلى أبيه فأومأ له، فأسلم الغلام، فخرج النبي ﷺ وهو يقول: "الحمد لله الذي أنقذه من النار."

وكان تواضعه عجيباً؛ يجلس على الأرض، ويأكل بأصابعه، ويخيط نعله بنفسه، ويأبى أن يُميَّز بمكانة خاصة قائلاً: "إنما أنا عبد، آكل كما يأكل العبد وأجلس كما يجلس العبد."`,
      fr: `Le Prophète Muhammad ﷺ était décrit par Allah dans le Coran comme étant "doté d'un caractère immense" (68:4). Son épouse Aïcha (RA), interrogée sur son caractère, répondit: "Son caractère, c'était le Coran."

Le Prophète ﷺ était la personne la plus généreuse. Il ne refusait jamais quelqu'un qui lui demandait. Anas ibn Malik, qui le servit pendant dix ans, dit: "Il ne m'a jamais dit 'ouf', et il n'a jamais dit 'pourquoi as-tu fait cela?' ni 'pourquoi ne l'as-tu pas fait?'"

Un jour, un Bédouin vint et tira si violemment sur le manteau du Prophète qu'il laissa une marque sur son cou. Il exigea: "Donne-moi de la richesse d'Allah qui est chez toi!" Le Prophète ﷺ se retourna vers lui, sourit, et ordonna qu'on lui remette un don.

Lorsqu'il marchait dans les rues, il saluait les enfants, s'enquérait des malades et ne méprisait jamais les pauvres. Il rendait visite aux malades quelle que soit leur foi. Quand un jeune garçon juif qui le servait tomba malade, le Prophète ﷺ lui rendit visite et l'invita à l'Islam. Le garçon se tourna vers son père qui acquiesça. Le garçon embrassa l'Islam, et le Prophète repartit en disant: "Louange à Allah qui l'a sauvé du Feu."

Son humilité était extraordinaire. Il s'asseyait par terre, mangeait avec ses doigts et réparait ses propres sandales. Il refusait tout honneur spécial en disant: "Je ne suis qu'un serviteur. Je mange comme un serviteur et je m'assieds comme un serviteur."`,
      de: `Der Prophet Muhammad ﷺ wurde von Allah im Quran als jemand beschrieben, der „auf einem großartigen sittlichen Charakter steht" (68:4). Seine Frau Aisha (ra), nach seinem Charakter gefragt, antwortete: „Sein Charakter war der Quran."

Der Prophet ﷺ war der großzügigste Mensch. Er lehnte niemals jemanden ab, der ihn um etwas bat. Anas ibn Malik, der ihn zehn Jahre lang bediente, sagte: „Er sagte mir nie 'uff' (ein Wort der Verärgerung), und er fragte nie 'warum hast du das getan?' wenn ich etwas tat, noch 'warum hast du das nicht getan?' wenn ich es nicht tat."

Einmal kam ein Beduine und zog so heftig an seinem Mantel, dass er einen Abdruck an seinem Hals hinterließ. Er forderte: „Gib mir von Allahs Reichtum, der bei dir ist!" Der Prophet ﷺ wandte sich ihm zu, lächelte und ordnete an, ihm ein Geschenk zu geben.

Wenn er durch die Straßen ging, grüßte er Kinder, erkundigte sich nach Kranken und sah nie auf Arme herab. Er besuchte Kranke ungeachtet ihres Glaubens. Als ein junger jüdischer Junge, der ihm diente, krank wurde, besuchte der Prophet ﷺ ihn und lud ihn zum Islam ein. Der Junge blickte auf seinen Vater, der nickte. Der Junge nahm den Islam an, und der Prophet ging und sagte: „Lob sei Allah, der ihn vor dem Feuer gerettet hat."

Seine Bescheidenheit war außerordentlich. Er saß auf dem Boden, aß mit seinen Fingern und flickte seine eigenen Schuhe. Er lehnte besondere Ehrungen ab und sagte: „Ich bin nur ein Diener. Ich esse wie ein Diener isst und sitze wie ein Diener sitzt."`,
    },
    moral: {
      en: "The greatest measure of a person's faith is their character. Strive to embody the Prophetic character in every interaction.",
      ar: "أعظم ما يُقاس به إيمان المرء هو خُلقه. اجتهد في تجسيد الأخلاق النبوية في كل تعامل.",
      fr: "La plus grande mesure de la foi d'une personne est son caractère. Efforce-toi d'incarner le caractère prophétique dans chaque interaction.",
      de: "Das größte Maß für den Glauben eines Menschen ist sein Charakter. Strebe danach, den prophetischen Charakter in jeder Interaktion zu verkörpern.",
    },
    readingTime: 4,
  },
  {
    id: "s2",
    category: "companions",
    title: {
      en: "The Loyalty of Abu Bakr as-Siddiq",
      ar: "وفاء أبي بكر الصديق رضي الله عنه",
      fr: "La Loyauté d'Abu Bakr as-Siddiq",
      de: "Die Loyalität von Abu Bakr as-Siddiq",
    },
    arabicOpening: "ثَانِيَ اثْنَيْنِ إِذْ هُمَا فِي الْغَارِ — التوبة: ٤٠",
    content: {
      en: `Abu Bakr Abdullah ibn Abi Quhafa (RA) was the closest companion of the Prophet ﷺ and the first adult man to embrace Islam.

When the Quraysh plotted to assassinate the Prophet ﷺ, Allah revealed that the Prophet should migrate to Medina. The Prophet chose no one but Abu Bakr to accompany him on this most dangerous journey.

As the assassins surrounded the Prophet's house, they had not noticed that it was Ali (RA) sleeping in the Prophet's bed. The Prophet and Abu Bakr slipped out into the night.

They took refuge in the Cave of Thawr for three nights. The Quraysh searched with trackers and reached the very entrance of the cave. Abu Bakr whispered in fear — not for himself, but for the Prophet: "O Messenger of Allah, if any of them looks down, they will see us!"

The Prophet ﷺ replied with unshakeable certainty: "O Abu Bakr, what do you think of two people when Allah is their third?"

A spider had woven its web at the cave's entrance, and pigeons had nested there — making it appear undisturbed. The trackers turned back, convinced no one had entered.

Abu Bakr's entire wealth was spent in the cause of Islam. When asked by Umar (RA) what he had left for his family after giving all his wealth, he said: "Allah and His Messenger."`,
      ar: `أبو بكر عبدالله بن أبي قحافة رضي الله عنه كان أقرب الصحابة إلى النبي ﷺ وأول الرجال الأحرار البالغين إسلاماً.

لما دبّرت قريش مؤامرة لاغتيال النبي ﷺ أوحى الله إليه بالهجرة إلى المدينة، فلم يختر النبي لصحبته في هذه الرحلة الخطيرة سوى أبي بكر.

وبينما كان المتربصون يحيطون بدار النبي ﷺ لم ينتبهوا إلى أن عليّاً رضي الله عنه هو من نام في فراشه. فانسل النبي وأبو بكر في جنح الظلام.

التجآ في غار ثور ثلاثة أيام، وجاء المتتبعون حتى وصلوا إلى باب الغار، فهمس أبو بكر خوفاً - لا على نفسه بل على النبي: "يا رسول الله، لو نظر أحدهم إلى قدميه لرآنا!"

فأجاب النبي ﷺ بثقة لا تتزعزع: "يا أبا بكر، ما ظنك باثنين الله ثالثهما؟"

وكان عنكبوت قد نسج خيوطه على فم الغار وحمامة قد عشّشت هناك، فظن المتتبعون أن أحداً لم يدخله وانصرفوا.

وقد أنفق أبو بكر رضي الله عنه ثروته كلها في سبيل الله، فلما سأله عمر رضي الله عنه عمّا أبقى لأهله بعد أن أنفق كل شيء، قال: "الله ورسوله."`,
      fr: `Abu Bakr Abdullah ibn Abi Quhafa (RA) était le compagnon le plus proche du Prophète ﷺ et le premier homme adulte libre à embrasser l'Islam.

Lorsque les Quraysh complotèrent l'assassinat du Prophète ﷺ, Allah révéla que le Prophète devait migrer vers Médine. Le Prophète ne choisit nul autre qu'Abu Bakr pour l'accompagner dans ce voyage des plus périlleux.

Tandis que les assassins entouraient la maison du Prophète, ils n'avaient pas remarqué que c'était Ali (RA) qui dormait dans son lit. Le Prophète et Abu Bakr s'éclipsèrent dans la nuit.

Ils se réfugièrent dans la grotte de Thawr pendant trois nuits. Les Quraysh envoyèrent des pisteurs qui parvinrent jusqu'à l'entrée de la grotte. Abu Bakr chuchota, effrayé — non pour lui-même, mais pour le Prophète: "Ô Messager d'Allah, si l'un d'eux regarde vers le bas, il nous verra!"

Le Prophète ﷺ répondit avec une certitude inébranlable: "Ô Abu Bakr, que penses-tu de deux personnes quand Allah est leur troisième?"

Une araignée avait tissé sa toile à l'entrée de la grotte, et des pigeons y avaient fait leur nid — la faisant paraître intacte. Les pisteurs firent demi-tour, convaincus que personne n'y était entré.

Toute la fortune d'Abu Bakr fut dépensée pour la cause de l'Islam. Quand Umar (RA) lui demanda ce qu'il avait laissé à sa famille après avoir tout donné, il répondit: "Allah et Son Messager."`,
      de: `Abu Bakr Abdullah ibn Abi Quhafa (ra) war der engste Gefährte des Propheten ﷺ und der erste erwachsene freie Mann, der den Islam annahm.

Als die Quraisch planten, den Propheten ﷺ zu ermorden, offenbarte Allah, dass der Prophet nach Medina auswandern sollte. Der Prophet wählte niemand anderen als Abu Bakr, um ihn auf dieser gefährlichsten Reise zu begleiten.

Während die Mörder das Haus des Propheten umzingelten, hatten sie nicht bemerkt, dass Ali (ra) in seinem Bett schlief. Der Prophet und Abu Bakr schlüpften in die Nacht hinaus.

Sie flüchteten für drei Nächte in die Höhle von Thawr. Die Quraisch schickten Verfolger, die bis zum Eingang der Höhle gelangten. Abu Bakr flüsterte ängstlich — nicht für sich selbst, sondern für den Propheten: „O Gesandter Allahs, wenn einer von ihnen nach unten schaut, werden sie uns sehen!"

Der Prophet ﷺ antwortete mit unerschütterlicher Gewissheit: „O Abu Bakr, was meinst du über zwei Menschen, wenn Allah ihr Dritter ist?"

Eine Spinne hatte ihr Netz am Eingang der Höhle gesponnen, und Tauben hatten dort genistet — sodass es unberührt aussah. Die Verfolger kehrten um, überzeugt, dass niemand eingetreten war.

Abu Bakrs gesamtes Vermögen wurde für die Sache des Islams ausgegeben. Als Umar (ra) ihn fragte, was er seiner Familie hinterlassen hatte, nachdem er alles gegeben hatte, sagte er: „Allah und Sein Gesandter."`,
    },
    moral: {
      en: "True loyalty means sacrificing your own comfort, safety, and wealth for what you love most. Abu Bakr's example teaches us that loyalty to Allah and His Messenger comes before all else.",
      ar: "الوفاء الحقيقي يعني التضحية براحتك وسلامتك ومالك فيما تحب أكثر. يعلمنا أبو بكر أن الولاء لله ورسوله يسبق كل شيء.",
      fr: "La vraie loyauté signifie sacrifier son confort, sa sécurité et sa richesse pour ce qu'on aime le plus. L'exemple d'Abu Bakr nous enseigne que la loyauté envers Allah et Son Messager passe avant tout.",
      de: "Wahre Loyalität bedeutet, den eigenen Komfort, die Sicherheit und den Reichtum für das zu opfern, was man am meisten liebt. Abu Bakrs Beispiel lehrt uns, dass Loyalität gegenüber Allah und Seinem Gesandten vor allem anderen steht.",
    },
    readingTime: 4,
  },
  {
    id: "s3",
    category: "companions",
    title: {
      en: "The Patience of Bilal ibn Rabah",
      ar: "صبر بلال بن رباح رضي الله عنه",
      fr: "La Patience de Bilal ibn Rabah",
      de: "Die Geduld von Bilal ibn Rabah",
    },
    arabicOpening: "إِنَّمَا يُوَفَّى الصَّابِرُونَ أَجْرَهُم بِغَيْرِ حِسَابٍ — الزمر: ١٠",
    content: {
      en: `Bilal ibn Rabah (RA) was an Abyssinian slave owned by Umayyah ibn Khalaf, one of the fiercest enemies of Islam in Mecca.

When Bilal embraced Islam, his master discovered his faith and subjected him to severe torture to force him to renounce it. In the scorching midday heat of Mecca, Umayyah would drag Bilal to the desert, lay him on the burning sand, and place a huge hot rock on his chest.

He would command Bilal to denounce Muhammad ﷺ and return to worshipping the idols. But from Bilal's cracked, parched lips came only one word, again and again: "Ahad! Ahad!" — "One! One!" — declaring Allah's oneness even under torture.

Abu Bakr as-Siddiq (RA) passed by and was moved by what he saw. He went to Umayyah and offered to buy Bilal's freedom. Umayyah, thinking Abu Bakr was desperate, doubled the price. Abu Bakr paid without hesitation and set Bilal free.

The Prophet ﷺ said about Bilal: "Bilal is a man of Paradise."

Bilal was honored with the role of the first muezzin of Islam. His powerful voice would call the faithful to prayer from atop the Kaaba in Mecca after the conquest. It was a moment that moved everyone to tears — the former slave who had suffered for the word of Tawhid now announcing it from the holiest place on earth.`,
      ar: `بلال بن رباح رضي الله عنه كان عبداً حبشياً يملكه أمية بن خلف، أحد أشد أعداء الإسلام في مكة.

لما أسلم بلال، اكتشف سيده إسلامه فأخضعه لتعذيب شديد ليكرهه على الرجوع عن دينه. في وهج القيظ المكي، كان أمية يجره إلى الصحراء ويمدّه على الرمال المحرقة ويضع على صدره صخرة ضخمة ساخنة.

كان يأمره أن يكفر بمحمد ﷺ ويعود لعبادة الأصنام، لكن من شفتي بلال الجافتين المتشققتين لم تخرج إلا كلمة واحدة تتكرر مراراً: "أحد! أحد!" — يُعلن توحيد الله حتى تحت وطأة التعذيب.

مرّ أبو بكر الصديق رضي الله عنه على هذا المشهد فاستفزّه، فذهب إلى أمية وعرض أن يشتري حرية بلال. ظن أمية أن أبا بكر في حاجة ماسة فضاعف الثمن، لكن أبا بكر دفع دون تردد وأعتق بلالاً.

وقال النبي ﷺ في بلال: "بلال سابق الحبشة." وكرّمه بمنصب أول مؤذن في الإسلام. وبعد فتح مكة صعد بلال إلى ظهر الكعبة وأذّن بصوته الجهوري، فأبكى الجميع - ذلك العبد المعذَّب الذي تألّم من أجل كلمة التوحيد يُعلنها الآن من أقدس بقعة على وجه الأرض.`,
      fr: `Bilal ibn Rabah (RA) était un esclave abyssinien appartenant à Umayyah ibn Khalaf, l'un des ennemis les plus acharnés de l'Islam à La Mecque.

Quand Bilal embrassa l'Islam, son maître découvrit sa foi et le soumit à de sévères tortures pour le forcer à l'abjurer. Dans la chaleur accablante de midi à La Mecque, Umayyah le traînait dans le désert, l'allongeait sur le sable brûlant et plaçait un énorme rocher brûlant sur sa poitrine.

Il lui ordonnait de renier Muhammad ﷺ et de retourner à l'adoration des idoles. Mais des lèvres craquelées et desséchées de Bilal ne sortait qu'un seul mot, encore et encore: "Ahad! Ahad!" — "Un! Un!" — proclamant l'unicité d'Allah même sous la torture.

Abu Bakr as-Siddiq (RA) passa par là et fut touché par ce qu'il vit. Il alla trouver Umayyah et proposa de racheter la liberté de Bilal. Umayyah, croyant qu'Abu Bakr était désespéré, doubla le prix. Abu Bakr paya sans hésiter et libéra Bilal.

Le Prophète ﷺ dit de Bilal: "Bilal est un homme du Paradis."

Bilal fut honoré du rôle de premier muezzin de l'Islam. Sa voix puissante appelait les fidèles à la prière depuis le sommet de la Kaaba à La Mecque après la conquête. C'était un moment qui émouvait tout le monde aux larmes — l'ancien esclave qui avait souffert pour le mot du Tawhid l'annonçait désormais depuis le lieu le plus saint de la terre.`,
      de: `Bilal ibn Rabah (ra) war ein abessinischer Sklave, der Umayyah ibn Khalaf gehörte, einem der heftigsten Feinde des Islams in Mekka.

Als Bilal den Islam annahm, entdeckte sein Herr seinen Glauben und unterwarf ihn schwerer Folter, um ihn zum Widerruf zu zwingen. In der glühenden Mittagshitze Mekkas schleppte Umayyah ihn in die Wüste, legte ihn auf den brennenden Sand und platzierte einen riesigen heißen Stein auf seiner Brust.

Er befahl Bilal, Muhammad ﷺ zu verleugnen und zur Götzenanbetung zurückzukehren. Aber aus Bilals rissigen, ausgetrockneten Lippen kam nur ein Wort, immer wieder: „Ahad! Ahad!" — „Einer! Einer!" — er bekannte Allahs Einzigartigkeit selbst unter Folter.

Abu Bakr as-Siddiq (ra) kam vorbei und war bewegt von dem, was er sah. Er ging zu Umayyah und bot an, Bilals Freiheit zu kaufen. Umayyah, der dachte, Abu Bakr sei verzweifelt, verdoppelte den Preis. Abu Bakr bezahlte ohne Zögern und befreite Bilal.

Der Prophet ﷺ sagte über Bilal: „Bilal ist ein Mann des Paradieses."

Bilal wurde mit der Rolle des ersten Muezzins des Islams geehrt. Seine kraftvolle Stimme rief die Gläubigen nach der Eroberung Mekkas vom Dach der Kaaba zum Gebet. Es war ein Moment, der alle zu Tränen rührte — der ehemalige Sklave, der für das Wort des Tawhid gelitten hatte, verkündete es nun vom heiligsten Ort der Erde.`,
    },
    moral: {
      en: "Steadfastness in faith, even under the greatest pressure, brings the highest reward. No oppressor can extinguish the light of true belief.",
      ar: "الثبات على الإيمان حتى في أشد الأوقات ضغطاً يجلب أعظم الأجر. لا يستطيع أي ظالم إطفاء نور الإيمان الحق.",
      fr: "La constance dans la foi, même sous la plus grande pression, apporte la plus haute récompense. Aucun oppresseur ne peut éteindre la lumière de la vraie croyance.",
      de: "Standhaftigkeit im Glauben, selbst unter dem größten Druck, bringt die höchste Belohnung. Kein Unterdrücker kann das Licht des wahren Glaubens auslöschen.",
    },
    readingTime: 5,
  },
  {
    id: "s4",
    category: "companions",
    title: {
      en: "The Justice of Umar ibn al-Khattab",
      ar: "عدل عمر بن الخطاب رضي الله عنه",
      fr: "La Justice d'Umar ibn al-Khattab",
      de: "Die Gerechtigkeit von Umar ibn al-Khattab",
    },
    arabicOpening: "إِنَّ اللَّهَ يَأْمُرُ بِالْعَدْلِ وَالْإِحْسَانِ — النحل: ٩٠",
    content: {
      en: `Umar ibn al-Khattab (RA), the second Caliph of Islam, was famous for his extraordinary justice and sense of accountability.

One night, Umar was making his customary rounds of Medina in disguise — dressed as a common man — to see how his people lived. He came upon a tent from which he heard the cries of hungry children and the voice of a mother trying to comfort them by pretending to cook.

Umar peered in and saw a pot over the fire — but the pot was filled only with water and stones. The mother was trying to deceive her children into sleeping by pretending food was cooking. Umar was overcome with grief and shame.

He rushed to the public food store (Bayt al-Mal), loaded a sack of flour and oil on his own back, and returned to the family. Umar's companion offered to carry the sack, but Umar refused, saying: "Will you carry my burden for me on the Day of Judgment?"

He cooked the food himself and served the family. Only when the children had eaten and fallen asleep did he reveal who he was. He promised to ensure the family was properly provided for.

He once said: "If a stray dog died on the banks of the Euphrates from hunger, I would fear that Allah would question me about it."`,
      ar: `عمر بن الخطاب رضي الله عنه، ثاني الخلفاء الراشدين، اشتُهر بعدله الباهر وإحساسه الشديد بالمسؤولية.

في إحدى الليالي كان عمر يجوب المدينة متنكراً في هيئة رجل عادي ليرى أحوال الناس. فمرّ على خيمة يسمع منها بكاء أطفال جياع وصوت أمٍّ تحاول تهدئتهم بالتظاهر بالطبخ.

أطلّ عمر فرأى قدراً فوق النار، لكن فيها ماء وحجارة فحسب! كانت الأم تُوهم أطفالها بأن الطعام يُطهى ليناموا. فاعتراه الحزن والخجال.

هرع إلى بيت مال المسلمين وحمل كيساً من الدقيق والزيت على ظهره وعاد إلى الأسرة. عرض عليه مرافقه أن يحمل الكيس، فرفض عمر قائلاً: "أتحمل عني وزري يوم القيامة؟!"

طبخ الطعام بنفسه وقدّمه للأسرة، ولم يُعرّف بنفسه إلا بعد أن أكل الأطفال وناموا. وعاهد نفسه على أن يضمن لهم الكفاية.

وكان يقول: "لو مات كلب جائعاً على ضفة الفرات لخشيت أن يحاسبني الله عليه."`,
      fr: `Umar ibn al-Khattab (RA), le deuxième calife de l'Islam, était célèbre pour sa justice extraordinaire et son sens des responsabilités.

Une nuit, Umar faisait sa ronde habituelle à Médine déguisé — habillé comme un homme du commun — pour voir comment vivait son peuple. Il arriva devant une tente d'où provenaient les pleurs d'enfants affamés et la voix d'une mère qui tentait de les calmer en faisant semblant de cuisiner.

Umar regarda à l'intérieur et vit une marmite sur le feu — mais elle ne contenait que de l'eau et des pierres. La mère essayait de leurrer ses enfants pour qu'ils s'endorment en faisant croire que la nourriture cuisait. Umar fut submergé par la tristesse et la honte.

Il se précipita au magasin de nourriture public (Bayt al-Mal), chargea un sac de farine et d'huile sur son propre dos et retourna voir la famille. Son compagnon proposa de porter le sac, mais Umar refusa en disant: "Porteras-tu mon fardeau pour moi au Jour du Jugement?"

Il cuisina lui-même la nourriture et servit la famille. Ce n'est que lorsque les enfants eurent mangé et s'endormirent qu'il révéla qui il était. Il promit de s'assurer que la famille serait convenablement pourvue.

Il dit un jour: "Si un chien errant mourait de faim sur les rives de l'Euphrate, je craindrais qu'Allah m'en demande compte."`,
      de: `Umar ibn al-Khattab (ra), der zweite Kalif des Islams, war berühmt für seine außerordentliche Gerechtigkeit und sein Pflichtbewusstsein.

Eines Nachts machte Umar seine üblichen Runden durch Medina in Verkleidung — als gewöhnlicher Mann gekleidet — um zu sehen, wie seine Menschen lebten. Er stieß auf ein Zelt, aus dem er das Weinen hungriger Kinder und die Stimme einer Mutter hörte, die versuchte, sie zu beruhigen, indem sie so tat, als ob sie kochte.

Umar schaute hinein und sah einen Topf über dem Feuer — aber der Topf war nur mit Wasser und Steinen gefüllt. Die Mutter versuchte, ihre Kinder mit dem Vortäuschen des Kochens zum Schlafen zu bringen. Umar wurde von Kummer und Scham überwältigt.

Er eilte zum öffentlichen Lebensmittellager (Bayt al-Mal), lud einen Sack Mehl und Öl auf seinen eigenen Rücken und kehrte zur Familie zurück. Umars Begleiter bot an, den Sack zu tragen, aber Umar lehnte ab und sagte: „Wirst du meine Last am Tag des Gerichts für mich tragen?"

Er kochte das Essen selbst und bediente die Familie. Erst als die Kinder gegessen hatten und eingeschlafen waren, enthüllte er, wer er war. Er versprach, dafür zu sorgen, dass die Familie ordentlich versorgt würde.

Er sagte einmal: „Wenn ein streunender Hund am Ufer des Euphrats vor Hunger stürbe, würde ich fürchten, dass Allah mich dafür zur Rechenschaft zieht."`,
    },
    moral: {
      en: "A leader is responsible for every person under their care. Justice must reach even the most vulnerable in society.",
      ar: "القائد مسؤول عن كل شخص في رعايته. يجب أن يبلغ العدل حتى أكثر فئات المجتمع هشاشةً.",
      fr: "Un dirigeant est responsable de chaque personne sous sa garde. La justice doit atteindre même les plus vulnérables de la société.",
      de: "Ein Anführer ist für jede Person unter seiner Obhut verantwortlich. Gerechtigkeit muss auch die Schwächsten in der Gesellschaft erreichen.",
    },
    readingTime: 4,
  },
  {
    id: "s5",
    category: "companions",
    title: {
      en: "Khadijah — Mother of the Believers",
      ar: "خديجة أم المؤمنين رضي الله عنها",
      fr: "Khadijah — Mère des Croyants",
      de: "Khadijah — Mutter der Gläubigen",
    },
    arabicOpening: "فَاصْبِرْ إِنَّ وَعْدَ اللَّهِ حَقٌّ — غافر: ٧٧",
    content: {
      en: `Khadijah bint Khuwaylid (RA) was a noble, wealthy merchant of Mecca — respected by all for her intelligence, integrity, and strength of character. Twice widowed, she managed her own trade caravans at a time when few women did so.

She had heard of a young man named Muhammad ﷺ, known throughout Mecca as "Al-Amin" — the Trustworthy. She hired him to manage her trade caravan to Syria. His conduct impressed her deeply, and she proposed marriage to him. He was 25; she was 40.

When revelation first came to the Prophet ﷺ in the Cave of Hira, he returned home trembling and afraid. He told Khadijah what had happened. Rather than doubt him, she wrapped him in a cloak and said words that became immortal in Islamic history:

"Never! By Allah, Allah will never disgrace you. You maintain family ties, you bear the burden of the weak, you help the poor, you are generous to guests, and you uphold the truth."

She was the first human being to believe in the Prophet's message. She supported him with her wealth, her words, and her love through the most difficult years of Islam.

When the Quraysh boycotted the Muslims for three years, Khadijah gave everything in support of the community. She died shortly after the boycott ended.

Years after her passing, the Prophet ﷺ would still love her deeply. Whenever a sheep was slaughtered, he would send portions to her friends. When Aisha (RA) once expressed jealousy, the Prophet ﷺ said: "She believed in me when people disbelieved. She helped me with her wealth when people withheld from me. And Allah blessed me with children through her."`,
      ar: `خديجة بنت خويلد رضي الله عنها كانت سيدةً نبيلةً تاجرةً ثريةً في مكة، يحترمها الجميع لذكائها وصدقها وقوة شخصيتها. وكانت ثيّباً توليت إدارة قوافلها التجارية في وقتٍ لم تفعل ذلك كثير من النساء.

سمعت عن شاب يُدعى محمد ﷺ اشتُهر في مكة بلقب "الأمين"، فاستأجرته ليدير قافلتها التجارية إلى الشام. أعجبتها سيرته إعجاباً بالغاً، فعرضت عليه الزواج. كان ﷺ في الخامسة والعشرين وكانت هي في الأربعين.

لما نزل الوحي على النبي ﷺ في غار حراء أولَ مرة رجع إلى البيت يرتجف خائفاً فأخبرها بما حدث. فبدلاً من أن تشك فيه دثّرته وقالت الكلمات التي خلّدها التاريخ الإسلامي:

"كلا والله! ما يخزيك الله أبداً. إنك لتصل الرحم، وتحمل الكلَّ، وتكسب المعدوم، وتقري الضيف، وتعين على نوائب الحق."

كانت أول من آمن بالنبي ﷺ من البشر. آزرته بمالها وكلمتها وحبها في أصعب سنوات الإسلام.

وحين حاصرت قريش المسلمين ثلاث سنوات، بذلت خديجة كل ما تملك في دعم المجتمع المسلم. وتوفيت بعد انتهاء الحصار بوقت قصير.

وبعد وفاتها بسنوات ظلّ النبي ﷺ يحبها حباً عميقاً؛ كلما ذُبحت شاة أرسل منها إلى صديقاتها. وحين أبدت عائشة رضي الله عنها غيرةً قال ﷺ: "آمنت بي حين كذّبني الناس، وصدّقتني حين كذّبني الناس، وواستني بمالها حين حرمني الناس، ورزقني الله منها الولد."`,
      fr: `Khadijah bint Khuwaylid (RA) était une noble et riche marchande de La Mecque, respectée de tous pour son intelligence, son intégrité et sa force de caractère. Deux fois veuve, elle gérait ses propres caravanes commerciales à une époque où peu de femmes le faisaient.

Elle avait entendu parler d'un jeune homme nommé Muhammad ﷺ, connu dans toute La Mecque sous le nom d'Al-Amin — le Digne de confiance. Elle l'engagea pour gérer sa caravane commerciale vers la Syrie. Sa conduite l'impressionna profondément, et elle lui proposa le mariage. Il avait 25 ans; elle en avait 40.

Lorsque la révélation vint pour la première fois au Prophète ﷺ dans la grotte de Hira, il rentra à la maison tremblant et effrayé. Il raconta à Khadijah ce qui s'était passé. Plutôt que de douter de lui, elle l'enveloppa dans un manteau et prononça des paroles qui devinrent immortelles dans l'histoire islamique:

"Jamais! Par Allah, Allah ne te fera jamais honte. Tu maintiens les liens familiaux, tu portes le fardeau des faibles, tu aides les pauvres, tu es généreux envers les invités, et tu défends la vérité."

Elle fut le premier être humain à croire au message du Prophète. Elle le soutint de sa richesse, de ses paroles et de son amour pendant les années les plus difficiles de l'Islam.

Quand les Quraysh boycottèrent les musulmans pendant trois ans, Khadijah donna tout en soutien à la communauté. Elle mourut peu après la fin du boycott.

Des années après sa mort, le Prophète ﷺ l'aimait encore profondément. Chaque fois qu'une brebis était abattue, il en envoyait des parts à ses amies. Quand Aïcha (RA) exprima une fois sa jalousie, le Prophète ﷺ dit: "Elle a cru en moi quand les gens ne croyaient pas. Elle m'a aidé de sa richesse quand les gens me la refusaient. Et Allah m'a béni avec des enfants à travers elle."`,
      de: `Khadijah bint Khuwaylid (ra) war eine edle, wohlhabende Kauffrau in Mekka — von allen respektiert für ihre Intelligenz, Integrität und Charakterstärke. Zweimal verwitwet, verwaltete sie ihre eigenen Handelskarawanen zu einer Zeit, als nur wenige Frauen dies taten.

Sie hatte von einem jungen Mann namens Muhammad ﷺ gehört, der in ganz Mekka als „Al-Amin" — der Vertrauenswürdige — bekannt war. Sie stellte ihn ein, um ihre Handelskarawane nach Syrien zu leiten. Sein Verhalten beeindruckte sie tief, und sie schlug ihm die Ehe vor. Er war 25; sie war 40.

Als die erste Offenbarung an den Propheten ﷺ in der Höhle von Hira kam, kehrte er zitternd und ängstlich nach Hause zurück. Er erzählte Khadijah, was passiert war. Anstatt an ihm zu zweifeln, hüllte sie ihn in einen Mantel und sprach Worte, die in der islamischen Geschichte unsterblich wurden:

„Niemals! Bei Allah, Allah wird dich niemals in Schande bringen. Du pflegst familiäre Bindungen, du trägst die Last der Schwachen, du hilfst den Armen, du bist großzügig gegenüber Gästen, und du vertrittst die Wahrheit."

Sie war der erste Mensch, der an die Botschaft des Propheten glaubte. Sie unterstützte ihn mit ihrem Reichtum, ihren Worten und ihrer Liebe in den schwierigsten Jahren des Islams.

Als die Quraisch die Muslime drei Jahre lang boykottierten, gab Khadijah alles zur Unterstützung der Gemeinschaft. Sie starb kurz nach Ende des Boykotts.

Jahre nach ihrem Tod liebte der Prophet ﷺ sie noch immer tief. Wann immer ein Schaf geschlachtet wurde, schickte er Teile davon an ihre Freundinnen. Als Aisha (ra) einmal Eifersucht zeigte, sagte der Prophet ﷺ: „Sie glaubte an mich, als die Menschen nicht glaubten. Sie half mir mit ihrem Reichtum, als die Menschen es mir verweigerten. Und Allah segnete mich durch sie mit Kindern."`,
    },
    moral: {
      en: "True support is unwavering. Khadijah's faith in the Prophet at the most vulnerable moment of his mission teaches us to stand by those we love through difficulty, not just in comfort.",
      ar: "الدعم الحقيقي لا يتزعزع. يعلمنا إيمان خديجة بالنبي في أكثر لحظاته حرجاً أن نقف إلى جانب من نحب في الصعاب لا في وقت الراحة فحسب.",
      fr: "Le vrai soutien est inébranlable. La foi de Khadijah dans le Prophète au moment le plus vulnérable de sa mission nous apprend à rester aux côtés de ceux que nous aimons dans la difficulté, pas seulement dans le confort.",
      de: "Wahre Unterstützung ist unerschütterlich. Khadidjahs Glaube an den Propheten im verletzlichsten Moment seiner Mission lehrt uns, bei denen zu bleiben, die wir lieben, durch Schwierigkeiten, nicht nur in Komfort.",
    },
    readingTime: 5,
  },
  {
    id: "s6",
    category: "history",
    title: {
      en: "The Night Journey and Ascension",
      ar: "الإسراء والمعراج",
      fr: "Le Voyage Nocturne et l'Ascension",
      de: "Die Nachtreise und Himmelfahrt",
    },
    arabicOpening: "سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ لَيْلًا — الإسراء: ١",
    content: {
      en: `In the year of grief — when the Prophet ﷺ had lost his beloved wife Khadijah and his uncle Abu Talib — Allah honored His Prophet with a miraculous night journey unlike anything in human history.

The angel Jibril (Gabriel) (AS) came to the Prophet ﷺ and took him to Masjid al-Aqsa in Jerusalem on a magnificent creature called Al-Buraq. At the mosque, the Prophet ﷺ led all the prophets — Ibrahim, Musa, Isa, and all others — in prayer.

Then the ascension (Mi'raj) began. Through the seven heavens, Jibril accompanied the Prophet ﷺ. At each heaven, a prophet greeted him: Adam (AS) in the first, Yahya and Isa (AS) in the second, Yusuf (AS) in the third, Idris (AS) in the fourth, Harun (AS) in the fifth, Musa (AS) in the sixth, and Ibrahim (AS) in the seventh.

The Prophet ﷺ was then taken beyond, to a place no creation had reached — closer to Allah than the distance of two bow-lengths or nearer. There, Allah spoke to His Prophet directly and obligated the five daily prayers upon the Muslim nation.

When the Prophet ﷺ returned to Mecca and told the people, many rejected and mocked him. When Abu Bakr heard, he said without hesitation: "If he said it, then I believe it." This confirmed his title "As-Siddiq."

The five daily prayers remain the greatest gift of this night — a direct connection between every believer and their Lord, five times each day.`,
      ar: `في عام الحزن — بعد أن فقد النبي ﷺ زوجته الحبيبة خديجة وعمه أبا طالب — كرّم الله نبيه برحلة ليلية معجزة لم تعرف البشرية لها مثيلاً.

جاء جبريل عليه السلام بالنبي ﷺ إلى المسجد الأقصى في القدس على دابة تُسمى البراق. وفي المسجد أمّ النبي ﷺ جميع الأنبياء في صلاة: إبراهيم وموسى وعيسى وسائرهم.

ثم بدأ المعراج، فصعد النبي ﷺ مع جبريل عبر السماوات السبع. وفي كل سماء استقبله نبي: آدم في الأولى، ويحيى وعيسى في الثانية، ويوسف في الثالثة، وإدريس في الرابعة، وهارون في الخامسة، وموسى في السادسة، وإبراهيم في السابعة.

ثم انطلق النبي ﷺ إلى مكان لم يبلغه مخلوق من قبل — حتى كان من ربه كقاب قوسين أو أدنى. هناك كلّم الله نبيه مباشرةً وفرض على الأمة الإسلامية الصلوات الخمس.

ولما عاد النبي ﷺ إلى مكة وأخبر الناس، كذّبه أكثرهم وسخروا منه. وحين بلغ الخبر أبا بكر قال دون تردد: "إن قاله فقد صدق." فأكّد هذا لقبه بـ'الصديق'.

والصلوات الخمس هي أعظم هبة من تلك الليلة — صلة مباشرة بين كل مؤمن وربه، خمس مرات في اليوم.`,
      fr: `En l'an du chagrin — lorsque le Prophète ﷺ avait perdu sa bien-aimée épouse Khadijah et son oncle Abu Talib — Allah honora Son Prophète d'un voyage nocturne miraculeux sans précédent dans l'histoire humaine.

L'ange Jibril (Gabriel) (AS) vint vers le Prophète ﷺ et l'emmena à la Mosquée al-Aqsa à Jérusalem sur une magnifique créature appelée Al-Buraq. À la mosquée, le Prophète ﷺ dirigea en prière tous les prophètes — Ibrahim, Moussa, Issa et tous les autres.

Puis l'ascension (Mi'raj) commença. À travers les sept cieux, Jibril accompagna le Prophète ﷺ. À chaque ciel, un prophète l'accueillit: Adam (AS) au premier, Yahya et Issa (AS) au deuxième, Youssef (AS) au troisième, Idris (AS) au quatrième, Haroun (AS) au cinquième, Moussa (AS) au sixième, et Ibrahim (AS) au septième.

Le Prophète ﷺ fut ensuite emmené au-delà, dans un endroit qu'aucune créature n'avait atteint — plus proche d'Allah que la distance de deux arcs ou encore plus près. Là, Allah parla directement à Son Prophète et rendit les cinq prières quotidiennes obligatoires pour la nation musulmane.

Quand le Prophète ﷺ retourna à La Mecque et raconta aux gens, beaucoup rejetèrent et se moquèrent de lui. Quand Abu Bakr entendit, il dit sans hésiter: "S'il l'a dit, alors je le crois." Cela confirma son titre d'As-Siddiq.

Les cinq prières quotidiennes demeurent le plus grand don de cette nuit — un lien direct entre chaque croyant et son Seigneur, cinq fois par jour.`,
      de: `Im Jahr der Trauer — als der Prophet ﷺ seine geliebte Frau Khadijah und seinen Onkel Abu Talib verloren hatte — ehrte Allah Seinen Propheten mit einer wundersamen Nachtreise, die in der Menschheitsgeschichte ihresgleichen sucht.

Der Engel Jibril (Gabriel) (AS) kam zum Propheten ﷺ und brachte ihn auf einem prächtigen Wesen namens Al-Buraq zur Moschee al-Aqsa in Jerusalem. In der Moschee leitete der Prophet ﷺ alle Propheten — Ibrahim, Musa, Isa und alle anderen — im Gebet an.

Dann begann die Himmelfahrt (Mi'radsch). Durch die sieben Himmel begleitete Jibril den Propheten ﷺ. In jedem Himmel begrüßte ihn ein Prophet: Adam (AS) im ersten, Yahya und Isa (AS) im zweiten, Yusuf (AS) im dritten, Idris (AS) im vierten, Harun (AS) im fünften, Musa (AS) im sechsten und Ibrahim (AS) im siebten.

Der Prophet ﷺ wurde dann noch weiter gebracht, an einen Ort, den keine Schöpfung erreicht hatte — Allah so nahe wie zwei Bogenlängen oder noch näher. Dort sprach Allah direkt mit Seinem Propheten und machte die fünf täglichen Gebete für die muslimische Nation verpflichtend.

Als der Prophet ﷺ nach Mekka zurückkehrte und den Menschen davon erzählte, lehnten viele ab und spotteten. Als Abu Bakr es hörte, sagte er ohne Zögern: „Wenn er es gesagt hat, dann glaube ich es." Dies bestätigte seinen Titel As-Siddiq.

Die fünf täglichen Gebete bleiben das größte Geschenk dieser Nacht — eine direkte Verbindung zwischen jedem Gläubigen und seinem Herrn, fünfmal täglich.`,
    },
    moral: {
      en: "Even in our darkest moments, Allah honors and elevates those who remain steadfast. The five daily prayers are our direct connection to Allah — a gift from the greatest night in history.",
      ar: "حتى في أحلك اللحظات، يُكرم الله ويرفع درجات الثابتين. الصلوات الخمس هي صلتنا المباشرة بالله — هبة من أعظم ليلة في التاريخ.",
      fr: "Même dans nos moments les plus sombres, Allah honore et élève ceux qui restent constants. Les cinq prières quotidiennes sont notre lien direct avec Allah — un don de la plus grande nuit de l'histoire.",
      de: "Selbst in unseren dunkelsten Momenten ehrt und erhebt Allah diejenigen, die standhaft bleiben. Die fünf täglichen Gebete sind unsere direkte Verbindung zu Allah — ein Geschenk der größten Nacht der Geschichte.",
    },
    readingTime: 5,
  },
  {
    id: "s7",
    category: "prophets",
    title: {
      en: "The Story of Prophet Yusuf (AS)",
      ar: "قصة يوسف عليه السلام",
      fr: "L'Histoire du Prophète Youssef (AS)",
      de: "Die Geschichte des Propheten Yusuf (AS)",
    },
    arabicOpening: "نَحْنُ نَقُصُّ عَلَيْكَ أَحْسَنَ الْقَصَصِ — يوسف: ٣",
    content: {
      en: `Allah calls the story of Yusuf (Joseph) (AS) "the best of stories" in the Quran (12:3). It is a profound tale of jealousy, patience, loss, temptation, and ultimate triumph.

Yusuf (AS) was the beloved son of the Prophet Ya'qub (Jacob) (AS). As a child, he had a dream: eleven stars, the sun, and the moon all prostrated before him. His father recognized the dream's significance and told him to keep it secret from his brothers.

But Yusuf's brothers were consumed by jealousy. They threw the young boy into a dark well and returned to their father with his shirt, stained with false blood, claiming a wolf had devoured him.

Yusuf was pulled from the well by a passing caravan and sold as a slave in Egypt. Yet Allah was with him. He grew into a man of extraordinary beauty and noble character. When a nobleman's wife tried to seduce him, Yusuf refused and was sent to prison. Even in prison, he taught people and interpreted dreams, maintaining his faith.

Years passed. Pharaoh had a disturbing dream. No one could interpret it until someone remembered Yusuf in prison. Yusuf interpreted the dream: seven years of abundance followed by seven years of severe drought. Pharaoh was so impressed that he made Yusuf the chief minister of Egypt.

When the drought came, Yusuf's brothers came to Egypt seeking grain. After a dramatic series of events, Yusuf finally revealed himself. When his brothers fell before him in shame and fear, Yusuf said:

"There is no blame on you today. May Allah forgive you. He is the Most Merciful of the merciful." (12:92)`,
      ar: `يصف الله قصة يوسف عليه السلام بأنها "أحسن القصص" في القرآن الكريم (يوسف: 3). إنها قصة عميقة عن الغيرة والصبر والفقدان والفتنة والانتصار في النهاية.

يوسف عليه السلام كان الابن الحبيب للنبي يعقوب عليه السلام. في طفولته رأى رؤيا: أحد عشر كوكباً والشمس والقمر يسجدون له. فعرف أبوه أهمية الرؤيا وطلب منه كتمها عن إخوته.

لكن إخوة يوسف أكلتهم الغيرة، فألقوه في غيابة الجبّ صغيراً وعادوا إلى أبيهم بقميصه ملطّخاً بدم زور، مدّعين أن الذئب أكله.

التقطت يوسف سيارة مارّة وبِيع عبداً في مصر. لكن الله كان معه. فشبّ رجلاً بهيّ الطلعة كريم الخُلق. وحين حاولت امرأة العزيز إغواءه أبى وزُجّ به في السجن. لكنه حتى في السجن ظلّ يُعلّم الناس ويعبّر الأحلام محافظاً على إيمانه.

مرّت سنون وأزعج فرعون حلمٌ. لم يجد أحداً يعبّره حتى تذكّر أحدهم يوسف في السجن، فعبّره: سبع سنوات خصبة تليها سبع سنوات قحط شديد. فتأثّر فرعون وجعله وزيراً أول في مصر.

ولما جاء القحط، جاء إخوة يوسف إلى مصر يطلبون الطعام. وبعد مفاجآت متعاقبة، كشف يوسف عن نفسه. فلما خرّ إخوته أمامه خجلاً وهلعاً قال لهم: "قَالَ لَا تَثْرِيبَ عَلَيْكُمُ الْيَوْمَ ۖ يَغْفِرُ اللَّهُ لَكُمْ ۖ وَهُوَ أَرْحَمُ الرَّاحِمِينَ." (يوسف: 92)`,
      fr: `Allah appelle l'histoire de Youssef (Joseph) (AS) "le meilleur des récits" dans le Coran (12:3). C'est un récit profond sur la jalousie, la patience, la perte, la tentation et le triomphe final.

Youssef (AS) était le fils bien-aimé du Prophète Ya'qoub (Jacob) (AS). Enfant, il eut un rêve: onze étoiles, le soleil et la lune se prosternaient devant lui. Son père reconnut la signification du rêve et lui dit de le garder secret de ses frères.

Mais les frères de Youssef étaient rongés par la jalousie. Ils jetèrent le jeune garçon dans un puits obscur et retournèrent vers leur père avec sa chemise tachée de faux sang, prétendant qu'un loup l'avait dévoré.

Youssef fut sorti du puits par une caravane et vendu comme esclave en Égypte. Mais Allah était avec lui. Il devint un homme d'une beauté et d'un caractère extraordinaires. Quand la femme d'un noble essaya de le séduire, Youssef refusa et fut envoyé en prison. Même en prison, il enseignait et interprétait les rêves, maintenant sa foi.

Des années passèrent. Pharaon eut un rêve troublant. Personne ne put l'interpréter jusqu'à ce que quelqu'un se souvienne de Youssef en prison. Youssef interpréta le rêve: sept années d'abondance suivies de sept années de sécheresse sévère. Pharaon fut tellement impressionné qu'il nomma Youssef grand ministre d'Égypte.

Quand la sécheresse arriva, les frères de Youssef vinrent en Égypte chercher des céréales. Après une série d'événements dramatiques, Youssef se révéla enfin. Quand ses frères tombèrent devant lui dans la honte et la crainte, Youssef dit:

"Il n'y a pas de reproche sur vous aujourd'hui. Qu'Allah vous pardonne. Il est le Plus Miséricordieux des miséricordieux." (12:92)`,
      de: `Allah nennt die Geschichte von Yusuf (Josef) (AS) „die beste der Geschichten" im Quran (12:3). Es ist eine tiefgründige Geschichte über Eifersucht, Geduld, Verlust, Versuchung und schließlichen Triumph.

Yusuf (AS) war der geliebte Sohn des Propheten Ya'qub (Jakob) (AS). Als Kind hatte er einen Traum: Elf Sterne, die Sonne und der Mond warfen sich vor ihm nieder. Sein Vater erkannte die Bedeutung des Traums und bat ihn, ihn vor seinen Brüdern geheim zu halten.

Aber Yusufs Brüder waren von Eifersucht verzehrt. Sie warfen den jungen Jungen in einen dunklen Brunnen und kehrten mit seinem Hemd, gefärbt mit falschem Blut, zu ihrem Vater zurück und behaupteten, ein Wolf habe ihn gefressen.

Yusuf wurde von einer vorbeiziehenden Karawane aus dem Brunnen gezogen und als Sklave in Ägypten verkauft. Doch Allah war mit ihm. Er wuchs zu einem Mann von außergewöhnlicher Schönheit und edlem Charakter heran. Als die Frau eines Adligen versuchte, ihn zu verführen, lehnte Yusuf ab und wurde ins Gefängnis geschickt. Sogar im Gefängnis lehrte er die Menschen und deutete Träume, seinen Glauben bewahrend.

Jahre vergingen. Der Pharao hatte einen beunruhigenden Traum. Niemand konnte ihn deuten, bis jemand an Yusuf im Gefängnis erinnerte. Yusuf deutete den Traum: Sieben Jahre des Überflusses gefolgt von sieben Jahren schwerer Dürre. Der Pharao war so beeindruckt, dass er Yusuf zum leitenden Minister Ägyptens machte.

Als die Dürre kam, kamen Yusufs Brüder nach Ägypten, um Getreide zu suchen. Nach einer dramatischen Reihe von Ereignissen enthüllte sich Yusuf schließlich. Als seine Brüder in Scham und Angst vor ihm niederfielen, sagte Yusuf:

„Kein Vorwurf gelte euch heute. Allah möge euch vergeben. Er ist der Barmherzigste der Barmherzigen." (12:92)`,
    },
    moral: {
      en: "Never despair of Allah's mercy. What seems like the worst moment of your life may be the beginning of your elevation. Patience always leads to a beautiful outcome.",
      ar: "لا تيأس من رحمة الله قط. ما يبدو أسوأ لحظة في حياتك قد يكون بداية رفعتك. الصبر يُفضي دائماً إلى عاقبة حسنة.",
      fr: "Ne désespère jamais de la miséricorde d'Allah. Ce qui semble être le pire moment de ta vie pourrait être le début de ton élévation. La patience mène toujours à une belle issue.",
      de: "Verzweifle niemals an Allahs Barmherzigkeit. Was wie der schlimmste Moment deines Lebens erscheint, könnte der Beginn deiner Erhöhung sein. Geduld führt immer zu einem schönen Ergebnis.",
    },
    readingTime: 7,
  },
  {
    id: "s8",
    category: "prophets",
    title: {
      en: "Ibrahim (AS) and the Fire",
      ar: "إبراهيم عليه السلام والنار",
      fr: "Ibrahim (AS) et le Feu",
      de: "Ibrahim (AS) und das Feuer",
    },
    arabicOpening: "قُلْنَا يَا نَارُ كُونِي بَرْدًا وَسَلَامًا عَلَىٰ إِبْرَاهِيمَ — الأنبياء: ٦٩",
    content: {
      en: `Ibrahim (Abraham) (AS) — Khalilullah, the Friend of Allah — was born into a family of idol-makers. From his earliest youth, Ibrahim's mind rejected the worship of statues that could neither hear nor help anyone.

"O my father, why do you worship something that does not hear, does not see, and cannot benefit you at all?" (19:42)

One day, when the city was celebrating a festival and everyone had left, Ibrahim entered the temple and shattered all the idols — except the largest one. He hung the axe around the large idol's neck.

When the people returned and saw their gods in pieces, they accused Ibrahim. He said: "Ask the large one — he has the axe!" When they protested that the idol couldn't speak, Ibrahim said: "Then why do you worship that which cannot benefit or harm you?"

Furious, the people agreed: Ibrahim would be thrown into the greatest fire they could build. They gathered wood for days, creating a blaze so enormous they had to use a catapult to throw Ibrahim in.

As Ibrahim was placed in the catapult, the angel Jibril (Gabriel) appeared and asked: "Do you need anything?"

Ibrahim replied: "From you, no. But from Allah — He knows my state."

At that moment, Allah commanded: "O fire, be coolness and safety upon Ibrahim!" (21:69)

The fire could not burn him. When Ibrahim emerged, unharmed and tranquil, many people believed. Ibrahim (AS) would go on to build the Kaaba and become known as the "Imam of Mankind."`,
      ar: `إبراهيم عليه السلام - خليل الله - وُلد في بيت صانع أصنام. ومنذ صغره أبى عقله قبول عبادة تماثيل لا تسمع ولا تنفع.

"يَا أَبَتِ لِمَ تَعْبُدُ مَا لَا يَسْمَعُ وَلَا يُبْصِرُ وَلَا يُغْنِي عَنكَ شَيْئًا؟" (مريم: 42)

وذات يوم حين خرج أهل المدينة للعيد دخل إبراهيم الهيكل وحطّم كل الأصنام إلا أكبرها، وعلّق الفأس في عنقه.

ولما رجع الناس ورأوا آلهتهم هشيماً اتهموا إبراهيم. فقال: "اسألوا كبيرهم، فإن الفأس في عنقه!" فلما احتجوا بأن الصنم لا يتكلم قال: "فلِمَ تعبدون ما لا ينفعكم ولا يضركم؟"

اجتمع الناس غاضبين وقرّروا إلقاء إبراهيم في أضخم نار يبنونها. جمعوا الحطب أياماً حتى غدت النار ضخمة جداً أمكن إلقاؤه فيها بالمنجنيق.

وحين وُضع إبراهيم في المنجنيق، أتاه جبريل عليه السلام وقال: "ألك حاجة؟" فأجاب إبراهيم: "أما إليك فلا. أما إلى الله فعلمه بحالي يكفيني."

في تلك اللحظة أصدر الله أمره: "يَا نَارُ كُونِي بَرْدًا وَسَلَامًا عَلَىٰ إِبْرَاهِيمَ" (الأنبياء: 69).

فلم تستطع النار أن تحرقه. ولما خرج إبراهيم سالماً هادئاً آمن كثيرون. ثم بنى إبراهيم عليه السلام الكعبة المشرفة واستحق لقب "إمام الناس".`,
      fr: `Ibrahim (Abraham) (AS) — Khalilullah, l'Ami d'Allah — est né dans une famille de fabricants d'idoles. Dès sa plus jeune enfance, l'esprit d'Ibrahim rejeta l'adoration de statues qui ne pouvaient ni entendre ni aider quiconque.

"Ô mon père, pourquoi adores-tu ce qui n'entend pas, ne voit pas et ne peut rien faire pour toi?" (19:42)

Un jour, alors que la ville célébrait une fête et que tout le monde était parti, Ibrahim entra dans le temple et brisa toutes les idoles — sauf la plus grande. Il accrocha la hache autour du cou de la grande idole.

Quand les gens revinrent et virent leurs dieux en morceaux, ils accusèrent Ibrahim. Il dit: "Demandez au plus grand — il a la hache!" Quand ils protestèrent que l'idole ne pouvait pas parler, Ibrahim dit: "Alors pourquoi adorez-vous ce qui ne peut ni vous profiter ni vous nuire?"

Furieux, le peuple décida: Ibrahim serait jeté dans le plus grand feu qu'ils pourraient construire. Ils rassemblèrent du bois pendant des jours, créant un brasier si énorme qu'ils durent utiliser une catapulte pour y jeter Ibrahim.

Alors qu'Ibrahim était placé dans la catapulte, l'ange Jibril (Gabriel) apparut et demanda: "As-tu besoin de quelque chose?"

Ibrahim répondit: "De toi, non. Mais d'Allah — Il connaît mon état."

À ce moment, Allah ordonna: "Ô feu, sois fraîcheur et paix pour Ibrahim!" (21:69)

Le feu ne put pas le brûler. Quand Ibrahim émergea, indemne et tranquille, beaucoup crurent. Ibrahim (AS) allait ensuite construire la Kaaba et devenir connu comme "l'Imam de l'Humanité".`,
      de: `Ibrahim (Abraham) (AS) — Khalilullah, der Freund Allahs — wurde in eine Familie von Götzenbildnern geboren. Schon von frühester Jugend an lehnte Ibrahims Geist die Verehrung von Statuen ab, die weder hören noch jemandem helfen konnten.

„O mein Vater, warum betest du etwas an, das nicht hört, nicht sieht und dir überhaupt nicht nützen kann?" (19:42)

Eines Tages, als die Stadt ein Fest feierte und alle weggegangen waren, betrat Ibrahim den Tempel und zerschlug alle Götzen — außer dem größten. Er hängte die Axt um den Hals des großen Götzen.

Als die Menschen zurückkamen und ihre Götter in Stücken sahen, beschuldigten sie Ibrahim. Er sagte: „Fragt den Großen — er hat die Axt!" Als sie protestierten, dass die Götzenstatue nicht sprechen konnte, sagte Ibrahim: „Warum betet ihr dann das an, was euch weder nützen noch schaden kann?"

Wütend beschlossen die Menschen: Ibrahim würde in das größte Feuer geworfen, das sie bauen konnten. Sie sammelten tagelang Holz und schufen ein Inferno so gewaltig, dass sie eine Katapulte benutzen mussten, um Ibrahim hineinzuwerfen.

Als Ibrahim in die Katapulte gelegt wurde, erschien der Engel Jibril (Gabriel) und fragte: „Brauchst du irgendetwas?"

Ibrahim antwortete: „Von dir, nein. Aber von Allah — Er kennt meinen Zustand."

In diesem Moment befahl Allah: „O Feuer, sei Kühle und Frieden für Ibrahim!" (21:69)

Das Feuer konnte ihn nicht verbrennen. Als Ibrahim unversehrt und ruhig herauskam, glaubten viele. Ibrahim (AS) sollte später die Kaaba bauen und als „Imam der Menschheit" bekannt werden.`,
    },
    moral: {
      en: "True tawhid means having complete certainty in Allah alone. When Ibrahim asked for no help from the angel but only from Allah, he demonstrated that trust in Allah is the most powerful force in existence.",
      ar: "التوحيد الحق يعني الثقة الكاملة بالله وحده. حين لم يستغث إبراهيم بالملَك بل بالله وحده، أثبت أن التوكل على الله أعظم قوة في الوجود.",
      fr: "Le vrai tawhid signifie avoir une certitude complète en Allah seul. Quand Ibrahim n'a demandé aucune aide à l'ange mais seulement à Allah, il a démontré que la confiance en Allah est la force la plus puissante qui soit.",
      de: "Wahres Tawhid bedeutet, vollständige Gewissheit in Allah allein zu haben. Als Ibrahim keine Hilfe vom Engel, sondern nur von Allah erbat, zeigte er, dass Vertrauen in Allah die mächtigste Kraft in der Existenz ist.",
    },
    readingTime: 5,
  },
  {
    id: "s9",
    category: "companions",
    title: {
      en: "Salman al-Farisi — The Seeker of Truth",
      ar: "سلمان الفارسي — الباحث عن الحق",
      fr: "Salman al-Farisi — Le Chercheur de Vérité",
      de: "Salman al-Farisi — Der Wahrheitssucher",
    },
    arabicOpening: "وَالَّذِينَ جَاهَدُوا فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا — العنكبوت: ٦٩",
    content: {
      en: `Salman al-Farisi (RA) was born into a Persian noble family. From his youth, Salman was seized by an intense hunger for truth — a restlessness that would take him across the ancient world.

When he first encountered a Christian monk, he was so moved that he abandoned his family's fire-temple to follow the monk. He traveled from monk to monk across the ancient world, each one on their deathbed directing him to the next seeker of truth.

The last monk, in Syria, said to Salman: "The time of a prophet has arrived. He will appear in the land of Arabs, between two volcanic areas. He will accept a gift but not charity. Between his shoulder blades is the seal of prophethood."

Salman paid dearly for his journey — he was enslaved and eventually ended up in Medina. When news came of a prophet in Arabia, Salman went to investigate.

He brought the Prophet ﷺ some dates as sadaqa (charity). The Prophet ﷺ distributed them but did not eat any himself — matching the first sign.

He brought more dates as a gift — and the Prophet ﷺ ate with his companions — matching the second sign.

Then Salman came behind the Prophet ﷺ and moved his garment aside. When he saw the Seal of Prophethood between his shoulders, Salman burst into tears and fell upon the Prophet, kissing the seal.

The Prophet ﷺ freed him and said: "Salman is one of us, the Ahlul-Bayt."

It was Salman who suggested digging the trench at the Battle of Khandaq, a strategy that saved Medina.`,
      ar: `سلمان الفارسي رضي الله عنه وُلد في أسرة فارسية نبيلة. منذ شبابه استولى عليه شوق حارق إلى الحقيقة دفعه إلى التنقل في أرجاء العالم القديم.

حين التقى أول مرة براهبٍ مسيحي، تأثّر به تأثراً بالغاً فترك بيت نار أسرته ليسير معه. وراح يتنقل من راهب إلى راهب في أنحاء العالم القديم، كل واحد على فراش موته يدله على طالب حق آخر.

وقال له آخر الرهبان في الشام: "لقد أُرهص ببعثة نبي. سيظهر في بلاد العرب بين حرّتين. يقبل الهدية ولا يأكل الصدقة. وبين كتفيه خاتم النبوة."

دفع سلمان ثمناً باهظاً لرحلته فاسترُقّ وانتهى به المطاف في المدينة المنورة. ولما بلغه خبر نبي في بلاد العرب، ذهب للتحقق.

أتى النبيَّ ﷺ بتمر قدّمه صدقةً، فوزّع النبي ﷺ التمر ولم يأكل منه — فانطبقت الأولى.

ثم أتاه بتمر هديةً فأكل منه النبي ﷺ مع أصحابه — فانطبقت الثانية.

ثم جاء سلمان من خلف النبي ﷺ وكشف عن كتفيه، فلما رأى خاتم النبوة بكى بكاءً مراً وانكبّ على النبي يقبّل الخاتم.

فأعتق النبي ﷺ سلمان وقال: "سلمان منا أهل البيت."

وكان سلمان هو من اقترح حفر الخندق في غزوة الخندق، وهو الأسلوب الذي أنقذ المدينة.`,
      fr: `Salman al-Farisi (RA) est né dans une noble famille persane. Dès sa jeunesse, Salman fut saisi d'une intense soif de vérité — une agitation qui l'emmènerait à travers le monde antique.

Lorsqu'il rencontra pour la première fois un moine chrétien, il fut tellement touché qu'il abandonna le temple du feu de sa famille pour suivre le moine. Il voyagea de moine en moine à travers le monde antique, chacun sur son lit de mort lui indiquant le prochain chercheur de vérité.

Le dernier moine, en Syrie, dit à Salman: "Le temps d'un prophète est arrivé. Il apparaîtra au pays des Arabes, entre deux zones volcaniques. Il acceptera un cadeau mais pas l'aumône. Entre ses omoplates se trouve le sceau de la prophétie."

Salman paya chèrement son voyage — il fut réduit en esclavage et finit par se retrouver à Médine. Quand des nouvelles d'un prophète en Arabie arrivèrent, Salman alla enquêter.

Il apporta au Prophète ﷺ des dattes en sadaqa (aumône). Le Prophète ﷺ les distribua mais n'en mangea aucune lui-même — correspondant au premier signe.

Il apporta plus de dattes en cadeau — et le Prophète ﷺ en mangea avec ses compagnons — correspondant au deuxième signe.

Puis Salman vint derrière le Prophète ﷺ et écarta son vêtement. Lorsqu'il vit le Sceau de la Prophétie entre ses épaules, Salman éclata en larmes et tomba sur le Prophète, embrassant le sceau.

Le Prophète ﷺ lui dit: "Salman est des nôtres, de l'Ahlul-Bayt."

C'est Salman qui suggéra de creuser le fossé lors de la bataille du Khandaq, une stratégie qui sauva Médine.`,
      de: `Salman al-Farisi (ra) wurde in eine persische Adelsfamilie geboren. Schon in seiner Jugend wurde Salman von einem intensiven Hunger nach Wahrheit erfasst — eine Ruhelosigkeit, die ihn durch die antike Welt führen sollte.

Als er zum ersten Mal einem christlichen Mönch begegnete, war er so bewegt, dass er den Feuertempel seiner Familie verließ, um dem Mönch zu folgen. Er reiste von Mönch zu Mönch durch die antike Welt, jeder auf seinem Sterbebett wies ihn zum nächsten Wahrheitssucher.

Der letzte Mönch, in Syrien, sagte zu Salman: „Die Zeit eines Propheten ist gekommen. Er wird im Land der Araber erscheinen, zwischen zwei vulkanischen Gebieten. Er wird ein Geschenk annehmen, aber keine Almosen. Zwischen seinen Schulterblättern befindet sich das Siegel der Prophetenschaft."

Salman bezahlte teuer für seine Reise — er wurde versklavt und landete schließlich in Medina. Als Nachrichten von einem Propheten in Arabien kamen, ging Salman, um nachzuforschen.

Er brachte dem Propheten ﷺ Datteln als Sadaqa (Almosen). Der Prophet ﷺ verteilte sie, aber aß selbst keine davon — das erste Zeichen stimmte.

Er brachte mehr Datteln als Geschenk — und der Prophet ﷺ aß mit seinen Gefährten — das zweite Zeichen stimmte.

Dann kam Salman hinter den Propheten ﷺ und schob sein Gewand beiseite. Als er das Siegel der Prophetenschaft zwischen seinen Schultern sah, brach Salman in Tränen aus und fiel auf den Propheten, das Siegel küssend.

Der Prophet ﷺ sagte: „Salman ist einer von uns, dem Ahlul-Bayt."

Es war Salman, der vorschlug, den Graben in der Khandaq-Schlacht zu graben, eine Strategie, die Medina rettete.`,
    },
    moral: {
      en: "No distance is too great, no sacrifice too large, when the seeker is sincere. Allah guides to His light those who search with a true heart.",
      ar: "لا مسافة بعيدة ولا تضحية كبيرة لمن يبحث بصدق. يهدي الله إلى نوره كل من يبحث بقلب صادق.",
      fr: "Aucune distance n'est trop grande, aucun sacrifice trop important, quand le chercheur est sincère. Allah guide vers Sa lumière ceux qui cherchent avec un cœur sincère.",
      de: "Keine Distanz ist zu groß, kein Opfer zu groß, wenn der Suchende aufrichtig ist. Allah führt zu Seinem Licht diejenigen, die mit einem wahren Herzen suchen.",
    },
    readingTime: 6,
  },
  {
    id: "s10",
    category: "history",
    title: {
      en: "The Battle of Badr",
      ar: "معركة بدر الكبرى",
      fr: "La Bataille de Badr",
      de: "Die Schlacht von Badr",
    },
    arabicOpening: "وَلَقَدْ نَصَرَكُمُ اللَّهُ بِبَدْرٍ وَأَنتُمْ أَذِلَّةٌ — آل عمران: ١٢٣",
    content: {
      en: `The year was 624 CE — just two years after the Prophet ﷺ and his companions had arrived in Medina as refugees. A Qurayshi trade caravan led by Abu Sufyan was returning from Syria with enormous wealth.

The Muslims decided to intercept the caravan. Abu Sufyan received word and diverted it, sending an urgent message to Mecca: "Send an army to protect us!"

The Quraysh mobilized a force of 1,000 warriors — well-armed, armored, and experienced. The Muslims numbered only 313, poorly equipped, with only 2 horses and 70 camels between them all.

At the wells of Badr, the two forces faced each other. The night before the battle, the Prophet ﷺ stood in prayer, weeping and calling to Allah: "O Allah, if this small group perishes today, You will not be worshipped on earth."

On the morning of battle, the Prophet ﷺ looked at his small army and then at the sky, and received the revelation: "I will reinforce you with a thousand of the angels, following one another." (8:9)

The battle began. The Muslims fought with extraordinary courage. Abu Jahl — the greatest enemy of Islam — was killed by two young men who had just embraced Islam.

By the day's end, the Quraysh were routed: 70 of their leaders killed, 70 taken prisoner. The Muslims lost only 14 men. It was a decisive miracle.

The prisoners were treated with gentleness. Those who could not pay ransom were asked to teach ten Muslim children to read and write.`,
      ar: `كان عام 624 م — بعد عامين فحسب من هجرة النبي ﷺ وصحابته إلى المدينة لاجئين. كانت قافلة قريش التجارية بقيادة أبي سفيان تعود من الشام محملة بثروات طائلة.

قرّر المسلمون اعتراض القافلة، فعلم أبو سفيان وحوّل مسارها وأرسل رسالة استغاثة عاجلة إلى مكة: "أعيثونا!"

فتحرّكت قريش بجيش ألف مقاتل مدجّجين بالسلاح والدروع وأصحاب خبرة. أما المسلمون فلم يكونوا إلا 313 رجلاً سلاحهم زهيد ومعهم فرسان وسبعون بعيراً في المجموع.

عند آبار بدر، تواجه الجمعان. قضى النبي ﷺ الليل قبل المعركة يصلي ويبكي ويدعو: "اللهم إن تُهلك هذه العصابة لن تُعبد في الأرض."

وفي صبيحة المعركة نظر النبي ﷺ إلى جيشه الصغير ثم إلى السماء فنزل الوحي: "أَنِّي مُمِدُّكُم بِأَلْفٍ مِّنَ الْمَلَائِكَةِ مُرْدِفِينَ" (الأنفال: 9).

اندلعت المعركة وقاتل المسلمون ببسالة نادرة. وقُتل أبو جهل — ألد أعداء الإسلام — على يد فتيَّين حديثَي إسلام.

وآخر النهار انهزمت قريش: قُتل سبعون من زعمائها وأُسر سبعون. أما المسلمون فلم يفقدوا إلا أربعة عشر رجلاً. كانت معجزة حاسمة.

وعومل الأسرى برفق ومحبة. ومن عجز منهم عن الفداء طُلب منه تعليم عشرة من أطفال المسلمين القراءة والكتابة.`,
      fr: `C'était en 624 apr. J.-C. — seulement deux ans après que le Prophète ﷺ et ses compagnons étaient arrivés à Médine comme réfugiés. Une caravane commerciale qurayshite dirigée par Abu Sufyan revenait de Syrie avec d'immenses richesses.

Les musulmans décidèrent d'intercepter la caravane. Abu Sufyan l'apprit et la dérouta, envoyant un message urgent à La Mecque: "Envoyez une armée pour nous protéger!"

Les Quraysh mobilisèrent une force de 1 000 guerriers — bien armés, blindés et expérimentés. Les musulmans n'étaient que 313, mal équipés, avec seulement 2 chevaux et 70 chameaux pour tous.

Aux puits de Badr, les deux forces se firent face. La nuit avant la bataille, le Prophète ﷺ se tint en prière, pleurant et appelant Allah: "Ô Allah, si ce petit groupe périt aujourd'hui, Tu ne seras plus adoré sur terre."

Au matin de la bataille, le Prophète ﷺ regarda sa petite armée puis le ciel, et reçut la révélation: "Je vous renforcerai de mille anges qui se suivent." (8:9)

La bataille commença. Les musulmans combattirent avec un courage extraordinaire. Abu Jahl — le plus grand ennemi de l'Islam — fut tué par deux jeunes hommes qui venaient d'embrasser l'Islam.

À la fin de la journée, les Quraysh étaient en déroute: 70 de leurs chefs tués, 70 faits prisonniers. Les musulmans n'avaient perdu que 14 hommes. C'était un miracle décisif.

Les prisonniers furent traités avec douceur. Ceux qui ne pouvaient pas payer de rançon furent invités à enseigner la lecture et l'écriture à dix enfants musulmans.`,
      de: `Es war das Jahr 624 n. Chr. — nur zwei Jahre nachdem der Prophet ﷺ und seine Gefährten als Flüchtlinge in Medina angekommen waren. Eine von Abu Sufyan geführte Quraisch-Handelskarawane kehrte aus Syrien mit enormem Reichtum zurück.

Die Muslime beschlossen, die Karawane abzufangen. Abu Sufyan erfuhr davon und leitete sie um, schickte eine dringende Botschaft nach Mekka: „Schickt eine Armee, um uns zu schützen!"

Die Quraisch mobilisierten eine Streitmacht von 1.000 Kriegern — gut bewaffnet, gepanzert und erfahren. Die Muslime waren nur 313, schlecht ausgestattet, mit zusammen nur 2 Pferden und 70 Kamelen.

An den Brunnen von Badr standen sich die beiden Kräfte gegenüber. Die Nacht vor der Schlacht verbrachte der Prophet ﷺ im Gebet, weinend und Allah anrufend: „O Allah, wenn diese kleine Gruppe heute umkommt, wirst Du auf Erden nicht mehr angebetet werden."

Am Morgen der Schlacht blickte der Prophet ﷺ auf seine kleine Armee und dann in den Himmel, und erhielt die Offenbarung: „Ich werde euch mit tausend Engeln verstärken, die einander folgen." (8:9)

Die Schlacht begann. Die Muslime kämpften mit außerordentlichem Mut. Abu Jahl — der größte Feind des Islams — wurde von zwei jungen Männern getötet, die gerade den Islam angenommen hatten.

Am Ende des Tages waren die Quraisch geschlagen: 70 ihrer Anführer getötet, 70 gefangen genommen. Die Muslime verloren nur 14 Männer. Es war ein entscheidendes Wunder.

Die Gefangenen wurden mit Güte behandelt. Diejenigen, die kein Lösegeld zahlen konnten, wurden gebeten, zehn muslimischen Kindern Lesen und Schreiben beizubringen.`,
    },
    moral: {
      en: "When the believers are sincere and trust in Allah, size and material power matter little. Divine support is with those whose cause is true.",
      ar: "حين يكون المؤمنون صادقين متوكلين على الله، فالعدد والقوة المادية لا يُجديان. النصر الإلهي مع من كان حقه حقاً.",
      fr: "Quand les croyants sont sincères et font confiance à Allah, la taille et la puissance matérielle importent peu. Le soutien divin est avec ceux dont la cause est juste.",
      de: "Wenn die Gläubigen aufrichtig sind und Allah vertrauen, spielen Größe und materielle Macht kaum eine Rolle. Göttliche Unterstützung ist bei denen, deren Sache wahr ist.",
    },
    readingTime: 5,
  },
  {
    id: "s11",
    category: "prophet",
    title: {
      en: "The Prophet's ﷺ Mercy toward Children",
      ar: "رحمة النبي ﷺ بالأطفال",
      fr: "La Miséricorde du Prophète ﷺ envers les Enfants",
      de: "Die Barmherzigkeit des Propheten ﷺ gegenüber Kindern",
    },
    arabicOpening: "وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ — الأنبياء: ١٠٧",
    content: {
      en: `Among the most touching aspects of the Prophet's ﷺ character was his extraordinary tenderness toward children.

Once, the Prophet ﷺ was leading a prayer and prolonged his prostration (sujud) far longer than usual. When he finished, the companions asked why. He smiled and said: "My grandson climbed on my back, and I did not want to hurry him until he had finished."

Hasan and Husayn — his grandsons — were the joy of his life. He would carry them on his shoulders, play with them, and race them. He said: "They are my fragrant flowers in this world."

When the Prophet ﷺ would return from a journey, the children of Medina would run out to greet him. He would stop his camel, pick up the small children, and carry them before him as he entered the city.

When Anas ibn Malik's younger brother died, the Prophet ﷺ came to visit the family and sat beside the grieving child. He called the boy by a nickname: "O Abu Umayr, what happened to the little bird?" — trying to make the child smile in his sadness.

Once a man boasted: "I have ten children and I have never kissed any of them." The Prophet ﷺ replied: "The one who shows no mercy will not be shown mercy."

He ﷺ said: "I begin the prayer intending to lengthen it, but then I hear a child crying, and I shorten it, not wanting to cause hardship to his mother."`,
      ar: `من أبلغ ما يتسم به خُلق النبي ﷺ رقته الفائقة مع الأطفال.

كان ذات يوم يؤم الناس في الصلاة فأطال السجود طولاً غير معهود. فلما انتهى سأله الصحابة عن السبب، فابتسم وقال: "ركب ابني على ظهري فكرهت أن أعجله حتى يقضي حاجته."

كان الحسن والحسين - حفيداه - بهجة حياته، يحملهما على كتفيه ويلاعبهما ويسابقهما. وقال فيهما: "هما ريحانتاي من الدنيا."

وكان إذا عاد من سفر خرج إليه أطفال المدينة مرحّبين به، فيوقف راحلته ويحمل الصغار ويُدخلهم المدينة بين يديه.

ولما توفي شقيق أنس بن مالك الصغير، جاء النبي ﷺ يعزّي الأسرة وجلس إلى جانب الطفل الحزين ونادى عليه بكنيته: "يا أبا عمير، ما فعل النغير؟" - يحاول استدرار ابتسامة من طفل في حزنه.

ومرة تفاخر رجل: "لي عشرة أولاد ما قبّلت أحداً منهم قط." فقال النبي ﷺ: "من لا يرحم لا يُرحم."

وقال ﷺ: "إني لأقوم إلى الصلاة وأنا أريد إطالتها، فأسمع بكاء الصبي فأتجوز في صلاتي مخافة أن أشق على أمه."`,
      fr: `Parmi les aspects les plus touchants du caractère du Prophète ﷺ se trouvait sa tendresse extraordinaire envers les enfants.

Un jour, le Prophète ﷺ dirigeait la prière et prolongea sa prosternation (sujud) beaucoup plus longtemps qu'à l'habitude. Quand il eut terminé, les compagnons lui demandèrent pourquoi. Il sourit et dit: "Mon petit-fils est monté sur mon dos, et je n'ai pas voulu le presser avant qu'il ait fini."

Hasan et Husayn — ses petits-fils — étaient la joie de sa vie. Il les portait sur ses épaules, jouait avec eux et faisait des courses. Il dit: "Ils sont mes fleurs parfumées en ce monde."

Quand le Prophète ﷺ revenait d'un voyage, les enfants de Médine couraient à sa rencontre. Il arrêtait son chameau, prenait les petits enfants et les portait devant lui en entrant dans la ville.

Quand le jeune frère d'Anas ibn Malik mourut, le Prophète ﷺ vint rendre visite à la famille et s'assit près de l'enfant en deuil. Il appela le garçon par un surnom: "Ô Abu Umayr, qu'est-il arrivé au petit oiseau?" — essayant de faire sourire l'enfant dans sa tristesse.

Un jour un homme se vanta: "J'ai dix enfants et je n'en ai jamais embrassé un seul." Le Prophète ﷺ répondit: "Celui qui ne montre pas de miséricorde ne sera pas traité avec miséricorde."

Il ﷺ dit: "Je commence la prière en ayant l'intention de la prolonger, puis j'entends un enfant pleurer, et je l'abrège, ne voulant pas causer de peine à sa mère."`,
      de: `Einer der rührendsten Aspekte des Charakters des Propheten ﷺ war seine außerordentliche Zärtlichkeit gegenüber Kindern.

Einmal leitete der Prophet ﷺ das Gebet und verlängerte seine Niederwerfung (Sujud) weit länger als üblich. Als er fertig war, fragten die Gefährten warum. Er lächelte und sagte: „Mein Enkel kletterte auf meinen Rücken, und ich wollte ihn nicht hetzen, bevor er fertig war."

Hasan und Husayn — seine Enkel — waren die Freude seines Lebens. Er trug sie auf seinen Schultern, spielte mit ihnen und veranstaltete Wettrennen. Er sagte: „Sie sind meine duftenden Blumen in dieser Welt."

Wenn der Prophet ﷺ von einer Reise zurückkehrte, liefen die Kinder Medinas heraus, um ihn zu begrüßen. Er hielt sein Kamel an, hob die kleinen Kinder hoch und trug sie vor sich her, als er die Stadt betrat.

Als der jüngere Bruder von Anas ibn Malik starb, kam der Prophet ﷺ, um der Familie einen Kondolenzbesuch zu machen, und setzte sich neben das trauernde Kind. Er rief den Jungen bei einem Spitznamen: „O Abu Umayr, was ist mit dem kleinen Vogel passiert?" — er versuchte, das Kind in seiner Trauer zum Lächeln zu bringen.

Einmal prahlte ein Mann: „Ich habe zehn Kinder und habe noch nie eines von ihnen geküsst." Der Prophet ﷺ antwortete: „Wer keine Barmherzigkeit zeigt, dem wird keine Barmherzigkeit gezeigt werden."

Er ﷺ sagte: „Ich beginne das Gebet mit der Absicht, es zu verlängern, aber dann höre ich ein Kind weinen, und ich kürze es, um der Mutter keine Schwierigkeiten zu bereiten."`,
    },
    moral: {
      en: "Gentleness and mercy are signs of strength, not weakness. The greatest man to have ever lived spent time playing with children — let this be our standard.",
      ar: "الرفق والرحمة دليل قوة لا ضعف. أعظم إنسان عرفته البشرية كان يقضي وقته يلاعب الأطفال — فليكن هذا معيارنا.",
      fr: "La douceur et la miséricorde sont des signes de force, non de faiblesse. Le plus grand homme qui ait jamais vécu passait du temps à jouer avec des enfants — que cela soit notre norme.",
      de: "Sanftheit und Barmherzigkeit sind Zeichen von Stärke, nicht von Schwäche. Der größte Mensch, der je gelebt hat, verbrachte Zeit damit, mit Kindern zu spielen — lass dies unser Maßstab sein.",
    },
    readingTime: 4,
  },
  {
    id: "s12",
    category: "companions",
    title: {
      en: "Asma bint Abi Bakr — The Woman with Two Belts",
      ar: "أسماء بنت أبي بكر — ذات النطاقين",
      fr: "Asma bint Abi Bakr — La Femme aux Deux Ceintures",
      de: "Asma bint Abi Bakr — Die Frau mit den zwei Gürteln",
    },
    arabicOpening: "إِنَّ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ — البقرة: ٢٧٧",
    content: {
      en: `Asma bint Abi Bakr (RA) earned the unforgettable title "Dhaat an-Nitaqayn" — the Woman of Two Belts — for her heroic role in the Hijra.

When the Prophet ﷺ and her father Abu Bakr were hiding in the Cave of Thawr, it was Asma — then pregnant with her first child — who made the dangerous journey alone across the hills of Mecca to bring them food and water each night.

She had prepared provisions but had nothing to tie the food sack. Without hesitation, she tore her own belt in two — using one half to tie the bag and keeping the other. The Prophet ﷺ honored her with a special du'a: "Allah will give you two belts in Paradise instead."

Her courage did not end there. The Quraysh leader Abu Jahl himself came to her father's house demanding to know where the Prophet and Abu Bakr had gone. He was known to be violent and terrifying. But Asma, alone and pregnant, looked him in the eye and said: "I do not know." Abu Jahl struck her face so hard that her earring fell. She did not flinch.

Asma lived to nearly 100 years old, remaining active in the community until the end. When her son Abdullah ibn az-Zubayr was martyred, the aged Asma heard the news. She was nearly blind, but she stood up, prayed two units of prayer, and said: "The Prophet ﷺ told us there would come a day of hardship. Today is that day." Then she waited with dignity.`,
      ar: `أسماء بنت أبي بكر رضي الله عنها نالت لقبها الخالد "ذات النطاقين" بفضل دورها البطولي في الهجرة النبوية.

حين كان النبي ﷺ وأبوها أبو بكر مختبئَين في غار ثور، كانت أسماء - وهي حامل بأول أولادها - هي من يشق الطريق وحدها كل ليلة عبر تلال مكة ليحمل لهما الطعام والماء.

أعدّت الزاد لكن لم يكن معها ما تربط به كيس الطعام. فشقّت حزامها دون تردد نصفين - استخدمت نصفاً لربط الكيس وأمسكت بالآخر. فدعا لها النبي ﷺ قائلاً: "أبدلك الله بهما نطاقَين في الجنة."

ولم يقتصر شجاعتها على ذلك؛ إذ جاء أبو جهل - زعيم قريش - إلى بيت أبيها مطالباً بمعرفة مكان النبي وأبي بكر. وكان مشهوراً بعنفه وبطشه. لكن أسماء، وحيدةً حاملاً، نظرت إليه مباشرةً وقالت: "لا أعلم." فصفعها على وجهها حتى سقط قرطها، فلم ترمش ولم تتزعزع.

عاشت أسماء حتى ناهزت المئة عاماً ظلّت طوالها نشطة في مجتمعها. ولما استُشهد ابنها عبدالله بن الزبير، سمعت أسماء الشيخة الخبر. وكانت تكاد تفقد بصرها، لكنها نهضت وصلّت ركعتين وقالت: "أخبرنا النبي ﷺ أنه سيجيء يوم شدة. هذا هو ذلك اليوم." ثم تربّعت صابرةً كريمة.`,
      fr: `Asma bint Abi Bakr (RA) mérita le titre inoubliable de "Dhaat an-Nitaqayn" — la Femme aux Deux Ceintures — pour son rôle héroïque dans l'Hégire.

Quand le Prophète ﷺ et son père Abu Bakr se cachaient dans la grotte de Thawr, c'est Asma — alors enceinte de son premier enfant — qui faisait le dangereux voyage seule à travers les collines de La Mecque pour leur apporter nourriture et eau chaque nuit.

Elle avait préparé des provisions mais n'avait rien pour attacher le sac à nourriture. Sans hésitation, elle déchira sa propre ceinture en deux — utilisant une moitié pour attacher le sac et gardant l'autre. Le Prophète ﷺ l'honora d'un du'a spécial: "Allah te donnera deux ceintures en Paradis à la place."

Son courage ne s'arrêta pas là. Abu Jahl en personne vint à la maison de son père exigeant de savoir où étaient partis le Prophète et Abu Bakr. Il était connu pour être violent et terrifiant. Mais Asma, seule et enceinte, le regarda dans les yeux et dit: "Je ne sais pas." Abu Jahl la frappa au visage si fort que sa boucle d'oreille tomba. Elle ne broncha pas.

Asma vécut jusqu'à près de 100 ans, restant active dans la communauté jusqu'à la fin. Quand son fils Abdullah ibn az-Zubayr fut martyrisé, la vieille Asma entendit la nouvelle. Elle était presque aveugle, mais elle se leva, pria deux unités de prière, et dit: "Le Prophète ﷺ nous avait dit qu'un jour de dureté viendrait. Aujourd'hui est ce jour." Puis elle attendit avec dignité.`,
      de: `Asma bint Abi Bakr (ra) verdiente den unvergesslichen Titel „Dhaat an-Nitaqayn" — die Frau mit den zwei Gürteln — für ihre heldenhafte Rolle bei der Hidschra.

Als der Prophet ﷺ und ihr Vater Abu Bakr in der Höhle von Thawr versteckt waren, war es Asma — damals mit ihrem ersten Kind schwanger — die jede Nacht allein den gefährlichen Weg über die Hügel von Mekka machte, um ihnen Essen und Wasser zu bringen.

Sie hatte Vorräte vorbereitet, hatte aber nichts, um den Nahrungssack zuzubinden. Ohne zu zögern zerriss sie ihren eigenen Gürtel in zwei Hälften — benutzte eine Hälfte, um den Sack zuzubinden, und behielt die andere. Der Prophet ﷺ ehrte sie mit einem besonderen Du'a: „Allah wird dir stattdessen zwei Gürtel im Paradies geben."

Ihr Mut hörte nicht dort auf. Abu Jahl selbst kam zum Haus ihres Vaters und verlangte zu wissen, wohin der Prophet und Abu Bakr gegangen waren. Er war dafür bekannt, gewalttätig und erschreckend zu sein. Aber Asma, allein und schwanger, schaute ihm direkt in die Augen und sagte: „Ich weiß es nicht." Abu Jahl schlug sie so hart ins Gesicht, dass ihr Ohrring herabfiel. Sie zuckte nicht zurück.

Asma lebte bis fast 100 Jahre und blieb bis zum Ende in der Gemeinschaft aktiv. Als ihr Sohn Abdullah ibn az-Zubayr martyrisiert wurde, hörte die betagte Asma die Nachricht. Sie war fast blind, aber sie stand auf, betete zwei Gebetseinheiten und sagte: „Der Prophet ﷺ hatte uns gesagt, dass ein Tag der Schwierigkeit kommen würde. Heute ist dieser Tag." Dann wartete sie mit Würde.`,
    },
    moral: {
      en: "Courage is not the absence of fear — it is acting rightly despite fear. Faith gives people the strength to face whatever comes, at any age.",
      ar: "الشجاعة ليست غياب الخوف — بل هي التصرف الصحيح رغم الخوف. الإيمان يُعطي الناس قوة مواجهة كل ما يأتي، في أي سن.",
      fr: "Le courage n'est pas l'absence de peur — c'est agir correctement malgré la peur. La foi donne aux gens la force d'affronter ce qui vient, à tout âge.",
      de: "Mut ist nicht die Abwesenheit von Angst — es ist das richtige Handeln trotz Angst. Glaube gibt den Menschen die Kraft, allem zu begegnen, was kommt, in jedem Alter.",
    },
    readingTime: 5,
    bg: "linear-gradient(135deg, #1e3a5f 0%, #2d5f8a 100%)",
    emoji: "🦅",
  },

  // ── Additional stories ──────────────────────────────────────────────────
  {
    id: "s16",
    category: "prophets",
    bg: "linear-gradient(135deg, #1a3a2a 0%, #2d6a4f 100%)",
    emoji: "🌊",
    title: { en: "Prophet Musa and the Parting of the Sea", ar: "موسى عليه السلام وشق البحر", fr: "Le Prophète Musa et la Traversée de la Mer", de: "Prophet Musa und die Teilung des Meeres" },
    arabicOpening: "فَأَوْحَيْنَا إِلَىٰ مُوسَىٰ أَنِ اضْرِب بِّعَصَاكَ الْبَحْرَ — الشعراء: ٦٣",
    content: {
      en: `When Musa (AS) led the Children of Israel out of Egypt, Pharaoh's army pursued them to the edge of the Red Sea. The people panicked: "We will be overtaken!" But Musa replied with certainty: "No! Indeed, with me is my Lord; He will guide me." Allah commanded: "Strike the sea with your staff!" And the sea parted, forming twelve dry paths — one for each tribe — with water towering on either side like mountains. The Israelites crossed safely. When Pharaoh followed with his army, the sea closed over them. A civilization that had enslaved millions was destroyed in moments. Musa continued to lead his people through the desert, receiving the Torah on Mount Sinai, where he spoke directly with Allah — earning the title "Kalimullah" (the one whom Allah spoke to).`,
      ar: `لما أخرج موسى عليه السلام بني إسرائيل من مصر، تبعهم جيش فرعون حتى بلغوا شاطئ البحر. فزع القوم: "إنا لمدركون!" فقال موسى بيقين: "كلا، إن معي ربي سيهدين". فأوحى الله إليه: "اضرب بعصاك البحر!" فانفلق البحر اثني عشر طريقاً يابساً، وقف الماء على جانبيه كالجبال. عبر بنو إسرائيل سالمين، فلما تبعهم فرعون وجنوده انطبق البحر عليهم. وواصل موسى قيادة قومه في الصحراء، واستلم التوراة على جبل سيناء، وتشرف بالكلام المباشر مع الله فسُمي "كليم الله".`,
      fr: `Quand Musa (AS) mena les Enfants d'Israël hors d'Égypte, l'armée de Pharaon les poursuivit jusqu'à la mer Rouge. Les gens paniquèrent. Mais Musa répondit: "Non! Mon Seigneur est avec moi." Allah ordonna: "Frappe la mer de ton bâton!" Et la mer se fendit, formant douze chemins secs. Ils traversèrent en sécurité. Quand Pharaon suivit, la mer se referma sur lui. Musa continua de guider son peuple et reçut la Torah sur le mont Sinaï, parlant directement à Allah — d'où le titre "Kalimullah".`,
      de: `Als Musa (AS) die Kinder Israels aus Ägypten führte, verfolgte Pharaos Armee sie bis zum Roten Meer. Das Volk geriet in Panik. Aber Musa antwortete: "Nein! Mein Herr ist mit mir." Allah befahl: "Schlage das Meer mit deinem Stab!" Und das Meer teilte sich in zwölf trockene Pfade. Sie überquerten sicher. Als Pharao folgte, schloss sich das Meer über ihm. Musa führte sein Volk weiter und empfing die Thora auf dem Sinai, wo er direkt mit Allah sprach — daher der Titel "Kalimullah".`,
    },
    moral: {
      en: "True trust in Allah brings miracles. When all doors seem closed, Allah opens the sea itself.",
      ar: "الثقة الحقيقية بالله تجلب المعجزات. حين تُغلق الأبواب، يفتح الله البحر.",
      fr: "La vraie confiance en Allah apporte des miracles. Quand toutes les portes semblent fermées, Allah ouvre la mer elle-même.",
      de: "Wahres Vertrauen auf Allah bringt Wunder. Wenn alle Türen geschlossen scheinen, öffnet Allah das Meer selbst.",
    },
    readingTime: 4,
  },
  {
    id: "s17",
    category: "prophets",
    bg: "linear-gradient(135deg, #2d1a47 0%, #6b3fa0 100%)",
    emoji: "🔥",
    title: { en: "Prophet Ibrahim and the Fire", ar: "إبراهيم عليه السلام والنار", fr: "Le Prophète Ibrahim et le Feu", de: "Prophet Ibrahim und das Feuer" },
    arabicOpening: "قُلْنَا يَا نَارُ كُونِي بَرْدًا وَسَلَامًا عَلَىٰ إِبْرَاهِيمَ — الأنبياء: ٦٩",
    content: {
      en: `Ibrahim (AS) was the father of monotheism. Born in ancient Mesopotamia, he questioned why his people worshipped idols made of wood and stone. One night, when the people left for a festival, Ibrahim entered their temple and smashed all the idols except the largest. He placed his axe in the large idol's hands. When the people returned in fury and asked who did it, he pointed to the large idol and said: "Ask him — if he can speak." The people realized the absurdity of their idols but still refused the truth. King Nimrod ordered Ibrahim to be thrown into a massive fire. As he was launched from a catapult into the blazing flames, Angel Jibril offered help. Ibrahim replied: "Allah's knowledge of my situation is sufficient." Allah commanded: "O fire! Be coolness and safety upon Ibrahim!" The fire obeyed. Ibrahim walked out unharmed, and many who witnessed this miracle embraced belief.`,
      ar: `كان إبراهيم عليه السلام أبا التوحيد. وُلد في بابل وتساءل لماذا يعبد قومه الأصنام. في ليلة خرج القوم لعيد، دخل إبراهيم الهيكل وحطّم كل الأصنام إلا الكبير منها، ووضع الفأس في يده. فلما رجع القوم غاضبين وسألوا، أشار إبراهيم إلى الصنم الكبير قائلاً: "فاسألوه إن كان ينطق". أدرك القوم سخافة أصنامهم لكن أبوا الحق. فأمر الملك نمرود بإلقاء إبراهيم في نار عظيمة. حين أُطلق من المنجنيق نحو اللهيب، عرض عليه جبريل المساعدة، فقال: "حسبي الله ونعم الوكيل". فأمر الله: "يا نار كوني برداً وسلاماً على إبراهيم!" فأطاعت النار وخرج إبراهيم سالماً.`,
      fr: `Ibrahim (AS) était le père du monothéisme. Né en Mésopotamie, il brisa les idoles de son peuple. Quand ils revinrent furieux, il montra la grande idole: "Demandez-lui s'il peut parler." Le roi Nimrod ordonna de le jeter dans un feu immense. L'ange Jibril offrit son aide; Ibrahim répondit: "La connaissance d'Allah de ma situation me suffit." Allah ordonna: "Ô feu! Sois fraîcheur et sécurité pour Ibrahim!" Le feu obéit. Ibrahim sortit indemne.`,
      de: `Ibrahim (AS) war der Vater des Monotheismus. Er zertrümmerte die Götzen seines Volkes. Als König Nimrod ihn ins Feuer werfen ließ, bot Engel Jibril Hilfe an; Ibrahim antwortete: "Allahs Wissen über meine Lage genügt mir." Allah befahl: "O Feuer! Sei Kühle und Sicherheit für Ibrahim!" Das Feuer gehorchte. Ibrahim kam unverletzt heraus.`,
    },
    moral: {
      en: "Complete reliance on Allah in the most desperate moments is the mark of the true believer. Allah controls even the laws of nature.",
      ar: "التوكل التام على الله في أشد اللحظات يأساً هو علامة المؤمن الحق. والله يتحكم حتى في قوانين الطبيعة.",
      fr: "S'en remettre totalement à Allah dans les moments les plus désespérés est la marque du vrai croyant. Allah contrôle même les lois de la nature.",
      de: "Völliges Vertrauen auf Allah in den verzweifeltsten Momenten ist das Zeichen des wahren Gläubigen. Allah kontrolliert sogar die Naturgesetze.",
    },
    readingTime: 4,
  },
  {
    id: "s18",
    category: "prophets",
    bg: "linear-gradient(135deg, #0d3040 0%, #1a6080 100%)",
    emoji: "🐋",
    title: { en: "Prophet Yunus and the Whale", ar: "يونس عليه السلام والحوت", fr: "Le Prophète Yunus et la Baleine", de: "Prophet Yunus und der Wal" },
    arabicOpening: "فَنَادَىٰ فِي الظُّلُمَاتِ أَن لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ — الأنبياء: ٨٧",
    content: {
      en: `Yunus (AS) was sent to the people of Nineveh. When they repeatedly rejected his message, he left in frustration without Allah's explicit permission. He boarded a ship, and a great storm arose. The sailors cast lots to determine who was the cause — and the lot fell on Yunus. He acknowledged his error and jumped or was thrown into the sea. A massive whale swallowed him. In the darkness of the whale's belly, in the darkness of the ocean, in the darkness of the night, Yunus made his famous supplication: "La ilaha illa anta, subhanaka, inni kuntu mina-dhalimin" — There is no god but You, Glory be to You; indeed I was of the wrongdoers. Allah accepted his repentance. The whale was commanded to cast him onto the shore. He emerged weakened but alive, and Allah caused a tree to grow over him for shade and nourishment. He returned to Nineveh, and this time an entire city of 100,000+ people accepted the message — a miracle of repentance and return.`,
      ar: `أُرسل يونس عليه السلام إلى أهل نينوى. فلما رفضوا دعوته خرج بغير إذن الله. ركب سفينة فاشتدت الريح واقترع الملاحون فوقعت القرعة على يونس. اعترف بخطئه وألقى بنفسه في البحر فابتلعه حوت عظيم. في الظلمات الثلاث نادى: "لَا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ." قَبِل الله توبته وأمر الحوت بإلقائه على الساحل. فأُلقي وهو ضعيف ثم أنبت الله عليه شجرة تُظله وتُغذيه. ثم عاد إلى نينوى فآمن كلهم وكانوا أكثر من مئة ألف.`,
      fr: `Yunus (AS) fut envoyé aux gens de Ninive. Quand ils rejetèrent son message, il les quitta sans permission d'Allah. Un grand poisson l'avala. Dans les ténèbres, il supplia: "Il n'y a de dieu que Toi, gloire à Toi; j'ai été parmi les injustes." Allah accepta son repentir. Le poisson le rejeta sur le rivage. Il retourna à Ninive et plus de 100 000 personnes crurent.`,
      de: `Yunus (AS) wurde zu den Einwohnern von Ninive gesandt. Als sie seine Botschaft ablehnten, verließ er sie ohne Allahs Erlaubnis. Ein großer Wal schluckte ihn. In der Dunkelheit betete er: "Es gibt keinen Gott außer Dir; Herrlichkeit Dir; ich war einer der Ungerechten." Allah erhörte ihn. Der Wal spie ihn ans Ufer. Er kehrte nach Ninive zurück und über 100.000 Menschen glaubten.`,
    },
    moral: {
      en: "Sincere repentance reaches Allah even from the belly of a whale. Never despair of His mercy.",
      ar: "التوبة الصادقة تصل إلى الله حتى من بطن الحوت. لا تيأس من رحمته.",
      fr: "La repentance sincère atteint Allah même depuis le ventre d'un baleine. Ne désespère jamais de Sa miséricorde.",
      de: "Aufrichtige Reue erreicht Allah selbst aus dem Bauch eines Wals. Verzweifelt niemals an Seiner Barmherzigkeit.",
    },
    readingTime: 3,
  },
  {
    id: "s19",
    category: "prophets",
    bg: "linear-gradient(135deg, #2a1a0a 0%, #8b5e3c 100%)",
    emoji: "👑",
    title: { en: "Prophet Yusuf: From the Well to the Throne", ar: "يوسف عليه السلام: من البئر إلى العرش", fr: "Le Prophète Yusuf: du Puits au Trône", de: "Prophet Yusuf: Vom Brunnen zum Thron" },
    arabicOpening: "إِنَّهُ مَن يَتَّقِ وَيَصْبِرْ فَإِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ — يوسف: ٩٠",
    content: {
      en: `Yusuf (AS) was the beloved son of Ya'qub (AS). His brothers, consumed by jealousy, threw him into a well and told their father he was killed by a wolf. He was pulled out by travelers, sold into slavery in Egypt, and bought by the Chief Minister Aziz. Despite being a slave in a foreign land, Yusuf remained faithful and trustworthy. He was then unjustly imprisoned after refusing the advances of the minister's wife. In prison, he interpreted dreams so accurately that his reputation reached Pharaoh. When Pharaoh had a dream no one could explain, Yusuf was summoned. He interpreted it as seven years of abundance followed by seven years of famine, and proposed a plan to manage the food supply. Pharaoh appointed him finance minister of Egypt. Years later, his brothers came to Egypt seeking food during the famine — and the one they had thrown in a well was now the man who held their fate in his hands. Instead of revenge, Yusuf showed forgiveness: "No blame will there be upon you today. Allah will forgive you."`,
      ar: `يوسف عليه السلام هو الابن المحبوب ليعقوب عليه السلام. حسده إخوته فألقوه في بئر وأخبروا أباهم أن ذئباً أكله. أخرجه مسافرون وبيع عبداً في مصر، ثم سُجن ظلماً لرفضه الإغراء. في السجن عبّر الأحلام بدقة عجيبة حتى وصل خبره لفرعون. فسّر يوسف حلم الملك بسبع سنوات خصب وسبع جدب، واقترح خطة التخزين. فعيّنه فرعون وزيراً للمالية. بعد سنوات جاء إخوته يسألون الطعام في المجاعة، فإذا الذي رموه في البئر يملك مصيرهم. فعفا عنهم قائلاً: "لَا تَثْرِيبَ عَلَيْكُمُ الْيَوْمَ."`,
      fr: `Yusuf (AS) était le fils bien-aimé de Ya'qub. Ses frères jaloux le jetèrent dans un puits, le vendirent comme esclave et il fut injustement emprisonné. En prison, il interpréta les rêves avec précision. Pharaon le convoqua et il interpréta son rêve: sept années d'abondance suivies de sept années de famine. Pharaon en fit son ministre des finances. Quand ses frères vinrent quémander de la nourriture, il les pardonna: "Pas de reproche sur vous aujourd'hui."`,
      de: `Yusuf (AS) war der geliebte Sohn von Ya'qub. Seine eifersüchtigen Brüder warfen ihn in einen Brunnen, er wurde als Sklave verkauft und ungerecht eingekerkert. Im Gefängnis deutete er Träume präzise. Pharao berief ihn und er deutete: sieben Jahre Überfluss, dann sieben Jahre Hungersnot. Pharao machte ihn zum Finanzminister. Als seine Brüder um Nahrung baten, vergab er ihnen: "Heute gibt es keinen Vorwurf gegen euch."`,
    },
    moral: {
      en: "Every difficulty in the believer's life is a step toward a greater destiny. Patience and integrity are never wasted.",
      ar: "كل صعوبة في حياة المؤمن هي خطوة نحو مصير أعظم. الصبر والأمانة لا يضيعان أبداً.",
      fr: "Chaque difficulté dans la vie du croyant est un pas vers une destinée plus grande. La patience et l'intégrité ne sont jamais perdues.",
      de: "Jede Schwierigkeit im Leben des Gläubigen ist ein Schritt zu einem größeren Schicksal. Geduld und Integrität gehen niemals verloren.",
    },
    readingTime: 5,
  },
  {
    id: "s20",
    category: "prophets",
    bg: "linear-gradient(135deg, #0a2a1a 0%, #1a6a3a 100%)",
    emoji: "📜",
    title: { en: "Prophet Isa and the Miracles", ar: "عيسى عليه السلام والمعجزات", fr: "Le Prophète Isa et les Miracles", de: "Prophet Isa und die Wunder" },
    arabicOpening: "وَرَسُولًا إِلَىٰ بَنِي إِسْرَائِيلَ أَنِّي قَدْ جِئْتُكُم بِآيَةٍ مِّن رَّبِّكُمْ — آل عمران: ٤٩",
    content: {
      en: `Isa (AS) — Jesus — was born miraculously to Maryam (AS) without a father. As an infant in the cradle, he spoke to defend his mother's honor when people questioned her. As a prophet, he performed extraordinary miracles by Allah's permission: he breathed life into clay birds, healed the blind and lepers, and raised the dead. He confirmed the Torah while bringing a new message — the Injil. He called people to the worship of Allah alone: "Indeed, Allah is my Lord and your Lord, so worship Him." When the authorities plotted to crucify him, Allah saved him and raised him to the heavens. The Quran clarifies that he was not crucified but his likeness was made to appear to those who plotted against him. He will return before the Day of Judgment to restore justice on earth.`,
      ar: `عيسى عليه السلام وُلد من مريم العذراء دون أب. تكلم في المهد دفاعاً عن أمه. أُعطي معجزات عظيمة بإذن الله: نفخ في طير من طين فصار طيراً، وأبرأ الأكمه والأبرص، وأحيا الموتى. جاء مصدقاً للتوراة وحاملاً الإنجيل، داعياً لعبادة الله وحده. لما تآمر أعداؤه على قتله، رفعه الله إلى السماء ولم يُصلب. وسيعود قبيل الساعة ليملأ الأرض عدلاً.`,
      fr: `Isa (AS) — Jésus — naquit miraculeusement de Maryam sans père. Bébé dans le berceau, il parla pour défendre sa mère. Il accomplit des miracles extraordinaires: insuffler vie à des oiseaux d'argile, guérir les aveugles et les lépreux, ressusciter les morts. Quand ses ennemis complotèrent contre lui, Allah l'éleva aux cieux. Il reviendra avant le Jour du Jugement.`,
      de: `Isa (AS) — Jesus — wurde auf wundersame Weise von Maryam ohne Vater geboren. Als Säugling in der Wiege sprach er zur Verteidigung seiner Mutter. Er vollbrachte außerordentliche Wunder: Lehmvögel zum Leben erwecken, Blinde und Aussätzige heilen, Tote auferwecken. Als seine Feinde planten ihn zu kreuzigen, erhob Allah ihn in die Himmel. Er wird vor dem Jüngsten Tag zurückkehren.`,
    },
    moral: {
      en: "Prophets came with clear signs and a consistent message: worship Allah alone. Every miracle points to the Giver of miracles.",
      ar: "جاء الأنبياء بآيات واضحة ورسالة واحدة: عبادة الله وحده. كل معجزة تشير إلى واهب المعجزات.",
      fr: "Les prophètes sont venus avec des signes clairs et un message cohérent: adorer Allah seul. Chaque miracle pointe vers le Donneur de miracles.",
      de: "Propheten kamen mit klaren Zeichen und einer einheitlichen Botschaft: Allah allein anzubeten. Jedes Wunder zeigt auf den Geber der Wunder.",
    },
    readingTime: 4,
  },
  {
    id: "s21",
    category: "companions",
    bg: "linear-gradient(135deg, #1a2a3a 0%, #2a4a6a 100%)",
    emoji: "⚔️",
    title: { en: "Khalid ibn al-Walid: The Sword of Allah", ar: "خالد بن الوليد: سيف الله", fr: "Khalid ibn al-Walid: L'Épée d'Allah", de: "Khalid ibn al-Walid: Das Schwert Allahs" },
    arabicOpening: "وَأَعِدُّوا لَهُم مَّا اسْتَطَعْتُم مِّن قُوَّةٍ — الأنفال: ٦٠",
    content: {
      en: `Khalid ibn al-Walid was one of the most brilliant military commanders in history. Before Islam, he led the Quraysh cavalry that dealt a severe blow to the Muslims at the Battle of Uhud. But when he witnessed the signs of the truth, he left Mecca and embraced Islam. The Prophet ﷺ called him "Saifullah" — the Sword of Allah. After accepting Islam, Khalid led armies to victories that spread from Arabia across Persia and the Levant. He never lost a battle in his entire military career — fighting over 100 battles in Arabia alone. He once said: "I have fought in so many battles seeking martyrdom that there is not a span of my body left without a wound — yet I die here in my bed like an old camel. May the eyes of cowards never close in sleep!" He died in bed, having served Islam tirelessly, and wept that he couldn't die a martyr on the battlefield.`,
      ar: `خالد بن الوليد أحد أعظم القادة العسكريين في التاريخ. قبل إسلامه قاد فرسان قريش في أُحد. لما رأى آيات الحق ترك مكة وأسلم. فسمّاه النبي ﷺ "سيف الله المسلول". بعد إسلامه قاد الجيوش في فتوحات امتدت من الجزيرة العربية إلى فارس والشام، ولم يُهزم في معركة قط. وقال يوم مات: "لقد شهدت مئة زحف أو زهاءها، وما في جسدي موضع شبر إلا وفيه ضربة أو طعنة، وها أنذا أموت على فراشي كما يموت البعير، فلا نامت أعين الجبناء!"`,
      fr: `Khalid ibn al-Walid était l'un des plus brillants commandants militaires de l'histoire. Avant l'Islam, il combattit les musulmans. Quand il reconnut la vérité, il embrassa l'Islam. Le Prophète ﷺ l'appela "Saifullah" — l'Épée d'Allah. Il ne perdit jamais une bataille et pleura à sa mort de ne pas mourir en martyr: "Que les yeux des lâches ne se ferment jamais!"`,
      de: `Khalid ibn al-Walid war einer der brillantesten Militärbefehlshaber der Geschichte. Vor dem Islam kämpfte er gegen die Muslime. Als er die Wahrheit erkannte, nahm er den Islam an. Der Prophet ﷺ nannte ihn "Saifullah" — Allahs Schwert. Er verlor nie eine Schlacht und weinte auf seinem Totenbett, dass er nicht als Märtyrer starb: "Mögen die Augen der Feiglinge nie in Schlaf fallen!"`,
    },
    moral: {
      en: "A person's past does not define their future. The greatest enemies of truth can become its greatest champions through sincere faith.",
      ar: "ماضي الإنسان لا يُحدد مستقبله. أعظم أعداء الحق قد يصبحون أعظم أبطاله بالإيمان الصادق.",
      fr: "Le passé d'une personne ne définit pas son avenir. Les plus grands ennemis de la vérité peuvent en devenir les plus grands champions par une foi sincère.",
      de: "Die Vergangenheit einer Person bestimmt nicht ihre Zukunft. Die größten Feinde der Wahrheit können durch aufrichtigen Glauben ihre größten Verfechter werden.",
    },
    readingTime: 4,
  },
  {
    id: "s22",
    category: "companions",
    bg: "linear-gradient(135deg, #1a0a2a 0%, #5a2a8a 100%)",
    emoji: "📖",
    title: { en: "Muadh ibn Jabal: The Scholar of Halal and Haram", ar: "معاذ بن جبل: أعلم الأمة بالحلال والحرام", fr: "Muadh ibn Jabal: Le Savant du Licite et de l'Illicite", de: "Muadh ibn Jabal: Der Gelehrte von Halal und Haram" },
    arabicOpening: "وَفَوْقَ كُلِّ ذِي عِلْمٍ عَلِيمٌ — يوسف: ٧٦",
    content: {
      en: `Muadh ibn Jabal accepted Islam as a young man and became one of the greatest scholars among the Companions. The Prophet ﷺ said: "The most knowledgeable of my community regarding halal and haram is Muadh ibn Jabal." When the Prophet sent him to Yemen as governor and teacher, he asked: "How will you judge?" Muadh replied: "By the Book of Allah." "And if not found there?" "By the Sunnah of the Messenger." "And if not found there?" "I will exercise my own reasoning (ijtihad), not falling short in effort." The Prophet ﷺ praised this answer and said it reflected sound scholarship. Muadh was beloved by the Prophet, who said: "O Muadh! By Allah, I love you." He died young during the plague of Amwas, but left behind a legacy of scholarship that shaped Islamic jurisprudence for generations.`,
      ar: `أسلم معاذ بن جبل شاباً وصار أحد أعظم علماء الصحابة. قال عنه النبي ﷺ: "أعلم أمتي بالحلال والحرام معاذ بن جبل." حين بعثه إلى اليمن والياً ومعلماً، سأله: "بم تقضي؟" فقال: "بكتاب الله." "فإن لم تجد؟" "فبسنة رسول الله." "فإن لم تجد؟" "اجتهد رأيي ولا آلو." فضرب النبي ﷺ صدره وقال: "الحمد لله الذي وفّق رسول رسوله." وكان النبي يحبه فقال له: "والله إني لأحبك." مات شاباً في طاعون عمواس تاركاً إرثاً علمياً شكّل الفقه الإسلامي.`,
      fr: `Muadh ibn Jabal embrassa l'Islam jeune et devint l'un des plus grands savants. Le Prophète ﷺ dit: "Le plus savant de ma communauté sur le halal et haram est Muadh." Quand le Prophète l'envoya au Yémen, il demanda: "Comment jugeras-tu?" Sa réponse réfléchie sur le Livre, la Sunna et l'ijtihad fut louée. Le Prophète lui dit: "Je t'aime, par Allah." Il mourut jeune mais laissa un legs scientifique immense.`,
      de: `Muadh ibn Jabal nahm den Islam jung an und wurde einer der größten Gelehrten. Der Prophet ﷺ sagte: "Der Wissendste meiner Gemeinschaft über Halal und Haram ist Muadh." Als er ihn nach Jemen schickte, fragte er nach seiner Urteilsmethode. Die durchdachte Antwort — Quran, Sunna, dann Ijtihad — wurde gelobt. Der Prophet sagte: "Ich liebe dich, bei Allah." Er starb jung, hinterließ aber ein immenses gelehrtes Erbe.`,
    },
    moral: {
      en: "Knowledge is a trust. The scholar who uses evidence, wisdom, and honest effort honors that trust and benefits generations.",
      ar: "العلم أمانة. العالم الذي يستخدم الدليل والحكمة والجهد الصادق يُؤدي الأمانة وينفع الأجيال.",
      fr: "Le savoir est une confiance. Le savant qui utilise les preuves, la sagesse et un effort honnête honore cette confiance et bénéficie aux générations.",
      de: "Wissen ist ein Vertrauen. Der Gelehrte, der Beweise, Weisheit und ehrliches Bemühen nutzt, ehrt dieses Vertrauen und nützt Generationen.",
    },
    readingTime: 4,
  },
  {
    id: "s23",
    category: "history",
    bg: "linear-gradient(135deg, #2a1a0a 0%, #7a4a1a 100%)",
    emoji: "🕌",
    title: { en: "The Building of the First Mosque: Quba", ar: "بناء أول مسجد في الإسلام: مسجد قباء", fr: "La Construction de la Première Mosquée: Quba", de: "Der Bau der ersten Moschee: Quba" },
    arabicOpening: "لَمَسْجِدٌ أُسِّسَ عَلَى التَّقْوَىٰ مِنْ أَوَّلِ يَوْمٍ أَحَقُّ أَن تَقُومَ فِيهِ — التوبة: ١٠٨",
    content: {
      en: `When the Prophet ﷺ made his historic migration from Mecca to Madinah, he stopped in the village of Quba. He spent 14 days there and during that time, the first mosque in Islam was built: Masjid Quba. The Companions gathered stones with their own hands, and the Prophet ﷺ himself participated in carrying stones for the construction. The Quran describes it as "a mosque founded on piety from the first day." The Prophet later said: "Prayer in Masjid Quba equals the reward of Umrah." After arriving in Madinah, the Prophet then built Masjid al-Nabawi on the site where his camel knelt. He purchased the land from two orphan boys and again participated personally in the construction. The mosque served as the center of the emerging Muslim community — a place of prayer, learning, governance, and community affairs.`,
      ar: `حين هاجر النبي ﷺ من مكة إلى المدينة، نزل بقباء فأقام أربعة عشر يوماً، وبنى في أثنائها أول مسجد في الإسلام: مسجد قباء. جمع الصحابة الحجارة بأيديهم وشارك النبي بنفسه في حملها. ووصفه القرآن بـ"المسجد المؤسَّس على التقوى من أول يوم." وقال النبي: "الصلاة في مسجد قباء كعمرة." ثم بنى بالمدينة مسجده الشريف في الموضع الذي بركت فيه ناقته، اشترى أرضه من يتيمين وشارك بنفسه في بنائه. وصار المسجد مركز الأمة الناشئة.`,
      fr: `Lors de sa migration historique, le Prophète ﷺ s'arrêta à Quba et construisit la première mosquée de l'Islam — Masjid Quba. Les Compagnons portèrent les pierres et le Prophète participa personnellement. Le Coran la décrit comme "fondée sur la piété dès le premier jour." Le Prophète dit ensuite: "Une prière à Quba équivaut à une Umrah." À Médine, il bâtit Masjid al-Nabawi, centre de la nouvelle communauté.`,
      de: `Bei seiner historischen Auswanderung hielt der Prophet ﷺ in Quba an und baute die erste Moschee des Islam — Masjid Quba. Die Gefährten trugen die Steine, der Prophet half persönlich. Der Quran beschreibt sie als "von Anfang an auf Frömmigkeit gegründet." Der Prophet sagte: "Ein Gebet in Quba entspricht einer Umrah." In Medina baute er Masjid al-Nabawi, das Zentrum der neuen Gemeinschaft.`,
    },
    moral: {
      en: "The mosque is the heart of the Muslim community — built by communal effort and dedicated to the worship of Allah and the service of humanity.",
      ar: "المسجد هو قلب المجتمع الإسلامي — يُبنى بجهد جماعي ويُكرَّس لعبادة الله وخدمة الإنسانية.",
      fr: "La mosquée est le cœur de la communauté musulmane — construite par un effort communautaire et dédiée à l'adoration d'Allah et au service de l'humanité.",
      de: "Die Moschee ist das Herz der muslimischen Gemeinschaft — durch gemeinschaftliche Anstrengung gebaut und dem Dienst an Allah und der Menschheit gewidmet.",
    },
    readingTime: 3,
  },
  {
    id: "s24",
    category: "moral",
    bg: "linear-gradient(135deg, #1a2a1a 0%, #2a5a3a 100%)",
    emoji: "🌙",
    title: { en: "The Man Who Killed 99 and Was Forgiven", ar: "الرجل الذي قتل تسعة وتسعين نفساً وغُفر له", fr: "L'Homme qui Tua 99 Personnes et fut Pardonné", de: "Der Mann, der 99 Menschen tötete und vergeben bekam" },
    arabicOpening: "قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ — الزمر: ٥٣",
    content: {
      en: `Among the hadith narrated in Bukhari and Muslim is the story of a man from the Children of Israel who had killed 99 people. He sought repentance and went to the most learned monk of his time. He asked: "I have killed 99 people — is there any repentance for me?" The monk was frightened and said: "No." So the man killed him, making it 100. He then found a truly learned scholar and asked the same question. The scholar replied: "Who could come between you and repentance? Go to such-and-such land — there are righteous people there who worship Allah. Worship with them and do not return to your land, for it is a land of evil." The man set out. Midway on his journey, he died. The angels of mercy and the angels of punishment argued over his soul. Allah commanded: "Measure the distance between the two lands — whichever is closer, he belongs to them." The righteous land was measured closer. Allah had caused the earth to contract toward the righteous land. He was forgiven.`,
      ar: `في حديث الرجل الذي قتل مائة نفس: أسرف رجل على نفسه فقتل تسعة وتسعين نفساً، ثم أراد التوبة فسأل أعبد أهل زمانه فقال: "قتلت تسعة وتسعين نفساً، هل لي توبة؟" فقال: "لا." فقتله فكمّل به المائة. ثم سأل أعلم أهل زمانه فقال: "ومن يحول بينك وبين التوبة؟ اذهب إلى أرض كذا وكذا، فإن فيها أناساً يعبدون الله." فانطلق يريد تلك الأرض فمات في الطريق. فاختصمت فيه ملائكة الرحمة وملائكة العذاب. فأمر الله أن يُقاس ما بين الأرضين فوُجد إلى الأرض الصالحة أدنى فغُفر له.`,
      fr: `Dans un hadith authentique: un homme qui avait tué 99 personnes chercha la repentance. Un moine lui dit qu'il n'y en avait pas — l'homme le tua. Un savant lui dit: "Qui peut s'interposer entre toi et le repentir? Va dans telle contrée de gens pieux." L'homme mourut en route. Les anges de miséricorde et de châtiment se disputèrent son âme. Allah ordonna de mesurer la distance: il était plus proche de la contrée pieuse — il fut pardonné.`,
      de: `In einem authentischen Hadith: Ein Mann tötete 99 Menschen und suchte Reue. Ein Mönch sagte, es gäbe keine — der Mann tötete ihn. Ein Gelehrter sagte: "Wer kann zwischen dir und Reue stehen? Geh ins Land der Frommen." Der Mann starb unterwegs. Die Engel der Barmherzigkeit und der Strafe stritten um seine Seele. Allah ließ messen: Er war dem frommen Land näher — er wurde vergeben.`,
    },
    moral: {
      en: "Allah's mercy has no limit. No matter how many sins a person has committed, sincere repentance and turning toward righteousness is always possible.",
      ar: "رحمة الله بلا حدود. مهما بلغت ذنوب الإنسان، فالتوبة الصادقة والتوجه نحو الصلاح ممكنان دائماً.",
      fr: "La miséricorde d'Allah n'a pas de limite. Peu importe le nombre de péchés commis, la repentance sincère et le retour vers la droiture sont toujours possibles.",
      de: "Allahs Barmherzigkeit kennt keine Grenzen. Egal wie viele Sünden ein Mensch begangen hat, aufrichtige Reue und Zuwendung zur Rechtschaffenheit sind immer möglich.",
    },
    readingTime: 3,
  },
  {
    id: "s25",
    category: "moral",
    bg: "linear-gradient(135deg, #2a0a1a 0%, #7a1a3a 100%)",
    emoji: "💧",
    title: { en: "The Dog and the Thirsty Man: A Lesson in Mercy", ar: "الكلب والرجل العطشان: درس في الرحمة", fr: "Le Chien et l'Homme Assoiffé: Une Leçon de Miséricorde", de: "Der Hund und der durstige Mann: Eine Lektion in Barmherzigkeit" },
    arabicOpening: "وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ — الأنبياء: ١٠٧",
    content: {
      en: `The Prophet ﷺ narrated a story of a man walking in the desert who was overcome with extreme thirst. He found a well and descended into it to drink. When he emerged, he saw a dog panting and eating the moist earth from thirst. The man said to himself: "This dog is suffering from thirst just as I was." So he descended back into the well, filled his shoe with water, held it in his mouth to carry it up, and gave the dog water to drink. Allah accepted this deed from him and forgave him all his sins. The Companions asked: "O Messenger of Allah, is there a reward for us in serving animals?" He replied: "Yes — in every living creature, there is a reward." And in a parallel narration, a woman who had imprisoned a cat — neither feeding it nor letting it free to find its own food — was punished for this cruelty.`,
      ar: `روى النبي ﷺ قصة رجل مشى في الطريق فاشتد عليه العطش، فنزل في بئر فشرب. ولما خرج وجد كلباً يلهث ويأكل الثرى من العطش، فقال: "لقد بلغ هذا الكلب من العطش مثل الذي كان بلغ مني." فنزل في البئر وملأ خفه ماءً وأمسكه بفمه حتى صعد، فسقى الكلب. فشكر الله له وغفر له. فقال الصحابة: "يا رسول الله، وإن لنا في البهائم أجراً؟" قال: "في كل ذات كبد رطبة أجر."`,
      fr: `Le Prophète ﷺ raconta l'histoire d'un homme qui, souffrant de soif dans le désert, trouva un puits et y descendit pour boire. En remontant, il vit un chien haletant de soif. Il redescendit, remplit sa chaussure d'eau, la porta dans sa bouche et abreuva le chien. Allah lui pardonna tous ses péchés. Les Compagnons demandèrent: "Y a-t-il une récompense à servir les animaux?" Il répondit: "Dans tout être vivant il y a une récompense."`,
      de: `Der Prophet ﷺ erzählte die Geschichte eines Mannes, der in der Wüste vor Durst fast starb, einen Brunnen fand und trank. Als er herauskam, sah er einen Hund vor Durst lechzen. Er stieg wieder in den Brunnen, füllte seinen Schuh mit Wasser, trug ihn im Mund herauf und tränkte den Hund. Allah vergab ihm alle Sünden. Die Gefährten fragten: "Gibt es Lohn für das Dienen an Tieren?" Er antwortete: "In jedem Lebewesen gibt es Lohn."`,
    },
    moral: {
      en: "Mercy to creation is a path to Allah's mercy. Kindness to animals, the vulnerable, and all living beings is an act of worship.",
      ar: "الرحمة بالخلق طريق إلى رحمة الله. اللطف بالحيوانات والضعفاء وسائر المخلوقات عبادة.",
      fr: "La miséricorde envers la création est un chemin vers la miséricorde d'Allah. La bienveillance envers les animaux et tous les êtres vivants est un acte d'adoration.",
      de: "Barmherzigkeit gegenüber der Schöpfung ist ein Weg zu Allahs Barmherzigkeit. Freundlichkeit gegenüber Tieren und allem Lebendigen ist ein Akt der Anbetung.",
    },
    readingTime: 3,
  },
  {
    id: "s26",
    category: "moral",
    bg: "linear-gradient(135deg, #1a1a2a 0%, #3a3a6a 100%)",
    emoji: "🌟",
    title: { en: "The Ant and the Fire of Sulaiman", ar: "النملة ونار سليمان", fr: "La Fourmi et le Feu de Sulaiman", de: "Die Ameise und das Feuer von Sulaiman" },
    arabicOpening: "حَتَّىٰ إِذَا أَتَوْا عَلَىٰ وَادِ النَّمْلِ قَالَتْ نَمْلَةٌ — النمل: ١٨",
    content: {
      en: `Allah gave Prophet Sulaiman (AS) the unique gift of understanding the speech of animals. The Quran narrates a remarkable moment: when his armies were marching, they approached the Valley of the Ants. One ant said: "O ants! Enter your dwellings, lest Sulaiman and his armies crush you while they perceive not!" Sulaiman smiled and was moved. He said: "My Lord, inspire me to be grateful for Your favor which You have bestowed upon me and upon my parents, and to do righteousness of which You approve. And admit me by Your mercy into the ranks of Your righteous servants." This small ant demonstrated the Islamic principle of warning others of harm, protecting community, and awareness of the powerful — even when the powerful mean no harm. Sulaiman's response — gratitude and a prayer for righteousness — models how a believer responds to blessings.`,
      ar: `أعطى الله سليمان عليه السلام القدرة على فهم كلام الحيوانات. يروي القرآن لحظة بديعة: حين سار جيشه مرّ على وادي النمل. فقالت نملة: "يَا أَيُّهَا النَّمْلُ ادْخُلُوا مَسَاكِنَكُمْ لَا يَحْطِمَنَّكُمْ سُلَيْمَانُ وَجُنُودُهُ وَهُمْ لَا يَشْعُرُونَ." فتبسّم سليمان وقال: "رَبِّ أَوْزِعْنِي أَن أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَن أَعْمَلَ صَالِحًا تَرْضَاهُ." وهكذا علّمتنا النملة الصغيرة معنى التعاون والتحذير، وعلّمنا سليمان معنى الشكر حين يُنعَم عليه.`,
      fr: `Allah donna à Sulaiman (AS) le don de comprendre le langage des animaux. Le Coran narre un moment remarquable: ses armées passèrent par la Vallée des Fourmis. Une fourmi dit: "Ô fourmis! Entrez dans vos demeures!" Sulaiman sourit et dit: "Mon Seigneur, inspire-moi à être reconnaissant pour Tes faveurs." La petite fourmi enseigne la coopération et l'avertissement; Sulaiman enseigne la gratitude face aux bénédictions.`,
      de: `Allah gab Sulaiman (AS) die Gabe, die Sprache der Tiere zu verstehen. Der Quran berichtet: Als seine Heere marschierten, kamen sie ins Tal der Ameisen. Eine Ameise warnte: "O Ameisen! Geht in eure Behausungen!" Sulaiman lächelte und bat: "Mein Herr, begeistere mich zur Dankbarkeit für Deine Gunst." Die kleine Ameise lehrte Gemeinschaft; Sulaiman lehrte Dankbarkeit.`,
    },
    moral: {
      en: "Even the smallest creature has a role and wisdom. True leadership responds to all creation with gratitude and care.",
      ar: "حتى أصغر المخلوقات لها دور وحكمة. القيادة الحقيقية تستجيب للخلق كله بالشكر والرعاية.",
      fr: "Même la plus petite créature a un rôle et une sagesse. Le vrai leadership répond à toute la création avec gratitude et bienveillance.",
      de: "Selbst das kleinste Lebewesen hat eine Rolle und Weisheit. Wahre Führung reagiert auf alle Schöpfung mit Dankbarkeit und Fürsorge.",
    },
    readingTime: 3,
  },
  {
    id: "s27",
    category: "history",
    bg: "linear-gradient(135deg, #2a1a0a 0%, #6a4a1a 100%)",
    emoji: "📚",
    title: { en: "The House of Wisdom: Islam's Age of Knowledge", ar: "بيت الحكمة: عصر الإسلام الذهبي", fr: "La Maison de la Sagesse: L'Âge d'Or de l'Islam", de: "Das Haus der Weisheit: Islams goldenes Zeitalter" },
    arabicOpening: "وَقُل رَّبِّ زِدْنِي عِلْمًا — طه: ١١٤",
    content: {
      en: `Between the 8th and 13th centuries, Baghdad was the intellectual capital of the world. The Abbasid Caliph Harun al-Rashid and later Ma'mun established Bayt al-Hikmah — the House of Wisdom — where scholars of all backgrounds translated and advanced knowledge in medicine, mathematics, astronomy, philosophy, and literature. Al-Khawarizmi founded algebra (the word "algorithm" comes from his name). Ibn Sina (Avicenna) wrote the Canon of Medicine, the medical textbook used in European universities for 600 years. Al-Biruni calculated the Earth's circumference with remarkable accuracy. Ibn al-Haytham established the science of optics. Jabir ibn Hayyan founded modern chemistry. Al-Idrisi created the most accurate world map of his time. These scholars were driven by the Quranic injunction: "Read in the name of your Lord." They saw knowledge as a form of worship — understanding Allah's creation as a path to understanding the Creator.`,
      ar: `بين القرنين الثامن والثالث عشر كانت بغداد عاصمة العقل في العالم. أسس الخليفة هارون الرشيد ثم المأمون بيت الحكمة، حيث ترجم علماء من كل الأصول المعرفة وطوّروها في الطب والرياضيات والفلك والفلسفة. الخوارزمي أسّس علم الجبر، وابن سينا ألّف القانون في الطب الذي درّسته جامعات أوروبا ستة قرون، والبيروني حسب محيط الأرض بدقة مذهلة، وابن الهيثم أسّس علم البصريات، وجابر بن حيان أسّس الكيمياء الحديثة، والإدريسي رسم أدق خريطة للعالم في زمانه. دافع هؤلاء العلماء هو: "اقْرَأْ بِاسْمِ رَبِّكَ."`,
      fr: `Entre les 8e et 13e siècles, Bagdad était la capitale intellectuelle du monde. Bayt al-Hikmah — la Maison de la Sagesse — fut fondée. Al-Khawarizmi fonda l'algèbre, Ibn Sina écrivit le Canon de la Médecine, Ibn al-Haytham établit l'optique, Al-Biruni calcula la circonférence terrestre. Ces savants étaient guidés par le Coran: "Lis au nom de ton Seigneur." La connaissance était une forme d'adoration.`,
      de: `Zwischen dem 8. und 13. Jahrhundert war Bagdad die intellektuelle Hauptstadt der Welt. Bayt al-Hikmah — das Haus der Weisheit — wurde gegründet. Al-Khawarizmi begründete die Algebra, Ibn Sina schrieb den Medizinkanon, Ibn al-Haytham begründete die Optik. Diese Gelehrten wurden vom Quran angetrieben: "Lies im Namen deines Herrn." Wissen war eine Form der Anbetung.`,
    },
    moral: {
      en: "Islam's command to seek knowledge has no limits. Every field of beneficial knowledge is an act of worship when pursued for the right intention.",
      ar: "أمر الإسلام بطلب العلم لا حدود له. كل ميدان من ميادين العلم النافع عبادة حين يُطلب بالنية الصحيحة.",
      fr: "Le commandement de l'Islam de chercher le savoir n'a pas de limites. Tout domaine de connaissance bénéfique est un acte d'adoration quand il est poursuivi avec la bonne intention.",
      de: "Islams Gebot, Wissen zu suchen, kennt keine Grenzen. Jedes Feld nützlichen Wissens ist ein Akt der Anbetung, wenn es mit der richtigen Absicht verfolgt wird.",
    },
    readingTime: 4,
  },
  {
    id: "s28",
    category: "prophet",
    bg: "linear-gradient(135deg, #1a2a0a 0%, #3a6a1a 100%)",
    emoji: "🤝",
    title: { en: "The Prophet's Treaty of Hudaybiyyah", ar: "صلح الحديبية", fr: "Le Traité de Hudaybiyyah du Prophète", de: "Der Vertrag von Hudaybiyyah des Propheten" },
    arabicOpening: "إِنَّا فَتَحْنَا لَكَ فَتْحًا مُّبِينًا — الفتح: ١",
    content: {
      en: `In the sixth year after Hijra, the Prophet ﷺ led 1,400 Companions toward Mecca intending to perform Umrah. The Quraysh blocked their path at Hudaybiyyah. A long negotiation followed. The treaty that was signed seemed humiliating to many Muslims: Muslims would return without performing Umrah that year, any Meccan Muslim who came to Madinah must be returned, and there would be a 10-year ceasefire. Umar ibn al-Khattab was troubled and questioned the Prophet: "Are we not upon the truth?" The Prophet replied: "Yes." "Then why should we accept this?" But the Prophet was certain. Within two years, the treaty proved to be the greatest strategic victory in Islamic history. During the ceasefire, thousands embraced Islam — including Khalid ibn al-Walid. The Prophet then entered Mecca in the greatest of all victories: Fath Makkah. Allah called the treaty in the Quran "a clear victory."`,
      ar: `في السنة السادسة بعد الهجرة، قاد النبي ﷺ ألفاً وأربعمائة صحابي نحو مكة لأداء العمرة. فأغلقت قريش الطريق عند الحديبية. جرت مفاوضات طويلة وأُبرم صلح بدا للمسلمين مجحفاً: يعودون دون عمرة، وتُردّ إليهم قريش كل من جاء من مسلميها إلى المدينة. فاضطرب عمر وقال: "يا رسول الله، أولسنا على الحق؟" قال: "بلى." "فلماذا نقبل هذا؟" غير أن النبي كان على يقين. وخلال عامين ثبت أن الصلح كان أعظم انتصار استراتيجي في تاريخ الإسلام: أسلم بسببه آلاف ومنهم خالد بن الوليد، ثم فُتحت مكة الفتح الأعظم.`,
      fr: `En l'an 6 après l'Hégire, le Prophète ﷺ mena 1400 compagnons vers La Mecque. Le traité de Hudaybiyyah parut humiliant: retour sans Umrah, renvoi de tout Mecquois musulman. Omar fut troublé. Mais le Prophète était certain. En deux ans, des milliers embrassèrent l'Islam dont Khalid ibn al-Walid, puis La Mecque fut conquise. Allah appela ce traité "une victoire manifeste".`,
      de: `Im 6. Jahr nach der Hidschra führte der Prophet ﷺ 1400 Gefährten nach Mekka. Der Vertrag von Hudaybiyyah schien demütigend. Umar war beunruhigt. Aber der Prophet war sicher. In zwei Jahren nahmen Tausende den Islam an, darunter Khalid ibn al-Walid, dann wurde Mekka erobert. Allah nannte den Vertrag einen "klaren Sieg".`,
    },
    moral: {
      en: "The believer trusts the Prophet's wisdom even when immediate circumstances seem unfavorable. What appears as a loss may be the beginning of the greatest victory.",
      ar: "يثق المؤمن في حكمة النبي حتى حين تبدو الظروف الآنية غير مواتية. ما يبدو خسارة قد يكون بداية أعظم انتصار.",
      fr: "Le croyant fait confiance à la sagesse du Prophète même quand les circonstances semblent défavorables. Ce qui apparaît comme une perte peut être le début de la plus grande victoire.",
      de: "Der Gläubige vertraut der Weisheit des Propheten, auch wenn die unmittelbaren Umstände ungünstig erscheinen. Was wie eine Niederlage aussieht, kann der Beginn des größten Sieges sein.",
    },
    readingTime: 4,
  },
  {
    id: "s29",
    category: "companions",
    bg: "linear-gradient(135deg, #0a1a2a 0%, #1a4a6a 100%)",
    emoji: "✍️",
    title: { en: "Zayd ibn Thabit: The Collector of the Quran", ar: "زيد بن ثابت: جامع القرآن", fr: "Zayd ibn Thabit: Le Collecteur du Coran", de: "Zayd ibn Thabit: Der Sammler des Quran" },
    arabicOpening: "إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ — الحجر: ٩",
    content: {
      en: `Zayd ibn Thabit was one of the primary scribes of the Prophet ﷺ. After the Battle of Yamama in which many Huffaz (Quran memorizers) were martyred, Abu Bakr al-Siddiq (RA) and Umar ibn al-Khattab (RA) charged Zayd with the enormous responsibility of compiling the Quran into a single written collection. Zayd initially hesitated — this was something the Prophet had not done in this exact form. He said: "By Allah, it would have been easier for me to move a mountain than to compile the Quran!" But he undertook the task with the utmost care: he accepted nothing unless it was confirmed by two reliable witnesses who had heard it directly from the Prophet. Under Uthman ibn Affan (RA), Zayd led the committee that produced the standardized Mushaf — the complete Quran as we read today. This preservation is itself a miracle: the Quran is the only ancient scripture preserved with such rigorous methodology and memorized by millions word for word.`,
      ar: `كان زيد بن ثابت من أكتب النبي ﷺ. بعد موقعة اليمامة التي استُشهد فيها كثير من حفاظ القرآن، أمر أبو بكر الصديق رضي الله عنه زيداً بجمع القرآن. قال زيد: "والله لو كُلّفت نقل جبل من مكانه ما كان أثقل عليّ من جمع القرآن!" لكنه تولّى المهمة بأشد درجات الدقة: لم يقبل آية إلا بشاهدَين ثقتَين سمعاها من النبي. وتحت إشراف عثمان بن عفان رضي الله عنه، قاد لجنة أنتجت المصحف الموحّد الذي بين أيدينا اليوم. وهذا الحفظ الرائع هو معجزة بحد ذاته.`,
      fr: `Zayd ibn Thabit était l'un des principaux scribes du Prophète ﷺ. Après la Bataille de Yamama, Abu Bakr le chargea de compiler le Coran. Zayd dit: "Déplacer une montagne m'aurait été plus facile!" Mais il accomplit la tâche avec une rigueur extrême: aucun verset sans deux témoins fiables. Sous Uthman, il produisit le Mushaf standardisé que nous lisons aujourd'hui — une préservation miraculeuse.`,
      de: `Zayd ibn Thabit war einer der Hauptschreiber des Propheten ﷺ. Nach der Schlacht von Yamama beauftragte Abu Bakr ihn, den Quran zu kompilieren. Zayd sagte: "Einen Berg zu versetzen wäre leichter gewesen!" Aber er führte die Aufgabe mit äußerster Sorgfalt durch: kein Vers ohne zwei zuverlässige Zeugen. Unter Uthman erstellte er den standardisierten Mushaf — eine wundersame Bewahrung.`,
    },
    moral: {
      en: "The preservation of the Quran is a collective trust and a miracle. Every generation that memorizes and protects the Quran participates in Allah's promise of preservation.",
      ar: "حفظ القرآن أمانة جماعية ومعجزة. كل جيل يحفظ القرآن ويصونه يشارك في وعد الله بحفظه.",
      fr: "La préservation du Coran est une confiance collective et un miracle. Chaque génération qui mémorise et protège le Coran participe à la promesse d'Allah de préservation.",
      de: "Die Bewahrung des Quran ist ein kollektives Vertrauen und ein Wunder. Jede Generation, die den Quran memoriert und schützt, nimmt an Allahs Versprechen der Bewahrung teil.",
    },
    readingTime: 4,
  },
  {
    id: "s30",
    category: "moral",
    bg: "linear-gradient(135deg, #1a0a0a 0%, #5a1a1a 100%)",
    emoji: "🤲",
    title: { en: "The Power of Dua: The Story of Ayyub", ar: "قوة الدعاء: قصة أيوب عليه السلام", fr: "La Puissance du Dua: L'Histoire d'Ayyub", de: "Die Kraft des Dua: Die Geschichte von Ayyub" },
    arabicOpening: "وَأَيُّوبَ إِذْ نَادَىٰ رَبَّهُ أَنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ — الأنبياء: ٨٣",
    content: {
      en: `Prophet Ayyub (AS) was blessed with wealth, health, and family — and was deeply grateful to Allah. Then Allah tested him with severe trials: he lost his wealth, his children died, and he was afflicted with a painful illness that lasted for years. Tradition holds he suffered for 18 years, his body ravaged by disease, until only two limbs remained healthy — his heart and tongue, which he used to remember Allah. Despite his suffering, he never complained to people — only to Allah. His wife stayed by his side, working to provide for him. Finally, he made his profound dua: "O my Lord! Adversity has touched me and You are the Most Merciful of the merciful." Allah responded immediately: "We responded to him, removed his affliction, and restored his family to him — and more." His patience became the standard by which patience is measured. Allah commanded him to strike the earth with his foot — and fresh water gushed forth, healing his illness.`,
      ar: `كان أيوب عليه السلام مُنعَماً بالمال والصحة والأبناء وكان شاكراً لله. ثم ابتلاه الله ابتلاءً شديداً: فقد ماله، ومات أولاده، وأصابه المرض سنوات طويلة. قيل إنه عانى ثماني عشرة سنة حتى لم يبق منه سالم إلا قلبه ولسانه يذكر بهما الله. ولم يشكُ لأحد من الناس، بل قال لربه: "أَنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ." فاستجاب الله فوراً ورد عليه أهله وأعطاه مثلهم معهم. وصار صبره معياراً للصبر. وأُمر بضرب الأرض برجله فانبجس الماء شافياً.`,
      fr: `Le Prophète Ayyub (AS) était béni de richesse, santé et famille, et profondément reconnaissant. Puis Allah l'éprouva: il perdit tout et souffrit d'une maladie douloureuse pendant des années. Seuls son cœur et sa langue restèrent sains pour Le rappeler. Finalement il supplia: "La détresse m'a touché et Tu es le Plus Miséricordieux." Allah répondit immédiatement et lui rendit sa famille et davantage. Sa patience est devenue l'étalon de toute patience.`,
      de: `Prophet Ayyub (AS) war mit Reichtum, Gesundheit und Familie gesegnet und zutiefst dankbar. Dann prüfte Allah ihn schwer: er verlor alles und litt jahrelang an einer schmerzhaften Krankheit. Nur Herz und Zunge blieben gesund für Allahs Gedenken. Schließlich betete er: "Die Not hat mich berührt und Du bist der Barmherzigste." Allah antwortete sofort und gab ihm seine Familie und mehr zurück. Seine Geduld wurde zum Maßstab aller Geduld.`,
    },
    moral: {
      en: "Trials are not punishment — they can be the highest honor from Allah. Patience in hardship, combined with turning to Allah alone, is the path to relief.",
      ar: "البلاء ليس عقوبة — بل قد يكون أعلى تكريم من الله. الصبر في الشدة مع التوجه إلى الله وحده هو طريق الفرج.",
      fr: "Les épreuves ne sont pas une punition — elles peuvent être le plus grand honneur d'Allah. La patience dans l'adversité, combinée au recours à Allah seul, est la voie du soulagement.",
      de: "Prüfungen sind keine Strafe — sie können die höchste Ehre von Allah sein. Geduld in der Not, verbunden mit dem Wenden zu Allah allein, ist der Weg zur Erleichterung.",
    },
    readingTime: 4,
  },
];

export const STORY_CATEGORIES = [
  { id: "all",       label: "All Stories",      ar: "جميع القصص",        fr: "Toutes les histoires", de: "Alle Geschichten" },
  { id: "prophet",   label: "Prophet ﷺ",        ar: "النبي ﷺ",           fr: "Prophète ﷺ",           de: "Prophet ﷺ" },
  { id: "companions",label: "Companions",       ar: "الصحابة",           fr: "Compagnons",           de: "Gefährten" },
  { id: "prophets",  label: "Prophets",         ar: "الأنبياء",          fr: "Prophètes",            de: "Propheten" },
  { id: "history",   label: "Islamic History",  ar: "التاريخ الإسلامي",  fr: "Histoire Islamique",   de: "Islamische Geschichte" },
  { id: "moral",     label: "Moral Stories",    ar: "الدروس الأخلاقية",  fr: "Leçons Morales",       de: "Moralische Lektionen" },
] as const;
