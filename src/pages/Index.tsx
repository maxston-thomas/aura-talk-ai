import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, Mic, Sparkles, Heart, Shield, Users, Gift, Ear, Lightbulb, Zap, Brain, Lock, Smile } from 'lucide-react';
import { useAuth, AuthProvider } from '@/hooks/useAuth';
import { Toaster } from "@/components/ui/sonner";
import AuthModal from '@/components/AuthModal';
import MoodSelector from '@/components/MoodSelector';
import ChatInterface from '@/components/ChatInterface';
import PrivacyPolicy from '@/components/PrivacyPolicy';
import TermsConditions from '@/components/TermsConditions';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SupportSection from '@/components/SupportSection';

function AppContent() {
  const { user, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'privacy' | 'terms'>('home');
  const [showSupportSection, setShowSupportSection] = useState(false);
  const [hoveredMood, setHoveredMood] = useState<string | null>(null);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    if (user) {
      setShowChat(true);
    } else {
      setShowAuthModal(true);
    }
  };

  const getBackgroundGradient = () => {
    if (!hoveredMood) return 'from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700';
    
    switch (hoveredMood) {
      case 'pleasant':
        return 'from-pink-50 via-orange-50 to-rose-100 dark:from-pink-900/30 dark:via-orange-900/30 dark:to-rose-900/30';
      case 'unpleasant':
        return 'from-blue-900/20 via-purple-900/20 to-indigo-900/20 dark:from-blue-900/40 dark:via-purple-900/40 dark:to-indigo-900/40';
      case 'calm':
        return 'from-teal-50 via-sky-50 to-cyan-100 dark:from-teal-900/30 dark:via-sky-900/30 dark:to-cyan-900/30';
      default:
        return 'from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <p className="text-slate-600 dark:text-slate-400">Loading AuraTalk...</p>
        </div>
      </div>
    );
  }

  if (currentPage === 'privacy') {
    return <PrivacyPolicy onBack={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'terms') {
    return <TermsConditions onBack={() => setCurrentPage('home')} />;
  }

  if (showChat && selectedMood) {
    return <ChatInterface mood={selectedMood} onBack={() => {
      setShowChat(false);
      setSelectedMood(null);
    }} />;
  }

  if (user) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient()} relative overflow-hidden transition-all duration-500`}>
        <Header />
        
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-pink-400/10 dark:from-blue-600/20 dark:via-purple-600/20 dark:to-pink-600/20"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 dark:from-blue-600/30 dark:to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Content with padding to avoid header collision */}
        <div className="relative z-10 container mx-auto px-3 sm:px-4 py-16 sm:py-24 pt-24 min-h-screen flex flex-col">
          <div className="text-center mb-8 sm:mb-12">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent mb-4">
              AuraTalk
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-6 sm:mb-8">
              Ready to start your conversation?
            </p>
          </div>

          <div className="flex-1">
            <MoodSelector 
              onMoodSelect={handleMoodSelect} 
              onMoodHover={setHoveredMood}
            />
          </div>

          {/* Support Section - Properly spaced */}
          <div className="mt-12 sm:mt-16 mb-8 sm:mb-12 text-center">
            <Button
              onClick={() => setShowSupportSection(!showSupportSection)}
              variant="ghost"
              className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 hover:bg-white/60 dark:hover:bg-slate-800/60 px-4 sm:px-8 py-2 sm:py-4 text-sm sm:text-base"
            >
              <Gift className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Support Us
            </Button>
          </div>

          {showSupportSection && (
            <div className="mb-8 sm:mb-12">
              <SupportSection />
            </div>
          )}
          
          {/* Footer with proper spacing */}
          <div className="mt-auto pt-8 sm:pt-12">
            <Footer onPrivacyClick={() => setCurrentPage('privacy')} onTermsClick={() => setCurrentPage('terms')} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient()} relative overflow-hidden transition-all duration-500`}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-pink-400/10 dark:from-blue-600/20 dark:via-purple-600/20 dark:to-pink-600/20"></div>
      <div className="absolute top-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 dark:from-blue-600/30 dark:to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-r from-pink-400/20 to-blue-400/20 dark:from-pink-600/30 dark:to-blue-600/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 container mx-auto px-3 sm:px-4 py-8 sm:py-12 min-h-screen flex flex-col">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 animate-pulse">
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent mb-4 sm:mb-6">
            AuraTalk
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">Your AI powered Emotional Companion</p>
          
          {/* Privacy-focused quotes */}
          <div className="max-w-4xl mx-auto mb-6 sm:mb-8">
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 mb-2 sm:mb-3 italic">
              "Speak freely and feel heard with complete privacy. No conversations saved."
            </p>
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 mb-2 sm:mb-3 italic">
              "A safe space for your thoughts and feelings"
            </p>
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 mb-4 sm:mb-6 italic">
              "Privacy-first emotional support platform"
            </p>
          </div>
          
          {/* Privacy Banner */}
          <Card className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-4 sm:p-8 max-w-4xl mx-auto mb-8 sm:mb-12">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              <h3 className="text-xl sm:text-2xl font-semibold text-slate-800 dark:text-slate-200">Complete Privacy Guaranteed</h3>
            </div>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              "AuraTalk doesn't save what you say. Speak freely — we're here to listen, not to log."
            </p>
          </Card>

          <Button onClick={() => setShowAuthModal(true)} size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 sm:px-20 py-6 sm:py-10 text-xl sm:text-3xl rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 mb-6 sm:mb-8">
            <Heart className="w-6 h-6 sm:w-10 sm:h-10 mr-3 sm:mr-6" />
            Start Your Journey
          </Button>
          
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Made with ❤️ in Chennai by Maxston
          </p>
        </div>

        <div className="flex-1">
          {/* Mood Selector */}
          <MoodSelector 
            onMoodSelect={handleMoodSelect} 
            onMoodHover={setHoveredMood}
          />

          {/* Conversation Modes Section */}
          <div className="mt-12 sm:mt-16 max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-800 dark:text-slate-200 mb-8">
              Choose Your Conversation Style
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <Card className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-4 sm:p-6 text-center hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all duration-300 hover:scale-105">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Ear className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 mb-2">Just Listen</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Pure listening without judgment or advice
                </p>
              </Card>

              <Card className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-4 sm:p-6 text-center hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all duration-300 hover:scale-105">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 mb-2">Advise</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Gentle guidance and practical solutions
                </p>
              </Card>

              <Card className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-4 sm:p-6 text-center hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all duration-300 hover:scale-105">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 mb-2">Motivate</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Energetic encouragement and positivity
                </p>
              </Card>

              <Card className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-4 sm:p-6 text-center hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all duration-300 hover:scale-105">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-indigo-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 mb-2">Divine</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Spiritual and philosophical conversations
                </p>
              </Card>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 max-w-6xl mx-auto mb-12 sm:mb-16 mt-12 sm:mt-16">
            <Card className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-4 sm:p-8 text-center hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all duration-300 hover:scale-105">
              <Brain className="w-8 h-8 sm:w-12 sm:h-12 text-blue-500 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2 sm:mb-3">AI Emotional Intelligence</h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                Advanced AI that understands and responds to your emotional state with empathy and care.
              </p>
            </Card>

            <Card className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-4 sm:p-8 text-center hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all duration-300 hover:scale-105">
              <Lock className="w-8 h-8 sm:w-12 sm:h-12 text-green-500 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2 sm:mb-3">Zero Data Storage</h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                Your conversations are never saved or stored. Complete privacy and confidentiality guaranteed.
              </p>
            </Card>

            <Card className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-4 sm:p-8 text-center hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all duration-300 hover:scale-105 sm:col-span-2 lg:col-span-1">
              <Smile className="w-8 h-8 sm:w-12 sm:h-12 text-purple-500 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2 sm:mb-3">Mood-Adaptive Responses</h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                Personalized conversations that adapt to your current emotional state and needs.
              </p>
            </Card>
          </div>
        </div>

        {/* Support Section - Better spacing */}
        <div className="mt-auto pt-8 sm:pt-12 text-center">
          <Button
            onClick={() => setShowSupportSection(!showSupportSection)}
            variant="ghost"
            className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 hover:bg-white/60 dark:hover:bg-slate-800/60 px-4 sm:px-8 py-2 sm:py-4 text-sm sm:text-base mb-6 sm:mb-8"
          >
            <Gift className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Support Us
          </Button>

          {showSupportSection && (
            <div className="mb-8 sm:mb-12">
              <SupportSection />
            </div>
          )}

          {/* Footer */}
          <Footer onPrivacyClick={() => setCurrentPage('privacy')} onTermsClick={() => setCurrentPage('terms')} />
        </div>
      </div>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      <Toaster />
    </div>
  );
}

const Index = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default Index;
