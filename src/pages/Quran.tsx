import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Play, Pause } from 'lucide-react';
import { getSurahList, getSurah, type SurahData } from '@/lib/apis';
import { Skeleton } from '@/components/ui/skeleton';

const Quran = () => {
  const [surahs, setSurahs] = useState<SurahData[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    loadSurahs();
  }, []);

  const loadSurahs = async () => {
    setIsLoading(true);
    const data = await getSurahList();
    setSurahs(data);
    setIsLoading(false);
  };

  const handleSurahClick = async (surahNumber: number) => {
    const response = await getSurah(surahNumber);
    // Handle both direct response and nested data structure
    const data = response?.data ?? response;
    setSelectedSurah(data);
  };

  const playAudio = (audioUrl: string) => {
    if (currentAudio) {
      currentAudio.pause();
    }
    const audio = new Audio(audioUrl);
    audio.play();
    setCurrentAudio(audio);
    setIsPlaying(true);
    audio.onended = () => setIsPlaying(false);
  };

  const pauseAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      setIsPlaying(false);
    }
  };

  if (selectedSurah) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto space-y-6 pb-24">
          <Button variant="ghost" onClick={() => setSelectedSurah(null)}>
            ← Back to Surah List
          </Button>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                <div className="font-arabic text-3xl mb-2">{selectedSurah.name}</div>
                <div className="text-xl">{selectedSurah.englishName}</div>
                <div className="text-sm text-muted-foreground">
                  {selectedSurah.englishNameTranslation} • {selectedSurah.numberOfAyahs} Ayahs
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {(selectedSurah.ayahs ?? selectedSurah.verses ?? []).map((ayah: any, index: number) => (
                <div key={index} className="space-y-3 p-4 bg-muted/30 rounded-lg">
                  <div className="font-arabic text-2xl text-right leading-relaxed whitespace-pre-wrap">
                    {ayah.text || ayah.arabic || ayah.text_ar} ﴿{ayah.numberInSurah || ayah.number}﴾
                  </div>
                  {ayah.transliteration && (
                    <div className="text-muted-foreground italic whitespace-pre-wrap">
                      {ayah.transliteration}
                    </div>
                  )}
                  {(ayah.translation || ayah.text_en) && (
                    <div className="leading-relaxed whitespace-pre-wrap">
                      {ayah.translation || ayah.text_en}
                    </div>
                  )}
                  {ayah.audioUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => isPlaying ? pauseAudio() : playAudio(ayah.audioUrl)}
                    >
                      {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                      {isPlaying ? 'Pause' : 'Play Audio'}
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6 pb-24">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">القرآن الكريم</h1>
          <p className="text-muted-foreground">The Noble Qur'an - Read and listen</p>
        </div>

        {isLoading ? (
          <div className="grid gap-4">
            {[...Array(10)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4">
            {surahs.map((surah) => (
              <Card
                key={surah.number}
                className="cursor-pointer hover:border-primary transition-colors"
                onClick={() => handleSurahClick(surah.number)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {surah.number}
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <span>{surah.englishName}</span>
                          <span className="font-arabic text-xl">{surah.name}</span>
                        </div>
                        <div className="text-sm font-normal text-muted-foreground">
                          {surah.englishNameTranslation} • {surah.numberOfAyahs} Ayahs • {surah.revelationType}
                        </div>
                      </div>
                    </div>
                    <BookOpen className="w-5 h-5 text-primary" />
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Quran;
