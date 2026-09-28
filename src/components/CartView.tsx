import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { CheckoutModal } from './CheckoutModal';
import { OrderReceiptModal } from './OrderReceiptModal';
import { OrderDetails } from '../types';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Tag,
  Check,
  RotateCcw
} from 'lucide-react';

interface CartViewProps {
  onExplore: () => void;
  onSelectProduct: (product: Product) => void;
  onLaunchStylist: () => void;
}

export const CartView: React.FC<CartViewProps> = ({
  onExplore,
  onSelectProduct,
  onLaunchStylist
}) => {
  const {
    cart,
    cartCount,
    subtotal,
    discount,
    shipping,
    tax,
    total,
    promoCode,
    isPromoValid,
    promoMessage,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyPromoCode,
    removePromoCode
  } = useCart();

  const [inputPromo, setInputPromo] = useState('');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);

  const freeShippingThreshold = 100000;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPromo.trim()) return;
    applyPromoCode(inputPromo);
    setInputPromo('');
  };

  const handleOrderFinished = (order: OrderDetails) => {
    setIsCheckoutOpen(false);
    setCompletedOrder(order);
  };

  if (cart.length === 0 && !completedOrder) {
    return (
      <div className="py-16 bg-[#FAF8F5] min-h-[70vh] flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-white border border-[#EAE3D6] text-stone-400 flex items-center justify-center mx-auto mb-6 shadow-sm">
            <ShoppingBag className="w-10 h-10 text-stone-300" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-[#1A1A1A]">
            Your Shopping Bag is Empty
          </h2>
          <p className="text-stone-600 text-sm mt-2 leading-relaxed">
            Discover investment essentials crafted for modern longevity, or ask our AI Stylist to
            curate an outfit with colors that fit your personal style.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onExplore}
              className="px-6 py-3 rounded-full bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-[#A07E4B] transition-colors shadow-md"
            >
              Explore Catalogue
            </button>
            <button
              onClick={onLaunchStylist}
              className="px-6 py-3 rounded-full bg-white border border-[#EAE3D6] text-stone-800 text-xs font-semibold hover:bg-stone-50 transition-colors flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A07E4B]" />
              <span>Ask AI Stylist</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#A07E4B] font-semibold block mb-1">
              Review & Checkout
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
              Shopping Bag ({cartCount} {cartCount === 1 ? 'item' : 'items'})
            </h1>
          </div>

          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-stone-500 hover:text-rose-600 transition-colors self-start sm:self-auto flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Entire Bag</span>
            </button>
          )}
        </div>

        {/* Free Shipping Progress bar */}
        <div className="mb-8 p-4 bg-white rounded-2xl border border-[#EAE3D6] shadow-sm">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-stone-800">
              {shipping === 0
                ? '🎉 Congratulations! You have unlocked Free Nationwide Express Delivery'
                : `Add ₦${remainingForFreeShipping.toLocaleString()} more to unlock Free Express Delivery`}
            </span>
            <span className="text-stone-500 font-medium">
              ₦{subtotal.toLocaleString()} / ₦{freeShippingThreshold.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-[#FAF8F5] h-2 rounded-full overflow-hidden border border-[#EAE3D6]">
            <div
              className="bg-[#A07E4B] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Main Grid: Cart Items (Left) vs Summary (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${idx}`}
                className="bg-white rounded-2xl p-4 sm:p-6 border border-[#EAE3D6] shadow-sm flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
              >
                {/* Product Info with Thumbnail */}
                <div className="flex items-center gap-4 flex-1">
                  <div
                    onClick={() => onSelectProduct(item.product)}
                    className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden bg-[#FAF8F5] shrink-0 border border-[#EAE3D6] cursor-pointer"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#A07E4B]">
                      {item.product.category}
                    </span>
                    <h3
                      onClick={() => onSelectProduct(item.product)}
                      className="font-serif text-base sm:text-lg font-bold text-[#1A1A1A] hover:text-[#A07E4B] transition-colors cursor-pointer"
                    >
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">
                      Size: <strong className="text-stone-800">{item.selectedSize}</strong> • Color:{' '}
                      <strong className="text-stone-800">{item.selectedColor}</strong>
                    </p>
                    <div className="mt-2 text-xs font-semibold text-stone-900 sm:hidden">
                      ₦{item.product.price.toLocaleString()} each
                    </div>
                  </div>
                </div>

                {/* Controls and Total */}
                <div className="flex items-center justify-between w-full sm:w-auto gap-6 sm:justify-end">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-[#EAE3D6] rounded-xl px-2.5 py-1.5 bg-[#FAF8F5]">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.selectedSize,
                          item.selectedColor,
                          -1
                        )
                      }
                      className="text-stone-500 hover:text-stone-900 p-1"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-stone-900 px-3">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.selectedSize,
                          item.selectedColor,
                          1
                        )
                      }
                      className="text-stone-500 hover:text-stone-900 p-1"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Line Total */}
                  <div className="text-right min-w-[70px]">
                    <span className="font-serif text-base font-bold text-stone-900 block">
                      ₦{(item.product.price * item.quantity).toLocaleString()}
                    </span>
                    <span className="text-[10px] text-stone-400 hidden sm:block">
                      ₦{item.product.price.toLocaleString()} / item
                    </span>
                  </div>

                  {/* Delete Item */}
                  <button
                    onClick={() =>
                      removeFromCart(
                        item.product.id,
                        item.selectedSize,
                        item.selectedColor
                      )
                    }
                    className="p-2 text-stone-400 hover:text-rose-600 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* AI Cross-selling suggestion pill */}
            <div className="p-5 bg-gradient-to-r from-[#FAF6EF] to-[#F3EDE2] rounded-2xl border border-[#E0D5C1] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#A07E4B]" />
                <div>
                  <h4 className="text-xs font-bold text-[#1A1A1A]">Want to complete your look?</h4>
                  <p className="text-[11px] text-stone-600">
                    Our AI Stylist can review your bag and recommend missing accessories or outerwear in colors that fit.
                  </p>
                </div>
              </div>
              <button
                onClick={onLaunchStylist}
                className="px-4 py-2 bg-white text-stone-800 text-xs font-semibold rounded-xl border border-[#D5C7B0] hover:bg-stone-50 transition-colors shrink-0"
              >
                Consult AI Stylist
              </button>
            </div>
          </div>

          {/* Right Column: Order Summary Card */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE3D6] shadow-sm space-y-6">
            <h3 className="font-serif text-xl font-bold text-[#1A1A1A] pb-3 border-b border-[#F2ECE1]">
              Order Summary
            </h3>

            {/* Promo Code Box */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-2">
                Promotional Voucher or Student Code
              </label>
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                  <input
                    type="text"
                    placeholder="e.g. STUDENT10"
                    value={inputPromo}
                    onChange={(e) => setInputPromo(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-[#FAF8F5] border border-[#EAE3D6] rounded-xl text-xs uppercase focus:outline-none focus:border-[#A07E4B]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-[#A07E4B] transition-colors shrink-0"
                >
                  Apply
                </button>
              </form>

              {/* Working Code Suggestions */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                <button
                  type="button"
                  onClick={() => applyPromoCode('STUDENT10')}
                  className="text-[10px] bg-[#FAF8F5] hover:bg-[#E8DBBE] text-stone-700 border border-[#EAE3D6] px-2 py-0.5 rounded-full font-mono transition-colors"
                >
                  STUDENT10 (-10%)
                </button>
                <button
                  type="button"
                  onClick={() => applyPromoCode('STYLEAI')}
                  className="text-[10px] bg-[#FAF8F5] hover:bg-[#E8DBBE] text-stone-700 border border-[#EAE3D6] px-2 py-0.5 rounded-full font-mono transition-colors"
                >
                  STYLEAI (-₦15,000)
                </button>
              </div>

              {promoMessage && (
                <div
                  className={`mt-2 text-xs flex items-center justify-between p-2 rounded-lg ${
                    isPromoValid ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                  }`}
                >
                  <span>{promoMessage}</span>
                  {isPromoValid && (
                    <button
                      onClick={removePromoCode}
                      className="text-[10px] underline font-bold"
                    >
                      Remove
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2.5 text-xs text-stone-600 pt-3 border-t border-[#F2ECE1]">
              <div className="flex justify-between">
                <span>Garments Subtotal:</span>
                <span className="font-semibold text-stone-900">₦{subtotal.toLocaleString()}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Discount Savings ({promoCode}):</span>
                  <span>-₦{discount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Express Courier Shipping:</span>
                <span>
                  {shipping === 0 ? (
                    <strong className="text-emerald-700 font-bold uppercase text-[11px]">Free</strong>
                  ) : (
                    `₦${shipping.toLocaleString()}`
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated VAT (7.5%):</span>
                <span>₦{tax.toLocaleString()}</span>
              </div>

              <div className="pt-3 border-t border-[#EAE3D6] flex justify-between items-baseline">
                <span className="font-serif text-lg font-bold text-[#1A1A1A]">Total:</span>
                <span className="font-serif text-2xl font-bold text-[#1A1A1A]">
                  ₦{total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full py-4 rounded-2xl bg-[#1A1A1A] hover:bg-[#A07E4B] text-white font-semibold text-sm shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Guarantees */}
            <div className="text-[11px] text-stone-400 space-y-1 text-center pt-2">
              <p>• Complimentary luxury gift packaging included</p>
              <p>• 14-day hassle-free return guarantee</p>
            </div>
          </div>

        </div>

      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderComplete={handleOrderFinished}
      />

      {/* Order Receipt Modal */}
      <OrderReceiptModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
        onExploreMore={onExplore}
        onAskStylistAboutOrder={onLaunchStylist}
      />
    </div>
  );
};
