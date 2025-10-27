// Seed data for offline/fallback use
import type { Category, Dua } from './adhkar';

export const seedCategories: Category[] = [
  { slug: 'morning', name: 'Morning Adhkār', count: 2, icon: '🌅' },
  { slug: 'evening', name: 'Evening Adhkār', count: 1, icon: '🌆' },
  { slug: 'bedtime', name: 'Bedtime Adhkār', count: 3, icon: '🌙' },
  { slug: 'prayer', name: 'Prayer', count: 1, icon: '🤲' },
  { slug: 'praising-allah', name: 'Praising Allah', count: 1, icon: '✨' },
  { slug: 'travel', name: 'Travel', count: 1, icon: '✈️' },
  { slug: 'joy-distress', name: 'Joy & Distress', count: 1, icon: '💚' },
  { slug: 'nature', name: 'Nature', count: 1, icon: '🌿' },
  { slug: 'home-family', name: 'Home & Family', count: 1, icon: '🏡' },
  { slug: 'good-etiquette', name: 'Good Etiquette', count: 1, icon: '🤝' },
  { slug: 'food-drink', name: 'Food & Drink', count: 1, icon: '🍽️' },
  { slug: 'sickness-death', name: 'Sickness & Death', count: 1, icon: '🩺' },
];

export const seedDuas: Record<string, Dua[]> = {
  morning: [
    {
      id: 'morning-1',
      title: 'Waking Up',
      ar: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
      en: 'All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.',
      translit: 'Alḥamdu lillāhi al-ladhī aḥyānā baʿda mā amātanā wa ilayhi an-nushūr',
      source: 'Bukhārī 6312',
      audio: null,
      benefits: ['Protection upon waking', 'Remembrance of resurrection']
    },
    {
      id: 'morning-2',
      title: 'Morning Protection',
      ar: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ',
      en: 'We have entered the morning and the dominion belongs to Allah, and all praise is for Allah.',
      translit: 'Aṣbaḥnā wa aṣbaḥa al-mulku lillāh, wal-ḥamdu lillāh',
      source: 'Muslim 2723',
      audio: null,
      benefits: ['Morning protection', 'Acknowledging Allah\'s sovereignty']
    },
  ],
  evening: [
    {
      id: 'evening-1',
      title: 'Evening Protection',
      ar: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ',
      en: 'We have entered the evening and the dominion belongs to Allah, and all praise is for Allah.',
      translit: 'Amsaynā wa amsā al-mulku lillāh, wal-ḥamdu lillāh',
      source: 'Muslim 2723',
      audio: null,
      benefits: ['Evening protection', 'Acknowledging Allah\'s sovereignty']
    },
  ],
  bedtime: [
    {
      id: 'bedtime-1',
      title: 'Before Sleep',
      ar: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
      en: 'In Your name O Allah, I die and I live.',
      translit: 'Bismika Allāhumma amūtu wa aḥyā',
      source: 'Bukhārī 6312',
      audio: null,
      benefits: ['Protection during sleep', 'Remembering Allah before rest']
    },
    {
      id: 'bedtime-2',
      title: 'Seeking Protection',
      ar: 'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ',
      en: 'O Allah, protect me from Your punishment on the Day You resurrect Your servants.',
      translit: 'Allāhumma qinī ʿadhābaka yawma tabʿathu ʿibādak',
      source: 'Abū Dāwūd 5045',
      audio: null,
      benefits: ['Seeking Allah\'s protection', 'Remembering the Day of Judgment']
    },
    {
      id: 'bedtime-3',
      title: 'Comprehensive Duʿāʾ',
      ar: 'اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ، فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ',
      en: 'O Allah, Knower of the unseen and the seen, Creator of the heavens and the earth, Lord and Sovereign of all things.',
      translit: 'Allāhumma ʿālim al-ghaybi wa-sh-shahādah, fāṭira as-samāwāti wa-l-arḍ, rabba kulli shay\'in wa malīkah',
      source: 'Abū Dāwūd 5067',
      audio: null,
      benefits: ['Comprehensive protection', 'Affirming Allah\'s attributes']
    },
  ],
  prayer: [
    {
      id: 'prayer-1',
      title: 'Before Prayer',
      ar: 'اللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنَ خَطَايَايَ',
      en: 'O Allah, separate me from my sins.',
      translit: 'Allāhumma bāʿid baynī wa bayna khaṭāyāya',
      source: 'Bukhārī 744',
      audio: null,
      benefits: ['Purification before prayer']
    },
  ],
  'praising-allah': [
    {
      id: 'praise-1',
      title: 'Tasbīḥ',
      ar: 'سُبْحَانَ اللَّهِ',
      en: 'Glory be to Allah.',
      translit: 'Subḥānallāh',
      source: 'Various',
      audio: null,
      benefits: ['Glorifying Allah', 'Easy yet immense reward']
    },
  ],
  travel: [
    {
      id: 'travel-1',
      title: 'Leaving Home',
      ar: 'بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
      en: 'In the name of Allah, I place my trust in Allah; there is no might nor power except with Allah.',
      translit: 'Bismillāh, tawakkaltu ʿalā Allāh, lā ḥawla wa lā quwwata illā billāh',
      source: 'Abū Dāwūd 5095',
      audio: null,
      benefits: ['Protection when leaving home', 'Trust in Allah']
    },
  ],
  'joy-distress': [
    {
      id: 'distress-1',
      title: 'In Times of Distress',
      ar: 'لَا إِلَهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ',
      en: 'There is no deity except Allah, the Magnificent, the Forbearing.',
      translit: 'Lā ilāha illā Allāh al-ʿaẓīm al-ḥalīm',
      source: 'Bukhārī 6345',
      audio: null,
      benefits: ['Relief from distress', 'Calm in difficulty']
    },
  ],
  nature: [
    {
      id: 'nature-1',
      title: 'Seeing Rain',
      ar: 'اللَّهُمَّ صَيِّبًا نَافِعًا',
      en: 'O Allah, make it beneficial rain.',
      translit: 'Allāhumma ṣayyiban nāfiʿan',
      source: 'Bukhārī 1032',
      audio: null,
      benefits: ['Blessing of rain']
    },
  ],
  'home-family': [
    {
      id: 'home-1',
      title: 'Entering Home',
      ar: 'بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا',
      en: 'In the name of Allah we enter, in the name of Allah we leave, and upon Allah our Lord we place our trust.',
      translit: 'Bismillāhi walajna, wa bismillāhi kharajna, wa ʿalā Allāhi rabbinā tawakkalnā',
      source: 'Abū Dāwūd 5096',
      audio: null,
      benefits: ['Blessing in the home', 'Protection for family']
    },
  ],
  'good-etiquette': [
    {
      id: 'etiquette-1',
      title: 'Before Eating',
      ar: 'بِسْمِ اللَّهِ',
      en: 'In the name of Allah.',
      translit: 'Bismillāh',
      source: 'Bukhārī 5376',
      audio: null,
      benefits: ['Blessing in food']
    },
  ],
  'food-drink': [
    {
      id: 'food-1',
      title: 'After Eating',
      ar: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ',
      en: 'All praise is for Allah who fed us and gave us drink, and made us Muslims.',
      translit: 'Alḥamdu lillāhi al-ladhī aṭʿamanā wa saqānā wa jaʿalanā muslimīn',
      source: 'Abū Dāwūd 3850',
      audio: null,
      benefits: ['Gratitude for provision']
    },
  ],
  'sickness-death': [
    {
      id: 'sickness-1',
      title: 'Visiting the Sick',
      ar: 'لَا بَأْسَ، طَهُورٌ إِنْ شَاءَ اللَّهُ',
      en: 'Do not worry, it will be a purification, if Allah wills.',
      translit: 'Lā ba\'s, ṭahūrun in shā\' Allāh',
      source: 'Bukhārī 3616',
      audio: null,
      benefits: ['Comfort for the sick']
    },
  ],
};
