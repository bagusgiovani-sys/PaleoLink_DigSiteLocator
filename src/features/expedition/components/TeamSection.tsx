import { Users } from 'lucide-react';

interface Props {
  team: string;
  animatingItems: Record<string, boolean>;
}

const TeamSection = ({ team, animatingItems }: Props) => (
  <div className={`mb-3 ${animatingItems.team ? 'animate-slide-bottom' : 'item-hidden'}`}>
    <div className="flex items-center gap-2 text-cyan-400 mb-2">
      <Users className="w-4 h-4" />
      <h4 className="font-semibold text-xs tracking-wide">TEAM</h4>
    </div>
    <div className="bg-slate-800/50 rounded p-2 border border-cyan-500/20">
      <p className="text-gray-300 text-xs">{team}</p>
    </div>
  </div>
);

export default TeamSection;
