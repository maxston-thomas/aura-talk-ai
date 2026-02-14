import React, { useState } from 'react';
import MoodSelector from '@/components/MoodSelector';
import ChatInterface from '@/components/ChatInterface';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutPage from '@/components/AboutPage';
import ContactPage from '@/components/ContactPage';
import PrivacyPolicy from '@/components/PrivacyPolicy';
import TermsConditions from '@/components/TermsConditions';
import SupportSection from '@/components/SupportSection';
import { Sparkles } from 'lucide-react';

const Chat = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showSupportSection, setShowSupportSection] = useState(false);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
  };

  const handleBackToMoodSelection = () => {
    setSelectedMood('');
  };

  const handleAboutClick = () => { setShowAbout(true); setShowSupportSection(false); };
  const handleContactClick = () => { setShowContact(true); setShowSupportSection(false); };
  const handlePrivacyClick = () => { setShowPrivacy(true); setShowSupportSection(false); };
  const handleTermsClick = () => { setShowTerms(true); setShowSupportSection(false); };

  const handleBackFromPage = () => {
    setShowAbout(false);
    setShowContact(false);
    setShowPrivacy(false);
    setShowTerms(false);
    setShowSupportSection(false);
  };

  if (showAbout) return <AboutPage onBack={handleBackFromPage} />;
  if (showContact) return <ContactPage onBack={handleBackFromPage} />;
  if (showPrivacy) return <PrivacyPolicy onBack={handleBackFromPage} />;
  if (showTerms) return <TermsConditions onBack={handleBackFromPage} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-pink-400/10 dark:from-blue-600/20 dark:via-purple-600/20 dark:to-pink-600/20"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 dark:from-blue-600/30 dark:to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-400/20 to-red-400/20 dark:from-pink-600/30 dark:to-red-600/30 rounded-full blur-3xl animate-pulse"></div>

      <Header />

      <div className="relative z-10 container mx-auto px-3 sm:px-4 py-8 max-w-6xl">
        {selectedMood ? (
          <ChatInterface 
            mood={selectedMood}
            onBack={handleBackToMoodSelection}
            onAboutClick={handleAboutClick}
            onContactClick={handleContactClick}
            onPrivacyClick={handlePrivacyClick}
            onTermsClick={handleTermsClick}
          />
        ) : (
          <div className="space-y-8">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto animate-pulse shadow-2xl">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-slate-200">
                Welcome to AuraTalk
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                How are you feeling today? Choose your mood to start our conversation.
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <MoodSelector onMoodSelect={handleMoodSelect} />
            </div>
          </div>
        )}
      </div>

      <Footer 
        onAboutClick={handleAboutClick}
        onContactClick={handleContactClick}
        onPrivacyClick={handlePrivacyClick}
        onTermsClick={handleTermsClick}
      />

      {showSupportSection && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <SupportSection />
        </div>
      )}
    </div>
  );
};

export default Chat;
