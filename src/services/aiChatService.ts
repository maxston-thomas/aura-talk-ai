
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
    // Simulate API call to AI service (replace with actual AI integration)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const responses = {
      listen: [
        "I hear you. That sounds really important to you.",
        "Thank you for sharing that with me. How does that make you feel?",
        "I'm listening. Tell me more about that.",
        "That must be significant for you to bring it up."
      ],
      advise: [
        "Here's something that might help: try breaking this down into smaller, manageable steps.",
        "Have you considered looking at this from a different perspective?",
        "One approach could be to focus on what you can control in this situation.",
        "Sometimes it helps to write down your thoughts to gain clarity."
      ],
      motivate: [
        "You've got this! Every challenge is an opportunity to grow stronger.",
        "I believe in your ability to handle whatever comes your way!",
        "Remember, you've overcome difficulties before - you have that strength within you.",
        "Today is a new chance to make progress, no matter how small!"
      ],
      divine: [
        "This touches on something deeper. What does your intuition tell you about this?",
        "In the grand tapestry of life, every thread has its purpose. What meaning do you find here?",
        "Sometimes the universe speaks to us through our experiences. What might this be teaching you?",
        "There's wisdom in this moment. What feels most true to your heart?"
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
        }, 150); // Adjust timing as needed
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
