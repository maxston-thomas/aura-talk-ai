
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Smile, Frown, Peace } from 'lucide-react';

interface MoodSelectorProps {
  onMoodSelect: (mood: string) => void;
}

const MoodSelector = ({ onMoodSelect }: MoodSelectorProps) => {
  const moods = [
    {
      id: 'pleasant',
      name: 'Pleasant',
      description: 'Feeling good and positive',
      icon: Smile,
      gradient: 'from-green-400 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50'
    },
    {
      id: 'unpleasant',
      name: 'Unpleasant',
      description: 'Need support and understanding',
      icon: Frown,
      gradient: 'from-orange-400 to-red-500',
      bgGradient: 'from-orange-50 to-red-50'
    },
    {
      id: 'calm',
      name: 'Calm',
      description: 'Peaceful and balanced',
      icon: Peace,
      gradient: 'from-blue-400 to-indigo-500',
      bgGradient: 'from-blue-50 to-indigo-50'
    }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-slate-800 mb-4">
          How are you feeling today?
        </h2>
        <p className="text-slate-600 text-lg">
          Choose your current mood to help me understand how to best support you.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {moods.map((mood) => {
          const IconComponent = mood.icon;
          return (
            <Card
              key={mood.id}
              className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl bg-white/60 backdrop-blur-sm border-white/30 hover:bg-white/80"
              onClick={() => onMoodSelect(mood.id)}
            >
              <div className={`p-6 text-center bg-gradient-to-br ${mood.bgGradient} rounded-lg`}>
                <div className={`w-16 h-16 bg-gradient-to-r ${mood.gradient} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  {mood.name}
                </h3>
                <p className="text-slate-600">
                  {mood.description}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MoodSelector;
