import { Navigation } from 'lucide-react';
import SiteResourceCard from './SiteResourceCard';
import { digSites } from '../../../constants/digSites';
import { resourceMap } from '../constants';

const resourcesMatched = digSites
  .filter(s => s.weather.alert)
  .flatMap(s => resourceMap[s.weather.condition]?.tools ?? [])
  .filter(r => r.available).length;

const PathfinderTab = () => (
  <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg border-2 border-cyan-500/30 p-4 md:p-6 shadow-2xl shadow-cyan-500/20">
    <div className="flex items-center gap-3 mb-2">
      <Navigation className="w-6 h-6 text-cyan-400" />
      <h2 className="text-xl md:text-2xl font-bold text-cyan-400 tracking-wide">PATHFINDER</h2>
    </div>
    <p className="text-gray-400 text-xs md:text-sm mb-6">Real-time emergency resource matching — critical sites are automatically paired with the nearest available tools and institutions.</p>

    <div className="grid grid-cols-3 gap-3 mb-6">
      <div className="bg-red-500/10 border border-red-500/40 rounded-lg p-3 text-center">
        <p className="text-red-400 text-2xl font-bold">{digSites.filter(s => s.weather.severity === 'catastrophic').length}</p>
        <p className="text-red-400 text-xs tracking-wide mt-1">CRITICAL SITES</p>
      </div>
      <div className="bg-yellow-500/10 border border-yellow-500/40 rounded-lg p-3 text-center">
        <p className="text-yellow-400 text-2xl font-bold">{digSites.filter(s => s.weather.severity === 'warning').length}</p>
        <p className="text-yellow-400 text-xs tracking-wide mt-1">WARNING SITES</p>
      </div>
      <div className="bg-cyan-500/10 border border-cyan-500/40 rounded-lg p-3 text-center">
        <p className="text-cyan-400 text-2xl font-bold">{resourcesMatched}</p>
        <p className="text-cyan-400 text-xs tracking-wide mt-1">RESOURCES MATCHED</p>
      </div>
    </div>

    <div className="space-y-4">
      {digSites.filter(s => s.weather.alert).map(s => <SiteResourceCard key={s.id} site={s} />)}
    </div>
  </div>
);

export default PathfinderTab;
