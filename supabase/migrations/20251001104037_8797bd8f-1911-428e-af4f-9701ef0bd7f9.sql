-- Add explicit SELECT policy to trial_usage to block all client access
-- This ensures tracking data (IP addresses, user agents) cannot be read by clients
-- Only the service role will be able to access this data for analytics

CREATE POLICY "Block all client SELECT access to trial usage data" 
ON public.trial_usage 
FOR SELECT 
TO authenticated, anon
USING (false);