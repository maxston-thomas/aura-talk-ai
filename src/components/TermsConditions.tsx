
import React, { useEffect } from 'react';
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
      
      <div className="relative z-10 container mx-auto px-3 sm:px-4 py-16 sm:py-24 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="hover:bg-white/30 dark:hover:bg-slate-800/30 rounded-full p-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2 sm:gap-3">
            <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-200">Terms & Conditions</h1>
          </div>
        </div>

        <Card className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-4 sm:p-8">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">📜 Terms & Conditions – AuraTalk</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">Effective Date: June 13, 2025</p>
            
            <p className="mb-6">Welcome to AuraTalk — a privacy-focused, conversational AI platform. By using this app, you agree to the following terms:</p>

            <h3 className="text-lg sm:text-xl font-semibold mb-3">1. Subscription Service</h3>
            <p className="mb-4">AuraTalk operates as a premium subscription service at ₹199/month for unlimited access.</p>
            <p className="mb-4">We provide 5 free trial interactions for evaluation purposes.</p>
            <p className="mb-4">You agree to use it responsibly and not for harmful or abusive purposes.</p>
            <p className="mb-6">Subscription can be cancelled at any time through your account settings.</p>

            <h3 className="text-lg sm:text-xl font-semibold mb-3">2. No Guarantees</h3>
            <p className="mb-4">While we strive for high availability, AuraTalk is provided "as is" without warranties.</p>
            <p className="mb-6">We may update or modify the service without notice.</p>

            <h3 className="text-lg sm:text-xl font-semibold mb-3">3. Responsible Usage</h3>
            <p className="mb-4">Users must engage with AuraTalk in good faith for emotional support purposes.</p>
            <p className="mb-4">Misuse, including but not limited to spamming messages, testing limits, or generating unnecessary server load is not permitted.</p>
            <p className="mb-6">We reserve the right to implement usage limits to ensure fair access for all users.</p>

            <h3 className="text-lg sm:text-xl font-semibold mb-3">4. Donations</h3>
            <p className="mb-4">Donations are optional and non-refundable.</p>
            <p className="mb-6">Supporting us does not unlock extra features; it helps sustain the project.</p>

            <h3 className="text-lg sm:text-xl font-semibold mb-3">5. Limitation of Liability</h3>
            <p className="mb-6">We are not liable for any damages arising from the use of this app.</p>

            <h3 className="text-lg sm:text-xl font-semibold mb-3">6. Changes to Terms</h3>
            <p className="mb-6">We may update these terms occasionally. Continued use means you agree to the changes.</p>

            <h3 className="text-lg sm:text-xl font-semibold mb-3">7. Contact</h3>
            <p className="mb-4">If you have any concerns, contact us at auratalkai@gmail.com.</p>
          </div>
        </Card>

        <div className="mt-12 sm:mt-16">
          <Footer 
            onAboutClick={() => {}} 
            onContactClick={() => {}} 
            onPrivacyClick={() => {}} 
            onTermsClick={() => {}} 
          />
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
