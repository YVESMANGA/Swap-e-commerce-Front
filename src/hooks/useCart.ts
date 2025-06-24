'use client';

import { useEffect, useState } from 'react';

export type CartItem = {
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};




export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isReady, setIsReady] = useState(false); // 🟡 nouveau

  // Chargement initial depuis localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        try {
          setCart(JSON.parse(storedCart));
        } catch {
          setCart([]);
        }
      }
      setIsReady(true); // ✅ indique que le chargement est terminé
    }
  }, []);

  // Sauvegarde dans localStorage à chaque changement
  useEffect(() => {
    if (isReady) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isReady]);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(p => p.product_id === item.product_id);
      if (existing) {
        return prev.map(p =>
          p.product_id === item.product_id
            ? { ...p, quantity: p.quantity + item.quantity }
            : p
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(p => p.product_id !== productId));
  };

  const clearCart = () => setCart([]);

  return { cart, addToCart, removeFromCart, clearCart, isReady };
};
