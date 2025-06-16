
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
            <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-200">Privacy Policy</h1>
          </div>
        </div>

        <Card className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-4 sm:p-8">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">🛡️ Privacy Policy – AuraTalk</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">Effective Date: June 13, 2025</p>
            
            <p className="mb-6">At AuraTalk, your privacy is at the heart of everything we do. We believe in creating a space where you can speak freely, without fear of being watched, tracked, or logged.</p>

            <h3 className="text-lg sm:text-xl font-semibold mb-3">1. No Data Collection</h3>
            <p className="mb-4">We do not collect, store, or log your conversations.</p>
            <p className="mb-4">We do not require personal data for access.</p>
            <p className="mb-6">Your voice inputs (if used) are processed in real-time and never stored.</p>

            <h3 className="text-lg sm:text-xl font-semibold mb-3">2. No Tracking or Analytics</h3>
            <p className="mb-4">We do not use cookies, tracking pixels, or third-party analytics.</p>
            <p className="mb-6">Your usage is never monitored or analyzed.</p>

            <h3 className="text-lg sm:text-xl font-semibold mb-3">3. Voluntary Support Only</h3>
            <p className="mb-4">AuraTalk is completely free.</p>
            <p className="mb-6">We offer a "Support Us" option if you'd like to help via donation (e.g., UPI, PayPal).</p>

            <h3 className="text-lg sm:text-xl font-semibold mb-3">4. Email Communication</h3>
            <p className="mb-4">If you contact us via email (auratalkai@gmail.com), we will use your email only to respond.</p>
            <p className="mb-6">We do not build mailing lists or send promotional emails.</p>

            <h3 className="text-lg sm:text-xl font-semibold mb-3">5. Security</h3>
            <p className="mb-4">Our app does not retain or expose any user-generated data.</p>
            <p className="mb-6">All operations happen in your browser session unless explicitly mentioned.</p>

            <h3 className="text-lg sm:text-xl font-semibold mb-3">6. Contact Us</h3>
            <p className="mb-4">If you have questions, reach us at auratalkai@gmail.com.</p>
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

export default PrivacyPolicy;
