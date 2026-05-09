import { Sun, CloudRain, CloudLightning, Cloud, Wind, Wrench, Gem, Box } from 'lucide-react';
import type { WeatherCondition, SiteType, WeatherSeverity } from '../../../types';

export const getWeatherColor = (severity: WeatherSeverity) => {
  switch (severity) {
    case 'good': return 'bg-green-400';
    case 'warning': return 'bg-yellow-400';
    case 'catastrophic': return 'bg-red-500';
  }
};

export const getWeatherIcon = (condition: WeatherCondition) => {
  switch (condition) {
    case 'sunny': return <Sun className="w-4 h-4" />;
    case 'rainy': return <CloudRain className="w-4 h-4" />;
    case 'thunderstorm': return <CloudLightning className="w-4 h-4" />;
    case 'flood': return <Cloud className="w-4 h-4" />;
    case 'typhoon': return <Wind className="w-4 h-4" />;
  }
};

export const getSiteIcon = (type: SiteType, status: 'Active' | 'Planning') => {
  if (status === 'Planning') {
    return <Wrench className="w-5 h-5 text-slate-900" />;
  }
  return type === 'fossil' ? <Gem className="w-5 h-5 text-slate-900" /> : <Box className="w-5 h-5 text-slate-900" />;
};
