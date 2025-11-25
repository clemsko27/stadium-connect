import React, { useState } from 'react';
import { X, Moon, Sun as SunIcon, Globe, MapPin, User, Edit, Check } from 'lucide-react';
import { useStore } from '../store';
import { t } from '../translations';
import { ALL_STADIUMS } from '../mockData';

export const SettingsDrawer: React.FC = () => {
  const { isSettingsOpen, toggleSettings, settings, updateSettings, setCurrentStadium, currentStadium } = useStore();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempUserName, setTempUserName] = useState(settings.userName);
  const [tempAvatar, setTempAvatar] = useState(settings.avatar);
  const [selectedCountry, setSelectedCountry] = useState<'FR' | 'JP' | 'US'>(currentStadium.region);

  if (!isSettingsOpen) return null;

  const handleDarkModeToggle = () => {
    const newMode = !settings.darkMode;
    updateSettings({ darkMode: newMode });
    if ('vibrate' in navigator) navigator.vibrate(20);
    
    document.documentElement.classList.toggle('light-mode', !newMode);
    document.body.style.transition = 'background-color 0.3s, color 0.3s';
    document.body.style.backgroundColor = newMode ? '#0f172a' : '#f1f5f9';
    document.body.style.color = newMode ? '#ffffff' : '#1e293b';
  };

  const handleLanguageChange = (language: 'en' | 'fr' | 'jp') => {
    updateSettings({ language });
    if ('vibrate' in navigator) navigator.vibrate(10);
    
    const toast = document.createElement('div');
    toast.className = 'fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-[80] animate-[fadeIn_0.3s_ease-out]';
    toast.textContent = `✓ ${language === 'fr' ? 'Français' : language === 'en' ? 'English' : '日本語'}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  const handleSaveProfile = () => {
    updateSettings({ 
      userName: tempUserName,
      avatar: tempAvatar 
    });
    setIsEditingProfile(false);
    if ('vibrate' in navigator) navigator.vibrate([10, 50, 10]);
  };

  const avatarOptions = [
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Max',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
  ];

  // Filtrer stades par pays
  const stadiumsByCountry = ALL_STADIUMS.filter(s => s.region === selectedCountry);

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={toggleSettings}
      ></div>

      {/* Drawer */}
      <div className="relative w-80 h-full bg-surface border-l border-white/10 shadow-2xl transform transition-transform duration-300 ease-out overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white">Paramètres</h2>
            <button 
              onClick={toggleSettings} 
              className="text-gray-400 hover:text-white active:scale-90 transition-transform"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-8">
            
            {/* Profile Section */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <User size={14} /> Profil
              </label>
              
              {!isEditingProfile ? (
                <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-accent to-yellow-600 p-[1px]">
                      <img src={settings.avatar} className="w-full h-full rounded-full" alt="Avatar" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{settings.userName}</p>
                      <p className="text-gray-400 text-xs">Section 102 • {settings.profileType.toUpperCase()}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsEditingProfile(true)}
                    className="w-full mt-3 py-2 bg-white/5 rounded-lg text-gray-300 text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                  >
                    <Edit size={14} />
                    Modifier le profil
                  </button>
                </div>
              ) : (
                <div className="bg-white/5 border border-accent/30 rounded-xl p-4 space-y-4">
                  <div>
                    <p className="text-gray-400 text-xs mb-2 uppercase tracking-wider">Avatar</p>
                    <div className="grid grid-cols-6 gap-2">
                      {avatarOptions.map((av, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setTempAvatar(av);
                            if ('vibrate' in navigator) navigator.vibrate(10);
                          }}
                          className={`w-10 h-10 rounded-full border-2 transition-all ${
                            tempAvatar === av ? 'border-accent scale-110' : 'border-white/20 hover:border-white/40'
                          }`}
                        >
                          <img src={av} className="w-full h-full rounded-full" alt="" />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-xs mb-2 uppercase tracking-wider">Nom</p>
                    <input
                      type="text"
                      value={tempUserName}
                      onChange={(e) => setTempUserName(e.target.value)}
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-accent/50"
                      placeholder="Votre nom"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveProfile}
                      className="flex-1 bg-accent text-primary py-2 rounded-lg text-sm font-bold hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2"
                    >
                      <Check size={14} />
                      Sauvegarder
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingProfile(false);
                        setTempUserName(settings.userName);
                        setTempAvatar(settings.avatar);
                      }}
                      className="px-4 bg-white/5 text-gray-300 py-2 rounded-lg text-sm hover:bg-white/10 transition-colors"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Dark/Light Mode */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                {settings.darkMode ? <Moon size={14} /> : <SunIcon size={14} />}
                Apparence
              </label>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                <span className="text-gray-200 text-sm">
                  {settings.darkMode ? 'Mode Sombre' : 'Mode Clair'}
                </span>
                <button
                   onClick={handleDarkModeToggle}
                   className={`w-14 h-7 rounded-full relative transition-all duration-300 ${settings.darkMode ? 'bg-accent' : 'bg-blue-500'}`}
                >
                    <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 flex items-center justify-center ${settings.darkMode ? 'left-8' : 'left-1'}`}>
                      {settings.darkMode ? <Moon size={12} className="text-accent" /> : <SunIcon size={12} className="text-blue-500" />}
                    </div>
                </button>
              </div>
            </div>

            {/* Country Selection */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <Globe size={14} /> Pays
              </label>
              <div className="space-y-2">
                {[
                  { code: 'FR', label: 'France', flag: '🇫🇷' },
                  { code: 'JP', label: 'Japon', flag: '🇯🇵' },
                  { code: 'US', label: 'États-Unis', flag: '🇺🇸' }
                ].map(country => (
                  <button
                    key={country.code}
                    onClick={() => {
                      setSelectedCountry(country.code as any);
                      if ('vibrate' in navigator) navigator.vibrate(10);
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all active:scale-95 ${
                      selectedCountry === country.code
                        ? 'bg-primary/20 border-primary text-white'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-2xl">{country.flag}</span>
                    <span className="text-sm font-medium">{country.label}</span>
                    {selectedCountry === country.code && (
                      <Check size={16} className="ml-auto text-accent" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Stadium Selection (filtered by country) */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <MapPin size={14} /> Stade
              </label>
              <div className="space-y-2">
                {stadiumsByCountry.map((stadium) => (
                  <button
                    key={stadium.id}
                    onClick={() => {
                      setCurrentStadium(stadium);
                      updateSettings({ region: stadium.region });
                      if ('vibrate' in navigator) navigator.vibrate([10, 50, 10]);
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all active:scale-95 ${
                      currentStadium.id === stadium.id
                        ? 'bg-accent/20 border-accent text-white'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-xl">
                      {stadium.sports.includes('tennis') ? '🎾' : '⚽'}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium">{stadium.name}</p>
                      <p className="text-xs opacity-70">{stadium.capacity.toLocaleString()} places</p>
                    </div>
                    {currentStadium.id === stadium.id && (
                      <Check size={16} className="text-accent" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Language */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <Globe size={14} /> Langue
              </label>
              <div className="space-y-2">
                {[
                  { code: 'en', label: 'English (US)', flag: '🇺🇸' },
                  { code: 'fr', label: 'Français', flag: '🇫🇷' },
                  { code: 'jp', label: '日本語', flag: '🇯🇵' }
                ].map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code as any)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all active:scale-95 ${
                      settings.language === lang.code
                        ? 'bg-primary/20 border-primary text-white'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="text-sm font-medium">{lang.label}</span>
                    {settings.language === lang.code && (
                      <span className="ml-auto text-accent">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="pt-8 border-t border-white/5">
                <p className="text-center text-xs text-gray-600">
                    Stadium Connect v3.0 Pro
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};