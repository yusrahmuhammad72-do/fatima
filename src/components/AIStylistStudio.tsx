import React, { useState } from 'react';
import { Product, ChatMessage, OutfitReview } from '../types';
import { useCart } from '../context/CartContext';
import {
  Sparkles,
  Send,
  Layers,
  MessageSquare,
  ThumbsUp,
  RefreshCw,
  Plus,
  ShoppingBag,
  Award,
  Sliders,
  Check,
  ChevronRight
} from 'lucide-react';

interface AIStylistStudioProps {
  products: Product[];
  initialMode?: 'chat' | 'builder';
  initialPrompt?: string;
  onSelectProduct: (product: Product) => void;
}

export const AIStylistStudio: React.FC<AIStylistStudioProps> = ({
  products,
  initialMode = 'chat',
  initialPrompt,
  onSelectProduct
}) => {
  const { addToCart, addToast } = useCart();

  const [activeTab, setActiveTab] = useState<'chat' | 'builder'>(initialMode);

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      role: 'assistant',
      content:
        "Bonjour! I am your personal StyleAI wardrobe and color consultant. Tell me about an upcoming occasion, ask for colors that fit your skin undertones, or explore capsule wardrobe pairings in Nigerian Naira (₦).",
      timestamp: 'Just now',
      suggestedFollowUps: [
        'Which colors fit warm golden undertones best?',
        'How to style a linen blazer under ₦120,000?',
        'Create a 5-piece Old Money capsule wardrobe in ₦'
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState(initialPrompt || '');
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Outfit Canvas / Builder State
  const [selectedTop, setSelectedTop] = useState<Product | null>(
    products.find((p) => p.name.includes('Blazer')) || products[0]
  );
  const [selectedBottom, setSelectedBottom] = useState<Product | null>(
    products.find((p) => p.name.includes('Skirt') || p.name.includes('Denim')) || products[1]
  );
  const [selectedShoes, setSelectedShoes] = useState<Product | null>(
    products.find((p) => p.category === 'Shoes') || products[4]
  );
  const [selectedBag, setSelectedBag] = useState<Product | null>(
    products.find((p) => p.category === 'Bags') || products[7]
  );

  const [occasion, setOccasion] = useState('Gallery Opening & Rooftop Drinks');
  const [fitReview, setFitReview] = useState<OutfitReview | null>(null);
  const [isReviewLoading, setIsReviewLoading] = useState(false);

  // Quick Prompt Pills
  const promptPills = [
    'What colors fit best for deep melanin skin?',
    'Old Money capsule wardrobe under ₦300,000',
    'Best shoes for high-waisted palazzo trousers',
    'Chic minimalist outfit for a creative presentation',
    'How to mix silk with structured tailoring'
  ];

  const occasionsList = [
    'Gallery Opening & Rooftop Drinks',
    'Casual Weekend Brunch in Paris',
    'Creative Office Presentation',
    'Summer Destination Wedding Guest',
    'First Date at an Intimate Wine Bar',
    'First-Class Travel & Airport Chic'
  ];

  // Handle Chat Submit
  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || isChatLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: query.trim(),
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/stylist/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          userPreferences: {
            preferredAesthetic: 'Quiet Luxury & Old Money',
            currency: 'USD'
          }
        })
      });

      const data = await response.json();

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply,
        timestamp: 'Just now',
        suggestedFollowUps: data.suggestedFollowUps
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content:
            'A great silhouette relies on balanced proportions: combine tailored structured pieces with relaxed fluid textures. Pair our Atelier Linen Blazer with high-waist palazzo trousers and brushed horsebit loafers.',
          timestamp: 'Just now',
          suggestedFollowUps: [
            'How to style for weekend brunch?',
            'What accessories finish this look?'
          ]
        }
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Handle Rate My Fit in the Builder
  const handleRateFit = async () => {
    const items = [selectedTop, selectedBottom, selectedShoes, selectedBag].filter(Boolean) as Product[];
    if (items.length === 0) return;

    setIsReviewLoading(true);
    setFitReview(null);

    try {
      const response = await fetch('/api/stylist/rate-fit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          outfitItems: items,
          occasion
        })
      });

      const data = await response.json();
      setFitReview(data);
    } catch (err) {
      console.error('Fit review error:', err);
      setFitReview({
        score: 9.3,
        verdict: 'Effortless Editorial Harmony',
        review:
          'This ensemble masters balanced proportions: the relaxed tailoring of the blazer is grounded by the fluid drape of the trousers and refined leather hardware.',
        strengths: [
          'Harmonious neutral palette',
          'Rich juxtaposition of linen and calfskin',
          'Flattering high-waisted focal point'
        ],
        improvements: [
          'Add a delicate gold collar or chunky hoops for subtle warmth',
          'Leave the blazer unbuttoned to maintain fluid movement'
        ],
        suggestedOccasions: ['Rooftop Cocktails', 'Art Gallery Opening']
      });
    } finally {
      setIsReviewLoading(false);
    }
  };

  const handleAddEntireLookToBag = () => {
    const items = [selectedTop, selectedBottom, selectedShoes, selectedBag].filter(Boolean) as Product[];
    items.forEach((item) => {
      addToCart(item, 1);
    });
    addToast({
      message: `Added all ${items.length} curated pieces to your shopping bag!`,
      type: 'success'
    });
  };

  return (
    <div className="py-10 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-[#A07E4B] font-bold">
                Atelier AI Studio
              </span>
              <span className="text-[10px] bg-[#E8DBBE] text-[#57402A] px-2 py-0.5 rounded font-mono font-semibold">
                Gemini 3.8 Flash
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A] mt-1">
              Your Personal AI Stylist
            </h1>
            <p className="text-stone-600 text-sm mt-1 max-w-xl">
              Consult with our generative fashion intelligence in real-time or compose runway-ready
              looks on the interactive Outfit Canvas with instant AI grading.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center p-1.5 bg-white rounded-2xl border border-[#EAE3D6] shadow-sm self-start md:self-auto">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'chat'
                  ? 'bg-[#1A1A1A] text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>AI Fashion Consultant</span>
            </button>

            <button
              onClick={() => setActiveTab('builder')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'builder'
                  ? 'bg-[#1A1A1A] text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Interactive Outfit Canvas</span>
            </button>
          </div>
        </div>

        {/* TAB 1: AI FASHION CONSULTANT CHAT */}
        {activeTab === 'chat' && (
          <div className="bg-white rounded-3xl border border-[#EAE3D6] shadow-sm overflow-hidden flex flex-col h-[750px] max-h-[85vh]">
            
            {/* Chat Header Bar */}
            <div className="p-4 px-6 bg-[#FAF8F5] border-b border-[#EAE3D6] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1A1A1A] text-[#C5A880] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#E6CDAA]" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold text-stone-900">StyleAI Director</h3>
                  <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Online & Grounded in Editorial Fashion
                  </span>
                </div>
              </div>

              <span className="text-xs text-stone-500 font-mono hidden sm:inline">
                Model: gemini-3.8-flash
              </span>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-2xl ${
                    msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === 'user'
                        ? 'bg-[#A07E4B] text-white'
                        : 'bg-[#1A1A1A] text-[#C5A880]'
                    }`}
                  >
                    {msg.role === 'user' ? 'You' : <Sparkles className="w-4 h-4" />}
                  </div>

                  <div className="space-y-2">
                    <div
                      className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[#1A1A1A] text-white rounded-tr-none'
                          : 'bg-[#FAF8F5] text-stone-800 border border-[#EAE3D6] rounded-tl-none'
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.content}</p>
                    </div>

                    {/* Follow-up suggestions */}
                    {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {msg.suggestedFollowUps.map((prompt, pIdx) => (
                          <button
                            key={pIdx}
                            onClick={() => handleSendMessage(prompt)}
                            className="text-[11px] bg-white border border-[#EAE3D6] hover:border-[#A07E4B] text-stone-700 hover:text-[#1A1A1A] px-2.5 py-1 rounded-full transition-colors flex items-center gap-1 shadow-2xs"
                          >
                            <span>{prompt}</span>
                            <ChevronRight className="w-3 h-3 text-[#A07E4B]" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isChatLoading && (
                <div className="flex items-center gap-3 text-stone-500 text-xs py-2">
                  <div className="w-8 h-8 rounded-full bg-[#1A1A1A] text-[#C5A880] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 animate-spin" />
                  </div>
                  <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-[#EAE3D6] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A07E4B] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A07E4B] animate-bounce delay-100" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A07E4B] animate-bounce delay-200" />
                    <span className="ml-1 text-[11px] font-medium text-stone-600">
                      Curating styling formula...
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Inspiration Pills */}
            <div className="p-3 bg-[#FAF8F5] border-t border-[#EAE3D6] overflow-x-auto scrollbar-none flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 shrink-0">
                Inspiration:
              </span>
              {promptPills.map((pill, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(pill)}
                  className="text-xs bg-white text-stone-700 hover:text-stone-900 border border-[#EAE3D6] hover:border-[#A07E4B] px-3 py-1 rounded-full shrink-0 transition-colors"
                >
                  {pill}
                </button>
              ))}
            </div>

            {/* Chat Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-4 bg-white border-t border-[#EAE3D6] flex gap-3"
            >
              <input
                type="text"
                placeholder="Ask about dress codes, styling a piece, or matching colors..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={isChatLoading}
                className="flex-1 py-3 px-4 bg-[#FAF8F5] border border-[#EAE3D6] rounded-2xl text-xs sm:text-sm focus:outline-none focus:border-[#A07E4B]"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isChatLoading}
                className="px-5 py-3 rounded-2xl bg-[#1A1A1A] hover:bg-[#A07E4B] text-white text-xs font-semibold shadow-md transition-all disabled:opacity-40 flex items-center gap-1.5"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: INTERACTIVE OUTFIT CANVAS */}
        {activeTab === 'builder' && (
          <div className="space-y-8">
            
            {/* Occasion & Controls Bar */}
            <div className="bg-white p-6 rounded-3xl border border-[#EAE3D6] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A07E4B] block mb-1">
                  Step 1: Select Event Context
                </span>
                <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
                  Target Styling Occasion
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {occasionsList.map((occ) => (
                  <button
                    key={occ}
                    onClick={() => setOccasion(occ)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                      occasion === occ
                        ? 'bg-[#1A1A1A] text-white shadow-sm'
                        : 'bg-[#FAF8F5] text-stone-600 border border-[#EAE3D6] hover:border-[#A07E4B]'
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>

            {/* The 4-Piece Mannequin Canvas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Slot 1: Top / Outerwear */}
              <div className="bg-white rounded-3xl p-5 border border-[#EAE3D6] shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#FAF8F5] px-2.5 py-1 rounded-full text-[#A07E4B] border border-[#EAE3D6]">
                      01 • Top / Blazer
                    </span>
                    <span className="text-xs font-bold text-stone-900">${selectedTop?.price}</span>
                  </div>

                  {selectedTop && (
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#FAF8F5] mb-3 border border-stone-100">
                      <img
                        src={selectedTop.image}
                        alt={selectedTop.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <h4 className="font-serif text-sm font-bold text-stone-900 line-clamp-1">
                    {selectedTop?.name}
                  </h4>
                  <p className="text-[11px] text-stone-500 line-clamp-1">{selectedTop?.aesthetic}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100">
                  <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">
                    Swap Garment:
                  </label>
                  <select
                    value={selectedTop?.id}
                    onChange={(e) =>
                      setSelectedTop(products.find((p) => p.id === e.target.value) || null)
                    }
                    className="w-full text-xs py-1.5 px-2 bg-[#FAF8F5] border border-[#EAE3D6] rounded-xl text-stone-700 font-medium"
                  >
                    {products
                      .filter((p) => p.category === 'Clothes')
                      .map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} (₦{p.price.toLocaleString()})
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Slot 2: Bottom / Trousers / Skirt */}
              <div className="bg-white rounded-3xl p-5 border border-[#EAE3D6] shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#FAF8F5] px-2.5 py-1 rounded-full text-[#A07E4B] border border-[#EAE3D6]">
                      02 • Bottom / Silhouette
                    </span>
                    <span className="text-xs font-bold text-stone-900">
                      ₦{selectedBottom ? selectedBottom.price.toLocaleString() : '0'}
                    </span>
                  </div>

                  {selectedBottom && (
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#FAF8F5] mb-3 border border-stone-100">
                      <img
                        src={selectedBottom.image}
                        alt={selectedBottom.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <h4 className="font-serif text-sm font-bold text-stone-900 line-clamp-1">
                    {selectedBottom?.name}
                  </h4>
                  <p className="text-[11px] text-stone-500 line-clamp-1">{selectedBottom?.aesthetic}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100">
                  <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">
                    Swap Garment:
                  </label>
                  <select
                    value={selectedBottom?.id}
                    onChange={(e) =>
                      setSelectedBottom(products.find((p) => p.id === e.target.value) || null)
                    }
                    className="w-full text-xs py-1.5 px-2 bg-[#FAF8F5] border border-[#EAE3D6] rounded-xl text-stone-700 font-medium"
                  >
                    {products
                      .filter((p) => p.category === 'Clothes')
                      .map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} (₦{p.price.toLocaleString()})
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Slot 3: Footwear */}
              <div className="bg-white rounded-3xl p-5 border border-[#EAE3D6] shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#FAF8F5] px-2.5 py-1 rounded-full text-[#A07E4B] border border-[#EAE3D6]">
                      03 • Footwear
                    </span>
                    <span className="text-xs font-bold text-stone-900">
                      ₦{selectedShoes ? selectedShoes.price.toLocaleString() : '0'}
                    </span>
                  </div>

                  {selectedShoes && (
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#FAF8F5] mb-3 border border-stone-100">
                      <img
                        src={selectedShoes.image}
                        alt={selectedShoes.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <h4 className="font-serif text-sm font-bold text-stone-900 line-clamp-1">
                    {selectedShoes?.name}
                  </h4>
                  <p className="text-[11px] text-stone-500 line-clamp-1">{selectedShoes?.aesthetic}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100">
                  <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">
                    Swap Shoe:
                  </label>
                  <select
                    value={selectedShoes?.id}
                    onChange={(e) =>
                      setSelectedShoes(products.find((p) => p.id === e.target.value) || null)
                    }
                    className="w-full text-xs py-1.5 px-2 bg-[#FAF8F5] border border-[#EAE3D6] rounded-xl text-stone-700 font-medium"
                  >
                    {products
                      .filter((p) => p.category === 'Shoes')
                      .map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} (₦{p.price.toLocaleString()})
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Slot 4: Handbag / Accessory */}
              <div className="bg-white rounded-3xl p-5 border border-[#EAE3D6] shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#FAF8F5] px-2.5 py-1 rounded-full text-[#A07E4B] border border-[#EAE3D6]">
                      04 • Bag / Accent
                    </span>
                    <span className="text-xs font-bold text-stone-900">
                      ₦{selectedBag ? selectedBag.price.toLocaleString() : '0'}
                    </span>
                  </div>

                  {selectedBag && (
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#FAF8F5] mb-3 border border-stone-100">
                      <img
                        src={selectedBag.image}
                        alt={selectedBag.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <h4 className="font-serif text-sm font-bold text-stone-900 line-clamp-1">
                    {selectedBag?.name}
                  </h4>
                  <p className="text-[11px] text-stone-500 line-clamp-1">{selectedBag?.aesthetic}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100">
                  <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">
                    Swap Bag / Jewel:
                  </label>
                  <select
                    value={selectedBag?.id}
                    onChange={(e) =>
                      setSelectedBag(products.find((p) => p.id === e.target.value) || null)
                    }
                    className="w-full text-xs py-1.5 px-2 bg-[#FAF8F5] border border-[#EAE3D6] rounded-xl text-stone-700 font-medium"
                  >
                    {products
                      .filter((p) => p.category === 'Bags' || p.category === 'Accessories')
                      .map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} (₦{p.price.toLocaleString()})
                        </option>
                      ))}
                  </select>
                </div>
              </div>

            </div>

            {/* Total Look Pricing & Rating Action */}
            <div className="bg-white p-6 rounded-3xl border border-[#EAE3D6] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-stone-500 block">Complete 4-Piece Ensemble Price</span>
                <span className="font-serif text-2xl font-bold text-stone-900">
                  ₦
                  {(
                    (selectedTop?.price || 0) +
                    (selectedBottom?.price || 0) +
                    (selectedShoes?.price || 0) +
                    (selectedBag?.price || 0)
                  ).toLocaleString()}
                </span>
                <span className="text-[11px] text-emerald-700 ml-2 font-medium">
                  • Qualifies for Free Express Delivery
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleRateFit}
                  disabled={isReviewLoading}
                  className="px-6 py-3 rounded-2xl bg-[#1A1A1A] hover:bg-[#A07E4B] text-white text-xs font-semibold shadow-lg transition-all flex items-center gap-2"
                >
                  {isReviewLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Grading Silhouette with Gemini...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#C5A880]" />
                      <span>Rate My Fit with Gemini AI</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleAddEntireLookToBag}
                  className="px-6 py-3 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D6] hover:border-[#A07E4B] text-stone-900 text-xs font-semibold transition-colors flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Entire Look to Bag</span>
                </button>
              </div>
            </div>

            {/* AI Fit Review Report Card */}
            {fitReview && (
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#C5A880]/50 shadow-xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#F2ECE1] gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#1A1A1A] text-[#C5A880] flex flex-col items-center justify-center shadow-md">
                      <span className="font-serif text-2xl font-bold leading-none">
                        {fitReview.score}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-stone-300 font-sans">
                        / 10
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#A07E4B]">
                        Gemini Runway Verdict
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                        {fitReview.verdict}
                      </h3>
                      <p className="text-xs text-stone-500">Evaluated for: {occasion}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-[#FAF8F5] px-4 py-2 rounded-xl border border-[#EAE3D6] self-start sm:self-auto">
                    <Award className="w-4 h-4 text-[#A07E4B]" />
                    <span className="text-xs font-semibold text-stone-800">
                      Editorial Grade: A+
                    </span>
                  </div>
                </div>

                <p className="text-stone-700 text-sm leading-relaxed">
                  {fitReview.review}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D6]">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-2">
                      Key Silhouette Strengths
                    </span>
                    <ul className="space-y-1.5">
                      {fitReview.strengths.map((str, i) => (
                        <li key={i} className="text-xs text-stone-700 flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D6]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#A07E4B] block mb-2">
                      Pro Styling Tweaks
                    </span>
                    <ul className="space-y-1.5">
                      {fitReview.improvements.map((imp, i) => (
                        <li key={i} className="text-xs text-stone-700 flex items-start gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-[#A07E4B] shrink-0 mt-0.5" />
                          <span>{imp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
