
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Fallback responses for when OpenAI is not available
const getFallbackResponse = (mode: string, mood: string, userMessage: string): string => {
  const responses = {
    listen: [
      "I hear you. That sounds really important to you.",
      "Thank you for sharing that with me. How are you feeling about it?",
      "I'm listening. Tell me more about what's on your mind.",
      "That sounds significant. What's been the hardest part about this?"
    ],
    advise: [
      "Based on what you've shared, here's something to consider: take it one step at a time.",
      "Sometimes the best approach is to start small. What's one thing you could try today?",
      "It might help to write down your thoughts or talk to someone you trust.",
      "Consider taking a moment to breathe and think about what matters most to you right now."
    ],
    motivate: [
      "You've got this! Every challenge is an opportunity to grow stronger.",
      "I believe in your ability to handle whatever comes your way!",
      "You're more resilient than you realize. Keep pushing forward!",
      "Every step forward, no matter how small, is progress worth celebrating!"
    ],
    divine: [
      "Consider this verse: 'Be still and know that I am God.' - Psalm 46:10",
      "Remember: 'For I know the plans I have for you, declares the Lord.' - Jeremiah 29:11",
      "Trust in the Lord with all your heart and lean not on your own understanding. - Proverbs 3:5",
      "God is with you in this moment. His love and guidance are always available."
    ]
  };

  const modeResponses = responses[mode as keyof typeof responses] || responses.listen;
  const randomResponse = modeResponses[Math.floor(Math.random() * modeResponses.length)];
  
  return randomResponse;
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Chat AI function called');
    
    const { userMessage, mode, mood } = await req.json();
    console.log('Request data:', { userMessage, mode, mood });

    // If no OpenAI API key, return fallback response
    if (!openAIApiKey) {
      console.log('No OpenAI API key found, using fallback response');
      const fallbackResponse = getFallbackResponse(mode || 'listen', mood || 'calm', userMessage);
      
      return new Response(JSON.stringify({ response: fallbackResponse }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

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

    const systemPrompt = `${systemPrompts[mode as keyof typeof systemPrompts]} ${moodContext[mood as keyof typeof moodContext]} Keep responses conversational, natural, and under 80 words.`;

    console.log('Calling OpenAI API...');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        max_tokens: 120,
        temperature: 0.7,
      }),
    });

    console.log('OpenAI API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      
      // Return fallback response instead of error
      const fallbackResponse = getFallbackResponse(mode || 'listen', mood || 'calm', userMessage);
      
      return new Response(JSON.stringify({ response: fallbackResponse }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    console.log('OpenAI response data:', data);
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid OpenAI response structure:', data);
      
      // Return fallback response
      const fallbackResponse = getFallbackResponse(mode || 'listen', mood || 'calm', userMessage);
      
      return new Response(JSON.stringify({ response: fallbackResponse }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    const aiResponse = data.choices[0].message.content;
    
    console.log('AI response generated successfully:', aiResponse);
    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat-ai function:', error);
    
    // Return fallback response instead of error
    const fallbackResponse = getFallbackResponse('listen', 'calm', 'Hello');
    
    return new Response(JSON.stringify({ response: fallbackResponse }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
