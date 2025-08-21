-- Security fixes migration

-- 1. Lock down trial_usage SELECT access - remove the overly permissive SELECT policy
DROP POLICY IF EXISTS "Users can view own session data" ON public.trial_usage;
-- Now only INSERT is allowed for anonymous users, no SELECT access

-- 2. Tighten profiles INSERT policy to prevent arbitrary inserts
DROP POLICY IF EXISTS "Anyone can insert profile" ON public.profiles;
CREATE POLICY "Users can insert own profile only" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- 3. Harden SECURITY DEFINER functions with proper search_path
CREATE OR REPLACE FUNCTION public.reset_conversation_count_after_ad(user_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO public
AS $function$
BEGIN
  INSERT INTO public.conversation_limits (user_id, date, message_count, ads_watched_count)
  VALUES (user_id, CURRENT_DATE, 0, 1)
  ON CONFLICT (user_id, date)
  DO UPDATE SET 
    message_count = 0,
    ads_watched_count = public.conversation_limits.ads_watched_count + 1,
    updated_at = NOW();
END;
$function$;

CREATE OR REPLACE FUNCTION public.increment_conversation_count(user_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO public
AS $function$
BEGIN
  INSERT INTO public.conversation_limits (user_id, date, message_count)
  VALUES (user_id, CURRENT_DATE, 1)
  ON CONFLICT (user_id, date)
  DO UPDATE SET 
    message_count = public.conversation_limits.message_count + 1,
    updated_at = NOW();
END;
$function$;

CREATE OR REPLACE FUNCTION public.check_conversation_limit(user_id uuid)
 RETURNS TABLE(can_send boolean, current_count integer, limit_reached boolean)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO public
AS $function$
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
$function$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO public
AS $function$
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
$function$;