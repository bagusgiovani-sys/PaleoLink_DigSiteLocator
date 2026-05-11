import type { LucideIcon } from 'lucide-react';

export type WeatherCondition = 'sunny' | 'rainy' | 'thunderstorm' | 'flood' | 'typhoon';
export type SiteType = 'fossil' | 'archaeological';
export type WeatherSeverity = 'good' | 'warning' | 'catastrophic';
export type MainTab = 'expedition' | 'scientists' | 'marketplace' | 'pathfinder';
export type SourceType = 'University' | 'Government' | 'Supplier' | 'Depot';

export interface SafetyProfile {
  groundType: 'Clay' | 'Sand' | 'Rocky' | 'Limestone';
  excavationDepth: 'Shallow (0-1m)' | 'Medium (1-2m)' | 'Deep (2m+)';
  landSlope: 'Flat' | 'Slight slope' | 'Steep slope';
  waterRisk: 'Low drainage risk' | 'Moderate drainage risk' | 'High water accumulation';
  collapseHistory: 'No' | 'Minor collapse before' | 'Major collapse before';
}

export interface DigSite {
  id: number;
  name: string;
  location: string;
  type: SiteType;
  coordinates: { x: number; y: number };
  discoveries: string[];
  team: string;
  tools: string[];
  status: 'Active' | 'Planning';
  weather: {
    condition: WeatherCondition;
    temperature: number;
    severity: WeatherSeverity;
    alert: boolean;
    alertMessage: string;
  };
  has3DModel: boolean;
  modelPath: string;
  modelDescription?: string;
  safetyProfile: SafetyProfile;
}

export interface Scientist {
  id: number;
  name: string;
  title: string;
  photo: string;
  logistics: { current: number; max: number };
  genetics: { current: number; max: number };
  welfare: { current: number; max: number };
  trait: string;
  traitDescription: string;
  bio: string;
  salary: number;
  trainingLevel: number;
}

export interface MarketItem {
  id: number;
  name: string;
  category: string;
  image: string;
  amount: number;
  appeal: number;
  price: number;
  priceStatus: string;
  seller: string;
  rating: number;
}

export interface Resource {
  name: string;
  source: string;
  sourceType: SourceType;
  distance: string;
  eta: string;
  available: boolean;
  icon: LucideIcon;
}
