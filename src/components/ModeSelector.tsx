
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Ear, Lightbulb, Zap, Sparkles } from 'lucide-react';

interface ModeSelectorProps {
  selectedMode: string;
  onModeSelect: (mode: string) => void;
}

const ModeSelector = ({ selectedMode, onModeSelect }: ModeSelectorProps) => {
  const modes = [
    {
      id: 'listen',
      name: 'Just Listen',
      description: 'AI listens and reflects without advice',
      icon: Ear,
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      id: 'advise',
      name: 'Advise',
      description: 'Gentle, practical suggestions',
      icon: Lightbulb,
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      id: 'motivate',
      name: 'Motivate',
      description: 'Positive and energetic encouragement',
      icon: Zap,
      gradient: 'from-green-400 to-blue-500'
    },
    {
      id: 'divine',
      name: 'Divine',
      description: 'Spiritual, introspective, deep',
      icon: Sparkles,
      gradient: 'from-indigo-400 to-purple-600'
    }
  ];

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center">
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
              onClick={() => onModeSelect(mode.id)}
              className={`h-auto p-4 flex flex-col items-center gap-2 transition-all duration-300 ${
                isSelected 
                  ? `bg-gradient-to-r ${mode.gradient} text-white border-none hover:scale-105` 
                  : 'bg-white/60 backdrop-blur-sm border-white/30 hover:bg-white/80 hover:scale-105'
              }`}
            >
              <IconComponent className="w-5 h-5" />
              <div className="text-center">
                <div className="font-medium text-sm">{mode.name}</div>
                <div className={`text-xs mt-1 ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>
                  {mode.description}
                </div>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default ModeSelector;
