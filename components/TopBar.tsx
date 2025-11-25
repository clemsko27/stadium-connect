import React, { useState } from 'react';
import { Settings, Bell, X } from 'lucide-react';
import { useStore } from '../store';
import { StadiumConnectIcon } from './Logo';

export const TopBar: React.FC = () => {
  const { toggleSettings, settings, currentStadium } = useStore();
  const [showNotifications, setShowNotifications] = useState(false);

  // Notifications réalistes avec timing cohérent
  const notifications = [
    { id: 1, text: "⚽ But de Mbappé à la 67' !", time: "Il y a 2 min", important: true },
    { id: 2, text: "🟨 Carton jaune pour Upamecano", time: "Il y a 8 min", important: false },
    { id: 3, text: "🔔 Votre commande #2847 est prête", time: "Il y a 12 min", important: true },
    { id: 4, text: "📍 Gate A - Affluence faible", time: "Il y a 15 min", important: false },
  ];

  return (
    <>
      <div className="h-16 bg-surface/90 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-3">
          {/* Logo Premium */}
          <div className="flex items-center justify-center">
            <StadiumConnectIcon size={32} />
          </div>
          
          <div>
            <h1 className="text-white font-bold text-base tracking-tight">Stadium Connect</h1>
            <p className="text-gray-400 text-[10px]">{currentStadium.name}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              if ('vibrate' in navigator) navigator.vibrate(10);
            }}
            className="text-gray-400 hover:text-white transition-colors relative"
          >
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>
          
          {/* Settings */}
          <button 
            onClick={() => {
              toggleSettings();
              if ('vibrate' in navigator) navigator.vibrate(10);
            }}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Settings size={20} />
          </button>
          
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-accent to-yellow-600 p-[1.5px]">
            <div className="w-full h-full rounded-full bg-surface overflow-hidden">
               <img 
                 src={settings.avatar} 
                 alt="Profile" 
                 className="w-full h-full object-cover" 
               />
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="fixed inset-0 z-[70] flex justify-end animate-[fadeIn_0.2s_ease-out]">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowNotifications(false)}
          ></div>

          <div className="relative w-80 h-full bg-surface border-l border-white/10 shadow-2xl overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Notifications</h2>
                <button 
                  onClick={() => setShowNotifications(false)} 
                  className="text-gray-400 hover:text-white active:scale-90 transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-3">
                {notifications.map(notif => (
                  <div 
                    key={notif.id}
                    className={`p-4 rounded-xl border transition-all active:scale-95 cursor-pointer ${
                      notif.important 
                        ? 'bg-accent/10 border-accent/30 hover:bg-accent/20' 
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <p className="text-white text-sm font-medium leading-relaxed">{notif.text}</p>
                    <p className="text-gray-400 text-xs mt-2">{notif.time}</p>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 py-3 bg-white/5 rounded-xl text-gray-400 text-sm hover:bg-white/10 transition-colors font-medium">
                Tout marquer comme lu
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};