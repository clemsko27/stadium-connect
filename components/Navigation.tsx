import React from 'react';
import { Home, Map, Activity, ShoppingBag } from 'lucide-react';
import { useStore } from '../store';

export const Navigation: React.FC = () => {
  const { activeTab, setActiveTab, cart } = useStore();
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  const NavItem = ({ tab, icon: Icon, label }: { tab: typeof activeTab, icon: any, label: string }) => (
    <button 
      onClick={() => {
        setActiveTab(tab);
        if ('vibrate' in navigator) navigator.vibrate(10);
      }}
      className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-200 ${
        activeTab === tab ? 'text-accent scale-105' : 'text-gray-500 hover:text-gray-300'
      }`}
    >
      <Icon size={22} strokeWidth={activeTab === tab ? 2.5 : 2} />
      <span className="text-[10px] font-medium">{label}</span>
      {activeTab === tab && (
        <div className="w-1 h-1 bg-accent rounded-full"></div>
      )}
    </button>
  );

  return (
    <div className="h-20 bg-surface/95 backdrop-blur-lg border-t border-white/5 fixed bottom-0 left-0 right-0 z-50 pb-4 px-2 shadow-[0_-5px_20px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-around h-full max-w-lg mx-auto">
        <NavItem tab="live" icon={Home} label="Live" />
        <NavItem tab="map" icon={Map} label="Map" />
        <NavItem tab="stats" icon={Activity} label="Stats" />
        
        <button 
          onClick={() => {
            setActiveTab('services');
            if ('vibrate' in navigator) navigator.vibrate(10);
          }}
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-200 ${
            activeTab === 'services' ? 'text-accent scale-105' : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          <div className="relative">
            <ShoppingBag size={22} strokeWidth={activeTab === 'services' ? 2.5 : 2} />
            {cartCount > 0 && (
              <div className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-accent text-primary text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-lg animate-pulse">
                {cartCount}
              </div>
            )}
          </div>
          <span className="text-[10px] font-medium">Services</span>
          {activeTab === 'services' && (
            <div className="w-1 h-1 bg-accent rounded-full"></div>
          )}
        </button>
      </div>
    </div>
  );
};