
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X, Mail, Lock, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [useMagicLink, setUseMagicLink] = useState(false);
  
  const { signIn, signUp, signInWithMagicLink } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (useMagicLink) {
        await signInWithMagicLink(email);
        toast.success('Magic link sent! Check your email.');
        onClose();
      } else if (isSignUp) {
        await signUp(email, password);
        toast.success('Account created! Please check your email to verify.');
        onClose();
      } else {
        await signIn(email, password);
        toast.success('Welcome back!');
        onClose();
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="bg-white/90 backdrop-blur-md border-white/30 p-8 max-w-md w-full relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute right-4 top-4 hover:bg-white/20"
        >
          <X className="w-4 h-4" />
        </Button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-slate-800 mb-2">
            {isSignUp ? 'Join AuraTalk' : 'Welcome Back'}
          </h2>
          <p className="text-slate-600">
            {useMagicLink 
              ? 'Enter your email for a magic link'
              : isSignUp 
                ? 'Create your account to start your journey'
                : 'Sign in to continue your conversations'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-white/60 border-white/30 focus:bg-white/80"
                required
              />
            </div>
            
            {!useMagicLink && (
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-white/60 border-white/30 focus:bg-white/80"
                  required
                  minLength={6}
                />
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
            disabled={loading}
          >
            {loading ? 'Please wait...' : 
             useMagicLink ? 'Send Magic Link' :
             isSignUp ? 'Create Account' : 'Sign In'}
          </Button>

          <div className="text-center space-y-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setUseMagicLink(!useMagicLink)}
              className="text-sm text-slate-600 hover:text-slate-800"
            >
              {useMagicLink ? 'Use password instead' : 'Use magic link'}
            </Button>
            
            {!useMagicLink && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-slate-600 hover:text-slate-800"
              >
                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </Button>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AuthModal;
