
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
      listen: "Just listen and acknowledge their feelings without giving advice. Keep responses empathetic and supportive.",
      advise: "Provide practical advice and gentle guidance. Offer constructive suggestions.",
      motivate: "Be encouraging and energetic. Help them see their potential and inspire action.",
      divine: "Engage in meaningful spiritual conversation. Include relevant Bible verses when appropriate."
    };

    return `You are AuraTalk, an empathetic AI companion. ${moodContext[mood as keyof typeof moodContext]} 

Mode: ${mode} - ${modeInstructions[mode as keyof typeof modeInstructions]}

Be warm, genuine, and conversational. Provide thoughtful responses that match the selected mode.`;
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
