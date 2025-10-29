// Centralized API configuration with environment variables
const HADITH_BASE = import.meta.env.VITE_HADITH_BASE as string;
const HADITH_STATIC = import.meta.env.VITE_HADITH_STATIC as string;
const HADITH_KEY = import.meta.env.VITE_HADITH_API_KEY as string;
const RANDOM_HADITH = import.meta.env.VITE_RANDOM_HADITH as string;
const QURAN_BASE = import.meta.env.VITE_QURAN_BASE as string;
const QURAN_ALT = import.meta.env.VITE_QURAN_ALT as string;
const DUA_BASE = import.meta.env.VITE_DUA_API_BASE || 'https://dua-dhikr-two.vercel.app';

// Generic JSON fetcher with error handling
async function getJSON<T>(url: string): Promise<T> {
  const r = await fetch(url, { headers: { "accept": "application/json" } });
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  return r.json();
}

// ============= HADITH API =============

export interface HadithData {
  text: string;
  source: string;
  reference?: string;
  chapter?: string;
  hadithNumber?: number;
  arabic?: string;
  number?: number;
  book?: string;
}

export async function listHadithBooks() {
  try {
    const data = await getJSON<{ books: any[] }>(
      `${HADITH_BASE}/books?apiKey=${HADITH_KEY}`
    );
    return data.books;
  } catch {
    const data = await getJSON<{ books: any[] }>(`${HADITH_STATIC}/books`);
    return data.books;
  }
}

export async function listHadithChapters(bookSlug: string) {
  try {
    const data = await getJSON<{ chapters: any[] }>(
      `${HADITH_BASE}/${bookSlug}/chapters?apiKey=${HADITH_KEY}`
    );
    return data.chapters;
  } catch {
    const data = await getJSON<{ chapters: any[] }>(
      `${HADITH_STATIC}/${bookSlug}/chapters`
    );
    return data.chapters;
  }
}

export async function searchHadith(q: Record<string, string | number | undefined> = {}): Promise<HadithData[]> {
  const params = new URLSearchParams({ apiKey: HADITH_KEY });
  for (const [k, v] of Object.entries(q)) if (v !== undefined) params.set(k, String(v));
  
  try {
    const res = await getJSON<any>(`${HADITH_BASE}/hadiths?${params}`);
    // Handle pagination wrapper: { hadiths: { data: [...], ...pagination } }
    let arr: any[] = [];
    if (Array.isArray(res?.hadiths?.data)) {
      arr = res.hadiths.data;
    } else if (Array.isArray(res?.hadiths)) {
      arr = res.hadiths;
    }
    return arr;
  } catch {
    if (q.book && q.chapter != null) {
      const data = await getJSON<any>(
        `${HADITH_STATIC}/${q.book}/chapters/${q.chapter}`
      );
      if (Array.isArray(data.hadiths?.data)) {
        return data.hadiths.data;
      } else if (Array.isArray(data.hadiths)) {
        return data.hadiths;
      }
      return [];
    }
    throw new Error("Hadith search failed (primary + fallback).");
  }
}

export async function randomHadith(): Promise<HadithData> {
  try {
    const rnd = await getJSON<any>(`${RANDOM_HADITH}/api/hadiths/random`);
    const h = rnd?.hadith ?? rnd?.data ?? rnd;
    return {
      text: h?.english || h?.text || h?.hadithEnglish || '',
      arabic: h?.arabic || h?.hadithArabic,
      number: h?.number || h?.hadithNumber,
      book: h?.book?.slug || h?.bookSlug,
      source: h?.book?.name || h?.bookName || 'Hadith Collection'
    };
  } catch {
    const list = await searchHadith({ paginate: 50 });
    return list[Math.floor(Math.random() * Math.max(1, list.length))];
  }
}

export async function getDailyHadith(): Promise<HadithData> {
  return randomHadith();
}

export async function getHadithFromChapter(bookId: string, chapterId: number): Promise<HadithData[]> {
  try {
    const data = await searchHadith({ book: bookId, chapter: chapterId });
    return data.map((h: any) => ({
      text: h.hadithEnglish || h.hadith || h.text || '',
      arabic: h.hadithArabic || h.arabic,
      source: h.bookSlug || h.book || bookId,
      reference: h.reference,
      chapter: h.chapterNumber || h.chapter || String(chapterId),
      hadithNumber: h.hadithNumber || h.number
    }));
  } catch (error) {
    console.error('Error fetching hadith chapter:', error);
    return [];
  }
}

// ============= QUR'AN API =============

export interface AyahData {
  text: string;
  surah: string;
  numberInSurah: number | null;
  arabic?: string;
  audioUrl?: string;
}

export interface SurahData {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export async function getSurah(n: number): Promise<any> {
  try {
    const data = await getJSON(`${QURAN_BASE}/surah/${n}`);
    return data;
  } catch {
    try {
      const all = await getJSON<any>(QURAN_ALT);
      const match = all?.data?.find?.((s: any) => s.number === n) ?? all?.[n - 1];
      return { data: match ?? null };
    } catch (error) {
      console.error(`Error fetching surah ${n}:`, error);
      return null;
    }
  }
}

export async function getSurahList(): Promise<SurahData[]> {
  try {
    const data = await getJSON<SurahData[]>(`${QURAN_BASE}/surah-list.json`);
    return data;
  } catch (error) {
    console.error('Error fetching surah list:', error);
    return [];
  }
}

export async function getRandomAyah(): Promise<AyahData> {
  try {
    const randomSurah = Math.floor(Math.random() * 114) + 1;
    const data = await getSurah(randomSurah);
    
    const ayahs = data.ayahs || data.verses || [];
    if (ayahs.length > 0) {
      const randomAyah = ayahs[Math.floor(Math.random() * ayahs.length)];
      return {
        text: randomAyah.text || randomAyah.translation || '',
        surah: data.englishName || data.name || 'Surah',
        numberInSurah: randomAyah.numberInSurah || randomAyah.number || null,
        arabic: randomAyah.arabic || randomAyah.text_ar || randomAyah.arText,
        audioUrl: `/audio/alafasy/${randomSurah}/${randomAyah.numberInSurah}.mp3`
      };
    }
    
    throw new Error('No ayahs found');
  } catch (error) {
    console.error('Error fetching Qur\'an ayah:', error);
    return {
      text: "Indeed, with hardship comes ease.",
      surah: "Ash-Sharh",
      numberInSurah: 6,
      arabic: "فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا"
    };
  }
}

export async function getAyah(globalAyahNumber: number): Promise<any> {
  try {
    const data = await getJSON(`${QURAN_BASE}/ayah/${globalAyahNumber}`);
    return data;
  } catch (error) {
    console.error(`Error fetching ayah ${globalAyahNumber}:`, error);
    return null;
  }
}

// ============= DUA / ADHKAR API =============

export interface Category {
  slug: string;
  name: string;
  count: number;
  icon: string | null;
}

export interface Dua {
  id: string;
  title: string;
  ar: string;
  en: string;
  translit: string;
  source: string;
  audio: string | null;
  benefits: string[];
}

export async function listCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${DUA_BASE}/api/categories`);
    const json = await res.json();
    const arr = json.categories ?? json.data ?? [];
    if (arr.length === 0) {
      const { seedCategories } = await import('./api/seeds');
      return seedCategories;
    }
    return arr.map((c: any) => ({
      slug: c.slug || c.id || c.name?.toLowerCase()?.replace(/\s+/g, '-') || 'unknown',
      name: c.name || c.title || 'Category',
      count: c.count ?? c.total ?? 0,
      icon: c.icon ?? null
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    const { seedCategories } = await import('./api/seeds');
    return seedCategories;
  }
}

export async function getDuasByCategory(slug: string): Promise<Dua[]> {
  try {
    const res = await fetch(`${DUA_BASE}/api/duas?category=${encodeURIComponent(slug)}`);
    const json = await res.json();
    const arr = json.duas ?? json.data ?? [];
    if (arr.length === 0) {
      const { seedDuas } = await import('./api/seeds');
      return seedDuas[slug] || [];
    }
    return arr.map((d: any) => ({
      id: d.id ?? d.slug ?? crypto.randomUUID(),
      title: d.title ?? d.name ?? '',
      ar: d.arabic ?? d.textAr ?? d.ar ?? '',
      en: d.translation ?? d.textEn ?? d.en ?? '',
      translit: d.transliteration ?? d.translit ?? '',
      source: d.source ?? d.reference ?? '',
      audio: d.audio ?? null,
      benefits: Array.isArray(d.benefits) ? d.benefits : []
    }));
  } catch (error) {
    console.error('Error fetching duas:', error);
    const { seedDuas } = await import('./api/seeds');
    return seedDuas[slug] || [];
  }
}

export async function pickDuaFor(slot: 'morning' | 'evening' | 'bedtime'): Promise<Dua | null> {
  const slug = slot === 'morning' ? 'morning' : slot === 'evening' ? 'evening' : 'bedtime';
  const list = await getDuasByCategory(slug);
  return list[Math.floor(Math.random() * Math.max(1, list.length))] ?? null;
}

// ============= HADITH METADATA (Static) =============

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
    id: 'sahih-bukhari',
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
    ]
  },
  {
    id: 'sahih-muslim',
    name: 'Sahih Muslim',
    arabic: 'صحيح مسلم',
    description: 'Second most authentic hadith collection',
    chapters: [
      { number: 1, name: 'Faith', arabic: 'كتاب الإيمان', hadithRange: '1-380' },
      { number: 2, name: 'Purification', arabic: 'كتاب الطهارة', hadithRange: '381-631' },
      { number: 3, name: 'Menstruation', arabic: 'كتاب الحيض', hadithRange: '632-711' },
      { number: 4, name: 'Prayer', arabic: 'كتاب الصلاة', hadithRange: '712-1457' }
    ]
  }
];

export const getBookMetadata = (bookId: string): HadithBookMetadata | undefined => {
  return hadithBooksMetadata.find(book => book.id === bookId);
};

export const getAllBooks = (): HadithBookMetadata[] => {
  return hadithBooksMetadata;
};
