
-- Remove PII columns from trial_usage and remove anon insert policy
ALTER TABLE public.trial_usage DROP COLUMN IF EXISTS ip_address;
ALTER TABLE public.trial_usage DROP COLUMN IF EXISTS user_agent;

DROP POLICY IF EXISTS "Allow anonymous insert for own session" ON public.trial_usage;

-- Add ownership guards to SECURITY DEFINER functions
CREATE OR REPLACE FUNCTION public.increment_conversation_count(user_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF auth.uid() IS NULL OR auth.uid() <> user_id THEN
    RAISE EXCEPTION 'Access denied';
  END IF;

  INSERT INTO public.conversation_limits (user_id, date, message_count)
  VALUES (user_id, CURRENT_DATE, 1)
  ON CONFLICT (user_id, date)
  DO UPDATE SET 
    message_count = public.conversation_limits.message_count + 1,
    updated_at = NOW();
END;
$function$;

CREATE OR REPLACE FUNCTION public.reset_conversation_count_after_ad(user_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF auth.uid() IS NULL OR auth.uid() <> user_id THEN
    RAISE EXCEPTION 'Access denied';
  END IF;

  INSERT INTO public.conversation_limits (user_id, date, message_count, ads_watched_count)
  VALUES (user_id, CURRENT_DATE, 0, 1)
  ON CONFLICT (user_id, date)
  DO UPDATE SET 
    message_count = 0,
    ads_watched_count = public.conversation_limits.ads_watched_count + 1,
    updated_at = NOW();
END;
$function$;

CREATE OR REPLACE FUNCTION public.check_conversation_limit(user_id uuid)
 RETURNS TABLE(can_send boolean, current_count integer, limit_reached boolean)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  today_count INTEGER := 0;
  is_premium BOOLEAN := FALSE;
BEGIN
  IF auth.uid() IS NULL OR auth.uid() <> user_id THEN
    RAISE EXCEPTION 'Access denied';
  END IF;

  SELECT EXISTS(
    SELECT 1 FROM public.subscriptions 
    WHERE subscriptions.user_id = check_conversation_limit.user_id 
    AND is_active = TRUE 
    AND (expires_at IS NULL OR expires_at > NOW())
  ) INTO is_premium;
  
  IF is_premium THEN
    RETURN QUERY SELECT TRUE, 0, FALSE;
    RETURN;
  END IF;
  
  SELECT COALESCE(message_count, 0) INTO today_count
  FROM public.conversation_limits
  WHERE conversation_limits.user_id = check_conversation_limit.user_id
  AND date = CURRENT_DATE;
  
  RETURN QUERY SELECT 
    today_count < 10 AS can_send,
    today_count AS current_count,
    today_count >= 10 AS limit_reached;
END;
$function$;
