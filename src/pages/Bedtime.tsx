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
import { Badge } from '@/components/ui/badge';

const Bedtime = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [duas, setDuas] = useState<Dua[]>([]);
  const [dhikrCounts, setDhikrCounts] = useState({ subhan: 0, alhamdulillah: 0, allahu: 0 });
  const [completed, setCompleted] = useState({
    ayatKursi: false,
    baqarah: false,
    dhikr: false,
    duas: false,
  });
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    loadBedtimeContent();
  }, []);

  const loadBedtimeContent = async () => {
    // Load bedtime duas from API
    const bedtimeDuas = await Promise.all([
      pickDuaFor('bedtime'),
      pickDuaFor('bedtime'),
      pickDuaFor('bedtime')
    ]);
    setDuas(bedtimeDuas.filter(Boolean) as Dua[]);
  };

  const incrementDhikr = (type: 'subhan' | 'alhamdulillah' | 'allahu') => {
    const max = type === 'allahu' ? 34 : 33;
    setDhikrCounts(prev => {
      const newCount = Math.min(prev[type] + 1, max);
      // Check if all dhikr completed
      const newCounts = { ...prev, [type]: newCount };
      if (newCounts.subhan === 33 && newCounts.alhamdulillah === 33 && newCounts.allahu === 34) {
        setCompleted(c => ({ ...c, dhikr: true }));
      }
      return newCounts;
    });
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
    count,
    target
  }: { 
    title: string; 
    arabic: string; 
    type: 'subhan' | 'alhamdulillah' | 'allahu';
    count: number;
    target: number;
  }) => (
    <Card className={`border-2 transition-all ${count >= target ? 'border-primary bg-primary/5' : ''}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          {count >= target && <Check className="w-5 h-5 text-primary" />}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-3xl text-center font-arabic leading-loose" dir="rtl">{arabic}</p>
        <div className="flex items-center justify-between">
          <span className="text-4xl font-bold text-primary">{count}/{target}</span>
          <Button
            onClick={() => incrementDhikr(type)}
            disabled={count >= target}
            className="bg-gradient-to-r from-primary to-primary/90"
            size="lg"
          >
            Tap to Count
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const allCompleted = completed.ayatKursi && completed.baqarah && completed.dhikr && completed.duas;

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6 pb-24">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Bedtime Routine</h1>
          <p className="text-muted-foreground">Complete your nightly adhkār for protection and peace</p>
        </div>

        {/* Ayat al-Kursi */}
        <Card className={`border-2 transition-all ${completed.ayatKursi ? 'border-primary bg-primary/5' : ''}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Āyat al-Kursī (2:255)</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Protection through the night</p>
              </div>
              {completed.ayatKursi && <Check className="w-6 h-6 text-primary" />}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-2xl leading-loose text-center font-arabic" dir="rtl">
              اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ
            </p>
            <p className="text-sm text-center text-muted-foreground">
              Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep...
            </p>
            <div className="bg-secondary/20 rounded-lg p-3">
              <p className="text-xs font-medium mb-1">Benefits:</p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>Protection from harm until morning</li>
                <li>Guardian angel assigned until dawn</li>
              </ul>
            </div>
            {!completed.ayatKursi && (
              <Button 
                onClick={() => setCompleted(c => ({ ...c, ayatKursi: true }))}
                variant="outline" 
                className="w-full"
              >
                <Check className="w-4 h-4 mr-2" />
                Mark Complete
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Al-Baqarah 285-286 */}
        <Card className={`border-2 transition-all ${completed.baqarah ? 'border-primary bg-primary/5' : ''}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Last 2 Āyāt of Al-Baqarah (2:285-286)</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Sufficient protection</p>
              </div>
              {completed.baqarah && <Check className="w-6 h-6 text-primary" />}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-2xl leading-loose text-center font-arabic" dir="rtl">
              آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ
            </p>
            <p className="text-sm text-center text-muted-foreground">
              The Messenger has believed in what was revealed to him from his Lord, and the believers...
            </p>
            <div className="bg-secondary/20 rounded-lg p-3">
              <p className="text-xs font-medium mb-1">Benefits:</p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>These two verses are sufficient for one at night</li>
                <li>Comprehensive protection and blessings</li>
              </ul>
            </div>
            {!completed.baqarah && (
              <Button 
                onClick={() => setCompleted(c => ({ ...c, baqarah: true }))}
                variant="outline" 
                className="w-full"
              >
                <Check className="w-4 h-4 mr-2" />
                Mark Complete
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Dhikr Counters */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold">Dhikr Before Sleep</h2>
            <p className="text-sm text-muted-foreground">The three glorifications</p>
          </div>
          
          <DhikrCounter 
            title="Subḥānallāh" 
            arabic="سُبْحَانَ اللَّهِ" 
            type="subhan"
            count={dhikrCounts.subhan}
            target={33}
          />
          <DhikrCounter 
            title="Alḥamdulillāh" 
            arabic="الْحَمْدُ لِلَّهِ" 
            type="alhamdulillah"
            count={dhikrCounts.alhamdulillah}
            target={33}
          />
          <DhikrCounter 
            title="Allāhu Akbar" 
            arabic="اللَّهُ أَكْبَرُ" 
            type="allahu"
            count={dhikrCounts.allahu}
            target={34}
          />
        </div>

        {/* Bedtime Duas */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Bedtime Duʿāʾs</h2>
            {completed.duas && <Badge variant="default" className="flex items-center gap-1">
              <Check className="w-3 h-3" /> Complete
            </Badge>}
          </div>
          
          {duas.map((dua, idx) => (
            <Card key={idx} className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">{dua.title || `Bedtime Duʿāʾ ${idx + 1}`}</CardTitle>
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
                {dua.source && (
                  <p className="text-xs text-center text-muted-foreground">Source: {dua.source}</p>
                )}
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
          
          {!completed.duas && duas.length > 0 && (
            <Button 
              onClick={() => setCompleted(c => ({ ...c, duas: true }))}
              variant="outline" 
              className="w-full"
            >
              <Check className="w-4 h-4 mr-2" />
              Mark All Duʿāʾs Complete
            </Button>
          )}
        </div>

        <Button
          onClick={handleComplete}
          disabled={!allCompleted || isComplete}
          className="w-full bg-gradient-to-r from-primary to-primary/90"
          size="lg"
        >
          <Check className="w-5 h-5 mr-2" />
          {isComplete ? 'Complete' : allCompleted ? 'Complete Bedtime Routine' : 'Complete all steps first'}
        </Button>

        {!allCompleted && (
          <p className="text-sm text-center text-muted-foreground">
            Complete all sections above to finish your bedtime routine
          </p>
        )}
      </div>
    </Layout>
  );
};

export default Bedtime;
