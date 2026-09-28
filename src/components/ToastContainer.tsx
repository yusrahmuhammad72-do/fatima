import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none px-4">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let borderClass = 'border-[#C5A880]';
        let bgIcon = 'text-[#A07E4B]';

        if (toast.type === 'info') {
          Icon = Info;
          borderClass = 'border-stone-400';
          bgIcon = 'text-stone-600';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          borderClass = 'border-amber-400';
          bgIcon = 'text-amber-600';
        } else if (toast.type === 'error') {
          Icon = XCircle;
          borderClass = 'border-rose-400';
          bgIcon = 'text-rose-600';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl border ${borderClass} transition-all duration-300 animate-in fade-in slide-in-from-bottom-5`}
          >
            {toast.image ? (
              <img
                src={toast.image}
                alt="Product"
                className="w-12 h-14 object-cover rounded-md border border-stone-200 shrink-0"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=200&q=80';
                }}
              />
            ) : (
              <div className={`p-2 rounded-full bg-stone-100 ${bgIcon} shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-stone-900 leading-snug">{toast.message}</p>
              {toast.actionLabel && toast.onAction && (
                <button
                  onClick={toast.onAction}
                  className="mt-1 text-xs font-semibold text-[#8B6E3F] hover:underline"
                >
                  {toast.actionLabel}
                </button>
              )}
            </div>

            <button
              onClick={() => dismissToast(toast.id)}
              className="text-stone-400 hover:text-stone-700 p-1 rounded-md transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
