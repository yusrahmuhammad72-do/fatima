import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { X, Sparkles, ShoppingBag, Heart, Star, ArrowRight } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onViewFullDetails: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onViewFullDetails
}) => {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  if (!product) return null;

  const currentSize = selectedSize || (product.sizes ? product.sizes[0] : 'Standard');
  const currentColor = selectedColor || (product.colors ? product.colors[0].name : 'Default');
  const isLiked = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(product, 1, currentSize, currentColor);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#EAE3D6] overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-stone-400 hover:text-stone-700 bg-white/80 rounded-full hover:bg-white backdrop-blur-sm transition-colors shadow-sm"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Image */}
          <div className="relative aspect-[3/4] bg-[#FAF8F5] md:aspect-auto h-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider bg-[#1A1A1A]/85 backdrop-blur-sm text-white px-2.5 py-1 rounded-full shadow-sm">
                {product.aesthetic}
              </span>
            </div>
          </div>

          {/* Right: Info */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                <span>{product.category}</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-stone-800">{product.rating}</span>
                </div>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                {product.name}
              </h3>

              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-bold text-[#1A1A1A]">
                  ₦{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through">
                    ₦{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <p className="text-xs text-stone-600 line-clamp-3 mt-3 leading-relaxed">
                {product.description}
              </p>

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-4">
                  <span className="block text-[11px] font-bold uppercase text-stone-500 mb-1.5">
                    Select Size
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                          currentSize === s
                            ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-sm'
                            : 'border-[#EAE3D6] bg-[#FAF8F5] text-stone-700'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-[#F2ECE1]">
              <div className="flex gap-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#1A1A1A] hover:bg-[#A07E4B] text-white text-xs font-semibold shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 rounded-xl border transition-colors ${
                    isLiked
                      ? 'border-rose-300 bg-rose-50 text-rose-500'
                      : 'border-[#EAE3D6] text-stone-600 hover:bg-stone-50'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onViewFullDetails(product);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-[#FAF8F5] border border-[#EAE3D6] hover:border-[#A07E4B] text-stone-800 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 group"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#A07E4B]" />
                <span>View Full Details & AI Outfit Formulas</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
