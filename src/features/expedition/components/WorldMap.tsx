import { useState } from 'react';
import type { DigSite } from '../../../types';
import WeatherAnimation from '../utils/WeatherAnimation';
import SiteMarker from './SiteMarker';

interface Props {
  digSites: DigSite[];
}

const WorldMap = ({ digSites }: Props) => {
  const [selectedSite, setSelectedSite] = useState<DigSite | null>(null);
  const [mapImgFailed, setMapImgFailed] = useState(false);

  return (
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

        <div className="map-container relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg border border-cyan-500/20 overflow-visible">
          <div className="map-mobile-spacer md:hidden"></div>
          <div className="map-desktop-spacer hidden md:block"></div>

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

          {digSites.map((site) => (
            <SiteMarker
              key={site.id}
              site={site}
              isSelected={selectedSite?.id === site.id}
              onToggle={() => setSelectedSite(selectedSite?.id === site.id ? null : site)}
            />
          ))}

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
