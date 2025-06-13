
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Check, Crown, Zap } from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: (plan: string) => void;
  onWatchAd: () => void;
}

const SubscriptionModal = ({ isOpen, onClose, onUpgrade, onWatchAd }: SubscriptionModalProps) => {
  if (!isOpen) return null;

  const plans = [
    {
      id: 'monthly',
      name: 'Monthly Premium',
      price: '₹199',
      period: '/month',
      features: ['Unlimited conversations', 'No ads', 'Priority support', 'Early access to voice chat'],
      popular: false
    },
    {
      id: 'yearly',
      name: 'Yearly Premium',
      price: '₹1,499',
      period: '/year',
      features: ['Unlimited conversations', 'No ads', 'Priority support', 'Early access to voice chat', 'Save ₹889 annually'],
      popular: true
    },
    {
      id: 'lifetime',
      name: 'Lifetime Access',
      price: '₹5,999',
      period: 'one-time',
      features: ['Unlimited conversations forever', 'No ads ever', 'Priority support', 'All future features included'],
      popular: false
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Choose Your Plan</h2>
            <Button variant="ghost" onClick={onClose} className="rounded-full">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Free Plan Reminder */}
          <Card className="bg-orange-50 border-orange-200 p-4 mb-6">
            <div className="text-center">
              <h3 className="font-semibold text-orange-800 mb-2">Daily Limit Reached</h3>
              <p className="text-orange-700 mb-4">
                You've used your 10 free conversations today. Watch an ad to get 10 more, or upgrade for unlimited access!
              </p>
              <Button
                onClick={onWatchAd}
                className="bg-orange-500 hover:bg-orange-600 text-white mr-4"
              >
                <Zap className="w-4 h-4 mr-2" />
                Watch Ad (Get 10 More)
              </Button>
            </div>
          </Card>

          {/* Premium Plans */}
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative p-6 transition-all duration-300 hover:scale-105 ${
                  plan.popular 
                    ? 'border-2 border-purple-500 bg-gradient-to-b from-purple-50 to-white' 
                    : 'border border-slate-200 bg-white/60'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                      <Crown className="w-4 h-4 mr-1" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-slate-800">{plan.price}</span>
                    <span className="text-slate-600">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-slate-700">
                      <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => onUpgrade(plan.id)}
                  className={`w-full ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                  } text-white`}
                >
                  Upgrade Now
                </Button>
              </Card>
            ))}
          </div>

          <div className="mt-6 text-center text-sm text-slate-600">
            <p>UPI ID for Indian donations: maxstonthomas@oksbi</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
