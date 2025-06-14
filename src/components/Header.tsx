
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { User, Moon, Sun } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const { user, signOut } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  const applyDarkModeToBody = (darkMode: boolean) => {
    console.log('Applying dark mode to body:', darkMode);
    
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    
    document.documentElement.classList.toggle('dark', darkMode);
  };

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    
    console.log('Initializing dark mode:', savedDarkMode);
    
    setIsDarkMode(savedDarkMode);
    applyDarkModeToBody(savedDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    console.log('Dark mode toggled to:', newDarkMode);
    
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    applyDarkModeToBody(newDarkMode);
  };

  if (!user) return null;

  return (
    <div className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between">
      {/* User Email - Left Side */}
      <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-white/30 dark:border-slate-700/30 rounded-lg px-4 py-2 shadow-sm">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
          <User className="w-4 h-4" />
          <span className="text-sm font-medium">{user.email}</span>
        </div>
      </div>

      {/* Controls - Right Side */}
      <div className="flex items-center gap-3">
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

        {/* Sign Out */}
        <Button
          variant="ghost"
          onClick={signOut}
          className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-white/30 dark:border-slate-700/30 hover:bg-white/80 dark:hover:bg-slate-800/80 text-red-600 dark:text-red-400 shadow-sm"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Header;
