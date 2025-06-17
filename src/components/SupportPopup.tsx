
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Heart, Copy, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

interface SupportPopupProps {
  onClose: () => void;
}

const SupportPopup = ({ onClose }: SupportPopupProps) => {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
      <Card className="relative max-w-lg w-full bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl border-white/30 dark:border-slate-700/30 shadow-2xl rounded-3xl p-8 animate-scale-in">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/20 dark:bg-slate-800/20 hover:bg-white/30 dark:hover:bg-slate-800/30 rounded-full p-2 backdrop-blur-sm"
        >
          <X className="w-4 h-4" />
        </Button>

        {/* Content */}
        <div className="text-center mb-6">
          <Heart className="w-16 h-16 text-red-500 mx-auto mb-4 animate-pulse" />
          <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            Support AuraTalk
          </h3>
          <div className="space-y-3 mb-6">
            <p className="text-slate-600 dark:text-slate-400 italic text-lg">
              "Your support helps us stay focused on your privacy."
            </p>
            <p className="text-slate-600 dark:text-slate-400 italic">
              "Made with love. Supported by you."
            </p>
            <p className="text-slate-600 dark:text-slate-400 italic">
              "Every donation keeps our servers running and features improving."
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Indian Donations */}
          <div className="bg-white/20 dark:bg-slate-700/20 backdrop-blur-sm rounded-2xl p-4 border border-white/20 dark:border-slate-700/20">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center text-lg">
              🇮🇳 For Indian Donations
            </h4>
            <div className="flex items-center justify-between bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm rounded-xl p-3 border border-white/20 dark:border-slate-700/20">
              <span className="text-sm font-mono text-slate-700 dark:text-slate-300">
                maxstonthomas@oksbi
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard('maxstonthomas@oksbi', 'UPI ID')}
                className="hover:bg-white/20 dark:hover:bg-slate-700/20 backdrop-blur-sm"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* International Donations */}
          <div className="bg-white/20 dark:bg-slate-700/20 backdrop-blur-sm rounded-2xl p-4 border border-white/20 dark:border-slate-700/20">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center text-lg">
              🌍 For International Donations
            </h4>
            <div className="flex items-center justify-between bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm rounded-xl p-3 border border-white/20 dark:border-slate-700/20">
              <span className="text-sm font-mono text-slate-700 dark:text-slate-300">
                paypal.me/maxstonthomasg
              </span>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard('paypal.me/maxstonthomasg', 'PayPal link')}
                  className="hover:bg-white/20 dark:hover:bg-slate-700/20 backdrop-blur-sm"
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open('https://paypal.me/maxstonthomasg', '_blank')}
                  className="hover:bg-white/20 dark:hover:bg-slate-700/20 backdrop-blur-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            * Donations are not refundable
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Thank you for supporting privacy-first technology! ❤️
          </p>
        </div>

        {/* Continue Button */}
        <div className="mt-8">
          <Button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl py-3 text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Continue to AuraTalk
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SupportPopup;
