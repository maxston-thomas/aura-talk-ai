import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import AuthModal from '@/components/AuthModal';
import MoodSelector from '@/components/MoodSelector';
import ModeSelector from '@/components/ModeSelector';
import ChatInterface from '@/components/ChatInterface';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutPage from '@/components/AboutPage';
import ContactPage from '@/components/ContactPage';
import PrivacyPolicy from '@/components/PrivacyPolicy';
import TermsConditions from '@/components/TermsConditions';
import { Heart, Brain, MessageCircle, Shield, Zap, Users, Star, Sparkles } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { user, signIn, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedMood, setSelectedMood] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    // Load Google AdSense script
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7779472086690894';
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src*="adsbygoogle"]');
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, []);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    setShowChat(true);
  };

  const handleBackToMoodSelection = () => {
    setShowChat(false);
    setSelectedMood('');
  };

  const handleAboutClick = () => {
    setShowAbout(true);
  };

  const handleContactClick = () => {
    setShowContact(true);
  };

  const handlePrivacyClick = () => {
    setShowPrivacy(true);
  };

  const handleTermsClick = () => {
    setShowTerms(true);
  };

  const handleBackFromPage = () => {
    setShowAbout(false);
    setShowContact(false);
    setShowPrivacy(false);
    setShowTerms(false);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-pink-400/10 dark:from-blue-600/20 dark:via-purple-600/20 dark:to-pink-600/20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 dark:from-blue-600/30 dark:to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-400/20 to-red-400/20 dark:from-pink-600/30 dark:to-red-600/30 rounded-full blur-3xl animate-pulse"></div>

        <Header />

        <div className="relative z-10 container mx-auto px-3 sm:px-4 py-16 sm:py-24 max-w-4xl">
          {/* Main Content */}
          {!user ? (
            <div className="text-center space-y-6">
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 dark:text-slate-200">
                AuraTalk AI <Sparkles className="inline-block w-8 h-8 sm:w-10 sm:h-10 ml-2 text-yellow-500" />
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400">
                Your voice-powered emotional AI companion. Speak freely and feel heard with complete privacy.
              </p>
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-8 py-3" onClick={() => setShowAuthModal(true)}>
                Get Started
              </Button>
              <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} onSignIn={signIn} />
            </div>
          ) : !showChat ? (
            <MoodSelector onMoodSelect={handleMoodSelect} />
          ) : (
            <ChatInterface mood={selectedMood} onBack={handleBackToMoodSelection} />
          )}

          {/* Footer */}
          <div className="mt-12 sm:mt-16">
            <Footer
              onAboutClick={handleAboutClick}
              onContactClick={handleContactClick}
              onPrivacyClick={handlePrivacyClick}
              onTermsClick={handleTermsClick}
            />
          </div>
        </div>
      </div>

      {/* Conditional Page Rendering */}
      {showAbout && <AboutPage onBack={handleBackFromPage} />}
      {showContact && <ContactPage onBack={handleBackFromPage} />}
      {showPrivacy && <PrivacyPolicy onBack={handleBackFromPage} />}
      {showTerms && <TermsConditions onBack={handleBackFromPage} />}
    </>
  );
};

export default Index;
