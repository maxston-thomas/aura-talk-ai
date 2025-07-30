-- Create trial_usage table to track demo interactions
CREATE TABLE public.trial_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  interaction_count INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.trial_usage ENABLE ROW LEVEL SECURITY;

-- Create policy for trial usage (allow all operations since this is anonymous usage)
CREATE POLICY "Allow all trial usage operations" ON public.trial_usage
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create index for performance
CREATE INDEX idx_trial_usage_session_id ON public.trial_usage(session_id);
CREATE INDEX idx_trial_usage_created_at ON public.trial_usage(created_at);

-- Update existing conversation_limits table to track premium usage
ALTER TABLE public.conversation_limits 
ADD COLUMN IF NOT EXISTS is_premium BOOLEAN DEFAULT false;