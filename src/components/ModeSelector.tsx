
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Ear, Lightbulb, Zap, Sparkles } from 'lucide-react';

interface ModeSelectorProps {
  selectedMode: string;
  onModeSelect: (mode: string) => void;
  disabled?: boolean;
}

const ModeSelector = ({ selectedMode, onModeSelect, disabled = false }: ModeSelectorProps) => {
  const modes = [
    {
      id: 'listen',
      name: 'Just Listen',
      icon: Ear,
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      id: 'advise',
      name: 'Advise',
      icon: Lightbulb,
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      id: 'motivate',
      name: 'Motivate',
      icon: Zap,
      gradient: 'from-green-400 to-blue-500'
    },
    {
      id: 'divine',
      name: 'Divine',
      icon: Sparkles,
      gradient: 'from-indigo-400 to-purple-600'
    }
  ];

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
