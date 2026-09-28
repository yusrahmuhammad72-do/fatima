import React from 'react';
import { Sparkles, ShieldCheck, Truck, BookOpen, Phone, Mail, User } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string, params?: any) => void;
  onOpenDocs: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenDocs }) => {
  return (
    <footer className="bg-[#1A1A1A] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Features Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pb-12 border-b border-stone-800 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center text-[#C5A880]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">
                Complimentary Shipping
              </h5>
              <p className="text-stone-400">On all qualifying orders over ₦100,000</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center text-[#C5A880]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">
                Colors That Fit & AI Styling
              </h5>
              <p className="text-stone-400">Powered by Gemini 3.8 Flash</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center text-[#C5A880]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">
                Persistent Local Cart
              </h5>
              <p className="text-stone-400">State saved securely in Naira (₦)</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-12 border-b border-stone-800">
          
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#FAF8F5] text-[#1A1A1A] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#A07E4B]" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                STYLE<span className="text-[#C5A880] italic font-normal">AI</span>
              </span>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              An intelligent fashion atelier merging timeless capsule tailoring with real-time generative
              wardrobe styling and color analysis in Nigerian Naira (₦). Engineered as an academic student project.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenDocs}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900 border border-stone-700 text-xs font-semibold text-[#E8DBBE] hover:text-white hover:border-[#C5A880] transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>View Architecture & Project README</span>
              </button>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
              Collection & Features
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('catalogue', { category: 'Clothes' })}
                  className="hover:text-white transition-colors"
                >
                  Apparel & Tailoring
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalogue', { category: 'Shoes' })}
                  className="hover:text-white transition-colors"
                >
                  Footwear & Loafers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalogue', { category: 'Bags' })}
                  className="hover:text-white transition-colors"
                >
                  Handcrafted Bags
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalogue', { category: 'Accessories' })}
                  className="hover:text-white transition-colors"
                >
                  18k Gold Vermeil & Accessories
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('stylist')}
                  className="hover:text-white transition-colors flex items-center gap-1 text-[#E8DBBE]"
                >
                  <Sparkles className="w-3 h-3 text-[#C5A880]" />
                  <span>AI Stylist & Colors That Fit</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('builder')}
                  className="hover:text-white transition-colors"
                >
                  Interactive Outfit Canvas
                </button>
              </li>
            </ul>
          </div>

          {/* Developer Direct Contacts (Clickable Phone & Email) */}
          <div className="md:col-span-5 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
              Developer & Student Contacts
            </h4>
            
            <p className="text-xs text-stone-400 leading-relaxed">
              Have questions, feedback, or inquiries regarding this project? Reach out directly via phone or email:
            </p>

            <div className="space-y-2.5 pt-1">
              {/* Phone Link */}
              <a
                href="tel:07048467264"
                className="flex items-center gap-3 p-3 rounded-xl bg-stone-900 border border-stone-800 hover:border-[#C5A880] text-stone-200 hover:text-white transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#A07E4B]/20 text-[#C5A880] flex items-center justify-center shrink-0 group-hover:bg-[#A07E4B] group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">
                    Phone (Direct Call)
                  </span>
                  <span className="text-xs font-semibold tracking-wide font-mono text-[#E8DBBE] group-hover:underline">
                    07048467264
                  </span>
                </div>
              </a>

              {/* Email Link */}
              <a
                href="mailto:yusrahmuhammad72@gmail.com"
                className="flex items-center gap-3 p-3 rounded-xl bg-stone-900 border border-stone-800 hover:border-[#C5A880] text-stone-200 hover:text-white transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#A07E4B]/20 text-[#C5A880] flex items-center justify-center shrink-0 group-hover:bg-[#A07E4B] group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">
                    Email Address
                  </span>
                  <span className="text-xs font-semibold text-[#E8DBBE] truncate block group-hover:underline">
                    yusrahmuhammad72@gmail.com
                  </span>
                </div>
              </a>
            </div>

            <div className="p-3 bg-stone-900/60 rounded-xl border border-stone-800/80 text-[11px] text-stone-400">
              <span className="font-semibold text-white block mb-0.5">Student Voucher Code:</span>
              Use code <strong className="font-mono text-[#E8DBBE]">STUDENT10</strong> for 10% off, or <strong className="font-mono text-[#E8DBBE]">STYLEAI</strong> for ₦15,000 off.
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 StyleAI Atelier. Designed by Yusrah Muhammad. Academic portfolio release.</p>
          <div className="flex items-center gap-6">
            <a href="tel:07048467264" className="hover:text-stone-300 transition-colors">
              Tel: 07048467264
            </a>
            <a href="mailto:yusrahmuhammad72@gmail.com" className="hover:text-stone-300 transition-colors">
              yusrahmuhammad72@gmail.com
            </a>
            <button onClick={onOpenDocs} className="hover:text-stone-300 transition-colors">
              Docs
            </button>
            <button onClick={() => onNavigate('cart')} className="hover:text-stone-300 transition-colors">
              Bag
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
