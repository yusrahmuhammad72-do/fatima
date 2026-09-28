import React from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Sparkles, Heart, Star, ShoppingBag, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onOpenQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onOpenQuickView
}) => {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const isLiked = isWishlisted(product.id);

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-[#EAE3D6] shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Top Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F2EDE4]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out cursor-pointer"
          onClick={() => onSelectProduct(product)}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80';
          }}
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          <span className="text-[11px] font-semibold uppercase tracking-wider bg-[#1A1A1A]/85 backdrop-blur-sm text-white px-2.5 py-1 rounded-full shadow-sm">
            {product.aesthetic}
          </span>
          {product.originalPrice && (
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#A07E4B] text-white px-2 py-0.5 rounded-full shadow-sm">
              Sale -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
            isLiked
              ? 'bg-rose-50 text-rose-500 shadow-md scale-110'
              : 'bg-white/80 text-stone-600 hover:bg-white hover:text-stone-900 shadow-sm'
          }`}
          aria-label={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Floating Quick Action Overlay on Hover */}
        <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            className="flex-1 bg-white/95 backdrop-blur-md text-[#1A1A1A] py-2 px-3 rounded-xl text-xs font-semibold shadow-lg hover:bg-[#1A1A1A] hover:text-white transition-colors flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#A07E4B]" />
            <span>AI Outfit Ideas</span>
          </button>

          {onOpenQuickView && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenQuickView(product);
              }}
              className="p-2 bg-white/95 backdrop-blur-md text-stone-700 hover:text-stone-900 rounded-xl shadow-lg transition-colors"
              title="Quick View"
              aria-label="Quick View"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="p-2 bg-[#1A1A1A] text-white hover:bg-[#A07E4B] rounded-xl shadow-lg transition-colors"
            title="Quick Add to Bag"
            aria-label="Quick Add to Bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span>{product.category}</span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-stone-700">{product.rating}</span>
              <span className="text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          <h3
            onClick={() => onSelectProduct(product)}
            className="font-serif text-base font-semibold text-[#1A1A1A] line-clamp-1 group-hover:text-[#A07E4B] transition-colors cursor-pointer"
          >
            {product.name}
          </h3>

          <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
            {product.tags.slice(0, 3).map((tag) => `#${tag}`).join(' ')}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#F2ECE1]">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-[#1A1A1A]">
              ₦{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through">
                ₦{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Color preview dots */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1">
              {product.colors.slice(0, 3).map((c, i) => (
                <span
                  key={i}
                  className="w-3 h-3 rounded-full border border-stone-300"
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
