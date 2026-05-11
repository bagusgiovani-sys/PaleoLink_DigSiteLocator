import { X } from 'lucide-react';
import type { DigSite } from '../../../types';

interface Props {
  site: DigSite;
  animatingItems: Record<string, boolean>;
  onClose: (e: React.MouseEvent) => void;
}

const SitePanelHeader = ({ site, animatingItems, onClose }: Props) => (
  <div className="flex items-start justify-between mb-3 border-b border-cyan-500/30 pb-3">
    <div className="flex-1">
      <h3 className={`text-lg font-bold text-white mb-1 ${animatingItems.header ? 'animate-slide-left' : 'item-hidden'}`}>
        {site.name}
      </h3>
      <p className={`text-cyan-300 text-xs ${animatingItems.header ? 'animate-slide-left' : 'item-hidden'}`} style={{ animationDelay: '0.1s' }}>
        {site.location} • {site.type === 'fossil' ? 'Fossil Site' : 'Archaeological Site'}
      </p>
      <div className={`mt-2 flex gap-2 ${animatingItems.status ? 'animate-scale-in' : 'item-hidden'}`}>
        <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${site.status === 'Active'
          ? 'bg-green-500/20 text-green-400 border border-green-500/50'
          : 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
          }`}>
          {site.status}
        </span>
        <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${site.weather.severity === 'good' ? 'bg-green-500/20 text-green-400 border border-green-500/50' :
          site.weather.severity === 'warning' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' :
            'bg-red-500/20 text-red-400 border border-red-500/50'
          }`}>
          {site.weather.temperature}°F • {site.weather.condition}
        </span>
      </div>
    </div>
    <button
      onClick={onClose}
      aria-label="Close"
      className="text-cyan-400 hover:text-cyan-300 transition-colors animate-scale-in"
    >
      <X className="w-5 h-5" />
    </button>
  </div>
);

export default SitePanelHeader;
