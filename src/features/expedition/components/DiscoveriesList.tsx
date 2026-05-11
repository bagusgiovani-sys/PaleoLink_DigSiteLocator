import { Gem } from 'lucide-react';

interface Props {
  discoveries: string[];
  animatingItems: Record<string, boolean>;
}

const DiscoveriesList = ({ discoveries, animatingItems }: Props) => (
  <div className={`mb-3 ${animatingItems.discoveries ? 'animate-slide-bottom' : 'item-hidden'}`}>
    <div className="flex items-center gap-2 text-cyan-400 mb-2">
      <Gem className="w-4 h-4" />
      <h4 className="font-semibold text-xs tracking-wide">DISCOVERIES</h4>
    </div>
    <div className="bg-slate-800/50 rounded p-2 border border-cyan-500/20">
      {discoveries.map((discovery, idx) => (
        <div
          key={idx}
          className={`flex items-center gap-2 py-1 ${animatingItems.discoveries ? 'animate-slide-left' : 'item-hidden'}`}
          style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
        >
          <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse"></div>
          <span className="text-gray-300 text-xs">{discovery}</span>
        </div>
      ))}
    </div>
  </div>
);

export default DiscoveriesList;
