export interface HadithData {
  text: string;
  source: string;
  reference?: string;
  chapter?: string;
}

interface HadithBook {
  metadata: {
    name: string;
    section: string[];
  };
  hadiths: Array<{
    hadithnumber: number;
    arabicnumber: string;
    text: string;
    grades: Array<{ name: string; grade: string }>;
    reference?: {
      book: number;
      hadith: number;
    };
  }>;
}

// List of available hadith books
const HADITH_BOOKS = [
  'bukhari', 'muslim', 'abudawud', 'tirmidhi', 'nasai', 
  'ibnmajah', 'malik', 'ahmad', 'darimi'
];

// Fetch random hadith from available books
export async function getDailyHadith(): Promise<HadithData> {
  try {
    // Pick a random book
    const randomBook = HADITH_BOOKS[Math.floor(Math.random() * HADITH_BOOKS.length)];
    
    // Fetch the book data
    const response = await fetch(`/hadith/by_book/the_9_books/${randomBook}.json`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch hadith');
    }
    
    const bookData: HadithBook = await response.json();
    
    // Pick a random hadith from the book
    const randomIndex = Math.floor(Math.random() * bookData.hadiths.length);
    const hadith = bookData.hadiths[randomIndex];
    
    return {
      text: hadith.text,
      source: `${bookData.metadata.name} ${hadith.arabicnumber}`,
      reference: hadith.reference ? `Book ${hadith.reference.book}, Hadith ${hadith.reference.hadith}` : undefined,
      chapter: bookData.metadata.section?.[0]
    };
  } catch (error) {
    console.error('Error fetching hadith:', error);
    // Return a fallback hadith
    return fallbackHadiths[Math.floor(Math.random() * fallbackHadiths.length)];
  }
}

// Fetch hadith from specific book
export async function getHadithFromBook(bookName: string): Promise<HadithData[]> {
  try {
    const response = await fetch(`/hadith/by_book/the_9_books/${bookName}.json`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch hadith book');
    }
    
    const bookData: HadithBook = await response.json();
    
    return bookData.hadiths.map(h => ({
      text: h.text,
      source: `${bookData.metadata.name} ${h.arabicnumber}`,
      reference: h.reference ? `Book ${h.reference.book}, Hadith ${h.reference.hadith}` : undefined,
      chapter: bookData.metadata.section?.[0]
    }));
  } catch (error) {
    console.error('Error fetching hadith book:', error);
    return [];
  }
}

// Fetch hadith from specific chapter
export async function getHadithFromChapter(bookName: string, chapterId: number): Promise<HadithData[]> {
  try {
    const response = await fetch(`/hadith/by_chapter/the_9_books/${bookName}/${chapterId}.json`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch hadith chapter');
    }
    
    const bookData: HadithBook = await response.json();
    
    return bookData.hadiths.map(h => ({
      text: h.text,
      source: `${bookData.metadata.name} ${h.arabicnumber}`,
      reference: h.reference ? `Book ${h.reference.book}, Hadith ${h.reference.hadith}` : undefined,
      chapter: bookData.metadata.section?.[0]
    }));
  } catch (error) {
    console.error('Error fetching hadith chapter:', error);
    return [];
  }
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
