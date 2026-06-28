import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const getFallbackResponse = (mode: string): string => {
  const responses: Record<string, string[]> = {
    listen: ["I hear you. Tell me more about what's on your mind."],
    advise: ["Take it one step at a time and focus on what you can control today."],
    motivate: ["You've got this! Every challenge is an opportunity to grow stronger."],
    divine: ["'Be still and know that I am God.' - Psalm 46:10"],
  };
  const arr = responses[mode] || responses.listen;
  return arr[Math.floor(Math.random() * arr.length)];
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { userMessage, mode, mood } = body;

    if (typeof userMessage !== 'string' || userMessage.length === 0 || userMessage.length > 2000) {
      return new Response(JSON.stringify({ error: 'Invalid message' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let aiResponse: string;

    if (!LOVABLE_API_KEY) {
      aiResponse = getFallbackResponse(mode || 'listen');
    } else {
      const systemPrompts: Record<string, string> = {
        listen: "You are a compassionate AI therapist focused on active listening. Respond with empathy in 2-3 sentences.",
        advise: "You are a helpful AI counselor providing practical guidance in 2-3 sentences.",
        motivate: "You are an energetic AI life coach. Provide encouragement in 2-3 sentences.",
        divine: "You are a spiritual AI companion. Include a relevant Bible verse. 2-3 sentences.",
      };
      const moodContext: Record<string, string> = {
        pleasant: "The user is feeling positive.",
        unpleasant: "The user is going through a difficult time. Be gentle.",
        calm: "The user is in a peaceful state.",
      };
      const systemPrompt = `${systemPrompts[mode] || systemPrompts.listen} ${moodContext[mood] || ''}`;

      const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-3-flash-preview',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage },
          ],
        }),
      });

      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limits exceeded, please try again in a moment.' }), {
          status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'AI credits exhausted. Please add funds to your Lovable workspace.' }), {
          status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      if (!response.ok) {
        const errText = await response.text();
        console.error('Lovable AI gateway error:', response.status, errText);
        aiResponse = getFallbackResponse(mode || 'listen');
      } else {
        const data = await response.json();
        aiResponse = data?.choices?.[0]?.message?.content || getFallbackResponse(mode || 'listen');
      }
    }

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat-ai function:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
