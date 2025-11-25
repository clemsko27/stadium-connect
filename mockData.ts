import { Stadium, MenuItem, MatchStats, POI } from './types';

// ========== STADE DE FRANCE (Football) ==========
export const STADE_DE_FRANCE: Stadium = {
  id: 'sdf',
  name: 'Stade de France',
  region: 'FR',
  coords: { lat: 48.9244, lng: 2.3601 },
  capacity: 81338,
  currentAttendance: 72450,
  sports: ['football', 'rugby', 'athletics'],
  weather: {
    temp: 18,
    condition: 'Partiellement nuageux',
    uv: 4
  },
  sunPath: [
    { time: '12:00', angle: 270, intensity: 0.9, recommendation: 'casquette' },
    { time: '14:00', angle: 240, intensity: 0.95, recommendation: 'casquette' },
    { time: '15:00', angle: 225, intensity: 1.0, recommendation: 'casquette' },
    { time: '17:00', angle: 210, intensity: 0.8, recommendation: 'normal' },
    { time: '19:00', angle: 195, intensity: 0.5, recommendation: 'pull' },
    { time: '21:00', angle: 180, intensity: 0.1, recommendation: 'pull' }
  ],
  mapImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=800&fit=crop',
  pois: [
    {
      id: 'sdf-gate-a',
      stadiumId: 'sdf',
      name: 'Porte A',
      type: 'gate',
      coords: { lat: 48.9254, lng: 2.3611 },
      waitTime: 180,
      recommended: true,
      crowdLevel: 'low'
    },
    {
      id: 'sdf-gate-b',
      stadiumId: 'sdf',
      name: 'Porte B',
      type: 'gate',
      coords: { lat: 48.9234, lng: 2.3591 },
      waitTime: 420,
      recommended: false,
      crowdLevel: 'high'
    },
    {
      id: 'sdf-food-1',
      stadiumId: 'sdf',
      name: 'Buvette Nord',
      type: 'food',
      coords: { lat: 48.9249, lng: 2.3606 },
      waitTime: 240,
      recommended: true,
      crowdLevel: 'medium'
    },
    {
      id: 'sdf-food-2',
      stadiumId: 'sdf',
      name: 'Buvette Sud',
      type: 'food',
      coords: { lat: 48.9239, lng: 2.3596 },
      waitTime: 480,
      recommended: false,
      crowdLevel: 'high'
    },
    {
      id: 'sdf-toilet-1',
      stadiumId: 'sdf',
      name: 'Toilettes Est',
      type: 'toilet',
      coords: { lat: 48.9244, lng: 2.3615 },
      waitTime: 120,
      recommended: true,
      crowdLevel: 'low'
    },
    {
      id: 'sdf-toilet-2',
      stadiumId: 'sdf',
      name: 'Toilettes Ouest',
      type: 'toilet',
      coords: { lat: 48.9244, lng: 2.3587 },
      waitTime: 300,
      recommended: false,
      crowdLevel: 'medium'
    },
    {
      id: 'sdf-merch-1',
      stadiumId: 'sdf',
      name: 'Boutique Officielle',
      type: 'merch',
      coords: { lat: 48.9247, lng: 2.3601 },
      waitTime: 360,
      recommended: false,
      crowdLevel: 'high'
    },
    {
      id: 'sdf-parking-1',
      stadiumId: 'sdf',
      name: 'Parking P1',
      type: 'parking',
      coords: { lat: 48.9260, lng: 2.3620 },
      waitTime: 0,
      recommended: true,
      crowdLevel: 'low'
    }
  ]
};

// ========== ROLAND-GARROS (Tennis) ==========
export const ROLAND_GARROS: Stadium = {
  id: 'rg',
  name: 'Roland-Garros',
  region: 'FR',
  coords: { lat: 48.8467, lng: 2.2517 },
  capacity: 15225,
  currentAttendance: 14800,
  sports: ['tennis'],
  weather: {
    temp: 25,
    condition: 'Ensoleillé',
    uv: 8
  },
  sunPath: [
    { time: '11:00', angle: 280, intensity: 0.8, recommendation: 'casquette' },
    { time: '13:00', angle: 250, intensity: 0.95, recommendation: 'casquette' },
    { time: '14:00', angle: 235, intensity: 1.0, recommendation: 'casquette' },
    { time: '16:00', angle: 215, intensity: 0.85, recommendation: 'casquette' },
    { time: '18:00', angle: 200, intensity: 0.6, recommendation: 'normal' },
    { time: '20:00', angle: 185, intensity: 0.2, recommendation: 'normal' }
  ],
  mapImage: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=1200&h=800&fit=crop',
  pois: [
    {
      id: 'rg-gate-suzanne',
      stadiumId: 'rg',
      name: 'Entrée Suzanne-Lenglen',
      type: 'gate',
      coords: { lat: 48.8477, lng: 2.2527 },
      waitTime: 90,
      recommended: true,
      crowdLevel: 'low'
    },
    {
      id: 'rg-gate-chatrier',
      stadiumId: 'rg',
      name: 'Entrée Philippe-Chatrier',
      type: 'gate',
      coords: { lat: 48.8457, lng: 2.2507 },
      waitTime: 240,
      recommended: false,
      crowdLevel: 'high'
    },
    {
      id: 'rg-food-1',
      stadiumId: 'rg',
      name: 'Restaurant Court Central',
      type: 'food',
      coords: { lat: 48.8467, lng: 2.2522 },
      waitTime: 180,
      recommended: true,
      crowdLevel: 'medium'
    },
    {
      id: 'rg-food-2',
      stadiumId: 'rg',
      name: 'Buvette Village',
      type: 'food',
      coords: { lat: 48.8472, lng: 2.2512 },
      waitTime: 120,
      recommended: true,
      crowdLevel: 'low'
    },
    {
      id: 'rg-toilet-1',
      stadiumId: 'rg',
      name: 'Sanitaires Court 1',
      type: 'toilet',
      coords: { lat: 48.8467, lng: 2.2530 },
      waitTime: 60,
      recommended: true,
      crowdLevel: 'low'
    },
    {
      id: 'rg-merch-1',
      stadiumId: 'rg',
      name: 'Boutique Roland-Garros',
      type: 'merch',
      coords: { lat: 48.8470, lng: 2.2517 },
      waitTime: 300,
      recommended: false,
      crowdLevel: 'high'
    }
  ]
};

// ========== US STADIUM (Baseball/Football US) ==========
export const US_STADIUM: Stadium = {
  id: 'us1',
  name: 'MetLife Stadium',
  region: 'US',
  coords: { lat: 40.8128, lng: -74.0742 },
  capacity: 82500,
  currentAttendance: 78300,
  sports: ['football', 'baseball'],
  weather: {
    temp: 72, // Fahrenheit
    condition: 'Sunny',
    uv: 6
  },
  sunPath: [
    { time: '13:00', angle: 260, intensity: 0.85, recommendation: 'casquette' },
    { time: '15:00', angle: 230, intensity: 0.95, recommendation: 'casquette' },
    { time: '16:00', angle: 220, intensity: 1.0, recommendation: 'casquette' },
    { time: '18:00', angle: 205, intensity: 0.75, recommendation: 'normal' },
    { time: '20:00', angle: 190, intensity: 0.4, recommendation: 'normal' },
    { time: '22:00', angle: 180, intensity: 0.0, recommendation: 'pull' }
  ],
  mapImage: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=1200&h=800&fit=crop',
  pois: [
    {
      id: 'us1-gate-a',
      stadiumId: 'us1',
      name: 'Gate A',
      type: 'gate',
      coords: { lat: 40.8138, lng: -74.0752 },
      waitTime: 150,
      recommended: true,
      crowdLevel: 'low'
    },
    {
      id: 'us1-gate-d',
      stadiumId: 'us1',
      name: 'Gate D',
      type: 'gate',
      coords: { lat: 40.8118, lng: -74.0732 },
      waitTime: 390,
      recommended: false,
      crowdLevel: 'high'
    },
    {
      id: 'us1-food-1',
      stadiumId: 'us1',
      name: 'Grill Station',
      type: 'food',
      coords: { lat: 48.8128, lng: -74.0747 },
      waitTime: 210,
      recommended: true,
      crowdLevel: 'medium'
    },
    {
      id: 'us1-toilet-1',
      stadiumId: 'us1',
      name: 'Restroom North',
      type: 'toilet',
      coords: { lat: 40.8133, lng: -74.0742 },
      waitTime: 90,
      recommended: true,
      crowdLevel: 'low'
    },
    {
      id: 'us1-merch-1',
      stadiumId: 'us1',
      name: 'Team Store',
      type: 'merch',
      coords: { lat: 40.8128, lng: -74.0737 },
      waitTime: 420,
      recommended: false,
      crowdLevel: 'high'
    }
  ]
};

// ========== TOUS LES STADES ==========
export const ALL_STADIUMS = [STADE_DE_FRANCE, ROLAND_GARROS, US_STADIUM];

// ========== MENU ITEMS PAR STADE ==========

// Menu Stade de France
const MENU_SDF: MenuItem[] = [
  {
    id: 'sdf-burger',
    name: 'Signature Burger',
    price: 9.50,
    category: 'food',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop',
    description: 'Burger premium avec frites maison',
    tags: ['pickup', 'delivery'],
    stadiumId: 'sdf'
  },
  {
    id: 'sdf-hotdog',
    name: 'Hot-Dog Classique',
    price: 6.00,
    category: 'food',
    image: 'https://images.unsplash.com/photo-1612392061787-2d078b3e573f?w=400&h=400&fit=crop',
    description: 'Hot-dog avec sauce américaine',
    tags: ['pickup'],
    stadiumId: 'sdf'
  },
  {
    id: 'sdf-beer',
    name: 'Bière Pression 50cl',
    price: 7.50,
    category: 'drink',
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=400&fit=crop',
    description: 'Bière blonde locale',
    tags: ['pickup'],
    stadiumId: 'sdf'
  },
  {
    id: 'sdf-soda',
    name: 'Coca-Cola 33cl',
    price: 4.50,
    category: 'drink',
    image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=400&fit=crop',
    tags: ['pickup', 'delivery'],
    stadiumId: 'sdf'
  },
  {
    id: 'sdf-jersey',
    name: 'Maillot Équipe de France 2025',
    price: 89.99,
    category: 'merch',
    image: 'https://images.unsplash.com/photo-1522778034537-20a2486be803?w=400&h=400&fit=crop',
    description: 'Maillot officiel domicile',
    tags: ['vip', 'pickup'],
    stadiumId: 'sdf'
  },
  {
    id: 'sdf-scarf',
    name: 'Écharpe France',
    price: 19.99,
    category: 'merch',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop',
    tags: ['pickup'],
    stadiumId: 'sdf'
  }
];

// Menu Roland-Garros
const MENU_RG: MenuItem[] = [
  {
    id: 'rg-salad',
    name: 'Salade César Premium',
    price: 12.50,
    category: 'food',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop',
    description: 'Salade fraîche avec poulet grillé',
    tags: ['vip', 'pickup', 'delivery'],
    stadiumId: 'rg'
  },
  {
    id: 'rg-sandwich',
    name: 'Sandwich Club',
    price: 8.90,
    category: 'food',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=400&fit=crop',
    description: 'Club sandwich au poulet',
    tags: ['pickup'],
    stadiumId: 'rg'
  },
  {
    id: 'rg-champagne',
    name: 'Coupe de Champagne',
    price: 15.00,
    category: 'drink',
    image: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400&h=400&fit=crop',
    description: 'Champagne français',
    tags: ['vip', 'pickup'],
    stadiumId: 'rg'
  },
  {
    id: 'rg-water',
    name: 'Eau Minérale 50cl',
    price: 3.50,
    category: 'drink',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop',
    tags: ['pickup', 'delivery'],
    stadiumId: 'rg'
  },
  {
    id: 'rg-cap',
    name: 'Casquette Roland-Garros',
    price: 29.99,
    category: 'merch',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop',
    description: 'Casquette officielle 2025',
    tags: ['pickup'],
    stadiumId: 'rg'
  },
  {
    id: 'rg-towel',
    name: 'Serviette RG',
    price: 24.99,
    category: 'merch',
    image: 'https://images.unsplash.com/photo-1586511925558-a4c6376fe65f?w=400&h=400&fit=crop',
    tags: ['pickup'],
    stadiumId: 'rg'
  }
];

// Menu US Stadium
const MENU_US: MenuItem[] = [
  {
    id: 'us1-nachos',
    name: 'Loaded Nachos',
    price: 11.99,
    category: 'food',
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&h=400&fit=crop',
    description: 'Nachos with cheese, beef & jalapeños',
    tags: ['pickup'],
    stadiumId: 'us1'
  },
  {
    id: 'us1-wings',
    name: 'Buffalo Wings 12pc',
    price: 14.99,
    category: 'food',
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&h=400&fit=crop',
    description: 'Spicy buffalo chicken wings',
    tags: ['pickup', 'delivery'],
    stadiumId: 'us1'
  },
  {
    id: 'us1-beer-us',
    name: 'Draft Beer 16oz',
    price: 10.00,
    category: 'drink',
    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400&h=400&fit=crop',
    description: 'Local craft beer',
    tags: ['pickup'],
    stadiumId: 'us1'
  },
  {
    id: 'us1-soda-us',
    name: 'Soda 20oz',
    price: 5.50,
    category: 'drink',
    image: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=400&h=400&fit=crop',
    tags: ['pickup', 'delivery'],
    stadiumId: 'us1'
  },
  {
    id: 'us1-jersey-us',
    name: 'Team Jersey',
    price: 119.99,
    category: 'merch',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=400&fit=crop',
    description: 'Official home jersey',
    tags: ['vip', 'pickup'],
    stadiumId: 'us1'
  },
  {
    id: 'us1-cap-us',
    name: 'Team Cap',
    price: 34.99,
    category: 'merch',
    image: 'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=400&h=400&fit=crop',
    tags: ['pickup'],
    stadiumId: 'us1'
  }
];

// Fonction pour récupérer le menu d'un stade
export const getMenuForStadium = (stadiumId: string): MenuItem[] => {
  switch (stadiumId) {
    case 'sdf':
      return MENU_SDF;
    case 'rg':
      return MENU_RG;
    case 'us1':
      return MENU_US;
    default:
      return MENU_SDF;
  }
};

// Tous les menus
export const MENU_ITEMS = [...MENU_SDF, ...MENU_RG, ...MENU_US];

// ========== STATS DE MATCH ==========
export const MOCK_STATS: MatchStats = {
  homeTeam: 'France',
  awayTeam: 'Japon',
  homeScore: 3,
  awayScore: 1,
  time: '78:32',
  possession: [62, 38],
  momentum: [
    { minute: 0, value: 50 },
    { minute: 10, value: 52 },
    { minute: 23, value: 55 },
    { minute: 30, value: 53 },
    { minute: 35, value: 48 },
    { minute: 45, value: 50 },
    { minute: 50, value: 45 },
    { minute: 52, value: 42 },
    { minute: 60, value: 48 },
    { minute: 67, value: 62 },
    { minute: 75, value: 60 },
    { minute: 78, value: 58 },
    { minute: 85, value: 55 },
    { minute: 90, value: 52 }
  ]
};

// Export par défaut du stade actuel
export const MOCK_STADIUM = STADE_DE_FRANCE;