
import { supabase } from "@/integrations/supabase/client";

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

class AiChatService {
  async generateResponse(userMessage: string, mode: string, mood: string): Promise<string> {
    try {
      console.log('Calling Supabase edge function with:', { userMessage, mode, mood });
      
      const { data, error } = await supabase.functions.invoke('chat-ai', {
        body: {
          userMessage,
          mode,
          mood
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error('Failed to generate response');
      }

      console.log('AI response received:', data);
      return data.response;
    } catch (error) {
      console.error('Error generating AI response:', error);
      throw error;
    }
  }
}

export const aiChatService = new AiChatService();
