'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useCart } from '@/hooks/useCart'; 

type Produit = {
  id: number;
  name: string;
  price: number | string;
  image_url: string;
};

export default function PageCategorie() {
  const { slug } = useParams();
  const [produits, setProduits] = useState<Produit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categorieName, setCategorieName] = useState<string>('');

  const { addToCart } = useCart(); // ⬅️ Hook panier

  useEffect(() => {
    if (!slug) return;

    fetch(`http://localhost:8000/api/categories/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error('Erreur lors du chargement');
        return res.json();
      })
      .then(data => {
        setCategorieName(data.name);
        setProduits(Array.isArray(data.produits) ? data.produits : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Impossible de charger les produits');
        setLoading(false);
      });
  }, [slug]);

  // ⬇️ Nouvelle fonction : ajout au panier local
  const handleAddToCart = (product: Produit) => {
    const priceNum = typeof product.price === 'number'
      ? product.price
      : Number(product.price);

    addToCart({
      product_id: product.id,
      name: product.name,
      price: priceNum,
      quantity: 1,
      image: `http://localhost:8000${product.image_url}`.trim(),
    });

    alert('Produit ajouté au panier !');
  };

  if (loading) {
    return <p className="text-center p-4">Chargement des produits...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600 p-4">{error}</p>;
  }

  return (
    <div className="p-4 sm:p-6 md:p-16">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-800">
        {categorieName}
      </h1>

      <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {produits.length > 0 ? (
          produits.map((product) => {
            const priceNum = typeof product.price === 'number'
              ? product.price
              : Number(product.price);
            const priceAffiche = isNaN(priceNum) ? 'N/A' : priceNum.toFixed(2);

            return (
              <div
                key={product.id}
                className="rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition"
              >
                <img
                  src={`http://localhost:8000${product.image_url}`.trim()}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h2 className="font-semibold text-lg text-center">{product.name}</h2>
                  <p className="text-gray-600 mt-1 text-center">{priceAffiche} FCFA</p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-3 bg-blue-600 text-white px-4 py-2 text-sm rounded hover:bg-blue-700 mx-auto block"
                  >
                    Ajouter au panier
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="col-span-full text-center text-gray-500">
            Aucun produit disponible pour cette catégorie.
          </p>
        )}
      </section>
    </div>
  );
}
