import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { OrderDetails } from '../types';
import { X, ShieldCheck, CreditCard, Sparkles, Check, Download, Printer, Phone } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderComplete: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderComplete
}) => {
  const { cart, subtotal, discount, shipping, tax, total, clearCart, promoCode } = useCart();

  const [fullName, setFullName] = useState('Yusrah Muhammad');
  const [email, setEmail] = useState('yusrahmuhammad72@gmail.com');
  const [phone, setPhone] = useState('07048467264');
  const [address, setAddress] = useState('Plot 12, Adeola Odeku St, Victoria Island');
  const [city, setCity] = useState('Lagos');
  const [zipCode, setZipCode] = useState('101241');
  const [country, setCountry] = useState('Nigeria');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'apple'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleFillDemoData = () => {
    setFullName('Yusrah Muhammad');
    setEmail('yusrahmuhammad72@gmail.com');
    setPhone('07048467264');
    setAddress('Plot 12, Adeola Odeku St, Victoria Island');
    setCity('Lagos');
    setZipCode('101241');
    setCountry('Nigeria');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderId = 'STYLE-' + Math.floor(100000 + Math.random() * 900000);
      const newOrder: OrderDetails = {
        orderId,
        items: [...cart],
        subtotal,
        discount,
        shipping,
        tax,
        total,
        customer: {
          fullName,
          email,
          address: `${address} (Tel: ${phone})`,
          city,
          zipCode,
          country
        },
        date: new Date().toLocaleDateString('en-NG', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      };

      clearCart();
      setIsProcessing(false);
      onOrderComplete(newOrder);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#EAE3D6] overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#F2ECE1] bg-[#FAF8F5]">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl font-bold text-[#1A1A1A]">
                Secure Demo Checkout
              </span>
              <span className="text-[10px] font-bold uppercase bg-[#E8DBBE] text-[#57402A] px-2 py-0.5 rounded font-mono">
                Nigeria (₦)
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Complete your demo order to experience the full StyleAI purchase workflow in Nigerian Naira.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Auto-fill Helper */}
        <div className="bg-[#FAF6EF] px-6 py-2.5 border-b border-[#EAE3D6] flex items-center justify-between">
          <span className="text-xs text-stone-600">Need sample test data?</span>
          <button
            type="button"
            onClick={handleFillDemoData}
            className="text-xs font-semibold text-[#8B6E3F] hover:underline flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>1-Click Auto-Fill Demo Details</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handlePlaceOrder} className="p-6 sm:p-8 space-y-6">
          
          {/* Shipping Address */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3">
              1. Delivery Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-xs py-2.5 px-3 rounded-xl border border-[#EAE3D6] focus:outline-none focus:border-[#A07E4B]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs py-2.5 px-3 rounded-xl border border-[#EAE3D6] focus:outline-none focus:border-[#A07E4B]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs py-2.5 px-3 rounded-xl border border-[#EAE3D6] focus:outline-none focus:border-[#A07E4B]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Country</label>
                <input
                  type="text"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full text-xs py-2.5 px-3 rounded-xl border border-[#EAE3D6] focus:outline-none focus:border-[#A07E4B]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-stone-600 mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full text-xs py-2.5 px-3 rounded-xl border border-[#EAE3D6] focus:outline-none focus:border-[#A07E4B]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">City / State</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full text-xs py-2.5 px-3 rounded-xl border border-[#EAE3D6] focus:outline-none focus:border-[#A07E4B]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Postal / Area Code</label>
                <input
                  type="text"
                  required
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full text-xs py-2.5 px-3 rounded-xl border border-[#EAE3D6] focus:outline-none focus:border-[#A07E4B]"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Preview */}
          <div className="pt-4 border-t border-[#F2ECE1]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3">
              2. Payment Method (Simulation)
            </h4>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'card'
                    ? 'border-[#1A1A1A] bg-[#FAF8F5] ring-1 ring-[#1A1A1A]'
                    : 'border-[#EAE3D6] hover:bg-stone-50'
                }`}
              >
                <CreditCard className="w-5 h-5 mx-auto mb-1 text-stone-700" />
                <span className="text-[11px] font-semibold text-stone-800 block">Debit / Credit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('transfer')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'transfer'
                    ? 'border-[#1A1A1A] bg-[#FAF8F5] ring-1 ring-[#1A1A1A]'
                    : 'border-[#EAE3D6] hover:bg-stone-50'
                }`}
              >
                <span className="text-base font-bold text-emerald-700 block mb-0.5">Paystack</span>
                <span className="text-[11px] font-semibold text-stone-800 block">Bank Transfer</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('apple')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'apple'
                    ? 'border-[#1A1A1A] bg-[#FAF8F5] ring-1 ring-[#1A1A1A]'
                    : 'border-[#EAE3D6] hover:bg-stone-50'
                }`}
              >
                <span className="text-base font-bold text-stone-800 block mb-0.5"> Pay</span>
                <span className="text-[11px] font-semibold text-stone-800 block">Apple Pay</span>
              </button>
            </div>

            {paymentMethod === 'card' && (
              <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#EAE3D6] text-xs space-y-2">
                <div className="flex justify-between text-stone-600">
                  <span>Card Number:</span>
                  <span className="font-mono font-medium">•••• •••• •••• 4242 (Verve / Mastercard Demo)</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Expiry & CVV:</span>
                  <span className="font-mono font-medium">12/28 • 888</span>
                </div>
              </div>
            )}

            {paymentMethod === 'transfer' && (
              <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#EAE3D6] text-xs space-y-2">
                <div className="flex justify-between text-stone-600">
                  <span>Bank Name:</span>
                  <span className="font-semibold text-stone-800">StyleAI Reserve Bank (Demo)</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Account Number:</span>
                  <span className="font-mono font-medium">0123456789</span>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Confirmation */}
          <div className="pt-4 border-t border-[#F2ECE1] bg-[#FAF8F5] p-4 rounded-2xl">
            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Items ({cart.length}):</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Discount ({promoCode}):</span>
                  <span>-₦{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Nationwide Express Courier:</span>
                <span>{shipping === 0 ? 'FREE' : `₦${shipping.toLocaleString()}`}</span>
              </div>
              <div className="flex justify-between">
                <span>VAT (7.5%):</span>
                <span>₦{tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-[#EAE3D6]">
                <span>Total Due:</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Place Order CTA */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-4 rounded-2xl bg-[#1A1A1A] hover:bg-[#A07E4B] text-white font-semibold text-sm shadow-xl transition-all flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Simulating Payment & Creating Order...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                <span>Confirm & Place Order (₦{total.toLocaleString()})</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-stone-400 text-center">
            * This is a student demonstrator store. No real financial transaction will occur.
          </p>
        </form>

      </div>
    </div>
  );
};
