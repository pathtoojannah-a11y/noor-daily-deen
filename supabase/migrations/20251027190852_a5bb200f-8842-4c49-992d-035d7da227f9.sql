-- Drop old reminder_settings table and create new reminders table
DROP TABLE IF EXISTS public.reminder_settings CASCADE;

-- Create new reminders table with flexible payload
CREATE TABLE IF NOT EXISTS public.reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  time TIME NOT NULL,
  days INTEGER[] DEFAULT ARRAY[0,1,2,3,4,5,6],
  payload JSONB DEFAULT '{
    "cards": {"ayah": true, "hadith": true, "dua": true, "dhikr": true, "reflection": true},
    "attachDuaId": null,
    "category": "general",
    "dhikrTarget": 10
  }'::jsonb,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on reminders
ALTER TABLE public.reminders ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for reminders
CREATE POLICY "Users can view their own reminders"
  ON public.reminders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own reminders"
  ON public.reminders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reminders"
  ON public.reminders FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reminders"
  ON public.reminders FOR DELETE
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_reminders_user_id ON public.reminders(user_id);
CREATE INDEX idx_reminders_enabled ON public.reminders(enabled) WHERE enabled = true;