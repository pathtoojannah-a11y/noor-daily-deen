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
  chapters: HadithChapter[];
}

const hadithBooksMetadata: HadithBookMetadata[] = [
  {
    id: 'bukhari',
    name: 'Sahih al-Bukhari',
    arabic: 'صحيح البخاري',
    description: 'The most authentic collection of hadith',
    chapters: [
      { number: 1, name: 'Revelation', arabic: 'كتاب بدء الوحى', hadithRange: '1-7' },
      { number: 2, name: 'Belief', arabic: 'كتاب الإيمان', hadithRange: '8-58' },
      { number: 3, name: 'Knowledge', arabic: 'كتاب العلم', hadithRange: '59-134' },
      { number: 4, name: 'Ablutions (Wudu\')', arabic: 'كتاب الوضوء', hadithRange: '135-247' },
      { number: 5, name: 'Bathing (Ghusl)', arabic: 'كتاب الغسل', hadithRange: '248-293' },
      { number: 6, name: 'Menstrual Periods', arabic: 'كتاب الحيض', hadithRange: '294-333' },
      { number: 7, name: 'Rubbing hands and feet with dust (Tayammum)', arabic: 'كتاب التيمم', hadithRange: '334-348' },
      { number: 8, name: 'Prayers (Salat)', arabic: 'كتاب الصلاة', hadithRange: '349-520' },
      { number: 9, name: 'Times of the Prayers', arabic: 'كتاب مواقيت الصلاة', hadithRange: '521-602' },
      { number: 10, name: 'Call to Prayers (Adhaan)', arabic: 'كتاب الأذان', hadithRange: '603-875' },
      { number: 11, name: 'Friday Prayer', arabic: 'كتاب الجمعة', hadithRange: '876-941' },
      { number: 12, name: 'Fear Prayer', arabic: 'كتاب صلاة الخوف', hadithRange: '942-947' },
      { number: 13, name: 'The Two Festivals (Eids)', arabic: 'كتاب العيدين', hadithRange: '948-989' },
      { number: 14, name: 'Witr Prayer', arabic: 'كتاب الوتر', hadithRange: '990-1004' },
      { number: 15, name: 'Invoking Allah for Rain (Istisqaa)', arabic: 'كتاب الاستسقاء', hadithRange: '1005-1039' },
      { number: 16, name: 'Eclipses', arabic: 'كتاب الكسوف', hadithRange: '1040-1065' },
      { number: 17, name: 'Prostration During Recital of Qur\'an', arabic: 'كتاب سجود القرآن', hadithRange: '1067-1079' },
      { number: 18, name: 'Shortening the Prayers (At-Taqseer)', arabic: 'كتاب التقصير', hadithRange: '1080-1119' },
      { number: 19, name: 'Prayer at Night (Tahajjud)', arabic: 'كتاب التهجد', hadithRange: '1120-1187' },
      { number: 20, name: 'Virtues of Prayer at Masjid Makkah and Madinah', arabic: 'كتاب فضل الصلاة فى مسجد مكة والمدينة', hadithRange: '1188-1197' },
      { number: 21, name: 'Actions while Praying', arabic: 'كتاب العمل فى الصلاة', hadithRange: '1198-1223' },
      { number: 22, name: 'Forgetfulness in Prayer', arabic: 'كتاب السهو', hadithRange: '1224-1236' },
      { number: 23, name: 'Funerals (Al-Janaa\'iz)', arabic: 'كتاب الجنائز', hadithRange: '1237-1394' },
      { number: 24, name: 'Obligatory Charity Tax (Zakat)', arabic: 'كتاب الزكاة', hadithRange: '1395-1512' },
      { number: 25, name: 'Hajj (Pilgrimage)', arabic: 'كتاب الحج', hadithRange: '1513-1771' },
      { number: 26, name: '`Umrah (Minor pilgrimage)', arabic: 'كتاب العمرة', hadithRange: '1773-1805' },
      { number: 27, name: 'Pilgrims Prevented from Completing the Pilgrimage', arabic: 'كتاب المحصر', hadithRange: '1806-1820' },
      { number: 28, name: 'Penalty of Hunting while on Pilgrimage', arabic: 'كتاب جزاء الصيد', hadithRange: '1821-1866' },
      { number: 29, name: 'Virtues of Madinah', arabic: 'كتاب فضائل المدينة', hadithRange: '1867-1890' },
      { number: 30, name: 'Fasting', arabic: 'كتاب الصوم', hadithRange: '1891-2007' }
    ]
  },
  {
    id: 'muslim',
    name: 'Sahih Muslim',
    arabic: 'صحيح مسلم',
    description: 'Second most authentic hadith collection',
    chapters: [
      { number: 1, name: 'Faith', arabic: 'كتاب الإيمان', hadithRange: '1-380' },
      { number: 2, name: 'Purification', arabic: 'كتاب الطهارة', hadithRange: '381-631' },
      { number: 3, name: 'Menstruation', arabic: 'كتاب الحيض', hadithRange: '632-711' },
      { number: 4, name: 'Prayer', arabic: 'كتاب الصلاة', hadithRange: '712-1457' }
    ]
  },
  {
    id: 'abudawud',
    name: 'Sunan Abi Dawud',
    arabic: 'سنن أبي داود',
    description: 'Collection focused on Islamic jurisprudence',
    chapters: [
      { number: 1, name: 'Purification', arabic: 'كتاب الطهارة', hadithRange: '1-390' },
      { number: 2, name: 'Prayer', arabic: 'كتاب الصلاة', hadithRange: '391-1418' }
    ]
  },
  {
    id: 'tirmidhi',
    name: 'Jami\' at-Tirmidhi',
    arabic: 'جامع الترمذي',
    description: 'Comprehensive hadith collection',
    chapters: [
      { number: 1, name: 'Purification', arabic: 'أبواب الطهارة', hadithRange: '1-143' },
      { number: 2, name: 'Prayer', arabic: 'أبواب الصلاة', hadithRange: '144-676' }
    ]
  },
  {
    id: 'nasai',
    name: 'Sunan an-Nasa\'i',
    arabic: 'سنن النسائي',
    description: 'Collection emphasizing authenticity',
    chapters: [
      { number: 1, name: 'Purification', arabic: 'كتاب الطهارة', hadithRange: '1-405' },
      { number: 2, name: 'Times of Prayer', arabic: 'كتاب المواقيت', hadithRange: '406-649' }
    ]
  },
  {
    id: 'ibnmajah',
    name: 'Sunan Ibn Majah',
    arabic: 'سنن ابن ماجه',
    description: 'One of the six major hadith collections',
    chapters: [
      { number: 1, name: 'Purification', arabic: 'كتاب الطهارة وسننها', hadithRange: '1-661' },
      { number: 2, name: 'Prayer', arabic: 'كتاب إقامة الصلاة والسنة فيها', hadithRange: '662-1406' }
    ]
  }
];

export const getBookMetadata = (bookId: string): HadithBookMetadata | undefined => {
  return hadithBooksMetadata.find(book => book.id === bookId);
};

export const getAllBooks = (): HadithBookMetadata[] => {
  return hadithBooksMetadata;
};
