import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Save, ArrowLeft } from 'lucide-react';

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const ReminderEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    label: '',
    time: '12:00',
    days: [0, 1, 2, 3, 4, 5, 6],
    cards: { ayah: true, hadith: true, dua: true, dhikr: true, reflection: true },
    category: 'general',
    dhikrTarget: 33,
  });

  useEffect(() => {
    if (id && id !== 'new') {
      loadReminder();
    } else {
      setLoading(false);
    }
  }, [id]);

  const loadReminder = async () => {
    try {
      const { data, error } = await supabase.from('reminders').select('*').eq('id', id).single();
      if (error) throw error;
      if (data) {
        const payload = data.payload as any;
        setFormData({
          label: data.label,
          time: data.time.slice(0, 5),
          days: data.days,
          cards: payload.cards || { ayah: true, hadith: true, dua: true, dhikr: true, reflection: true },
          category: payload.category || 'general',
          dhikrTarget: payload.dhikrTarget || 33,
        });
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const toggleDay = (day: number) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.includes(day) ? prev.days.filter(d => d !== day) : [...prev.days, day].sort()
    }));
  };

  const handleSave = async () => {
    if (!formData.label.trim() || formData.days.length === 0) {
      toast({ title: 'Error', description: 'Please fill all required fields', variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const reminderData = {
        user_id: user.id,
        label: formData.label,
        time: formData.time + ':00',
        days: formData.days,
        payload: { cards: formData.cards, category: formData.category, dhikrTarget: formData.dhikrTarget },
        enabled: true,
      };

      if (id && id !== 'new') {
        const { error } = await supabase.from('reminders').update(reminderData).eq('id', id);
        if (error) throw error;
        toast({ title: 'Reminder updated' });
      } else {
        const { error } = await supabase.from('reminders').insert([reminderData]);
        if (error) throw error;
        toast({ title: 'Reminder created' });
      }

      navigate('/alarms');
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Layout><div className="max-w-2xl mx-auto py-8"><p>Loading...</p></div></Layout>;

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6 pb-24">
        <Button variant="ghost" onClick={() => navigate('/alarms')}>
          <ArrowLeft className="w-4 h-4 mr-2" />Back
        </Button>

        <Card className="border-2">
          <CardHeader><CardTitle>{id === 'new' ? 'New Reminder' : 'Edit Reminder'}</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Reminder Label</Label>
              <Input value={formData.label} onChange={(e) => setFormData({ ...formData, label: e.target.value })} placeholder="Morning" />
            </div>

            <div className="space-y-2">
              <Label>Time</Label>
              <Input type="time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} />
            </div>

            <div className="space-y-2">
              <Label>Days</Label>
              <div className="grid grid-cols-4 gap-2">
                {dayNames.map((day, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <Checkbox checked={formData.days.includes(idx)} onCheckedChange={() => toggleDay(idx)} />
                    <label className="text-sm">{day.slice(0, 3)}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label>Show Cards</Label>
              {Object.entries(formData.cards).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="capitalize">{key}</span>
                  <Switch checked={val} onCheckedChange={(c) => setFormData({ ...formData, cards: { ...formData.cards, [key]: c } })} />
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Label>Dhikr Target</Label>
              <Input type="number" value={formData.dhikrTarget} onChange={(e) => setFormData({ ...formData, dhikrTarget: parseInt(e.target.value) })} min={1} />
            </div>

            <Button onClick={handleSave} disabled={saving} className="w-full" size="lg">
              <Save className="w-4 h-4 mr-2" />{saving ? 'Saving...' : 'Save'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ReminderEdit;
