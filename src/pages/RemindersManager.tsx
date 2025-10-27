import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, Bell, Clock } from 'lucide-react';

interface Alarm {
  id: string;
  name: string;
  time: string;
  type: 'wake' | 'reminder' | 'bedtime';
  enabled: boolean;
  volume: number;
}

const RemindersManager = () => {
  const { toast } = useToast();
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAlarms();
  }, []);

  const loadAlarms = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('alarms')
        .select('*')
        .eq('user_id', user.id)
        .order('time');

      if (error) throw error;
      setAlarms((data || []).map(a => ({
        id: a.id,
        name: a.name,
        time: a.time,
        type: a.type as 'wake' | 'reminder' | 'bedtime',
        enabled: a.enabled,
        volume: a.volume
      })));
    } catch (error: any) {
      toast({
        title: "Error loading alarms",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addAlarm = async (type: 'wake' | 'reminder' | 'bedtime') => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const defaultTimes = {
        wake: '06:00',
        reminder: '12:00',
        bedtime: '22:00'
      };

      const { error } = await supabase
        .from('alarms')
        .insert({
          user_id: user.id,
          name: `New ${type} alarm`,
          time: defaultTimes[type],
          type,
          enabled: true,
          volume: 70
        });

      if (error) throw error;
      await loadAlarms();
      
      toast({
        title: "Alarm added",
        description: "Your new alarm has been created.",
      });
    } catch (error: any) {
      toast({
        title: "Error adding alarm",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateAlarm = async (id: string, updates: Partial<Alarm>) => {
    try {
      const { error } = await supabase
        .from('alarms')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      await loadAlarms();
    } catch (error: any) {
      toast({
        title: "Error updating alarm",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteAlarm = async (id: string) => {
    try {
      const { error } = await supabase
        .from('alarms')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await loadAlarms();
      
      toast({
        title: "Alarm deleted",
        description: "Your alarm has been removed.",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting alarm",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const AlarmCard = ({ alarm }: { alarm: Alarm }) => (
    <Card className="border-2">
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-center justify-between">
          <Input
            value={alarm.name}
            onChange={(e) => updateAlarm(alarm.id, { name: e.target.value })}
            className="flex-1 mr-4"
          />
          <Switch
            checked={alarm.enabled}
            onCheckedChange={(checked) => updateAlarm(alarm.id, { enabled: checked })}
          />
        </div>

        <div className="space-y-2">
          <Label>Time</Label>
          <Input
            type="time"
            value={alarm.time}
            onChange={(e) => updateAlarm(alarm.id, { time: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Volume: {alarm.volume}%</Label>
          <Slider
            value={[alarm.volume]}
            onValueChange={(value) => updateAlarm(alarm.id, { volume: value[0] })}
            max={100}
            step={1}
          />
        </div>

        <Button
          variant="destructive"
          size="sm"
          onClick={() => deleteAlarm(alarm.id)}
          className="w-full"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6 pb-24">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Alarms & Reminders</h1>
          <p className="text-muted-foreground">Manage your daily spiritual checkpoints</p>
        </div>

        <Card className="border-2 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="w-5 h-5" />
              About Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>
              Web apps can notify reliably while open or installed. For best results, install Nūr as a PWA on your device.
            </p>
            <p className="text-xs">
              Note: True background push notifications require additional setup with services like OneSignal or Firebase.
            </p>
          </CardContent>
        </Card>

        <Tabs defaultValue="wake" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="wake">Wake</TabsTrigger>
            <TabsTrigger value="reminder">Reminders</TabsTrigger>
            <TabsTrigger value="bedtime">Bedtime</TabsTrigger>
          </TabsList>

          <TabsContent value="wake" className="space-y-4">
            <Button onClick={() => addAlarm('wake')} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Wake Alarm
            </Button>
            {alarms.filter(a => a.type === 'wake').map(alarm => (
              <AlarmCard key={alarm.id} alarm={alarm} />
            ))}
          </TabsContent>

          <TabsContent value="reminder" className="space-y-4">
            <Button onClick={() => addAlarm('reminder')} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Reminder
            </Button>
            {alarms.filter(a => a.type === 'reminder').map(alarm => (
              <AlarmCard key={alarm.id} alarm={alarm} />
            ))}
          </TabsContent>

          <TabsContent value="bedtime" className="space-y-4">
            <Button onClick={() => addAlarm('bedtime')} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Bedtime Alarm
            </Button>
            {alarms.filter(a => a.type === 'bedtime').map(alarm => (
              <AlarmCard key={alarm.id} alarm={alarm} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default RemindersManager;
