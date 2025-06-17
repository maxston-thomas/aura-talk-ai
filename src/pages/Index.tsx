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
import { Heart, Brain, MessageCircle, Shield, Zap, Users, Star, Sparkles, Smile, Frown, Minus, Ear, Lightbulb, TrendingUp, Infinity } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { user, signIn, signOut, loading } = useAuth();
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

  // Reset all states when user logs out
  useEffect(() => {
    if (!user && !loading) {
      setSelectedMood('');
      setShowChat(false);
      setShowAbout(false);
      setShowContact(false);
      setShowPrivacy(false);
      setShowTerms(false);
    }
  }, [user, loading]);

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
    setShowChat(false);
  };

  const handleContactClick = () => {
    setShowContact(true);
    setShowChat(false);
  };

  const handlePrivacyClick = () => {
    setShowPrivacy(true);
    setShowChat(false);
  };

  const handleTermsClick = () => {
    setShowTerms(true);
    setShowChat(false);
  };

  const handleBackFromPage = () => {
    setShowAbout(false);
    setShowContact(false);
    setShowPrivacy(false);
    setShowTerms(false);
    // If user was in chat before, go back to chat
    if (selectedMood) {
      setShowChat(true);
    }
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Show individual pages as overlays
  if (showAbout) {
    return <AboutPage onBack={handleBackFromPage} />;
  }

  if (showContact) {
    return <ContactPage onBack={handleBackFromPage} />;
  }

  if (showPrivacy) {
    return <PrivacyPolicy onBack={handleBackFromPage} />;
  }

  if (showTerms) {
    return <TermsConditions onBack={handleBackFromPage} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-pink-400/10 dark:from-blue-600/20 dark:via-purple-600/20 dark:to-pink-600/20"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 dark:from-blue-600/30 dark:to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-400/20 to-red-400/20 dark:from-pink-600/30 dark:to-red-600/30 rounded-full blur-3xl animate-pulse"></div>

      <Header />

      <div className="relative z-10 container mx-auto px-3 sm:px-4 py-16 sm:py-24 max-w-6xl">
        {/* Main Content */}
        {!user ? (
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 dark:text-slate-200">
                AuraTalk AI <Sparkles className="inline-block w-8 h-8 sm:w-10 sm:h-10 ml-2 text-yellow-500" />
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                Your personal AI companion for emotional support and mental wellness. Experience empathetic conversations with complete privacy and understanding.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full px-8 py-4 text-lg" onClick={() => setShowAuthModal(true)}>
                Start Your Journey
              </Button>
            </div>

            {/* About Section */}
            <Card className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-6 sm:p-8">
              <div className="text-center space-y-4">
                <Heart className="w-8 h-8 text-red-500 mx-auto" />
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-200">About AuraTalk AI</h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                  AuraTalk was born from a simple belief: everyone deserves someone to listen. Our AI emotional support companion provides a safe, judgment-free space where you can express your thoughts and feelings freely. Whether you're celebrating life's joys or navigating difficult moments, AuraTalk is here to support your mental wellness journey.
                </p>
              </div>
            </Card>

            {/* What AuraTalk Offers */}
            <div className="space-y-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-800 dark:text-slate-200">
                What AuraTalk Offers
              </h2>
              
              <p className="text-lg text-slate-600 dark:text-slate-400 text-center max-w-4xl mx-auto">
                AuraTalk AI is your personal emotional support companion, designed to understand and respond to your feelings with genuine care. Our advanced AI technology creates meaningful conversations tailored to your emotional state, providing the support you need whenever you need it. Whether you're looking for someone to listen, need practical advice, want motivation, or seek deeper spiritual conversations, AuraTalk adapts to meet you where you are.
              </p>

              {/* Mood Selection */}
              <div className="space-y-6">
                <h3 className="text-2xl sm:text-3xl font-semibold text-center text-slate-800 dark:text-slate-200">
                  Choose Your Mood
                </h3>
                <p className="text-center text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                  Start every conversation by sharing how you're feeling. This helps AuraTalk understand your emotional state and respond with the right tone and approach.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="bg-green-50/80 dark:bg-green-900/20 backdrop-blur-md border-green-200/50 dark:border-green-800/30 p-6 text-center hover:scale-105 transition-transform">
                    <Smile className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2">Pleasant</h4>
                    <p className="text-green-600 dark:text-green-300">
                      Share your joy, excitement, and positive experiences. AuraTalk will celebrate with you and help amplify your good vibes.
                    </p>
                  </Card>
                  
                  <Card className="bg-blue-50/80 dark:bg-blue-900/20 backdrop-blur-md border-blue-200/50 dark:border-blue-800/30 p-6 text-center hover:scale-105 transition-transform">
                    <Frown className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-2">Unpleasant</h4>
                    <p className="text-blue-600 dark:text-blue-300">
                      When you're going through tough times, AuraTalk provides comfort, validation, and gentle support to help you navigate difficult emotions.
                    </p>
                  </Card>
                  
                  <Card className="bg-purple-50/80 dark:bg-purple-900/20 backdrop-blur-md border-purple-200/50 dark:border-purple-800/30 p-6 text-center hover:scale-105 transition-transform">
                    <Minus className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold text-purple-700 dark:text-purple-400 mb-2">Calm</h4>
                    <p className="text-purple-600 dark:text-purple-300">
                      For peaceful moments of reflection. AuraTalk helps maintain your inner balance and provides thoughtful, serene conversations.
                    </p>
                  </Card>
                </div>
              </div>

              {/* Conversation Modes */}
              <div className="space-y-6">
                <h3 className="text-2xl sm:text-3xl font-semibold text-center text-slate-800 dark:text-slate-200">
                  Conversation Modes
                </h3>
                <p className="text-center text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                  Choose how you want AuraTalk to support you. Each mode offers a different approach to help you process your thoughts and feelings.
                </p>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-6 text-center hover:scale-105 transition-transform">
                    <Ear className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">Just Listen</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Sometimes you just need someone to hear you. AuraTalk provides a compassionate ear without judgment.
                    </p>
                  </Card>
                  
                  <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-6 text-center hover:scale-105 transition-transform">
                    <Lightbulb className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">Advise</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Get thoughtful guidance and practical suggestions tailored to your specific situation and needs.
                    </p>
                  </Card>
                  
                  <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-6 text-center hover:scale-105 transition-transform">
                    <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">Motivate</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Need a boost? AuraTalk energizes and encourages you to reach your goals and overcome challenges.
                    </p>
                  </Card>
                  
                  <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-6 text-center hover:scale-105 transition-transform">
                    <Infinity className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">Divine</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Explore deeper spiritual conversations and meaningful questions about life, purpose, and connection.
                    </p>
                  </Card>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <Card className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-6 sm:p-8">
              <h3 className="text-2xl sm:text-3xl font-semibold text-center text-slate-800 dark:text-slate-200 mb-6">
                How AuraTalk Works
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200">Choose Your Mood</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Start by selecting how you're feeling: Pleasant, Unpleasant, or Calm.
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200">Pick a Mode</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Choose how you want AuraTalk to respond: Listen, Advise, Motivate, or Divine.
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200">Start Talking</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Share your thoughts and feelings. AuraTalk listens and responds with empathy.
                  </p>
                </div>
              </div>
            </Card>

            {/* Why Choose AuraTalk */}
            <div className="space-y-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-800 dark:text-slate-200">
                Why Choose AuraTalk AI?
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-6">
                  <Shield className="w-8 h-8 text-blue-500 mb-4" />
                  <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">100% Private</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Your conversations are completely confidential. We don't store or share your personal data.
                  </p>
                </Card>
                
                <Card className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-6">
                  <Heart className="w-8 h-8 text-red-500 mb-4" />
                  <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">Empathetic AI</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Our AI is trained to understand and respond to emotions with genuine care and compassion.
                  </p>
                </Card>
                
                <Card className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-6">
                  <Zap className="w-8 h-8 text-yellow-500 mb-4" />
                  <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">Available 24/7</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Whether it's 3 AM or during lunch break, AuraTalk is always here when you need support.
                  </p>
                </Card>
                
                <Card className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-6">
                  <Users className="w-8 h-8 text-green-500 mb-4" />
                  <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">Non-Judgmental</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Share anything without fear of judgment. AuraTalk creates a safe space for all your thoughts.
                  </p>
                </Card>
                
                <Card className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-6">
                  <Brain className="w-8 h-8 text-purple-500 mb-4" />
                  <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">Adaptive Learning</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    AuraTalk learns from each conversation to provide increasingly personalized support.
                  </p>
                </Card>
                
                <Card className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-6">
                  <Star className="w-8 h-8 text-orange-500 mb-4" />
                  <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">Free to Use</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Quality emotional support shouldn't cost a fortune. AuraTalk is free and accessible to everyone.
                  </p>
                </Card>
              </div>
            </div>

            {/* Support Message */}
            <Card className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-900/20 dark:to-purple-900/20 backdrop-blur-md border-blue-200/50 dark:border-blue-800/30 p-6 sm:p-8 text-center">
              <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
                Help Us Continue This Mission
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
                AuraTalk AI is built with love and dedication to support mental wellness for everyone. If you find value in our AI emotional support companion, consider supporting our mission to make compassionate AI accessible to all. Your support helps us improve and maintain this free mental wellness resource.
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Together, we can create a world where everyone has access to emotional support and understanding.
              </p>
            </Card>

            <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
          </div>
        ) : !showChat ? (
          <MoodSelector onMoodSelect={handleMoodSelect} />
        ) : (
          <ChatInterface 
            mood={selectedMood} 
            onBack={handleBackToMoodSelection}
            onAboutClick={handleAboutClick}
            onContactClick={handleContactClick}
            onPrivacyClick={handlePrivacyClick}
            onTermsClick={handleTermsClick}
          />
        )}

        {/* Footer - Only show when not in chat */}
        {!showChat && (
          <div className="mt-12 sm:mt-16">
            <Footer
              onAboutClick={handleAboutClick}
              onContactClick={handleContactClick}
              onPrivacyClick={handlePrivacyClick}
              onTermsClick={handleTermsClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
