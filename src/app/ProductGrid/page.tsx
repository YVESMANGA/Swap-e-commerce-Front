type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
  };
  
  const products: Product[] = [
    {
      id: 1,
      name: "Huile de Baobab",
      price: 1299,
      image: "/images/b.jpg",
    },
    {
      id: 2,
      name: "Tisane Kinkeliba",
      price: 850,
      image: "/images/kin.jpg",
    },
    {
      id: 3,
      name: "Peigne en bois africain",
      price: 500,
      image: "/images/peigne.webp",
    },
    {
      id: 4,
      name: "T-shirt Made in Africa",
      price: 1999,
      image: "/images/t.jpg",
    },
    {
        id: 5,
        name: "short",
        price: 1999,
        image: "/images/t.jpg",
      },
      {
        id: 6,
        name: "Savon",
        price: 1999,
        image: "/images/t.jpg",
      },
      {
        id: 7,
        name: "Brosse à dents",
        price: 1999,
        image: "/images/t.jpg",
      },
        {
            id: 8,
                name: "Casquette",
                price: 1999,
                image: "/images/t.jpg",
            },
            {
                id: 9,
                    name: "Casquette",
                    price: 1999,
                    image: "/images/t.jpg",
                },
                {
                    id: 10,
                        name: "Casquette",
                        price: 1999,
                        image: "/images/t.jpg",
                    },
      
    // Ajoute d'autres produits...
  ];
  
  export default function ProductGrid() {
    return (
        <section className="p-4 sm:p-6 md:p-16 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="font-semibold text-lg text-center">{product.name}</h2>
              <p className="text-gray-600 mt-1 text-center">
                {product.price.toFixed(2)} Frcfa
              </p>
              <button className="mt-3 bg-blue-600 text-white px-4 py-2 text-sm rounded hover:bg-blue-700 mx-auto block">
                Ajouter au panier
              </button>
            </div>
          </div>
        ))}
      </section>
      
    );
  }
  