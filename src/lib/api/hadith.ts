export interface HadithData {
  text: string;
  source: string;
}

export async function getDailyHadith(): Promise<HadithData> {
  // This will be called from the backend edge function
  // This is just a type definition file
  return {
    text: "",
    source: ""
  };
}

export const fallbackHadiths: HadithData[] = [
  {
    text: "The Prophet Muhammad (ﷺ) said: A man once came to the Prophet and said, 'O Messenger of Allah, direct me to an act which, if I do it, will cause Allah to love me and people to love me.' He replied, 'Renounce the world and Allah will love you, and renounce what people possess and people will love you.' The man learned that true contentment comes not from accumulating possessions, but from detachment from worldly desires and focusing on what truly matters—one's relationship with Allah and good character with people.",
    source: "Ibn Majah"
  },
  {
    text: "A Bedouin came to the Prophet Muhammad (ﷺ) and said, 'Tell me of an act which will cause me to enter Paradise.' The Prophet said, 'Worship Allah and do not associate anything with Him, establish the prescribed prayer, pay the obligatory charity, and fast during Ramadan.' The man said, 'By Him in Whose hand is my soul, I will not add anything to this.' When he left, the Prophet said, 'Whoever would like to see a man from the people of Paradise, let him look at this man.' This shows that sincere commitment to the fundamentals of Islam, done with pure intention, is the key to Paradise.",
    source: "Bukhari & Muslim"
  },
  {
    text: "The Prophet (ﷺ) said: A man had been afflicted with thirst while walking along a path when he found a well. He descended into it and drank his fill, then came out. There he saw a dog panting with thirst and licking the moist earth. The man said to himself, 'This dog is suffering from thirst just as I was.' So he descended into the well again, filled his shoe with water, held it in his mouth, and climbed out to give the dog water to drink. Allah appreciated his action and forgave him his sins. The Companions asked, 'O Messenger of Allah, is there reward for us in serving animals?' He replied, 'There is reward in serving every living being.' This teaches us that mercy and kindness to all of Allah's creation is a path to His forgiveness.",
    source: "Bukhari & Muslim"
  },
  {
    text: "The Prophet Muhammad (ﷺ) said: During one of the battles, a Companion found a bag full of dates and decided to eat them before the battle, as he was very hungry. After eating a few, he paused and thought to himself, 'What am I doing? Am I holding myself back from Paradise for the sake of these dates? What is the value of life if I do not attain Paradise?' He then threw away the dates, picked up his sword, and rushed into battle, fighting until he was martyred. The Prophet said about him, 'He did a little deed but Allah rewarded him with Paradise.' This story reminds us that the true value of life lies in striving for the Hereafter, not in temporary worldly pleasures.",
    source: "Muslim"
  },
  {
    text: "A man came to the Prophet (ﷺ) and said, 'O Messenger of Allah, I have committed a great sin. Is there any repentance for me?' The Prophet asked, 'Do you have a mother?' He said, 'No.' The Prophet asked, 'Do you have a maternal aunt?' He said, 'Yes.' The Prophet said, 'Then be dutiful to her.' This teaches us the immense value of maintaining family ties and showing kindness to relatives. Even when we feel we have gone astray, returning to good character and family duty opens doors to Allah's mercy. The maternal aunt holds a position similar to the mother in terms of respect and care we should show.",
    source: "Tirmidhi"
  }
];
