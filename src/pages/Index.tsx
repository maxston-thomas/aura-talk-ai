
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, Mic, Sparkles, Heart, Shield, Users } from 'lucide-react';
import { useAuth, AuthProvider } from '@/hooks/useAuth';
import { Toaster } from "@/components/ui/sonner";
import AuthModal from '@/components/AuthModal';
import MoodSelector from '@/components/MoodSelector';
import ChatInterface from '@/components/ChatInterface';

function AppContent() {
  const { user, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <p className="text-slate-600">Loading AuraTalk...</p>
        </div>
      </div>
    );
  }

  if (showChat && selectedMood) {
    return (
      <ChatInterface 
        mood={selectedMood} 
        onBack={() => {
          setShowChat(false);
          setSelectedMood(null);
        }} 
      />
    );
  }

  if (user && selectedMood) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-pink-400/10"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="relative z-10 container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
              AuraTalk
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Ready to start your conversation?
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/40 backdrop-blur-md rounded-2xl p-2 border border-white/30">
              <Button
                onClick={() => setShowChat(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl mr-2"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Instant Chat
              </Button>
              <Button
                disabled
                variant="ghost"
                className="text-slate-500 cursor-not-allowed rounded-xl"
              >
                <Mic className="w-4 h-4 mr-2" />
                Voice Chat (Coming Soon)
              </Button>
            </div>
          </div>

          <MoodSelector onMoodSelect={setSelectedMood} />
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-pink-400/10"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="relative z-10 container mx-auto px-4 py-12">
          <MoodSelector onMoodSelect={setSelectedMood} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-pink-400/10"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-pink-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
            AuraTalk
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-6 leading-relaxed">
            Your Voice-Powered Emotional AI Companion
          </p>
          <p className="text-lg text-slate-500 mb-8 max-w-2xl mx-auto">
            Speak freely and feel heard with complete privacy. No conversations saved.
          </p>
          
          {/* Privacy Banner */}
          <Card className="bg-white/40 backdrop-blur-md border-white/30 p-6 max-w-3xl mx-auto mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-semibold text-slate-800">Complete Privacy Guaranteed</h3>
            </div>
            <p className="text-slate-600">
              "AuraTalk doesn't save what you say. Speak freely — we're here to listen, not to log."
            </p>
          </Card>

          <Button
            onClick={() => setShowAuthModal(true)}
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Heart className="w-5 h-5 mr-2" />
            Start Your Journey
          </Button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          <Card className="bg-white/40 backdrop-blur-md border-white/30 p-8 text-center hover:bg-white/60 transition-all duration-300 hover:scale-105">
            <MessageCircle className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-800 mb-3">Instant Chat</h3>
            <p className="text-slate-600">
              Start conversations immediately with our empathetic AI that adapts to your mood and needs.
            </p>
          </Card>

          <Card className="bg-white/40 backdrop-blur-md border-white/30 p-8 text-center hover:bg-white/60 transition-all duration-300 hover:scale-105 opacity-60">
            <Mic className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-800 mb-3">Voice Chat</h3>
            <p className="text-slate-600">
              Premium feature: Natural voice conversations with advanced speech recognition and synthesis.
            </p>
            <p className="text-sm text-purple-600 font-medium mt-2">Coming Soon</p>
          </Card>

          <Card className="bg-white/40 backdrop-blur-md border-white/30 p-8 text-center hover:bg-white/60 transition-all duration-300 hover:scale-105">
            <Users className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-800 mb-3">First 100 Users</h3>
            <p className="text-slate-600">
              Join our early community and get 50% off premium features. Limited time offer!
            </p>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-6 text-sm text-slate-500">
            <button className="hover:text-slate-700 transition-colors">Privacy Policy</button>
            <button className="hover:text-slate-700 transition-colors">Terms & Conditions</button>
            <button className="hover:text-slate-700 transition-colors">Support</button>
          </div>
          <p className="text-xs text-slate-400">
            Built for your peace of mind. No saving, no judging. • Contact: footballarchive29@gmail.com
          </p>
        </div>
      </div>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      <Toaster />
    </div>
  );
}

const Index = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default Index;
