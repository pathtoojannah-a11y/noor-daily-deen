// Seed data for offline/fallback use
import type { Category, Dua } from './adhkar';

export const seedCategories: Category[] = [
  { slug: 'morning', name: 'Morning Adhkar', count: 15, icon: 'sunrise' },
  { slug: 'evening', name: 'Evening Adhkar', count: 15, icon: 'sunset' },
  { slug: 'bedtime', name: 'Bedtime Duas', count: 12, icon: 'moon' },
  { slug: 'after-prayer', name: 'After Prayer', count: 12, icon: 'hand' },
  { slug: 'protection', name: 'Protection', count: 10, icon: 'shield' },
  { slug: 'gratitude', name: 'Gratitude', count: 10, icon: 'heart' },
  { slug: 'travel', name: 'Travel Duas', count: 8, icon: 'plane' },
  { slug: 'food', name: 'Food & Drink', count: 8, icon: 'utensils' },
  { slug: 'home', name: 'Entering/Leaving Home', count: 6, icon: 'home' },
  { slug: 'mosque', name: 'Mosque Duas', count: 6, icon: 'building' },
  { slug: 'forgiveness', name: 'Seeking Forgiveness', count: 8, icon: 'heart-hand' },
  { slug: 'guidance', name: 'Guidance & Knowledge', count: 8, icon: 'book-open' },
  { slug: 'general', name: 'General Duas', count: 12, icon: 'book' }
];

export const seedDuas: Record<string, Dua[]> = {
  morning: [
    {
      id: 'm1',
      title: 'Morning Protection',
      ar: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',
      en: 'O Allah, by You we enter the morning, and by You we enter the evening, by You we live and by You we die, and to You is the resurrection.',
      translit: 'Allahumma bika asbahna, wa bika amsayna, wa bika nahya, wa bika namutu, wa ilayka an-nushur',
      source: 'Tirmidhi 3391',
      audio: null,
      benefits: ['Complete protection throughout the day', 'Acknowledging Allah\'s absolute control over life and death', 'Remembrance of the Day of Resurrection']
    },
    {
      id: 'm2',
      title: 'Ayatul Kursi',
      ar: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ',
      en: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth.',
      translit: 'Allahu la ilaha illa huwal hayyul qayyum, la ta\'khudhuhu sinatun wa la nawm, lahu ma fis-samawati wa ma fil ard',
      source: 'Quran 2:255',
      audio: null,
      benefits: ['Greatest verse in the Quran', 'Protection from Shaytan until evening', 'Blessings and safety in all affairs']
    },
    {
      id: 'm3',
      title: 'Surah Al-Ikhlas',
      ar: 'قُلْ هُوَ اللَّهُ أَحَدٌ، اللَّهُ الصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
      en: 'Say: He is Allah, the One. Allah, the Eternal Refuge. He neither begets nor is born, nor is there to Him any equivalent.',
      translit: 'Qul huwallahu ahad, Allahus-samad, lam yalid wa lam yulad, wa lam yakun lahu kufuwan ahad',
      source: 'Quran 112:1-4',
      audio: null,
      benefits: ['Equals one-third of the Quran in reward', 'Affirms pure monotheism (Tawheed)', 'Protection when recited 3 times']
    },
    {
      id: 'm4',
      title: 'Surah Al-Falaq',
      ar: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ، مِن شَرِّ مَا خَلَقَ، وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ، وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ، وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
      en: 'Say: I seek refuge in the Lord of daybreak, from the evil of that which He created, and from the evil of darkness when it settles, and from the evil of the blowers in knots, and from the evil of an envier when he envies.',
      translit: 'Qul a\'udhu birabbil-falaq, min sharri ma khalaq, wa min sharri ghasiqin idha waqab, wa min sharrin-naffathati fil-\'uqad, wa min sharri hasidin idha hasad',
      source: 'Quran 113:1-5',
      audio: null,
      benefits: ['Protection from all types of evil', 'Shield from magic and sorcery', 'Safety from envy and jealousy']
    },
    {
      id: 'm5',
      title: 'Surah An-Nas',
      ar: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ، مَلِكِ النَّاسِ، إِلَٰهِ النَّاسِ، مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ، الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ، مِنَ الْجِنَّةِ وَالنَّاسِ',
      en: 'Say: I seek refuge in the Lord of mankind, the Sovereign of mankind, the God of mankind, from the evil of the retreating whisperer, who whispers into the hearts of mankind, from among the jinn and mankind.',
      translit: 'Qul a\'udhu birabbin-nas, malikin-nas, ilahin-nas, min sharril-waswasil-khannas, alladhi yuwaswisu fi sudurin-nas, minal-jinnati wan-nas',
      source: 'Quran 114:1-6',
      audio: null,
      benefits: ['Protection from evil whispers of Shaytan', 'Guards against doubts and evil thoughts', 'Shield from harm of jinn and evil humans']
    },
    {
      id: 'm6',
      title: 'Sayyidul Istighfar',
      ar: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ',
      en: 'O Allah, You are my Lord, there is none worthy of worship but You. You created me and I am Your slave, and I am keeping my covenant and promise to You as much as I can.',
      translit: 'Allahumma anta rabbi la ilaha illa ant, khalaqtani wa ana abduk, wa ana ala ahdika wa wa\'dika mastata\'t',
      source: 'Bukhari 6306',
      audio: null,
      benefits: ['Master supplication for forgiveness', 'Guarantees Paradise if said with certainty', 'Erases major and minor sins']
    },
    {
      id: 'm7',
      title: 'Protection from All Harm',
      ar: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
      en: 'In the name of Allah with whose name nothing is harmed on earth nor in the heavens and He is The All-Hearing, The All-Knowing.',
      translit: 'Bismillahil-ladhi la yadurru ma\'asmihi shay\'un fil-ardi wa la fis-sama\' wa huwas-Sami\'ul-\'Alim',
      source: 'Abu Dawud 5088, Tirmidhi 3388',
      audio: null,
      benefits: ['Complete protection from all harm', 'Nothing can hurt you with Allah\'s permission', 'Said 3 times morning and evening']
    },
    {
      id: 'm8',
      title: 'Seeking Wellbeing',
      ar: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ',
      en: 'O Allah, I ask You for wellbeing in this world and the Hereafter.',
      translit: 'Allahumma inni as\'alukal-\'afiyata fid-dunya wal-akhirah',
      source: 'Ibn Majah 3871',
      audio: null,
      benefits: ['Health and safety in both worlds', 'Protection from trials and hardships', 'Most comprehensive dua for wellbeing']
    },
    {
      id: 'm9',
      title: 'Islamic Awakening',
      ar: 'أَصْبَحْنَا عَلَى فِطْرَةِ الْإِسْلَامِ، وَعَلَى كَلِمَةِ الْإِخْلَاصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ',
      en: 'We have entered the morning upon the natural religion of Islam, the word of sincerity, and the religion of our Prophet Muhammad ﷺ.',
      translit: 'Asbahna ala fitratil-Islam, wa ala kalimatil-ikhlas, wa ala dini nabiyyina Muhammadin sallallahu alayhi wa sallam',
      source: 'Ahmad 15360',
      audio: null,
      benefits: ['Affirming and renewing faith daily', 'Following the Sunnah of the Prophet ﷺ', 'Strengthens commitment to Islam']
    },
    {
      id: 'm10',
      title: 'Reliance on Allah',
      ar: 'حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
      en: 'Allah is sufficient for me. There is none worthy of worship but Him. I have placed my trust in Him, and He is Lord of the Majestic Throne.',
      translit: 'Hasbiyallahu la ilaha illa huwa alayhi tawakkaltu wa huwa rabbul arshil adheem',
      source: 'Abu Dawud 5081',
      audio: null,
      benefits: ['Allah suffices from worries', 'Removes anxiety and fear', 'Said 7 times for protection']
    },
    {
      id: 'm11',
      title: 'Contentment with Allah',
      ar: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صلى الله عليه وسلم نَبِيًّا',
      en: 'I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad ﷺ as my Prophet.',
      translit: 'Raditu billahi rabban, wa bil-Islami dinan, wa bi-Muhammadin sallallahu alayhi wa sallam nabiyyan',
      source: 'Abu Dawud 5072',
      audio: null,
      benefits: ['Paradise is guaranteed', 'Allah\'s pleasure is attained', 'Taste the sweetness of faith']
    },
    {
      id: 'm12',
      title: 'Seeking Beneficial Knowledge',
      ar: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا',
      en: 'O Allah, I ask You for beneficial knowledge, goodly provision, and accepted deeds.',
      translit: 'Allahumma inni as\'aluka \'ilman nafi\'an, wa rizqan tayyiban, wa \'amalan mutaqabbalan',
      source: 'Ibn Majah 925',
      audio: null,
      benefits: ['Beneficial knowledge that leads to action', 'Halal and blessed provision', 'Deeds accepted by Allah']
    },
    {
      id: 'm13',
      title: 'Waking Up Dua',
      ar: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
      en: 'All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.',
      translit: 'Alhamdu lillahil-ladhi ahyana ba\'da ma amatana wa ilayhin-nushur',
      source: 'Bukhari 6312',
      audio: null,
      benefits: ['First thing upon waking', 'Remembrance of death and resurrection', 'Gratitude for another day of life']
    },
    {
      id: 'm14',
      title: 'Seeking Forgiveness 100x',
      ar: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
      en: 'I seek Allah\'s forgiveness and repent to Him.',
      translit: 'Astaghfirullaha wa atubu ilayh',
      source: 'Bukhari 6307',
      audio: null,
      benefits: ['Prophet ﷺ said it 100 times daily', 'Removes sins continuously', 'Opens doors of mercy and provision']
    },
    {
      id: 'm15',
      title: 'SubhanAllah wa Bihamdihi',
      ar: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
      en: 'Glory be to Allah and praise Him.',
      translit: 'SubhanAllahi wa bihamdihi',
      source: 'Bukhari 6406, Muslim 2691',
      audio: null,
      benefits: ['100 times = all sins forgiven', 'A tree planted in Paradise for each time', 'Light on the tongue, heavy on scales']
    }
  ],
  evening: [
    {
      id: 'e1',
      title: 'Evening Protection',
      ar: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ',
      en: 'O Allah, by You we enter the evening, and by You we enter the morning, by You we live and by You we die, and to You is the final return.',
      translit: 'Allahumma bika amsayna, wa bika asbahna, wa bika nahya, wa bika namutu, wa ilaykal-masir',
      source: 'Tirmidhi 3391, Abu Dawud 5068',
      audio: null,
      benefits: ['Complete evening protection', 'Acknowledging Allah\'s control', 'Remembering final return to Allah']
    },
    {
      id: 'e2',
      title: 'Evening Sovereignty',
      ar: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ',
      en: 'We have entered the evening and the dominion belongs to Allah, and all praise is for Allah.',
      translit: 'Amsayna wa amsal-mulku lillah, walhamdu lillah',
      source: 'Muslim 2723',
      audio: null,
      benefits: ['Acknowledging Allah\'s complete sovereignty', 'Protection through the night', 'Praising Allah at day\'s end']
    },
    {
      id: 'e3',
      title: 'Evening Remembrance',
      ar: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ',
      en: 'O Allah, You are my Lord, there is none worthy of worship but You. You created me and I am Your slave, and I am keeping my covenant and promise to You as much as I can.',
      translit: 'Allahumma anta rabbi la ilaha illa ant, khalaqtani wa ana abduk, wa ana ala ahdika wa wa\'dika mastata\'t',
      source: 'Bukhari 6306',
      audio: null,
      benefits: ['Seeking forgiveness before sleep', 'Renewing covenant with Allah', 'Protection from sins and evil']
    },
    {
      id: 'e4',
      title: 'Evening Ayatul Kursi',
      ar: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ',
      en: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth.',
      translit: 'Allahu la ilaha illa huwal hayyul qayyum, la ta\'khudhuhu sinatun wa la nawm, lahu ma fis-samawati wa ma fil ard',
      source: 'Quran 2:255',
      audio: null,
      benefits: ['Protection from Shaytan until morning', 'Blessings and safety during sleep', 'Strongest verse for protection']
    },
    {
      id: 'e5',
      title: 'Evening Seeking Refuge',
      ar: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
      en: 'I seek refuge in the perfect words of Allah from the evil of what He has created.',
      translit: 'A\'udhu bikalimatillahit-tammati min sharri ma khalaq',
      source: 'Bukhari 6308',
      audio: null,
      benefits: ['Protection from all evil', 'Shield from harm of creatures', 'Recited for safety at night']
    },
    {
      id: 'e6',
      title: 'Evening Gratitude',
      ar: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
      en: 'O Allah, You are my Lord, there is no deity except You. You created me and I am Your servant, and I uphold Your covenant and promise as best I can. I seek refuge in You from the evil of what I have done. I acknowledge Your blessings upon me and I confess my sins, so forgive me, for none forgives sins except You.',
      translit: 'Allahumma anta rabbi la ilaha illa anta, khalaqtani wa ana abduk, wa ana ala ahdika wa wa\'dika mastata\'t, a\'udhu bika min sharri ma sana\'tu, abuu\'u laka bini\'matika alayya, wa abuu\'u bidhambi faghfir li, fa innahu la yaghfiru adh-dhunuba illa anta',
      source: 'Muslim 2717',
      audio: null,
      benefits: ['Seeking forgiveness and mercy', 'Acknowledging Allah\'s blessings', 'Protection from evil deeds']
    },
    {
      id: 'e7',
      title: 'Evening Remembrance of Death',
      ar: 'اللَّهُمَّ اجْعَلْ خَيْرَ عَمَلِي خَوَاتِيمَهُ',
      en: 'O Allah, make the best of my deeds the last of them.',
      translit: 'Allahumma aj\'al khayra \'amali khawatimahu',
      source: 'Tirmidhi 2396',
      audio: null,
      benefits: ['Reminder of death and accountability', 'Encouragement to end life with good deeds', 'Increases mindfulness of the Hereafter']
    },
    {
      id: 'e8',
      title: 'Evening Seeking Protection from Hellfire',
      ar: 'اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ',
      en: 'O Allah, save me from the Fire.',
      translit: 'Allahumma ajirni min an-nar',
      source: 'Bukhari 6309',
      audio: null,
      benefits: ['Protection from Hellfire', 'A short but powerful supplication', 'Recited for safety in the Hereafter']
    },
    {
      id: 'e9',
      title: 'Evening Seeking Refuge from Trials',
      ar: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ',
      en: 'O Allah, I seek refuge in You from worry and grief.',
      translit: 'Allahumma inni a\'udhu bika min al-hammi wal-hazan',
      source: 'Bukhari 6365',
      audio: null,
      benefits: ['Relief from anxiety and sadness', 'Comfort and peace of mind', 'Strength to face daily challenges']
    },
    {
      id: 'e10',
      title: 'Evening Seeking Refuge from Weakness',
      ar: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ',
      en: 'O Allah, I seek refuge in You from incapacity and laziness.',
      translit: 'Allahumma inni a\'udhu bika min al-\'ajzi wal-kasal',
      source: 'Bukhari 6365',
      audio: null,
      benefits: ['Seeking strength and energy', 'Avoiding laziness in worship and life', 'Encouragement to be productive']
    },
    {
      id: 'e11',
      title: 'Evening Seeking Refuge from Cowardice',
      ar: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ جُبْنِ',
      en: 'O Allah, I seek refuge in You from cowardice.',
      translit: 'Allahumma inni a\'udhu bika min jubn',
      source: 'Bukhari 6365',
      audio: null,
      benefits: ['Courage and bravery in life', 'Overcoming fear and hesitation', 'Strength in facing difficulties']
    },
    {
      id: 'e12',
      title: 'Evening Seeking Refuge from Debt',
      ar: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ',
      en: 'O Allah, I seek refuge in You from the burden of debt.',
      translit: 'Allahumma inni a\'udhu bika min ghalabatid-dayn',
      source: 'Bukhari 6365',
      audio: null,
      benefits: ['Relief from financial hardship', 'Protection from overwhelming debts', 'Peace of mind regarding sustenance']
    },
    {
      id: 'e13',
      title: 'Evening Seeking Refuge from Oppression',
      ar: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ قَسْوَةِ الْقَلْبِ',
      en: 'O Allah, I seek refuge in You from the hardness of heart.',
      translit: 'Allahumma inni a\'udhu bika min qaswatil-qalb',
      source: 'Bukhari 6365',
      audio: null,
      benefits: ['Softening the heart', 'Increasing love and compassion', 'Protection from spiritual hardness']
    },
    {
      id: 'e14',
      title: 'Evening Seeking Good in This World and Hereafter',
      ar: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
      en: 'Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire.',
      translit: 'Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan waqina 'adhaban-nar',
      source: 'Quran 2:201',
      audio: null,
      benefits: ['Comprehensive supplication for all good', 'Protection from Hellfire', 'Blessings in both worlds']
    },
    {
      id: 'e15',
      title: 'Evening Seeking Forgiveness',
      ar: 'أَسْتَغْفِرُ اللَّهَ رَبِّي مِنْ كُلِّ ذَنْبٍ وَأَتُوبُ إِلَيْهِ',
      en: 'I seek forgiveness from Allah, my Lord, from every sin I committed and I turn to Him in repentance.',
      translit: 'Astaghfirullaha rabbi min kulli dhanbin wa atubu ilayh',
      source: 'Muslim 2749',
      audio: null,
      benefits: ['Erasing sins', 'Renewing repentance', 'Purifying the heart before sleep']
    }
  ],
  bedtime: [
    {
      id: 'b1',
      title: 'Dua Before Sleeping',
      ar: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
      en: 'In Your name, O Allah, I die and I live.',
      translit: 'Bismika Allahumma amutu wa ahya',
      source: 'Bukhari 6320',
      audio: null,
      benefits: ['Protection during sleep', 'Acknowledging Allah\'s control over life and death', 'Peaceful rest']
    },
    {
      id: 'b2',
      title: 'Ayat Al-Kursi Before Sleep',
      ar: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ...',
      en: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence...',
      translit: 'Allahu la ilaha illa huwal hayyul qayyum ...',
      source: 'Quran 2:255',
      audio: null,
      benefits: ['Protection from Shaytan', 'Safety throughout the night', 'Blessings and mercy']
    },
    {
      id: 'b3',
      title: 'Last Two Verses of Surah Al-Baqarah',
      ar: 'آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ ...',
      en: 'The Messenger has believed in what was revealed to him from his Lord...',
      translit: 'Amanar-rasoolu bima unzila ilayhi min rabbihi ...',
      source: 'Quran 2:285-286',
      audio: null,
      benefits: ['Protection from evil', 'Forgiveness of sins', 'Blessings in the home']
    },
    {
      id: 'b4',
      title: 'Seeking Refuge from the Evil of Night',
      ar: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
      en: 'I seek refuge in the perfect words of Allah from the evil of what He has created.',
      translit: 'A\'udhu bikalimatillahit-tammati min sharri ma khalaq',
      source: 'Bukhari 6308',
      audio: null,
      benefits: ['Protection from all harm during sleep', 'Safety from evil creatures', 'Peaceful rest']
    },
    {
      id: 'b5',
      title: 'Dua for Good Dreams',
      ar: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ خَيْرِ هَذِهِ اللَّيْلَةِ ...',
      en: 'O Allah, I ask You for the good of this night and the good of what follows it...',
      translit: 'Allahumma inni as\'aluka min khayri hadhihil-laylah ...',
      source: 'Muslim 2718',
      audio: null,
      benefits: ['Good and peaceful dreams', 'Protection from nightmares', 'Blessings in sleep']
    },
    {
      id: 'b6',
      title: 'Dua for Forgiveness Before Sleep',
      ar: 'اللَّهُمَّ اغْفِرْ لِي وَارْحَمْنِي وَاهْدِنِي وَعَافِنِي',
      en: 'O Allah, forgive me, have mercy on me, guide me, and grant me health.',
      translit: 'Allahumma ighfir li warhamni wahdini wa \'afini',
      source: 'Tirmidhi 3518',
      audio: null,
      benefits: ['Seeking Allah\'s mercy', 'Forgiveness of sins', 'Good health and guidance']
    }
  ],
  after-prayer: [
    {
      id: 'ap1',
      title: 'Dua After Prayer',
      ar: 'اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ ...',
      en: 'O Allah, You are Peace and from You comes peace...',
      translit: 'Allahumma anta as-salam wa minka as-salam ...',
      source: 'Muslim 597',
      audio: null,
      benefits: ['Seeking peace and safety', 'Forgiveness of sins', 'Acceptance of prayers']
    },
    {
      id: 'ap2',
      title: 'Tasbih After Prayer',
      ar: 'سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ',
      en: 'Glory be to Allah, and praise be to Allah, and there is no deity but Allah, and Allah is the Greatest.',
      translit: 'SubhanAllah, walhamdulillah, wa la ilaha illa Allah, wallahu akbar',
      source: 'Bukhari 6406',
      audio: null,
      benefits: ['Remembrance of Allah', 'Forgiveness of sins', 'Increases reward']
    }
  ],
  protection: [
    {
      id: 'p1',
      title: 'Seeking Refuge from Evil',
      ar: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
      en: 'I seek refuge in Allah from the accursed Satan.',
      translit: 'A\'udhu billahi min ash-shaytanir rajim',
      source: 'Quran 16:98',
      audio: null,
      benefits: ['Protection from Shaytan', 'Prevents evil whisperings', 'Strengthens faith']
    }
  ],
  gratitude: [
    {
      id: 'g1',
      title: 'Gratitude to Allah',
      ar: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
      en: 'All praise is due to Allah, Lord of the worlds.',
      translit: 'Alhamdu lillahi rabbil \'alamin',
      source: 'Quran 1:2',
      audio: null,
      benefits: ['Expressing thankfulness', 'Recognizing Allah\'s blessings', 'Increases blessings']
    }
  ],
  travel: [
    {
      id: 't1',
      title: 'Dua for Travel',
      ar: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ',
      en: 'Glory be to Him who has subjected this to us, and we could never have it by our efforts.',
      translit: 'Subhana allathee sakhkhara lana hatha wa ma kunna lahu muqrinin',
      source: 'Quran 43:13',
      audio: null,
      benefits: ['Gratitude for safe travel', 'Seeking Allah\'s protection', 'Acknowledging Allah\'s power']
    }
  ],
  food: [
    {
      id: 'f1',
      title: 'Dua Before Eating',
      ar: 'بِسْمِ اللَّهِ',
      en: 'In the name of Allah.',
      translit: 'Bismillah',
      source: 'Sunan Abu Dawud 3764',
      audio: null,
      benefits: ['Blessing the food', 'Seeking barakah', 'Following the Sunnah']
    }
  ],
  home: [
    {
      id: 'h1',
      title: 'Dua When Entering Home',
      ar: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَوْلِجِ وَخَيْرَ الْمَخْرَجِ',
      en: 'O Allah, I ask You for the good of entering and the good of leaving.',
      translit: 'Allahumma inni as\'aluka khayral mawliji wa khayral makhraji',
      source: 'Bukhari 6323',
      audio: null,
      benefits: ['Seeking blessings in the home', 'Protection from harm', 'Peace and safety']
    }
  ],
  mosque: [
    {
      id: 'mo1',
      title: 'Dua When Entering Mosque',
      ar: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
      en: 'O Allah, open for me the doors of Your mercy.',
      translit: 'Allahumma iftah li abwaba rahmatik',
      source: 'Bukhari 450',
      audio: null,
      benefits: ['Seeking mercy in the mosque', 'Blessings in worship', 'Spiritual elevation']
    }
  ],
  forgiveness: [
    {
      id: 'f2',
      title: 'Seeking Forgiveness',
      ar: 'أَسْتَغْفِرُ اللَّهَ رَبِّي مِنْ كُلِّ ذَنْبٍ وَأَتُوبُ إِلَيْهِ',
      en: 'I seek forgiveness from Allah, my Lord, from every sin I committed and I turn to Him in repentance.',
      translit: 'Astaghfirullaha rabbi min kulli dhanbin wa atubu ilayh',
      source: 'Muslim 2749',
      audio: null,
      benefits: ['Erasing sins', 'Renewing repentance', 'Purifying the heart']
    }
  ],
  guidance: [
    {
      id: 'g2',
      title: 'Dua for Guidance',
      ar: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
      en: 'Guide us to the straight path.',
      translit: 'Ihdinas siratal mustaqim',
      source: 'Quran 1:6',
      audio: null,
      benefits: ['Seeking Allah\'s guidance', 'Staying on the right path', 'Avoiding misguidance']
    }
  ],
  general: [
    {
      id: 'gen1',
      title: 'General Dua for Blessings',
      ar: 'رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا',
      en: 'Our Lord, grant us from Yourself mercy and prepare for us from our affair right guidance.',
      translit: 'Rabbana atina min ladunka rahmatan wa hayyi\' lana min amrina rashada',
      source: 'Quran 18:10',
      audio: null,
      benefits: ['Seeking mercy and guidance', 'Blessings in affairs', 'Success in life']
    }
  ]
};
