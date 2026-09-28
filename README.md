# StyleAI – AI Fashion & Outfit Assistant
> **Academic Student Portfolio Project**  
> An intelligent luxury fashion atelier & wardrobe consultant powered by Google Gemini 3.8 Flash, React, TypeScript, Tailwind CSS, Express, and persistent LocalStorage.

---

## 📞 Developer Contact & Inquiries
- **Developer**: Yusrah Muhammad
- **Phone**: [`07048467264`](tel:07048467264)
- **Email**: [`yusrahmuhammad72@gmail.com`](mailto:yusrahmuhammad72@gmail.com)

---

## 🌟 Project Overview

**StyleAI** bridges timeless couture design with next-generation generative AI. Designed as an academic showcase web application, StyleAI allows customers to discover curated capsule garments priced in **Nigerian Naira (₦)**, receive personalized outfit recommendations and **colors that fit** their specific skin undertones via **Gemini 3.8 Flash**, test combinations on an interactive Outfit Canvas, and complete orders with a local storage shopping cart and discount simulation.

---

## ✨ Features & Architecture

| Feature | Description |
|---|---|
| **Editorial Homepage** | Hero showcase, "How It Works" 3-step guide, trending capsule carousel, and Aesthetic Matcher. |
| **Filterable Catalogue** | Multi-category filtering (`Clothes`, `Shoes`, `Bags`, `Accessories`), aesthetic tagging (`Quiet Luxury`, `Old Money`, `Parisian Chic`, etc.), real-time keyword search, and sorting with prices in **₦ (Nigerian Naira)**. |
| **Colors That Fit & AI Outfits** | High-resolution multi-view gallery, fabric specifications, and the marquee **"AI Outfit & Colors"** feature that generates 3 complete runway formulas with skin undertone color palettes and styling tips. |
| **AI Stylist Studio** | Real-time interactive fashion and color consultation chat backed by **Gemini 3.8 Flash** with quick prompt pills. |
| **Interactive Outfit Canvas** | Visual 4-slot mannequin builder (Top + Bottom + Shoes + Bag) with automated AI silhouette & color scoring and critiques out of 10. |
| **Shopping Bag & LocalStorage** | Full persistence across browser refreshes (`styleai_cart_ngn`), live count badges, nationwide delivery threshold calculator (Free above ₦100,000), and discount codes (`STUDENT10`, `STYLEAI`). |
| **Demo Checkout & Digital Receipts** | 1-click test data auto-fill (with pre-filled phone `07048467264` & email `yusrahmuhammad72@gmail.com`), simulated Nigerian payment methods (Card, Bank Transfer, Apple Pay), and printable digital receipt with order reference. |
| **Footer Contacts on Every Page** | Clickable phone link (`tel:07048467264`) and email link (`mailto:yusrahmuhammad72@gmail.com`) accessible across every view. |

---

## 🏗️ Technical Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide React icons
- **Backend**: Node.js, Express, tsx
- **AI Integration**: `@google/genai` TypeScript SDK (Server-Side using model `gemini-3.8-flash`)
- **Currency**: Nigerian Naira (₦) with realistic market pricing (₦42,000 – ₦165,000)
- **State Management**: React Context API + LocalStorage (`styleai_cart_ngn`, `styleai_wishlist`, `styleai_promo_ngn`)
- **Styling**: Editorial typography (`Playfair Display`, `Cormorant Garamond`, `Inter`) with warm gold accents (`#C5A880`, `#1A1A1A`, `#FAF8F5`)

---

## 🚀 Setup & Local Execution

### 1. Environment Configuration
Copy the example environment file:
```bash
cp .env.example .env
```
Ensure your Gemini API key is configured:
```env
GEMINI_API_KEY="your_gemini_api_key_here"
```

### 2. Installation & Running
```bash
npm install
npm run dev
```
Open your browser to `http://localhost:3000` to interact with StyleAI.

---

## 🧠 Colors That Fit & Prompt Engineering

The server coordinates calls to Gemini 3.8 Flash through structured JSON schemas:

```json
{
  "model": "gemini-3.8-flash",
  "systemInstruction": "You are StyleAI, an elite fashion and color consultant. All prices must be in Nigerian Naira (₦). Ensure colors that fit are carefully calibrated for skin tones and garment textures.",
  "responseMimeType": "application/json"
}
```

The response includes:
- `aesthetic`: Defined style genre
- `headline`: Editorial article title with color focus
- `summary`: Wardrobe philosophy and ideal color palette that fits the garment
- `outfits`: Array of 3 looks with occasions, paired catalogue garments in ₦, and pro styling tips
- `colorHarmonies`: 4-5 complementary color shades tailored to the material and diverse skin tones
- `footwearAdvice`: Silhouette grounding recommendations

---

## 📄 License
Academic Portfolio Project • Designed by Yusrah Muhammad • Apache-2.0 License.
