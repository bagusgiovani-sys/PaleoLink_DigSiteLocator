import { useState } from 'react';
import { Box, AlertTriangle } from 'lucide-react';
import type { DigSite } from '../../../types';
import ImageWithFallback from '../../../components/shared/ImageWithFallback';

interface Props {
  site: DigSite;
}

const ModelViewerTab = ({ site }: Props) => {
  const [showModel, setShowModel] = useState(false);

  return (
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
  );
};

export default ModelViewerTab;
