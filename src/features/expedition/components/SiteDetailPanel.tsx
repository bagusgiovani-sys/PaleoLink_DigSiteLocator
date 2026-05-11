import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { DigSite } from '../../../types';
import SitePanelHeader from './SitePanelHeader';
import WeatherAlertBanner from './WeatherAlertBanner';
import DiscoveriesList from './DiscoveriesList';
import TeamSection from './TeamSection';
import ToolsList from './ToolsList';
import SafetyProfileTab from './SafetyProfileTab';
import ModelViewerTab from './ModelViewerTab';

interface Props {
  site: DigSite;
  onClose: () => void;
}

const SiteDetailPanel = ({ site, onClose }: Props) => {
  const [animatingItems, setAnimatingItems] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'details' | 'model' | 'safety'>('details');
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
          <SitePanelHeader site={site} animatingItems={animatingItems} onClose={handleClose} />

          {site.weather.alert && (
            <WeatherAlertBanner site={site} animatingItems={animatingItems} />
          )}

          <div role="tablist" aria-label="Site information" className="flex gap-2 mb-3 border-b border-cyan-500/30">
            <button
              role="tab"
              aria-selected={activeTab === 'details'}
              onClick={() => setActiveTab('details')}
              className={`px-3 py-2 text-xs font-semibold transition-colors ${activeTab === 'details'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-gray-400 hover:text-cyan-300'
                }`}
            >
              Site Details
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'safety'}
              onClick={() => setActiveTab('safety')}
              className={`px-3 py-2 text-xs font-semibold transition-colors ${activeTab === 'safety'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-gray-400 hover:text-cyan-300'
                }`}
            >
              Safety Profile
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'model'}
              onClick={() => setActiveTab('model')}
              className={`px-3 py-2 text-xs font-semibold transition-colors ${activeTab === 'model'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-gray-400 hover:text-cyan-300'
                }`}
            >
              3D Data
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'details' ? (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <DiscoveriesList discoveries={site.discoveries} animatingItems={animatingItems} />
                <TeamSection team={site.team} animatingItems={animatingItems} />
                <ToolsList tools={site.tools} animatingItems={animatingItems} />
              </motion.div>
            ) : activeTab === 'safety' ? (
              <motion.div
                key="safety"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <SafetyProfileTab site={site} />
              </motion.div>
            ) : (
              <motion.div
                key="model"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ModelViewerTab site={site} />
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
