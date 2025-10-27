import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  
  const [times, setTimes] = useState({
    morning: '06:00',
    midday: '12:00',
    evening: '18:00',
    bedtime: '21:00',
  });

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        navigate('/auth');
      } else {
        setUserId(user.id);
      }
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('reminder_settings')
        .upsert({
          user_id: userId,
          enabled: true,
          morning: times.morning,
          midday: times.midday,
          evening: times.evening,
          bedtime: times.bedtime,
        });

      if (error) throw error;

      toast({
        title: "Preferences saved!",
        description: "Your daily reminders are all set.",
      });

      navigate('/today');
    } catch (error: any) {
      toast({
        title: "Error saving preferences",
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
          <CardTitle className="text-3xl">Welcome to Nūr</CardTitle>
          <CardDescription>
            Set your daily reminder times for spiritual checkpoints
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="morning">Morning</Label>
                <Input
                  id="morning"
                  type="time"
                  value={times.morning}
                  onChange={(e) => setTimes({ ...times, morning: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="midday">Midday</Label>
                <Input
                  id="midday"
                  type="time"
                  value={times.midday}
                  onChange={(e) => setTimes({ ...times, midday: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="evening">Evening</Label>
                <Input
                  id="evening"
                  type="time"
                  value={times.evening}
                  onChange={(e) => setTimes({ ...times, evening: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bedtime">Bedtime</Label>
                <Input
                  id="bedtime"
                  type="time"
                  value={times.bedtime}
                  onChange={(e) => setTimes({ ...times, bedtime: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
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
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
