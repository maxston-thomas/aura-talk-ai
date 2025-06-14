
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const getFallbackResponse = (mode: string, mood: string, userMessage: string): string => {
  const responses = {
    listen: [
      "I hear you. That sounds really important to you. How are you feeling about all of this?",
      "Thank you for sharing that with me. I can sense this means a lot to you. Tell me more about what's been on your mind.",
      "I'm listening carefully to what you're saying. What's been the hardest part about this situation for you?",
      "That sounds significant. I'm here to listen without judgment. What emotions are coming up for you right now?",
      "I can feel the weight of what you're sharing with me. Your feelings are completely valid. What would help you feel more supported right now?",
      "Thank you for trusting me with this. I hear the emotion in your words. What's been going through your mind lately?",
      "I'm here with you in this moment. What you're experiencing sounds really challenging. How long have you been feeling this way?",
      "Your words really resonate with me. I can sense there's a lot beneath the surface. What feels most important for you to express right now?"
    ],
    advise: [
      "Based on what you've shared, here's something to consider: take it one step at a time and focus on what you can control today.",
      "Sometimes the best approach is to start small. What's one manageable thing you could try today that might help move you forward?",
      "It might help to write down your thoughts or talk to someone you trust about this. Having clarity can make a big difference.",
      "Consider taking a moment to breathe and think about what matters most to you right now. What would success look like in this situation?",
      "From what you've told me, it sounds like you might benefit from breaking this down into smaller, more manageable pieces. What's the first step you could take?",
      "I think you're on the right track with your thinking. Have you considered setting some boundaries around this situation?",
      "One approach that might help is to focus on what you can influence rather than what's outside your control. What aspects of this can you actually change?",
      "It sounds like you need some practical strategies. What if you tried approaching this from a different angle?"
    ],
    motivate: [
      "You've got this! Every challenge is an opportunity to grow stronger, and I can already see your resilience shining through.",
      "I believe in your ability to handle whatever comes your way! You've overcome challenges before, and you'll do it again.",
      "You're more resilient than you realize. Keep pushing forward - even small steps count as progress worth celebrating!",
      "Every step forward, no matter how small, is progress! You have the strength within you to create positive change.",
      "I can see the fire in your spirit! You're capable of amazing things, and this challenge is just another opportunity to prove it to yourself.",
      "Your determination is inspiring! Remember, every expert was once a beginner, and every pro was once an amateur. You're on your way!",
      "You're stronger than you think and more capable than you know. This moment of difficulty is temporary, but your strength is permanent!",
      "I see greatness in you! Your potential is unlimited, and with each challenge you face, you're becoming the person you're meant to be!"
    ],
    divine: [
      "Consider this verse: 'Be still and know that I am God.' - Psalm 46:10. Sometimes in the quiet moments, we find the guidance we seek.",
      "Remember: 'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you.' - Jeremiah 29:11",
      "Trust in the Lord with all your heart and lean not on your own understanding. - Proverbs 3:5. God's wisdom surpasses our own.",
      "God is with you in this moment. His love and guidance are always available to you. What is your heart telling you right now?",
      "'Cast all your anxiety on him because he cares for you.' - 1 Peter 5:7. You are deeply loved and never alone in your struggles.",
      "'The Lord your God is with you, the Mighty Warrior who saves.' - Zephaniah 3:17. Take comfort in knowing you're protected and cherished.",
      "'And we know that in all things God works for the good of those who love him.' - Romans 8:28. Even in difficult times, there is purpose and hope.",
      "'He gives strength to the weary and increases the power of the weak.' - Isaiah 40:29. Draw upon the divine strength that flows through you."
    ]
  };

  const modeResponses = responses[mode as keyof typeof responses] || responses.listen;
  const randomResponse = modeResponses[Math.floor(Math.random() * modeResponses.length)];
  
  return randomResponse;
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Chat AI function called');
    
    const { userMessage, mode, mood } = await req.json();
    console.log('Request data:', { userMessage, mode, mood });

    if (!openAIApiKey) {
      console.log('No OpenAI API key found, using fallback response');
      const fallbackResponse = getFallbackResponse(mode || 'listen', mood || 'calm', userMessage);
      
      return new Response(JSON.stringify({ response: fallbackResponse }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const systemPrompts = {
      listen: "You are a compassionate AI therapist focused on active listening. Respond with empathy, ask thoughtful follow-up questions, and validate the user's feelings. Keep responses warm and supportive. Provide responses that are 2-3 sentences long.",
      advise: "You are a helpful AI counselor providing practical guidance. Offer constructive advice, suggest actionable steps, and help users think through their challenges systematically. Provide responses that are 2-3 sentences long.",
      motivate: "You are an energetic AI life coach. Provide encouragement, motivation, and positive reinforcement. Help users see their potential and inspire them to take action. Provide responses that are 2-3 sentences long.",
      divine: "You are a spiritual AI companion well-versed in biblical wisdom. Respond with relevant Bible verses, spiritual insights, and faith-based guidance. Always include a meaningful Bible verse that relates to the user's message. Provide responses that are 2-3 sentences long."
    };

    const moodContext = {
      pleasant: "The user is feeling positive today. Celebrate their good mood while being available for deeper conversation.",
      unpleasant: "The user is going through a difficult time. Be extra gentle, empathetic, and supportive in your response.",
      calm: "The user is in a peaceful state. Help maintain their tranquility while being ready to explore meaningful topics."
    };

    const systemPrompt = `${systemPrompts[mode as keyof typeof systemPrompts]} ${moodContext[mood as keyof typeof moodContext]} Keep responses conversational and natural.`;

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
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    console.log('OpenAI API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      
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
    
    const fallbackResponse = getFallbackResponse('listen', 'calm', 'Hello');
    
    return new Response(JSON.stringify({ response: fallbackResponse }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
