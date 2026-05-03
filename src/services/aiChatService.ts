
import { supabase } from "@/integrations/supabase/client";

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

class AiChatService {
  async generateResponse(userMessage: string, mode: string, mood: string, sessionId?: string): Promise<{ response: string; remaining?: number; limitReached?: boolean }> {
    try {
      const { data, error } = await supabase.functions.invoke('chat-ai', {
        body: { userMessage, mode, mood, sessionId },
      });

      if (error) {
        const limitReached = (data as any)?.limitReached === true;
        if (limitReached) return { response: '', remaining: 0, limitReached: true };
        throw new Error('Failed to generate response');
      }

      return { response: data.response, remaining: data.remaining };
    } catch (error) {
      console.error('Error generating AI response:', error);
      throw error;
    }
  }
}

export const aiChatService = new AiChatService();
