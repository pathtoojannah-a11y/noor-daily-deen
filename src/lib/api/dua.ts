export interface DuaData {
  textAr: string;
  textEn: string;
  type: 'morning' | 'evening' | 'bedtime';
}

const morning: DuaData[] = [
  {
    textAr: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ",
    textEn: "O Allah, by You we enter the morning, and by You we enter the evening, and by You we live, and by You we die, and to You is the resurrection.",
    type: "morning"
  },
  {
    textAr: "أَصْبَحْنَا عَلَى فِطْرَةِ الْإِسْلَامِ، وَعَلَى كَلِمَةِ الْإِخْلَاصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ",
    textEn: "We have entered the morning upon the natural religion of Islam, the word of sincerity, and the religion of our Prophet Muhammad ﷺ.",
    type: "morning"
  },
  {
    textAr: "اللَّهُمَّ إِنِّي أَصْبَحْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلَائِكَتَكَ، وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ لَا إِلَهَ إِلَّا أَنْتَ",
    textEn: "O Allah, I have entered the morning and call upon You, the bearers of Your Throne, Your angels and all creation to bear witness that surely You are Allah, there is none worthy of worship but You.",
    type: "morning"
  }
];

const evening: DuaData[] = [
  {
    textAr: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ",
    textEn: "O Allah, by You we enter the evening, and by You we enter the morning, and by You we live, and by You we die, and to You is the final return.",
    type: "evening"
  },
  {
    textAr: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ",
    textEn: "We have entered the evening and the dominion belongs to Allah, and all praise is for Allah.",
    type: "evening"
  },
  {
    textAr: "اللَّهُمَّ إِنِّي أَمْسَيْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلَائِكَتَكَ، وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ لَا إِلَهَ إِلَّا أَنْتَ",
    textEn: "O Allah, I have entered the evening and call upon You, the bearers of Your Throne, Your angels and all creation to bear witness that surely You are Allah, there is none worthy of worship but You.",
    type: "evening"
  }
];

const bedtime: DuaData[] = [
  {
    textAr: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    textEn: "In Your name, O Allah, I live and die.",
    type: "bedtime"
  },
  {
    textAr: "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ",
    textEn: "O Allah, protect me from Your punishment on the Day You resurrect Your servants.",
    type: "bedtime"
  },
  {
    textAr: "اللَّهُمَّ بِاسْمِكَ أَحْيَا وَأَمُوتُ",
    textEn: "O Allah, in Your name I live and die.",
    type: "bedtime"
  }
];

export function getDuaBySlot(slot: 'morning' | 'evening' | 'bedtime'): DuaData {
  const pool = slot === 'morning' ? morning : slot === 'evening' ? evening : bedtime;
  return pool[Math.floor(Math.random() * pool.length)];
}
