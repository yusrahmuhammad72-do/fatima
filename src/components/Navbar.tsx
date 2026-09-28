import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Sparkles, ShoppingBag, Heart, Search, Menu, X, BookOpen, Layers } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string, params?: any) => void;
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'catalogue', label: 'Catalogue' },
    { id: 'stylist', label: 'AI Stylist', highlight: true, icon: Sparkles },
    { id: 'builder', label: 'Outfit Canvas', icon: Layers },
    { id: 'docs', label: 'Project Docs', icon: BookOpen, badge: 'Student' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#EAE3D6] transition-all">
      {/* Top Banner */}
      <div className="bg-[#1A1A1A] text-[#FAF8F5] text-xs py-1.5 px-4 text-center tracking-wider uppercase font-medium flex items-center justify-center gap-2">
        <span>✨ Welcome to StyleAI • Smart Outfit Assistant Powered by Gemini 3.8 Flash</span>
        <span className="hidden md:inline text-[#C5A880]">• Use code <strong>STUDENT10</strong> for 10% off</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 group text-left focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full bg-[#1A1A1A] text-[#C5A880] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5 text-[#E6CDAA]" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#1A1A1A] block">
                STYLE<span className="text-[#A07E4B] italic font-normal">AI</span>
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-stone-500 font-medium block -mt-1">
                Atelier & AI Stylist
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`text-sm font-medium transition-colors flex items-center gap-1.5 relative py-2 ${
                    isActive
                      ? 'text-[#1A1A1A] font-semibold'
                      : 'text-stone-600 hover:text-[#1A1A1A]'
                  }`}
                >
                  {Icon && (
                    <Icon
                      className={`w-4 h-4 ${
                        item.highlight ? 'text-[#A07E4B] animate-pulse' : 'text-stone-400'
                      }`}
                    />
                  )}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] bg-[#E8DBBE] text-[#57402A] px-1.5 py-0.5 rounded font-mono font-semibold">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A07E4B] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-3">
            {/* Quick Search trigger */}
            <button
              onClick={() => onNavigate('catalogue')}
              className="p-2.5 text-stone-600 hover:text-stone-900 hover:bg-[#F2ECE1] rounded-full transition-colors"
              title="Search Catalogue"
              aria-label="Search Catalogue"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => onNavigate('catalogue', { showWishlist: true })}
              className="p-2.5 text-stone-600 hover:text-stone-900 hover:bg-[#F2ECE1] rounded-full transition-colors relative"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Icon & Live Counter */}
            <button
              onClick={() => onNavigate('cart')}
              className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all ${
                currentPage === 'cart'
                  ? 'bg-[#1A1A1A] text-white shadow-md'
                  : 'bg-[#F2ECE1] text-[#1A1A1A] hover:bg-[#E8DFD1]'
              }`}
              title="View Shopping Bag"
              aria-label="Shopping Bag"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#A07E4B] text-white text-[10px] font-bold px-1.5 min-w-[18px] h-[18px] rounded-full flex items-center justify-center ring-2 ring-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold hidden sm:inline">Bag</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 hover:text-stone-900 rounded-md"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-[#EAE3D6] px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-[#1A1A1A] text-white'
                    : 'text-stone-700 hover:bg-[#F2ECE1]'
                }`}
              >
                <div className="flex items-center gap-3">
                  {Icon && <Icon className={`w-5 h-5 ${isActive ? 'text-[#C5A880]' : 'text-stone-500'}`} />}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-xs bg-[#E8DBBE] text-[#57402A] px-2 py-0.5 rounded font-mono font-semibold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
