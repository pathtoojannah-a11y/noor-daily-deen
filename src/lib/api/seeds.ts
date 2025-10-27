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
      benefits: ['Complete protection throughout the day', 'Acknowledging Allah\'s absolute control', 'Remembrance of resurrection']
    },
    {
      id: 'm2',
      title: 'Ayatul Kursi',
      ar: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ',
      en: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence.',
      translit: 'Allahu la ilaha illa huwal hayyul qayyum',
      source: 'Quran 2:255',
      audio: null,
      benefits: ['Greatest verse in Quran', 'Protection from Shaytan until evening', 'Blessings in all affairs']
    },
    {
      id: 'm3',
      title: 'Surah Al-Ikhlas',
      ar: 'قُلْ هُوَ اللَّهُ أَحَدٌ، اللَّهُ الصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
      en: 'Say: He is Allah, the One. Allah, the Eternal Refuge. He neither begets nor is born, nor is there to Him any equivalent.',
      translit: 'Qul huwallahu ahad, Allahus-samad, lam yalid wa lam yulad, wa lam yakun lahu kufuwan ahad',
      source: 'Quran 112',
      audio: null,
      benefits: ['Equals one-third of Quran in reward', 'Affirms pure monotheism', 'Protection when recited 3 times']
    },
    {
      id: 'm4',
      title: 'Surah Al-Falaq',
      ar: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ، مِن شَرِّ مَا خَلَقَ',
      en: 'Say: I seek refuge in the Lord of daybreak, from the evil of that which He created.',
      translit: 'Qul a\'udhu birabbil-falaq, min sharri ma khalaq',
      source: 'Quran 113',
      audio: null,
      benefits: ['Protection from all evil', 'Shield from magic', 'Safety from envy']
    },
    {
      id: 'm5',
      title: 'Surah An-Nas',
      ar: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ، مَلِكِ النَّاسِ، إِلَٰهِ النَّاسِ',
      en: 'Say: I seek refuge in the Lord of mankind, the Sovereign of mankind, the God of mankind.',
      translit: 'Qul a\'udhu birabbin-nas, malikin-nas, ilahin-nas',
      source: 'Quran 114',
      audio: null,
      benefits: ['Protection from evil whispers', 'Guards against doubts', 'Shield from jinn and evil humans']
    },
    {
      id: 'm6',
      title: 'Sayyidul Istighfar',
      ar: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ',
      en: 'O Allah, You are my Lord, there is none worthy of worship but You. You created me and I am Your slave.',
      translit: 'Allahumma anta rabbi la ilaha illa ant, khalaqtani wa ana abduk',
      source: 'Bukhari 6306',
      audio: null,
      benefits: ['Master supplication for forgiveness', 'Guarantees Paradise if said with certainty', 'Erases all sins']
    },
    {
      id: 'm7',
      title: 'Protection from All Harm',
      ar: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ',
      en: 'In the name of Allah with whose name nothing is harmed on earth nor in the heavens.',
      translit: 'Bismillahil-ladhi la yadurru ma\'asmihi shay\'un fil-ardi wa la fis-sama\'',
      source: 'Abu Dawud 5088, Tirmidhi 3388',
      audio: null,
      benefits: ['Complete protection from all harm', 'Nothing can hurt with Allah\'s permission', 'Said 3 times']
    },
    {
      id: 'm8',
      title: 'Seeking Wellbeing',
      ar: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ',
      en: 'O Allah, I ask You for wellbeing in this world and the Hereafter.',
      translit: 'Allahumma inni as\'alukal-\'afiyata fid-dunya wal-akhirah',
      source: 'Ibn Majah 3871',
      audio: null,
      benefits: ['Health and safety in both worlds', 'Protection from trials', 'Most comprehensive dua']
    },
    {
      id: 'm9',
      title: 'Islamic Awakening',
      ar: 'أَصْبَحْنَا عَلَى فِطْرَةِ الْإِسْلَامِ، وَعَلَى كَلِمَةِ الْإِخْلَاصِ',
      en: 'We have entered the morning upon the natural religion of Islam, the word of sincerity.',
      translit: 'Asbahna ala fitratil-Islam, wa ala kalimatil-ikhlas',
      source: 'Ahmad 15360',
      audio: null,
      benefits: ['Affirming faith daily', 'Following Sunnah', 'Strengthens Islam commitment']
    },
    {
      id: 'm10',
      title: 'Reliance on Allah',
      ar: 'حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ',
      en: 'Allah is sufficient for me. There is none worthy of worship but Him. I have placed my trust in Him.',
      translit: 'Hasbiyallahu la ilaha illa huwa alayhi tawakkaltu',
      source: 'Abu Dawud 5081',
      audio: null,
      benefits: ['Allah suffices from worries', 'Removes anxiety', 'Said 7 times for protection']
    },
    {
      id: 'm11',
      title: 'Contentment with Allah',
      ar: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ نَبِيًّا',
      en: 'I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad as my Prophet.',
      translit: 'Raditu billahi rabban, wa bil-Islami dinan, wa bi-Muhammadin nabiyyan',
      source: 'Abu Dawud 5072',
      audio: null,
      benefits: ['Paradise guaranteed', 'Allah\'s pleasure attained', 'Taste sweetness of faith']
    },
    {
      id: 'm12',
      title: 'Seeking Beneficial Knowledge',
      ar: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا',
      en: 'O Allah, I ask You for beneficial knowledge, goodly provision, and accepted deeds.',
      translit: 'Allahumma inni as\'aluka \'ilman nafi\'an, wa rizqan tayyiban, wa \'amalan mutaqabbalan',
      source: 'Ibn Majah 925',
      audio: null,
      benefits: ['Beneficial knowledge', 'Halal provision', 'Accepted deeds']
    },
    {
      id: 'm13',
      title: 'Waking Up Dua',
      ar: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
      en: 'All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.',
      translit: 'Alhamdu lillahil-ladhi ahyana ba\'da ma amatana wa ilayhin-nushur',
      source: 'Bukhari 6312',
      audio: null,
      benefits: ['First thing upon waking', 'Remembrance of death', 'Gratitude for life']
    },
    {
      id: 'm14',
      title: 'Seeking Forgiveness',
      ar: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
      en: 'I seek Allah\'s forgiveness and repent to Him.',
      translit: 'Astaghfirullaha wa atubu ilayh',
      source: 'Bukhari 6307',
      audio: null,
      benefits: ['Prophet said it 100 times daily', 'Removes sins continuously', 'Opens doors of mercy']
    },
    {
      id: 'm15',
      title: 'SubhanAllah wa Bihamdihi',
      ar: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
      en: 'Glory be to Allah and praise Him.',
      translit: 'SubhanAllahi wa bihamdihi',
      source: 'Bukhari 6406, Muslim 2691',
      audio: null,
      benefits: ['100 times equals all sins forgiven', 'Tree planted in Paradise', 'Light on tongue, heavy on scales']
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
      benefits: ['Complete evening protection', 'Acknowledging Allah\'s control', 'Remembering final return']
    },
    {
      id: 'e2',
      title: 'Evening Sovereignty',
      ar: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ',
      en: 'We have entered the evening and the dominion belongs to Allah, and all praise is for Allah.',
      translit: 'Amsayna wa amsal-mulku lillah, walhamdu lillah',
      source: 'Muslim 2723',
      audio: null,
      benefits: ['Acknowledging Allah\'s sovereignty', 'Protection through night', 'Praising Allah']
    },
    {
      id: 'e3',
      title: 'Evening Ayatul Kursi',
      ar: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ',
      en: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer.',
      translit: 'Allahu la ilaha illa huwal hayyul qayyum',
      source: 'Quran 2:255',
      audio: null,
      benefits: ['Protection throughout night', 'Guardian angel assigned', 'Shaytan cannot approach']
    },
    {
      id: 'e4',
      title: 'Three Quls Evening',
      ar: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
      en: 'Say: He is Allah, the One.',
      translit: 'Qul huwallahu ahad',
      source: 'Quran 112-114',
      audio: null,
      benefits: ['Recite 3 times each', 'Complete protection', 'Sufficient for evening']
    },
    {
      id: 'e5',
      title: 'Evening Witness',
      ar: 'اللَّهُمَّ إِنِّي أَمْسَيْتُ أُشْهِدُكَ وَأُشْهِدُ حَمَلَةَ عَرْشِكَ',
      en: 'O Allah, I have entered evening and call upon You and the bearers of Your Throne to bear witness.',
      translit: 'Allahumma inni amsaytu ushhiduka wa ushhidu hamalata \'arshik',
      source: 'Abu Dawud 5069',
      audio: null,
      benefits: ['Angels as witnesses', 'Declaration of faith', 'Protection from fire']
    },
    {
      id: 'e6',
      title: 'Evening Harm Protection',
      ar: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ',
      en: 'In the name of Allah with whose name nothing is harmed.',
      translit: 'Bismillahil-ladhi la yadurru ma\'asmihi shay\'',
      source: 'Tirmidhi 3388',
      audio: null,
      benefits: ['Nothing can harm you', 'Complete safety', 'Said 3 times']
    },
    {
      id: 'e7',
      title: 'Evening Sufficiency',
      ar: 'حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ',
      en: 'Allah is sufficient for me. I have placed my trust in Him.',
      translit: 'Hasbiyallahu la ilaha illa huwa alayhi tawakkaltu',
      source: 'Abu Dawud 5081',
      audio: null,
      benefits: ['Removes worries', 'Peace of mind', 'Seven times removes grief']
    },
    {
      id: 'e8',
      title: 'Evening Contentment',
      ar: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا',
      en: 'I am pleased with Allah as Lord, with Islam as religion.',
      translit: 'Raditu billahi rabban, wa bil-Islami dinan',
      source: 'Ahmad 17978',
      audio: null,
      benefits: ['Paradise guarantee', 'Allah\'s pleasure', 'Faith sweetness']
    },
    {
      id: 'e9',
      title: 'Evening Seeking Refuge',
      ar: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
      en: 'I seek refuge in the perfect words of Allah from the evil of what He created.',
      translit: 'A\'udhu bikalimatil-lahit-tammati min sharri ma khalaq',
      source: 'Muslim 2708',
      audio: null,
      benefits: ['Protection from all evil creatures', 'Safety during night', 'Three times for full protection']
    },
    {
      id: 'e10',
      title: 'Evening Mercy Request',
      ar: 'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ',
      en: 'O Ever-Living, O Sustainer, in Your mercy I seek relief.',
      translit: 'Ya Hayyu ya Qayyumu birahmatika astagheeth',
      source: 'Tirmidhi 3524',
      audio: null,
      benefits: ['Relief from distress', 'Opening of difficulties', 'Allah\'s mercy descends']
    },
    {
      id: 'e11',
      title: 'Evening Good Character',
      ar: 'اللَّهُمَّ اهْدِنِي لِأَحْسَنِ الْأَخْلَاقِ',
      en: 'O Allah, guide me to the best of character.',
      translit: 'Allahumma ihdini li-ahsanil-akhlaq',
      source: 'Muslim 771',
      audio: null,
      benefits: ['Good character development', 'Guidance to best behavior', 'Following Prophet\'s example']
    },
    {
      id: 'e12',
      title: 'Evening Protection Prayer',
      ar: 'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي',
      en: 'O Allah, grant me health in my body, grant me health in my hearing.',
      translit: 'Allahumma \'afini fi badani, Allahumma \'afini fi sam\'i',
      source: 'Abu Dawud 5090',
      audio: null,
      benefits: ['Physical health', 'Sensory protection', 'Complete wellbeing']
    },
    {
      id: 'e13',
      title: 'Evening Heart Softener',
      ar: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ قَلْبٍ لَا يَخْشَعُ',
      en: 'O Allah, I seek refuge in You from a heart that does not fear You.',
      translit: 'Allahumma inni a\'udhu bika min qalbin la yakhsha\'',
      source: 'Tirmidhi 3482',
      audio: null,
      benefits: ['Softening heart', 'Increasing khushoo', 'Protection from hardness']
    },
    {
      id: 'e14',
      title: 'Evening Comprehensive Dua',
      ar: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً',
      en: 'Our Lord, give us good in this world and good in the Hereafter.',
      translit: 'Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan',
      source: 'Quran 2:201',
      audio: null,
      benefits: ['Comprehensive supplication', 'Protection from Fire', 'Blessings in both worlds']
    },
    {
      id: 'e15',
      title: 'Evening Forgiveness',
      ar: 'أَسْتَغْفِرُ اللَّهَ رَبِّي مِنْ كُلِّ ذَنْبٍ',
      en: 'I seek forgiveness from Allah, my Lord, from every sin.',
      translit: 'Astaghfirullaha rabbi min kulli dhanb',
      source: 'Muslim 2749',
      audio: null,
      benefits: ['Erasing sins', 'Renewing repentance', 'Purifying heart before sleep']
    }
  ],
  bedtime: [
    {
      id: 'b1',
      title: 'Before Sleeping',
      ar: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
      en: 'In Your name, O Allah, I die and I live.',
      translit: 'Bismika Allahumma amutu wa ahya',
      source: 'Bukhari 6312',
      audio: null,
      benefits: ['Protection during sleep', 'Remembering Allah before rest', 'Metaphor for death and resurrection']
    },
    {
      id: 'b2',
      title: 'Ayatul Kursi Bedtime',
      ar: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ',
      en: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer.',
      translit: 'Allahu la ilaha illa huwal hayyul qayyum',
      source: 'Bukhari 2311',
      audio: null,
      benefits: ['Angel guards you all night', 'Shaytan cannot come near', 'Safe until morning']
    },
    {
      id: 'b3',
      title: 'Last Two Verses of Baqarah',
      ar: 'آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ',
      en: 'The Messenger believes in what has been revealed to him from his Lord.',
      translit: 'Amanar-rasulu bima unzila ilayhi mir-rabbihi',
      source: 'Bukhari 5009, Muslim 807',
      audio: null,
      benefits: ['Sufficient for the night', 'Complete protection', 'Angels guard you']
    },
    {
      id: 'b4',
      title: 'Surah Al-Mulk',
      ar: 'تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ',
      en: 'Blessed is He in whose hand is dominion.',
      translit: 'Tabarakal-ladhi biyadihil-mulk',
      source: 'Tirmidhi 2891',
      audio: null,
      benefits: ['Protection from grave punishment', 'Intercedes for reader', 'Read entire chapter']
    },
    {
      id: 'b5',
      title: 'Three Quls Bedtime',
      ar: 'قُلْ هُوَ اللَّهُ أَحَدٌ، قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ، قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
      en: 'Recite Surah Ikhlas, Falaq, and Nas.',
      translit: 'Qul huwallahu ahad, Qul a\'udhu birabbil-falaq, Qul a\'udhu birabbin-nas',
      source: 'Abu Dawud 5082',
      audio: null,
      benefits: ['Complete protection', 'Blow on hands and wipe body', 'Three times each']
    },
    {
      id: 'b6',
      title: 'Seeking Protection from Evil',
      ar: 'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ',
      en: 'O Allah, protect me from Your punishment on the Day You resurrect Your servants.',
      translit: 'Allahumma qini \'adhabaka yawma tab\'athu \'ibadak',
      source: 'Abu Dawud 5045',
      audio: null,
      benefits: ['Protection from punishment', 'Remembering Day of Judgment', 'Said 3 times']
    },
    {
      id: 'b7',
      title: 'Comprehensive Bedtime Dua',
      ar: 'اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ',
      en: 'O Allah, Knower of the unseen and seen, Creator of heavens and earth.',
      translit: 'Allahumma \'alimal-ghaybi wash-shahadah fatiras-samawati wal-ard',
      source: 'Abu Dawud 5067, Tirmidhi 3392',
      audio: null,
      benefits: ['Comprehensive protection', 'Affirming Allah\'s attributes', 'Shield from Shaytan']
    },
    {
      id: 'b8',
      title: 'Tasbih of Fatimah',
      ar: 'سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَاللَّهُ أَكْبَرُ',
      en: 'Glory be to Allah, and praise be to Allah, and Allah is the Greatest.',
      translit: 'SubhanAllah (33), Alhamdulillah (33), Allahu Akbar (34)',
      source: 'Bukhari 5362, Muslim 2727',
      audio: null,
      benefits: ['Better than a servant', 'Removes fatigue', 'Increases strength']
    },
    {
      id: 'b9',
      title: 'Seeking Allah\'s Side',
      ar: 'اللَّهُمَّ أَسْلَمْتُ نَفْسِي إِلَيْكَ',
      en: 'O Allah, I have submitted myself to You.',
      translit: 'Allahumma aslamtu nafsi ilayk',
      source: 'Bukhari 247',
      audio: null,
      benefits: ['Complete submission', 'Trusting Allah', 'Sleeping on right side']
    },
    {
      id: 'b10',
      title: 'Protection from Bad Dreams',
      ar: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ غَضَبِهِ وَعِقَابِهِ',
      en: 'I seek refuge in the perfect words of Allah from His anger and punishment.',
      translit: 'A\'udhu bikalimatil-lahit-tammati min ghadabihi wa \'iqabihi',
      source: 'Tirmidhi 3528',
      audio: null,
      benefits: ['Protection from nightmares', 'Peaceful sleep', 'Shield from evil']
    },
    {
      id: 'b11',
      title: 'Gathering Hands',
      ar: 'اللَّهُمَّ بِاسْمِكَ أَحْيَا وَأَمُوتُ',
      en: 'O Allah, in Your name I live and die.',
      translit: 'Allahumma bismika ahya wa amut',
      source: 'Bukhari 6314',
      audio: null,
      benefits: ['Mentioning Allah last', 'Protection while sleeping', 'Remembering mortality']
    },
    {
      id: 'b12',
      title: 'Night Prayer Intention',
      ar: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ',
      en: 'O Allah, I seek refuge in You from disbelief and poverty.',
      translit: 'Allahumma inni a\'udhu bika minal-kufri wal-faqr',
      source: 'Abu Dawud 5090',
      audio: null,
      benefits: ['Protection from disbelief', 'Safety from poverty', 'Preservation of faith']
    }
  ],
  'after-prayer': [
    {
      id: 'ap1',
      title: 'Astaghfirullah Three Times',
      ar: 'أَسْتَغْفِرُ اللَّهَ',
      en: 'I seek Allah\'s forgiveness (3 times).',
      translit: 'Astaghfirullah (3x)',
      source: 'Muslim 591',
      audio: null,
      benefits: ['Forgiveness for shortcomings in prayer', 'Erasing mistakes', 'Recommended after every prayer']
    },
    {
      id: 'ap2',
      title: 'Post-Prayer Dua',
      ar: 'اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ',
      en: 'O Allah, You are Peace and from You comes peace.',
      translit: 'Allahumma antas-salam wa minkas-salam',
      source: 'Muslim 592',
      audio: null,
      benefits: ['Seeking peace from Allah', 'Immediate post-prayer dhikr', 'Blessing and tranquility']
    },
    {
      id: 'ap3',
      title: 'SubhanAllah 33 Times',
      ar: 'سُبْحَانَ اللَّهِ',
      en: 'Glory be to Allah (33 times).',
      translit: 'SubhanAllah (33x)',
      source: 'Muslim 597',
      audio: null,
      benefits: ['Glorifying Allah', 'Light on tongue heavy on scale', 'Part of Tasbih after prayer']
    },
    {
      id: 'ap4',
      title: 'Alhamdulillah 33 Times',
      ar: 'الْحَمْدُ لِلَّهِ',
      en: 'All praise is for Allah (33 times).',
      translit: 'Alhamdulillah (33x)',
      source: 'Muslim 597',
      audio: null,
      benefits: ['Praising Allah', 'Gratitude for blessings', 'Increases provisions']
    },
    {
      id: 'ap5',
      title: 'Allahu Akbar 34 Times',
      ar: 'اللَّهُ أَكْبَرُ',
      en: 'Allah is the Greatest (34 times).',
      translit: 'Allahu Akbar (34x)',
      source: 'Muslim 597',
      audio: null,
      benefits: ['Magnifying Allah', 'Completing the 100 count', 'Great reward']
    },
    {
      id: 'ap6',
      title: 'La ilaha illallah',
      ar: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
      en: 'There is none worthy of worship but Allah alone, without partner.',
      translit: 'La ilaha illallahu wahdahu la sharika lah',
      source: 'Muslim 597',
      audio: null,
      benefits: ['Declaration of Tawheed', 'Sins forgiven even like sea foam', 'Completes the post-prayer adhkar']
    },
    {
      id: 'ap7',
      title: 'Ayatul Kursi After Prayer',
      ar: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ',
      en: 'Allah - there is no deity except Him, the Ever-Living.',
      translit: 'Allahu la ilaha illa huwal hayyul qayyum',
      source: 'Nasai 9928',
      audio: null,
      benefits: ['Nothing prevents Paradise except death', 'Immediate access to Paradise', 'Most powerful verse']
    },
    {
      id: 'ap8',
      title: 'Seeking Forgiveness',
      ar: 'اللَّهُمَّ اغْفِرْ لِي ذُنُوبِي',
      en: 'O Allah, forgive me my sins.',
      translit: 'Allahumma-ghfir li dhunubi',
      source: 'Muslim 771',
      audio: null,
      benefits: ['Seeking forgiveness', 'Humility after worship', 'Cleansing soul']
    },
    {
      id: 'ap9',
      title: 'Comprehensive Protection',
      ar: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',
      en: 'O Allah, help me remember You, thank You, and worship You well.',
      translit: 'Allahumma a\'inni \'ala dhikrika wa shukrika wa husni \'ibadatik',
      source: 'Abu Dawud 1522',
      audio: null,
      benefits: ['Help in remembering Allah', 'Assistance in gratitude', 'Excellence in worship']
    },
    {
      id: 'ap10',
      title: 'After Fajr Special',
      ar: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
      en: 'There is no deity but Allah alone without partner.',
      translit: 'La ilaha illallahu wahdahu la sharika lah (10x)',
      source: 'Tirmidhi 3474',
      audio: null,
      benefits: ['Ten good deeds recorded', 'Ten sins erased', 'Protection from Shaytan']
    },
    {
      id: 'ap11',
      title: 'After Maghrib Special',
      ar: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
      en: 'There is no deity but Allah alone.',
      translit: 'La ilaha illallahu wahdahu la sharika lah (10x after Maghrib)',
      source: 'Tirmidhi 3534',
      audio: null,
      benefits: ['House built in Paradise', 'Sins forgiven', 'Special time for acceptance']
    },
    {
      id: 'ap12',
      title: 'Seeking Best Outcome',
      ar: 'رَبِّ اغْفِرْ لِي',
      en: 'My Lord, forgive me.',
      translit: 'Rabbigh-fir li',
      source: 'Abu Dawud 1516',
      audio: null,
      benefits: ['Simple yet powerful', 'Always needed', 'Easy to remember']
    }
  ],
  protection: [
    {
      id: 'p1',
      title: 'The Fortress',
      ar: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
      en: 'I seek refuge in the perfect words of Allah from the evil of what He created.',
      translit: 'A\'udhu bikalimatil-lahit-tammati min sharri ma khalaq',
      source: 'Muslim 2708',
      audio: null,
      benefits: ['Protection from all harmful creatures', 'Shield from evil', 'Said 3 times']
    },
    {
      id: 'p2',
      title: 'From Magic and Envy',
      ar: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ',
      en: 'I seek refuge in the perfect words of Allah from every devil and poisonous creature.',
      translit: 'A\'udhu bikalimatil-lahit-tammah min kulli shaytanin wa hammah',
      source: 'Bukhari 3371',
      audio: null,
      benefits: ['Protection from devils', 'Safety from poison', 'Guardian angels assigned']
    },
    {
      id: 'p3',
      title: 'From Evil Eye',
      ar: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ غَضَبِهِ وَعِقَابِهِ',
      en: 'I seek refuge in the perfect words of Allah from His anger and punishment.',
      translit: 'A\'udhu bikalimatil-lahit-tammati min ghadabihi wa \'iqabihi',
      source: 'Tirmidhi 3528',
      audio: null,
      benefits: ['Protection from divine wrath', 'Safety from punishment', 'Peace of mind']
    },
    {
      id: 'p4',
      title: 'Entering Marketplace',
      ar: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ',
      en: 'There is no deity but Allah alone, His is the dominion and His is the praise.',
      translit: 'La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamd',
      source: 'Tirmidhi 3428',
      audio: null,
      benefits: ['Million good deeds', 'Million sins erased', 'Raised million ranks']
    },
    {
      id: 'p5',
      title: 'From Worry and Sadness',
      ar: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ',
      en: 'O Allah, I seek refuge in You from worry and sadness.',
      translit: 'Allahumma inni a\'udhu bika minal-hammi wal-hazan',
      source: 'Bukhari 6369',
      audio: null,
      benefits: ['Relief from anxiety', 'Removal of depression', 'Peace of heart']
    },
    {
      id: 'p6',
      title: 'From Laziness',
      ar: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ',
      en: 'O Allah, I seek refuge in You from weakness and laziness.',
      translit: 'Allahumma inni a\'udhu bika minal-\'ajzi wal-kasal',
      source: 'Bukhari 6369',
      audio: null,
      benefits: ['Energy and motivation', 'Removing laziness', 'Strength to act']
    },
    {
      id: 'p7',
      title: 'From Cowardice',
      ar: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ',
      en: 'O Allah, I seek refuge in You from cowardice and miserliness.',
      translit: 'Allahumma inni a\'udhu bika minal-jubni wal-bukhl',
      source: 'Bukhari 6374',
      audio: null,
      benefits: ['Bravery in right path', 'Generosity', 'Noble character']
    },
    {
      id: 'p8',
      title: 'From Debt Burden',
      ar: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ',
      en: 'O Allah, I seek refuge in You from overwhelming debt and oppression of men.',
      translit: 'Allahumma inni a\'udhu bika min ghalabatid-dayni wa qahrir-rijal',
      source: 'Bukhari 6368',
      audio: null,
      benefits: ['Relief from debt', 'Protection from oppression', 'Financial freedom']
    },
    {
      id: 'p9',
      title: 'From Trials',
      ar: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ',
      en: 'O Allah, I seek refuge in You from trials of life and death.',
      translit: 'Allahumma inni a\'udhu bika min fitnatil-mahya wal-mamat',
      source: 'Bukhari 1377',
      audio: null,
      benefits: ['Protection from all trials', 'Safe life and death', 'Steadfastness']
    },
    {
      id: 'p10',
      title: 'Complete Protection',
      ar: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ جَهْدِ الْبَلَاءِ',
      en: 'O Allah, I seek refuge in You from severe affliction.',
      translit: 'Allahumma inni a\'udhu bika min jahdil-bala\'',
      source: 'Bukhari 6347',
      audio: null,
      benefits: ['Protection from severe tests', 'Safety from calamities', 'Peace and security']
    }
  ],
  gratitude: [
    {
      id: 'g1',
      title: 'After Eating',
      ar: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ',
      en: 'All praise is for Allah who fed us, gave us drink, and made us Muslims.',
      translit: 'Alhamdulillahil-ladhi at\'amana wa saqana wa ja\'alana muslimin',
      source: 'Abu Dawud 3850',
      audio: null,
      benefits: ['Gratitude for food', 'Blessing on provision', 'Recognition of Islam blessing']
    },
    {
      id: 'g2',
      title: 'After Drinking Water',
      ar: 'الْحَمْدُ لِلَّهِ الَّذِي سَقَانَا عَذْبًا فُرَاتًا بِرَحْمَتِهِ',
      en: 'All praise is for Allah who gave us sweet water to drink by His mercy.',
      translit: 'Alhamdulillahil-ladhi saqana \'adhban furatan birahmatih',
      source: 'Ibn Majah 849',
      audio: null,
      benefits: ['Thanks for water', 'Recognizing Allah\'s mercy', 'Appreciating basics']
    },
    {
      id: 'g3',
      title: 'After Good News',
      ar: 'الْحَمْدُ لِلَّهِ الَّذِي بِنِعْمَتِهِ تَتِمُّ الصَّالِحَاتُ',
      en: 'All praise is for Allah by whose grace good things are completed.',
      translit: 'Alhamdulillahil-ladhi bini\'matihi tatimmus-salihat',
      source: 'Ibn Majah 3803',
      audio: null,
      benefits: ['Acknowledging Allah\'s favor', 'Gratitude for success', 'Blessings continue']
    },
    {
      id: 'g4',
      title: 'Seeing Someone Afflicted',
      ar: 'الْحَمْدُ لِلَّهِ الَّذِي عَافَانِي مِمَّا ابْتَلَاكَ بِهِ',
      en: 'All praise is for Allah who saved me from what He tested you with.',
      translit: 'Alhamdulillahil-ladhi \'afani mimma ibtalaka bihi',
      source: 'Tirmidhi 3432',
      audio: null,
      benefits: ['Gratitude for health', 'Protection from trials', 'Humility and mercy']
    },
    {
      id: 'g5',
      title: 'Upon Waking',
      ar: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا',
      en: 'All praise is for Allah who gave us life after death.',
      translit: 'Alhamdulillahil-ladhi ahyana ba\'da ma amatana',
      source: 'Bukhari 6312',
      audio: null,
      benefits: ['Gratitude for new day', 'Remembering resurrection', 'Starting day right']
    },
    {
      id: 'g6',
      title: 'New Clothes',
      ar: 'الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا وَرَزَقَنِيهِ',
      en: 'All praise is for Allah who clothed me with this and provided it without strength or power from me.',
      translit: 'Alhamdulillahil-ladhi kasani hadha wa razaqanihi',
      source: 'Abu Dawud 4023',
      audio: null,
      benefits: ['Gratitude for clothing', 'Past sins forgiven', 'Recognition of provision']
    },
    {
      id: 'g7',
      title: 'Entering Market',
      ar: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ',
      en: 'None has the right to be worshipped but Allah alone, His is the dominion and praise.',
      translit: 'La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamd',
      source: 'Tirmidhi 3428',
      audio: null,
      benefits: ['Million good deeds', 'Million sins forgiven', 'Rank raised million levels']
    },
    {
      id: 'g8',
      title: 'After Sneezing',
      ar: 'الْحَمْدُ لِلَّهِ',
      en: 'All praise is for Allah.',
      translit: 'Alhamdulillah',
      source: 'Bukhari 6224',
      audio: null,
      benefits: ['Sunnah after sneeze', 'Others say Yarhamukallah', 'Means May Allah have mercy on you']
    },
    {
      id: 'g9',
      title: 'General Gratitude',
      ar: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
      en: 'All praise is for Allah, Lord of all the worlds.',
      translit: 'Alhamdulillahi rabbil-\'alamin',
      source: 'Quran 1:2',
      audio: null,
      benefits: ['Comprehensive praise', 'Recognizing Allah as Lord', 'Best of speech']
    },
    {
      id: 'g10',
      title: 'Morning Gratitude',
      ar: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ',
      en: 'We have entered morning and dominion belongs to Allah, and all praise is for Allah.',
      translit: 'Asbahna wa asbahal-mulku lillah, walhamdulillah',
      source: 'Muslim 2723',
      audio: null,
      benefits: ['Morning blessing', 'Acknowledging sovereignty', 'Starting day with gratitude']
    }
  ],
  travel: [
    {
      id: 't1',
      title: 'Leaving Home',
      ar: 'بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
      en: 'In the name of Allah, I place my trust in Allah, there is no might nor power except with Allah.',
      translit: 'Bismillah, tawakkaltu \'alallah, la hawla wa la quwwata illa billah',
      source: 'Abu Dawud 5095',
      audio: null,
      benefits: ['Protection when leaving', 'Guided on path', 'Shaytan turns away']
    },
    {
      id: 't2',
      title: 'Mounting Ride',
      ar: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ',
      en: 'Glory to Him who subjected this to us, and we could never have it by our efforts.',
      translit: 'Subhanal-ladhi sakhkhara lana hadha wa ma kunna lahu muqrinin',
      source: 'Abu Dawud 2602',
      audio: null,
      benefits: ['Recognizing Allah\'s favor', 'Safe journey', 'Protection on vehicle']
    },
    {
      id: 't3',
      title: 'Travel Dua',
      ar: 'اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى',
      en: 'O Allah, we ask You on this journey for righteousness and piety.',
      translit: 'Allahumma inna nas\'aluka fi safarina hadhal-birra wat-taqwa',
      source: 'Muslim 1342',
      audio: null,
      benefits: ['Safe travel', 'Righteousness maintained', 'Easy journey']
    },
    {
      id: 't4',
      title: 'Entering New Town',
      ar: 'اللَّهُمَّ رَبَّ السَّمَاوَاتِ السَّبْعِ وَمَا أَظْلَلْنَ',
      en: 'O Allah, Lord of the seven heavens and what they shade.',
      translit: 'Allahumma rabbas-samawatis-sab\'i wa ma azlalna',
      source: 'Nasai 5426',
      audio: null,
      benefits: ['Protection in new place', 'Safety from its evil', 'Blessing in visit']
    },
    {
      id: 't5',
      title: 'Stopping to Rest',
      ar: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
      en: 'I seek refuge in the perfect words of Allah from the evil of what He created.',
      translit: 'A\'udhu bikalimatil-lahit-tammati min sharri ma khalaq',
      source: 'Muslim 2708',
      audio: null,
      benefits: ['Protection while stopped', 'Safety during rest', 'Shield from harm']
    },
    {
      id: 't6',
      title: 'High Place',
      ar: 'اللَّهُ أَكْبَرُ',
      en: 'Allah is the Greatest (when ascending).',
      translit: 'Allahu Akbar',
      source: 'Bukhari 2993',
      audio: null,
      benefits: ['Magnifying Allah', 'Seeking help in ascent', 'Protection on height']
    },
    {
      id: 't7',
      title: 'Low Place',
      ar: 'سُبْحَانَ اللَّهِ',
      en: 'Glory be to Allah (when descending).',
      translit: 'SubhanAllah',
      source: 'Bukhari 2993',
      audio: null,
      benefits: ['Glorifying Allah', 'Safety in descent', 'Humility in low place']
    },
    {
      id: 't8',
      title: 'Returning Home',
      ar: 'آيِبُونَ تَائِبُونَ عَابِدُونَ لِرَبِّنَا حَامِدُونَ',
      en: 'We return, repent, worship and praise our Lord.',
      translit: 'Ayibuna ta\'ibuna \'abiduna lirabbina hamidun',
      source: 'Bukhari 3085, Muslim 1342',
      audio: null,
      benefits: ['Returning with gratitude', 'Repenting for mistakes', 'Praising Allah for safe return']
    }
  ],
  food: [
    {
      id: 'f1',
      title: 'Before Eating',
      ar: 'بِسْمِ اللَّهِ',
      en: 'In the name of Allah.',
      translit: 'Bismillah',
      source: 'Bukhari 5376',
      audio: null,
      benefits: ['Blessing on food', 'Shaytan cannot share', 'Barakah in meal']
    },
    {
      id: 'f2',
      title: 'If Forgot Bismillah',
      ar: 'بِسْمِ اللَّهِ أَوَّلَهُ وَآخِرَهُ',
      en: 'In the name of Allah at its beginning and end.',
      translit: 'Bismillahi awwalahu wa akhirah',
      source: 'Abu Dawud 3767',
      audio: null,
      benefits: ['Correcting mistake', 'Still gets blessing', 'Never too late']
    },
    {
      id: 'f3',
      title: 'After Eating',
      ar: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ',
      en: 'All praise is for Allah who fed us, gave us drink, and made us Muslims.',
      translit: 'Alhamdulillahil-ladhi at\'amana wa saqana wa ja\'alana muslimin',
      source: 'Abu Dawud 3850, Tirmidhi 3458',
      audio: null,
      benefits: ['Gratitude for food', 'Sins forgiven', 'Recognizing blessing of Islam']
    },
    {
      id: 'f4',
      title: 'Comprehensive Food Dua',
      ar: 'الْحَمْدُ لِلَّهِ حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ',
      en: 'All praise is for Allah, abundant good and blessed praise.',
      translit: 'Alhamdulillahi hamdan kathiran tayyiban mubarakan fih',
      source: 'Bukhari 5458',
      audio: null,
      benefits: ['Abundant praise', 'Beautiful gratitude', 'Blessed food']
    },
    {
      id: 'f5',
      title: 'Guest Dua for Host',
      ar: 'اللَّهُمَّ بَارِكْ لَهُمْ فِيمَا رَزَقْتَهُمْ، وَاغْفِرْ لَهُمْ وَارْحَمْهُمْ',
      en: 'O Allah, bless them in what You have provided them, and forgive them and have mercy on them.',
      translit: 'Allahumma barik lahum fima razaqtahum, waghfir lahum warhamhum',
      source: 'Muslim 2042',
      audio: null,
      benefits: ['Blessing for host', 'Reward for hospitality', 'Mercy for both']
    },
    {
      id: 'f6',
      title: 'Before Drinking',
      ar: 'بِسْمِ اللَّهِ',
      en: 'In the name of Allah.',
      translit: 'Bismillah',
      source: 'Ibn Majah 3264',
      audio: null,
      benefits: ['Blessing on drink', 'Purity and health', 'Barakah']
    },
    {
      id: 'f7',
      title: 'After Drinking',
      ar: 'الْحَمْdُ لِلَّهِ',
      en: 'All praise is for Allah.',
      translit: 'Alhamdulillah',
      source: 'Bukhari 5456',
      audio: null,
      benefits: ['Gratitude for drink', 'Recognizing provision', 'Simple yet profound']
    },
    {
      id: 'f8',
      title: 'After Drinking Milk',
      ar: 'اللَّهُمَّ بَارِكْ لَنَا فِيهِ وَزِدْنَا مِنْهُ',
      en: 'O Allah, bless us in it and increase it for us.',
      translit: 'Allahumma barik lana fihi wa zidna minh',
      source: 'Abu Dawud 3730',
      audio: null,
      benefits: ['Special dua for milk', 'Asking for more', 'Blessing in nourishment']
    }
  ],
  home: [
    {
      id: 'h1',
      title: 'Entering Home',
      ar: 'بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا',
      en: 'In the name of Allah we enter, in the name of Allah we leave, and upon Allah our Lord we place our trust.',
      translit: 'Bismillahi walajna, wa bismillahi kharajna, wa \'alallahi rabbina tawakkalna',
      source: 'Abu Dawud 5096',
      audio: null,
      benefits: ['Blessing in home', 'Protection for family', 'Shaytan stays out']
    },
    {
      id: 'h2',
      title: 'Leaving Home',
      ar: 'بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
      en: 'In the name of Allah, I trust in Allah, there is no might or power except with Allah.',
      translit: 'Bismillah, tawakkaltu \'alallah, la hawla wa la quwwata illa billah',
      source: 'Abu Dawud 5095, Tirmidhi 3426',
      audio: null,
      benefits: ['Guided on path', 'Protected from harm', 'Shaytan turns away']
    },
    {
      id: 'h3',
      title: 'Entering Home at Night',
      ar: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَوْلَجِ وَخَيْرَ الْمَخْرَجِ',
      en: 'O Allah, I ask You for the best entering and the best exiting.',
      translit: 'Allahumma inni as\'aluka khayral-mawlaji wa khayral-makhraji',
      source: 'Abu Dawud 5096',
      audio: null,
      benefits: ['Best entry and exit', 'Protection day and night', 'Trust in Allah']
    },
    {
      id: 'h4',
      title: 'Entering Bathroom',
      ar: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبْثِ وَالْخَبَائِثِ',
      en: 'O Allah, I seek refuge in You from male and female devils.',
      translit: 'Allahumma inni a\'udhu bika minal-khubthi wal-khaba\'ith',
      source: 'Bukhari 142, Muslim 375',
      audio: null,
      benefits: ['Protection in bathroom', 'Shield from devils', 'Proper etiquette']
    },
    {
      id: 'h5',
      title: 'Leaving Bathroom',
      ar: 'غُفْرَانَكَ',
      en: 'I seek Your forgiveness.',
      translit: 'Ghufranaka',
      source: 'Abu Dawud 30, Tirmidhi 7',
      audio: null,
      benefits: ['Seeking forgiveness', 'Praising after relief', 'Completing process']
    },
    {
      id: 'h6',
      title: 'Going to Sleep',
      ar: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
      en: 'In Your name O Allah, I die and I live.',
      translit: 'Bismika Allahumma amutu wa ahya',
      source: 'Bukhari 6314',
      audio: null,
      benefits: ['Protection during sleep', 'Metaphor for death', 'Allah is first and last']
    }
  ],
  mosque: [
    {
      id: 'mo1',
      title: 'Entering Mosque',
      ar: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
      en: 'O Allah, open for me the doors of Your mercy.',
      translit: 'Allahumma iftah li abwaba rahmatika',
      source: 'Muslim 713',
      audio: null,
      benefits: ['Seeking Allah\'s mercy', 'Proper etiquette', 'Heart opens to worship']
    },
    {
      id: 'mo2',
      title: 'Leaving Mosque',
      ar: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ',
      en: 'O Allah, I ask You from Your bounty.',
      translit: 'Allahumma inni as\'aluka min fadlika',
      source: 'Muslim 713',
      audio: null,
      benefits: ['Seeking Allah\'s bounty', 'Gratitude after worship', 'Continued blessings']
    },
    {
      id: 'mo3',
      title: 'Adhan Response',
      ar: 'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ',
      en: 'I bear witness that there is no deity but Allah and Muhammad is the Messenger of Allah.',
      translit: 'Ashhadu alla ilaha illallah wa ashhadu anna Muhammadan rasulullah',
      source: 'Muslim 385',
      audio: null,
      benefits: ['Repeating after muadhdhin', 'Guaranteed Paradise', 'Following Sunnah']
    },
    {
      id: 'mo4',
      title: 'After Adhan',
      ar: 'اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ',
      en: 'O Allah, Lord of this perfect call and established prayer.',
      translit: 'Allahumma rabba hadhihid-da\'watit-tammah',
      source: 'Bukhari 614',
      audio: null,
      benefits: ['Prophet\'s intercession guaranteed', 'Said after adhan', 'Tremendous reward']
    },
    {
      id: 'mo5',
      title: 'Between Adhan and Iqamah',
      ar: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ وَأَعُوذُ بِكَ مِنَ النَّارِ',
      en: 'O Allah, I ask You for Paradise and seek refuge in You from the Fire.',
      translit: 'Allahumma inni as\'alukal-jannata wa a\'udhu bika minan-nar',
      source: 'Abu Dawud 521',
      audio: null,
      benefits: ['Dua not rejected', 'Special time of acceptance', 'Asking for ultimate goal']
    },
    {
      id: 'mo6',
      title: 'Sitting in Mosque',
      ar: 'سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ',
      en: 'Glory be to Allah, praise be to Allah, there is no deity but Allah, and Allah is the Greatest.',
      translit: 'SubhanAllah, walhamdulillah, wa la ilaha illallah, wallahu akbar',
      source: 'Bukhari 6406, Muslim 2691',
      audio: null,
      benefits: ['Best words to say', 'Waiting for prayer', 'Great reward']
    }
  ],
  forgiveness: [
    {
      id: 'fg1',
      title: 'Sayyidul Istighfar',
      ar: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ',
      en: 'O Allah, You are my Lord, there is no deity but You. You created me and I am Your servant.',
      translit: 'Allahumma anta rabbi la ilaha illa anta, khalaqtani wa ana \'abduka',
      source: 'Bukhari 6306',
      audio: null,
      benefits: ['Master of forgiveness', 'Paradise if said with certainty', 'All sins forgiven']
    },
    {
      id: 'fg2',
      title: 'Simple Istighfar',
      ar: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
      en: 'I seek forgiveness from Allah and repent to Him.',
      translit: 'Astaghfirullaha wa atubu ilayhi',
      source: 'Bukhari 6307',
      audio: null,
      benefits: ['Prophet said it 100 times daily', 'Easy and powerful', 'Opens doors of mercy']
    },
    {
      id: 'fg3',
      title: 'Complete Istighfar',
      ar: 'أَسْتَغْفِرُ اللَّهَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ',
      en: 'I seek forgiveness from Allah, there is no deity but Him, the Ever-Living, the Sustainer, and I repent to Him.',
      translit: 'Astaghfirullaha alladhi la ilaha illa huwal-Hayyul-Qayyumu wa atubu ilayh',
      source: 'Abu Dawud 1517, Tirmidhi 3577',
      audio: null,
      benefits: ['Sins forgiven even if you fled from battle', 'Complete forgiveness', 'Most comprehensive']
    },
    {
      id: 'fg4',
      title: 'Night Forgiveness',
      ar: 'اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي',
      en: 'O Allah, You are the Pardoner and You love to pardon, so pardon me.',
      translit: 'Allahumma innaka \'afuwwun tuhibbul-\'afwa fa\'fu \'anni',
      source: 'Tirmidhi 3513, Ibn Majah 3850',
      audio: null,
      benefits: ['Best dua for Laylatul Qadr', 'Seeking pardon not just forgiveness', 'Allah loves to pardon']
    },
    {
      id: 'fg5',
      title: 'Morning Forgiveness',
      ar: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ',
      en: 'I seek forgiveness from Allah the Magnificent, there is no deity but Him.',
      translit: 'Astaghfirullahal-\'Adhim alladhi la ilaha illa huw',
      source: 'Abu Dawud 1517',
      audio: null,
      benefits: ['Magnifying Allah while seeking forgiveness', 'Morning purification', 'Daily renewal']
    },
    {
      id: 'fg6',
      title: 'After Prayer Forgiveness',
      ar: 'أَسْتَغْفِرُ اللَّهَ',
      en: 'I seek Allah\'s forgiveness (3 times).',
      translit: 'Astaghfirullah (3x)',
      source: 'Muslim 591',
      audio: null,
      benefits: ['Forgiveness for prayer shortcomings', 'Humility after worship', 'Sunnah after salah']
    },
    {
      id: 'fg7',
      title: 'Forgiveness with Tawheed',
      ar: 'لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
      en: 'There is no deity but You, Glory be to You, indeed I have been of the wrongdoers.',
      translit: 'La ilaha illa anta subhanaka inni kuntu minath-thalimin',
      source: 'Tirmidhi 3505',
      audio: null,
      benefits: ['Dua of Prophet Yunus', 'Relief from every distress', 'Acknowledging mistakes']
    },
    {
      id: 'fg8',
      title: 'Seeking Pure Forgiveness',
      ar: 'رَبِّ اغْفِرْ لِي وَارْحَمْنِي وَتُبْ عَلَيَّ',
      en: 'My Lord, forgive me, have mercy on me, and accept my repentance.',
      translit: 'Rabbigh-fir li warhamni wa tub \'alayya',
      source: 'Abu Dawud 1516',
      audio: null,
      benefits: ['Asking for mercy with forgiveness', 'Complete submission', 'Simple and sincere']
    }
  ],
  guidance: [
    {
      id: 'gd1',
      title: 'Seeking Knowledge',
      ar: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا',
      en: 'O Allah, I ask You for beneficial knowledge.',
      translit: 'Allahumma inni as\'aluka \'ilman nafi\'an',
      source: 'Ibn Majah 925',
      audio: null,
      benefits: ['Seeking useful knowledge', 'Knowledge that leads to action', 'Not just information']
    },
    {
      id: 'gd2',
      title: 'Guidance to Truth',
      ar: 'اللَّهُمَّ أَرِنِي الْحَقَّ حَقًّا وَارْزُقْنِي اتِّبَاعَهُ',
      en: 'O Allah, show me truth as truth and grant me to follow it.',
      translit: 'Allahumma arinal-haqqa haqqan warzuqnit-tiba\'ah',
      source: 'Various scholars',
      audio: null,
      benefits: ['Seeing truth clearly', 'Ability to follow it', 'Protection from falsehood']
    },
    {
      id: 'gd3',
      title: 'Opening of Heart',
      ar: 'رَبِّ اشْرَحْ لِي صَدْرِي',
      en: 'My Lord, expand my chest for me.',
      translit: 'Rabbish-rah li sadri',
      source: 'Quran 20:25',
      audio: null,
      benefits: ['Opening of understanding', 'Ease in difficulty', 'Clarity of mind']
    },
    {
      id: 'gd4',
      title: 'Increase in Knowledge',
      ar: 'رَبِّ زِدْنِي عِلْمًا',
      en: 'My Lord, increase me in knowledge.',
      translit: 'Rabbi zidni \'ilma',
      source: 'Quran 20:114',
      audio: null,
      benefits: ['Always seeking more', 'Never satisfied with little', 'Continuous growth']
    },
    {
      id: 'gd5',
      title: 'Understanding',
      ar: 'اللَّهُمَّ فَهِّمْنِي',
      en: 'O Allah, grant me understanding.',
      translit: 'Allahumma fahhimni',
      source: 'Various scholars',
      audio: null,
      benefits: ['Deep comprehension', 'Not just memorization', 'Wisdom with knowledge']
    },
    {
      id: 'gd6',
      title: 'Guided to Best Character',
      ar: 'اللَّهُمَّ اهْدِنِي لِأَحْسَنِ الْأَخْلَاقِ',
      en: 'O Allah, guide me to the best of character.',
      translit: 'Allahumma ihdini li-ahsanil-akhlaq',
      source: 'Muslim 771',
      audio: null,
      benefits: ['Good character', 'Following Prophet\'s example', 'Beautiful behavior']
    },
    {
      id: 'gd7',
      title: 'Right Path',
      ar: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
      en: 'Guide us to the straight path.',
      translit: 'Ihdinas-siratal-mustaqim',
      source: 'Quran 1:6',
      audio: null,
      benefits: ['Most important request', 'Said 17 times daily minimum', 'Path of those blessed']
    },
    {
      id: 'gd8',
      title: 'Wisdom',
      ar: 'رَبِّ هَبْ لِي حُكْمًا',
      en: 'My Lord, grant me wisdom.',
      translit: 'Rabbi habli hukman',
      source: 'Quran 26:83',
      audio: null,
      benefits: ['Asking for wisdom', 'Sound judgment', 'Right decisions']
    }
  ],
  general: [
    {
      id: 'ge1',
      title: 'Most Comprehensive',
      ar: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
      en: 'Our Lord, give us good in this world and good in the Hereafter and protect us from punishment of the Fire.',
      translit: 'Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan waqina \'adhaban-nar',
      source: 'Quran 2:201',
      audio: null,
      benefits: ['Most comprehensive dua', 'Prophet said it most', 'Covers both worlds']
    },
    {
      id: 'ge2',
      title: 'For Parents',
      ar: 'رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
      en: 'My Lord, have mercy on them as they raised me when I was small.',
      translit: 'Rabbir-hamhuma kama rabbayani saghira',
      source: 'Quran 17:24',
      audio: null,
      benefits: ['Mercy for parents', 'Gratitude for upbringing', 'Repaying them']
    },
    {
      id: 'ge3',
      title: 'For Spouse and Children',
      ar: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ',
      en: 'Our Lord, grant us from our spouses and offspring comfort to our eyes.',
      translit: 'Rabbana hablana min azwajina wa dhurriyyatina qurrata a\'yun',
      source: 'Quran 25:74',
      audio: null,
      benefits: ['Righteous family', 'Joy in spouse and children', 'Making them leaders in taqwa']
    },
    {
      id: 'ge4',
      title: 'When in Distress',
      ar: 'لَا إِلَهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ',
      en: 'There is no deity but Allah, the Magnificent, the Forbearing.',
      translit: 'La ilaha illallahul-\'Adhimul-Halim',
      source: 'Bukhari 6345, Muslim 2730',
      audio: null,
      benefits: ['Relief from distress', 'Calm in difficulty', 'Peace of heart']
    },
    {
      id: 'ge5',
      title: 'Making Decision',
      ar: 'اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ',
      en: 'O Allah, I seek Your guidance through Your knowledge.',
      translit: 'Allahumma inni astakhiruka bi\'ilmik',
      source: 'Bukhari 1162',
      audio: null,
      benefits: ['Guidance in decisions', 'Istikhara prayer', 'Peace with choice']
    },
    {
      id: 'ge6',
      title: 'Accepting Qadr',
      ar: 'قَدَرُ اللَّهِ وَمَا شَاءَ فَعَلَ',
      en: 'It is the decree of Allah, and what He wills He does.',
      translit: 'Qadarullahi wa ma sha\'a fa\'al',
      source: 'Muslim 2664',
      audio: null,
      benefits: ['Accepting Allah\'s decree', 'Peace with outcome', 'Submission to will']
    },
    {
      id: 'ge7',
      title: 'Best Words',
      ar: 'لَا إِلَهَ إِلَّا اللَّهُ',
      en: 'There is no deity but Allah.',
      translit: 'La ilaha illallah',
      source: 'Bukhari 3435, Muslim 137',
      audio: null,
      benefits: ['Best words ever spoken', 'Key to Paradise', 'Heaviest on scales']
    },
    {
      id: 'ge8',
      title: 'For Every Need',
      ar: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
      en: 'Sufficient for us is Allah, and He is the best Disposer of affairs.',
      translit: 'Hasbunallahu wa ni\'mal-wakil',
      source: 'Bukhari 4563',
      audio: null,
      benefits: ['Complete reliance on Allah', 'Removing fear', 'Trust in best Planner']
    },
    {
      id: 'ge9',
      title: 'When Pleased',
      ar: 'الْحَمْدُ لِلَّهِ الَّذِي بِنِعْمَتِهِ تَتِمُّ الصَّالِحَاتُ',
      en: 'All praise is for Allah by whose favor good things are completed.',
      translit: 'Alhamdulillahil-ladhi bini\'matihi tatimmus-salihat',
      source: 'Ibn Majah 3803',
      audio: null,
      benefits: ['Gratitude for success', 'Acknowledging Allah\'s favor', 'Continued blessings']
    },
    {
      id: 'ge10',
      title: 'Protection All Times',
      ar: 'اللَّهُمَّ عَافِنِي فِي بَدَنِي',
      en: 'O Allah, grant me health in my body.',
      translit: 'Allahumma \'afini fi badani',
      source: 'Abu Dawud 5090',
      audio: null,
      benefits: ['Health in body', 'Wellbeing in hearing', 'Protection in sight']
    },
    {
      id: 'ge11',
      title: 'Constant Dhikr',
      ar: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ',
      en: 'Glory be to Allah and praise Him, Glory be to Allah the Magnificent.',
      translit: 'SubhanAllahi wa bihamdihi, SubhanAllahil-\'Adhim',
      source: 'Bukhari 6406, Muslim 2694',
      audio: null,
      benefits: ['Beloved to Allah', 'Light on tongue', 'Heavy on scales']
    },
    {
      id: 'ge12',
      title: 'Best Remembrance',
      ar: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
      en: 'There is no deity but Allah alone without partner, His is the dominion, His is the praise, and He is able to do all things.',
      translit: 'La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa \'ala kulli shay\'in qadir',
      source: 'Bukhari 6404, Muslim 2691',
      audio: null,
      benefits: ['100 times = reward of freeing 10 slaves', '100 good deeds recorded', '100 sins erased']
    }
  ]
};
