import type { DigSite } from '../../../types';

interface Props { digSites: DigSite[]; }

const StatsFooter = ({ digSites }: Props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-cyan-500/30 p-4 text-center">
        <p className="text-cyan-400 text-xs md:text-sm tracking-wide">ACTIVE SITES</p>
        <p className="text-3xl font-bold text-white mt-1">{digSites.filter(s => s.status === 'Active').length}</p>
      </div>
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-cyan-500/30 p-4 text-center">
        <p className="text-cyan-400 text-xs md:text-sm tracking-wide">WEATHER ALERTS</p>
        <p className="text-3xl font-bold text-white mt-1">{digSites.filter(s => s.weather.alert).length}</p>
      </div>
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-cyan-500/30 p-4 text-center">
        <p className="text-cyan-400 text-xs md:text-sm tracking-wide">3D MODELS</p>
        <p className="text-3xl font-bold text-white mt-1">{digSites.filter(s => s.has3DModel).length}</p>
      </div>
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-cyan-500/30 p-4 text-center">
        <p className="text-cyan-400 text-xs md:text-sm tracking-wide">CRITICAL SITES</p>
        <p className="text-3xl font-bold text-white mt-1">{digSites.filter(s => s.weather.severity === 'catastrophic').length}</p>
      </div>
    </div>
  );
};

export default StatsFooter;
