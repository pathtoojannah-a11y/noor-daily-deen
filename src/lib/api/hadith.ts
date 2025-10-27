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
    text: "The best of you are those who are best to their families.",
    source: "Tirmidhi"
  },
  {
    text: "Kindness is a mark of faith, and whoever is not kind has no faith.",
    source: "Muslim"
  },
  {
    text: "The strong person is not the one who can wrestle someone else down. The strong person is the one who can control himself when he is angry.",
    source: "Bukhari & Muslim"
  },
  {
    text: "Make things easy and do not make them difficult, cheer the people up by conveying glad tidings to them and do not repulse them.",
    source: "Bukhari"
  },
  {
    text: "None of you truly believes until he loves for his brother what he loves for himself.",
    source: "Bukhari & Muslim"
  }
];
