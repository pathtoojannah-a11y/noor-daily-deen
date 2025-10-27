import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Volume2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { pickDuaFor } from '@/lib/api/adhkar';
import type { Dua } from '@/lib/api/adhkar';

const Bedtime = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [duas, setDuas] = useState<Dua[]>([]);
  const [dhikrCounts, setDhikrCounts] = useState({ subhan: 0, alhamdulillah: 0, allahu: 0 });
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    loadBedtimeContent();
  }, []);

  const loadBedtimeContent = async () => {
    const bedtimeDuas = await Promise.all([
      pickDuaFor('bedtime'),
      pickDuaFor('bedtime')
    ]);
    setDuas(bedtimeDuas.filter(Boolean) as Dua[]);
  };

  const incrementDhikr = (type: 'subhan' | 'alhamdulillah' | 'allahu') => {
    setDhikrCounts(prev => ({
      ...prev,
      [type]: Math.min(prev[type] + 1, 33)
    }));
  };

  const handleComplete = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const today = new Date().toISOString().split('T')[0];
      
      await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          date: today,
          reflection_done: true,
          updated_at: new Date().toISOString()
        });

      setIsComplete(true);
      
      toast({
        title: "Bedtime routine complete",
        description: "May you have a peaceful rest.",
      });

      setTimeout(() => navigate('/today'), 2000);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const DhikrCounter = ({ 
    title, 
    arabic, 
    type, 
    count 
  }: { 
    title: string; 
    arabic: string; 
    type: 'subhan' | 'alhamdulillah' | 'allahu';
    count: number;
  }) => (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-2xl text-center font-arabic" dir="rtl">{arabic}</p>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-primary">{count}/33</span>
          <Button
            onClick={() => incrementDhikr(type)}
            disabled={count >= 33}
            className="bg-gradient-to-r from-primary to-primary/90"
          >
            Tap to Count
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6 pb-24">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Bedtime Routine</h1>
          <p className="text-muted-foreground">Complete your nightly adhkār</p>
        </div>

        {/* Ayat al-Kursi */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Āyat al-Kursī (2:255)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-2xl leading-loose text-center font-arabic" dir="rtl">
              اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ
            </p>
            <p className="text-sm text-center text-muted-foreground">
              Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence...
            </p>
          </CardContent>
        </Card>

        {/* Dhikr Counters */}
        <DhikrCounter 
          title="Subḥānallāh" 
          arabic="سُبْحَانَ اللَّهِ" 
          type="subhan"
          count={dhikrCounts.subhan}
        />
        <DhikrCounter 
          title="Alḥamdulillāh" 
          arabic="الْحَمْدُ لِلَّهِ" 
          type="alhamdulillah"
          count={dhikrCounts.alhamdulillah}
        />
        <DhikrCounter 
          title="Allāhu Akbar" 
          arabic="اللَّهُ أَكْبَرُ" 
          type="allahu"
          count={dhikrCounts.allahu}
        />

        {/* Bedtime Duas */}
        {duas.map((dua, idx) => (
          <Card key={idx} className="border-2">
            <CardHeader>
              <CardTitle className="text-lg">{dua.title || 'Bedtime Duʿāʾ'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-2xl leading-loose text-center font-arabic" dir="rtl">
                {dua.ar}
              </p>
              {dua.translit && (
                <p className="text-sm text-center text-muted-foreground italic">
                  {dua.translit}
                </p>
              )}
              <p className="text-sm text-center">{dua.en}</p>
              {dua.audio && (
                <Button variant="outline" className="w-full" onClick={() => new Audio(dua.audio!).play()}>
                  <Volume2 className="w-4 h-4 mr-2" />
                  Play Audio
                </Button>
              )}
              {dua.benefits.length > 0 && (
                <div className="bg-secondary/20 rounded-lg p-3 space-y-1">
                  <p className="text-xs font-medium">Benefits:</p>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                    {dua.benefits.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        <Button
          onClick={handleComplete}
          disabled={isComplete}
          className="w-full bg-gradient-to-r from-primary to-primary/90"
        >
          <Check className="w-4 h-4 mr-2" />
          {isComplete ? 'Complete' : 'Mark Complete'}
        </Button>
      </div>
    </Layout>
  );
};

export default Bedtime;
