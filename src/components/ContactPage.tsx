
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Mail, MessageCircle, Heart, Users, Lightbulb, Shield } from 'lucide-react';

interface ContactPageProps {
  onBack: () => void;
}

const ContactPage = ({ onBack }: ContactPageProps) => {
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
            <Mail className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent mb-4">
            Contact & Support
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            We're here to help and would love to hear from you
          </p>
        </div>

        <div className="space-y-8">
          {/* Main Contact */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200/50 dark:border-blue-700/50 p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">Get in Touch</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
              If you need any help, want to share feedback, or have questions about AuraTalk, feel free to reach out!
            </p>
            <a 
              href="mailto:auratalkai@gmail.com"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105"
            >
              <Mail className="w-5 h-5" />
              auratalkai@gmail.com
            </a>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
              We typically respond within 24 hours
            </p>
          </Card>

          {/* What We Can Help With */}
          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6 text-center">How We Can Help You</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Technical Support</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Having trouble with the app? Login issues? We're here to help you get back to your emotional wellness journey.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Feedback & Suggestions</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Your feedback helps us improve. Share your ideas, suggestions, or experiences with AuraTalk.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Partnership Inquiries</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Interested in collaborating with AuraTalk? We welcome partnerships with mental health organizations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Privacy Questions</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Have questions about our privacy practices or data handling? We're transparent about everything.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Response Times */}
          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-white/30 dark:border-slate-700/30 p-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6 text-center">What to Expect</h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p><strong>Technical Issues:</strong> Usually resolved within 24 hours</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <p><strong>General Inquiries:</strong> Response within 1-2 business days</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <p><strong>Partnership Requests:</strong> Detailed response within 3-5 business days</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <p><strong>Feedback & Suggestions:</strong> Always appreciated, we read every message</p>
              </div>
            </div>
          </Card>

          {/* Community */}
          <Card className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 border-pink-200/50 dark:border-pink-700/50 p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">Join Our Community</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                AuraTalk is more than just an app—it's a community of people supporting each other's mental wellness journey. Your voice matters, and we're grateful for every user who helps us improve.
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Remember: While we're here for technical support and feedback, if you're experiencing a mental health crisis, please reach out to local emergency services or a mental health professional immediately.
              </p>
            </div>
          </Card>
        </div>

        <div className="text-center mt-12 pt-8 border-t border-slate-200/50 dark:border-slate-700/50">
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            Thank you for being part of AuraTalk. We're honored to be part of your mental wellness journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onBack}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3"
            >
              <Heart className="w-4 h-4 mr-2" />
              Start Your Journey
            </Button>
            <a 
              href="mailto:auratalkai@gmail.com"
              className="inline-flex items-center justify-center gap-2 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 hover:bg-white/60 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 px-8 py-3 rounded-lg font-semibold transition-all"
            >
              <Mail className="w-4 h-4" />
              Send Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
