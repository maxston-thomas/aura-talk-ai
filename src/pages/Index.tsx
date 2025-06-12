
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MessageCircle, Sparkles, Shield, Timer, Crown } from 'lucide-react';
import ChatInterface from '@/components/ChatInterface';

const Index = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [timeLeft, setTimeLeft] = useState(72 * 60 * 60); // 72 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const moods = [
    { id: 'calm', label: 'Calm & Peaceful', emoji: '🧘', color: 'from-blue-400 to-cyan-300' },
    { id: 'energetic', label: 'Energetic & Motivated', emoji: '⚡', color: 'from-orange-400 to-yellow-300' },
    { id: 'contemplative', label: 'Deep & Thoughtful', emoji: '🤔', color: 'from-purple-400 to-pink-300' },
    { id: 'supportive', label: 'Need Support', emoji: '🤗', color: 'from-green-400 to-emerald-300' },
  ];

  const handleStartChat = () => {
    if (selectedMood) {
      setShowChat(true);
    }
  };

  const handleBackToHome = () => {
    setShowChat(false);
  };

  if (showChat) {
    return <ChatInterface mood={selectedMood} onBack={handleBackToHome} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-pink-400/10"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-lg opacity-60 absolute inset-0"></div>
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full relative flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-slate-800 via-purple-800 to-blue-800 bg-clip-text text-transparent mb-4">
            AuraTalk
          </h1>
          <p className="text-xl text-slate-600 mb-6 max-w-2xl mx-auto">
            Your minimalist, voice-powered emotional AI companion. Speak freely, feel heard.
          </p>
          
          {/* Privacy Banner */}
          <div className="inline-flex items-center gap-2 bg-white/30 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-8">
            <Shield className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-slate-700">
              AuraTalk doesn't save what you say. Speak freely — we're here to listen, not to log.
            </span>
          </div>
        </header>

        {/* First 100 Users Discount */}
        <div className="max-w-2xl mx-auto mb-12">
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200/50 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full blur-2xl"></div>
            <div className="relative z-10 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Crown className="w-6 h-6 text-amber-600" />
                <span className="text-lg font-semibold text-amber-800">First 100 Users - 50% OFF!</span>
              </div>
              <p className="text-amber-700 mb-3">Join the exclusive early adopters of AuraTalk</p>
              <div className="flex items-center justify-center gap-2 text-sm text-amber-600">
                <Timer className="w-4 h-4" />
                <span>Offer expires in: {formatTime(timeLeft)}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Mood Selection */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-center text-slate-800 mb-8">
            How are you feeling today?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {moods.map((mood) => (
              <Card
                key={mood.id}
                className={`p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl bg-white/40 backdrop-blur-md border-white/30 ${
                  selectedMood === mood.id ? 'ring-2 ring-blue-400 bg-white/60' : ''
                }`}
                onClick={() => setSelectedMood(mood.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${mood.color} rounded-full flex items-center justify-center text-2xl`}>
                    {mood.emoji}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{mood.label}</h3>
                    <p className="text-sm text-slate-600">Tap to select your current mood</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="max-w-md mx-auto space-y-4">
          <Button 
            onClick={handleStartChat}
            className="w-full h-14 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            disabled={!selectedMood}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Start Text Chat (10/day free)
          </Button>
          
          <Button 
            variant="outline"
            className="w-full h-14 bg-white/30 backdrop-blur-md border-white/30 hover:bg-white/50 text-slate-700 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
            disabled
          >
            <Mic className="w-5 h-5 mr-2" />
            Voice Mode (Coming Soon) 
            <Crown className="w-4 h-4 ml-2 text-amber-500" />
          </Button>
        </div>

        {/* Features */}
        <div className="max-w-4xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center bg-white/30 backdrop-blur-md border-white/30 hover:bg-white/40 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">Always Listening</h3>
            <p className="text-sm text-slate-600">Share your thoughts without judgment, anytime you need</p>
          </Card>
          
          <Card className="p-6 text-center bg-white/30 backdrop-blur-md border-white/30 hover:bg-white/40 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">Complete Privacy</h3>
            <p className="text-sm text-slate-600">Your conversations aren't stored or saved anywhere</p>
          </Card>
          
          <Card className="p-6 text-center bg-white/30 backdrop-blur-md border-white/30 hover:bg-white/40 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">AI Companion</h3>
            <p className="text-sm text-slate-600">Powered by advanced AI to understand and respond thoughtfully</p>
          </Card>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 pb-8">
          <p className="text-sm text-slate-500">
            Built for your peace of mind. No saving, no judging.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
