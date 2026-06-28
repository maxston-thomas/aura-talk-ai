import React, { useState, useRef, useEffect } from 'react';
import Header from './Header';
import SupportSection from './SupportSection';
import Footer from './Footer';
import { toast } from 'sonner';
import { aiChatService, ChatMessage } from '@/services/aiChatService';
import FloatingSupportPanel from './chat/FloatingSupportPanel';
import ChatHeader from './chat/ChatHeader';
import ChatMessages from './chat/ChatMessages';
import ChatInput from './chat/ChatInput';
import ModeSidebar from './chat/ModeSidebar';

interface ChatInterfaceProps {
  mood: string;
  onBack: () => void;
  onAboutClick: () => void;
  onContactClick: () => void;
  onPrivacyClick: () => void;
  onTermsClick: () => void;
}

const ChatInterface = ({ 
  mood, 
  onBack, 
  onAboutClick, 
  onContactClick, 
  onPrivacyClick, 
  onTermsClick 
}: ChatInterfaceProps) => {
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
  const typingIntervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const placeholderTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const supportPanelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Check if support panel should be shown based on 3-day cooldown
  useEffect(() => {
    const checkSupportPanelDisplay = () => {
      const lastShownKey = 'supportPanel_lastShown';
      const lastShown = localStorage.getItem(lastShownKey);
      const threeDaysAgo = Date.now() - (3 * 24 * 60 * 60 * 1000);
      
      if (!lastShown || parseInt(lastShown) < threeDaysAgo) {
        setShowFloatingSupportPanel(true);
        setHasShownSupportPanel(true);
        localStorage.setItem(lastShownKey, Date.now().toString());
        
        supportPanelTimerRef.current = setTimeout(() => {
          setShowFloatingSupportPanel(false);
        }, 5000);
      }
    };

    if (!hasShownSupportPanel) {
      checkSupportPanelDisplay();
    }
  }, [hasShownSupportPanel]);

  // Placeholder animation with proper cleanup
  useEffect(() => {
    if (isInputFocused || hasUserTyped || inputValue.length > 0) {
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
        currentText = currentPhrase.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        
        if (currentCharIndex === currentPhrase.length) {
          isDeleting = true;
          placeholderTimeoutRef.current = setTimeout(() => {
            typeEffect();
          }, 2000);
          setPlaceholderText(currentText);
          return;
        }
      } else {
        currentText = currentPhrase.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        
        if (currentCharIndex === 0) {
          isDeleting = false;
          currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
          placeholderTimeoutRef.current = setTimeout(() => {
            typeEffect();
          }, 500);
          setPlaceholderText(currentText);
          return;
        }
      }
      
      setPlaceholderText(currentText);
      const speed = isDeleting ? 50 : 100;
      placeholderTimeoutRef.current = setTimeout(() => {
        typeEffect();
      }, speed);
    };

    placeholderTimeoutRef.current = setTimeout(() => {
      typeEffect();
    }, 100);

    return () => {
      if (placeholderTimeoutRef.current) {
        clearTimeout(placeholderTimeoutRef.current);
        placeholderTimeoutRef.current = null;
      }
    };
  }, [isInputFocused, hasUserTyped, inputValue]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
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
    }, 25);
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
      let sessionId = localStorage.getItem('chat_session_id');
      if (!sessionId) {
        sessionId = (crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`);
        localStorage.setItem('chat_session_id', sessionId);
      }
      const aiResult = await aiChatService.generateResponse(userMessage.content, selectedMode, mood, sessionId);
      const aiResponse = aiResult.response;
      
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

  const handleInputFocus = () => { setIsInputFocused(true); };
  const handleInputBlur = () => {
    setIsInputFocused(false);
    if (inputValue.length === 0) setHasUserTyped(false);
  };

  const handleModeSelect = (mode: string) => {
    if (!isTyping) {
      setSelectedMode(mode);
      setShowModeSidebar(false);
    }
  };

  const closeFloatingSupportPanel = () => {
    if (supportPanelTimerRef.current) clearTimeout(supportPanelTimerRef.current);
    setShowFloatingSupportPanel(false);
  };

  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
      if (placeholderTimeoutRef.current) clearTimeout(placeholderTimeoutRef.current);
      if (abortControllerRef.current) abortControllerRef.current.abort();
      if (supportPanelTimerRef.current) clearTimeout(supportPanelTimerRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-pink-400/10 dark:from-blue-600/20 dark:via-purple-600/20"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 dark:from-blue-600/30 dark:to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
      
      <Header />
      
      <FloatingSupportPanel 
        show={showFloatingSupportPanel}
        onClose={closeFloatingSupportPanel}
      />
      
      <ModeSidebar 
        show={showModeSidebar}
        selectedMode={selectedMode}
        onModeSelect={handleModeSelect}
        onClose={() => setShowModeSidebar(false)}
        isTyping={isTyping}
      />
      
      <div className="relative z-10 container mx-auto px-3 sm:px-4 py-6 pt-20 max-w-4xl flex-1 flex flex-col">
        <ChatHeader 
          mood={mood}
          onBack={onBack}
          onShowModeSidebar={() => setShowModeSidebar(true)}
          onToggleSupportSection={() => setShowSupportSection(!showSupportSection)}
          showSupportSection={showSupportSection}
        />

        {showSupportSection && (
          <div className="mb-4">
            <SupportSection />
          </div>
        )}

        <ChatMessages 
          messages={messages}
          isTyping={isTyping}
          typingText={typingText}
          onCancelTyping={cancelTyping}
          ref={messagesEndRef}
        />

        <ChatInput 
          inputValue={inputValue}
          onInputChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onSendMessage={handleSendMessage}
          placeholderText={placeholderText}
          isTyping={isTyping}
        />

        <div className="mt-4">
          <Footer
            onAboutClick={onAboutClick}
            onContactClick={onContactClick}
            onPrivacyClick={onPrivacyClick}
            onTermsClick={onTermsClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
