
-- Fix the check_conversation_limit function to have an immutable search_path
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';
