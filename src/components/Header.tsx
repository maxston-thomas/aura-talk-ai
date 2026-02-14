
import React, { useState, useEffect } from 'react';
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from 'lucide-react';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  const applyDarkModeToBody = (darkMode: boolean) => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    document.documentElement.classList.toggle('dark', darkMode);
  };

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    applyDarkModeToBody(savedDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    applyDarkModeToBody(newDarkMode);
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
      {/* Dark Mode Toggle */}
      <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-white/30 dark:border-slate-700/30 rounded-lg px-4 py-2 shadow-sm">
        <div className="flex items-center gap-3">
          <Sun className="w-4 h-4 text-yellow-500" />
          <Switch
            checked={isDarkMode}
            onCheckedChange={toggleDarkMode}
          />
          <Moon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
        </div>
      </div>
    </div>
  );
};

export default Header;
