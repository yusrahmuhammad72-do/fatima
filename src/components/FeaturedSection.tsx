import React, { useState } from 'react';
import { Product, Category } from '../types';
import { ProductCard } from './ProductCard';
import { Sparkles, ArrowRight } from 'lucide-react';

interface FeaturedSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onExploreCatalogue: () => void;
  onOpenQuickView: (product: Product) => void;
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  products,
  onSelectProduct,
  onExploreCatalogue,
  onOpenQuickView
}) => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filtered = products
    .filter((p) => activeCategory === 'All' || p.category === activeCategory)
    .slice(0, 4);

  const categories: Category[] = ['All', 'Clothes', 'Shoes', 'Bags', 'Accessories'];

  return (
    <section className="py-16 bg-[#FAF8F5] border-b border-[#EAE3D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#A07E4B] font-bold block mb-1">
              Curator’s Selection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
              Trending Capsule Essentials
            </h2>
            <p className="text-stone-600 text-sm mt-1">
              Hand-selected investment pieces engineered with natural drapes and generative AI pairings.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
                  activeCategory === cat
                    ? 'bg-[#1A1A1A] text-white shadow-sm'
                    : 'bg-white text-stone-600 border border-[#EAE3D6] hover:border-[#A07E4B]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 4-Item Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              onOpenQuickView={onOpenQuickView}
            />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={onExploreCatalogue}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white border border-[#D5C7B0] text-stone-900 font-semibold text-xs hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <span>Explore All 16 Collection Pieces</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
