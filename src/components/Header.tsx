
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { User, Palette, Moon, Sun, ChevronDown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const { user, signOut } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('blue');
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);

  const themes = [
    { id: 'blue', name: 'Ocean Blue', colors: 'from-blue-400 via-purple-400 to-pink-400' },
    { id: 'green', name: 'Forest Green', colors: 'from-green-400 via-emerald-400 to-teal-400' },
    { id: 'purple', name: 'Royal Purple', colors: 'from-purple-400 via-pink-400 to-indigo-400' },
    { id: 'orange', name: 'Sunset Orange', colors: 'from-orange-400 via-red-400 to-pink-400' }
  ];

  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId);
    setShowThemeDropdown(false);
    // Apply theme to document root
    document.documentElement.setAttribute('data-theme', themeId);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  if (!user) return null;

  return (
    <div className="absolute top-4 right-4 z-50 flex items-center gap-4">
      {/* User Email */}
      <div className="bg-white/40 backdrop-blur-md border-white/30 rounded-lg px-4 py-2">
        <div className="flex items-center gap-2 text-slate-700">
          <User className="w-4 h-4" />
          <span className="text-sm font-medium">{user.email}</span>
        </div>
      </div>

      {/* Theme Selector */}
      <div className="relative">
        <Button
          variant="ghost"
          onClick={() => setShowThemeDropdown(!showThemeDropdown)}
          className="bg-white/40 backdrop-blur-md border-white/30 hover:bg-white/60"
        >
          <Palette className="w-4 h-4 mr-2" />
          Themes
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
        
        {showThemeDropdown && (
          <Card className="absolute top-full mt-2 right-0 bg-white/60 backdrop-blur-md border-white/40 p-2 min-w-48 z-50">
            {themes.map((theme) => (
              <Button
                key={theme.id}
                variant="ghost"
                onClick={() => handleThemeChange(theme.id)}
                className={`w-full justify-start mb-1 ${currentTheme === theme.id ? 'bg-white/60' : 'hover:bg-white/40'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${theme.colors} mr-3`}></div>
                {theme.name}
              </Button>
            ))}
          </Card>
        )}
      </div>

      {/* Dark Mode Toggle */}
      <div className="bg-white/40 backdrop-blur-md border-white/30 rounded-lg px-4 py-2">
        <div className="flex items-center gap-3">
          <Sun className="w-4 h-4 text-yellow-500" />
          <Switch
            checked={isDarkMode}
            onCheckedChange={toggleDarkMode}
          />
          <Moon className="w-4 h-4 text-slate-600" />
        </div>
      </div>

      {/* Sign Out */}
      <Button
        variant="ghost"
        onClick={signOut}
        className="bg-white/40 backdrop-blur-md border-white/30 hover:bg-white/60 text-red-600"
      >
        Sign Out
      </Button>
    </div>
  );
};

export default Header;
