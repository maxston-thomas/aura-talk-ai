
import React from 'react';

interface FooterProps {
  onAboutClick: () => void;
  onContactClick: () => void;
  onPrivacyClick: () => void;
  onTermsClick: () => void;
}

const Footer = ({
  onAboutClick,
  onContactClick,
  onPrivacyClick,
  onTermsClick
}: FooterProps) => {
  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center flex-wrap gap-4 sm:gap-8 text-sm sm:text-base text-slate-500 dark:text-slate-400">
        <button 
          onClick={onAboutClick} 
          className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors underline underline-offset-4"
        >
          About Us
        </button>
        <button 
          onClick={onContactClick} 
          className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors underline underline-offset-4"
        >
          Contact & Support
        </button>
        <button 
          onClick={onPrivacyClick} 
          className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors underline underline-offset-4"
        >
          Privacy Policy
        </button>
        <button 
          onClick={onTermsClick} 
          className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors underline underline-offset-4"
        >
          Terms & Conditions
        </button>
      </div>
      <div className="text-xs sm:text-sm text-slate-400 dark:text-slate-500 space-y-2">
        <p>© 2025 AuraTalk AI. All rights reserved. Privacy-first emotional support platform.</p>
        <p>For Indian donations: maxstonthomas@oksbi | For international donations: paypal.me/maxstonthomasg</p>
        <p className="text-xs">
          <strong>Keywords:</strong> AI emotional support, mental wellness chat, personal AI companion, emotional intelligence, privacy-first platform, mental health support, AI therapy, emotional wellness
        </p>
      </div>
    </div>
  );
};

export default Footer;
