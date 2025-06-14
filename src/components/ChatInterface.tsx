
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, Sparkles, ArrowLeft, Loader2, Gift, X, Settings } from 'lucide-react';
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
  const [showModeSidebar, setShowModeSidebar] = useState(false);
  const [showFloatingSupportPanel, setShowFloatingSupportPanel] = useState(false);
  const [hasShownSupportPanel, setHasShownSupportPanel] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const placeholderTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Check if support panel should be shown based on first-time chat and 3-day cooldown
  useEffect(() => {
    const checkSupportPanelDisplay = () => {
      const lastShownKey = `supportPanel_lastShown_${user?.id}`;
      const lastShown = localStorage.getItem(lastShownKey);
      const threeDaysAgo = Date.now() - (3 * 24 * 60 * 60 * 1000); // 3 days in milliseconds
      
      if (!lastShown || parseInt(lastShown) < threeDaysAgo) {
        // Show support panel for first-time users or after 3-day cooldown
        setShowFloatingSupportPanel(true);
        setHasShownSupportPanel(true);
        localStorage.setItem(lastShownKey, Date.now().toString());
      }
    };

    // Only check on component mount for first-time display
    if (user && !hasShownSupportPanel) {
      checkSupportPanelDisplay();
    }
  }, [user, hasShownSupportPanel]);

  // Placeholder animation with proper cleanup
  useEffect(() => {
    if (isInputFocused || hasUserTyped || inputValue.length > 0) {
      // Clear any existing timeout
      if (placeholderTimeoutRef.current) {
        clearTimeout(placeholderTimeoutRef.current);
        placeholderTimeoutRef.current = null;
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
        // Typing phase
        currentText = currentPhrase.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        
        if (currentCharIndex === currentPhrase.length) {
          // Finished typing current phrase, start deleting after pause
          isDeleting = true;
          placeholderTimeoutRef.current = setTimeout(() => {
            typeEffect();
          }, 2000); // Pause before deleting
          setPlaceholderText(currentText);
          return;
        }
      } else {
        // Deleting phase
        currentText = currentPhrase.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        
        if (currentCharIndex === 0) {
          // Finished deleting, move to next phrase
          isDeleting = false;
          currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
          placeholderTimeoutRef.current = setTimeout(() => {
            typeEffect();
          }, 500); // Brief pause before typing next phrase
          setPlaceholderText(currentText);
          return;
        }
      }
      
      setPlaceholderText(currentText);
      
      // Continue the animation with consistent timing
      const speed = isDeleting ? 50 : 100; // Faster deletion, slower typing
      placeholderTimeoutRef.current = setTimeout(() => {
        typeEffect();
      }, speed);
    };

    // Start the animation
    placeholderTimeoutRef.current = setTimeout(() => {
      typeEffect();
    }, 100);

    // Cleanup function
    return () => {
      if (placeholderTimeoutRef.current) {
        clearTimeout(placeholderTimeoutRef.current);
        placeholderTimeoutRef.current = null;
      }
    };
  }, [isInputFocused, hasUserTyped, inputValue]);

  // ... keep existing code (scrollToBottom function and useEffect for scrolling)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingText]);

  // ... keep existing code (useEffect for initial message)

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
    // Clear any existing typing interval
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
    
    setTypingText('');
    setCurrentTypingIndex(0);
    setIsTyping(true);

    let currentIndex = 0;
    
    typingIntervalRef.current = setInterval(() => {
      currentIndex++;
      setTypingText(text.slice(0, currentIndex));
      
      if (currentIndex >= text.length) {
        if (typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current);
          typingIntervalRef.current = null;
        }
        setIsTyping(false);
        setTypingText('');
        callback();
      }
    }, 25); // Faster typing speed
  };

  const cancelTyping = () => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsTyping(false);
    setTypingText('');
    toast.info('Response cancelled');
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

    abortControllerRef.current = new AbortController();

    try {
      console.log('Sending message to AI service:', { content: userMessage.content, mode: selectedMode, mood });
      const aiResponse = await aiChatService.generateResponse(userMessage.content, selectedMode, mood);
      
      if (!abortControllerRef.current?.signal.aborted) {
        simulateTyping(aiResponse, () => {
          const aiMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            content: aiResponse,
            sender: 'ai',
            timestamp: new Date(),
          };
          
          setMessages(prev => [...prev, aiMessage]);
        });
      }
    } catch (error) {
      if (!abortControllerRef.current?.signal.aborted) {
        console.error('Error generating AI response:', error);
        setIsTyping(false);
        setTypingText('');
        toast.error('Failed to generate response. Please try again.');
      }
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
      setShowModeSidebar(false);
    }
  };

  const closeFloatingSupportPanel = () => {
    setShowFloatingSupportPanel(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
      if (placeholderTimeoutRef.current) {
        clearTimeout(placeholderTimeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 relative overflow-hidden flex flex-col">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-pink-400/10 dark:from-blue-600/20 dark:via-purple-600/20"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 dark:from-blue-600/30 dark:to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
      
      <Header />
      
      {/* Floating Support Panel */}
      {showFloatingSupportPanel && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-md w-full">
            <Button
              variant="ghost"
              size="sm"
              onClick={closeFloatingSupportPanel}
              className="absolute -top-2 -right-2 z-10 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 rounded-full p-2 shadow-lg"
            >
              <X className="w-4 h-4" />
            </Button>
            <SupportSection />
          </div>
        </div>
      )}
      
      {/* Mode Sidebar with improved liquid crystal style */}
      <div className={`fixed top-0 right-0 h-full w-72 sm:w-80 bg-white/20 dark:bg-slate-800/20 backdrop-blur-[20px] border-l border-white/30 dark:border-slate-700/30 z-40 transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${showModeSidebar ? 'translate-x-0 shadow-2xl' : 'translate-x-full'}`}>
        <div className="p-4 sm:p-6 pt-20 sm:pt-24 h-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Modes</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowModeSidebar(false)}
              className="hover:bg-white/20 dark:hover:bg-slate-800/20 rounded-full p-2 transition-all duration-300"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Vertical Mode Selector */}
          <ModeSelector 
            selectedMode={selectedMode} 
            onModeSelect={handleModeSelect}
            disabled={isTyping}
            layout="vertical"
          />
        </div>
      </div>

      {/* Overlay with reduced opacity */}
      {showModeSidebar && (
        <div 
          className="fixed inset-0 bg-black/5 backdrop-blur-sm z-30 transition-all duration-700"
          onClick={() => setShowModeSidebar(false)}
        />
      )}
      
      {/* Content with padding to avoid header collision */}
      <div className="relative z-10 container mx-auto px-3 sm:px-4 py-6 pt-20 max-w-4xl flex-1 flex flex-col">
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
          
          {/* Modes Button - Made bigger */}
          <Button
            onClick={() => setShowModeSidebar(true)}
            variant="ghost"
            size="sm"
            className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 hover:bg-white/60 dark:hover:bg-slate-800/60 px-3 sm:px-6 py-3 sm:py-4 text-sm sm:text-base h-auto"
          >
            <Settings className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
            <span className="font-medium">Modes</span>
          </Button>
          
          {/* Support Us Button - Smaller on mobile */}
          <div className="ml-auto">
            <Button
              onClick={() => setShowSupportSection(!showSupportSection)}
              variant="ghost"
              size="sm"
              className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 hover:bg-white/60 dark:hover:bg-slate-800/60 px-2 sm:px-4 py-1 sm:py-3 text-xs sm:text-base"
            >
              <Gift className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Support Us</span>
              <span className="sm:hidden">Help</span>
            </Button>
          </div>
        </div>

        {/* Support Section */}
        {showSupportSection && (
          <div className="mb-4">
            <SupportSection />
          </div>
        )}

        {/* Chat Messages */}
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

        {/* Loading Indicator with Cancel Button - Updated text */}
        {isTyping && (
          <div className="flex justify-center items-center mb-3">
            <div className="flex items-center gap-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/30 dark:border-slate-700/30 rounded-full px-4 py-2">
              <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
              <span className="text-sm text-slate-600 dark:text-slate-400">AI is working...</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={cancelTyping}
                className="h-6 w-6 p-0 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full"
              >
                <X className="w-3 h-3 text-red-500" />
              </Button>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="flex gap-2 items-end">
          <Input
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder={placeholderText}
            disabled={isTyping}
            className="flex-1 bg-white/60 dark:bg-slate-800/80 backdrop-blur-md border-white/30 dark:border-slate-700/30 focus:bg-white/80 dark:focus:bg-slate-800/90 rounded-xl text-sm sm:text-base py-3 sm:py-5 min-h-[48px] sm:min-h-[64px]"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl px-4 sm:px-6 transition-all duration-200 focus:scale-110 active:scale-95 h-[48px] sm:h-[64px]"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
