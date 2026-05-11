import { Map, FlaskConical, ShoppingCart, Navigation } from 'lucide-react';
import type { MainTab } from '../../types';

interface Props {
  activeTab: MainTab;
  onTabChange: (tab: MainTab) => void;
}

const MainTabBar = ({ activeTab, onTabChange }: Props) => (
  <div className="mb-4 md:mb-6">
    <div role="tablist" aria-label="Main navigation" className="bg-slate-900/50 backdrop-blur-sm rounded-lg border border-cyan-500/30 p-1 md:p-2 flex flex-col md:flex-row gap-2">
      <button
        role="tab"
        aria-selected={activeTab === 'expedition'}
        onClick={() => onTabChange('expedition')}
        className={`flex-1 px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold text-xs md:text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'expedition'
          ? 'bg-cyan-500/30 text-cyan-400 border border-cyan-500/50 shadow-lg shadow-cyan-500/20'
          : 'text-gray-400 hover:text-cyan-300 hover:bg-slate-800/50'
          }`}
      >
        <Map className="w-4 h-4 md:w-5 md:h-5" />
        EXPEDITION MAP
      </button>
      <button
        role="tab"
        aria-selected={activeTab === 'scientists'}
        onClick={() => onTabChange('scientists')}
        className={`flex-1 px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold text-xs md:text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'scientists'
          ? 'bg-cyan-500/30 text-cyan-400 border border-cyan-500/50 shadow-lg shadow-cyan-500/20'
          : 'text-gray-400 hover:text-cyan-300 hover:bg-slate-800/50'
          }`}
      >
        <FlaskConical className="w-4 h-4 md:w-5 md:h-5" />
        SCIENTISTS
      </button>
      <button
        role="tab"
        aria-selected={activeTab === 'marketplace'}
        onClick={() => onTabChange('marketplace')}
        className={`flex-1 px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold text-xs md:text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'marketplace'
          ? 'bg-cyan-500/30 text-cyan-400 border border-cyan-500/50 shadow-lg shadow-cyan-500/20'
          : 'text-gray-400 hover:text-cyan-300 hover:bg-slate-800/50'
          }`}
      >
        <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
        MARKETPLACE
      </button>
      <button
        role="tab"
        aria-selected={activeTab === 'pathfinder'}
        onClick={() => onTabChange('pathfinder')}
        className={`flex-1 px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold text-xs md:text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'pathfinder'
          ? 'bg-cyan-500/30 text-cyan-400 border border-cyan-500/50 shadow-lg shadow-cyan-500/20'
          : 'text-gray-400 hover:text-cyan-300 hover:bg-slate-800/50'
          }`}
      >
        <Navigation className="w-4 h-4 md:w-5 md:h-5" />
        PATHFINDER
      </button>
    </div>
  </div>
);

export default MainTabBar;
