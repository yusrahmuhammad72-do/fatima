import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem } from '../types';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  image?: string;
  actionLabel?: string;
  onAction?: () => void;
}

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  promoCode: string;
  promoDiscountPercentage: number;
  promoFixedDiscount: number;
  isPromoValid: boolean;
  promoMessage: string;
  toasts: ToastMessage[];
  addToCart: (product: Product, quantity?: number, selectedSize?: string, selectedColor?: string) => void;
  updateQuantity: (productId: string, size?: string, color?: string, delta?: number) => void;
  removeFromCart: (productId: string, size?: string, color?: string) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  addToast: (msg: Omit<ToastMessage, 'id'>) => void;
  dismissToast: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'styleai_cart_ngn';
const PROMO_STORAGE_KEY = 'styleai_promo_ngn';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse cart from localStorage:', e);
    }
    // Default starter item in Nigerian Naira (₦)
    return [
      {
        product: {
          id: 'prod-1',
          name: 'Atelier Relaxed Linen Blazer',
          category: 'Clothes',
          price: 115000,
          originalPrice: 135000,
          rating: 4.9,
          reviewCount: 48,
          image: 'https://i.ibb.co/cK5PsVDL/Whats-App-Image-2026-09-26-at-5-51-06-PM.jpg',
          description: 'An effortlessly refined single-breasted blazer cut from breathable European washed linen.',
          details: ['100% Normandy washed flax linen'],
          fabricCare: '100% Linen',
          tags: ['linen', 'blazer', 'quiet-luxury'],
          sizes: ['XS', 'S', 'M', 'L', 'XL'],
          colors: [{ name: 'Oatmeal Sand', hex: '#D7CEBE' }],
          aesthetic: 'Quiet Luxury',
          inStock: true
        },
        quantity: 1,
        selectedSize: 'M',
        selectedColor: 'Oatmeal Sand'
      }
    ];
  });

  const [promoCode, setPromoCode] = useState<string>(() => {
    return localStorage.getItem(PROMO_STORAGE_KEY) || 'STUDENT10';
  });
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cart]);

  useEffect(() => {
    if (promoCode) {
      localStorage.setItem(PROMO_STORAGE_KEY, promoCode);
    } else {
      localStorage.removeItem(PROMO_STORAGE_KEY);
    }
  }, [promoCode]);

  const addToast = (msg: Omit<ToastMessage, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    const newToast: ToastMessage = { ...msg, id };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (product: Product, quantity = 1, selectedSize?: string, selectedColor?: string) => {
    const size = selectedSize || (product.sizes ? product.sizes[0] : 'Standard');
    const color = selectedColor || (product.colors ? product.colors[0].name : 'Default');

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      } else {
        return [...prev, { product, quantity, selectedSize: size, selectedColor: color }];
      }
    });

    addToast({
      message: `Added ${product.name} (${size}) to your bag! ₦${(product.price * quantity).toLocaleString()}`,
      type: 'success',
      image: product.image
    });
  };

  const updateQuantity = (productId: string, size?: string, color?: string, delta = 1) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (
            item.product.id === productId &&
            (!size || item.selectedSize === size) &&
            (!color || item.selectedColor === color)
          ) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const removeFromCart = (productId: string, size?: string, color?: string) => {
    let removedItem: CartItem | undefined;
    setCart((prev) => {
      removedItem = prev.find(
        (item) =>
          item.product.id === productId &&
          (!size || item.selectedSize === size) &&
          (!color || item.selectedColor === color)
      );
      return prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            (!size || item.selectedSize === size) &&
            (!color || item.selectedColor === color)
          )
      );
    });

    if (removedItem) {
      addToast({
        message: `Removed ${removedItem.product.name} from bag.`,
        type: 'info'
      });
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  // Promo handling (Naira-adapted)
  let promoDiscountPercentage = 0;
  let promoFixedDiscount = 0;
  let isPromoValid = false;
  let promoMessage = '';

  const cleanPromo = promoCode.trim().toUpperCase();
  if (cleanPromo === 'STUDENT10') {
    promoDiscountPercentage = 0.10;
    isPromoValid = true;
    promoMessage = '10% Student Project Discount Applied!';
  } else if (cleanPromo === 'STYLEAI' || cleanPromo === 'LUXE25') {
    promoFixedDiscount = 15000;
    isPromoValid = true;
    promoMessage = '₦15,000 StyleAI Voucher Applied!';
  } else if (cleanPromo === 'FREESHIP') {
    isPromoValid = true;
    promoMessage = 'Free Express Shipping Applied!';
  } else if (cleanPromo) {
    promoMessage = 'Invalid promo code. Try "STUDENT10" or "STYLEAI".';
  }

  const applyPromoCode = (code: string) => {
    const uppercase = code.trim().toUpperCase();
    if (uppercase === 'STUDENT10' || uppercase === 'STYLEAI' || uppercase === 'LUXE25' || uppercase === 'FREESHIP') {
      setPromoCode(uppercase);
      addToast({
        message: `Promo code ${uppercase} applied!`,
        type: 'success'
      });
      return true;
    } else {
      addToast({
        message: 'Invalid promo code. Try "STUDENT10" or "STYLEAI"',
        type: 'error'
      });
      return false;
    }
  };

  const removePromoCode = () => {
    setPromoCode('');
  };

  // Calculations in Naira (₦)
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  let discount = 0;
  if (isPromoValid) {
    if (promoDiscountPercentage > 0) {
      discount = Math.round(subtotal * promoDiscountPercentage);
    } else if (promoFixedDiscount > 0) {
      discount = Math.min(subtotal, promoFixedDiscount);
    }
  }

  // Shipping is free if subtotal >= ₦100,000 or code is FREESHIP or cart is empty, else ₦5,000
  const shipping = cart.length === 0 || subtotal >= 100000 || cleanPromo === 'FREESHIP' ? 0 : 5000;
  const taxableAmount = Math.max(0, subtotal - discount);
  // 7.5% Nigerian VAT
  const tax = taxableAmount > 0 ? Math.round(taxableAmount * 0.075) : 0;
  const total = Math.max(0, taxableAmount + shipping + tax);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        subtotal,
        discount,
        shipping,
        tax,
        total,
        promoCode,
        promoDiscountPercentage,
        promoFixedDiscount,
        isPromoValid,
        promoMessage,
        toasts,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyPromoCode,
        removePromoCode,
        addToast,
        dismissToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
