export type Region = 'FR' | 'JP' | 'US';
export type Language = 'en' | 'fr' | 'jp';
export type Sport = 'football' | 'rugby' | 'tennis' | 'baseball' | 'athletics';
export type ProfileType = 'standard' | 'vip' | 'pmr';
export type CrowdLevel = 'low' | 'medium' | 'high';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface POI {
  id: string;
  stadiumId: string;
  name: string;
  type: 'food' | 'toilet' | 'gate' | 'merch' | 'parking' | 'aid';
  coords: Coordinates;
  waitTime: number;
  recommended?: boolean;
  crowdLevel: CrowdLevel;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: 'food' | 'drink' | 'merch';
  image: string;
  description?: string;
  tags?: ('vip' | 'delivery' | 'pickup')[];
  stadiumId: string;
}

export interface CartItem extends MenuItem {
  qty: number;
}

export interface SunPathPoint {
  time: string;
  angle: number;
  intensity: number;
  recommendation: 'casquette' | 'pull' | 'normal';
}

export interface Stadium {
  id: string;
  name: string;
  region: Region;
  coords: Coordinates;
  capacity: number;
  currentAttendance: number;
  sports: Sport[];
  weather: {
    temp: number;
    condition: string;
    uv: number;
  };
  sunPath: SunPathPoint[];
  mapImage: string;
  pois: POI[];
}

export interface MatchStats {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  time: string;
  possession: [number, number];
  momentum: { minute: number; value: number }[];
}

export interface UserSettings {
  language: Language;
  region: Region;
  darkMode: boolean;
  favSport: Sport;
  profileType: ProfileType;
  avatar: string;
  userName: string;
}

export interface Route {
  from: Coordinates;
  to: Coordinates;
  duration: number;
  distance: number;
  crowdDensity: number;
  arrivalTime: string;
  path: Coordinates[];
}

export interface CrowdHeatmap {
  zones: {
    coords: Coordinates;
    density: number;
    flow: 'in' | 'out' | 'static';
  }[];
}

export interface Translation {
  [key: string]: {
    en: string;
    fr: string;
    jp: string;
  };
}