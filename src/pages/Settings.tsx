import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';

const Settings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  
  const [times, setTimes] = useState({
    morning: '06:00',
    midday: '12:00',
    evening: '18:00',
    bedtime: '21:00',
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);

      const { data, error } = await supabase
        .from('reminder_settings')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setTimes({
          morning: data.morning || '06:00',
          midday: data.midday || '12:00',
          evening: data.evening || '18:00',
          bedtime: data.bedtime || '21:00',
        });
      }
    } catch (error: any) {
      toast({
        title: "Error loading settings",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveSettings = async () => {
    if (!userId) return;
    setIsSaving(true);

    try {
      const { error } = await supabase
        .from('reminder_settings')
        .upsert({
          user_id: userId,
          morning: times.morning,
          midday: times.midday,
          evening: times.evening,
          bedtime: times.bedtime,
        });

      if (error) throw error;

      toast({
        title: "Settings saved",
        description: "Your reminder times have been updated.",
      });
    } catch (error: any) {
      toast({
        title: "Error saving settings",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto space-y-6 pb-24">
          <Skeleton className="h-12 w-48" />
          <Skeleton className="h-64" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6 pb-24">
        <h1 className="text-3xl font-bold">Settings</h1>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>Reminder Times</CardTitle>
            <CardDescription>
              Set your preferred times for daily spiritual checkpoints
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="morning">Morning</Label>
                <Input
                  id="morning"
                  type="time"
                  value={times.morning}
                  onChange={(e) => setTimes({ ...times, morning: e.target.value })}
                  disabled={isSaving}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="midday">Midday</Label>
                <Input
                  id="midday"
                  type="time"
                  value={times.midday}
                  onChange={(e) => setTimes({ ...times, midday: e.target.value })}
                  disabled={isSaving}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="evening">Evening</Label>
                <Input
                  id="evening"
                  type="time"
                  value={times.evening}
                  onChange={(e) => setTimes({ ...times, evening: e.target.value })}
                  disabled={isSaving}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bedtime">Bedtime</Label>
                <Input
                  id="bedtime"
                  type="time"
                  value={times.bedtime}
                  onChange={(e) => setTimes({ ...times, bedtime: e.target.value })}
                  disabled={isSaving}
                />
              </div>
            </div>

            <Button
              onClick={saveSettings}
              disabled={isSaving}
              className="w-full bg-gradient-to-r from-primary to-primary/90"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Settings'}
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Nūr - Your daily companion for spiritual growth.</p>
            <p className="text-xs">
              Content sourced from Qur'an API and Hadith API
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Settings;
