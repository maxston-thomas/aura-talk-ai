
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, Sparkles, ArrowLeft, LogOut, Volume2, VolumeX } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useMessageLimits } from '@/hooks/useMessageLimits';
import ModeSelector from './ModeSelector';
import SubscriptionModal from './SubscriptionModal';
import { toast } from 'sonner';
import { aiChatService, ChatMessage } from '@/services/aiChatService';

interface ChatInterfaceProps {
  mood: string;
  onBack: () => void;
}

const ChatInterface = ({ mood, onBack }: ChatInterfaceProps) => {
  const { user, signOut } = useAuth();
  const { canSend, currentCount, limitReached, incrementCount, resetAfterAd } = useMessageLimits();
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedMode, setSelectedMode] = useState('listen');
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [highlightedWord, setHighlightedWord] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (limitReached) {
      setShowSubscriptionModal(true);
    }
  }, [limitReached]);

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

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !canSend) return;

    const userMessage: ChatMessage = {
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

    try {
      // Generate AI response
      const aiResponse = await aiChatService.generateResponse(userMessage.content, selectedMode, mood);
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);

      // Auto-speak the AI response
      if (!isSpeaking) {
        handleSpeakMessage(aiResponse);
      }
    } catch (error) {
      console.error('Error generating AI response:', error);
      setIsTyping(false);
      toast.error('Failed to generate response. Please try again.');
    }
  };

  const handleSpeakMessage = async (text: string) => {
    if (isSpeaking) {
      aiChatService.stopSpeaking();
      setIsSpeaking(false);
      setHighlightedWord('');
      return;
    }

    setIsSpeaking(true);
    try {
      await aiChatService.speakText(text, (word) => {
        setHighlightedWord(word);
      });
    } catch (error) {
      console.error('Error speaking text:', error);
    } finally {
      setIsSpeaking(false);
      setHighlightedWord('');
    }
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

  const handleUpgrade = (plan: string) => {
    toast.success(`Redirecting to ${plan} plan...`);
    setShowSubscriptionModal(false);
  };

  const handleWatchAd = () => {
    toast.success('Ad completed! Your message limit has been reset.');
    resetAfterAd();
    setShowSubscriptionModal(false);
  };

  const renderMessageContent = (content: string, isAI: boolean) => {
    if (!isAI || !highlightedWord) return content;
    
    return content.split(' ').map((word, index) => (
      <span
        key={index}
        className={word === highlightedWord ? 'bg-yellow-200 dark:bg-yellow-800' : ''}
      >
        {word}{' '}
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-pink-400/10 dark:from-blue-600/20 dark:via-purple-600/20 dark:to-pink-600/20"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 dark:from-blue-600/30 dark:to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="hover:bg-white/30 dark:hover:bg-slate-800/30 rounded-full"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-slate-800 dark:text-slate-200">AuraTalk</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">Mood: {mood}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600 dark:text-slate-400">{user?.email}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="hover:bg-white/30 dark:hover:bg-slate-800/30 rounded-full"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mode Selector */}
        <ModeSelector selectedMode={selectedMode} onModeSelect={setSelectedMode} />

        {/* Chat Messages */}
        <Card className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 mb-4 h-[calc(100vh-400px)] overflow-hidden">
          <div className="p-6 h-full overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex items-start gap-2 max-w-xs lg:max-w-md">
                    <div
                      className={`px-4 py-3 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                          : 'bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <p className="text-sm">
                        {renderMessageContent(message.content, message.sender === 'ai')}
                      </p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {message.sender === 'ai' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSpeakMessage(message.content)}
                        className="mt-1 hover:bg-white/30 dark:hover:bg-slate-800/30"
                      >
                        {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm text-slate-800 dark:text-slate-200 px-4 py-3 rounded-2xl max-w-xs">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 dark:bg-slate-300 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 dark:bg-slate-300 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-slate-400 dark:bg-slate-300 rounded-full animate-bounce delay-200"></div>
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
            className="flex-1 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 focus:bg-white/60 dark:focus:bg-slate-800/60 rounded-xl"
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
          <p className="text-sm text-slate-600 dark:text-slate-400">
            💬 {Math.max(0, 10 - currentCount)} conversations remaining today
          </p>
        </div>
      </div>

      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        onUpgrade={handleUpgrade}
        onWatchAd={handleWatchAd}
      />
    </div>
  );
};

export default ChatInterface;
