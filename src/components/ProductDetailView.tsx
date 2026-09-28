import React, { useState } from 'react';
import { Product, OutfitSuggestionResponse } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import {
  Sparkles,
  ShoppingBag,
  Heart,
  Star,
  ArrowLeft,
  Check,
  Truck,
  ShieldCheck,
  RefreshCw,
  Plus,
  Minus,
  Palette,
  Maximize2
} from 'lucide-react';

interface ProductDetailViewProps {
  product: Product;
  allProducts: Product[];
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
  onConsultStylistWithProduct?: (product: Product) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  allProducts,
  onBack,
  onSelectProduct,
  onConsultStylistWithProduct
}) => {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  // Gallery state
  const images = [product.image, ...(product.alternateImages || [])];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Variant selections
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'One Size'
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors && product.colors.length > 0 ? product.colors[0].name : 'Natural'
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'shipping'>('details');

  // AI Outfit Suggestions State
  const [aiSuggestions, setAiSuggestions] = useState<OutfitSuggestionResponse | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const isLiked = isWishlisted(product.id);

  // Fetch AI Outfit Suggestions via server-side Gemini Flash
  const handleGenerateAIOutfits = async () => {
    setIsLoadingAI(true);
    setAiError(null);

    try {
      // Provide brief catalogue items context for intelligent pairing
      const catalogueContext = allProducts
        .filter((p) => p.id !== product.id)
        .slice(0, 8)
        .map((p) => ({
          id: p.id,
          name: p.name,
          category: p.category,
          price: p.price,
          tags: p.tags
        }));

      const response = await fetch('/api/stylist/outfit-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product,
          catalogueContext
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      setAiSuggestions(data);
    } catch (err: any) {
      console.error('Failed to get AI outfit suggestions:', err);
      setAiError('Could not connect to Gemini AI stylist. Showing editorial fallback formulas.');
    } finally {
      setIsLoadingAI(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  return (
    <div className="py-8 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors bg-white px-3.5 py-2 rounded-full border border-[#EAE3D6] shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Catalogue</span>
          </button>

          <span className="text-xs text-stone-500 hidden sm:inline">
            Catalogue / {product.category} / <strong className="text-stone-800">{product.name}</strong>
          </span>
        </div>

        {/* Primary Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white rounded-3xl p-6 sm:p-10 border border-[#EAE3D6] shadow-sm">
          
          {/* Left: Gallery Column */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Featured Image */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#F2EDE4] border border-[#EAE3D6]">
              <img
                src={images[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=80';
                }}
              />

              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider bg-[#1A1A1A]/85 backdrop-blur-sm text-white px-3 py-1 rounded-full shadow-sm">
                  {product.aesthetic}
                </span>
                {product.originalPrice && (
                  <span className="text-xs font-bold uppercase tracking-wider bg-[#A07E4B] text-white px-2.5 py-1 rounded-full shadow-sm">
                    Sale -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                )}
              </div>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all shadow-md ${
                  isLiked ? 'bg-rose-50 text-rose-500' : 'bg-white/80 text-stone-600 hover:bg-white'
                }`}
                aria-label={isLiked ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            {/* Thumbnails Row */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-[#A07E4B] ring-2 ring-[#A07E4B]/20 shadow-md'
                        : 'border-[#EAE3D6] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info & Order Configuration */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                <span className="font-semibold uppercase tracking-wider text-[#A07E4B]">
                  {product.category} • {product.subCategory || 'Signature Collection'}
                </span>
                <div className="flex items-center gap-1.5 bg-[#FAF8F5] px-2.5 py-1 rounded-full border border-[#EAE3D6]">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-stone-800">{product.rating}</span>
                  <span>({product.reviewCount} customer reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A] leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-3xl font-bold text-[#1A1A1A]">
                  ₦{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-stone-400 line-through">
                    ₦{product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                  In Stock & Ready to Ship
                </span>
              </div>

              {/* Editorial Description */}
              <p className="text-stone-600 text-sm leading-relaxed mt-4">
                {product.description}
              </p>

              {/* Color Swatches */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-6 pt-5 border-t border-[#F2ECE1]">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-stone-800">Color:</span>
                    <span className="text-stone-600">{selectedColor}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition-all ${
                          selectedColor === c.name
                            ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-sm'
                            : 'border-[#EAE3D6] bg-[#FAF8F5] text-stone-700 hover:border-stone-400'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/50"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-stone-800">Select Size:</span>
                    <span className="text-[#A07E4B] hover:underline cursor-pointer">Size Guide</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                          selectedSize === s
                            ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-sm'
                            : 'border-[#EAE3D6] bg-[#FAF8F5] text-stone-700 hover:border-stone-400'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity and Primary Action */}
              <div className="mt-6 pt-5 border-t border-[#F2ECE1] flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {/* Quantity Controls */}
                <div className="flex items-center justify-between border border-[#EAE3D6] rounded-2xl px-4 py-2.5 bg-[#FAF8F5] sm:w-36 shrink-0">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="text-stone-500 hover:text-stone-900 disabled:opacity-30 p-1"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-bold text-stone-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="text-stone-500 hover:text-stone-900 p-1"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add To Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-[#1A1A1A] text-white font-semibold text-sm hover:bg-[#A07E4B] shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Shopping Bag • ₦{(product.price * quantity).toLocaleString()}</span>
                </button>
              </div>

              {/* AI Outfit Suggestions Promo Trigger */}
              <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-[#FAF6EF] to-[#F3EDE2] border border-[#E0D5C1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-white shadow-sm text-[#A07E4B]">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1A1A1A]">Curated Outfit & Color Formulas</h4>
                    <p className="text-[11px] text-stone-600">
                      Let Gemini 3.8 Flash recommend colors that fit and 3 complete looks for this piece.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleGenerateAIOutfits}
                  disabled={isLoadingAI}
                  className="px-4 py-2 rounded-xl bg-[#A07E4B] text-white text-xs font-semibold hover:bg-[#8B6E3F] shadow-sm transition-all shrink-0 flex items-center gap-1.5"
                >
                  {isLoadingAI ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Consulting AI...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Get AI Outfit & Colors</span>
                    </>
                  )}
                </button>
              </div>

              {/* Guarantees */}
              <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-stone-500 pt-4 border-t border-[#F2ECE1]">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#A07E4B]" />
                  <span>Complimentary express delivery over ₦100,000</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#A07E4B]" />
                  <span>14-day effortless returns & exchanges</span>
                </div>
              </div>
            </div>

            {/* Specification Tabs */}
            <div className="mt-6 pt-6 border-t border-[#F2ECE1]">
              <div className="flex items-center gap-6 border-b border-[#F2ECE1] pb-2 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-1 transition-colors ${
                    activeTab === 'details'
                      ? 'text-[#1A1A1A] border-b-2 border-[#A07E4B]'
                      : 'text-stone-400 hover:text-stone-700'
                  }`}
                >
                  Details & Tailoring
                </button>
                <button
                  onClick={() => setActiveTab('care')}
                  className={`pb-1 transition-colors ${
                    activeTab === 'care'
                      ? 'text-[#1A1A1A] border-b-2 border-[#A07E4B]'
                      : 'text-stone-400 hover:text-stone-700'
                  }`}
                >
                  Fabric & Sustainable Care
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`pb-1 transition-colors ${
                    activeTab === 'shipping'
                      ? 'text-[#1A1A1A] border-b-2 border-[#A07E4B]'
                      : 'text-stone-400 hover:text-stone-700'
                  }`}
                >
                  Shipping & Student Guarantee
                </button>
              </div>

              <div className="pt-3 text-xs text-stone-600 leading-relaxed">
                {activeTab === 'details' && (
                  <ul className="list-disc list-inside space-y-1.5">
                    {product.details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                )}
                {activeTab === 'care' && <p>{product.fabricCare}</p>}
                {activeTab === 'shipping' && (
                  <p>
                    All orders are dispatched in biodegradable luxury packaging with real tracking. Use
                    code <strong>STUDENT10</strong> at checkout for 10% off.
                  </p>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* AI OUTFIT SUGGESTIONS SECTION */}
        {(isLoadingAI || aiSuggestions) && (
          <div className="mt-12 bg-white rounded-3xl p-6 sm:p-10 border border-[#C5A880]/40 shadow-xl scroll-mt-24 animate-in fade-in slide-in-from-bottom-6 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#F2ECE1] gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#1A1A1A] text-[#C5A880] flex items-center justify-center shadow-md">
                  <Sparkles className="w-6 h-6 text-[#E6CDAA] animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-widest font-bold text-[#A07E4B]">
                      Gemini 3.8 Flash Styling Director
                    </span>
                    <span className="text-[10px] bg-[#E8DBBE] text-[#57402A] px-2 py-0.5 rounded font-mono font-semibold">
                      Live AI
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                    {aiSuggestions?.headline || `AI Outfit Formulas for ${product.name}`}
                  </h2>
                </div>
              </div>

              {onConsultStylistWithProduct && (
                <button
                  onClick={() => onConsultStylistWithProduct(product)}
                  className="px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#EAE3D6] text-xs font-semibold text-stone-700 hover:text-stone-900 hover:border-[#A07E4B] transition-colors self-start md:self-auto flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#A07E4B]" />
                  <span>Chat with Stylist About This Piece</span>
                </button>
              )}
            </div>

            {isLoadingAI ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full border-4 border-[#C5A880]/30 border-t-[#A07E4B] animate-spin mx-auto" />
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Curating Runway Combinations...
                </h3>
                <p className="text-xs text-stone-500 max-w-md mx-auto">
                  Our Gemini 3.8 Flash model is analyzing proportions, silhouette balance, and seasonal color harmonies for {product.name}.
                </p>
              </div>
            ) : aiSuggestions ? (
              <div className="space-y-8 mt-6">
                {/* Aesthetic Summary Banner */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D6] flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="max-w-2xl">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#A07E4B]">
                      Primary Aesthetic: {aiSuggestions.aesthetic}
                    </span>
                    <p className="text-xs sm:text-sm text-stone-700 mt-1 leading-relaxed">
                      {aiSuggestions.summary}
                    </p>
                  </div>

                  {aiSuggestions.colorHarmonies && (
                    <div className="shrink-0 bg-white p-3 rounded-xl border border-[#EAE3D6]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                        Color Harmonies
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {aiSuggestions.colorHarmonies.map((color, i) => (
                          <span
                            key={i}
                            className="text-xs bg-[#FAF8F5] text-stone-700 border border-[#EAE3D6] px-2 py-0.5 rounded-full font-medium"
                          >
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 3 Outfit Formulas Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {aiSuggestions.outfits.map((outfit, index) => (
                    <div
                      key={index}
                      className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D6] hover:border-[#C5A880] transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-[#1A1A1A] text-white px-2.5 py-1 rounded-full">
                            Formula {index + 1}
                          </span>
                          <span className="text-xs text-[#A07E4B] font-semibold">
                            {outfit.occasion}
                          </span>
                        </div>

                        <h3 className="font-serif text-lg font-bold text-[#1A1A1A] mb-2">
                          {outfit.title}
                        </h3>

                        <p className="text-xs text-stone-600 leading-relaxed mb-4">
                          {outfit.description}
                        </p>

                        <div className="space-y-1.5 mb-4">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                            Key Wardrobe Pieces:
                          </span>
                          <ul className="space-y-1">
                            {outfit.pieces.map((piece, pIdx) => (
                              <li
                                key={pIdx}
                                className="text-xs text-stone-800 flex items-start gap-1.5"
                              >
                                <span className="text-[#A07E4B] font-bold">•</span>
                                <span>{piece}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#EAE3D6] mt-2">
                        <div className="bg-white p-3 rounded-xl border border-[#EAE3D6]">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#A07E4B] block mb-1">
                            Stylist Pro-Tip:
                          </span>
                          <p className="text-xs text-stone-600 italic">
                            "{outfit.stylingTip}"
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footwear advice banner */}
                {aiSuggestions.footwearAdvice && (
                  <div className="p-4 rounded-2xl bg-stone-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#E8DBBE] font-bold">
                        Footwear & Silhouette Guidance
                      </span>
                      <p className="text-xs text-stone-300 mt-0.5">
                        {aiSuggestions.footwearAdvice}
                      </p>
                    </div>
                    <button
                      onClick={handleAddToCart}
                      className="px-5 py-2.5 rounded-xl bg-[#A07E4B] hover:bg-[#B6935C] text-white text-xs font-semibold shrink-0 transition-colors"
                    >
                      Add This Piece to Cart
                    </button>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        )}

      </div>
    </div>
  );
};
