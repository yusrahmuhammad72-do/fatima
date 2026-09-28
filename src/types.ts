export type Category = 'All' | 'Clothes' | 'Shoes' | 'Bags' | 'Accessories';

export interface Product {
  id: string;
  name: string;
  category: 'Clothes' | 'Shoes' | 'Bags' | 'Accessories';
  subCategory?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  alternateImages?: string[];
  description: string;
  details: string[];
  fabricCare: string;
  tags: string[];
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  aesthetic: 'Minimalist' | 'Quiet Luxury' | 'Old Money' | 'Parisian Chic' | 'Modern Streetwear' | 'Evening Glam';
  featured?: boolean;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface OutfitLook {
  title: string;
  occasion: string;
  description: string;
  pieces: string[];
  stylingTip: string;
}

export interface OutfitSuggestionResponse {
  aesthetic: string;
  headline: string;
  summary: string;
  outfits: OutfitLook[];
  colorHarmonies: string[];
  footwearAdvice: string;
}

export interface OutfitReview {
  score: number;
  verdict: string;
  review: string;
  strengths: string[];
  improvements: string[];
  suggestedOccasions: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestedFollowUps?: string[];
}

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  customer: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
  };
  date: string;
}
