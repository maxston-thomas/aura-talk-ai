
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
      // For now, using mock responses. In production, integrate with OpenAI API
      const responses = await this.getMockResponse(userMessage, mode, mood);
      return responses;
    } catch (error) {
      console.error('Error generating AI response:', error);
      return "I'm here to listen and support you. Could you tell me more about what's on your mind?";
    }
  }

  private async getMockResponse(userMessage: string, mode: string, mood: string): Promise<string> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const responses = {
      listen: [
        "I hear you. That sounds really important to you.",
        "Thank you for sharing that with me. How does that make you feel?",
        "I'm listening. Tell me more about that.",
        "That must be significant for you to bring it up.",
        "I can sense the emotion in your words. Please continue."
      ],
      advise: [
        "Here's something that might help: try breaking this down into smaller, manageable steps.",
        "Have you considered looking at this from a different perspective?",
        "One approach could be to focus on what you can control in this situation.",
        "Sometimes it helps to write down your thoughts to gain clarity.",
        "Consider taking a step back and asking yourself what advice you'd give a friend in this situation."
      ],
      motivate: [
        "You've got this! Every challenge is an opportunity to grow stronger.",
        "I believe in your ability to handle whatever comes your way!",
        "Remember, you've overcome difficulties before - you have that strength within you.",
        "Today is a new chance to make progress, no matter how small!",
        "Your resilience shines through. Keep moving forward, one step at a time."
      ],
      divine: [
        "\"Cast all your anxiety on him because he cares for you.\" - 1 Peter 5:7. What comfort does this bring to your heart?",
        "\"For I know the plans I have for you,\" declares the Lord, \"plans to prosper you and not to harm you, to give you hope and a future.\" - Jeremiah 29:11",
        "\"The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing.\" - Zephaniah 3:17",
        "\"Come to me, all you who are weary and burdened, and I will give you rest.\" - Matthew 11:28. How might this verse speak to your current situation?",
        "\"And we know that in all things God works for the good of those who love him, who have been called according to his purpose.\" - Romans 8:28"
      ]
    };

    const modeResponses = responses[mode as keyof typeof responses] || responses.listen;
    return modeResponses[Math.floor(Math.random() * modeResponses.length)];
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
