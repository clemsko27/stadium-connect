import React, { useState } from 'react';
import { useStore } from '../store';
import { ChevronLeft, CreditCard, Ticket, CheckCircle, Package, Bike } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { cart, setActiveTab, clearCart, settings } = useStore();
  const [step, setStep] = useState<'review' | 'success'>('review');
  const [loading, setLoading] = useState(false);
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup');

  const total = cart.reduce((acc, i) => acc + i.price * i.qty, 0);
  const serviceFee = 1.50;
  const finalTotal = total + serviceFee;

  const handlePay = () => {
     setLoading(true);
     if ('vibrate' in navigator) navigator.vibrate([10, 50, 10]);
     setTimeout(() => {
        setLoading(false);
        setStep('success');
        clearCart();
     }, 2000);
  };

  if (step === 'success') {
      return (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-6 animate-[fadeIn_0.5s_ease-out]">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                  <CheckCircle size={48} className="text-white" />
              </div>
              <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Commande Confirmée !</h2>
                  <p className="text-gray-400 text-sm">Votre commande #4923 est en préparation.</p>
                  <p className="text-gray-400 text-sm">Reçu envoyé par email.</p>
              </div>
              <button 
                 onClick={() => setActiveTab('live')}
                 className="w-full bg-primary py-4 rounded-xl text-white font-bold active:scale-95 transition-transform"
              >
                  Retour à l'accueil
              </button>
          </div>
      )
  }

  // Check if delivery is allowed for this user
  const canDeliverToSeat = settings.profileType === 'vip' || cart.some(i => i.tags?.includes('delivery'));

  return (
    <div className="p-4 pb-24 space-y-6 animate-[fadeIn_0.5s_ease-out]">
        <div className="flex items-center gap-2">
            <button onClick={() => setActiveTab('services')} className="text-gray-400 hover:text-white active:scale-90 transition-transform">
                <ChevronLeft size={24} />
            </button>
            <h2 className="text-xl font-bold text-white">Paiement</h2>
        </div>

        {/* Order Summary */}
        <div className="bg-surface border border-white/5 rounded-2xl p-4 space-y-4">
           {cart.map(item => (
               <div key={item.id} className="flex justify-between items-center border-b border-white/5 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-xs font-bold text-white">
                          {item.qty}x
                      </div>
                      <span className="text-gray-200 text-sm">{item.name}</span>
                  </div>
                  <span className="text-white font-medium">{(item.price * item.qty).toFixed(2)}€</span>
               </div>
           ))}
        </div>

        {/* Delivery Type Selection */}
        <div className="bg-surface border border-white/5 rounded-2xl p-4">
             <h3 className="text-white font-semibold mb-3">Mode de retrait</h3>
             
             <div className="space-y-2">
               {/* Click & Collect */}
               <button
                 onClick={() => setDeliveryType('pickup')}
                 className={`w-full p-3 rounded-xl border-2 transition-all flex items-center gap-3 ${
                   deliveryType === 'pickup' 
                     ? 'border-accent bg-accent/10' 
                     : 'border-white/10 bg-black/20'
                 }`}
               >
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                   deliveryType === 'pickup' ? 'bg-accent text-primary' : 'bg-white/10 text-gray-400'
                 }`}>
                   <Package size={20} />
                 </div>
                 <div className="flex-1 text-left">
                   <p className="text-white font-medium text-sm">Click & Collect</p>
                   <p className="text-gray-400 text-xs">Retrait au comptoir (gratuit)</p>
                 </div>
               </button>

               {/* Delivery to seat */}
               <button
                 onClick={() => canDeliverToSeat && setDeliveryType('delivery')}
                 disabled={!canDeliverToSeat}
                 className={`w-full p-3 rounded-xl border-2 transition-all flex items-center gap-3 ${
                   deliveryType === 'delivery' 
                     ? 'border-accent bg-accent/10' 
                     : 'border-white/10 bg-black/20'
                 } ${!canDeliverToSeat && 'opacity-50'}`}
               >
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                   deliveryType === 'delivery' ? 'bg-accent text-primary' : 'bg-white/10 text-gray-400'
                 }`}>
                   <Bike size={20} />
                 </div>
                 <div className="flex-1 text-left">
                   <p className="text-white font-medium text-sm">Livraison au siège</p>
                   <p className="text-gray-400 text-xs">
                     {canDeliverToSeat ? 'Disponible (+2.50€)' : 'VIP uniquement'}
                   </p>
                 </div>
               </button>
             </div>

             {deliveryType === 'delivery' && (
               <div className="bg-black/20 p-3 rounded-xl border border-white/5 mt-3">
                 <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Votre siège</p>
                 <p className="text-white font-medium">Section 102, Rang A, Siège 14</p>
               </div>
             )}
        </div>

        {/* Payment */}
        <div className="bg-surface border border-white/5 rounded-2xl p-4">
             <div className="flex items-center gap-3 mb-4">
                 <CreditCard className="text-accent" size={20} />
                 <h3 className="text-white font-semibold">Paiement</h3>
             </div>
             <div className="flex items-center gap-3 p-3 border border-accent/50 bg-accent/10 rounded-xl">
                 <div className="w-10 h-6 bg-white rounded flex items-center justify-center">
                     <div className="w-4 h-4 bg-red-500 rounded-full opacity-80"></div>
                     <div className="w-4 h-4 bg-yellow-500 rounded-full opacity-80 -ml-2"></div>
                 </div>
                 <span className="text-white text-sm flex-1">Mastercard •••• 4242</span>
                 <span className="text-accent text-xs font-bold">Changer</span>
             </div>
        </div>

        {/* Total & Pay */}
        <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-white/10 p-4 pb-8 z-40 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
             <div className="flex justify-between mb-2 text-sm">
                 <span className="text-gray-400">Sous-total</span>
                 <span className="text-white">{total.toFixed(2)}€</span>
             </div>
             {deliveryType === 'delivery' && (
               <div className="flex justify-between mb-2 text-sm">
                 <span className="text-gray-400">Livraison</span>
                 <span className="text-white">2.50€</span>
               </div>
             )}
             <div className="flex justify-between mb-6 text-xl font-bold">
                 <span className="text-white">Total</span>
                 <span className="text-accent">
                   {(deliveryType === 'delivery' ? finalTotal + 2.50 : finalTotal).toFixed(2)}€
                 </span>
             </div>
             
             <button
               onClick={handlePay}
               disabled={loading || cart.length === 0}
               className="w-full bg-accent text-primary h-14 rounded-xl font-bold text-lg hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center active:scale-95"
             >
                {loading ? (
                    <span className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
                ) : (
                    "Payer maintenant"
                )}
             </button>
        </div>
    </div>
  );
};