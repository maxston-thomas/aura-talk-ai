import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, Sparkles, ArrowLeft, Loader2, Gift } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import ModeSelector from './ModeSelector';
import Header from './Header';
import SupportSection from './SupportSection';
import { toast } from 'sonner';
import { aiChatService, ChatMessage } from '@/services/aiChatService';

interface ChatInterfaceProps {
  mood: string;
  onBack: () => void;
}

const ChatInterface = ({ mood, onBack }: ChatInterfaceProps) => {
  const { user } = useAuth();
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedMode, setSelectedMode] = useState('listen');
  const [typingText, setTypingText] = useState('');
  const [currentTypingIndex, setCurrentTypingIndex] = useState(0);
  const [showSupportSection, setShowSupportSection] = useState(false);
  const [placeholderText, setPlaceholderText] = useState('Share your thoughts here');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [hasUserTyped, setHasUserTyped] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const placeholderIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Placeholder animation
  useEffect(() => {
    if (isInputFocused || hasUserTyped || inputValue.length > 0) {
      if (placeholderIntervalRef.current) {
        clearInterval(placeholderIntervalRef.current);
      }
      setPlaceholderText('Share your thoughts here or share what is on your heart.');
      return;
    }

    const phrases = [
      'Share your thoughts here',
      'or share what is on your heart.'
    ];
    
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let currentText = '';

    const typeEffect = () => {
      const currentPhrase = phrases[currentPhraseIndex];
      
      if (!isDeleting) {
        currentText = currentPhrase.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        
        if (currentCharIndex === currentPhrase.length) {
          isDeleting = true;
          setTimeout(() => {
            placeholderIntervalRef.current = setInterval(typeEffect, 50);
          }, 2000);
          return;
        }
      } else {
        currentText = currentPhrase.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        
        if (currentCharIndex === 0) {
          isDeleting = false;
          currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
          setTimeout(() => {
            placeholderIntervalRef.current = setInterval(typeEffect, 100);
          }, 500);
          return;
        }
      }
      
      setPlaceholderText(currentText);
    };

    placeholderIntervalRef.current = setInterval(typeEffect, 100);

    return () => {
      if (placeholderIntervalRef.current) {
        clearInterval(placeholderIntervalRef.current);
      }
    };
  }, [isInputFocused, hasUserTyped, inputValue]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingText]);

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

  const simulateTyping = (text: string, callback: () => void) => {
    setTypingText('');
    setCurrentTypingIndex(0);
    setIsTyping(true);

    typingIntervalRef.current = setInterval(() => {
      setCurrentTypingIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        setTypingText(text.slice(0, nextIndex));
        
        if (nextIndex >= text.length) {
          if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
          }
          setIsTyping(false);
          setTypingText('');
          callback();
          return prevIndex;
        }
        
        return nextIndex;
      });
    }, 30);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    try {
      const aiResponse = await aiChatService.generateResponse(userMessage.content, selectedMode, mood);
      
      simulateTyping(aiResponse, () => {
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: aiResponse,
          sender: 'ai',
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, aiMessage]);
      });
    } catch (error) {
      console.error('Error generating AI response:', error);
      setIsTyping(false);
      setTypingText('');
      toast.error('Failed to generate response. Please try again.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (e.target.value.length > 0 && !hasUserTyped) {
      setHasUserTyped(true);
    }
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
    if (inputValue.length === 0) {
      setHasUserTyped(false);
    }
  };

  const handleModeSelect = (mode: string) => {
    if (!isTyping) {
      setSelectedMode(mode);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 relative overflow-hidden flex flex-col">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-pink-400/10 dark:from-blue-600/20 dark:via-purple-600/20"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 dark:from-blue-600/30 dark:to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
      
      <Header />
      
      <div className="relative z-10 container mx-auto px-3 sm:px-4 py-6 max-w-4xl flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="hover:bg-white/30 dark:hover:bg-slate-800/30 rounded-full p-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200">AuraTalk</h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Mood: {mood}</p>
            </div>
          </div>
          
          {/* Support Us Button */}
          <div className="ml-auto">
            <Button
              onClick={() => setShowSupportSection(!showSupportSection)}
              variant="ghost"
              size="sm"
              className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 hover:bg-white/60 dark:hover:bg-slate-800/60 px-3 py-2"
            >
              <Gift className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Support Section */}
        {showSupportSection && (
          <div className="mb-4">
            <SupportSection />
          </div>
        )}

        {/* Mode Selector */}
        <div className="mb-4">
          <ModeSelector 
            selectedMode={selectedMode} 
            onModeSelect={handleModeSelect}
            disabled={isTyping}
          />
        </div>

        {/* Chat Messages - Now takes remaining space */}
        <Card className="bg-white/40 dark:bg-slate-800/80 backdrop-blur-md border-white/30 dark:border-slate-700/40 mb-4 flex-1 overflow-hidden shadow-md">
          <div className="p-3 sm:p-6 h-full overflow-y-auto">
            <div className="space-y-3 sm:space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex items-start gap-1 sm:gap-2 max-w-[85%] sm:max-w-xs lg:max-w-md">
                    <div
                      className={`px-3 sm:px-4 py-2 sm:py-3 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                          : 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-slate-800 dark:text-slate-100 shadow'
                      }`}
                    >
                      <p className="text-xs sm:text-sm leading-relaxed">
                        {message.content}
                      </p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-slate-500 dark:text-slate-300'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing Animation */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-slate-800 dark:text-slate-100 px-3 sm:px-4 py-2 sm:py-3 rounded-2xl max-w-[85%] sm:max-w-xs lg:max-w-md">
                    <p className="text-xs sm:text-sm">
                      {typingText}
                      <span className="animate-pulse">|</span>
                    </p>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
        </Card>

        {/* Loading Indicator */}
        {isTyping && (
          <div className="flex justify-center items-center mb-3">
            <div className="flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/30 dark:border-slate-700/30 rounded-full px-4 py-2">
              <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
              <span className="text-sm text-slate-600 dark:text-slate-400">AI is thinking...</span>
            </div>
          </div>
        )}

        {/* Input Area - Now at the bottom */}
        <div className="flex gap-2 items-end">
          <Input
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder={placeholderText}
            disabled={isTyping}
            className="flex-1 bg-white/60 dark:bg-slate-800/80 backdrop-blur-md border-white/30 dark:border-slate-700/30 focus:bg-white/80 dark:focus:bg-slate-800/90 rounded-xl text-sm sm:text-base py-5 min-h-[64px]"
            style={{ minHeight: 64 }}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl px-6 transition-all duration-200 focus:scale-110 active:scale-95 animate-airplane"
            style={{
              minHeight: 64,
              transition: 'transform 0.15s cubic-bezier(.4,0,.2,1)',
              willChange: 'transform'
            }}
          >
            <span className="inline-block motion-safe:animate-none group-hover:animate-airplane-hover">
              <Send className="w-4 h-4" />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
