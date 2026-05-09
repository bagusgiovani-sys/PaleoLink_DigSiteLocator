import { Gem, ShoppingCart } from 'lucide-react';
import type { MarketItem } from '../../../types';

interface Props { item: MarketItem; }

const MarketItemRow = ({ item }: Props) => {
  return (
    <div className="bg-slate-900/60 rounded-lg border border-cyan-500/20 hover:border-cyan-500/50 transition-all">
      <div className="grid grid-cols-12 gap-2 md:gap-4 p-3 md:p-4 items-center">
        <div className="col-span-1">
          <div className="bg-slate-800/50 rounded aspect-square flex items-center justify-center border border-slate-700">
            <Gem className="w-6 h-6 md:w-8 md:h-8 text-slate-600" />
          </div>
        </div>

        <div className="col-span-4 md:col-span-3">
          <div className="text-cyan-400 font-bold text-xs md:text-sm mb-1">{item.name}</div>
          <div className="flex items-center gap-2">
            <div className="text-gray-400 text-xs">👍 {item.rating}/100</div>
          </div>
        </div>

        <div className="col-span-3 md:col-span-2 text-center">
          <div className="text-gray-400 text-xs mb-1">AMOUNT</div>
          <div className="text-teal-400 text-xs md:text-sm">♀️ {item.amount}</div>
        </div>

        <div className="col-span-3 md:col-span-2 text-center hidden md:block">
          <div className="text-gray-400 text-xs mb-1">APPEAL</div>
          <div className="text-white text-sm">⭐ {item.appeal.toLocaleString()}</div>
        </div>

        <div className="col-span-3 md:col-span-3 text-right">
          <div className="text-gray-400 text-xs mb-1">PRICE</div>
          <div className="text-white font-bold text-sm md:text-lg">${item.price.toLocaleString()}</div>
          <div className="text-teal-400 text-xs">{item.priceStatus}</div>
        </div>

        <div className="col-span-1 flex justify-end">
          <button aria-label={`Add ${item.name} to cart`} className="p-1.5 md:p-2 bg-cyan-600/80 hover:bg-cyan-600 rounded text-white transition-colors">
            <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketItemRow;
