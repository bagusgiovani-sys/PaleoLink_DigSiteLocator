import { User } from 'lucide-react';
import type { Scientist } from '../../../types';
import ImageWithFallback from '../../../components/shared/ImageWithFallback';

interface Props { scientist: Scientist; }

const ScientistCard = ({ scientist }: Props) => {
  return (
    <div className="bg-slate-900/60 rounded-lg border border-cyan-500/20 overflow-hidden hover:border-cyan-500/50 transition-all">
      <div className="p-4">
        <div className="text-teal-400 text-xs font-semibold mb-1 tracking-wide">{scientist.name.split(' ')[0]}</div>
        <div className="text-teal-300 text-lg font-bold mb-3">{scientist.name.split(' ')[1]}</div>

        <ImageWithFallback src={scientist.photo} alt={scientist.name} className="bg-slate-800/50 rounded mb-3 aspect-[3/4] overflow-hidden border border-slate-700" />

        <div className="space-y-2 mb-4 text-xs">
          <div className="flex items-center justify-between text-teal-300">
            <span>{scientist.title}</span>
            <span>{scientist.logistics.current}/{scientist.logistics.max}</span>
          </div>
          <div className="flex items-center justify-between text-teal-300">
            <span>Genetics</span>
            <span>{scientist.genetics.current}/{scientist.genetics.max}</span>
          </div>
          <div className="flex items-center justify-between text-teal-300">
            <span>Welfare</span>
            <span>{scientist.welfare.current}/{scientist.welfare.max}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-white font-semibold text-xs mb-1">TRAITS</div>
          <div className="text-teal-300 text-xs mb-1">💡 {scientist.trait}</div>
          <div className="text-gray-400 text-xs">{scientist.traitDescription}</div>
        </div>

        <div className="mb-4">
          <div className="text-white font-semibold text-xs mb-1">BIO</div>
          <div className="flex items-center justify-between mb-2 text-xs">
            <span className="text-gray-400">Salary</span>
            <span className="text-white">${scientist.salary.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between mb-2 text-xs">
            <span className="text-gray-400">Training</span>
            <span className="text-white">LEVEL {scientist.trainingLevel}</span>
          </div>
          <p className="text-gray-400 text-xs line-clamp-3">{scientist.bio}</p>
        </div>

        <button className="w-full py-2 bg-teal-600/80 hover:bg-teal-600 rounded text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
          <User className="w-4 h-4" />
          RECRUIT SCIENTIST
          <span className="text-xs">${scientist.salary.toLocaleString()}</span>
        </button>
      </div>
    </div>
  );
};

export default ScientistCard;
