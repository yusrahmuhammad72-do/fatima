import React from 'react';
import { OrderDetails } from '../types';
import { CheckCircle2, Printer, Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';

interface OrderReceiptModalProps {
  order: OrderDetails | null;
  onClose: () => void;
  onExploreMore: () => void;
  onAskStylistAboutOrder: () => void;
}

export const OrderReceiptModal: React.FC<OrderReceiptModalProps> = ({
  order,
  onClose,
  onExploreMore,
  onAskStylistAboutOrder
}) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#EAE3D6] overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Success Badge */}
        <div className="bg-[#FAF8F5] p-8 text-center border-b border-[#EAE3D6]">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-3 shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="text-xs uppercase tracking-widest text-[#A07E4B] font-bold block mb-1">
            Order Confirmed & Logged
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#1A1A1A]">
            Thank You for Your Order!
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Order Reference: <strong className="font-mono text-stone-900">{order.orderId}</strong> • Placed on {order.date}
          </p>
        </div>

        {/* Receipt Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Customer delivery note */}
          <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#EAE3D6] text-xs">
            <span className="font-bold text-stone-800 uppercase tracking-wider block mb-1">
              Shipping Destination
            </span>
            <p className="text-stone-700 font-medium">{order.customer.fullName}</p>
            <p className="text-stone-500">{order.customer.address}, {order.customer.city}, {order.customer.zipCode}</p>
            <p className="text-stone-500">{order.customer.email}</p>
          </div>

          {/* Purchased Items */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3">
              Itemized Garments & Accessories
            </h4>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-4 p-3 rounded-xl border border-stone-100 bg-[#FAF8F5]/60"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-14 object-cover rounded-lg border border-stone-200"
                    />
                    <div>
                      <h5 className="font-serif text-xs font-bold text-stone-900">{item.product.name}</h5>
                      <p className="text-[11px] text-stone-500">
                        Size: {item.selectedSize} • Color: {item.selectedColor} • Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-stone-900">
                    ₦{(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="border-t border-[#F2ECE1] pt-4 space-y-1.5 text-xs text-stone-600">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₦{order.subtotal.toLocaleString()}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Discount Applied:</span>
                <span>-₦{order.discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>{order.shipping === 0 ? 'FREE Express' : `₦${order.shipping.toLocaleString()}`}</span>
            </div>
            <div className="flex justify-between">
              <span>VAT (7.5%):</span>
              <span>₦{order.tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-[#EAE3D6]">
              <span>Total Paid:</span>
              <span>₦{order.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-6 bg-[#FAF8F5] border-t border-[#EAE3D6] space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onAskStylistAboutOrder}
              className="flex-1 py-3 px-4 rounded-xl bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-[#A07E4B] transition-colors flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Ask AI How to Style This Order</span>
            </button>

            <button
              onClick={handlePrint}
              className="py-3 px-4 rounded-xl bg-white border border-[#EAE3D6] text-stone-700 hover:text-stone-900 text-xs font-semibold hover:bg-stone-50 transition-colors flex items-center justify-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Receipt</span>
            </button>
          </div>

          <button
            onClick={() => {
              onClose();
              onExploreMore();
            }}
            className="w-full py-2.5 text-xs text-stone-500 hover:text-stone-800 font-medium transition-colors"
          >
            Close & Return to Catalogue
          </button>
        </div>

      </div>
    </div>
  );
};
