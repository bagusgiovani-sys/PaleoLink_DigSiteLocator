import { useState } from 'react';
import { Map, FlaskConical, ShoppingCart, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { MainTab } from './types';
import { useIntroSplash } from './hooks/useIntroSplash';
import IntroSplash from './components/shared/IntroSplash';
import ErrorBoundary from './components/shared/ErrorBoundary';
import WorldMap from './features/expedition/components/WorldMap';
import StatsFooter from './features/expedition/components/StatsFooter';
import ScientistCard from './features/scientists/components/ScientistCard';
import MarketItemRow from './features/marketplace/components/MarketItemRow';
import SiteResourceCard from './features/pathfinder/components/SiteResourceCard';
import { digSites } from './constants/digSites';
import { scientists } from './features/scientists/constants';
import { marketItems } from './features/marketplace/constants';
import { resourceMap } from './features/pathfinder/constants';

const resourcesMatched = digSites
  .filter(s => s.weather.alert)
  .flatMap(s => resourceMap[s.weather.condition]?.tools ?? [])
  .filter(r => r.available).length;

const App = () => {
  const showIntro = useIntroSplash();
  const [mainTab, setMainTab] = useState<MainTab>('expedition');

  if (showIntro) return <IntroSplash />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-3 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-cyan-400 mb-2 tracking-wider">PALEO LINK</h1>
          <div className="h-1 w-48 md:w-64 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
          <p className="text-cyan-200 mt-3 text-xs md:text-sm tracking-widest">GLOBAL EXCAVATION & PRESERVATION NETWORK</p>
        </div>

        {/* Main Navigation Tabs */}
        <div className="mb-4 md:mb-6">
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg border border-cyan-500/30 p-1 md:p-2 flex flex-col md:flex-row gap-2">
            <button
              onClick={() => setMainTab('expedition')}
              className={`flex-1 px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold text-xs md:text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${mainTab === 'expedition'
                ? 'bg-cyan-500/30 text-cyan-400 border border-cyan-500/50 shadow-lg shadow-cyan-500/20'
                : 'text-gray-400 hover:text-cyan-300 hover:bg-slate-800/50'
                }`}
            >
              <Map className="w-4 h-4 md:w-5 md:h-5" />
              EXPEDITION MAP
            </button>
            <button
              onClick={() => setMainTab('scientists')}
              className={`flex-1 px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold text-xs md:text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${mainTab === 'scientists'
                ? 'bg-cyan-500/30 text-cyan-400 border border-cyan-500/50 shadow-lg shadow-cyan-500/20'
                : 'text-gray-400 hover:text-cyan-300 hover:bg-slate-800/50'
                }`}
            >
              <FlaskConical className="w-4 h-4 md:w-5 md:h-5" />
              SCIENTISTS
            </button>
            <button
              onClick={() => setMainTab('marketplace')}
              className={`flex-1 px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold text-xs md:text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${mainTab === 'marketplace'
                ? 'bg-cyan-500/30 text-cyan-400 border border-cyan-500/50 shadow-lg shadow-cyan-500/20'
                : 'text-gray-400 hover:text-cyan-300 hover:bg-slate-800/50'
                }`}
            >
              <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
              MARKETPLACE
            </button>
            <button
              onClick={() => setMainTab('pathfinder')}
              className={`flex-1 px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold text-xs md:text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${mainTab === 'pathfinder'
                ? 'bg-cyan-500/30 text-cyan-400 border border-cyan-500/50 shadow-lg shadow-cyan-500/20'
                : 'text-gray-400 hover:text-cyan-300 hover:bg-slate-800/50'
                }`}
            >
              <Navigation className="w-4 h-4 md:w-5 md:h-5" />
              PATHFINDER
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {mainTab === 'expedition' ? (
            <motion.div
              key="expedition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ErrorBoundary>
                <WorldMap digSites={digSites} />
                <StatsFooter digSites={digSites} />
              </ErrorBoundary>
            </motion.div>
          ) : mainTab === 'scientists' ? (
            <motion.div
              key="scientists"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ErrorBoundary>
                <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg border-2 border-cyan-500/30 p-4 md:p-6 shadow-2xl shadow-cyan-500/20">
                  <h2 className="text-xl md:text-2xl font-bold text-cyan-400 mb-4 md:mb-6 tracking-wide">RECRUITMENT</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    {scientists.map(s => <ScientistCard key={s.id} scientist={s} />)}
                  </div>
                </div>
              </ErrorBoundary>
            </motion.div>
          ) : mainTab === 'marketplace' ? (
            <motion.div
              key="marketplace"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ErrorBoundary>
                <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg border-2 border-cyan-500/30 p-4 md:p-6 shadow-2xl shadow-cyan-500/20">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 md:mb-6 gap-3">
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold text-cyan-400 tracking-wide">MARKETPLACE</h2>
                      <p className="text-gray-400 text-xs md:text-sm">DINOSAURS › FLYING</p>
                    </div>
                    <button className="px-4 md:px-6 py-2 bg-cyan-600/80 hover:bg-cyan-600 rounded-lg text-white text-sm md:text-base font-semibold flex items-center justify-center gap-2 transition-colors">
                      <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                      <span className="hidden sm:inline">REFRESH LIST</span>
                      <span className="text-xs">$50,000</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-2 md:gap-3">
                    {marketItems.map(i => <MarketItemRow key={i.id} item={i} />)}
                  </div>
                </div>
              </ErrorBoundary>
            </motion.div>
          ) : null}

          {mainTab === 'pathfinder' && (
            <motion.div
              key="pathfinder"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ErrorBoundary>
              {/* PathFinder Header */}
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg border-2 border-cyan-500/30 p-4 md:p-6 shadow-2xl shadow-cyan-500/20">
                <div className="flex items-center gap-3 mb-2">
                  <Navigation className="w-6 h-6 text-cyan-400" />
                  <h2 className="text-xl md:text-2xl font-bold text-cyan-400 tracking-wide">PATHFINDER</h2>
                </div>
                <p className="text-gray-400 text-xs md:text-sm mb-6">Real-time emergency resource matching — critical sites are automatically paired with the nearest available tools and institutions.</p>

                {/* Alert Summary Bar */}
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

                {/* Per-site resource cards */}
                <div className="space-y-4">
                  {digSites.filter(s => s.weather.alert).map(s => <SiteResourceCard key={s.id} site={s} />)}
                </div>
              </div>
              </ErrorBoundary>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
