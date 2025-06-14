
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

class AiChatService {
  private getSystemPrompt(mode: string, mood: string): string {
    const moodContext = {
      pleasant: "The user is feeling good and positive today.",
      unpleasant: "The user is going through something difficult and needs support.",
      calm: "The user is feeling peaceful and balanced."
    };

    const modeInstructions = {
      listen: "Just listen and acknowledge their feelings without giving advice. Keep responses short and empathetic.",
      advise: "Provide brief, practical advice and gentle guidance. Keep suggestions concise.",
      motivate: "Be encouraging and energetic but keep it brief and focused.",
      divine: "Engage in meaningful conversation but keep responses thoughtful yet concise."
    };

    return `You are AuraTalk, an empathetic AI companion. ${moodContext[mood as keyof typeof moodContext]} 

Mode: ${mode} - ${modeInstructions[mode as keyof typeof modeInstructions]}

IMPORTANT: Keep ALL responses under 100 words. Be warm, genuine, and concise. Focus on quality over quantity.`;
  }

  async generateResponse(userMessage: string, mode: string, mood: string): Promise<string> {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          mode,
          mood,
          systemPrompt: this.getSystemPrompt(mode, mood)
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate response');
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error generating AI response:', error);
      throw error;
    }
  }
}

export const aiChatService = new AiChatService();
