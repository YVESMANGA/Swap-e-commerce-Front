'use client';

import { useEffect, useState } from "react";
import { ShoppingCart, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation"; // App Router
import Link from "next/link";
import { useCart } from '@/hooks/useCart'; 



type Categorie = {
  id: number;
  name: string;
};

export default function Navbar() {
  const { cart } = useCart();

  // Somme des quantités
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/categories')
      .then(res => {
        if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur API:', err);
        setError("Impossible de charger les catégories");
        setLoading(false);
      });
  }, []);


  

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/&/g, "et")
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-800 shadow-md px-4 py-3 flex flex-wrap items-center justify-between gap-4">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold text-white hover:underline">
  SWAP
</Link>


      {/* Rayons + Dropdown */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center space-x-1 text-sm font-medium bg-white text-blue-800 px-3 py-2 rounded hover:bg-gray-100"
        >
          <span>Rayons</span>
          <ChevronDown className="w-4 h-4" />
        </button>

        {/* Menu déroulant */}
        {open && (
          <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded shadow-lg z-10">
            <ul className="py-1 text-sm text-gray-700">
              {loading && (
                <li className="px-4 py-2 text-gray-400">Chargement...</li>
              )}
              {error && (
                <li className="px-4 py-2 text-red-500">{error}</li>
              )}
              {!loading && !error && categories.map((cat) => (
                <li
                  key={cat.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    const slug = slugify(cat.name);
                    router.push(`/rayons/${slug}`);
                    setOpen(false);
                  }}
                >
                  {cat.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Recherche */}
      <div className="flex-grow md:flex-grow-0 w-full md:w-1/2">
        <input
          type="text"
          placeholder="Rechercher..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
        />
      </div>

      {/* Panier */}
      
      <Link href="/Cart" className="text-white relative">
        <ShoppingCart className="w-6 h-6 hover:text-gray-200 transition" />
     


        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
            {totalItems}
          </span>
        )}
      </Link>


    </nav>
  );
}
