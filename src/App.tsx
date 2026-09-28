import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { PRODUCTS } from './data/products';
import { Product, Category } from './types';

// Components
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HowItWorks } from './components/HowItWorks';
import { FeaturedSection } from './components/FeaturedSection';
import { AestheticQuizBanner } from './components/AestheticQuizBanner';
import { CatalogueView } from './components/CatalogueView';
import { ProductDetailView } from './components/ProductDetailView';
import { CartView } from './components/CartView';
import { AIStylistStudio } from './components/AIStylistStudio';
import { QuickViewModal } from './components/QuickViewModal';
import { StudentDocsModal } from './components/StudentDocsModal';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(PRODUCTS[0]);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [aestheticFilter, setAestheticFilter] = useState<string>('All');
  const [showWishlistOnly, setShowWishlistOnly] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isDocsOpen, setIsDocsOpen] = useState<boolean>(false);
  const [stylistInitialPrompt, setStylistInitialPrompt] = useState<string>('');

  // Scroll to top upon page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNavigate = (page: string, params?: any) => {
    if (page === 'docs') {
      setIsDocsOpen(true);
      return;
    }

    if (params) {
      if (params.category) setSelectedCategory(params.category);
      if (params.aesthetic) setAestheticFilter(params.aesthetic);
      if (params.showWishlist) setShowWishlistOnly(true);
      if (params.product) setSelectedProduct(params.product);
      if (params.prompt) setStylistInitialPrompt(params.prompt);
    } else {
      if (page === 'catalogue') {
        setShowWishlistOnly(false);
      }
    }

    setCurrentPage(page);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
  };

  const handleConsultStylistWithProduct = (product: Product) => {
    setStylistInitialPrompt(`How should I style the ${product.name} for an elegant evening dinner?`);
    setCurrentPage('stylist');
  };

  const handleSelectAestheticFromBanner = (aesthetic: string) => {
    setAestheticFilter(aesthetic);
    setSelectedCategory('All');
    setCurrentPage('catalogue');
  };

  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1A1A1A]">
          
          {/* Main Navigation */}
          <Navbar
            currentPage={currentPage}
            onNavigate={handleNavigate}
          />

          {/* View Routing */}
          <main className="flex-1">
            {currentPage === 'home' && (
              <>
                <HeroSection
                  onExplore={() => handleNavigate('catalogue')}
                  onLaunchStylist={() => handleNavigate('stylist')}
                  onOpenCanvas={() => handleNavigate('builder')}
                />
                <HowItWorks
                  onExplore={() => handleNavigate('catalogue')}
                  onLaunchStylist={() => handleNavigate('stylist')}
                />
                <FeaturedSection
                  products={PRODUCTS}
                  onSelectProduct={handleSelectProduct}
                  onExploreCatalogue={() => handleNavigate('catalogue')}
                  onOpenQuickView={(p) => setQuickViewProduct(p)}
                />
                <AestheticQuizBanner
                  onSelectAesthetic={handleSelectAestheticFromBanner}
                />
              </>
            )}

            {currentPage === 'catalogue' && (
              <CatalogueView
                products={PRODUCTS}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                onSelectProduct={handleSelectProduct}
                initialAesthetic={aestheticFilter}
                initialWishlistOnly={showWishlistOnly}
              />
            )}

            {currentPage === 'product' && selectedProduct && (
              <ProductDetailView
                product={selectedProduct}
                allProducts={PRODUCTS}
                onBack={() => handleNavigate('catalogue')}
                onSelectProduct={handleSelectProduct}
                onConsultStylistWithProduct={handleConsultStylistWithProduct}
              />
            )}

            {currentPage === 'cart' && (
              <CartView
                onExplore={() => handleNavigate('catalogue')}
                onSelectProduct={handleSelectProduct}
                onLaunchStylist={() => handleNavigate('stylist')}
              />
            )}

            {currentPage === 'stylist' && (
              <AIStylistStudio
                products={PRODUCTS}
                initialMode="chat"
                initialPrompt={stylistInitialPrompt}
                onSelectProduct={handleSelectProduct}
              />
            )}

            {currentPage === 'builder' && (
              <AIStylistStudio
                products={PRODUCTS}
                initialMode="builder"
                onSelectProduct={handleSelectProduct}
              />
            )}
          </main>

          {/* Global Footer */}
          <Footer
            onNavigate={handleNavigate}
            onOpenDocs={() => setIsDocsOpen(true)}
          />

          {/* Quick View Modal */}
          <QuickViewModal
            product={quickViewProduct}
            onClose={() => setQuickViewProduct(null)}
            onViewFullDetails={handleSelectProduct}
          />

          {/* Student Project Documentation Modal */}
          <StudentDocsModal
            isOpen={isDocsOpen}
            onClose={() => setIsDocsOpen(false)}
          />

          {/* Toast Notification Queue */}
          <ToastContainer />

        </div>
      </WishlistProvider>
    </CartProvider>
  );
}
