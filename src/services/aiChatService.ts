import { supabase } from "@/integrations/supabase/client";

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

class AiChatService {
  async generateResponse(userMessage: string, mode: string, mood: string): Promise<{ response: string }> {
    try {
      const { data, error } = await supabase.functions.invoke('chat-ai', {
        body: { userMessage, mode, mood },
      });

      if (error) {
        throw new Error('Failed to generate response');
      }

      return { response: data.response };
    } catch (error) {
      console.error('Error generating AI response:', error);
      throw error;
    }
  }
}

export const aiChatService = new AiChatService();
