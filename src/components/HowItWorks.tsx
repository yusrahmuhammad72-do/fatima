import React from 'react';
import { ShoppingBag, Sparkles, SlidersHorizontal, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onExplore: () => void;
  onLaunchStylist: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onExplore, onLaunchStylist }) => {
  const steps = [
    {
      step: '01',
      title: 'Discover Curated Staples',
      description: 'Explore an editorial collection across premium apparel, handcrafted leather footwear, artisanal bags, and gold vermeil accessories.',
      icon: ShoppingBag,
      tag: 'Capsule Essentials',
      action: onExplore,
      actionText: 'Browse Catalogue'
    },
    {
      step: '02',
      title: 'Generate AI Outfit Formulas',
      description: 'Click "AI Outfit Suggestions" on any piece to let Gemini 3.8 Flash craft three tailored runway-ready looks with occasion advice and color harmonies.',
      icon: Sparkles,
      tag: 'Gemini 3.8 Flash',
      action: onLaunchStylist,
      actionText: 'Ask the Stylist'
    },
    {
      step: '03',
      title: 'Mix, Match & Checkout',
      description: 'Fine-tune your ensemble on the interactive Virtual Outfit Canvas, test promo vouchers like STUDENT10, and experience a seamless checkout flow.',
      icon: SlidersHorizontal,
      tag: 'LocalStorage Cart',
      action: onExplore,
      actionText: 'Start Styling'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-[#EAE3D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#A07E4B] block mb-2">
            The StyleAI Philosophy
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
            How Your Personal Fashion Assistant Works
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Eliminate decision fatigue and style each garment with confidence. Designed with a clean
            architecture, client-server prompt engineering, and instant responsive feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative flex flex-col justify-between p-8 rounded-3xl bg-[#FAF8F5] border border-[#EAE3D6] hover:border-[#C5A880] transition-all duration-300 hover:shadow-lg group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-4xl font-bold text-[#D5C7B0] group-hover:text-[#A07E4B] transition-colors">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-white border border-[#EAE3D6] flex items-center justify-center text-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-white transition-all shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#8B6E3F] bg-[#F2ECE1] px-2.5 py-1 rounded-full mb-3">
                    {item.tag}
                  </span>

                  <h3 className="font-serif text-xl font-bold text-[#1A1A1A] mb-3">
                    {item.title}
                  </h3>

                  <p className="text-stone-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#EAE3D6]">
                  <button
                    onClick={item.action}
                    className="text-xs font-semibold text-[#1A1A1A] group-hover:text-[#A07E4B] flex items-center gap-1.5 transition-colors"
                  >
                    <span>{item.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
