import { useState } from 'react';
import type { DigSite } from '../../../types';
import { getWeatherColor, getWeatherIcon, getSiteIcon } from '../utils/weatherHelpers';
import WeatherAnimation from '../utils/WeatherAnimation';
import SiteDetailPanel from './SiteDetailPanel';

interface Props {
  digSites: DigSite[];
}

const WorldMap = ({ digSites }: Props) => {
  const [selectedSite, setSelectedSite] = useState<DigSite | null>(null);
  const [mapImgFailed, setMapImgFailed] = useState(false);

  return (
    /* Map Section */
    <div className="mb-4 md:mb-6">
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border-2 border-cyan-500/30 p-3 md:p-6 shadow-2xl shadow-cyan-500/20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
          <h2 className="text-lg md:text-xl font-bold text-cyan-400 tracking-wide">WORLD MAP</h2>
          <div className="flex gap-3 md:gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-400"></div>
              <span className="text-green-400">Safe</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-400"></div>
              <span className="text-yellow-400">Warning</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500"></div>
              <span className="text-red-400">Critical</span>
            </div>
          </div>
        </div>

        {/* Map Container — increased ~15%: mobile 400→460px, desktop 600→690px */}
        <div className="map-container relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg border border-cyan-500/20 overflow-visible">
          {/* Mobile spacer */}
          <div className="map-mobile-spacer md:hidden"></div>
          {/* Desktop spacer */}
          <div className="map-desktop-spacer hidden md:block"></div>

          {/* World Map Background Image */}
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            {mapImgFailed ? (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-slate-600 text-xs tracking-wider">MAP IMAGE UNAVAILABLE</span>
              </div>
            ) : (
              <img
                src="/assets/world_map.png"
                alt="World Map"
                className="w-full h-full object-cover opacity-60"
                style={{ filter: 'brightness(0.7) contrast(1.3)' }}
                onError={() => setMapImgFailed(true)}
              />
            )}
          </div>

          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-10 overflow-hidden rounded-lg">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="cyan" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Weather Animation Layer */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
            {digSites.map((site) => (
              <div
                key={`weather-${site.id}`}
                className="absolute"
                style={{
                  left: `${site.coordinates.x}%`,
                  top: `${site.coordinates.y}%`,
                  transform: 'translate(-50%, -50%)',
                  width: '80px',
                  height: '80px'
                }}
              >
                <WeatherAnimation condition={site.weather.condition} />
              </div>
            ))}
          </div>

          {/* Dig Site Markers */}
          {digSites.map((site) => (
            <div
              key={site.id}
              className="absolute"
              style={{
                left: `${site.coordinates.x}%`,
                top: `${site.coordinates.y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: selectedSite?.id === site.id ? 100 : 10
              }}
            >
              <button
                onClick={() => setSelectedSite(selectedSite?.id === site.id ? null : site)}
                aria-label={`${site.name} — ${site.weather.condition}, ${site.weather.severity}`}
                className="relative group z-10"
              >
                <div className="relative">
                  <div className={`absolute inset-0 rounded-full ${getWeatherColor(site.weather.severity)} animate-ping opacity-75`}></div>
                  <div className={`relative w-10 h-10 rounded-full ${getWeatherColor(site.weather.severity)} border-2 border-white shadow-lg flex items-center justify-center transition-all duration-300 ${selectedSite?.id === site.id ? 'scale-125' : 'group-hover:scale-110'}`}>
                    {getSiteIcon(site.type, site.status)}
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-slate-900 border border-cyan-400 flex items-center justify-center">
                    {getWeatherIcon(site.weather.condition)}
                  </div>
                </div>
              </button>

              {selectedSite?.id === site.id && (
                <SiteDetailPanel
                  key={selectedSite.id}
                  site={site}
                  onClose={() => setSelectedSite(null)}
                />
              )}
            </div>
          ))}

          {/* Scanning lines */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
            <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30 animate-pulse" style={{ top: '30%' }}></div>
            <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30 animate-pulse" style={{ top: '60%', animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
