-- Fix profiles table RLS to explicitly block anonymous access
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile only" ON public.profiles;

-- Create new policies that explicitly require authentication
CREATE POLICY "Authenticated users can view own profile" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Authenticated users can update own profile" 
ON public.profiles 
FOR UPDATE 
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Authenticated users can insert own profile only" 
ON public.profiles 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = id);

-- Fix subscriptions table RLS to explicitly block anonymous access
DROP POLICY IF EXISTS "Users can view own subscription" ON public.subscriptions;
DROP POLICY IF EXISTS "Users can insert own subscription" ON public.subscriptions;

-- Create new policies that explicitly require authentication
CREATE POLICY "Authenticated users can view own subscription" 
ON public.subscriptions 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can insert own subscription" 
ON public.subscriptions 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);