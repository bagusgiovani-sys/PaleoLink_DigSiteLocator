import { AlertTriangle, Navigation } from 'lucide-react';
import type { DigSite } from '../../../types';
import { resourceMap } from '../constants';
import ResourceItem from './ResourceItem';

interface Props {
  site: DigSite;
}

const SiteResourceCard = ({ site }: Props) => {
  const resources = resourceMap[site.weather.condition]?.tools ?? [];

  return (
    <div className={`rounded-lg border overflow-hidden ${site.weather.severity === 'catastrophic'
        ? 'border-red-500/40 bg-red-500/5'
        : 'border-yellow-500/40 bg-yellow-500/5'
      }`}>
      <div className={`px-4 py-3 flex items-center justify-between ${site.weather.severity === 'catastrophic' ? 'bg-red-500/15' : 'bg-yellow-500/15'
        }`}>
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full animate-pulse ${site.weather.severity === 'catastrophic' ? 'bg-red-400' : 'bg-yellow-400'
            }`}></div>
          <div>
            <p className="text-white font-bold text-sm">{site.name}</p>
            <p className="text-gray-400 text-xs">{site.location} • {site.weather.condition.toUpperCase()} • {site.weather.temperature}°F</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded text-xs font-bold ${site.weather.severity === 'catastrophic'
            ? 'bg-red-500/30 text-red-400'
            : 'bg-yellow-500/30 text-yellow-400'
          }`}>
          {site.weather.severity.toUpperCase()}
        </div>
      </div>

      <div className="px-4 py-2 border-b border-slate-700/50">
        <p className="text-gray-300 text-xs flex items-center gap-2">
          <AlertTriangle className={`w-3 h-3 flex-shrink-0 ${site.weather.severity === 'catastrophic' ? 'text-red-400' : 'text-yellow-400'}`} />
          {site.weather.alertMessage}
        </p>
      </div>

      <div className="p-4">
        <p className="text-cyan-400 text-xs font-semibold tracking-wide mb-3 flex items-center gap-2">
          <Navigation className="w-3 h-3" />
          NEAREST AVAILABLE RESOURCES
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {resources.map((resource, idx) => (
            <ResourceItem key={idx} resource={resource} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SiteResourceCard;
