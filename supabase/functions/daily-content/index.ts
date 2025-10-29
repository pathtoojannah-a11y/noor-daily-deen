import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

const HADITH_KEY = Deno.env.get("HADITH_API_KEY") ?? "";
const HADITH_BASE = Deno.env.get("HADITH_BASE") ?? "https://hadithapi.com/public/api";
const HADITH_STATIC = "https://hadithapi.pages.dev/api";
const RANDOM_HADITH = "https://random-hadith-generator.vercel.app";
const QURAN_BASE = Deno.env.get("QURAN_BASE") ?? "https://quranapi.pages.dev/api";

async function getJSON<T>(url: string): Promise<T> {
  const r = await fetch(url, { headers: { accept: "application/json" } });
  if (!r.ok) {
    const body = await r.text().catch(() => "");
    throw { type: "FETCH_ERROR", url, status: r.status, statusText: r.statusText, body };
  }
  return r.json();
}

function explainError(e: unknown) {
  if (e instanceof Error) return { message: e.message, stack: e.stack };
  if (typeof e === 'object' && e !== null) {
    try { return { raw: JSON.stringify(e) }; } catch { return { raw: String(e) }; }
  }
  return { raw: String(e) };
}

async function getRandomAyah() {
  try {
    const randomSurah = Math.floor(Math.random() * 114) + 1;
    console.log(`Fetching Quran surah ${randomSurah} from ${QURAN_BASE}`);
    
    const data: any = await getJSON(`${QURAN_BASE}/surah/${randomSurah}`);
    const surahData = data?.data ?? data;
    const ayahs = surahData?.ayahs ?? surahData?.verses ?? [];
    
    if (ayahs.length > 0) {
      const randomIndex = Math.floor(Math.random() * ayahs.length);
      const randomAyah = ayahs[randomIndex];
      
      console.log(`✅ Successfully fetched ayah from ${surahData.englishName || surahData.name}`);
      return {
        text: randomAyah.translation || randomAyah.text || '',
        surah: surahData.englishName || surahData.name || 'Surah',
        numberInSurah: randomAyah.numberInSurah || randomAyah.number || null,
        arabic: randomAyah.text || randomAyah.arabic || randomAyah.text_ar
      };
    }
  } catch (error) {
    console.error('❌ Error fetching ayah:', explainError(error));
  }
  
  console.log('⚠️ Using fallback ayah');
  return {
    text: "Indeed, with hardship comes ease.",
    surah: "Ash-Sharh",
    numberInSurah: 6,
    arabic: "فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا"
  };
}

async function getRandomHadith() {
  if (!HADITH_KEY) {
    console.error('❌ Missing HADITH_API_KEY');
    return {
      text: "The best of you are those who are best to their families.",
      source: "Tirmidhi"
    };
  }

  // Try primary API with key
  try {
    const params = new URLSearchParams({
      apiKey: HADITH_KEY,
      book: "sahih-bukhari",
      chapter: "1",
      paginate: "50",
    });
    const res: any = await getJSON(`${HADITH_BASE}/hadiths?${params}`);
    const hadiths = Array.isArray(res?.hadiths?.data) ? res.hadiths.data : [];
    
    if (hadiths.length > 0) {
      const randomHadith = hadiths[Math.floor(Math.random() * hadiths.length)];
      console.log(`✅ Successfully fetched hadith from primary API`);
      return {
        text: randomHadith.hadithEnglish || randomHadith.hadith || randomHadith.text || 'Hadith text unavailable',
        source: randomHadith.bookSlug || randomHadith.book || 'Sahih Bukhari'
      };
    } else {
      console.warn(`⚠️ Primary hadith API returned empty data`);
    }
  } catch (error) {
    console.error('❌ Primary hadith API failed:', explainError(error));
  }

  // Try random API fallback
  try {
    console.log('Trying random hadith API');
    const res: any = await getJSON(`${RANDOM_HADITH}/api/hadiths/random`);
    const h = res?.hadith ?? res?.data ?? res;
    console.log('✅ Random hadith API succeeded');
    return {
      text: h?.english || h?.text || h?.hadithEnglish || 'Hadith text unavailable',
      source: h?.book?.name || h?.bookName || 'Hadith Collection'
    };
  } catch (error) {
    console.error('❌ Random hadith API failed:', explainError(error));
  }

  console.log('⚠️ Using fallback hadith');
  return {
    text: "The best of you are those who are best to their families.",
    source: "Tirmidhi"
  };
}

function getRandomDua() {
  const hour = new Date().getUTCHours();
  const duas = {
    morning: [
      {
        type: 'morning',
        textAr: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ',
        textEn: 'We have reached the morning and with it all sovereignty belongs to Allah. Praise is to Allah.'
      }
    ],
    evening: [
      {
        type: 'evening',
        textAr: 'اللَّهُمَّ بِكَ أَمْسَيْنَا',
        textEn: 'O Allah, by You we enter the evening...'
      }
    ]
  };
  const pool = hour < 12 ? duas.morning : duas.evening;
  return pool[0];
}

function getRandomDhikr() {
  const dhikrs = [
    { text: "Subḥān Allāh (سُبْحَانَ ٱللَّٰهِ)", target: 33 },
    { text: "Alḥamdulillāh (ٱلْحَمْدُ لِلَّٰهِ)", target: 33 },
    { text: "Allāhu Akbar (ٱللَّٰهُ أَكْبَرُ)", target: 34 }
  ];
  return dhikrs[Math.floor(Math.random() * dhikrs.length)];
}

function getReflectionPrompt() {
  const prompts = [
    "What are you grateful for today?",
    "How did you grow spiritually today?",
    "What act of kindness can you do tomorrow?",
    "What lesson did today teach you?",
    "How can you be closer to Allah tomorrow?"
  ];
  return prompts[Math.floor(Math.random() * prompts.length)];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
      throw new Error('Not authenticated');
    }

    const today = new Date().toISOString().split('T')[0];

    const { data: existing } = await supabaseClient
      .from('daily_content')
      .select('*')
      .eq('user_id', user.id)
      .eq('date', today)
      .maybeSingle();

    if (existing) {
      return new Response(JSON.stringify(existing), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const results = await Promise.allSettled([
      getRandomAyah(),
      getRandomHadith()
    ]);

    const [ayahR, hadithR] = results;

    // Check if any failed
    const failed = results.find(r => r.status === "rejected");
    
    let ayah, hadith;
    if (ayahR.status === "fulfilled") {
      ayah = ayahR.value;
    } else {
      console.error('Ayah fetch failed:', explainError(ayahR.reason));
      ayah = {
        text: "Indeed, with hardship comes ease.",
        surah: "Ash-Sharh",
        numberInSurah: 6,
        arabic: "فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا"
      };
    }

    if (hadithR.status === "fulfilled") {
      hadith = hadithR.value;
    } else {
      console.error('Hadith fetch failed:', explainError(hadithR.reason));
      hadith = {
        text: "The best of you are those who are best to their families.",
        source: "Tirmidhi"
      };
    }

    const content = {
      ayah,
      hadith,
      dua: getRandomDua(),
      dhikr: getRandomDhikr(),
      reflection_prompt: getReflectionPrompt()
    };

    const { data, error } = await supabaseClient
      .from('daily_content')
      .insert({
        user_id: user.id,
        date: today,
        ...content,
      })
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const errorDetails = explainError(error);
    console.error('❌ Edge function error:', errorDetails);
    
    return new Response(JSON.stringify({ 
      error: "Edge function error",
      ...errorDetails
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
