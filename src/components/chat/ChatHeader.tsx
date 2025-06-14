
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, Settings, Gift } from 'lucide-react';

interface ChatHeaderProps {
  mood: string;
  onBack: () => void;
  onShowModeSidebar: () => void;
  onToggleSupportSection: () => void;
  showSupportSection: boolean;
}

const ChatHeader = ({ 
  mood, 
  onBack, 
  onShowModeSidebar, 
  onToggleSupportSection, 
  showSupportSection 
}: ChatHeaderProps) => {
  return (
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
        onClick={onShowModeSidebar}
        variant="ghost"
        size="sm"
        className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 hover:bg-white/60 dark:hover:bg-slate-800/60 px-4 sm:px-8 py-4 sm:py-6 text-base sm:text-lg h-auto"
      >
        <Settings className="w-6 h-6 sm:w-7 sm:h-7 mr-2 sm:mr-3" />
        <span className="font-medium">Modes</span>
      </Button>
      
      {/* Support Us Button - Smaller on mobile */}
      <div className="ml-auto">
        <Button
          onClick={onToggleSupportSection}
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
  );
};

export default ChatHeader;
