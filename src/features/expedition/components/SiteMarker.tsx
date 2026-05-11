import type { DigSite } from '../../../types';
import { getWeatherColor, getWeatherIcon, getSiteIcon } from '../utils/weatherHelpers';
import SiteDetailPanel from './SiteDetailPanel';

interface Props {
  site: DigSite;
  isSelected: boolean;
  onToggle: () => void;
}

const SiteMarker = ({ site, isSelected, onToggle }: Props) => (
  <div
    className="absolute"
    style={{
      left: `${site.coordinates.x}%`,
      top: `${site.coordinates.y}%`,
      transform: 'translate(-50%, -50%)',
      zIndex: isSelected ? 100 : 10
    }}
  >
    <button
      onClick={onToggle}
      aria-label={`${site.name} — ${site.weather.condition}, ${site.weather.severity}`}
      className="relative group z-10"
    >
      <div className="relative">
        <div className={`absolute inset-0 rounded-full ${getWeatherColor(site.weather.severity)} animate-ping opacity-75`}></div>
        <div className={`relative w-10 h-10 rounded-full ${getWeatherColor(site.weather.severity)} border-2 border-white shadow-lg flex items-center justify-center transition-all duration-300 ${isSelected ? 'scale-125' : 'group-hover:scale-110'}`}>
          {getSiteIcon(site.type, site.status)}
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-slate-900 border border-cyan-400 flex items-center justify-center">
          {getWeatherIcon(site.weather.condition)}
        </div>
      </div>
    </button>

    {isSelected && (
      <SiteDetailPanel key={site.id} site={site} onClose={onToggle} />
    )}
  </div>
);

export default SiteMarker;
