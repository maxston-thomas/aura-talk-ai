
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Shield } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy = ({ onBack }: PrivacyPolicyProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 relative overflow-hidden">
      <Header />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-pink-400/10 dark:from-blue-600/20 dark:via-purple-600/20 dark:to-pink-600/20"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-24 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="hover:bg-white/30 dark:hover:bg-slate-800/30 rounded-full"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">Privacy Policy</h1>
          </div>
        </div>

        <Card className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-8">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold mb-4">🛡️ Privacy Policy – AuraTalk</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">Effective Date: June 12, 2025</p>
            
            <p className="mb-6">AuraTalk is committed to protecting your privacy. We design our service to provide emotional support while collecting as little personal data as possible.</p>

            <h3 className="text-xl font-semibold mb-3">1. What We Collect</h3>
            <p className="mb-4"><strong>Account Info:</strong> We collect your email address for account creation.</p>
            <p className="mb-4"><strong>Usage Info:</strong> We track the number of messages you send per day to enforce daily limits.</p>
            <p className="mb-6"><strong>Ads Data:</strong> If you're in the EEA/UK/Switzerland, we ask for your consent to show non-personalized ads via Google AdSense.</p>

            <h3 className="text-xl font-semibold mb-3">2. What We Don't Collect</h3>
            <p className="mb-4">We do not store your conversation history.</p>
            <p className="mb-4">We do not collect personal health data.</p>
            <p className="mb-6">We do not use your data for profiling or ad personalization.</p>

            <h3 className="text-xl font-semibold mb-3">3. How We Use Your Info</h3>
            <p className="mb-4">To track daily message usage.</p>
            <p className="mb-4">To deliver non-personalized ads (with consent).</p>
            <p className="mb-6">To improve user experience anonymously (e.g. how many users chose each mood or feature).</p>

            <h3 className="text-xl font-semibold mb-3">4. Your Rights</h3>
            <p className="mb-4">You can delete your account at any time.</p>
            <p className="mb-4">You can revoke ad consent through your browser or settings.</p>
            <p className="mb-6">If you're located in the EU or UK, you have GDPR rights to access or erase your data.</p>

            <h3 className="text-xl font-semibold mb-3">5. Children's Privacy</h3>
            <p className="mb-6">AuraTalk is intended for users 18 years or older. We do not knowingly collect data from children.</p>

            <h3 className="text-xl font-semibold mb-3">6. Contact Us</h3>
            <p className="mb-4">If you have questions or concerns:</p>
            <p className="mb-4">📧 Email: auratalkai@gmail.com</p>
          </div>
        </Card>

        <div className="mt-16">
          <Footer onPrivacyClick={() => {}} onTermsClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
