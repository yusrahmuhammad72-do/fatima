import React from 'react';
import { Sparkles, Compass } from 'lucide-react';

interface AestheticQuizBannerProps {
  onSelectAesthetic: (aesthetic: string) => void;
}

export const AestheticQuizBanner: React.FC<AestheticQuizBannerProps> = ({ onSelectAesthetic }) => {
  const aesthetics = [
    {
      id: 'Quiet Luxury',
      name: 'Quiet Luxury',
      description: 'Understated elegance, neutral palettes, no visible logos, tailored linens.',
      tag: 'Neutral Tones • Fine Cashmere'
    },
    {
      id: 'Old Money',
      name: 'Old Money Classic',
      description: 'Pleated trousers, Italian leather horsebit loafers, crisp poplin collars.',
      tag: 'Heritage • Horsebit • Pleats'
    },
    {
      id: 'Parisian Chic',
      name: 'Parisian Chic',
      description: 'Bias-cut silk slips, sculptural kitten mules, Lake Como printed silk scarves.',
      tag: 'Effortless • Silk • Mules'
    },
    {
      id: 'Minimalist',
      name: 'Clean Minimalist',
      description: 'Architectural silhouettes, pristine low court sneakers, chunky gold hoops.',
      tag: 'Modern • Monochromatic'
    },
    {
      id: 'Evening Glam',
      name: 'Evening Glam',
      description: 'Luminous mulberry silks, statement sculptural clutches, golden vermeil.',
      tag: 'Cocktails • Soirée'
    }
  ];

  return (
    <section className="py-14 bg-[#FAF8F5] border-b border-[#EAE3D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A07E4B] mb-2">
              <Compass className="w-4 h-4" />
              <span>Aesthetic Matcher</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
              Define Your Signature Aesthetic
            </h2>
            <p className="text-stone-600 text-sm mt-1">
              Select your favorite style persona to personalize your catalogue recommendations instantly.
            </p>
          </div>
          <div className="text-xs text-stone-500 flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-[#EAE3D6] self-start md:self-auto">
            <Sparkles className="w-3.5 h-3.5 text-[#A07E4B]" />
            <span>Click any aesthetic to filter</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {aesthetics.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectAesthetic(item.id)}
              className="text-left p-5 rounded-2xl bg-white border border-[#EAE3D6] hover:border-[#A07E4B] hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A07E4B] block mb-1">
                  {item.tag}
                </span>
                <h3 className="font-serif text-lg font-bold text-[#1A1A1A] group-hover:text-[#A07E4B] transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-stone-500 mt-2 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-700 group-hover:text-[#1A1A1A]">
                <span>Explore Pieces</span>
                <span className="text-[#A07E4B] group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
