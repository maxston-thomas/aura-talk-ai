
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { User, Palette, Moon, Sun, ChevronDown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const { user, signOut } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });
  const [currentTheme, setCurrentTheme] = useState(() => {
    return document.documentElement.getAttribute('data-theme') || 'blue';
  });
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);

  const themes = [
    { id: 'blue', name: 'Ocean Blue', colors: 'from-blue-400 via-purple-400 to-pink-400' },
    { id: 'green', name: 'Forest Green', colors: 'from-green-400 via-emerald-400 to-teal-400' },
    { id: 'purple', name: 'Royal Purple', colors: 'from-purple-400 via-pink-400 to-indigo-400' },
    { id: 'orange', name: 'Sunset Orange', colors: 'from-orange-400 via-red-400 to-pink-400' }
  ];

  // Apply theme and dark mode to body element
  const applyThemeToBody = (themeId: string, darkMode: boolean) => {
    console.log('Applying theme to body:', themeId, 'Dark mode:', darkMode);
    
    // Apply theme attribute to body
    document.body.setAttribute('data-theme', themeId);
    
    // Apply dark mode class to body
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    
    // Also apply to html for compatibility
    document.documentElement.setAttribute('data-theme', themeId);
    document.documentElement.classList.toggle('dark', darkMode);
  };

  // Initialize theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'blue';
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    
    console.log('Initializing theme:', savedTheme, 'Dark mode:', savedDarkMode);
    
    setCurrentTheme(savedTheme);
    setIsDarkMode(savedDarkMode);
    
    // Apply saved theme and dark mode to body
    applyThemeToBody(savedTheme, savedDarkMode);

    // Apply theme colors to CSS variables
    const themeColors = {
      blue: { primary: '59 130 246', secondary: '147 51 234', accent: '236 72 153' },
      green: { primary: '34 197 94', secondary: '16 185 129', accent: '20 184 166' },
      purple: { primary: '147 51 234', secondary: '236 72 153', accent: '99 102 241' },
      orange: { primary: '251 146 60', secondary: '239 68 68', accent: '236 72 153' }
    };

    const colors = themeColors[savedTheme as keyof typeof themeColors];
    document.documentElement.style.setProperty('--theme-primary', colors.primary);
    document.documentElement.style.setProperty('--theme-secondary', colors.secondary);
    document.documentElement.style.setProperty('--theme-accent', colors.accent);
  }, []);

  const handleThemeChange = (themeId: string) => {
    console.log('Theme changed to:', themeId);
    
    setCurrentTheme(themeId);
    setShowThemeDropdown(false);
    
    // Save to localStorage
    localStorage.setItem('theme', themeId);
    
    // Apply theme to body with current dark mode state
    applyThemeToBody(themeId, isDarkMode);

    // Apply theme colors to CSS variables
    const themeColors = {
      blue: { primary: '59 130 246', secondary: '147 51 234', accent: '236 72 153' },
      green: { primary: '34 197 94', secondary: '16 185 129', accent: '20 184 166' },
      purple: { primary: '147 51 234', secondary: '236 72 153', accent: '99 102 241' },
      orange: { primary: '251 146 60', secondary: '239 68 68', accent: '236 72 153' }
    };

    const colors = themeColors[themeId as keyof typeof themeColors];
    document.documentElement.style.setProperty('--theme-primary', colors.primary);
    document.documentElement.style.setProperty('--theme-secondary', colors.secondary);
    document.documentElement.style.setProperty('--theme-accent', colors.accent);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    console.log('Dark mode toggled to:', newDarkMode);
    
    setIsDarkMode(newDarkMode);
    
    // Save to localStorage
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    // Apply dark mode to body with current theme
    applyThemeToBody(currentTheme, newDarkMode);
  };

  if (!user) return null;

  return (
    <div className="absolute top-4 left-4 right-4 z-50 flex items-center justify-between">
      {/* User Email - Left Side */}
      <div className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 rounded-lg px-4 py-2">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
          <User className="w-4 h-4" />
          <span className="text-sm font-medium">{user.email}</span>
        </div>
      </div>

      {/* Controls - Right Side */}
      <div className="flex items-center gap-4">
        {/* Theme Selector */}
        <div className="relative">
          <Button
            variant="ghost"
            onClick={() => setShowThemeDropdown(!showThemeDropdown)}
            className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 hover:bg-white/60 dark:hover:bg-slate-800/60"
          >
            <Palette className="w-4 h-4 mr-2" />
            Themes
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
          
          {showThemeDropdown && (
            <Card className="absolute top-full mt-2 right-0 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-white/40 dark:border-slate-700/40 p-2 min-w-48 z-50">
              {themes.map((theme) => (
                <Button
                  key={theme.id}
                  variant="ghost"
                  onClick={() => handleThemeChange(theme.id)}
                  className={`w-full justify-start mb-1 ${currentTheme === theme.id ? 'bg-white/60 dark:bg-slate-700/60' : 'hover:bg-white/40 dark:hover:bg-slate-700/40'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${theme.colors} mr-3`}></div>
                  {theme.name}
                </Button>
              ))}
            </Card>
          )}
        </div>

        {/* Dark Mode Toggle */}
        <div className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 rounded-lg px-4 py-2">
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
          className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/30 dark:border-slate-700/30 hover:bg-white/60 dark:hover:bg-slate-800/60 text-red-600 dark:text-red-400"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Header;
