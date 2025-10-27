import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Volume2, Check, Clock } from 'lucide-react';
import { pickDuaFor } from '@/lib/api/adhkar';
import type { Dua } from '@/lib/api/adhkar';

const Wake = () => {
  const navigate = useNavigate();
  const [dua, setDua] = useState<Dua | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadWakeDua();
  }, []);

  const loadWakeDua = async () => {
    const wakeDua = await pickDuaFor('morning');
    setDua(wakeDua);
    setIsLoading(false);
  };

  const handleMarkRead = () => {
    navigate('/today');
  };

  const playAudio = () => {
    if (dua?.audio) {
      const audio = new Audio(dua.audio);
      audio.play();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 to-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 to-background px-4 py-8">
      <Card className="w-full max-w-2xl border-2">
        <CardContent className="pt-8 space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-semibold text-foreground">Good Morning</h1>
            <p className="text-sm text-muted-foreground">When waking up</p>
          </div>

          {dua && (
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <p className="text-3xl md:text-4xl leading-loose font-arabic" dir="rtl">
                  {dua.ar}
                </p>
                {dua.translit && (
                  <p className="text-sm text-muted-foreground italic">
                    {dua.translit}
                  </p>
                )}
                <p className="text-base text-foreground/80">
                  {dua.en}
                </p>
                {dua.source && (
                  <p className="text-xs text-muted-foreground">
                    Source: {dua.source}
                  </p>
                )}
              </div>

              {dua.benefits && dua.benefits.length > 0 && (
                <div className="bg-secondary/20 rounded-lg p-4 space-y-2">
                  <p className="text-sm font-medium">Benefits:</p>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    {dua.benefits.map((benefit, idx) => (
                      <li key={idx}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3">
            {dua?.audio && (
              <Button
                variant="outline"
                onClick={playAudio}
                className="flex-1"
              >
                <Volume2 className="w-4 h-4 mr-2" />
                Play Audio
              </Button>
            )}
            <Button
              onClick={handleMarkRead}
              className="flex-1 bg-gradient-to-r from-primary to-primary/90"
            >
              <Check className="w-4 h-4 mr-2" />
              Mark Read
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Wake;
