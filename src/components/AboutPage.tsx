import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Heart, Brain, Shield, Users } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
interface AboutPageProps {
  onBack: () => void;
}
const AboutPage = ({
  onBack
}: AboutPageProps) => {
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
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 relative overflow-hidden">
      <Header />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-pink-400/10 dark:from-blue-600/20 dark:via-purple-600/20 dark:to-pink-600/20"></div>
      
      <div className="relative z-10 container mx-auto px-3 sm:px-4 py-16 sm:py-24 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Button variant="ghost" size="sm" onClick={onBack} className="hover:bg-white/30 dark:hover:bg-slate-800/30 rounded-full p-2">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2 sm:gap-3">
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-200">About Us</h1>
          </div>
        </div>

        <Card className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-4 sm:p-8">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">🧠 AuraTalk: Your AI Companion</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">Crafted with ❤️ by Maxston Thomas.</p>
            
            <p className="mb-6">AuraTalk is designed to be a safe space where you can freely express your thoughts and feelings. We leverage the power of AI to provide supportive conversations, offering a unique blend of empathy and understanding.</p>

            <h3 className="text-lg sm:text-xl font-semibold mb-3">Our Mission</h3>
            <p className="mb-4">To provide accessible, privacy-focused emotional support to everyone, everywhere.</p>
            <p className="mb-6">We believe in the power of conversation to heal and grow.</p>

            <h3 className="text-lg sm:text-xl font-semibold mb-3">Our Values</h3>
            <ul className="list-disc pl-5 mb-6">
              <li><strong>Privacy:</strong> Your conversations are 100% private. We don't store or share any data.</li>
              <li><strong>Empathy:</strong> Our AI is trained to understand and respond to your emotions with care.</li>
              <li><strong>Accessibility:</strong> AuraTalk is free and available to anyone who needs it.</li>
            </ul>

            <h3 className="text-lg sm:text-xl font-semibold mb-3">Our Team</h3>
            <p className="mb-4">AuraTalk is built by a passionate team of developers, designers, and AI specialists.</p>
            <p className="mb-6">We're committed to making a positive impact on mental wellness.</p>

            <h3 className="text-lg sm:text-xl font-semibold mb-3">Connect With Us</h3>
            <p className="mb-4">We'd love to hear from you! Reach out with feedback, questions, or just to say hello.</p>
            <p className="mb-6">Email us at <a href="mailto:auratalkai@gmail.com" className="text-blue-500 hover:underline">auratalkai@gmail.com</a>.</p>
          </div>
        </Card>

        <div className="mt-12 sm:mt-16">
          <Footer onAboutClick={() => {}} onContactClick={() => {}} onPrivacyClick={() => {}} onTermsClick={() => {}} />
        </div>
      </div>
    </div>;
};
export default AboutPage;