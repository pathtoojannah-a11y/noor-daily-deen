export interface HadithChapter {
  number: number;
  name: string;
  arabic: string;
  hadithRange: string;
}

export interface HadithBookMetadata {
  id: string;
  name: string;
  arabic: string;
  description: string;
  totalHadiths: number;
  chapters: HadithChapter[];
}

// Sahih al-Bukhari chapters
export const bukhariChapters: HadithChapter[] = [
  { number: 1, name: "Revelation", arabic: "كتاب بدء الوحى", hadithRange: "1 to 7" },
  { number: 2, name: "Belief", arabic: "كتاب الإيمان", hadithRange: "8 to 58" },
  { number: 3, name: "Knowledge", arabic: "كتاب العلم", hadithRange: "59 to 134" },
  { number: 4, name: "Ablutions (Wudu')", arabic: "كتاب الوضوء", hadithRange: "135 to 247" },
  { number: 5, name: "Bathing (Ghusl)", arabic: "كتاب الغسل", hadithRange: "248 to 293" },
  { number: 6, name: "Menstrual Periods", arabic: "كتاب الحيض", hadithRange: "294 to 333" },
  { number: 7, name: "Rubbing hands and feet with dust (Tayammum)", arabic: "كتاب التيمم", hadithRange: "334 to 348" },
  { number: 8, name: "Prayers (Salat)", arabic: "كتاب الصلاة", hadithRange: "349 to 520" },
  { number: 9, name: "Times of the Prayers", arabic: "كتاب مواقيت الصلاة", hadithRange: "521 to 602" },
  { number: 10, name: "Call to Prayers (Adhaan)", arabic: "كتاب الأذان", hadithRange: "603 to 875" },
  { number: 11, name: "Friday Prayer", arabic: "كتاب الجمعة", hadithRange: "876 to 941" },
  { number: 12, name: "Fear Prayer", arabic: "كتاب صلاة الخوف", hadithRange: "942 to 947" },
  { number: 13, name: "The Two Festivals (Eids)", arabic: "كتاب العيدين", hadithRange: "948 to 989" },
  { number: 14, name: "Witr Prayer", arabic: "كتاب الوتر", hadithRange: "990 to 1004" },
  { number: 15, name: "Invoking Allah for Rain (Istisqaa)", arabic: "كتاب الاستسقاء", hadithRange: "1005 to 1039" },
  { number: 16, name: "Eclipses", arabic: "كتاب الكسوف", hadithRange: "1040 to 1065" },
  { number: 17, name: "Prostration During Recital of Qur'an", arabic: "كتاب سجود القرآن", hadithRange: "1067 to 1079" },
  { number: 18, name: "Shortening the Prayers (At-Taqseer)", arabic: "كتاب التقصير", hadithRange: "1080 to 1119" },
  { number: 19, name: "Prayer at Night (Tahajjud)", arabic: "كتاب التهجد", hadithRange: "1120 to 1187" },
  { number: 20, name: "Virtues of Prayer at Masjid Makkah and Madinah", arabic: "كتاب فضل الصلاة فى مسجد مكة والمدينة", hadithRange: "1188 to 1197" },
  { number: 21, name: "Actions while Praying", arabic: "كتاب العمل فى الصلاة", hadithRange: "1198 to 1223" },
  { number: 22, name: "Forgetfulness in Prayer", arabic: "كتاب السهو", hadithRange: "1224 to 1236" },
  { number: 23, name: "Funerals (Al-Janaa'iz)", arabic: "كتاب الجنائز", hadithRange: "1237 to 1394" },
  { number: 24, name: "Obligatory Charity Tax (Zakat)", arabic: "كتاب الزكاة", hadithRange: "1395 to 1512" },
  { number: 25, name: "Hajj (Pilgrimage)", arabic: "كتاب الحج", hadithRange: "1513 to 1771" }
];

// Simplified metadata for other books (can be expanded later)
export const hadithBooksMetadata: Record<string, HadithBookMetadata> = {
  bukhari: {
    id: 'bukhari',
    name: 'Sahih al-Bukhari',
    arabic: 'صحيح البخاري',
    description: 'Sahih al-Bukhari is a collection of hadith compiled by Imam Muhammad al-Bukhari (d. 256 AH/870 CE) (rahimahullah). His collection is recognized by the overwhelming majority of the Muslim world to be the most authentic collection of reports of the Sunnah of the Prophet Muhammad (ﷺ). It contains over 7500 hadith (with repetitions) in 97 books.',
    totalHadiths: 7563,
    chapters: bukhariChapters
  },
  muslim: {
    id: 'muslim',
    name: 'Sahih Muslim',
    arabic: 'صحيح مسلم',
    description: 'Sahih Muslim is the second most authentic hadith collection after Sahih al-Bukhari. It was collected by Imam Muslim ibn al-Hajjaj (rahimahullah).',
    totalHadiths: 7563,
    chapters: []
  },
  abudawud: {
    id: 'abudawud',
    name: 'Sunan Abi Dawud',
    arabic: 'سنن أبي داود',
    description: 'Sunan Abi Dawud is one of the six major hadith collections, compiled by Imam Abu Dawud (rahimahullah). It focuses on legal hadith.',
    totalHadiths: 5274,
    chapters: []
  },
  tirmidhi: {
    id: 'tirmidhi',
    name: 'Jami\' at-Tirmidhi',
    arabic: 'جامع الترمذي',
    description: 'Jami\' at-Tirmidhi is one of the six major hadith collections, compiled by Imam at-Tirmidhi (rahimahullah).',
    totalHadiths: 3956,
    chapters: []
  },
  nasai: {
    id: 'nasai',
    name: 'Sunan an-Nasa\'i',
    arabic: 'سنن النسائي',
    description: 'Sunan an-Nasa\'i is one of the six major hadith collections, compiled by Imam an-Nasa\'i (rahimahullah).',
    totalHadiths: 5758,
    chapters: []
  },
  ibnmajah: {
    id: 'ibnmajah',
    name: 'Sunan Ibn Majah',
    arabic: 'سنن ابن ماجه',
    description: 'Sunan Ibn Majah is one of the six major hadith collections, compiled by Imam Ibn Majah (rahimahullah).',
    totalHadiths: 4341,
    chapters: []
  },
  malik: {
    id: 'malik',
    name: 'Muwatta Malik',
    arabic: 'موطأ مالك',
    description: 'Muwatta Malik is the earliest written collection of hadith, compiled by Imam Malik ibn Anas (rahimahullah).',
    totalHadiths: 1849,
    chapters: []
  },
  ahmad: {
    id: 'ahmad',
    name: 'Musnad Ahmad',
    arabic: 'مسند أحمد',
    description: 'Musnad Ahmad is a large collection of hadith compiled by Imam Ahmad ibn Hanbal (rahimahullah).',
    totalHadiths: 27647,
    chapters: []
  },
  darimi: {
    id: 'darimi',
    name: 'Sunan ad-Darimi',
    arabic: 'سنن الدارمي',
    description: 'Sunan ad-Darimi is an early hadith collection compiled by Imam ad-Darimi (rahimahullah).',
    totalHadiths: 3503,
    chapters: []
  }
};

export const getBookMetadata = (bookId: string): HadithBookMetadata | undefined => {
  return hadithBooksMetadata[bookId];
};
