-- Create alarms table
CREATE TABLE public.alarms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  time TIME NOT NULL,
  days INT[] DEFAULT '{0,1,2,3,4,5,6}',
  type TEXT NOT NULL CHECK (type IN ('wake', 'reminder', 'bedtime')),
  tone TEXT DEFAULT 'chime',
  volume INT DEFAULT 70 CHECK (volume >= 0 AND volume <= 100),
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on alarms
ALTER TABLE public.alarms ENABLE ROW LEVEL SECURITY;

-- RLS policies for alarms
CREATE POLICY "Users can view their own alarms"
  ON public.alarms FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own alarms"
  ON public.alarms FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own alarms"
  ON public.alarms FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own alarms"
  ON public.alarms FOR DELETE
  USING (auth.uid() = user_id);

-- Update reminder_settings to match new reminders structure
ALTER TABLE public.reminder_settings
  ADD COLUMN IF NOT EXISTS label TEXT,
  ADD COLUMN IF NOT EXISTS time TIME,
  ADD COLUMN IF NOT EXISTS days INT[];

-- Create adhkar_preferences table
CREATE TABLE public.adhkar_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  morning_category TEXT DEFAULT 'morning',
  evening_category TEXT DEFAULT 'evening',
  bedtime_category TEXT DEFAULT 'bedtime',
  dhikr_targets JSONB DEFAULT '{"morning":10,"evening":33,"bedtime":33}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on adhkar_preferences
ALTER TABLE public.adhkar_preferences ENABLE ROW LEVEL SECURITY;

-- RLS policies for adhkar_preferences
CREATE POLICY "Users can view their own adhkar preferences"
  ON public.adhkar_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own adhkar preferences"
  ON public.adhkar_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own adhkar preferences"
  ON public.adhkar_preferences FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own adhkar preferences"
  ON public.adhkar_preferences FOR DELETE
  USING (auth.uid() = user_id);