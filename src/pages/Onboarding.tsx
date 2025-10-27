import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Bell, Clock } from 'lucide-react';

const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        navigate('/auth');
      } else {
        setUserId(user.id);
      }
    });
  }, [navigate]);

  const createDefaultSetup = async () => {
    if (!userId) return;
    
    setIsLoading(true);

    try {
      // Create default reminders
      const defaultReminders = [
        { label: 'Morning', time: '07:00:00', category: 'morning', dhikrTarget: 10 },
        { label: 'Midday', time: '12:30:00', category: 'general', dhikrTarget: 33 },
        { label: 'Evening', time: '18:00:00', category: 'evening', dhikrTarget: 33 },
        { label: 'Bedtime', time: '22:30:00', category: 'bedtime', dhikrTarget: 33 },
      ];

      const reminders = defaultReminders.map(d => ({
        user_id: userId,
        label: d.label,
        time: d.time,
        days: [0, 1, 2, 3, 4, 5, 6],
        payload: {
          cards: { ayah: true, hadith: true, dua: true, dhikr: true, reflection: true },
          category: d.category,
          dhikrTarget: d.dhikrTarget,
        },
        enabled: true,
      }));

      const { error: remindersError } = await supabase.from('reminders').insert(reminders);
      if (remindersError) throw remindersError;

      // Create default alarms
      const defaultAlarms = [
        { name: 'Wake Up', type: 'wake', time: '06:00:00' },
        { name: 'Bedtime', type: 'bedtime', time: '22:00:00' },
      ];

      const alarms = defaultAlarms.map(a => ({
        user_id: userId,
        name: a.name,
        type: a.type,
        time: a.time,
        days: [0, 1, 2, 3, 4, 5, 6],
        tone: 'chime',
        volume: 70,
        enabled: true,
      }));

      const { error: alarmsError } = await supabase.from('alarms').insert(alarms);
      if (alarmsError) throw alarmsError;

      toast({
        title: "All set!",
        description: "Your daily reminders and alarms are configured.",
      });

      navigate('/today');
    } catch (error: any) {
      toast({
        title: "Error during setup",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background via-background to-secondary/20 px-4">
      <Card className="w-full max-w-lg border-2 shadow-[var(--shadow-lg)]">
        <CardHeader className="text-center space-y-2">
          <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
            Welcome to Nūr
          </div>
          <CardDescription className="text-base">
            Your daily companion for spiritual growth
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground">Daily Reminders</p>
                <p>Gentle notifications for morning, midday, evening, and bedtime spiritual moments.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground">Wake & Bedtime Alarms</p>
                <p>Start and end your day with duʿāʾ and dhikr routines.</p>
              </div>
            </div>
          </div>

          <div className="bg-secondary/20 rounded-lg p-4 text-sm text-center">
            <p className="text-muted-foreground">
              We'll create default reminders for you. You can customize everything in the Alarms page later.
            </p>
          </div>
          
          <Button
            onClick={createDefaultSetup}
            className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Setting up...
              </>
            ) : (
              'Continue'
            )}
          </Button>
          
          <button
            type="button"
            onClick={() => navigate('/today')}
            className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
            disabled={isLoading}
          >
            Skip for now
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
