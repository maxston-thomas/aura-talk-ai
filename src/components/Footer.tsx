
import React from 'react';

interface FooterProps {
  onPrivacyClick: () => void;
  onTermsClick: () => void;
}

const Footer = ({ onPrivacyClick, onTermsClick }: FooterProps) => {
  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center space-x-8 text-base text-slate-500 dark:text-slate-400">
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
        <a 
          href="mailto:auratalkai@gmail.com" 
          className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors underline underline-offset-4"
        >
          Support
        </a>
      </div>
      <div className="text-sm text-slate-400 dark:text-slate-500 space-y-2">
        <p>© 2025 AuraTalk AI. All rights reserved. Privacy-first emotional support platform.</p>
        <p>UPI ID for Indian donations: maxstonthomas@oksbi</p>
      </div>
    </div>
  );
};

export default Footer;
