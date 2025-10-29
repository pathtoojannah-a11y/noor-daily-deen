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

const QURAN_BASE = 'https://quranapi.pages.dev/api';

export async function getRandomAyah(): Promise<AyahData> {
  try {
    // Get random surah (1-114)
    const randomSurah = Math.floor(Math.random() * 114) + 1;
    const res = await fetch(`${QURAN_BASE}/${randomSurah}.json`);
    const data = await res.json();
    
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

export async function getSurahList(): Promise<SurahData[]> {
  try {
    const res = await fetch(`${QURAN_BASE}/surah-list.json`);
    return await res.json();
  } catch (error) {
    console.error('Error fetching surah list:', error);
    return [];
  }
}

export async function getSurah(surahNumber: number): Promise<any> {
  try {
    const res = await fetch(`${QURAN_BASE}/${surahNumber}.json`);
    return await res.json();
  } catch (error) {
    console.error(`Error fetching surah ${surahNumber}:`, error);
    return null;
  }
}
