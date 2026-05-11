import { MapPin, Clock, CheckCircle, Phone } from 'lucide-react';
import type { Resource } from '../../../types';
import { sourceTypeIcon } from '../constants';

interface Props {
  resource: Resource;
}

const ResourceItem = ({ resource }: Props) => (
  <div className={`rounded-lg p-3 border flex items-start gap-3 ${resource.available
      ? 'bg-slate-800/60 border-slate-700/60'
      : 'bg-slate-900/40 border-slate-800/40 opacity-60'
    }`}>
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${resource.available ? 'bg-cyan-500/20' : 'bg-slate-700/50'
      }`}>
      <resource.icon className={`w-4 h-4 ${resource.available ? 'text-cyan-400' : 'text-gray-500'}`} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-white text-xs font-semibold truncate">{resource.name}</p>
      <div className="flex items-center gap-1 mt-0.5">
        <span className={`text-xs ${resource.available ? 'text-cyan-300' : 'text-gray-500'}`}>{sourceTypeIcon(resource.sourceType)}</span>
        <p className="text-gray-400 text-xs truncate">{resource.source}</p>
      </div>
      <div className="flex items-center gap-3 mt-1.5">
        <span className="text-gray-400 text-xs flex items-center gap-1">
          <MapPin className="w-2.5 h-2.5" />{resource.distance}
        </span>
        <span className="text-gray-400 text-xs flex items-center gap-1">
          <Clock className="w-2.5 h-2.5" />{resource.eta}
        </span>
        {resource.available
          ? <span className="text-green-400 text-xs flex items-center gap-1"><CheckCircle className="w-2.5 h-2.5" />Available</span>
          : <span className="text-red-400 text-xs">Unavailable</span>
        }
      </div>
    </div>
    {resource.available && (
      <button aria-label={`Contact ${resource.source}`} className="flex-shrink-0 p-1.5 bg-cyan-500/20 border border-cyan-500/40 rounded text-cyan-400 hover:bg-cyan-500/30 transition-colors">
        <Phone className="w-3 h-3" />
      </button>
    )}
  </div>
);

export default ResourceItem;
