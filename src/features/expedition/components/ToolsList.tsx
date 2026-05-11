import { Wrench } from 'lucide-react';

interface Props {
  tools: string[];
  animatingItems: Record<string, boolean>;
}

const ToolsList = ({ tools, animatingItems }: Props) => (
  <div className={`${animatingItems.tools ? 'animate-slide-bottom' : 'item-hidden'}`}>
    <div className="flex items-center gap-2 text-cyan-400 mb-2">
      <Wrench className="w-4 h-4" />
      <h4 className="font-semibold text-xs tracking-wide">TOOLS</h4>
    </div>
    <div className="bg-slate-800/50 rounded p-2 border border-cyan-500/20">
      {tools.map((tool, idx) => (
        <div
          key={idx}
          className={`flex items-center gap-2 py-1 ${animatingItems.tools ? 'animate-slide-left' : 'item-hidden'}`}
          style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
        >
          <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: `${idx * 0.2}s` }}></div>
          <span className="text-gray-300 text-xs">{tool}</span>
        </div>
      ))}
    </div>
  </div>
);

export default ToolsList;
