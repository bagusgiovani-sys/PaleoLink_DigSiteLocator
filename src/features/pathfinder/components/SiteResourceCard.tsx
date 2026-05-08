import { AlertTriangle, Navigation, MapPin, Clock, CheckCircle, Phone } from 'lucide-react';
import type { DigSite } from '../../../types';
import { resourceMap, sourceTypeIcon } from '../constants';

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
      {/* Site Header */}
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

      {/* Alert message */}
      <div className="px-4 py-2 border-b border-slate-700/50">
        <p className="text-gray-300 text-xs flex items-center gap-2">
          <AlertTriangle className={`w-3 h-3 flex-shrink-0 ${site.weather.severity === 'catastrophic' ? 'text-red-400' : 'text-yellow-400'}`} />
          {site.weather.alertMessage}
        </p>
      </div>

      {/* Resource matches */}
      <div className="p-4">
        <p className="text-cyan-400 text-xs font-semibold tracking-wide mb-3 flex items-center gap-2">
          <Navigation className="w-3 h-3" />
          NEAREST AVAILABLE RESOURCES
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {resources.map((resource, idx) => (
            <div key={idx} className={`rounded-lg p-3 border flex items-start gap-3 ${resource.available
                ? 'bg-slate-800/60 border-slate-700/60'
                : 'bg-slate-900/40 border-slate-800/40 opacity-60'
              }`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${resource.available ? 'bg-cyan-500/20' : 'bg-slate-700/50'
                }`}>
                <resource.icon className={`w-4 h-4 ${resource.available ? 'text-cyan-400' : 'text-gray-500'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-semibold truncate">{resource.name}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className={`text-xs ${resource.available ? 'text-cyan-300' : 'text-gray-500'}`}>{sourceTypeIcon(resource.sourceType)}</span>
                  <p className="text-gray-400 text-xs truncate">{resource.source}</p>
                </div>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-gray-400 text-xs flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5" />{resource.distance}
                  </span>
                  <span className="text-gray-400 text-xs flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />{resource.eta}
                  </span>
                  {resource.available
                    ? <span className="text-green-400 text-xs flex items-center gap-1"><CheckCircle className="w-2.5 h-2.5" />Available</span>
                    : <span className="text-red-400 text-xs">Unavailable</span>
                  }
                </div>
              </div>
              {resource.available && (
                <button className="flex-shrink-0 p-1.5 bg-cyan-500/20 border border-cyan-500/40 rounded text-cyan-400 hover:bg-cyan-500/30 transition-colors">
                  <Phone className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SiteResourceCard;
