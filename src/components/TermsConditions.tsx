
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, FileText, AlertTriangle, Crown, Mail } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface TermsConditionsProps {
  onBack: () => void;
}

const TermsConditions = ({ onBack }: TermsConditionsProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 relative overflow-hidden">
      <Header />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-pink-400/10 dark:from-blue-600/20 dark:via-purple-600/20 dark:to-pink-600/20"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 dark:from-blue-600/30 dark:to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="hover:bg-white/30 dark:hover:bg-slate-800/30 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-blue-500" />
            <div>
              <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">Terms & Conditions</h1>
              <p className="text-slate-600 dark:text-slate-400">AuraTalk - Effective Date: June 12, 2025</p>
            </div>
          </div>
        </div>

        <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-white/40 dark:border-slate-700/40 p-8 space-y-8 mb-8">
          <div className="text-center mb-8">
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Welcome to AuraTalk. By using this app, you agree to these Terms of Use.
            </p>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                <span className="text-blue-500">1.</span> Purpose of the App
              </h2>
              <p className="text-slate-700 dark:text-slate-300">
                AuraTalk provides AI-powered emotional support, self-reflection, and motivational interaction. It is not a substitute for professional therapy, counseling, or medical advice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                <span className="text-green-500">2.</span> Eligibility
              </h2>
              <p className="text-slate-700 dark:text-slate-300">
                You must be at least 18 years old to use AuraTalk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                <span className="text-purple-500">3.</span> User Conduct
              </h2>
              <div className="text-slate-700 dark:text-slate-300">
                <p className="mb-3">By using the app, you agree to:</p>
                <div className="space-y-2">
                  <p>• Not use the app in emergencies or crises.</p>
                  <p>• Not abuse or exploit the chatbot or system.</p>
                  <p>• Use the app respectfully and within the limits of its design.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                <Crown className="w-6 h-6 text-yellow-500" />
                <span className="text-orange-500">4.</span> Free vs. Premium Usage
              </h2>
              <div className="space-y-3 text-slate-700 dark:text-slate-300">
                <p>• Free users may send up to 10 messages per day.</p>
                <p>• Additional access may be unlocked via ad views or a premium plan.</p>
                <p>• Early users (first 100) may receive a 50% discount on premium.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                <span className="text-red-500">5.</span> Termination
              </h2>
              <p className="text-slate-700 dark:text-slate-300">
                We reserve the right to suspend or ban users who violate our policies or attempt to misuse the app.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-yellow-500" />
                <span className="text-yellow-600">6.</span> Disclaimer
              </h2>
              <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 p-4 rounded">
                <div className="space-y-3 text-slate-700 dark:text-slate-300">
                  <p>AuraTalk is for informational and emotional support only. We are not responsible for decisions you make based on conversations with the chatbot.</p>
                  <p className="font-semibold text-red-600 dark:text-red-400">
                    If you are in emotional distress or facing a crisis, please contact a licensed mental health professional or local emergency service.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                <span className="text-blue-500">7.</span> Contact
              </h2>
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                <p className="text-slate-700 dark:text-slate-300 mb-2">Have a question? We're here to help.</p>
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:footballarchive29@gmail.com" className="font-medium hover:underline">
                    footballarchive29@gmail.com
                  </a>
                </div>
              </div>
            </section>
          </div>
        </Card>

        <Footer onPrivacyClick={() => {}} onTermsClick={() => {}} />
      </div>
    </div>
  );
};

export default TermsConditions;
