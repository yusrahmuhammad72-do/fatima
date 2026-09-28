import React, { useState } from 'react';
import {
  BookOpen,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  Download,
  ExternalLink,
  Terminal,
  Database,
  ShieldCheck,
  X
} from 'lucide-react';

interface StudentDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudentDocsModal: React.FC<StudentDocsModalProps> = ({ isOpen, onClose }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const samplePrompt = `{
  "model": "gemini-3.8-flash",
  "systemInstruction": "You are StyleAI, an elite Paris and Milan fashion consultant. Always return strictly valid JSON matching the requested schema.",
  "responseMimeType": "application/json",
  "responseSchema": {
    "type": "OBJECT",
    "properties": {
      "aesthetic": { "type": "STRING" },
      "headline": { "type": "STRING" },
      "summary": { "type": "STRING" },
      "outfits": {
        "type": "ARRAY",
        "items": {
          "type": "OBJECT",
          "properties": {
            "title": { "type": "STRING" },
            "occasion": { "type": "STRING" },
            "description": { "type": "STRING" },
            "pieces": { "type": "ARRAY", "items": { "type": "STRING" } },
            "stylingTip": { "type": "STRING" }
          }
        }
      },
      "colorHarmonies": { "type": "ARRAY", "items": { "type": "STRING" } },
      "footwearAdvice": { "type": "STRING" }
    }
  }
}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#EAE3D6] overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 bg-[#FAF8F5] border-b border-[#EAE3D6] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1A1A1A] text-[#C5A880] flex items-center justify-center shadow-md">
              <BookOpen className="w-5 h-5 text-[#E6CDAA]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl font-bold text-[#1A1A1A]">
                  Student Project Documentation & Architecture
                </span>
                <span className="text-[10px] bg-[#E8DBBE] text-[#57402A] px-2 py-0.5 rounded font-mono font-bold">
                  v1.0 Ready
                </span>
              </div>
              <p className="text-xs text-stone-500">
                StyleAI – AI Fashion & Outfit Assistant • Architecture, Prompts, LocalStorage & Deployment
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto">
          
          {/* Executive Overview */}
          <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#EAE3D6] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A07E4B]">
              <Sparkles className="w-4 h-4" />
              <span>Project Abstract</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              <strong>StyleAI</strong> is a high-fashion eCommerce and personal wardrobe styling
              assistant engineered as a comprehensive portfolio student project. It showcases modern full-stack
              principles: reactive component design, server-side Google Gemini 3.8 Flash SDK integration,
              persistent client-side storage, structured prompt engineering, and an editorial design system.
            </p>
          </div>

          {/* Key Competencies Matrix */}
          <div>
            <h3 className="font-serif text-lg font-bold text-[#1A1A1A] mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#A07E4B]" />
              <span>Core Engineering Pillars Demonstrated</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-[#EAE3D6] bg-white">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-900 mb-1">
                  <Cpu className="w-4 h-4 text-[#A07E4B]" />
                  <span>Google Gemini 3.8 Flash</span>
                </div>
                <p className="text-xs text-stone-600">
                  Server-side proxy routes for real-time outfit formulas, personal consultation chat, and outfit grading.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[#EAE3D6] bg-white">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-900 mb-1">
                  <Database className="w-4 h-4 text-[#A07E4B]" />
                  <span>LocalStorage State</span>
                </div>
                <p className="text-xs text-stone-600">
                  Cart items, active promo codes, and saved wishlist items persist across browser reloads.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[#EAE3D6] bg-white">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-900 mb-1">
                  <Code2 className="w-4 h-4 text-[#A07E4B]" />
                  <span>Prompt Engineering</span>
                </div>
                <p className="text-xs text-stone-600">
                  Strict JSON schema enforcement with system instructions, silhouette theory, and temperature controls.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Architecture */}
          <div>
            <h3 className="font-serif text-lg font-bold text-[#1A1A1A] mb-3 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#A07E4B]" />
              <span>System Architecture & API Flow</span>
            </h3>

            <div className="bg-stone-900 text-stone-200 p-4 rounded-2xl font-mono text-xs overflow-x-auto space-y-2">
              <p className="text-[#C5A880]">// Application Stack & Flow</p>
              <p>Client (React 19 + Tailwind v4 + Lucide)</p>
              <p>  ├── CartContext (localStorage: 'styleai_cart')</p>
              <p>  ├── WishlistContext (localStorage: 'styleai_wishlist')</p>
              <p>  └── API Fetch: POST /api/stylist/outfit-suggestions</p>
              <p>        │</p>
              <p>Express Full-Stack Server (server.ts)</p>
              <p>  ├── Protected GEMINI_API_KEY (Server-only)</p>
              <p>  ├── GoogleGenAI client (User-Agent: 'aistudio-build')</p>
              <p>  └── Model: 'gemini-3.8-flash' (JSON Mode Schema)</p>
            </div>
          </div>

          {/* Prompt Engineering Details */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-serif text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#A07E4B]" />
                <span>Gemini API Prompt & JSON Schema</span>
              </h3>
              <button
                onClick={() => copyToClipboard(samplePrompt, 'prompt')}
                className="text-xs text-[#A07E4B] hover:text-[#57402A] flex items-center gap-1 font-semibold"
              >
                {copiedSection === 'prompt' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === 'prompt' ? 'Copied!' : 'Copy Schema'}</span>
              </button>
            </div>

            <pre className="bg-[#FAF8F5] border border-[#EAE3D6] p-4 rounded-2xl text-xs font-mono text-stone-800 overflow-x-auto">
              {samplePrompt}
            </pre>
          </div>

          {/* LocalStorage Data Schema */}
          <div>
            <h3 className="font-serif text-lg font-bold text-[#1A1A1A] mb-3 flex items-center gap-2">
              <Database className="w-4 h-4 text-[#A07E4B]" />
              <span>LocalStorage Schemas</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#EAE3D6]">
                <strong className="text-stone-900 block mb-2 font-sans font-bold">Key: 'styleai_cart_ngn'</strong>
                <pre className="text-stone-700 whitespace-pre-wrap">
{`[
  {
    "product": { "id": "prod-1", "name": "...", "price": 115000 },
    "quantity": 1,
    "selectedSize": "M",
    "selectedColor": "Oatmeal Sand"
  }
]`}
                </pre>
              </div>

              <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#EAE3D6]">
                <strong className="text-stone-900 block mb-2 font-sans font-bold">Key: 'styleai_promo_ngn' & 'styleai_wishlist'</strong>
                <pre className="text-stone-700 whitespace-pre-wrap">
{`// Active promo string
"STUDENT10" // Gives 10% off
"STYLEAI"   // Gives ₦15,000 off

// Developer Contacts
Phone: 07048467264
Email: yusrahmuhammad72@gmail.com`}
                </pre>
              </div>
            </div>
          </div>

          {/* Grading Rubric & Setup */}
          <div className="bg-[#FAF6EF] p-5 rounded-2xl border border-[#E0D5C1] space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8B6E3F]">
              Student Submission & Demo Checklist
            </h4>
            <ul className="text-xs text-stone-700 space-y-1.5">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>1. Multi-page layout: Homepage, Filterable Catalogue, Product Details, Shopping Cart, AI Studio</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>2. AI Outfit & Colors That Fit engine backed by server-side Gemini 3.8 Flash</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>3. Currency in Nigerian Naira (₦) with realistic market pricing (₦42,000 – ₦165,000)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>4. Real localStorage Cart with size/color selection and working voucher codes (STUDENT10, STYLEAI)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>5. Clickable contacts in every page footer (Tel: 07048467264, Email: yusrahmuhammad72@gmail.com)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF8F5] border-t border-[#EAE3D6] flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-[#A07E4B] transition-colors"
          >
            Close Documentation
          </button>
        </div>

      </div>
    </div>
  );
};
