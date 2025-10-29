export interface HadithData {
  text: string;
  source: string;
  reference?: string;
  chapter?: string;
  hadithNumber?: number;
  isStory?: boolean;
}

const HADITH_BASE = 'https://hadithapi.pages.dev/api';
const HADITH_FALLBACK = 'https://random-hadith-generator.vercel.app/api/hadiths';
const HADITH_KEYED = 'https://hadithapi.com/api/hadiths/?apiKey=$2y$10$rVMbTeEQF25yBJvUPV78sujtfiHwbnMk7iEq9W5tMZy32OV7nAG';

// Fetch daily hadith with fallback logic
export async function getDailyHadith(): Promise<HadithData> {
  try {
    // Try primary API
    const res = await fetch(`${HADITH_BASE}/random`);
    if (res.ok) {
      const data = await res.json();
      return {
        text: data.hadith || data.text || data.hadithText,
        source: data.book || data.source || 'Hadith Collection',
        reference: data.reference || `${data.book} ${data.hadithNumber || ''}`,
        hadithNumber: data.hadithNumber || data.number
      };
    }
  } catch (error) {
    console.error('Primary hadith API failed:', error);
  }

  try {
    // Try fallback API
    const res = await fetch(HADITH_FALLBACK);
    if (res.ok) {
      const data = await res.json();
      return {
        text: data.hadith || data.text,
        source: data.book || data.source || 'Hadith Collection',
        reference: data.reference
      };
    }
  } catch (error) {
    console.error('Fallback hadith API failed:', error);
  }

  try {
    // Try keyed API
    const res = await fetch(HADITH_KEYED);
    if (res.ok) {
      const data = await res.json();
      const hadiths = data.hadiths || [];
      if (hadiths.length > 0) {
        const hadith = hadiths[Math.floor(Math.random() * hadiths.length)];
        return {
          text: hadith.hadithText || hadith.text,
          source: hadith.book || 'Hadith Collection',
          reference: hadith.reference,
          hadithNumber: hadith.hadithNumber
        };
      }
    }
  } catch (error) {
    console.error('Keyed hadith API failed:', error);
  }

  // Return fallback
  return fallbackHadiths[Math.floor(Math.random() * fallbackHadiths.length)];
}

// Get hadith stories (longer narrations)
export async function getHadithStory(): Promise<HadithData> {
  // Return one of the longer story hadiths
  const stories = fallbackHadiths.filter(h => h.text.length > 300);
  return stories[Math.floor(Math.random() * stories.length)];
}

// Fetch hadiths from specific book
export async function getHadithsFromBook(bookName: string, limit = 10): Promise<HadithData[]> {
  try {
    const res = await fetch(`${HADITH_BASE}/${bookName}?limit=${limit}`);
    if (res.ok) {
      const data = await res.json();
      const hadiths = data.hadiths || [];
      return hadiths.map((h: any) => ({
        text: h.hadith || h.text,
        source: h.book || bookName,
        reference: h.reference,
        hadithNumber: h.hadithNumber
      }));
    }
  } catch (error) {
    console.error(`Error fetching hadiths from ${bookName}:`, error);
  }
  return [];
}

// Fetch hadith from specific chapter
export async function getHadithFromChapter(bookId: string, chapterId: number): Promise<HadithData[]> {
  try {
    const res = await fetch(`${HADITH_BASE}/${bookId}/${chapterId}`);
    if (res.ok) {
      const data = await res.json();
      const hadiths = data.hadiths || [];
      return hadiths.map((h: any) => ({
        text: h.hadith || h.text,
        source: h.book || bookId,
        reference: h.reference,
        chapter: h.chapter,
        hadithNumber: h.hadithNumber
      }));
    }
  } catch (error) {
    console.error('Error fetching hadith chapter:', error);
  }
  return [];
}

export const fallbackHadiths: HadithData[] = [
  {
    text: "The Prophet Muhammad (ﷺ) said: 'A man once came to the Prophet and said, \"O Messenger of Allah, direct me to an act which, if I do it, will cause Allah to love me and people to love me.\" He replied, \"Renounce the world and Allah will love you, and renounce what people possess and people will love you.\" The man learned that true contentment comes not from accumulating possessions, but from detachment from worldly desires and focusing on what truly matters—one's relationship with Allah and good character with people.'",
    source: "Sunan Ibn Majah 4102"
  },
  {
    text: "A Bedouin came to the Prophet Muhammad (ﷺ) and said, 'Tell me of an act which will cause me to enter Paradise.' The Prophet said, 'Worship Allah and do not associate anything with Him, establish the prescribed prayer, pay the obligatory charity, and fast during Ramadan.' The man said, 'By Him in Whose hand is my soul, I will not add anything to this.' When he left, the Prophet said, 'Whoever would like to see a man from the people of Paradise, let him look at this man.' This shows that sincere commitment to the fundamentals of Islam, done with pure intention, is the key to Paradise.",
    source: "Sahih Bukhari 1397, Sahih Muslim 11"
  },
  {
    text: "The Prophet (ﷺ) said: 'A man had been afflicted with thirst while walking along a path when he found a well. He descended into it and drank his fill, then came out. There he saw a dog panting with thirst and licking the moist earth. The man said to himself, \"This dog is suffering from thirst just as I was.\" So he descended into the well again, filled his shoe with water, held it in his mouth, and climbed out to give the dog water to drink. Allah appreciated his action and forgave him his sins.' The Companions asked, 'O Messenger of Allah, is there reward for us in serving animals?' He replied, 'There is reward in serving every living being.' This teaches us that mercy and kindness to all of Allah's creation is a path to His forgiveness.",
    source: "Sahih Bukhari 2466, Sahih Muslim 2244"
  },
  {
    text: "The Messenger of Allah (ﷺ) said: 'There was a man who never did any good deed, but he used to deal with people and he would say to his servant: \"Take what can be taken easily and leave what is doubtful.\" When he died, Allah said to him: \"Did you ever do any good deed?\" He said: \"No, but I had a servant, and when I sent him to collect debts I said to him: 'Take what can be taken easily and leave what is in doubt,' hoping that You would overlook my sins.\" Allah said: \"I have overlooked them.\"' This shows that showing mercy and leniency to people, especially in financial matters, brings Allah's mercy upon us.",
    source: "Sahih Muslim 1560"
  },
  {
    text: "A man came to the Prophet (ﷺ) and said, 'O Messenger of Allah, I have committed a great sin. Is there any repentance for me?' The Prophet asked, 'Do you have a mother?' He said, 'No.' The Prophet asked, 'Do you have a maternal aunt?' He said, 'Yes.' The Prophet said, 'Then be dutiful to her.' This teaches us the immense value of maintaining family ties and showing kindness to relatives, especially to the maternal aunt who holds a position similar to the mother.",
    source: "Sunan Tirmidhi 1904"
  },
  {
    text: "The Prophet (ﷺ) said: 'Once a prostitute saw a dog going around a well on a hot day and hanging its tongue out with thirst. She drew some water for it in her shoe, and for that action, Allah forgave her sins.' The companions were amazed and said, 'O Messenger of Allah, is there a reward for us in serving animals?' He said, 'There is a reward for serving any living being.' This story teaches that even a single act of mercy and compassion, no matter who performs it, can lead to Allah's forgiveness, as Allah is Most Merciful and appreciates kindness to all His creation.",
    source: "Sahih Bukhari 3321"
  },
  {
    text: "The Prophet (ﷺ) said: 'A man never filled a container worse than his stomach. A few morsels that keep his back upright are sufficient for him. If he has to, then he should keep one-third for food, one-third for drink, and one-third for air.' This wisdom teaches moderation in eating, which is key to physical health and spiritual clarity. Overeating weighs down the body and heart, while eating moderately keeps one energetic for worship and good deeds.",
    source: "Sunan Ibn Majah 3349, Sunan Tirmidhi 2380"
  },
  {
    text: "The Messenger of Allah (ﷺ) said: 'The strong person is not the one who can wrestle others down. The strong person is the one who controls himself when he is angry.' A man once came to the Prophet and asked for advice. The Prophet said, 'Do not get angry.' The man repeated his request several times, and each time the Prophet replied, 'Do not get angry.' This shows that true strength lies not in physical power but in self-control, especially when faced with provocation. Anger can destroy relationships and lead to regret, while patience preserves dignity and earns Allah's pleasure.",
    source: "Sahih Bukhari 6114"
  },
  {
    text: "Abu Huraira reported that the Prophet (ﷺ) said: 'When Allah created the creation, He wrote in His Book, which is with Him above the Throne: \"My Mercy prevails over My Wrath.\"' This hadith brings immense hope to every believer. No matter how many sins we commit, Allah's mercy is greater. It encourages us never to despair of Allah's forgiveness and always to turn back to Him in repentance, knowing that He loves to forgive and is waiting for us to return.",
    source: "Sahih Bukhari 3194, Sahih Muslim 2751"
  },
  {
    text: "The Prophet (ﷺ) said: 'Whoever says SubhanAllah wa bihamdihi (Glory be to Allah and praise Him) one hundred times, his sins will be forgiven even if they are like the foam of the sea.' This simple dhikr, which takes only a few minutes, has immeasurable reward. It cleanses the heart, brings peace to the soul, and earns Allah's forgiveness. The Prophet ﷺ taught us that small consistent actions are better than large sporadic ones.",
    source: "Sahih Bukhari 6405, Sahih Muslim 2691"
  }
];
