
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Copy, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

const SupportSection = () => {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <div className="mt-8 max-w-2xl mx-auto animate-fade-in">
      <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border-white/40 dark:border-slate-700/40 p-8">
        <div className="text-center mb-6">
          <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
            Support AuraTalk
          </h3>
          <div className="space-y-3 mb-6">
            <p className="text-slate-600 dark:text-slate-400 italic">
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
          <div className="bg-white/30 dark:bg-slate-700/30 rounded-lg p-4">
            <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-3 flex items-center">
              🇮🇳 For Indian Donations
            </h4>
            <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
              <span className="text-sm font-mono text-slate-700 dark:text-slate-300">
                maxstonthomas@oksbi
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard('maxstonthomas@oksbi', 'UPI ID')}
                className="hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* International Donations */}
          <div className="bg-white/30 dark:bg-slate-700/30 rounded-lg p-4">
            <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-3 flex items-center">
              🌍 For International Donations
            </h4>
            <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
              <span className="text-sm font-mono text-slate-700 dark:text-slate-300">
                paypal.me/maxstonthomasg
              </span>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard('paypal.me/maxstonthomasg', 'PayPal link')}
                  className="hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open('https://paypal.me/maxstonthomasg', '_blank')}
                  className="hover:bg-slate-200 dark:hover:bg-slate-700"
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
      </Card>
    </div>
  );
};

export default SupportSection;
