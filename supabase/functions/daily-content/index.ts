import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
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
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const today = new Date().toISOString().split('T')[0];

    // Check if today's content already exists
    const { data: existing } = await supabaseClient
      .from('daily_selection')
      .select('*')
      .eq('user_id', user.id)
      .eq('date', today)
      .maybeSingle();

    if (existing) {
      return new Response(JSON.stringify(existing), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fetch Qur'an ayah
    const quranBase = 'https://quran-api-one-gamma.vercel.app/api/quran';
    let ayah = { text: "Indeed, with hardship comes ease.", surah: "Ash-Sharh", numberInSurah: 6, arabic: "فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا" };
    
    try {
      const quranRes = await fetch(quranBase);
      const quranJson = await quranRes.json();
      const surahs = quranJson?.data?.surahs || quranJson?.surahs;
      if (Array.isArray(surahs) && surahs.length) {
        const s = surahs[Math.floor(Math.random() * surahs.length)];
        const ayahs = s.ayahs || s.verses || [];
        if (ayahs.length > 0) {
          const a = ayahs[Math.floor(Math.random() * ayahs.length)];
          ayah = {
            text: a.text ?? a.enText ?? a.translation ?? ayah.text,
            surah: s.englishName ?? s.name ?? ayah.surah,
            numberInSurah: a.numberInSurah ?? a.number ?? ayah.numberInSurah,
            arabic: a.arText ?? a.arabic ?? ayah.arabic
          };
        }
      }
    } catch (error) {
      console.error('Qur\'an API error:', error);
    }

    // Fetch Hadith
    const hadithApiKey = Deno.env.get('HADITH_API_KEY');
    let hadith = { text: "The best of you are those who are best to their families.", source: "Tirmidhi" };
    
    try {
      if (hadithApiKey) {
        const hadithUrl = `https://hadithapi.com/api/hadiths?apiKey=${encodeURIComponent(hadithApiKey)}&book=bukhari&paginate=1`;
        const hadithRes = await fetch(hadithUrl, { headers: { Accept: 'application/json' }});
        const hadithJson = await hadithRes.json();
        const h = hadithJson?.data?.hadiths?.[0];
        if (h) {
          hadith = {
            text: h.hadithEnglish ?? h.hadithArabic ?? hadith.text,
            source: h.reference ?? `${h.book?.name ?? 'Bukhari'} ${h.hadithNumber ?? ''}`.trim()
          };
        }
      }
    } catch (error) {
      console.error('Hadith API error:', error);
    }

    // Generate dua based on time of day
    const hour = new Date().getHours();
    const duaType = hour < 12 ? 'morning' : hour < 18 ? 'evening' : 'bedtime';
    const duas = {
      morning: [
        { textAr: "اللَّهُمَّ بِكَ أَصْبَحْنَا", textEn: "O Allah, by You we enter the morning...", type: "morning" }
      ],
      evening: [
        { textAr: "اللَّهُمَّ بِكَ أَمْسَيْنَا", textEn: "O Allah, by You we enter the evening...", type: "evening" }
      ],
      bedtime: [
        { textAr: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا", textEn: "In Your name, O Allah, I live and die.", type: "bedtime" }
      ]
    };
    const duaPool = duas[duaType];
    const dua = duaPool[Math.floor(Math.random() * duaPool.length)];

    // Dhikr
    const dhikr = { text: 'Subḥān Allāh (سُبْحَانَ ٱللَّٰهِ)', target: 33 };

    // Reflection prompt
    const prompts = [
      "What blessing did you notice today?",
      "How did you help someone today?",
      "What act of kindness can you do tomorrow?",
      "What are you grateful for today?",
      "How did you see Allah's mercy today?"
    ];
    const reflection_prompt = prompts[Math.floor(Math.random() * prompts.length)];

    // Save to database
    const { data: newSelection, error } = await supabaseClient
      .from('daily_selection')
      .insert({
        user_id: user.id,
        date: today,
        ayah,
        hadith,
        dua,
        dhikr,
        reflection_prompt
      })
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify(newSelection), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
