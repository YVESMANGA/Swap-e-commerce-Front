'use client';

import { useCart } from '@/hooks/useCart';
import Image from 'next/image';
import Link from 'next/link';

export default function PanierPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">🛒 Votre panier est vide</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Retour au catalogue
          </Link>
        </div>
        

      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Votre panier</h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.product_id}
            className="flex items-center justify-between border p-4 rounded shadow-sm"
          >
            <div className="flex items-center gap-4">
              {item.image && (
                <Image
                  src={item.image.trim()}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="rounded"
                />
              )}
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p>
                  {item.quantity} × {item.price.toFixed(2)} € ={' '}
                  <span className="font-medium">
                    {(item.quantity * item.price).toFixed(2)} €
                  </span>
                </p>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.product_id)}
              className="text-red-500 hover:text-red-700"
            >
              Retirer
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right">
        <p className="text-lg font-bold">
          Total : {total.toFixed(2)} €
        </p>

        <button
          onClick={() => {
            alert('Commande validée (non connecté au backend ici)');
            clearCart();
          }}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Commander
        </button>
      </div>

   
    </div>
  );
}
