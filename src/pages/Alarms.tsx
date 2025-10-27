import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Bell, Plus, Settings as SettingsIcon, Trash2, Clock, Volume2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Alarm {
  id: string;
  name: string;
  type: string;
  time: string;
  days: number[];
  tone: string;
  volume: number;
  enabled: boolean;
}

interface Reminder {
  id: string;
  label: string;
  time: string;
  days: number[];
  payload: any;
  enabled: boolean;
}

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Alarms = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ type: 'alarm' | 'reminder'; id: string } | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }

      const [alarmsRes, remindersRes] = await Promise.all([
        supabase.from('alarms').select('*').eq('user_id', user.id).order('time'),
        supabase.from('reminders').select('*').eq('user_id', user.id).order('time')
      ]);

      if (alarmsRes.data) setAlarms(alarmsRes.data);
      if (remindersRes.data) setReminders(remindersRes.data);
    } catch (error: any) {
      toast({
        title: 'Error loading data',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleAlarm = async (id: string, enabled: boolean) => {
    const { error } = await supabase.from('alarms').update({ enabled }).eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setAlarms(alarms.map(a => a.id === id ? { ...a, enabled } : a));
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

  const updateAlarmVolume = async (id: string, volume: number) => {
    const { error } = await supabase.from('alarms').update({ volume }).eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setAlarms(alarms.map(a => a.id === id ? { ...a, volume } : a));
    }
  };

  const confirmDelete = (type: 'alarm' | 'reminder', id: string) => {
    setItemToDelete({ type, id });
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;

    const table = itemToDelete.type === 'alarm' ? 'alarms' : 'reminders';
    const { error } = await supabase.from(table).delete().eq('id', itemToDelete.id);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      if (itemToDelete.type === 'alarm') {
        setAlarms(alarms.filter(a => a.id !== itemToDelete.id));
      } else {
        setReminders(reminders.filter(r => r.id !== itemToDelete.id));
      }
      toast({ title: 'Deleted successfully' });
    }
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const createDefaultReminders = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const defaults = [
      { label: 'Morning', time: '07:00:00', category: 'morning', dhikrTarget: 10 },
      { label: 'Midday', time: '12:30:00', category: 'general', dhikrTarget: 33 },
      { label: 'Evening', time: '18:00:00', category: 'evening', dhikrTarget: 33 },
      { label: 'Bedtime', time: '22:30:00', category: 'bedtime', dhikrTarget: 33 },
    ];

    const newReminders = defaults.map(d => ({
      user_id: user.id,
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

    const { error } = await supabase.from('reminders').insert(newReminders);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Default reminders created' });
      loadData();
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6 pb-24">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Alarms & Reminders</h1>
          <p className="text-muted-foreground">Set moments to pause, remember Allah, and end your day with peace.</p>
        </div>

        {/* Why Set Times Card */}
        <Card className="border-2 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Why set times?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">
              Nūr gently reminds you to remember Allah throughout your day—when you wake, before leaving home, midday breaks, and before sleep. Choose times that fit your real routine.
            </p>
          </CardContent>
        </Card>

        {/* Alarms Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Alarms</h2>
            <Button onClick={() => navigate('/alarms/new')} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Alarm
            </Button>
          </div>

          {alarms.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No alarms yet. Add your first alarm to get started.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {alarms.map(alarm => (
                <Card key={alarm.id} className="border-2">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Clock className="w-5 h-5 text-primary" />
                            <h3 className="text-lg font-semibold">{alarm.name}</h3>
                            <Badge variant={alarm.type === 'wake' ? 'default' : 'secondary'}>
                              {alarm.type}
                            </Badge>
                          </div>
                          <p className="text-3xl font-bold text-primary">{alarm.time.slice(0, 5)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={alarm.enabled}
                            onCheckedChange={(enabled) => toggleAlarm(alarm.id, enabled)}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate(`/alarms/${alarm.id}`)}
                          >
                            <SettingsIcon className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => confirmDelete('alarm', alarm.id)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {alarm.days.map(day => (
                          <Badge key={day} variant="outline">{dayNames[day]}</Badge>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Volume2 className="w-4 h-4" />
                          <span>Volume: {alarm.volume}%</span>
                        </div>
                        <Slider
                          value={[alarm.volume]}
                          onValueChange={([v]) => updateAlarmVolume(alarm.id, v)}
                          max={100}
                          step={5}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Reminders Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Reminders</h2>
            <Button onClick={() => navigate('/reminders/new')}>
              <Plus className="w-4 h-4 mr-2" />
              New Reminder
            </Button>
          </div>

          {reminders.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center space-y-4">
                <Bell className="w-12 h-12 mx-auto opacity-50 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground mb-4">No reminders yet.</p>
                  <Button onClick={createDefaultReminders}>
                    Create Default Reminders
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {reminders.map(reminder => (
                <Card key={reminder.id} className="border-2">
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-1">{reminder.label}</h3>
                          <p className="text-2xl font-bold text-primary">{reminder.time.slice(0, 5)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={reminder.enabled}
                            onCheckedChange={(enabled) => toggleReminder(reminder.id, enabled)}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate(`/reminders/${reminder.id}`)}
                          >
                            <SettingsIcon className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => confirmDelete('reminder', reminder.id)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {reminder.days.map(day => (
                          <Badge key={day} variant="outline">{dayNames[day]}</Badge>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {reminder.payload.cards.ayah && <Badge>Āyah</Badge>}
                        {reminder.payload.cards.hadith && <Badge>Ḥadīth</Badge>}
                        {reminder.payload.cards.dua && <Badge>Duʿāʾ</Badge>}
                        {reminder.payload.cards.dhikr && <Badge>Dhikr</Badge>}
                        {reminder.payload.cards.reflection && <Badge>Reflection</Badge>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete {itemToDelete?.type}?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this {itemToDelete?.type}.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
};

export default Alarms;
