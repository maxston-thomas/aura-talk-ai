
import React, { forwardRef } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, X } from 'lucide-react';
import { ChatMessage } from '@/services/aiChatService';

interface ChatMessagesProps {
  messages: ChatMessage[];
  isTyping: boolean;
  typingText: string;
  onCancelTyping: () => void;
}

const ChatMessages = forwardRef<HTMLDivElement, ChatMessagesProps>(({ 
  messages, 
  isTyping, 
  typingText, 
  onCancelTyping 
}, messagesEndRef) => {
  return (
    <>
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

      {/* Loading Indicator with Cancel Button */}
      {isTyping && (
        <div className="flex justify-center items-center mb-3">
          <div className="flex items-center gap-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/30 dark:border-slate-700/30 rounded-full px-4 py-2">
            <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
            <span className="text-sm text-slate-600 dark:text-slate-400">AI is working...</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancelTyping}
              className="h-6 w-6 p-0 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full"
            >
              <X className="w-3 h-3 text-red-500" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
});

ChatMessages.displayName = 'ChatMessages';

export default ChatMessages;
