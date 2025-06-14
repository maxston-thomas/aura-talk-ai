
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from 'lucide-react';

interface ChatInputProps {
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onFocus: () => void;
  onBlur: () => void;
  onSendMessage: () => void;
  placeholderText: string;
  isTyping: boolean;
}

const ChatInput = ({ 
  inputValue, 
  onInputChange, 
  onKeyPress, 
  onFocus, 
  onBlur, 
  onSendMessage, 
  placeholderText, 
  isTyping 
}: ChatInputProps) => {
  return (
    <div className="flex gap-2 items-end">
      <Input
        value={inputValue}
        onChange={onInputChange}
        onKeyPress={onKeyPress}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholderText}
        disabled={isTyping}
        className="flex-1 bg-white/60 dark:bg-slate-800/80 backdrop-blur-md border-white/30 dark:border-slate-700/30 focus:bg-white/80 dark:focus:bg-slate-800/90 rounded-xl text-sm sm:text-base py-3 sm:py-5 min-h-[48px] sm:min-h-[64px]"
      />
      <Button
        onClick={onSendMessage}
        disabled={!inputValue.trim() || isTyping}
        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl px-4 sm:px-6 transition-all duration-200 focus:scale-110 active:scale-95 h-[48px] sm:h-[64px]"
      >
        <Send className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default ChatInput;
