import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { DailyCard } from '@/components/DailyCard';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { BookOpen, Heart, Sparkles, Repeat, MessageSquare, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

interface DailyContent {
  ayah: { text: string; surah: string; numberInSurah: number | null; arabic?: string };
  hadith: { text: string; source: string };
  dua: { textAr: string; textEn: string };
  dhikr: { text: string; target: number };
  reflection_prompt: string;
}

interface Progress {
  ayah_done: boolean;
  hadith_done: boolean;
  dua_done: boolean;
  dhikr_done: boolean;
  dhikr_count: number;
  reflection_done: boolean;
}

const Today = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState<DailyContent | null>(null);
  const [progress, setProgress] = useState<Progress>({
    ayah_done: false,
    hadith_done: false,
    dua_done: false,
    dhikr_done: false,
    dhikr_count: 0,
    reflection_done: false,
  });
  const [reflection, setReflection] = useState('');
  const [streak, setStreak] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);

      // Fetch today's content
      const { data, error } = await supabase.functions.invoke('daily-content');
      if (error) throw error;
      setContent(data);

      // Fetch today's progress
      const today = new Date().toISOString().split('T')[0];
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)
        .maybeSingle();

      if (progressData) {
        setProgress(progressData);
      }

      // Calculate streak
      calculateStreak(user.id);

      // Fetch existing reflection
      const { data: reflectionData } = await supabase
        .from('reflections')
        .select('text')
        .eq('user_id', user.id)
        .eq('date', today)
        .maybeSingle();

      if (reflectionData) {
        setReflection(reflectionData.text);
      }
    } catch (error: any) {
      toast({
        title: "Error loading daily content",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStreak = async (userId: string) => {
    const { data } = await supabase
      .from('user_progress')
      .select('date, ayah_done, hadith_done, dua_done, dhikr_done, reflection_done')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .limit(30);

    if (!data) return;

    let currentStreak = 0;
    for (const day of data) {
      const completed = day.ayah_done && day.hadith_done && day.dua_done && day.dhikr_done && day.reflection_done;
      if (completed) {
        currentStreak++;
      } else {
        break;
      }
    }
    setStreak(currentStreak);
  };

  const toggleProgress = async (field: keyof Progress) => {
    if (!userId) return;
    const today = new Date().toISOString().split('T')[0];
    const newProgress = { ...progress, [field]: !progress[field] };
    setProgress(newProgress);

    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: userId,
          date: today,
          ...newProgress,
        });

      if (error) throw error;

      if (!progress[field]) {
        calculateStreak(userId);
      }
    } catch (error: any) {
      toast({
        title: "Error updating progress",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const incrementDhikr = async () => {
    if (!userId) return;
    const today = new Date().toISOString().split('T')[0];
    const newCount = progress.dhikr_count + 1;
    const isDone = newCount >= (content?.dhikr.target || 33);
    
    setProgress({ ...progress, dhikr_count: newCount, dhikr_done: isDone });

    try {
      await supabase
        .from('user_progress')
        .upsert({
          user_id: userId,
          date: today,
          ...progress,
          dhikr_count: newCount,
          dhikr_done: isDone,
        });
    } catch (error: any) {
      toast({
        title: "Error updating dhikr count",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const saveReflection = async () => {
    if (!userId || !reflection.trim()) return;
    const today = new Date().toISOString().split('T')[0];

    try {
      const { error } = await supabase
        .from('reflections')
        .upsert({
          user_id: userId,
          date: today,
          text: reflection,
        });

      if (error) throw error;

      await toggleProgress('reflection_done');

      toast({
        title: "Reflection saved",
        description: "Your thoughts have been recorded.",
      });
    } catch (error: any) {
      toast({
        title: "Error saving reflection",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto space-y-6 pb-24">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-48 w-full rounded-xl" />
          ))}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6 pb-24">
        {/* Streak Badge */}
        {streak > 0 && (
          <div className="flex justify-center">
            <Badge className="px-4 py-2 text-base bg-gradient-to-r from-accent to-accent/80">
              <Flame className="w-5 h-5 mr-2" />
              {streak} Day Streak
            </Badge>
          </div>
        )}

        <h1 className="text-3xl font-bold text-center mb-8">Today's Spiritual Journey</h1>

        {/* Ayah Card */}
        <DailyCard
          title="Daily Āyah"
          icon={<BookOpen className="w-6 h-6" />}
          completed={progress.ayah_done}
          onComplete={() => toggleProgress('ayah_done')}
        >
          {content?.ayah.arabic && (
            <p className="text-2xl text-right font-arabic leading-loose text-primary mb-2">
              {content.ayah.arabic}
            </p>
          )}
          <p className="text-lg text-foreground leading-relaxed">{content?.ayah.text}</p>
          <p className="text-sm text-muted-foreground">
            {content?.ayah.surah}
            {content?.ayah.numberInSurah && ` (${content.ayah.numberInSurah})`}
          </p>
        </DailyCard>

        {/* Hadith Card */}
        <DailyCard
          title="Daily Ḥadīth"
          icon={<Heart className="w-6 h-6" />}
          completed={progress.hadith_done}
          onComplete={() => toggleProgress('hadith_done')}
        >
          <p className="text-lg text-foreground leading-relaxed italic">{content?.hadith.text}</p>
          <p className="text-sm text-muted-foreground">— {content?.hadith.source}</p>
        </DailyCard>

        {/* Dua Card */}
        <DailyCard
          title="Duʿāʾ"
          icon={<Sparkles className="w-6 h-6" />}
          completed={progress.dua_done}
          onComplete={() => toggleProgress('dua_done')}
        >
          <p className="text-2xl text-right font-arabic leading-loose text-primary mb-2">
            {content?.dua.textAr}
          </p>
          <p className="text-lg text-foreground leading-relaxed">{content?.dua.textEn}</p>
        </DailyCard>

        {/* Dhikr Card */}
        <DailyCard
          title="Dhikr"
          icon={<Repeat className="w-6 h-6" />}
          completed={progress.dhikr_done}
        >
          <p className="text-xl text-center text-foreground mb-4">{content?.dhikr.text}</p>
          <div className="text-center space-y-3">
            <div className="text-3xl font-bold text-primary">
              {progress.dhikr_count} / {content?.dhikr.target}
            </div>
            <Button
              onClick={incrementDhikr}
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-primary/90"
              disabled={progress.dhikr_done}
            >
              {progress.dhikr_done ? 'Completed!' : 'Tap to Count'}
            </Button>
          </div>
        </DailyCard>

        {/* Reflection Card */}
        <DailyCard
          title="Daily Reflection"
          icon={<MessageSquare className="w-6 h-6" />}
          completed={progress.reflection_done}
        >
          <p className="text-base text-muted-foreground mb-3">{content?.reflection_prompt}</p>
          <Textarea
            placeholder="Write your reflection..."
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            className="min-h-[120px] resize-none"
          />
          <Button
            onClick={saveReflection}
            className="w-full mt-3 bg-gradient-to-r from-primary to-primary/90"
            disabled={!reflection.trim() || progress.reflection_done}
          >
            {progress.reflection_done ? 'Saved' : 'Save Reflection'}
          </Button>
        </DailyCard>
      </div>
    </Layout>
  );
};

export default Today;
