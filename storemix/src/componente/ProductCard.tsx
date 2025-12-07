import { Link } from 'react-router-dom';

export interface ProductCardProps {
    image: string;
    name: string;
    price: string;
ratin: number;
}

function ProductCard({ image, name, rating, price  }: ProductCardProps) {

    return (
        <Link
            to={`/details/${name}`}
            state={{ product: { name, image, rating, price } }} >

            <div className="bg-card w-full h-full rounded-xl p-4 shadow-md hover:shadow-lg transition-transform hover:scale-105 border border-black/5">

                <div className="bg-fundo rounded-lg flex items-center justify-center p-3">
                    <img 
                        src={image} 
                        alt={name} 
                        className="w-28 h-40 object-contain" 
                    />
                </div>

                <h2 className="text-texto font-semibold text-lg mt-3">
                    {name}
                </h2>

                <p className="text-yellow-400 text-sm mt-1">
                    {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
                </p>

                <p className="text-primario font-bold text-right text-base mt-3">
                    {price}
                </p>
            </div>
        </Link>

    );
}

export default ProductCard;