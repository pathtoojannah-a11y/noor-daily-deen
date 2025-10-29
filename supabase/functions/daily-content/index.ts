import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const QURAN_BASE = 'https://quranapi.pages.dev/api';
const HADITH_BASE = 'https://hadithapi.pages.dev/api';
const HADITH_FALLBACK = 'https://random-hadith-generator.vercel.app/api/hadiths';

async function getRandomAyah() {
  try {
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
        arabic: randomAyah.arabic || randomAyah.text_ar || randomAyah.arText
      };
    }
  } catch (error) {
    console.error('Error fetching ayah:', error);
  }
  
  return {
    text: "Indeed, with hardship comes ease.",
    surah: "Ash-Sharh",
    numberInSurah: 6,
    arabic: "فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا"
  };
}

async function getRandomHadith() {
  try {
    const res = await fetch(`${HADITH_BASE}/random`);
    if (res.ok) {
      const data = await res.json();
      return {
        text: data.hadith || data.text || data.hadithText,
        source: data.book || data.source || 'Hadith Collection'
      };
    }
  } catch (error) {
    console.error('Primary hadith API failed:', error);
  }

  try {
    const res = await fetch(HADITH_FALLBACK);
    if (res.ok) {
      const data = await res.json();
      return {
        text: data.hadith || data.text,
        source: data.book || data.source || 'Hadith Collection'
      };
    }
  } catch (error) {
    console.error('Fallback hadith API failed:', error);
  }

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
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
