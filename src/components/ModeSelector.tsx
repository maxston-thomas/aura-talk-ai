
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Ear, Lightbulb, Zap, Sparkles } from 'lucide-react';

interface ModeSelectorProps {
  selectedMode: string;
  onModeSelect: (mode: string) => void;
  disabled?: boolean;
  layout?: 'grid' | 'vertical';
}

const ModeSelector = ({ selectedMode, onModeSelect, disabled = false, layout = 'grid' }: ModeSelectorProps) => {
  const modes = [
    {
      id: 'listen',
      name: 'Just Listen',
      subtitle: 'Pure listening without judgment or advice',
      icon: Ear,
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      id: 'advise',
      name: 'Advise',
      subtitle: 'Gentle guidance and practical solutions',
      icon: Lightbulb,
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      id: 'motivate',
      name: 'Motivate',
      subtitle: 'Energetic encouragement and positivity',
      icon: Zap,
      gradient: 'from-green-400 to-blue-500'
    },
    {
      id: 'divine',
      name: 'Divine',
      subtitle: 'Spiritual and philosophical conversations',
      icon: Sparkles,
      gradient: 'from-indigo-400 to-purple-600'
    }
  ];

  if (layout === 'vertical') {
    return (
      <div className="space-y-4">
        {modes.map((mode) => {
          const IconComponent = mode.icon;
          const isSelected = selectedMode === mode.id;

          return (
            <Button
              key={mode.id}
              variant={isSelected ? "default" : "outline"}
              onClick={() => !disabled && onModeSelect(mode.id)}
              disabled={disabled}
              className={`w-full h-auto px-4 py-5 flex flex-col items-start gap-2 transition-all duration-300 text-left
                ${isSelected 
                  ? `bg-gradient-to-r ${mode.gradient} text-white border-none shadow-lg` 
                  : 'bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm border-white/30 dark:border-slate-700/30 hover:bg-white/60 dark:hover:bg-slate-800/60'}
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] cursor-pointer'}`}
            >
              <div className="flex items-center gap-3 w-full">
                <IconComponent className="w-5 h-5 flex-shrink-0" />
                <div className="font-medium text-sm">{mode.name}</div>
              </div>
              <div className={`text-xs leading-relaxed w-full ${
                isSelected ? 'text-white/90' : 'text-slate-600 dark:text-slate-400'
              }`}>
                {mode.subtitle}
              </div>
            </Button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4 text-center">
        Choose your conversation mode
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {modes.map((mode) => {
          const IconComponent = mode.icon;
          const isSelected = selectedMode === mode.id;

          return (
            <Button
              key={mode.id}
              variant={isSelected ? "default" : "outline"}
              onClick={() => !disabled && onModeSelect(mode.id)}
              disabled={disabled}
              className={`h-auto px-3 py-3 flex flex-col items-center gap-2 transition-all duration-200 
                ${isSelected 
                  ? `scale-90 bg-gradient-to-r ${mode.gradient} text-white border-none` 
                  : 'scale-100 bg-white/60 backdrop-blur-sm border-white/30 hover:bg-white/80'}
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 focus:scale-100'}
                ${disabled ? '' : 'cursor-pointer'}`}
              style={{ minHeight: 60, minWidth: 0 }}
              onMouseEnter={e => { if(isSelected && !disabled) e.currentTarget.style.transform = "scale(1.0)" }}
              onMouseLeave={e => { if(isSelected && !disabled) e.currentTarget.style.transform = "scale(0.9)" }}
            >
              <IconComponent className="w-5 h-5" />
              <div className="font-medium text-sm">{mode.name}</div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default ModeSelector;
