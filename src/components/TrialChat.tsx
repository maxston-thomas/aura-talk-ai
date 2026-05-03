import React, { useState, useRef, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Crown, Sparkles, MessageCircle, IndianRupee } from 'lucide-react';
import { toast } from 'sonner';
import { aiChatService, ChatMessage } from '@/services/aiChatService';
import { supabase } from "@/integrations/supabase/client";
import MoodSelector from './MoodSelector';
import ModeSelector from './ModeSelector';

interface TrialChatProps {
  onSubscribeClick: () => void;
  onSupportClick: () => void;
}

const TrialChat = ({ onSubscribeClick, onSupportClick }: TrialChatProps) => {
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedMode, setSelectedMode] = useState('listen');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [interactionCount, setInteractionCount] = useState(0);
  const [sessionId] = useState(() => Math.random().toString(36).substring(2, 15));
  const [showUpgrade, setShowUpgrade] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Trial usage is tracked & enforced server-side in the chat-ai edge function.


  const simulateTyping = (text: string, callback: () => void) => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }
    
    setTypingText('');
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

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    const welcomeMessage: ChatMessage = {
      id: '1',
      content: `Welcome to AuraTalk! I can sense you're feeling ${mood} today. This is a trial version with 5 free interactions. How can I help you?`,
      sender: 'ai',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !selectedMood) return;

    if (interactionCount >= 5) {
      setShowUpgrade(true);
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    try {
      const aiResult = await aiChatService.generateResponse(userMessage.content, selectedMode, selectedMood, sessionId);

      if (aiResult.limitReached) {
        setShowUpgrade(true);
        return;
      }

      const serverCount = (aiResult as any).remaining !== undefined ? 5 - (aiResult.remaining ?? 0) : interactionCount + 1;
      setInteractionCount(serverCount);

      let finalResponse = aiResult.response;
      const remaining = aiResult.remaining ?? Math.max(0, 5 - serverCount);
      if (remaining <= 1) {
        finalResponse += `\n\n✨ You have ${remaining} trial interaction${remaining === 1 ? '' : 's'} remaining. Subscribe for unlimited access!`;
      }

      simulateTyping(finalResponse, () => {
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: finalResponse,
          sender: 'ai',
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, aiMessage]);

        if (remaining <= 0) {
          setTimeout(() => setShowUpgrade(true), 1000);
        }
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

  if (showUpgrade) {
    return (
      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-8 text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Crown className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
          Trial Complete!
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6 text-lg">
          You've experienced the power of AuraTalk! Subscribe now for unlimited conversations and premium features.
        </p>
        <div className="space-y-4">
          <Button 
            onClick={onSubscribeClick}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl py-3 text-lg font-semibold"
          >
            <Crown className="w-5 h-5 mr-2" />
            Subscribe Now - ₹199/month
          </Button>
          <Button 
            onClick={onSupportClick}
            variant="outline"
            className="w-full border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-xl py-3"
          >
            <IndianRupee className="w-5 h-5 mr-2" />
            Support Us
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-6">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="w-6 h-6 text-blue-500" />
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            Try AuraTalk Demo
          </h3>
        </div>
        <p className="text-slate-600 dark:text-slate-400">
          Experience 5 free AI conversations • No signup required
        </p>
        <div className="mt-2 flex items-center justify-center gap-2">
          <MessageCircle className="w-4 h-4 text-green-500" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {5 - interactionCount} interactions remaining
          </span>
        </div>
      </div>

      {!selectedMood ? (
        <div className="space-y-6">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
              How are you feeling today?
            </h4>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'pleasant', name: 'Pleasant', emoji: '😊', gradient: 'from-green-400 to-emerald-500' },
              { id: 'unpleasant', name: 'Unpleasant', emoji: '😔', gradient: 'from-orange-400 to-red-500' },
              { id: 'calm', name: 'Calm', emoji: '🧘', gradient: 'from-blue-400 to-indigo-500' }
            ].map((mood) => (
              <Button
                key={mood.id}
                onClick={() => handleMoodSelect(mood.id)}
                className={`h-auto p-4 flex flex-col items-center gap-2 bg-gradient-to-r ${mood.gradient} text-white hover:scale-105 transition-transform rounded-xl`}
              >
                <span className="text-2xl">{mood.emoji}</span>
                <span className="font-medium text-sm">{mood.name}</span>
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Mode Selector */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Conversation Mode</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { id: 'listen', name: 'Listen', emoji: '👂' },
                { id: 'advise', name: 'Advise', emoji: '💡' },
                { id: 'motivate', name: 'Motivate', emoji: '⚡' },
                { id: 'divine', name: 'Divine', emoji: '✨' }
              ].map((mode) => (
                <Button
                  key={mode.id}
                  onClick={() => setSelectedMode(mode.id)}
                  variant={selectedMode === mode.id ? "default" : "outline"}
                  className={`h-auto p-2 flex flex-col items-center gap-1 text-xs ${
                    selectedMode === mode.id 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                      : 'bg-white/60 dark:bg-slate-800/60'
                  }`}
                >
                  <span>{mode.emoji}</span>
                  <span>{mode.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-64 overflow-y-auto bg-white/40 dark:bg-slate-800/40 rounded-lg p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'bg-white/80 dark:bg-slate-700/80 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-lg bg-white/80 dark:bg-slate-700/80 text-slate-800 dark:text-slate-200 text-sm">
                  {typingText}
                  <span className="animate-pulse">|</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share your thoughts..."
              disabled={isTyping || interactionCount >= 5}
              className="flex-1 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-white/30 dark:border-slate-700/30 rounded-xl"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping || interactionCount >= 5}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl px-4"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {/* Subscription Prompt */}
          <div className="text-center space-y-3 pt-4 border-t border-white/20 dark:border-slate-700/20">
            <Button 
              onClick={onSubscribeClick}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl py-3 font-semibold"
            >
              <Crown className="w-4 h-4 mr-2" />
              Subscribe Now - ₹199/month
            </Button>
            <Button 
              onClick={onSupportClick}
              variant="outline"
              className="w-full border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-xl"
            >
              <IndianRupee className="w-4 h-4 mr-2" />
              Support Us
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default TrialChat;