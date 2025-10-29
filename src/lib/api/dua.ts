export interface DuaData {
  textAr: string;
  textEn: string;
  type: 'morning' | 'evening' | 'bedtime';
  transliteration?: string;
  benefits?: string;
}

const DUA_BASE = 'https://dua-dhikr-two.vercel.app/api';

// Morning duas
const morning: DuaData[] = [
  {
    type: 'morning',
    textAr: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    textEn: 'We have reached the morning and with it all sovereignty belongs to Allah. Praise is to Allah. There is no god but Allah alone, with no partner or associate. To Him belong sovereignty and praise, and He has power over all things.',
    transliteration: 'Aṣbaḥnā wa aṣbaḥa-l-mulku li-llāh, wa-l-ḥamdu li-llāh, lā ilāha illā-llāhu waḥdahu lā sharīka lah, lahu-l-mulku wa lahu-l-ḥamdu wa huwa ʿalā kulli shay\'in qadīr',
    benefits: 'Whoever recites this will be protected until evening.'
  },
  {
    type: 'morning',
    textAr: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',
    textEn: 'O Allah, by You we enter the morning, and by You we enter the evening. By You we live, and by You we die, and to You is the resurrection.',
    transliteration: 'Allāhumma bika aṣbaḥnā, wa bika amsaynā, wa bika naḥyā, wa bika namūtu, wa ilayka-n-nushūr',
    benefits: 'This dua acknowledges Allah\'s complete control over our lives.'
  },
  {
    type: 'morning',
    textAr: 'أَصْبَحْنَا عَلَى فِطْرَةِ الْإِسْلَامِ، وَعَلَى كَلِمَةِ الْإِخْلَاصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ، حَنِيفًا مُسْلِمًا، وَمَا كَانَ مِنَ الْمُشْرِكِينَ',
    textEn: 'We have reached the morning upon the natural religion of Islam, the word of sincere devotion, the religion of our Prophet Muhammad (peace be upon him), and the way of our forefather Ibrahim, who turned away from all that is false, having surrendered to Allah, and he was not among the idolaters.',
    transliteration: 'Aṣbaḥnā ʿalā fiṭrati-l-islām, wa ʿalā kalimati-l-ikhlāṣ, wa ʿalā dīni nabiyyinā muḥammadin ṣallā-llāhu ʿalayhi wa sallam, wa ʿalā millati abīnā ibrāhīm, ḥanīfan musliman, wa mā kāna mina-l-mushrikīn'
  }
];

// Evening duas
const evening: DuaData[] = [
  {
    type: 'evening',
    textAr: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    textEn: 'We have reached the evening and with it all sovereignty belongs to Allah. Praise is to Allah. There is no god but Allah alone, with no partner or associate. To Him belong sovereignty and praise, and He has power over all things.',
    transliteration: 'Amsaynā wa amsā-l-mulku li-llāh, wa-l-ḥamdu li-llāh, lā ilāha illā-llāhu waḥdahu lā sharīka lah, lahu-l-mulku wa lahu-l-ḥamdu wa huwa ʿalā kulli shay\'in qadīr',
    benefits: 'Whoever recites this will be protected until morning.'
  },
  {
    type: 'evening',
    textAr: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ',
    textEn: 'O Allah, by You we enter the evening, and by You we enter the morning. By You we live, and by You we die, and to You is the final return.',
    transliteration: 'Allāhumma bika amsaynā, wa bika aṣbaḥnā, wa bika naḥyā, wa bika namūtu, wa ilayka-l-maṣīr',
    benefits: 'This dua acknowledges Allah\'s complete control over our lives.'
  }
];

// Bedtime duas
const bedtime: DuaData[] = [
  {
    type: 'bedtime',
    textAr: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    textEn: 'In Your name, O Allah, I die and I live.',
    transliteration: 'Bismika Allāhumma amūtu wa aḥyā',
    benefits: 'The Prophet ﷺ used to recite this before sleeping.'
  },
  {
    type: 'bedtime',
    textAr: 'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ',
    textEn: 'O Allah, protect me from Your punishment on the Day You resurrect Your servants.',
    transliteration: 'Allāhumma qinī ʿadhābaka yawma tabʿathu ʿibādak',
    benefits: 'Protection from the punishment of the grave.'
  },
  {
    type: 'bedtime',
    textAr: 'اللَّهُمَّ أَسْلَمْتُ نَفْسِي إِلَيْكَ، وَفَوَّضْتُ أَمْرِي إِلَيْكَ، وَوَجَّهْتُ وَجْهِي إِلَيْكَ، وَأَلْجَأْتُ ظَهْرِي إِلَيْكَ، رَغْبَةً وَرَهْبَةً إِلَيْكَ، لَا مَلْجَأَ وَلَا مَنْجَا مِنْكَ إِلَّا إِلَيْكَ، آمَنْتُ بِكِتَابِكَ الَّذِي أَنْزَلْتَ، وَبِنَبِيِّكَ الَّذِي أَرْسَلْتَ',
    textEn: 'O Allah, I submit myself to You, entrust my affairs to You, turn my face to You, and rely completely upon You, out of desire for You and fear of You. There is no refuge and no escape from You except to You. I believe in Your Book which You revealed, and Your Prophet whom You sent.',
    transliteration: 'Allāhumma aslamtu nafsī ilayk, wa fawwaḍtu amrī ilayk, wa wajjahtu wajhī ilayk, wa alja\'tu ẓahrī ilayk, raghbatan wa rahbatan ilayk, lā malja\'a wa lā manjā minka illā ilayk, āmantu bi-kitābika-lladhī anzalt, wa bi-nabiyyika-lladhī arsalt',
    benefits: 'Whoever recites this and dies that night will die upon the fitrah (natural state of Islam).'
  }
];

export function getDuaBySlot(slot: 'morning' | 'evening' | 'bedtime'): DuaData {
  const duas = slot === 'morning' ? morning : slot === 'evening' ? evening : bedtime;
  return duas[Math.floor(Math.random() * duas.length)];
}

// Fetch duas from API (with fallback to local data)
export async function fetchDuas(category?: string): Promise<DuaData[]> {
  try {
    const url = category ? `${DUA_BASE}/duas?category=${category}` : `${DUA_BASE}/duas`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      return data.duas || data;
    }
  } catch (error) {
    console.error('Error fetching duas from API:', error);
  }
  
  // Fallback to local data
  return [...morning, ...evening, ...bedtime];
}

export async function getDuaCategories(): Promise<string[]> {
  try {
    const res = await fetch(`${DUA_BASE}/categories`);
    if (res.ok) {
      const data = await res.json();
      return data.categories || [];
    }
  } catch (error) {
    console.error('Error fetching dua categories:', error);
  }
  return ['morning', 'evening', 'bedtime', 'gratitude', 'protection', 'forgiveness'];
}
