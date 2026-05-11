import ScientistCard from './ScientistCard';
import { scientists } from '../constants';

const ScientistsTab = () => (
  <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg border-2 border-cyan-500/30 p-4 md:p-6 shadow-2xl shadow-cyan-500/20">
    <h2 className="text-xl md:text-2xl font-bold text-cyan-400 mb-4 md:mb-6 tracking-wide">RECRUITMENT</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {scientists.map(s => <ScientistCard key={s.id} scientist={s} />)}
    </div>
  </div>
);

export default ScientistsTab;
