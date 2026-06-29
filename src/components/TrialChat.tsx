import React, { useState, useRef, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles, IndianRupee } from 'lucide-react';
import { toast } from 'sonner';
import { aiChatService, ChatMessage } from '@/services/aiChatService';

interface TrialChatProps {
  onSupportClick: () => void;
}

const TrialChat = ({ onSupportClick }: TrialChatProps) => {
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedMode, setSelectedMode] = useState('listen');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingIntervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const simulateTyping = (text: string, callback: () => void) => {
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    setTypingText('');
    setIsTyping(true);
    let i = 0;
    typingIntervalRef.current = setInterval(() => {
      i++;
      setTypingText(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(typingIntervalRef.current!);
        typingIntervalRef.current = null;
        setIsTyping(false);
        setTypingText('');
        callback();
      }
    }, 25);
  };

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    setMessages([{
      id: '1',
      content: `Welcome to AuraTalk! I can sense you're feeling ${mood} today. How can I help you?`,
      sender: 'ai',
      timestamp: new Date(),
    }]);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !selectedMood) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    try {
      const aiResult = await aiChatService.generateResponse(userMessage.content, selectedMode, selectedMood);
      simulateTyping(aiResult.response, () => {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          content: aiResult.response,
          sender: 'ai',
          timestamp: new Date(),
        }]);
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

  return (
    <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-6">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="w-6 h-6 text-blue-500" />
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            Try AuraTalk
          </h3>
        </div>
        <p className="text-slate-600 dark:text-slate-400">
          AI conversations • No signup required
        </p>
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

          <div className="h-64 overflow-y-auto bg-white/40 dark:bg-slate-800/40 rounded-lg p-4 space-y-3">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'bg-white/80 dark:bg-slate-700/80 text-slate-800 dark:text-slate-200'
                }`}>
                  {message.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-lg bg-white/80 dark:bg-slate-700/80 text-slate-800 dark:text-slate-200 text-sm">
                  {typingText}<span className="animate-pulse">|</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share your thoughts..."
              disabled={isTyping}
              className="flex-1 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-white/30 dark:border-slate-700/30 rounded-xl"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl px-4"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          <div className="text-center pt-4 border-t border-white/20 dark:border-slate-700/20">
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
