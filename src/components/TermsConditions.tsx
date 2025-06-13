
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, FileText } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

interface TermsConditionsProps {
  onBack: () => void;
}

const TermsConditions = ({ onBack }: TermsConditionsProps) => {
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
            <FileText className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">Terms & Conditions</h1>
          </div>
        </div>

        <Card className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-8">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold mb-4">📜 Terms & Conditions – AuraTalk</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">Effective Date: June 12, 2025</p>
            
            <p className="mb-6">Welcome to AuraTalk. By using this app, you agree to these Terms of Use.</p>

            <h3 className="text-xl font-semibold mb-3">1. Purpose of the App</h3>
            <p className="mb-6">AuraTalk provides AI-powered emotional support, self-reflection, and motivational interaction. It is not a substitute for professional therapy, counseling, or medical advice.</p>

            <h3 className="text-xl font-semibold mb-3">2. Eligibility</h3>
            <p className="mb-6">You must be at least 18 years old to use AuraTalk.</p>

            <h3 className="text-xl font-semibold mb-3">3. User Conduct</h3>
            <p className="mb-4">By using the app, you agree to:</p>
            <p className="mb-4">Not use the app in emergencies or crises.</p>
            <p className="mb-4">Not abuse or exploit the chatbot or system.</p>
            <p className="mb-6">Use the app respectfully and within the limits of its design.</p>

            <h3 className="text-xl font-semibold mb-3">4. Free vs. Premium Usage</h3>
            <p className="mb-4">Free users may send up to 10 messages per day.</p>
            <p className="mb-4">Additional access may be unlocked via ad views or a premium plan.</p>
            <p className="mb-6">Early users (first 100) may receive a 50% discount on premium.</p>

            <h3 className="text-xl font-semibold mb-3">5. Termination</h3>
            <p className="mb-6">We reserve the right to suspend or ban users who violate our policies or attempt to misuse the app.</p>

            <h3 className="text-xl font-semibold mb-3">6. Disclaimer</h3>
            <p className="mb-4">AuraTalk is for informational and emotional support only. We are not responsible for decisions you make based on conversations with the chatbot.</p>
            <p className="mb-6">If you are in emotional distress or facing a crisis, please contact a licensed mental health professional or local emergency service.</p>

            <h3 className="text-xl font-semibold mb-3">7. Contact</h3>
            <p className="mb-4">Have a question? We're here to help.</p>
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

export default TermsConditions;
