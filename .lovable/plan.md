## Remove leftover OpenAI artifacts

I scanned the codebase: there are **no remaining OpenAI references** in any source file or edge function. `chat-ai/index.ts` already uses `LOVABLE_API_KEY` against `https://ai.gateway.lovable.dev`, and the fallback responses are just canned strings (not OpenAI calls).

The only leftover is the **`OPENAI_API_KEY` secret** still stored in Supabase Edge Function secrets. It's unused and safe to delete.

### Step
1. Delete the `OPENAI_API_KEY` secret from Supabase via `secrets--delete_secret`.

No code changes needed. After this, you can also cancel/revoke the key on your OpenAI dashboard for full cleanup (I can't do that from here — it lives in your OpenAI account).
