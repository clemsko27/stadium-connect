import React, { useState } from 'react';
import { useStore } from '../store';
import { getMenuForStadium } from '../mockData';
import { Plus, Bike, ShoppingBag, Package, Star } from 'lucide-react';
import { t } from '../translations';

export const ServicesPage: React.FC = () => {
  const { addToCart, setActiveTab, cart, currentStadium, settings } = useStore();
  const [category, setCategory] = useState<'food' | 'merch'>('food');

  // Récupérer le menu du stade actuel
  const stadiumMenu = getMenuForStadium(currentStadium.id);
  
  const filteredItems = stadiumMenu.filter(item => {
     if (category === 'food') return item.category === 'food' || item.category === 'drink';
     return item.category === 'merch';
  });

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  // Format prix selon région
  const formatPrice = (price: number) => {
    if (currentStadium.region === 'US') return `$${price.toFixed(2)}`;
    if (currentStadium.region === 'JP') return `¥${Math.round(price)}`;
    return `${price.toFixed(2)}€`;
  };

  return (
    <div className="p-4 pb-24 space-y-4 animate-[fadeIn_0.5s_ease-out]">
       
       {/* Category Toggles */}
       <div className="flex p-1 bg-surface border border-white/10 rounded-xl mb-6 shadow-lg">
          <button 
            onClick={() => {
              setCategory('food');
              if ('vibrate' in navigator) navigator.vibrate(10);
            }}
            className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
              category === 'food' 
                ? 'bg-primary text-white shadow-md' 
                : 'text-gray-400'
            }`}
          >
            🍔 Food & Drinks
          </button>
          <button 
             onClick={() => {
               setCategory('merch');
               if ('vibrate' in navigator) navigator.vibrate(10);
             }}
             className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
               category === 'merch' 
                 ? 'bg-primary text-white shadow-md' 
                 : 'text-gray-400'
             }`}
          >
            🛍️ Merchandise
          </button>
       </div>

       {/* Items Grid */}
       <div className="grid grid-cols-1 gap-4">
          {filteredItems.map(item => (
             <div 
               key={item.id} 
               className="bg-surface border border-white/5 rounded-2xl overflow-hidden group hover:border-accent/20 transition-all shadow-lg"
             >
                {/* Image */}
                <div className="relative w-full h-48 bg-gray-800 overflow-hidden">
                   <img 
                     src={item.image} 
                     alt={item.name} 
                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                     onError={(e) => {
                       // Fallback to generic fast food image, NOT a salad bowl
                       (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1561758033-d8f3c6604856?w=400&h=400&fit=crop';
                     }}
                   />
                   
                   {/* Badges */}
                   <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                     {item.tags?.includes('vip') && (
                        <span className="bg-accent text-primary text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                          <Star size={10} fill="currentColor" />
                          VIP
                        </span>
                     )}
                     {item.tags?.includes('pickup') && (
                       <span className="bg-green-500/90 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                         <Package size={10} />
                         Click & Collect
                       </span>
                     )}
                     {item.tags?.includes('delivery') && (
                       <span className="bg-blue-500/90 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                         <Bike size={10} />
                         Livraison
                       </span>
                     )}
                   </div>
                   
                   {/* Price Badge */}
                   <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white font-bold px-3 py-1.5 rounded-full text-sm">
                     {formatPrice(item.price)}
                   </div>
                </div>
                
                {/* Content */}
                <div className="p-4">
                   <h4 className="text-white font-bold text-base mb-1">{item.name}</h4>
                   {item.description && (
                     <p className="text-gray-400 text-xs mb-3 line-clamp-2">{item.description}</p>
                   )}
                   
                   <button 
                     onClick={() => {
                       addToCart(item);
                       if ('vibrate' in navigator) navigator.vibrate([20, 10, 20]);
                     }}
                     className="w-full bg-gradient-to-r from-accent to-yellow-500 text-primary font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:from-yellow-400 hover:to-yellow-600 active:scale-95 transition-all shadow-lg"
                   >
                      <Plus size={18} />
                      Ajouter au panier
                   </button>
                </div>
             </div>
          ))}
       </div>

       {/* Empty state */}
       {filteredItems.length === 0 && (
         <div className="text-center py-16">
           <div className="text-6xl mb-4">🍽️</div>
           <p className="text-gray-400 text-sm">Aucun produit disponible</p>
         </div>
       )}

       {/* Floating Cart */}
       {cart.length > 0 && (
          <div className="fixed bottom-24 left-4 right-4 z-30 animate-[fadeIn_0.3s_ease-out]">
             <div className="bg-gradient-to-r from-accent to-yellow-500 rounded-2xl p-4 shadow-[0_0_30px_rgba(212,160,23,0.4)] flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="bg-primary/30 p-2.5 rounded-full backdrop-blur-sm">
                       <ShoppingBag className="text-primary" size={22} />
                    </div>
                    <div>
                       <p className="text-primary font-bold text-sm">
                         {cart.length} {cart.length === 1 ? 'article' : 'articles'}
                       </p>
                       <p className="text-primary/80 text-xs font-semibold">
                         {formatPrice(cartTotal)}
                       </p>
                    </div>
                 </div>
                 <button 
                   onClick={() => {
                     setActiveTab('checkout');
                     if ('vibrate' in navigator) navigator.vibrate([20, 10, 20]);
                   }}
                   className="bg-primary text-white text-sm font-bold px-5 py-3 rounded-xl active:scale-95 transition-transform shadow-lg hover:bg-blue-700"
                 >
                    Commander →
                 </button>
             </div>
          </div>
       )}

    </div>
  );
};