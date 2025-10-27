import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Bell, Info, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { requestNotificationPermission } from '@/lib/notifications';

interface Reminder {
  id: string;
  label: string;
  time: string;
  days: number[];
  payload: any;
  enabled: boolean;
}

const presetReminders = [
  { label: 'Morning', time: '07:00', description: 'Start your day with remembrance' },
  { label: 'Midday', time: '12:30', description: 'A moment to pause and reflect' },
  { label: 'Evening', time: '18:00', description: 'Evening adhkār and gratitude' },
  { label: 'Night', time: '22:30', description: 'Prepare for rest with duʿāʾ' },
];

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Notifications = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    loadData();
    checkNotificationPermission();
  }, []);

  const checkNotificationPermission = () => {
    if ('Notification' in window) {
      setNotificationsEnabled(Notification.permission === 'granted');
    }
  };

  const loadData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }

      const { data, error } = await supabase
        .from('reminders')
        .select('*')
        .eq('user_id', user.id)
        .order('time');

      if (error) throw error;
      if (data) setReminders(data);
    } catch (error: any) {
      toast({
        title: 'Error loading notifications',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const enableNotifications = async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      setNotificationsEnabled(true);
      toast({
        title: 'Notifications enabled',
        description: 'You will now receive reminders throughout your day.',
      });
    } else {
      toast({
        title: 'Notifications blocked',
        description: 'Please enable notifications in your browser settings.',
        variant: 'destructive',
      });
    }
  };

  const toggleReminder = async (id: string, enabled: boolean) => {
    const { error } = await supabase.from('reminders').update({ enabled }).eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setReminders(reminders.map(r => r.id === id ? { ...r, enabled } : r));
    }
  };

  const updateTime = async (id: string, time: string) => {
    const { error } = await supabase.from('reminders').update({ time }).eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setReminders(reminders.map(r => r.id === id ? { ...r, time } : r));
    }
  };

  const updateDays = async (id: string, days: number[]) => {
    const { error } = await supabase.from('reminders').update({ days }).eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setReminders(reminders.map(r => r.id === id ? { ...r, days } : r));
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto space-y-6 pb-24">
          <Skeleton className="h-32" />
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-40" />
          ))}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6 pb-24">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Notification Times</h1>
          <p className="text-muted-foreground">Set when you'd like gentle reminders</p>
        </div>

        {/* Explainer Card */}
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Info className="w-5 h-5 text-primary" />
              Why set times?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm leading-relaxed">
              Nūr gently reminds you to remember Allah throughout your day—when you wake, before leaving home, during midday breaks, and before sleep. 
              Choose times that fit your real routine.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Each notification is quiet and respectful, showing you a verse, hadith, or duʿāʾ—never an alarm sound that disrupts your day.
            </p>
          </CardContent>
        </Card>

        {/* Enable Notifications */}
        {!notificationsEnabled && (
          <Card className="border-2 border-accent/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Enable Notifications
              </CardTitle>
              <CardDescription>
                Allow Nūr to send you gentle reminders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={enableNotifications} className="w-full">
                Enable Notifications
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Preset Times */}
        <div className="space-y-4">
          {reminders.map((reminder, idx) => {
            const preset = presetReminders[idx];
            return (
              <Card key={reminder.id} className="border-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-xl">{reminder.label}</CardTitle>
                      {preset && (
                        <CardDescription>{preset.description}</CardDescription>
                      )}
                    </div>
                    <Switch
                      checked={reminder.enabled}
                      onCheckedChange={(enabled) => toggleReminder(reminder.id, enabled)}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Time
                    </label>
                    <input
                      type="time"
                      value={reminder.time}
                      onChange={(e) => updateTime(reminder.id, e.target.value)}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Days</label>
                    <div className="flex gap-2">
                      {dayNames.map((day, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            const newDays = reminder.days.includes(i)
                              ? reminder.days.filter(d => d !== i)
                              : [...reminder.days, i].sort();
                            updateDays(reminder.id, newDays);
                          }}
                          className={`flex-1 py-2 rounded-md text-sm transition-colors ${
                            reminder.days.includes(i)
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary text-secondary-foreground'
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="border-2 border-muted">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground text-center">
              Each notification will show you beautiful Islamic content: a verse from the Qurʾān, 
              a prophetic tradition, or a duʿāʾ to keep you connected throughout your day. 🌙
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Notifications;
