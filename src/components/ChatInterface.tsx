
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, Sparkles, ArrowLeft, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useMessageLimits } from '@/hooks/useMessageLimits';
import ModeSelector from './ModeSelector';
import { toast } from 'sonner';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatInterfaceProps {
  mood: string;
  onBack: () => void;
}

const ChatInterface = ({ mood, onBack }: ChatInterfaceProps) => {
  const { user, signOut } = useAuth();
  const { canSend, currentCount, limitReached, incrementCount, resetAfterAd } = useMessageLimits();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedMode, setSelectedMode] = useState('listen');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize conversation based on mood and mode
    const getInitialMessage = () => {
      const moodMessages = {
        pleasant: "I can sense you're feeling good today! That's wonderful. I'm here to share in your positive energy.",
        unpleasant: "I can sense you're going through something difficult right now. I'm here to listen and support you through this.",
        calm: "I can feel your peaceful energy today. I'm here to help you maintain that sense of balance and tranquility."
      };

      const modeContext = {
        listen: "I'm here to listen without judgment. Share whatever is on your mind.",
        advise: "I'm here to offer gentle guidance and practical suggestions when you need them.",
        motivate: "I'm here to encourage and energize you! Let's make today amazing.",
        divine: "I'm here for deep, spiritual conversation. Let's explore the meaningful questions together."
      };

      return `${moodMessages[mood as keyof typeof moodMessages]} ${modeContext[selectedMode as keyof typeof modeContext]} What would you like to talk about?`;
    };

    setMessages([{
      id: '1',
      content: getInitialMessage(),
      sender: 'ai',
      timestamp: new Date(),
    }]);
  }, [mood, selectedMode]);

  const generateAIResponse = (userMessage: string, mode: string, mood: string) => {
    // Simple AI response based on mode and mood
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
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !canSend) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Increment message count
    await incrementCount();

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(userMessage.content, selectedMode, mood),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  const handleWatchAd = () => {
    // Simulate ad watch
    toast.success('Ad completed! Your message limit has been reset.');
    resetAfterAd();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-pink-400/10"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="hover:bg-white/30 rounded-full"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-slate-800">AuraTalk</h2>
                <p className="text-sm text-slate-600">Mood: {mood}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600">{user?.email}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="hover:bg-white/30 rounded-full"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mode Selector */}
        <ModeSelector selectedMode={selectedMode} onModeSelect={setSelectedMode} />

        {/* Message Limit Warning */}
        {limitReached && (
          <Card className="bg-orange-50 border-orange-200 p-4 mb-4">
            <div className="text-center">
              <p className="text-orange-800 mb-3">
                You've reached your daily message limit. Watch an ad or upgrade to continue chatting!
              </p>
              <Button
                onClick={handleWatchAd}
                className="bg-orange-500 hover:bg-orange-600 text-white mr-2"
              >
                Watch Ad (Reset Limit)
              </Button>
              <Button variant="outline">
                Upgrade to Premium
              </Button>
            </div>
          </Card>
        )}

        {/* Chat Messages */}
        <Card className="bg-white/40 backdrop-blur-md border-white/30 mb-4 h-[calc(100vh-400px)] overflow-hidden">
          <div className="p-6 h-full overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'bg-white/60 backdrop-blur-sm text-slate-800'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-slate-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/60 backdrop-blur-sm text-slate-800 px-4 py-3 rounded-2xl max-w-xs">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </Card>

        {/* Input Area */}
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={canSend ? "Type your message here..." : "Daily limit reached..."}
            disabled={!canSend}
            className="flex-1 bg-white/40 backdrop-blur-md border-white/30 focus:bg-white/60 rounded-xl"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || !canSend || isTyping}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl px-6"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Usage Counter */}
        <div className="text-center mt-4">
          <p className="text-sm text-slate-600">
            💬 {Math.max(0, 10 - currentCount)} conversations remaining today
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
