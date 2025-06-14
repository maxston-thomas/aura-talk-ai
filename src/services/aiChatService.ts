
import { supabase } from "@/integrations/supabase/client";

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export class AIChatService {
  async generateResponse(userMessage: string, mode: string, mood: string): Promise<string> {
    try {
      console.log('Calling AI chat function with:', { userMessage, mode, mood });
      
      const { data, error } = await supabase.functions.invoke('chat-ai', {
        body: {
          userMessage,
          mode,
          mood
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      console.log('AI response received:', data);
      return data.response || "I'm here to listen and support you. Could you tell me more about what's on your mind?";
    } catch (error) {
      console.error('Error generating AI response:', error);
      return "I'm here to listen and support you. Could you tell me more about what's on your mind?";
    }
  }
}

export const aiChatService = new AIChatService();
