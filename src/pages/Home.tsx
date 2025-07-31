import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import AuthModal from '@/components/AuthModal';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutPage from '@/components/AboutPage';
import ContactPage from '@/components/ContactPage';
import PrivacyPolicy from '@/components/PrivacyPolicy';
import TermsConditions from '@/components/TermsConditions';
import SupportSection from '@/components/SupportSection';
import TrialChat from '@/components/TrialChat';
import SubscriptionModal from '@/components/SubscriptionModal';
import { Heart, Brain, MessageCircle, Shield, Zap, Users, Star, Sparkles, Smile, Frown, Minus, Ear, Lightbulb, TrendingUp, Infinity, Crown, IndianRupee, Check } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

const Home = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showSupportSection, setShowSupportSection] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  const handleAboutClick = () => {
    setShowAbout(true);
    setShowSupportSection(false);
  };

  const handleContactClick = () => {
    setShowContact(true);
    setShowSupportSection(false);
  };

  const handlePrivacyClick = () => {
    setShowPrivacy(true);
    setShowSupportSection(false);
  };

  const handleTermsClick = () => {
    setShowTerms(true);
    setShowSupportSection(false);
  };

  const handleSupportClick = () => {
    setShowSupportSection(true);
    setShowAbout(false);
    setShowContact(false);
    setShowPrivacy(false);
    setShowTerms(false);
  };

  const handleSubscribeClick = () => {
    setShowSubscriptionModal(true);
  };

  const handleActualSubscribe = () => {
    // TODO: Implement Razorpay integration
    toast.info('Subscription coming soon! Please contact support for early access.');
    setShowSubscriptionModal(false);
  };

  const handleBackFromPage = () => {
    setShowAbout(false);
    setShowContact(false);
    setShowPrivacy(false);
    setShowTerms(false);
    setShowSupportSection(false);
  };

  const handleStartChat = () => {
    if (user) {
      navigate('/chat');
    } else {
      setShowAuthModal(true);
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
        <div className="space-y-12">
          {/* Hero Section */}
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
                "Professional emotional support with complete privacy"
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 italic">
                "Unlimited conversations, no data stored"
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 italic">
                "Your personal AI emotional companion"
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
          </div>

          {/* Trial Chat Section */}
          <div className="max-w-3xl mx-auto">
            <TrialChat 
              onSubscribeClick={handleSubscribeClick}
              onSupportClick={handleSupportClick}
            />
          </div>

          {/* Subscription Information */}
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-200">
              Premium Subscription
            </h2>
            
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800 p-8">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-5xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                    ₹199
                    <span className="text-xl font-normal text-slate-600 dark:text-slate-400">/month</span>
                  </div>
                  <p className="text-lg text-slate-600 dark:text-slate-400">
                    Unlimited emotional support conversations
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  {[
                    "Unlimited AI conversations",
                    "All mood & conversation modes",
                    "Priority emotional support",
                    "Advanced AI personality",
                    "Faster response times",
                    "No daily limits"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <Button 
                    onClick={handleSubscribeClick}
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl py-4 text-lg font-semibold"
                  >
                    <Crown className="w-5 h-5 mr-2" />
                    Subscribe Now
                  </Button>
                  
                  <Button 
                    onClick={handleStartChat}
                    variant="outline"
                    className="w-full border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl py-4"
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    {user ? 'Start Chatting' : 'Login'}
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* What AuraTalk Offers - Enhanced */}
          <div className="space-y-12">
            <div className="text-center space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-200">
                What AuraTalk Offers
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed">
                AuraTalk AI is your personal emotional support companion, designed to understand and respond to your feelings with genuine care and empathy. Our advanced AI technology creates meaningful conversations tailored to your emotional state, providing the support you need whenever you need it.
              </p>
            </div>

            {/* Mood Selection - Enhanced */}
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <h3 className="text-2xl sm:text-3xl font-semibold text-slate-800 dark:text-slate-200">
                  Choose Your Mood
                </h3>
                <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                  Start every conversation by sharing how you're feeling. This helps AuraTalk understand your emotional state and respond with the right tone, approach, and level of support.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="bg-green-50/80 dark:bg-green-900/20 backdrop-blur-md border-green-200/50 dark:border-green-800/30 p-8 text-center hover:scale-105 transition-transform duration-300 shadow-lg">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Smile className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-2xl font-semibold text-green-700 dark:text-green-400 mb-4">Pleasant</h4>
                  <p className="text-green-600 dark:text-green-300 leading-relaxed">
                    Share your joy, excitement, and positive experiences. AuraTalk will celebrate with you and help amplify your good vibes.
                  </p>
                </Card>
                
                <Card className="bg-blue-50/80 dark:bg-blue-900/20 backdrop-blur-md border-blue-200/50 dark:border-blue-800/30 p-8 text-center hover:scale-105 transition-transform duration-300 shadow-lg">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Frown className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-4">Unpleasant</h4>
                  <p className="text-blue-600 dark:text-blue-300 leading-relaxed">
                    When you're going through tough times, AuraTalk provides comfort, validation, and gentle support.
                  </p>
                </Card>
                
                <Card className="bg-purple-50/80 dark:bg-purple-900/20 backdrop-blur-md border-purple-200/50 dark:border-purple-800/30 p-8 text-center hover:scale-105 transition-transform duration-300 shadow-lg">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl">🧘</span>
                  </div>
                  <h4 className="text-2xl font-semibold text-purple-700 dark:text-purple-400 mb-4">Calm</h4>
                  <p className="text-purple-600 dark:text-purple-300 leading-relaxed">
                    For peaceful moments of reflection and mindfulness. AuraTalk helps maintain your inner balance.
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
                  Choose how you want AuraTalk to support you. Each mode offers a different approach to help you process your thoughts and feelings.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-6 text-center hover:scale-105 transition-transform duration-300 shadow-lg">
                  <Ear className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">Just Listen</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Sometimes you just need someone to hear you without judgment.
                  </p>
                </Card>
                
                <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-6 text-center hover:scale-105 transition-transform duration-300 shadow-lg">
                  <Lightbulb className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">Advise</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Get thoughtful guidance and practical suggestions.
                  </p>
                </Card>
                
                <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-6 text-center hover:scale-105 transition-transform duration-300 shadow-lg">
                  <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">Motivate</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Need a boost? AuraTalk energizes and encourages you.
                  </p>
                </Card>
                
                <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-6 text-center hover:scale-105 transition-transform duration-300 shadow-lg">
                  <Infinity className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">Divine</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Explore deeper spiritual conversations and meaningful questions.
                  </p>
                </Card>
              </div>
            </div>
          </div>

          {/* Why Choose AuraTalk */}
          <div className="space-y-8">
            <div className="text-center space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-200">
                Why Choose AuraTalk?
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed">
                Experience the next generation of emotional support technology. AuraTalk combines advanced AI with genuine empathy to create meaningful connections that support your emotional wellbeing.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-8 text-center hover:scale-105 transition-transform duration-300 shadow-lg">
                <Brain className="w-16 h-16 text-blue-500 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">Advanced AI Technology</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Powered by cutting-edge artificial intelligence that understands context, emotion, and nuance in conversations.
                </p>
              </Card>
              
              <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-8 text-center hover:scale-105 transition-transform duration-300 shadow-lg">
                <Shield className="w-16 h-16 text-green-500 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">Complete Privacy</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Your conversations are never stored or saved. Share openly without worrying about data privacy or security.
                </p>
              </Card>
              
              <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-8 text-center hover:scale-105 transition-transform duration-300 shadow-lg">
                <MessageCircle className="w-16 h-16 text-purple-500 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">24/7 Availability</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  AuraTalk is always here when you need support, whether it's 3 AM or during your lunch break.
                </p>
              </Card>
              
              <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-8 text-center hover:scale-105 transition-transform duration-300 shadow-lg">
                <Heart className="w-16 h-16 text-red-500 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">Empathetic Responses</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Our AI is trained to respond with genuine empathy, understanding, and emotional intelligence.
                </p>
              </Card>
              
              <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-8 text-center hover:scale-105 transition-transform duration-300 shadow-lg">
                <Zap className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">Instant Support</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Get immediate emotional support without waiting for appointments or scheduling sessions.
                </p>
              </Card>
              
              <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-8 text-center hover:scale-105 transition-transform duration-300 shadow-lg">
                <Users className="w-16 h-16 text-indigo-500 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">Non-Judgmental Space</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Express yourself freely in a completely judgment-free environment designed for emotional healing.
                </p>
              </Card>
            </div>
          </div>

          {/* Testimonials */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-200 mb-6">
                What People Are Saying
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-6 italic">
                  "AuraTalk has been a game-changer for my mental health. Having someone to talk to anytime, without judgment, has made such a difference."
                </p>
                <div className="font-semibold text-slate-800 dark:text-slate-200">Sarah M.</div>
              </Card>
              
              <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-6 italic">
                  "The privacy aspect is incredible. I can share my deepest thoughts knowing they won't be stored anywhere. It's truly liberating."
                </p>
                <div className="font-semibold text-slate-800 dark:text-slate-200">Alex R.</div>
              </Card>
              
              <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-6 italic">
                  "AuraTalk understands me better than I expected. The conversations feel so natural and supportive. Highly recommend!"
                </p>
                <div className="font-semibold text-slate-800 dark:text-slate-200">Jamie L.</div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer 
        onAboutClick={handleAboutClick}
        onContactClick={handleContactClick}
        onPrivacyClick={handlePrivacyClick}
        onTermsClick={handleTermsClick}
      />

      {/* Support Section Overlay */}
      {showSupportSection && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <SupportSection />
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />

      {/* Subscription Modal */}
      <SubscriptionModal
        open={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        onSubscribe={handleActualSubscribe}
      />
    </div>
  );
};

export default Home;