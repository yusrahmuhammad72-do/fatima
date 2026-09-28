import React, { useState, useMemo } from 'react';
import { Product, Category } from '../types';
import { ProductCard } from './ProductCard';
import { useWishlist } from '../context/WishlistContext';
import { Search, SlidersHorizontal, X, Heart, Sparkles, RotateCcw } from 'lucide-react';

interface CatalogueViewProps {
  products: Product[];
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
  onSelectProduct: (product: Product) => void;
  initialAesthetic?: string;
  initialWishlistOnly?: boolean;
}

export const CatalogueView: React.FC<CatalogueViewProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onSelectProduct,
  initialAesthetic,
  initialWishlistOnly = false
}) => {
  const { wishlist } = useWishlist();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAesthetic, setSelectedAesthetic] = useState<string>(initialAesthetic || 'All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [showWishlistOnly, setShowWishlistOnly] = useState<boolean>(initialWishlistOnly);
  const [maxPrice, setMaxPrice] = useState<number>(300000);

  const categories: Category[] = ['All', 'Clothes', 'Shoes', 'Bags', 'Accessories'];
  const aesthetics = [
    'All',
    'Quiet Luxury',
    'Old Money',
    'Parisian Chic',
    'Minimalist',
    'Modern Streetwear',
    'Evening Glam'
  ];

  const popularTags = ['linen', 'silk', 'leather', 'blazer', 'loafers', 'bag', 'gold'];

  // Filtering and sorting logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category check
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }

      // Aesthetic check
      if (selectedAesthetic !== 'All' && p.aesthetic !== selectedAesthetic) {
        return false;
      }

      // Wishlist check
      if (showWishlistOnly && !wishlist.includes(p.id)) {
        return false;
      }

      // Price check
      if (p.price > maxPrice) {
        return false;
      }

      // Search query check
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesCategory = p.category.toLowerCase().includes(query);
        const matchesTags = p.tags.some((t) => t.toLowerCase().includes(query));
        const matchesAesthetic = p.aesthetic.toLowerCase().includes(query);

        if (!matchesName && !matchesDesc && !matchesCategory && !matchesTags && !matchesAesthetic) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: featured first
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, selectedCategory, selectedAesthetic, showWishlistOnly, maxPrice, searchQuery, sortBy, wishlist]);

  const resetFilters = () => {
    onSelectCategory('All');
    setSelectedAesthetic('All');
    setSearchQuery('');
    setShowWishlistOnly(false);
    setMaxPrice(300000);
    setSortBy('featured');
  };

  return (
    <div className="py-10 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumbs / Title */}
        <div className="mb-8">
          <span className="text-xs uppercase tracking-widest text-[#A07E4B] font-semibold block mb-1">
            Curated Wardrobe Collection
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
            The Catalogue
          </h1>
          <p className="text-stone-600 text-sm mt-1 max-w-2xl">
            Explore timeless investment pieces crafted from premium natural fibres, fine Italian leathers,
            and 18k gold vermeil. Every item is paired with our intelligent AI Outfit Assistant.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl p-5 border border-[#EAE3D6] shadow-sm mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search linen, silk, loafers, bags, blazers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-[#FAF8F5] border border-[#EAE3D6] rounded-xl text-sm focus:outline-none focus:border-[#A07E4B] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Tag Pills */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              <span className="text-xs text-stone-400 font-medium mr-1 hidden sm:inline">Popular:</span>
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                    searchQuery.toLowerCase() === tag
                      ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                      : 'bg-[#FAF8F5] text-stone-600 border-[#EAE3D6] hover:border-[#A07E4B]'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>

            {/* Wishlist and Sort */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <button
                onClick={() => setShowWishlistOnly(!showWishlistOnly)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  showWishlistOnly
                    ? 'bg-rose-50 border-rose-200 text-rose-600 shadow-sm'
                    : 'bg-[#FAF8F5] border-[#EAE3D6] text-stone-600 hover:text-stone-900'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${showWishlistOnly ? 'fill-rose-500' : ''}`} />
                <span>Saved ({wishlist.length})</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-500 hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="text-xs py-2 px-3 bg-[#FAF8F5] border border-[#EAE3D6] rounded-xl focus:outline-none focus:border-[#A07E4B] text-stone-700 font-medium cursor-pointer"
                >
                  <option value="featured">Featured Curations</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-between pt-3 border-t border-[#F2ECE1] overflow-x-auto gap-2 scrollbar-none">
            <div className="flex items-center gap-2 shrink-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#1A1A1A] text-white shadow-sm'
                      : 'bg-[#FAF8F5] text-stone-600 hover:bg-[#F2ECE1] border border-[#EAE3D6]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Aesthetic Selector Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-stone-500 flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#A07E4B]" />
                <span className="hidden sm:inline">Aesthetic:</span>
              </span>
              <select
                value={selectedAesthetic}
                onChange={(e) => setSelectedAesthetic(e.target.value)}
                className="text-xs py-1.5 px-3 bg-[#FAF8F5] border border-[#EAE3D6] rounded-xl text-stone-700 font-medium focus:outline-none focus:border-[#A07E4B]"
              >
                {aesthetics.map((a) => (
                  <option key={a} value={a}>
                    {a === 'All' ? 'All Aesthetics' : a}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Info & Active Filters */}
        <div className="flex items-center justify-between mb-6 text-xs text-stone-500">
          <div>
            Showing <strong className="text-stone-900">{filteredProducts.length}</strong> of {products.length} pieces
            {selectedCategory !== 'All' && <span> in <strong>{selectedCategory}</strong></span>}
            {selectedAesthetic !== 'All' && <span> • <strong>{selectedAesthetic}</strong></span>}
            {showWishlistOnly && <span> • <strong>Saved Wishlist</strong></span>}
            {searchQuery && <span> • matching "<strong>{searchQuery}</strong>"</span>}
          </div>

          {(selectedCategory !== 'All' || selectedAesthetic !== 'All' || searchQuery || showWishlistOnly) && (
            <button
              onClick={resetFilters}
              className="text-[#A07E4B] hover:text-[#57402A] font-semibold flex items-center gap-1 hover:underline"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl p-12 text-center border border-[#EAE3D6] max-w-lg mx-auto my-12">
            <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#EAE3D6] text-stone-400 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-stone-300" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">No Matching Garments Found</h3>
            <p className="text-stone-500 text-sm mt-2">
              We couldn't find any pieces matching your current filters. Try relaxing your search terms or view our full collection.
            </p>
            <button
              onClick={resetFilters}
              className="mt-6 px-6 py-2.5 rounded-full bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-[#A07E4B] transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
