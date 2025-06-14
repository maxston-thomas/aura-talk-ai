
import { supabase } from "@/integrations/supabase/client";

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export class AIChatService {
  private speechSynthesis: SpeechSynthesis;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    this.speechSynthesis = window.speechSynthesis;
  }

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

  speakText(text: string, onWordSpoken?: (word: string) => void): Promise<void> {
    return new Promise((resolve) => {
      if (this.currentUtterance) {
        this.speechSynthesis.cancel();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.8;

      // Word-by-word highlighting simulation
      if (onWordSpoken) {
        const words = text.split(' ');
        let currentWordIndex = 0;
        
        const wordInterval = setInterval(() => {
          if (currentWordIndex < words.length) {
            onWordSpoken(words[currentWordIndex]);
            currentWordIndex++;
          } else {
            clearInterval(wordInterval);
          }
        }, 150);
      }

      utterance.onend = () => {
        this.currentUtterance = null;
        resolve();
      };

      utterance.onerror = () => {
        this.currentUtterance = null;
        resolve();
      };

      this.currentUtterance = utterance;
      this.speechSynthesis.speak(utterance);
    });
  }

  stopSpeaking(): void {
    if (this.speechSynthesis.speaking) {
      this.speechSynthesis.cancel();
    }
    this.currentUtterance = null;
  }
}

export const aiChatService = new AIChatService();
