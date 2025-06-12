
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Shield, Eye, Heart, Mail } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy = ({ onBack }: PrivacyPolicyProps) => {
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
            <Shield className="w-8 h-8 text-blue-500" />
            <div>
              <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">Privacy Policy</h1>
              <p className="text-slate-600 dark:text-slate-400">AuraTalk - Effective Date: June 12, 2025</p>
            </div>
          </div>
        </div>

        <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-white/40 dark:border-slate-700/40 p-8 space-y-8 mb-8">
          <div className="text-center mb-8">
            <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              AuraTalk is committed to protecting your privacy. We design our service to provide emotional support while collecting as little personal data as possible.
            </p>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                <span className="text-blue-500">1.</span> What We Collect
              </h2>
              <div className="space-y-3 text-slate-700 dark:text-slate-300">
                <p><strong>Account Info:</strong> We collect your email address for account creation.</p>
                <p><strong>Usage Info:</strong> We track the number of messages you send per day to enforce daily limits.</p>
                <p><strong>Ads Data:</strong> If you're in the EEA/UK/Switzerland, we ask for your consent to show non-personalized ads via Google AdSense.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                <span className="text-green-500">2.</span> What We Don't Collect
              </h2>
              <div className="space-y-3 text-slate-700 dark:text-slate-300">
                <p className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-red-500" />
                  We do not store your conversation history.
                </p>
                <p className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-red-500" />
                  We do not collect personal health data.
                </p>
                <p className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-red-500" />
                  We do not use your data for profiling or ad personalization.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                <span className="text-purple-500">3.</span> How We Use Your Info
              </h2>
              <div className="space-y-3 text-slate-700 dark:text-slate-300">
                <p>• To track daily message usage.</p>
                <p>• To deliver non-personalized ads (with consent).</p>
                <p>• To improve user experience anonymously (e.g. how many users chose each mood or feature).</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                <span className="text-orange-500">4.</span> Your Rights
              </h2>
              <div className="space-y-3 text-slate-700 dark:text-slate-300">
                <p>• You can delete your account at any time.</p>
                <p>• You can revoke ad consent through your browser or settings.</p>
                <p>• If you're located in the EU or UK, you have GDPR rights to access or erase your data.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                <span className="text-red-500">5.</span> Children's Privacy
              </h2>
              <p className="text-slate-700 dark:text-slate-300">
                AuraTalk is intended for users 18 years or older. We do not knowingly collect data from children.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                <span className="text-blue-500">6.</span> Contact Us
              </h2>
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                <p className="text-slate-700 dark:text-slate-300 mb-2">If you have questions or concerns:</p>
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

export default PrivacyPolicy;
