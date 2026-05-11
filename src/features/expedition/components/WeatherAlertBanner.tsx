import { useState } from 'react';
import { AlertTriangle, Camera, Satellite } from 'lucide-react';
import type { DigSite } from '../../../types';

interface Props {
  site: DigSite;
  animatingItems: Record<string, boolean>;
}

const WeatherAlertBanner = ({ site, animatingItems }: Props) => {
  const [docSubmitted, setDocSubmitted] = useState(false);
  const [scanSubmitted, setScanSubmitted] = useState(false);

  return (
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
              <button
                onClick={() => setDocSubmitted(true)}
                className="flex items-center gap-1 px-2 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded text-xs text-cyan-400 hover:bg-cyan-500/30 transition-colors"
              >
                <Camera className="w-3 h-3" />
                {docSubmitted ? 'Submitted' : 'Document'}
              </button>
              <button
                onClick={() => setScanSubmitted(true)}
                className="flex items-center gap-1 px-2 py-1 bg-purple-500/20 border border-purple-500/50 rounded text-xs text-purple-400 hover:bg-purple-500/30 transition-colors"
              >
                <Satellite className="w-3 h-3" />
                {scanSubmitted ? 'Submitted' : 'Satellite Scan'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherAlertBanner;
