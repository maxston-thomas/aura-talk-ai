-- Revoke table privileges from anon/authenticated to hide from GraphQL/PostgREST.
-- Auth has been removed from the app; these tables are not accessed from the client.
REVOKE ALL ON public.profiles FROM anon, authenticated;
REVOKE ALL ON public.conversation_limits FROM anon, authenticated;
REVOKE ALL ON public.subscriptions FROM anon, authenticated;
REVOKE ALL ON public.trial_usage FROM anon, authenticated;

-- Ensure service_role retains full access (used by edge functions).
GRANT ALL ON public.profiles TO service_role;
GRANT ALL ON public.conversation_limits TO service_role;
GRANT ALL ON public.subscriptions TO service_role;
GRANT ALL ON public.trial_usage TO service_role;

-- Revoke EXECUTE on SECURITY DEFINER functions from anon/authenticated.
REVOKE EXECUTE ON FUNCTION public.increment_conversation_count(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.reset_conversation_count_after_ad(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.check_conversation_limit(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;