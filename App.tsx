import React, { useEffect } from 'react';
import { useStore } from './store';
import { TopBar } from './components/TopBar';
import { Navigation } from './components/Navigation';
import { SettingsDrawer } from './components/SettingsDrawer';
import { ChatBot } from './components/ChatBot';

import { HomePage } from './pages/Home';
import { MapPage } from './pages/MapPage';
import { StatsPage } from './pages/Stats';
import { ServicesPage } from './pages/Services';
import { CheckoutPage } from './pages/Checkout';

const App: React.FC = () => {
  const { activeTab, settings } = useStore();

  // Appliquer le thème dark/light automatiquement
  useEffect(() => {
    const root = document.documentElement;
    
    if (settings.darkMode) {
      // Mode sombre
      root.style.setProperty('--bg-color', '#0f172a');
      root.style.setProperty('--surface-color', '#1e293b');
      root.style.setProperty('--text-color', '#ffffff');
      root.style.setProperty('--text-secondary', '#94a3b8');
      root.classList.add('dark');
      root.classList.remove('light');
      document.body.style.backgroundColor = '#0f172a';
      document.body.style.color = '#ffffff';
    } else {
      // Mode clair
      root.style.setProperty('--bg-color', '#f8fafc');
      root.style.setProperty('--surface-color', '#ffffff');
      root.style.setProperty('--text-color', '#0f172a');
      root.style.setProperty('--text-secondary', '#64748b');
      root.classList.add('light');
      root.classList.remove('dark');
      document.body.style.backgroundColor = '#f8fafc';
      document.body.style.color = '#0f172a';
    }
  }, [settings.darkMode]);

  const renderContent = () => {
    switch (activeTab) {
      case 'live':
        return <HomePage />;
      case 'map':
        return <MapPage />;
      case 'stats':
        return <StatsPage />;
      case 'services':
        return <ServicesPage />;
      case 'checkout':
        return <CheckoutPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div 
      className="min-h-screen font-sans selection:bg-accent selection:text-primary overflow-hidden relative transition-colors duration-300"
      style={{
        backgroundColor: settings.darkMode ? '#0f172a' : '#f8fafc',
        color: settings.darkMode ? '#ffffff' : '#0f172a'
      }}
    >
      <TopBar />
      
      <main className="h-[calc(100vh-64px)] overflow-y-auto no-scrollbar pb-20 scroll-smooth">
        {renderContent()}
      </main>

      <SettingsDrawer />
      <ChatBot />
      
      {activeTab !== 'checkout' && <Navigation />}
    </div>
  );
};

export default App;