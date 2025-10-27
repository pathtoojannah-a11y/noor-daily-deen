import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Volume2, Plus } from 'lucide-react';
import { getDuasByCategory } from '@/lib/api/adhkar';
import { useToast } from '@/hooks/use-toast';
import type { Dua } from '@/lib/api/adhkar';

const AdhkarCategory = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [duas, setDuas] = useState<Dua[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadDuas(slug);
    }
  }, [slug]);

  const loadDuas = async (categorySlug: string) => {
    const duasList = await getDuasByCategory(categorySlug);
    setDuas(duasList);
    setIsLoading(false);
  };

  const playAudio = (audioUrl: string) => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

  const addToReminders = () => {
    toast({
      title: "Feature coming soon",
      description: "You'll be able to add duʿāʾs to your reminders.",
    });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto space-y-6 pb-24">
          <Skeleton className="h-10 w-48" />
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6 pb-24">
        <Button
          variant="ghost"
          onClick={() => navigate('/adhkar')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Library
        </Button>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold capitalize">{slug?.replace(/-/g, ' ')}</h1>
          <p className="text-muted-foreground">{duas.length} duʿāʾs</p>
        </div>

        <div className="space-y-4">
          {duas.map((dua) => (
            <Card key={dua.id} className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">{dua.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <p className="text-2xl leading-loose text-center font-arabic" dir="rtl">
                    {dua.ar}
                  </p>
                  {dua.translit && (
                    <p className="text-sm text-center text-muted-foreground italic">
                      {dua.translit}
                    </p>
                  )}
                  <p className="text-sm text-center">{dua.en}</p>
                  {dua.source && (
                    <p className="text-xs text-center text-muted-foreground">
                      Source: {dua.source}
                    </p>
                  )}
                </div>

                {dua.benefits && dua.benefits.length > 0 && (
                  <div className="bg-secondary/20 rounded-lg p-3 space-y-2">
                    <p className="text-sm font-medium">Benefits:</p>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      {dua.benefits.map((benefit, idx) => (
                        <li key={idx}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex gap-2">
                  {dua.audio && (
                    <Button
                      variant="outline"
                      onClick={() => playAudio(dua.audio!)}
                      className="flex-1"
                    >
                      <Volume2 className="w-4 h-4 mr-2" />
                      Play Audio
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={addToReminders}
                    className="flex-1"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Reminders
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AdhkarCategory;
