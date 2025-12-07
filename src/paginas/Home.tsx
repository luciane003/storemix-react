import ProductCard from '../componente/ProductCard';
import type { ProductCardProps } from '../componente/ProductCard';
import { useState } from 'react';
import { FaSearch } from "react-icons/fa";

const products: ProductCardProps[] = [
  {
    image: '/imagens/batom-vermelho.png',
    name: 'Batom Rouge Elegance',
    rating : 5,
    price: 'R$39,90',
  },
  {
    image: '/imagens/cadeira-confortavel.png',
    name: 'Poltrona Confort Luxe',
    rating: 4,
    price: 'R$499,90',
  },
  {
    image: '/imagens/caderno-anotacao.png',
    name: 'Caderno de Ideias Vintage',
    rating: 5,
    price: 'R$29,00',
  },
  {
    image: '/imagens/caixinha-de-fone-de-ouvido.png',
    name: 'Case para Fones Compact',
    rating: 4,
    price: 'R$39,90',
  },
  {
    image: '/imagens/fone-de-ouvido.png',
    name: 'Fone de Ouvido Gardner',
    rating: 5,
    price: 'R$69,79',
  },
  {
    image: '/imagens/garrafa-de-agua.png',
    name: 'Garrafa Térmica Urban',
    rating: 4,
    price: 'R$80,00',
  },
  {
    image: '/imagens/iluminaria.png',
    name: 'Luminária Dourada Minimal Light',
    rating: 5,
    price: 'R$140,90',
  },
  {
    image: '/imagens/vaso-de-planta.png',
    name: 'Vaso Transparente Serenity',
    rating: 4,
    price: 'R$45,90',
  },
]

export default function Home() {

  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="bg-fundo w-full min-h-screen p-10">
      <div className="flex items-center gap-2 mb-6 rounded-lg">
        <FaSearch className="text-primario text-xl" />
        <input
          type="text"
          placeholder="Buscar produto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-primarioHover/20 border border-primarioHover rounded-lg px-4 py-2 w-full max-w-sm focus:ring-2 focus:ring-primarioHover text-texto outline-none focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((item) =>(
           <ProductCard
              key={item.name}
              image={item.image}
              name={item.name}
              rating={item.rating}
              price={item.price}
            />
        ))}
      </div>
    </main>
  );
};