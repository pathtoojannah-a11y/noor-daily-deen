import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Using reliable, tested APIs
const QURAN_BASE = 'https://api.alquran.cloud/v1';
const HADITH_PRIMARY = 'https://api.hadith.gading.dev';
const HADITH_FALLBACK = 'https://random-hadith-generator.vercel.app';

async function getRandomAyah() {
  try {
    const randomSurah = Math.floor(Math.random() * 114) + 1;
    console.log(`Fetching Quran surah ${randomSurah}`);
    
    const res = await fetch(`${QURAN_BASE}/surah/${randomSurah}/editions/ar.alafasy,en.sahih`, {
      headers: { 'Accept': 'application/json' }
    });
    
    if (!res.ok) {
      throw new Error(`Quran API returned ${res.status}`);
    }
    
    const response = await res.json();
    const data = response.data[1]; // English translation is second edition
    const arabicData = response.data[0]; // Arabic is first edition
    
    if (data?.ayahs && data.ayahs.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.ayahs.length);
      const randomAyah = data.ayahs[randomIndex];
      const arabicAyah = arabicData?.ayahs?.[randomIndex];
      
      console.log(`✅ Successfully fetched ayah from ${data.englishName}`);
      return {
        text: randomAyah.text || '',
        surah: data.englishName || data.name || 'Surah',
        numberInSurah: randomAyah.numberInSurah || null,
        arabic: arabicAyah?.text || randomAyah.text
      };
    }
  } catch (error) {
    console.error('❌ Error fetching ayah:', error);
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
  // Try primary API (Gading.dev - reliable and tested)
  try {
    const collections = ['bukhari', 'muslim', 'abu-dawud', 'tirmidhi'];
    const randomCollection = collections[Math.floor(Math.random() * collections.length)];
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    
    console.log(`Fetching hadith from ${randomCollection}/${randomNumber}`);
    
    const res = await fetch(`${HADITH_PRIMARY}/books/${randomCollection}/${randomNumber}`, {
      headers: { 'Accept': 'application/json' }
    });
    
    if (res.ok) {
      const response = await res.json();
      const data = response.data;
      
      console.log(`✅ Successfully fetched hadith from ${randomCollection}`);
      return {
        text: data.contents?.en || data.hadith || 'Hadith text unavailable',
        source: `${data.name || randomCollection.charAt(0).toUpperCase() + randomCollection.slice(1)} ${data.number || randomNumber}`
      };
    } else {
      console.warn(`⚠️ Primary hadith API returned ${res.status}`);
    }
  } catch (error) {
    console.error('❌ Primary hadith API failed:', error);
  }

  // Try fallback API
  try {
    console.log('Trying fallback hadith API');
    const res = await fetch(HADITH_FALLBACK, {
      headers: { 'Accept': 'application/json' }
    });
    
    if (res.ok) {
      const data = await res.json();
      console.log('✅ Fallback hadith API succeeded');
      return {
        text: data.hadith?.englishNarration || data.hadith?.english || data.text || 'Hadith text unavailable',
        source: data.hadith?.book || data.source || 'Hadith Collection'
      };
    } else {
      console.warn(`⚠️ Fallback hadith API returned ${res.status}`);
    }
  } catch (error) {
    console.error('❌ Fallback hadith API failed:', error);
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

    const [ayah, hadith] = await Promise.all([
      getRandomAyah(),
      getRandomHadith()
    ]);

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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Edge function error:', errorMessage);
    console.error('Error details:', error);
    
    return new Response(JSON.stringify({ 
      error: errorMessage,
      details: error instanceof Error ? error.stack : String(error)
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
