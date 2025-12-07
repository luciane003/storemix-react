import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface ProductDetails {
    image: string;
    name: string;
    price: string;
    rating?: number;
}

interface DetailsProps {
    onAddToCart: (product: ProductDetails) => void;
}

export default function Details({ onAddToCart }: DetailsProps) {
    const descriptions: Record<string, string> = {
        "Batom Rouge Elegance": "Um batom vermelho intenso e elegante, perfeito para dar destaque aos lábios em qualquer ocasião.",
        "Poltrona Confort Luxe": "Poltrona confortável com design moderno, ideal para relaxar e complementar a decoração da sala.",
        "Caderno de Ideias Vintage": "Caderno com capa vintage e páginas de alta qualidade, perfeito para registrar suas ideias e anotações.",
        "Case para Fones Compact": "Proteja seus fones de ouvido com este case compacto, leve e resistente, fácil de transportar.",
        "Fone de Ouvido Gardner (com fio)": "Fone de ouvido com som cristalino e confortável, ótimo para ouvir música ou atender chamadas.",
        "Garrafa Térmica Urban": "Garrafa térmica elegante que mantém sua bebida quente ou fria por horas, ideal para o dia a dia.",
        "Luminária Dourada Minimal Light": "Luminária minimalista dourada, perfeita para iluminar ambientes com estilo e sofisticação.",
        "Vaso Transparente Serenity": "Vaso de vidro transparente elegante, ideal para flores e decoração de ambientes modernos."
    };

    const location = useLocation();
    const navigate = useNavigate();
    const [showMsg, setShowMsg] = useState(false);

    const product = location.state?.product as ProductDetails | undefined;

    if (!product) {
        return <p className="text-red-500 text-center mt-10">Produto não encontrado.</p>;
    }

    const handleAddToCartMsg = () => {
        onAddToCart(product);
        setShowMsg(true);

        setTimeout(() => setShowMsg(false), 2000)
    };

    return (
        <main className="bg-fundo flex flex-col items-center py-3 px-4">
            <div className="bg-card w-full max-w-md p-6 rounded-2xl shadow-md flex flex-col select-none">
                <div className="bg-white rounded-xl flex justify-center items-center p-4 shadow">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-48 h-64 object-contain"
                    />
                </div>

                <h2 className="text-2xl font-semibold text-texto mt-4 text-center">
                    {product.name}
                </h2>

                <p className="text-yellow-500 text-lg text-center mt-2">
                    {'★'.repeat(product.rating || 0)}
                    {'☆'.repeat(5 - (product.rating || 0))}
                </p>

                <p className="text-primario text-xl font-bold text-center mt-2">
                    {product.price}
                </p>

                <p className="text-textoSuave text-sm mt-3 leading-relaxed text-center">
                    {descriptions[product.name]}
                </p>

                <div className="flex flex-col gap-3 mt-6">

                    <button
                        onClick={handleAddToCartMsg}
                        className="bg-primario hover text-white w-full h-12 rounded-md font-semibold shadow-md hover:brightness-90 transition">
                        Adicionar ao carrinho
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        className="bg-transparent border border-primario
                text-primario w-full h-12 rounded-md hover:bg-primario hover:text-white transition">
                        Voltar
                    </button>

                </div>
            </div>

            {showMsg && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        bg-primario text-white px-6 py-3 rounded-lg shadow-lg animate-bounce text-center select-none text-[clamp(0.9rem,3.5vw,1.3rem)]">
                   Boas compras! 🎉
                </div>
            )}
        </main>
    )
}