
-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  launch_user_number INTEGER,
  is_first_100_user BOOLEAN DEFAULT FALSE,
  discount_percentage INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create conversation_limits table to track daily message usage
CREATE TABLE public.conversation_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  message_count INTEGER DEFAULT 0,
  ads_watched_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Create subscriptions table to track premium users
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('monthly', 'yearly', 'lifetime')),
  is_active BOOLEAN DEFAULT TRUE,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Anyone can insert profile" ON public.profiles
  FOR INSERT WITH CHECK (true);

-- Create RLS policies for conversation_limits
CREATE POLICY "Users can view own limits" ON public.conversation_limits
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own limits" ON public.conversation_limits
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own limits" ON public.conversation_limits
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for subscriptions
CREATE POLICY "Users can view own subscription" ON public.subscriptions
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own subscription" ON public.subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  current_user_count INTEGER;
BEGIN
  -- Get current user count to assign launch number
  SELECT COUNT(*) + 1 INTO current_user_count FROM public.profiles;
  
  -- Insert profile with launch number and discount logic
  INSERT INTO public.profiles (id, email, launch_user_number, is_first_100_user, discount_percentage)
  VALUES (
    NEW.id,
    NEW.email,
    current_user_count,
    current_user_count <= 100,
    CASE WHEN current_user_count <= 100 THEN 50 ELSE 0 END
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to check conversation limit
CREATE OR REPLACE FUNCTION public.check_conversation_limit(user_id UUID)
RETURNS TABLE(can_send BOOLEAN, current_count INTEGER, limit_reached BOOLEAN) AS $$
DECLARE
  today_count INTEGER := 0;
  is_premium BOOLEAN := FALSE;
BEGIN
  -- Check if user has active subscription
  SELECT EXISTS(
    SELECT 1 FROM public.subscriptions 
    WHERE subscriptions.user_id = check_conversation_limit.user_id 
    AND is_active = TRUE 
    AND (expires_at IS NULL OR expires_at > NOW())
  ) INTO is_premium;
  
  -- If premium, no limits
  IF is_premium THEN
    RETURN QUERY SELECT TRUE, 0, FALSE;
    RETURN;
  END IF;
  
  -- Get today's message count
  SELECT COALESCE(message_count, 0) INTO today_count
  FROM public.conversation_limits
  WHERE conversation_limits.user_id = check_conversation_limit.user_id
  AND date = CURRENT_DATE;
  
  -- Return result
  RETURN QUERY SELECT 
    today_count < 10 AS can_send,
    today_count AS current_count,
    today_count >= 10 AS limit_reached;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment conversation count
CREATE OR REPLACE FUNCTION public.increment_conversation_count(user_id UUID)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.conversation_limits (user_id, date, message_count)
  VALUES (user_id, CURRENT_DATE, 1)
  ON CONFLICT (user_id, date)
  DO UPDATE SET 
    message_count = conversation_limits.message_count + 1,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to reset conversation count after ad watch
CREATE OR REPLACE FUNCTION public.reset_conversation_count_after_ad(user_id UUID)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.conversation_limits (user_id, date, message_count, ads_watched_count)
  VALUES (user_id, CURRENT_DATE, 0, 1)
  ON CONFLICT (user_id, date)
  DO UPDATE SET 
    message_count = 0,
    ads_watched_count = conversation_limits.ads_watched_count + 1,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
