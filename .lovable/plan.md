## Goal

Replace the OpenAI API call inside the `chat-ai` edge function with a call to the Lovable AI Gateway so you stop paying OpenAI per request and use Lovable's included free monthly usage instead.

## Changes

**`supabase/functions/chat-ai/index.ts`**
- Replace `OPENAI_API_KEY` env reference with `LOVABLE_API_KEY` (auto-provisioned, no setup needed).
- Change the upstream URL from `https://api.openai.com/v1/chat/completions` to `https://ai.gateway.lovable.dev/v1/chat/completions`.
- Change the model from `gpt-4o-mini` to `google/gemini-3-flash-preview` (fast, cheap default).
- Drop OpenAI-specific params (`max_tokens`, `temperature`) — keep `messages` only. System prompts and mood context stay the same.
- Add explicit handling for gateway errors:
  - `429` → return 429 with "Rate limits exceeded, please try again in a moment."
  - `402` → return 402 with "AI credits exhausted. Please add funds to your Lovable workspace."
  - Other non-OK → fall back to canned response (existing behavior).
- Keep the existing server-side trial-limit enforcement, input validation, CORS, and fallback responses untouched.

## What stays the same

- Trial cap (5 interactions per session) enforced via `trial_usage`.
- `aiChatService` and `TrialChat` / `ChatInterface` on the frontend — request/response shape is unchanged.
- The `OPENAI_API_KEY` secret can be left in place or deleted later; it will simply no longer be read.

## Notes

- Lovable AI includes a free monthly allowance, then usage-based pricing. No OpenAI billing after this change.
- Default model `google/gemini-3-flash-preview` is the recommended balance of speed/cost; we can swap to `google/gemini-2.5-flash` or `openai/gpt-5-mini` later if you want different quality.
