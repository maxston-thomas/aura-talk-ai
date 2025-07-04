
import React from 'react';
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';
import SupportSection from '../SupportSection';

interface FloatingSupportPanelProps {
  show: boolean;
  onClose: () => void;
}

const FloatingSupportPanel = ({ show, onClose }: FloatingSupportPanelProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative max-w-md w-full">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute -top-3 -right-3 z-10 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 rounded-full p-3 shadow-lg w-10 h-10"
        >
          <X className="w-6 h-6" />
        </Button>
        <SupportSection />
      </div>
    </div>
  );
};

export default FloatingSupportPanel;
