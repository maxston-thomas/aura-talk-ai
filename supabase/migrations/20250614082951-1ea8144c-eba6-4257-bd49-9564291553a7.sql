
-- Fix the handle_new_user function to have an immutable search_path
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';
