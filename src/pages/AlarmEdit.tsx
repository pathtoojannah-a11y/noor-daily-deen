import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Save, ArrowLeft, Volume2 } from 'lucide-react';

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const AlarmEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'wake' as 'wake' | 'bedtime',
    time: '07:00',
    days: [0, 1, 2, 3, 4, 5, 6],
    tone: 'chime',
    volume: 70,
    enabled: true,
  });

  useEffect(() => {
    if (id && id !== 'new') {
      loadAlarm();
    } else {
      setLoading(false);
    }
  }, [id]);

  const loadAlarm = async () => {
    try {
      const { data, error } = await supabase
        .from('alarms')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (data) {
        setFormData({
          name: data.name,
          type: data.type as 'wake' | 'bedtime',
          time: data.time.slice(0, 5),
          days: data.days,
          tone: data.tone,
          volume: data.volume,
          enabled: data.enabled,
        });
      }
    } catch (error: any) {
      toast({
        title: 'Error loading alarm',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleDay = (day: number) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day].sort((a, b) => a - b)
    }));
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast({ title: 'Error', description: 'Please enter a name', variant: 'destructive' });
      return;
    }
    if (formData.days.length === 0) {
      toast({ title: 'Error', description: 'Please select at least one day', variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const alarmData = {
        user_id: user.id,
        name: formData.name,
        type: formData.type,
        time: formData.time + ':00',
        days: formData.days,
        tone: formData.tone,
        volume: formData.volume,
        enabled: formData.enabled,
      };

      if (id && id !== 'new') {
        const { error } = await supabase
          .from('alarms')
          .update(alarmData)
          .eq('id', id);
        if (error) throw error;
        toast({ title: 'Alarm updated successfully' });
      } else {
        const { error } = await supabase
          .from('alarms')
          .insert([alarmData]);
        if (error) throw error;
        toast({ title: 'Alarm created successfully' });
      }

      navigate('/alarms');
    } catch (error: any) {
      toast({
        title: 'Error saving alarm',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto py-8">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6 pb-24">
        <Button variant="ghost" onClick={() => navigate('/alarms')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Alarms
        </Button>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>{id === 'new' ? 'New Alarm' : 'Edit Alarm'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Alarm Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Wake Up"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value: 'wake' | 'bedtime') => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wake">Wake</SelectItem>
                  <SelectItem value="bedtime">Bedtime</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Repeat on</Label>
              <div className="grid grid-cols-4 gap-2">
                {dayNames.map((day, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <Checkbox
                      id={`day-${idx}`}
                      checked={formData.days.includes(idx)}
                      onCheckedChange={() => toggleDay(idx)}
                    />
                    <label
                      htmlFor={`day-${idx}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {day.slice(0, 3)}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tone">Alarm Tone</Label>
              <Select
                value={formData.tone}
                onValueChange={(value) => setFormData({ ...formData, tone: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chime">Chime</SelectItem>
                  <SelectItem value="bell">Bell</SelectItem>
                  <SelectItem value="gentle">Gentle</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Volume</Label>
                <span className="text-sm text-muted-foreground">{formData.volume}%</span>
              </div>
              <div className="flex items-center gap-3">
                <Volume2 className="w-4 h-4 text-muted-foreground" />
                <Slider
                  value={[formData.volume]}
                  onValueChange={([v]) => setFormData({ ...formData, volume: v })}
                  max={100}
                  step={5}
                  className="flex-1"
                />
              </div>
            </div>

            <Button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-gradient-to-r from-primary to-primary/90"
              size="lg"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save Alarm'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AlarmEdit;
