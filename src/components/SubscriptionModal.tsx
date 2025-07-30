import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Crown, Check, Sparkles, MessageCircle, Heart, Zap, X } from 'lucide-react';

interface SubscriptionModalProps {
  open: boolean;
  onClose: () => void;
  onSubscribe: () => void;
}

const SubscriptionModal = ({ open, onClose, onSubscribe }: SubscriptionModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border-white/30 dark:border-slate-700/30">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center gap-2">
            <Crown className="w-6 h-6 text-amber-500" />
            <span className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              AuraTalk Premium
            </span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Pricing */}
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800 p-6 text-center">
            <div className="text-4xl font-bold text-slate-800 dark:text-slate-200 mb-2">
              ₹199
              <span className="text-lg font-normal text-slate-600 dark:text-slate-400">/month</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Unlimited emotional support at your fingertips
            </p>
          </Card>

          {/* Features */}
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-center mb-4">
              Premium Features
            </h3>
            
            {[
              { icon: MessageCircle, text: "Unlimited AI conversations" },
              { icon: Sparkles, text: "All mood & conversation modes" },
              { icon: Heart, text: "Priority emotional support" },
              { icon: Zap, text: "Faster response times" },
              { icon: Check, text: "Advanced AI personality" },
              { icon: Check, text: "No daily limits" }
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <feature.icon className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Privacy Reminder */}
          <Card className="bg-green-50/80 dark:bg-green-900/20 border-green-200 dark:border-green-800 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="font-medium text-green-700 dark:text-green-400">
                Privacy Guaranteed
              </span>
            </div>
            <p className="text-green-600 dark:text-green-300 text-sm">
              Your conversations remain private and are never stored.
            </p>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={onSubscribe}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl py-3 text-lg font-semibold"
            >
              <Crown className="w-5 h-5 mr-2" />
              Subscribe Now
            </Button>
            
            <Button 
              onClick={onClose}
              variant="outline"
              className="w-full border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl"
            >
              Maybe Later
            </Button>
          </div>

          <p className="text-xs text-center text-slate-500 dark:text-slate-400">
            Cancel anytime • Secure payment via Razorpay
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;