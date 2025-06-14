
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Chat AI function called');
    
    if (!openAIApiKey) {
      console.error('OpenAI API key not found');
      throw new Error('OpenAI API key not configured');
    }

    const { userMessage, mode, mood } = await req.json();
    console.log('Request data:', { userMessage, mode, mood });

    // Define system prompts based on mode
    const systemPrompts = {
      listen: "You are a compassionate AI therapist focused on active listening. Respond with empathy, ask thoughtful follow-up questions, and validate the user's feelings. Keep responses warm and supportive.",
      advise: "You are a helpful AI counselor providing practical guidance. Offer constructive advice, suggest actionable steps, and help users think through their challenges systematically.",
      motivate: "You are an energetic AI life coach. Provide encouragement, motivation, and positive reinforcement. Help users see their potential and inspire them to take action.",
      divine: "You are a spiritual AI companion well-versed in biblical wisdom. Respond with relevant Bible verses, spiritual insights, and faith-based guidance. Always include a meaningful Bible verse that relates to the user's message."
    };

    // Adjust response based on mood
    const moodContext = {
      pleasant: "The user is feeling positive today. Celebrate their good mood while being available for deeper conversation.",
      unpleasant: "The user is going through a difficult time. Be extra gentle, empathetic, and supportive in your response.",
      calm: "The user is in a peaceful state. Help maintain their tranquility while being ready to explore meaningful topics."
    };

    const systemPrompt = `${systemPrompts[mode as keyof typeof systemPrompts]} ${moodContext[mood as keyof typeof moodContext]} Keep responses conversational, natural, and under 150 words.`;

    console.log('Calling OpenAI API...');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    console.log('AI response generated successfully');
    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat-ai function:', error);
    return new Response(JSON.stringify({ 
      error: "I'm here to listen and support you. Could you tell me more about what's on your mind?" 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
