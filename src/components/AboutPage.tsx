
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Heart, Sparkles, Users, Brain, Shield, Lightbulb } from 'lucide-react';

interface AboutPageProps {
  onBack: () => void;
}

const AboutPage = ({ onBack }: AboutPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-pink-400/10 dark:from-blue-600/20 dark:via-purple-600/20 dark:to-pink-600/20"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 dark:from-blue-600/30 dark:to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-8 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 hover:bg-white/60 dark:hover:bg-slate-800/60"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent mb-4">
            About AuraTalk
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Bringing AI-powered emotional support to everyone
          </p>
        </div>

        <div className="space-y-8">
          {/* Our Story */}
          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Our Story</h2>
            </div>
            <div className="space-y-4 text-slate-600 dark:text-slate-400">
              <p>
                AuraTalk was born from a simple but powerful realization: everyone deserves access to emotional support, regardless of time, location, or circumstances. In a world where mental wellness is increasingly important, many people struggle to find someone who will truly listen without judgment.
              </p>
              <p>
                Created with love in Chennai by Maxston, AuraTalk represents a fusion of advanced artificial intelligence and deep empathy. We believe that technology should enhance human connection, not replace it. Our AI companion is designed to provide the kind of understanding, non-judgmental support that everyone needs but doesn't always have access to.
              </p>
              <p>
                What started as a personal project to help friends and family has grown into a platform that serves people worldwide, providing a safe space for emotional expression and mental wellness support.
              </p>
            </div>
          </Card>

          {/* Our Mission */}
          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Our Mission</h2>
            </div>
            <div className="space-y-4 text-slate-600 dark:text-slate-400">
              <p>
                Our mission is to democratize emotional support by making AI-powered mental wellness accessible to everyone, everywhere. We believe that emotional well-being is a fundamental human need, and we're committed to providing tools that help people process their feelings, find clarity, and maintain mental balance.
              </p>
              <p>
                We strive to create technology that respects human dignity and privacy while providing genuine value. AuraTalk is more than just an app—it's a commitment to mental wellness, emotional growth, and the belief that everyone deserves to be heard.
              </p>
            </div>
          </Card>

          {/* Privacy First */}
          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Privacy-First Philosophy</h2>
            </div>
            <div className="space-y-4 text-slate-600 dark:text-slate-400">
              <p>
                From day one, AuraTalk was designed with privacy as the foundation, not an afterthought. We understand that emotional conversations are deeply personal, and your trust is sacred to us.
              </p>
              <p>
                That's why we made the radical decision to never store or save your conversations. Every interaction with our AI companion is completely ephemeral—when your session ends, everything disappears. This isn't just a privacy policy; it's our core principle.
              </p>
              <p>
                We believe that true emotional freedom comes from knowing you can speak without fear, share without worry, and express yourself completely without any concerns about data privacy or security.
              </p>
            </div>
          </Card>

          {/* Community Impact */}
          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Community & Impact</h2>
            </div>
            <div className="space-y-4 text-slate-600 dark:text-slate-400">
              <p>
                AuraTalk serves users from all walks of life—students dealing with academic stress, professionals navigating workplace challenges, parents juggling responsibilities, and individuals simply seeking a moment of peace in their busy lives.
              </p>
              <p>
                Our AI companion has provided millions of minutes of emotional support, helping people process difficult emotions, celebrate achievements, and find clarity during uncertain times. We're proud to be part of our users' mental wellness journeys.
              </p>
              <p>
                We're continuously improving our platform based on user feedback and the latest advances in AI emotional intelligence, always with the goal of providing better, more empathetic support.
              </p>
            </div>
          </Card>

          {/* Future Vision */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200/50 dark:border-blue-700/50 p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Looking Forward</h2>
            </div>
            <div className="space-y-4 text-slate-600 dark:text-slate-400">
              <p>
                We envision a future where mental wellness support is as accessible as checking the weather. Our roadmap includes enhanced emotional intelligence, voice-based interactions, and expanded language support to serve more communities worldwide.
              </p>
              <p>
                We're also exploring partnerships with mental health organizations and research institutions to contribute to the broader understanding of AI-assisted emotional support and its role in modern mental wellness.
              </p>
              <p>
                Most importantly, we remain committed to our core values: privacy, empathy, accessibility, and the belief that everyone deserves emotional support when they need it most.
              </p>
            </div>
          </Card>
        </div>

        <div className="text-center mt-12 pt-8 border-t border-slate-200/50 dark:border-slate-700/50">
          <p className="text-slate-500 dark:text-slate-400 mb-4">
            Thank you for being part of the AuraTalk community. Together, we're making mental wellness more accessible for everyone.
          </p>
          <Button
            onClick={onBack}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3"
          >
            <Heart className="w-4 h-4 mr-2" />
            Start Your Journey
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
