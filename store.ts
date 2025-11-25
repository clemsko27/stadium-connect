import { create } from 'zustand';
import { UserSettings, CartItem, MenuItem, Stadium, MatchStats } from './types';
import { STADE_DE_FRANCE, MOCK_STATS } from './mockData';

interface AppState {
  settings: UserSettings;
  updateSettings: (settings: Partial<UserSettings>) => void;
  
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  
  currentStadium: Stadium;
  setCurrentStadium: (stadium: Stadium) => void;
  currentStats: MatchStats;
  
  activeTab: 'live' | 'map' | 'stats' | 'services' | 'checkout';
  setActiveTab: (tab: 'live' | 'map' | 'stats' | 'services' | 'checkout') => void;

  isSettingsOpen: boolean;
  toggleSettings: () => void;
  
  selectedTimeSlot: string;
  setSelectedTimeSlot: (time: string) => void;

  navigationTargetId: string | null;
  setNavigationTarget: (id: string | null) => void;
}

export const useStore = create<AppState>((set) => ({
  settings: {
    language: 'fr',
    region: 'FR',
    darkMode: true,
    favSport: 'football',
    profileType: 'standard',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    userName: 'Spectateur Premium',
  },
  
  updateSettings: (newSettings) => {
    set((state) => {
      const updatedSettings = { ...state.settings, ...newSettings };
      return { settings: updatedSettings };
    });
  },

  cart: [],
  
  addToCart: (item) => 
    set((state) => {
      const existing = state.cart.find((i) => i.id === item.id);
      if (existing) {
        return {
          cart: state.cart.map((i) => 
            i.id === item.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return { cart: [...state.cart, { ...item, qty: 1 }] };
    }),
    
  removeFromCart: (itemId) =>
    set((state) => ({ cart: state.cart.filter((i) => i.id !== itemId) })),
    
  clearCart: () => set({ cart: [] }),

  currentStadium: STADE_DE_FRANCE,
  
  setCurrentStadium: (stadium) => set({ 
    currentStadium: stadium, 
    cart: [], // Clear cart when changing stadium
    selectedTimeSlot: stadium.sunPath[4]?.time || '15:00', // Reset to middle time
    navigationTargetId: null
  }),
  
  currentStats: MOCK_STATS,

  activeTab: 'live',
  setActiveTab: (tab) => set({ activeTab: tab }),

  isSettingsOpen: false,
  toggleSettings: () => set((state) => ({ isSettingsOpen: !state.isSettingsOpen })),
  
  selectedTimeSlot: '15:00',
  setSelectedTimeSlot: (time) => set({ selectedTimeSlot: time }),

  navigationTargetId: null,
  setNavigationTarget: (id) => set({ navigationTargetId: id }),
}));