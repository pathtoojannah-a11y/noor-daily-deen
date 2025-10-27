export interface AyahData {
  text: string;
  surah: string;
  numberInSurah: number | null;
  arabic?: string;
  audioUrl?: string;
}

export async function getRandomAyahFromCustomApi(): Promise<AyahData> {
  const base = import.meta.env.VITE_QURAN_BASE || 'https://quran-api-one-gamma.vercel.app/api/quran';
  
  try {
    const res = await fetch(base, { cache: 'no-store' });
    const json = await res.json();

    // Handle schemas like: { data: { surahs: [ { name, ayahs: [ { text, numberInSurah, ... } ] } ] } }
    const surahs = json?.data?.surahs || json?.surahs;
    if (Array.isArray(surahs) && surahs.length) {
      const s = surahs[Math.floor(Math.random() * surahs.length)];
      const ayahs = s.ayahs || s.verses || [];
      if (ayahs.length > 0) {
        const a = ayahs[Math.floor(Math.random() * ayahs.length)];
        return {
          text: a.text ?? a.enText ?? a.translation ?? '',
          surah: s.englishName ?? s.name ?? 'Surah',
          numberInSurah: a.numberInSurah ?? a.number ?? null,
          arabic: a.arText ?? a.arabic ?? undefined,
          audioUrl: a.audio ?? undefined
        };
      }
    }
    
    // Fallback shape: single ayah object
    const a = json?.data?.ayah || json?.ayah;
    if (a) {
      return {
        text: a.text,
        surah: a.surah?.englishName ?? a.surah?.name ?? 'Surah',
        numberInSurah: a.numberInSurah ?? null,
        arabic: a.arText ?? undefined,
        audioUrl: a.audio ?? undefined
      };
    }
    
    throw new Error('Unexpected Qur\'an API shape');
  } catch (error) {
    console.error('Error fetching Qur\'an ayah:', error);
    // Fallback ayah
    return {
      text: "Indeed, with hardship comes ease.",
      surah: "Ash-Sharh",
      numberInSurah: 6,
      arabic: "فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا"
    };
  }
}
