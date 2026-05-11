import type { DigSite } from '../../../types';
import { calculateSafetyRisk } from '../utils/safetyHelpers';

interface Props {
  site: DigSite;
}

const SafetyProfileTab = ({ site }: Props) => {
  const risk = calculateSafetyRisk(site.safetyProfile);

  return (
    <>
      <div className="mb-4 p-4 bg-slate-800/50 rounded-lg border border-cyan-500/20">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-xs tracking-wide text-cyan-400">OVERALL RISK ASSESSMENT</h4>
          <div className={`px-3 py-1 rounded-full ${risk.color}/20 border ${risk.borderColor}/50 flex items-center gap-2`}>
            <div className={`w-2 h-2 rounded-full ${risk.color} animate-pulse`}></div>
            <span className={`text-xs font-bold ${risk.textColor}`}>{risk.level}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="bg-slate-800/50 rounded p-3 border border-cyan-500/20">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs">Ground Type</span>
            <span className="text-white text-xs font-semibold">{site.safetyProfile.groundType}</span>
          </div>
        </div>
        <div className="bg-slate-800/50 rounded p-3 border border-cyan-500/20">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs">Excavation Depth</span>
            <span className="text-white text-xs font-semibold">{site.safetyProfile.excavationDepth}</span>
          </div>
        </div>
        <div className="bg-slate-800/50 rounded p-3 border border-cyan-500/20">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs">Land Slope</span>
            <span className="text-white text-xs font-semibold">{site.safetyProfile.landSlope}</span>
          </div>
        </div>
        <div className="bg-slate-800/50 rounded p-3 border border-cyan-500/20">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs">Water Risk</span>
            <span className="text-white text-xs font-semibold">{site.safetyProfile.waterRisk}</span>
          </div>
        </div>
        <div className="bg-slate-800/50 rounded p-3 border border-cyan-500/20">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs">Past Collapse History</span>
            <span className="text-white text-xs font-semibold">{site.safetyProfile.collapseHistory}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-slate-900/50 rounded border border-cyan-500/20">
        <h4 className="text-xs font-semibold text-cyan-400 mb-2">RECOMMENDATIONS</h4>
        {risk.level === 'High Risk' && (
          <p className="text-xs text-red-400">⚠️ High-risk site. Implement additional safety measures, continuous monitoring, and evacuation protocols.</p>
        )}
        {risk.level === 'Medium Risk' && (
          <p className="text-xs text-yellow-400">⚡ Moderate risk detected. Regular safety inspections and monitoring recommended.</p>
        )}
        {risk.level === 'Low Risk' && (
          <p className="text-xs text-green-400">✓ Low-risk site. Standard safety protocols apply.</p>
        )}
      </div>
    </>
  );
};

export default SafetyProfileTab;
