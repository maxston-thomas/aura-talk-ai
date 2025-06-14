
import React from 'react';
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';
import ModeSelector from '../ModeSelector';

interface ModeSidebarProps {
  show: boolean;
  selectedMode: string;
  onModeSelect: (mode: string) => void;
  onClose: () => void;
  isTyping: boolean;
}

const ModeSidebar = ({ show, selectedMode, onModeSelect, onClose, isTyping }: ModeSidebarProps) => {
  return (
    <>
      {/* Mode Sidebar with improved liquid crystal style */}
      <div className={`fixed top-0 right-0 h-full w-72 sm:w-80 bg-white/20 dark:bg-slate-800/20 backdrop-blur-[20px] border-l border-white/30 dark:border-slate-700/30 z-40 transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${show ? 'translate-x-0 shadow-2xl' : 'translate-x-full'}`}>
        <div className="p-4 sm:p-6 pt-20 sm:pt-24 h-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Modes</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="hover:bg-white/20 dark:hover:bg-slate-800/20 rounded-full p-2 transition-all duration-300"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Vertical Mode Selector */}
          <ModeSelector 
            selectedMode={selectedMode} 
            onModeSelect={onModeSelect}
            disabled={isTyping}
            layout="vertical"
          />
        </div>
      </div>

      {/* Overlay with reduced opacity */}
      {show && (
        <div 
          className="fixed inset-0 bg-black/5 backdrop-blur-sm z-30 transition-all duration-700"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default ModeSidebar;
