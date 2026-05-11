import { ShoppingCart } from 'lucide-react';
import MarketItemRow from './MarketItemRow';
import { marketItems } from '../constants';

const MarketplaceTab = () => (
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
);

export default MarketplaceTab;
