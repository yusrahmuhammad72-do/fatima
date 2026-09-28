import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Cpu, ShoppingBag } from 'lucide-react';

interface HeroSectionProps {
  onExplore: () => void;
  onLaunchStylist: () => void;
  onOpenCanvas: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplore,
  onLaunchStylist,
  onOpenCanvas
}) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#EAE3D6]">
      {/* Background ambient gradient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E8DBBE]/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#C5A880]/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F2ECE1] border border-[#E0D5C1] text-xs font-semibold uppercase tracking-wider text-[#57402A]">
              <Sparkles className="w-3.5 h-3.5 text-[#A07E4B] animate-spin" style={{ animationDuration: '6s' }} />
              <span>Next-Generation Fashion Intelligence</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A1A1A] leading-[1.12]">
              Where Timeless Couture Meets{' '}
              <span className="italic font-normal text-[#A07E4B] underline decoration-[#E8DBBE] underline-offset-8">
                Generative AI
              </span>
            </h1>

            <p className="text-lg text-stone-600 max-w-xl font-normal leading-relaxed">
              Curate your dream wardrobe with <strong>StyleAI</strong>. Browse premium capsule staples,
              receive personalized outfit formulas from our <strong>Gemini 3.8 Flash</strong> stylist,
              and build runway-ready looks for every occasion.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExplore}
                className="px-7 py-3.5 rounded-full bg-[#1A1A1A] text-white font-medium text-sm hover:bg-[#A07E4B] shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Explore Catalogue</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onLaunchStylist}
                className="px-6 py-3.5 rounded-full bg-white text-[#1A1A1A] border border-[#D5C7B0] font-medium text-sm hover:bg-[#F2ECE1] shadow-sm hover:shadow transition-all duration-300 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#A07E4B]" />
                <span>Launch AI Stylist</span>
              </button>

              <button
                onClick={onOpenCanvas}
                className="px-5 py-3.5 text-xs uppercase tracking-wider font-semibold text-stone-600 hover:text-stone-900 transition-colors"
              >
                Interactive Outfit Canvas →
              </button>
            </div>

            {/* Trust & Project Highlights */}
            <div className="pt-6 border-t border-[#EAE3D6] grid grid-cols-3 gap-4 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#A07E4B] shrink-0" />
                <span>Powered by Gemini 3.8 Flash</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#A07E4B] shrink-0" />
                <span>Real localStorage Cart</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span>100% Student Project Ready</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-stone-100">
                <img
                  src="https://i.ibb.co/1xT65TH/Whats-App-Image-2026-09-26-at-6-10-59-PM.jpg"
                  alt="High fashion couture atelier tailor mannequin and Vogue editorial gallery"
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-xs uppercase tracking-widest text-[#E8DBBE] font-semibold">
                    Spring / Summer 2026 Edit
                  </span>
                  <h3 className="font-serif text-2xl font-bold mt-1">Quiet Luxury Capsule</h3>
                  <p className="text-xs text-stone-200 mt-1 line-clamp-2">
                    Effortless tailoring, Normandy flax linen, and Italian calfskin accessories.
                  </p>
                </div>
              </div>

              {/* Floating AI Recommendation Pill Card */}
              <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-[#EAE3D6] max-w-xs animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#8B6E3F]">
                  <Sparkles className="w-4 h-4 fill-[#C5A880] text-[#A07E4B]" />
                  <span>AI Styling Verdict</span>
                </div>
                <p className="text-xs text-stone-700 mt-1.5 font-medium leading-snug">
                  “Pair this tailored linen blazer with cream palazzo trousers and gold sculptural hoops for effortless Parisian charm.”
                </p>
                <div className="mt-2 flex items-center justify-between text-[11px] text-stone-500 pt-1.5 border-t border-stone-100">
                  <span>Match Score: 98%</span>
                  <span className="font-semibold text-emerald-600">Harmonious Silhouette</span>
                </div>
              </div>

              {/* Floating Price Tag */}
              <div className="absolute -top-4 -right-4 bg-[#1A1A1A] text-white py-2 px-3.5 rounded-full shadow-lg text-xs font-semibold flex items-center gap-1.5">
                <span>Free Express Shipping</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
