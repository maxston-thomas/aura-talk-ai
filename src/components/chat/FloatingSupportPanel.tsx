
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
          className="absolute -top-2 -right-2 z-10 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 rounded-full p-2 shadow-lg"
        >
          <X className="w-4 h-4" />
        </Button>
        <SupportSection />
      </div>
    </div>
  );
};

export default FloatingSupportPanel;
