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
import SupportSection from '@/components/SupportSection';
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
  const [showSupportSection, setShowSupportSection] = useState(false);


  // Reset all states when user logs out
  useEffect(() => {
    if (!user && !loading) {
      setSelectedMood('');
      setShowChat(false);
      setShowAbout(false);
      setShowContact(false);
      setShowPrivacy(false);
      setShowTerms(false);
      setShowSupportSection(false);
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
    setShowSupportSection(false);
  };

  const handleContactClick = () => {
    setShowContact(true);
    setShowChat(false);
    setShowSupportSection(false);
  };

  const handlePrivacyClick = () => {
    setShowPrivacy(true);
    setShowChat(false);
    setShowSupportSection(false);
  };

  const handleTermsClick = () => {
    setShowTerms(true);
    setShowChat(false);
    setShowSupportSection(false);
  };

  const handleSupportClick = () => {
    setShowSupportSection(true);
    setShowAbout(false);
    setShowContact(false);
    setShowPrivacy(false);
    setShowTerms(false);
    setShowChat(false);
  };

  const handleBackFromPage = () => {
    setShowAbout(false);
    setShowContact(false);
    setShowPrivacy(false);
    setShowTerms(false);
    setShowSupportSection(false);
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
            {/* Hero Section - Matching reference image */}
            <div className="text-center space-y-8 max-w-4xl mx-auto">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse shadow-2xl">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 dark:text-slate-200">
                  AuraTalk
                </h1>
                <h2 className="text-xl sm:text-2xl lg:text-3xl text-slate-600 dark:text-slate-400 font-medium">
                  Your AI powered Emotional Companion
                </h2>
              </div>

              <div className="space-y-4 max-w-3xl mx-auto">
                <p className="text-lg text-slate-600 dark:text-slate-400 italic">
                  "Speak freely and feel heard with complete privacy. No conversations saved."
                </p>
                <p className="text-lg text-slate-600 dark:text-slate-400 italic">
                  "A safe space for your thoughts and feelings"
                </p>
                <p className="text-lg text-slate-600 dark:text-slate-400 italic">
                  "Privacy-first emotional support platform"
                </p>
              </div>

              {/* Privacy Guarantee */}
              <div className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 rounded-2xl p-6 max-w-2xl mx-auto">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <Shield className="w-6 h-6 text-green-500" />
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                    Complete Privacy Guaranteed
                  </h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  "AuraTalk doesn't save what you say. Speak freely — we're here to listen, not to log."
                </p>
              </div>

              <div className="space-y-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-2xl px-16 py-6 text-xl font-semibold shadow-xl transform hover:scale-105 transition-all duration-200" 
                  onClick={() => setShowAuthModal(true)}
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Start Your Journey
                </Button>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium flex items-center justify-center">
                  Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> in Chennai by Maxston
                </p>
              </div>
            </div>

            {/* What AuraTalk Offers - Enhanced */}
            <div className="space-y-12">
              <div className="text-center space-y-6">
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-200">
                  What AuraTalk Offers
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed">
                  AuraTalk AI is your personal emotional support companion, designed to understand and respond to your feelings with genuine care and empathy. Our advanced AI technology creates meaningful conversations tailored to your emotional state, providing the support you need whenever you need it. Whether you're looking for someone to listen, need practical advice, want motivation, or seek deeper spiritual conversations, AuraTalk adapts to meet you where you are in your emotional journey.
                </p>
              </div>

              {/* Mood Selection - Enhanced */}
              <div className="space-y-8">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-semibold text-slate-800 dark:text-slate-200">
                    Choose Your Mood
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                    Start every conversation by sharing how you're feeling. This helps AuraTalk understand your emotional state and respond with the right tone, approach, and level of support. Our AI adapts its communication style to match your current emotional needs.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <Card className="bg-green-50/80 dark:bg-green-900/20 backdrop-blur-md border-green-200/50 dark:border-green-800/30 p-8 text-center hover:scale-105 transition-transform duration-300 shadow-lg">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Smile className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-2xl font-semibold text-green-700 dark:text-green-400 mb-4">Pleasant</h4>
                    <p className="text-green-600 dark:text-green-300 leading-relaxed">
                      Share your joy, excitement, and positive experiences. AuraTalk will celebrate with you, help amplify your good vibes, and encourage you to savor these wonderful moments in your life.
                    </p>
                  </Card>
                  
                  <Card className="bg-blue-50/80 dark:bg-blue-900/20 backdrop-blur-md border-blue-200/50 dark:border-blue-800/30 p-8 text-center hover:scale-105 transition-transform duration-300 shadow-lg">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Frown className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-4">Unpleasant</h4>
                    <p className="text-blue-600 dark:text-blue-300 leading-relaxed">
                      When you're going through tough times, AuraTalk provides comfort, validation, and gentle support to help you navigate difficult emotions with care and understanding.
                    </p>
                  </Card>
                  
                  <Card className="bg-purple-50/80 dark:bg-purple-900/20 backdrop-blur-md border-purple-200/50 dark:border-purple-800/30 p-8 text-center hover:scale-105 transition-transform duration-300 shadow-lg">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-2xl">🧘</span>
                    </div>
                    <h4 className="text-2xl font-semibold text-purple-700 dark:text-purple-400 mb-4">Calm</h4>
                    <p className="text-purple-600 dark:text-purple-300 leading-relaxed">
                      For peaceful moments of reflection and mindfulness. AuraTalk helps maintain your inner balance and provides thoughtful, serene conversations with wisdom.
                    </p>
                  </Card>
                </div>
              </div>

              {/* Conversation Modes - Enhanced */}
              <div className="space-y-8">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-semibold text-slate-800 dark:text-slate-200">
                    Conversation Modes
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                    Choose how you want AuraTalk to support you. Each mode offers a different approach to help you process your thoughts and feelings, ensuring you get exactly the type of support you need in that moment.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-6 text-center hover:scale-105 transition-transform duration-300 shadow-lg">
                    <Ear className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">Just Listen</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      Sometimes you just need someone to hear you without judgment. AuraTalk provides a compassionate ear and validates your feelings.
                    </p>
                  </Card>
                  
                  <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-6 text-center hover:scale-105 transition-transform duration-300 shadow-lg">
                    <Lightbulb className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">Advise</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      Get thoughtful guidance and practical suggestions tailored to your specific situation, goals, and challenges you're facing.
                    </p>
                  </Card>
                  
                  <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-6 text-center hover:scale-105 transition-transform duration-300 shadow-lg">
                    <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">Motivate</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      Need a boost? AuraTalk energizes and encourages you to reach your goals, overcome challenges, and unlock your potential.
                    </p>
                  </Card>
                  
                  <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-6 text-center hover:scale-105 transition-transform duration-300 shadow-lg">
                    <Infinity className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">Divine</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      Explore deeper spiritual conversations and meaningful questions about life, purpose, connection, and your place in the universe.
                    </p>
                  </Card>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <Card className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-6 sm:p-8">
              <h3 className="text-2xl sm:text-3xl font-semibold text-center text-slate-800 dark:text-slate-200 mb-8">
                How AuraTalk Works
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <span className="text-white font-bold text-xl">1</span>
                  </div>
                  <h4 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Choose Your Mood</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Start by selecting how you're feeling: Pleasant, Unpleasant, or Calm. This helps AuraTalk understand your emotional state.
                  </p>
                </div>
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <span className="text-white font-bold text-xl">2</span>
                  </div>
                  <h4 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Pick a Mode</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Choose how you want AuraTalk to respond: Listen, Advise, Motivate, or Divine - each offering unique support.
                  </p>
                </div>
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <span className="text-white font-bold text-xl">3</span>
                  </div>
                  <h4 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Start Talking</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Share your thoughts and feelings openly. AuraTalk listens with empathy and responds with genuine care and understanding.
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
                <Card className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-6 hover:scale-105 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-blue-500 mb-4" />
                  <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">100% Private</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Your conversations are completely confidential. We don't store or share your personal data.
                  </p>
                </Card>
                
                <Card className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-6 hover:scale-105 transition-transform duration-300">
                  <Heart className="w-8 h-8 text-red-500 mb-4" />
                  <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">Empathetic AI</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Our AI is trained to understand and respond to emotions with genuine care and compassion.
                  </p>
                </Card>
                
                <Card className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-6 hover:scale-105 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-yellow-500 mb-4" />
                  <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">Available 24/7</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Whether it's 3 AM or during lunch break, AuraTalk is always here when you need support.
                  </p>
                </Card>
                
                <Card className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-6 hover:scale-105 transition-transform duration-300">
                  <Users className="w-8 h-8 text-green-500 mb-4" />
                  <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">Non-Judgmental</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Share anything without fear of judgment. AuraTalk creates a safe space for all your thoughts.
                  </p>
                </Card>
                
                <Card className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-6 hover:scale-105 transition-transform duration-300">
                  <Brain className="w-8 h-8 text-purple-500 mb-4" />
                  <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">Adaptive Learning</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    AuraTalk learns from each conversation to provide increasingly personalized support.
                  </p>
                </Card>
                
                <Card className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-6 hover:scale-105 transition-transform duration-300">
                  <Star className="w-8 h-8 text-orange-500 mb-4" />
                  <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">Free to Use</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Quality emotional support shouldn't cost a fortune. AuraTalk is free and accessible to everyone.
                  </p>
                </Card>
              </div>
            </div>

            {/* Support Button - Smaller size */}
            <div className="text-center space-y-4">
              <Button 
                size="default" 
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-2xl px-8 py-3 text-base font-semibold shadow-xl transform hover:scale-105 transition-all duration-200" 
                onClick={handleSupportClick}
              >
                <Heart className="w-4 h-4 mr-2" />
                Support AuraTalk
              </Button>
              <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                Help us continue providing free emotional support to everyone
              </p>
            </div>

            <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
          </div>
        ) : !showChat ? (
          <div className="space-y-12">
            <MoodSelector onMoodSelect={handleMoodSelect} />
            
            {/* Support Section below moods */}
            <div className="mt-16">
              <SupportSection />
            </div>

          </div>
        ) : (
          <>
            <ChatInterface 
              mood={selectedMood} 
              onBack={handleBackToMoodSelection}
              onAboutClick={handleAboutClick}
              onContactClick={handleContactClick}
              onPrivacyClick={handlePrivacyClick}
              onTermsClick={handleTermsClick}
            />
          </>
        )}

        {/* Support Section Display */}
        {showSupportSection && (
          <div className="mt-12 max-w-2xl mx-auto">
            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border-white/40 dark:border-slate-700/40 p-8 relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackFromPage}
                className="absolute top-4 right-4 hover:bg-white/20 dark:hover:bg-slate-700/20"
              >
                ✕
              </Button>
              <SupportSection />
            </Card>
          </div>
        )}

        {/* Footer - Show when not in chat and not showing support section */}
        {!showChat && !showSupportSection && (
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
