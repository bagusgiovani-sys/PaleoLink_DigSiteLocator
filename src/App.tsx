import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { MainTab } from './types';
import { useIntroSplash } from './hooks/useIntroSplash';
import IntroSplash from './components/shared/IntroSplash';
import ErrorBoundary from './components/shared/ErrorBoundary';
import AppHeader from './components/shared/AppHeader';
import MainTabBar from './components/shared/MainTabBar';
import WorldMap from './features/expedition/components/WorldMap';
import StatsFooter from './features/expedition/components/StatsFooter';
import ScientistsTab from './features/scientists/components/ScientistsTab';
import MarketplaceTab from './features/marketplace/components/MarketplaceTab';
import PathfinderTab from './features/pathfinder/components/PathfinderTab';
import { digSites } from './constants/digSites';

const App = () => {
  const showIntro = useIntroSplash();
  const [mainTab, setMainTab] = useState<MainTab>('expedition');

  if (showIntro) return <IntroSplash />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-3 md:p-6">
      <div className="max-w-7xl mx-auto">
        <AppHeader />
        <MainTabBar activeTab={mainTab} onTabChange={setMainTab} />

        <AnimatePresence mode="wait">
          {mainTab === 'expedition' ? (
            <motion.div key="expedition" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <ErrorBoundary>
                <WorldMap digSites={digSites} />
                <StatsFooter digSites={digSites} />
              </ErrorBoundary>
            </motion.div>
          ) : mainTab === 'scientists' ? (
            <motion.div key="scientists" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <ErrorBoundary><ScientistsTab /></ErrorBoundary>
            </motion.div>
          ) : mainTab === 'marketplace' ? (
            <motion.div key="marketplace" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <ErrorBoundary><MarketplaceTab /></ErrorBoundary>
            </motion.div>
          ) : null}

          {mainTab === 'pathfinder' && (
            <motion.div key="pathfinder" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <ErrorBoundary><PathfinderTab /></ErrorBoundary>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
