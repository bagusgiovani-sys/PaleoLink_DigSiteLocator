import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, AlertTriangle, Camera, Satellite, Gem, Users, Wrench, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DigSite } from '../../../types';
import ImageWithFallback from '../../../components/shared/ImageWithFallback';
import { calculateSafetyRisk } from '../utils/safetyHelpers';

interface Props {
  site: DigSite;
  onClose: () => void;
}

const SiteDetailPanel = ({ site, onClose }: Props) => {
  const [animatingItems, setAnimatingItems] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'details' | 'model' | 'safety'>('details');
  const [showModel, setShowModel] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (panelRef.current) {
      panelRef.current.style.opacity = '0';
      panelRef.current.style.transform = 'translate(-50%, -50%) scale(0.8)';
      requestAnimationFrame(() => {
        if (panelRef.current) {
          panelRef.current.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
          panelRef.current.style.opacity = '1';
          panelRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
        }
      });
    }
    const timers = [
      setTimeout(() => setAnimatingItems(prev => ({ ...prev, header: true })), 100),
      setTimeout(() => setAnimatingItems(prev => ({ ...prev, status: true })), 200),
      setTimeout(() => setAnimatingItems(prev => ({ ...prev, weather: true })), 300),
      setTimeout(() => setAnimatingItems(prev => ({ ...prev, discoveries: true })), 400),
      setTimeout(() => setAnimatingItems(prev => ({ ...prev, team: true })), 600),
      setTimeout(() => setAnimatingItems(prev => ({ ...prev, tools: true })), 800),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (panelRef.current) {
      panelRef.current.style.transition = 'all 0.3s ease-out';
      panelRef.current.style.opacity = '0';
      panelRef.current.style.transform = 'translate(-50%, -50%) scale(0.8)';
      setTimeout(onClose, 300);
    }
  };

  return createPortal(
    <div
      ref={panelRef}
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90vw',
        maxWidth: '420px',
        zIndex: 999999
      }}
    >
      <div className="bg-slate-900/95 backdrop-blur-md rounded-lg border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/30 overflow-hidden glow-pulse">
        <div className="h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 animate-pulse"></div>

        <div className="p-4">
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
              onClick={handleClose}
              className="text-cyan-400 hover:text-cyan-300 transition-colors animate-scale-in"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {site.weather.alert && (
            <div className={`mb-3 ${animatingItems.weather ? 'animate-slide-bottom' : 'item-hidden'}`}>
              <div className={`rounded p-3 border ${site.weather.severity === 'catastrophic'
                ? 'bg-red-500/10 border-red-500/50'
                : 'bg-yellow-500/10 border-yellow-500/50'
                }`}>
                <div className="flex items-start gap-2">
                  <AlertTriangle className={`w-4 h-4 mt-0.5 ${site.weather.severity === 'catastrophic' ? 'text-red-400' : 'text-yellow-400'}`} />
                  <div className="flex-1">
                    <p className={`text-xs font-semibold mb-1 ${site.weather.severity === 'catastrophic' ? 'text-red-400' : 'text-yellow-400'}`}>
                      WEATHER ALERT
                    </p>
                    <p className="text-gray-300 text-xs">{site.weather.alertMessage}</p>
                    <div className="flex gap-2 mt-2">
                      <button className="flex items-center gap-1 px-2 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded text-xs text-cyan-400 hover:bg-cyan-500/30 transition-colors">
                        <Camera className="w-3 h-3" />
                        Document
                      </button>
                      <button className="flex items-center gap-1 px-2 py-1 bg-purple-500/20 border border-purple-500/50 rounded text-xs text-purple-400 hover:bg-purple-500/30 transition-colors">
                        <Satellite className="w-3 h-3" />
                        Satellite Scan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-2 mb-3 border-b border-cyan-500/30">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-3 py-2 text-xs font-semibold transition-colors ${activeTab === 'details'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-gray-400 hover:text-cyan-300'
                }`}
            >
              Site Details
            </button>
            <button
              onClick={() => setActiveTab('safety')}
              className={`px-3 py-2 text-xs font-semibold transition-colors ${activeTab === 'safety'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-gray-400 hover:text-cyan-300'
                }`}
            >
              Safety Profile
            </button>
            <button
              onClick={() => setActiveTab('model')}
              className={`px-3 py-2 text-xs font-semibold transition-colors ${activeTab === 'model'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-gray-400 hover:text-cyan-300'
                }`}
            >
              3D Data
            </button>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'details' ? (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`mb-3 ${animatingItems.discoveries ? 'animate-slide-bottom' : 'item-hidden'}`}>
                  <div className="flex items-center gap-2 text-cyan-400 mb-2">
                    <Gem className="w-4 h-4" />
                    <h4 className="font-semibold text-xs tracking-wide">DISCOVERIES</h4>
                  </div>
                  <div className="bg-slate-800/50 rounded p-2 border border-cyan-500/20">
                    {site.discoveries.map((discovery, idx) => (
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

                <div className={`mb-3 ${animatingItems.team ? 'animate-slide-bottom' : 'item-hidden'}`}>
                  <div className="flex items-center gap-2 text-cyan-400 mb-2">
                    <Users className="w-4 h-4" />
                    <h4 className="font-semibold text-xs tracking-wide">TEAM</h4>
                  </div>
                  <div className="bg-slate-800/50 rounded p-2 border border-cyan-500/20">
                    <p className="text-gray-300 text-xs">{site.team}</p>
                  </div>
                </div>

                <div className={`${animatingItems.tools ? 'animate-slide-bottom' : 'item-hidden'}`}>
                  <div className="flex items-center gap-2 text-cyan-400 mb-2">
                    <Wrench className="w-4 h-4" />
                    <h4 className="font-semibold text-xs tracking-wide">TOOLS</h4>
                  </div>
                  <div className="bg-slate-800/50 rounded p-2 border border-cyan-500/20">
                    {site.tools.map((tool, idx) => (
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
              </motion.div>
            ) : activeTab === 'safety' ? (
              <motion.div
                key="safety"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {(() => {
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
                })()}
              </motion.div>
            ) : (
              <motion.div
                key="model"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-slate-800/50 rounded-lg p-4 border border-cyan-500/20">
                  {site.has3DModel ? (
                    <>
                      <div className="flex items-center gap-2 text-green-400 mb-3">
                        <Box className="w-4 h-4" />
                        <h4 className="font-semibold text-xs tracking-wide">3D MODEL AVAILABLE</h4>
                      </div>
                      <div className="bg-slate-900/50 rounded aspect-video mb-3 border border-cyan-500/20 overflow-hidden">
                        {showModel ? (
                          <ImageWithFallback src={site.modelPath} alt={site.modelDescription || ''} className="w-full h-full" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-center">
                              <Box className="w-12 h-12 text-cyan-400 mx-auto mb-2 animate-pulse" />
                              <p className="text-xs text-gray-400">3D Model Viewer</p>
                              <p className="text-xs text-cyan-400 mt-1">{site.modelPath}</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-300 text-xs mb-2">{site.modelDescription}</p>
                      <button
                        onClick={() => setShowModel(!showModel)}
                        className="w-full px-3 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded text-xs text-cyan-400 hover:bg-cyan-500/30 transition-colors"
                      >
                        {showModel ? 'Hide Model' : 'Load 3D Model'}
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 text-red-400 mb-3">
                        <AlertTriangle className="w-4 h-4" />
                        <h4 className="font-semibold text-xs tracking-wide">3D SCAN MISSING</h4>
                      </div>
                      <div className="bg-slate-900/50 rounded aspect-video mb-3 flex items-center justify-center border border-red-500/20">
                        <div className="text-center">
                          <Box className="w-12 h-12 text-red-400 mx-auto mb-2" />
                          <p className="text-xs text-red-400">No preservation data available</p>
                        </div>
                      </div>
                      <p className="text-gray-300 text-xs mb-3">{site.modelDescription}</p>
                      <button className="w-full px-3 py-2 bg-red-500/20 border border-red-500/50 rounded text-xs text-red-400 hover:bg-red-500/30 transition-colors">
                        Schedule 3D Documentation
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 animate-pulse"></div>
      </div>
    </div>,
    document.body
  );
};

export default SiteDetailPanel;
