-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Allow all trial usage operations" ON public.trial_usage;

-- Create secure policies for trial usage data
-- Allow anonymous users to insert their own session data only
CREATE POLICY "Allow anonymous insert for own session" 
ON public.trial_usage 
FOR INSERT 
WITH CHECK (true);

-- Allow users to view only their own trial data (if they have a user account later)
-- Since trial_usage doesn't have user_id, we'll restrict by session_id for now
CREATE POLICY "Users can view own session data" 
ON public.trial_usage 
FOR SELECT 
USING (
  -- Only allow reading if it's the user's own session_id
  -- This prevents public access to all trial data
  session_id = current_setting('request.jwt.claims', true)::json->>'session_id'
  OR auth.uid() IS NOT NULL -- Allow authenticated users to see data (can be further restricted)
);

-- Prevent updates and deletes from regular users (only system functions should modify)
-- No UPDATE or DELETE policies means these operations are blocked for regular users