export interface IslamicStory {
  id: string;
  category: "prophet" | "companions" | "history" | "prophets";
  titleAr: string;
  titleEn: string;
  arabicOpening: string;
  content: string;
  moral: string;
  readingTime: number;
}

export const ISLAMIC_STORIES: IslamicStory[] = [
  {
    id: "s1",
    category: "prophet",
    titleAr: "أخلاق النبي ﷺ",
    titleEn: "The Character of the Prophet ﷺ",
    arabicOpening: "وَإِنَّكَ لَعَلَىٰ خُلُقٍ عَظِيمٍ — القلم: ٤",
    content: `The Prophet Muhammad ﷺ was described by Allah in the Quran as being "upon a great moral character" (68:4). His wife Aisha (RA), when asked about his character, replied: "His character was the Quran."

The Prophet ﷺ was the most generous of people. He never refused anyone who asked him. Anas ibn Malik, who served the Prophet for ten years, said: "He never said 'uff' (a word of irritation) to me, and he never said 'why did you do it?' when I did something, nor 'why didn't you do it?' when I didn't."

Once, a Bedouin man came and pulled the Prophet's cloak so roughly that it left a mark on his neck. He then demanded: "Give me from the wealth of Allah that is with you!" The Prophet ﷺ turned to him, smiled, and ordered that he be given a gift.

A Jewish scholar in Medina, upon observing the Prophet's conduct, said: "By Allah, this man is indeed a prophet. We find his description in our Torah."

When the Prophet ﷺ walked in the streets, he would greet children, inquire about the sick, and never look down on the poor. He would visit the sick regardless of their faith. When a young Jewish boy who used to serve him fell ill, the Prophet ﷺ visited him and said to him at his deathbed: "Become Muslim." The boy looked at his father, who nodded. The boy embraced Islam, and the Prophet left saying: "Praise be to Allah who saved him from the Fire."

His humility was extraordinary. He would sit on the floor, eat with his fingers, and mend his own shoes. He refused special honor saying: "I am only a servant. I eat as a servant eats and I sit as a servant sits."`,
    moral: "The greatest measure of a person's faith is their character. Strive to embody the Prophetic character in every interaction.",
    readingTime: 4,
  },
  {
    id: "s2",
    category: "companions",
    titleAr: "وفاء أبي بكر الصديق رضي الله عنه",
    titleEn: "The Loyalty of Abu Bakr as-Siddiq",
    arabicOpening: "ثَانِيَ اثْنَيْنِ إِذْ هُمَا فِي الْغَارِ — التوبة: ٤٠",
    content: `Abu Bakr Abdullah ibn Abi Quhafa (RA) was the closest companion of the Prophet ﷺ and the first adult man to embrace Islam.

When the Quraysh plotted to assassinate the Prophet ﷺ, Allah revealed that the Prophet should migrate to Medina. The Prophet chose no one but Abu Bakr to accompany him on this most dangerous journey.

As the assassins surrounded the Prophet's house, they had not noticed that it was Ali (RA) sleeping in the Prophet's bed. The Prophet and Abu Bakr slipped out into the night.

They took refuge in the Cave of Thawr for three nights. The Quraysh searched with trackers and reached the very entrance of the cave. Abu Bakr whispered in fear — not for himself, but for the Prophet: "O Messenger of Allah, if any of them looks down, they will see us!"

The Prophet ﷺ replied with unshakeable certainty: "O Abu Bakr, what do you think of two people when Allah is their third?"

A spider had woven its web at the cave's entrance, and pigeons had nested there — making it appear undisturbed. The trackers turned back, convinced no one had entered.

When Abu Bakr was told there was poison in his camel's saddlebag on the journey, he sucked the poison out with his mouth rather than wake the sleeping Prophet.

Abu Bakr's entire wealth was spent in the cause of Islam. When asked by Umar (RA) what he had left for his family after giving all his wealth, he said: "Allah and His Messenger."`,
    moral: "True loyalty means sacrificing your own comfort, safety, and wealth for what you love most. Abu Bakr's example teaches us that loyalty to Allah and His Messenger comes before all else.",
    readingTime: 4,
  },
  {
    id: "s3",
    category: "companions",
    titleAr: "صبر بلال رضي الله عنه",
    titleEn: "The Patience of Bilal ibn Rabah",
    arabicOpening: "إِنَّمَا يُوَفَّى الصَّابِرُونَ أَجْرَهُم بِغَيْرِ حِسَابٍ — الزمر: ١٠",
    content: `Bilal ibn Rabah (RA) was an Abyssinian slave owned by Umayyah ibn Khalaf, one of the fiercest enemies of Islam in Mecca.

When Bilal embraced Islam, his master discovered his faith and subjected him to severe torture to force him to renounce it. In the scorching midday heat of Mecca, Umayyah would drag Bilal to the desert, lay him on the burning sand, and place a huge hot rock on his chest.

He would command Bilal to denounce Muhammad ﷺ and return to worshipping the idols. But from Bilal's cracked, parched lips came only one word, again and again: "Ahad! Ahad!" — "One! One!" — declaring Allah's oneness even under torture.

Abu Bakr as-Siddiq (RA) passed by and was moved by what he saw. He went to Umayyah and offered to buy Bilal's freedom. Umayyah, thinking Abu Bakr was desperate, doubled the price. Abu Bakr paid without hesitation and set Bilal free.

The Prophet ﷺ said about Bilal: "Bilal is a man of Paradise."

Bilal was honored with the role of the first muezzin of Islam. His powerful voice would call the faithful to prayer from atop the Kaaba in Mecca after the conquest. It was a moment that moved everyone to tears — the former slave who had suffered for the word of Tawhid now announcing it from the holiest place on earth.

After the Prophet ﷺ passed away, Bilal could not bring himself to give the adhan in the same way. When Umar (RA) asked him to call the adhan in Jerusalem, Bilal agreed. But when he reached "Ashhadu anna Muhammadan rasulullah" — "I bear witness that Muhammad is the Messenger of Allah" — he broke down completely, and everyone wept.`,
    moral: "Steadfastness in faith, even under the greatest pressure, brings the highest reward. No oppressor can extinguish the light of true belief.",
    readingTime: 5,
  },
  {
    id: "s4",
    category: "companions",
    titleAr: "عدل عمر بن الخطاب رضي الله عنه",
    titleEn: "The Justice of Umar ibn al-Khattab",
    arabicOpening: "إِنَّ اللَّهَ يَأْمُرُ بِالْعَدْلِ وَالْإِحْسَانِ — النحل: ٩٠",
    content: `Umar ibn al-Khattab (RA), the second Caliph of Islam, was famous for his extraordinary justice and sense of accountability.

One night, Umar was making his customary rounds of Medina in disguise — dressed as a common man — to see how his people lived. He came upon a tent from which he heard the cries of hungry children and the voice of a mother trying to comfort them by pretending to cook.

Umar peered in and saw a pot over the fire — but the pot was filled only with water and stones. The mother was trying to deceive her children into sleeping by pretending food was cooking. Umar was overcome with grief and shame.

He rushed to the public food store (Bayt al-Mal), loaded a sack of flour and oil on his own back, and returned to the family. Umar's companion offered to carry the sack, but Umar refused, saying: "Will you carry my burden for me on the Day of Judgment?"

He cooked the food himself and served the family. Only when the children had eaten and fallen asleep did he reveal who he was. He promised to ensure the family was properly provided for.

When a Christian elder in Jerusalem came to complain that Muslim soldiers had built a mosque on land near his church without permission, Umar ordered the mosque demolished and the land returned — even though the mosque had already been built.

He once said: "If a stray dog died on the banks of the Euphrates from hunger, I would fear that Allah would question me about it."`,
    moral: "A leader is responsible for every person under his care. Justice is not only for the powerful — it must reach every corner of society, especially to those who cannot speak for themselves.",
    readingTime: 4,
  },
  {
    id: "s5",
    category: "companions",
    titleAr: "خديجة أم المؤمنين رضي الله عنها",
    titleEn: "Khadijah — Mother of the Believers",
    arabicOpening: "فَاصْبِرْ إِنَّ وَعْدَ اللَّهِ حَقٌّ — غافر: ٧٧",
    content: `Khadijah bint Khuwaylid (RA) was a noble, wealthy merchant of Mecca — respected by all for her intelligence, integrity, and strength of character. Twice widowed, she managed her own trade caravans at a time when few women did so.

She had heard of a young man named Muhammad ﷺ, known throughout Mecca as "Al-Amin" — the Trustworthy. She hired him to manage her trade caravan to Syria. His conduct impressed her deeply, and she proposed marriage to him. He was 25; she was 40.

When revelation first came to the Prophet ﷺ in the Cave of Hira, he returned home trembling and afraid. He told Khadijah what had happened. Rather than doubt him, she wrapped him in a cloak and said words that became immortal in Islamic history:

"Never! By Allah, Allah will never disgrace you. You maintain family ties, you bear the burden of the weak, you help the poor, you are generous to guests, and you uphold the truth."

She was the first human being to believe in the Prophet's message. She supported him with her wealth, her words, and her love through the most difficult years of Islam.

When the Quraysh boycotted the Muslims for three years, Khadijah gave everything — her wealth, her health — in support of the community. She died shortly after the boycott ended.

Years after her passing, the Prophet ﷺ would still love her deeply. Whenever a sheep was slaughtered, he would send portions to her friends. When Aisha (RA) once expressed jealousy, the Prophet ﷺ said: "She believed in me when people disbelieved. She helped me with her wealth when people withheld from me. And Allah blessed me with children through her."`,
    moral: "True support is unwavering. Khadijah's faith in the Prophet at the most vulnerable moment of his mission teaches us to stand by those we love through difficulty, not just in comfort.",
    readingTime: 5,
  },
  {
    id: "s6",
    category: "history",
    titleAr: "الإسراء والمعراج",
    titleEn: "The Night Journey and Ascension",
    arabicOpening: "سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ لَيْلًا — الإسراء: ١",
    content: `In the year of grief — when the Prophet ﷺ had lost his beloved wife Khadijah and his uncle Abu Talib — Allah honored His Prophet with a miraculous night journey unlike anything in human history.

The angel Jibril (Gabriel) (AS) came to the Prophet ﷺ while he slept near the Kaaba. He was taken to Masjid al-Aqsa in Jerusalem on a magnificent creature called Al-Buraq, faster than lightning. At the mosque, the Prophet ﷺ led all the prophets — Ibrahim, Musa, Isa, and all others — in prayer.

Then the ascension (Mi'raj) began. Through the seven heavens, Jibril accompanied the Prophet ﷺ. At each heaven, a prophet greeted him:
- Adam (AS) in the first heaven
- Yahya and Isa (AS) in the second
- Yusuf (AS) in the third
- Idris (AS) in the fourth
- Harun (AS) in the fifth
- Musa (AS) in the sixth
- Ibrahim (AS) in the seventh, leaning against Al-Bayt al-Ma'mur

The Prophet ﷺ was then taken beyond, to a place no creation had reached before — closer to Allah than the distance of two bow-lengths or nearer. There, Allah spoke to His Prophet directly and obligated the five daily prayers upon the Muslim nation.

When the Prophet ﷺ returned to Mecca and told the people what had happened, many rejected and mocked him. When Abu Bakr heard, he said without hesitation: "If he said it, then I believe it." This event gave him the title "As-Siddiq" — The Affirmer of Truth.

The five daily prayers remain the greatest gift of this night — a direct connection between every believer and their Lord, five times each day.`,
    moral: "Even in our darkest moments, Allah honors and elevates those who remain steadfast. The five daily prayers are our direct connection to Allah — a gift from the greatest night in history.",
    readingTime: 5,
  },
  {
    id: "s7",
    category: "prophets",
    titleAr: "قصة يوسف عليه السلام",
    titleEn: "The Story of Prophet Yusuf (AS)",
    arabicOpening: "نَحْنُ نَقُصُّ عَلَيْكَ أَحْسَنَ الْقَصَصِ — يوسف: ٣",
    content: `Allah calls the story of Yusuf (Joseph) (AS) "the best of stories" in the Quran (12:3). It is a profound tale of jealousy, patience, loss, temptation, and ultimate triumph.

Yusuf (AS) was the beloved son of the Prophet Ya'qub (Jacob) (AS). As a child, he had a dream: eleven stars, the sun, and the moon all prostrated before him. His father recognized the dream's significance and told him to keep it secret from his brothers.

But Yusuf's brothers were consumed by jealousy of their father's love for him. They plotted to be rid of him. They threw the young boy into a dark well and returned to their father with his shirt, stained with false blood, claiming a wolf had devoured him.

Yusuf was pulled from the well by a passing caravan and sold as a slave in Egypt. Yet Allah was with him. He grew into a man of extraordinary beauty and noble character, working in the household of Al-Aziz, a noble Egyptian.

Al-Aziz's wife tried to seduce him. When Yusuf refused her, she falsely accused him, and he was sent to prison. Even in prison, Yusuf taught people, interpreted dreams, and maintained his faith.

Years passed. Pharaoh himself had a disturbing dream — seven fat cows devoured by seven thin ones; seven green ears of corn and seven dry ones. No one could interpret it until a man remembered Yusuf in prison.

Yusuf interpreted the dream: seven years of abundance followed by seven years of severe drought. Pharaoh was so impressed that he released Yusuf and made him the chief minister of Egypt, in charge of the entire treasury.

When the drought came, Yusuf's brothers came to Egypt seeking grain — not recognizing their brother who now sat in a palace. After a dramatic series of events, Yusuf finally revealed himself:

"I am Yusuf, and this is my brother. Allah has been gracious to us."

When his brothers fell before him in shame and fear, Yusuf said: "There is no blame on you today. May Allah forgive you. He is the Most Merciful of the merciful." (12:92)

His father Ya'qub (AS) — who had wept so much for Yusuf that he had gone blind — regained his sight when Yusuf's shirt was brought to him.`,
    moral: "Never despair of Allah's mercy. What seems like the worst moment of your life may be the beginning of your elevation. Patience, purity of heart, and trust in Allah always lead to a beautiful outcome.",
    readingTime: 7,
  },
  {
    id: "s8",
    category: "prophets",
    titleAr: "إبراهيم عليه السلام والنار",
    titleEn: "Ibrahim (AS) and the Fire",
    arabicOpening: "قُلْنَا يَا نَارُ كُونِي بَرْدًا وَسَلَامًا عَلَىٰ إِبْرَاهِيمَ — الأنبياء: ٦٩",
    content: `Ibrahim (Abraham) (AS) — Khalilullah, the Friend of Allah — was born into a family of idol-makers. His father Azar carved and sold idols. From his earliest youth, Ibrahim's mind rejected the worship of statues that could neither hear nor help anyone.

"O my father, why do you worship something that does not hear, does not see, and cannot benefit you at all?" (19:42)

One day, when the city was celebrating a festival and everyone had left, Ibrahim entered the temple and shattered all the idols — except the largest one. He hung the axe around the large idol's neck.

When the people returned and saw their gods in pieces, they accused Ibrahim. He said: "Ask the large one — he has the axe!" When they protested that the idol couldn't speak, Ibrahim said: "Then why do you worship that which cannot benefit or harm you?"

Furious, the people of Nimrod's kingdom agreed on a punishment: Ibrahim would be thrown into the greatest fire they could build. They gathered wood for days, creating a blaze so enormous that they had to use a catapult to throw Ibrahim in, because no one could get close enough.

As Ibrahim was placed in the catapult, the angel Jibril (Gabriel) appeared and asked: "Do you need anything?"

Ibrahim replied: "From you, no. But from Allah — He knows my state."

At that moment, Allah commanded: "O fire, be coolness and safety upon Ibrahim!" (21:69)

The fire could not burn him. When Ibrahim emerged, unharmed and tranquil, many people believed. Nimrod himself tried to challenge Allah, but his power crumbled.

Ibrahim (AS) would go on to build the Kaaba, become the father of prophets, and earn the title of "Imam of Mankind" — and his prayer is answered five times daily when we send blessings upon the Prophet ﷺ.`,
    moral: "True tawhid (monotheism) means having complete certainty in Allah alone. When Ibrahim asked for no help from the angel but only from Allah, he demonstrated that the most powerful force in existence is trust in Allah.",
    readingTime: 5,
  },
  {
    id: "s9",
    category: "companions",
    titleAr: "سلمان الفارسي رضي الله عنه",
    titleEn: "Salman al-Farisi — The Seeker of Truth",
    arabicOpening: "وَالَّذِينَ جَاهَدُوا فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا — العنكبوت: ٦٩",
    content: `Salman al-Farisi (RA) was born into a Persian noble family, the son of a Zoroastrian fire-keeper. From his youth, Salman was seized by an intense hunger for truth — a restlessness that would take him across the ancient world.

When he first encountered a Christian monk, he was so moved by the prayers he heard that he abandoned his family's fire-temple to follow the monk. His father locked him in chains when he discovered this, but Salman escaped.

He traveled from monk to monk, each one on their deathbed directing him to the next seeker of truth. The last monk, in the land of Syria, said to Salman: "The time of a prophet has arrived. He will appear in the land of Arabs, between two volcanic areas. He will accept a gift but not charity. Between his shoulder blades is the seal of prophethood."

Salman paid dearly for his journey — he was enslaved and sold into captivity, eventually ending up in Medina. When news came of a prophet in Arabia, Salman went to investigate.

He brought the Prophet ﷺ some dates as sadaqa (charity). The Prophet ﷺ distributed them to his companions but did not eat any himself — matching the first sign.

He brought more dates as a gift — and the Prophet ﷺ ate with his companions — matching the second sign.

Then Salman came behind the Prophet ﷺ and moved his garment aside. When he saw the Seal of Prophethood between his shoulders, Salman burst into tears and fell upon the Prophet, kissing the seal.

The Prophet ﷺ freed him from his slavery with the help of the companions. Salman had searched his entire life — and he found what he was looking for.

It was Salman who suggested digging the trench at the Battle of Khandaq — a strategy that saved Medina. The Prophet ﷺ said: "Salman is one of us, the Ahlul-Bayt (people of the house)."`,
    moral: "No distance is too great, no sacrifice too large, when the seeker is sincere. Allah guides to His light those who search with a true heart.",
    readingTime: 6,
  },
  {
    id: "s10",
    category: "history",
    titleAr: "معركة بدر الكبرى",
    titleEn: "The Battle of Badr",
    arabicOpening: "وَلَقَدْ نَصَرَكُمُ اللَّهُ بِبَدْرٍ وَأَنتُمْ أَذِلَّةٌ — آل عمران: ١٢٣",
    content: `The year was 624 CE — just two years after the Prophet ﷺ and his companions had arrived in Medina as refugees from Mecca. A Qurayshi trade caravan led by Abu Sufyan was returning from Syria with enormous wealth.

The Muslims decided to intercept the caravan. Abu Sufyan received word and diverted the caravan, sending an urgent message to Mecca: "Send an army to protect us!"

The Quraysh mobilized a force of 1,000 warriors — well-armed, armored, and experienced. The Muslims numbered only 313, poorly equipped, with only 2 horses and 70 camels between them all.

At the wells of Badr, the two forces faced each other. The night before the battle, the Prophet ﷺ stood in prayer, weeping and calling to Allah: "O Allah, if this small group perishes today, You will not be worshipped on earth."

On the morning of battle, the Prophet ﷺ looked at his small army and then at the sky, and received the revelation: "I will reinforce you with a thousand of the angels, following one another." (8:9)

The battle began. The Muslims fought with extraordinary courage. Abu Jahl — the greatest enemy of Islam — was killed by two young men from Medina who had just become Muslim.

By the day's end, the Quraysh were routed: 70 of their leaders killed, 70 taken prisoner. The Muslims lost only 14 men. It was a miracle by any reckoning.

The Prophet ﷺ prayed over the killed Quraysh: "Did you find what Allah promised you true?" Umar asked in surprise: "O Messenger of Allah, how do they hear you?" The Prophet said: "By the One in whose hand is my soul, you do not hear my words better than they do."

The prisoners were treated with gentleness. Those who could not pay ransom were asked to teach ten Muslim children to read and write.`,
    moral: "When the believers are sincere and trust in Allah, size and material power matter little. The Battle of Badr established that divine support is with those whose cause is true.",
    readingTime: 5,
  },
  {
    id: "s11",
    category: "prophet",
    titleAr: "رحمة النبي ﷺ بالأطفال",
    titleEn: "The Prophet's ﷺ Mercy toward Children",
    arabicOpening: "وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ — الأنبياء: ١٠٧",
    content: `Among the most touching aspects of the Prophet's ﷺ character was his extraordinary tenderness toward children.

Once, the Prophet ﷺ was leading a prayer and prolonged his prostration (sujud) far longer than usual. When he finished, the companions asked why he had prostrated so long. He smiled and said: "My grandson climbed on my back, and I did not want to hurry him until he had finished."

Hasan and Husayn — his grandsons — were the joy of his life. He would carry them on his shoulders, play with them, and race them across the courtyard. He said: "They are my fragrant flowers in this world."

When the Prophet ﷺ would return from a journey, the children of Medina would run out to greet him. He would stop his camel, pick up the small children, and carry them before him as he entered the city — some in front of him on his saddle, some behind.

When Anas ibn Malik's younger brother died, the Prophet ﷺ came to visit the family and sat beside the grieving child. He called the boy by a nickname: "O Abu Umayr, what happened to the little bird (nughair)?" — trying to make the child smile in his sadness.

Once a man boasted to the Prophet: "I have ten children and I have never kissed any of them." The Prophet ﷺ replied: "The one who shows no mercy will not be shown mercy."

He ﷺ said: "I begin the prayer intending to lengthen it, but then I hear a child crying, and I shorten it, not wanting to cause hardship to his mother."`,
    moral: "Gentleness and mercy are signs of strength, not weakness. The greatest man to have ever lived spent time playing with children and comforting them — let this be our standard.",
    readingTime: 4,
  },
  {
    id: "s12",
    category: "companions",
    titleAr: "أسماء بنت أبي بكر رضي الله عنها",
    titleEn: "Asma bint Abi Bakr — The Woman with Two Belts",
    arabicOpening: "إِنَّ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ — البقرة: ٢٧٧",
    content: `Asma bint Abi Bakr (RA) earned the unforgettable title "Dhaat an-Nitaqayn" — the Woman of Two Belts — for her heroic role in the Hijra.

When the Prophet ﷺ and her father Abu Bakr were hiding in the Cave of Thawr before the migration, it was Asma — then pregnant with her first child — who made the dangerous journey alone across the hills of Mecca to bring them food and water each night.

She had prepared provisions but had nothing to tie the food sack. Without hesitation, she tore her own belt in two — using one half to tie the bag and keeping the other. The Prophet ﷺ honored her with a special du'a: "Allah will give you two belts in Paradise instead."

Her courage did not end there. The Quraysh leader Abu Jahl himself came to her father's house demanding to know where the Prophet and Abu Bakr had gone. He was known to be violent and terrifying. But Asma, alone and pregnant, looked him in the eye and said: "I do not know." Abu Jahl raised his hand and struck her across the face so hard that her earring fell. She did not flinch.

Asma lived to nearly 100 years old, remaining active in the community until the end. Her son Abdullah ibn az-Zubayr was the last great caliph to resist injustice. When he was martyred, the aged Asma heard the news. She was nearly blind, but she stood up, prayed two units of prayer, and said:

"The Prophet ﷺ told us there would come a day of hardship. Today is that day." Then she waited with dignity.

Her grandson once asked her: "Grandmother, were you afraid?" She said: "A believer who trusts in Allah knows no lasting fear."`,
    moral: "Courage is not the absence of fear — it is acting rightly despite fear. Asma's life proves that faith gives people the strength to face whatever comes, at any age.",
    readingTime: 5,
  },
];

export const STORY_CATEGORIES = [
  { id: "all", label: "All Stories", ar: "جميع القصص" },
  { id: "prophet", label: "Prophet ﷺ", ar: "النبي ﷺ" },
  { id: "companions", label: "Companions", ar: "الصحابة" },
  { id: "prophets", label: "Prophets", ar: "الأنبياء" },
  { id: "history", label: "Islamic History", ar: "التاريخ الإسلامي" },
] as const;
