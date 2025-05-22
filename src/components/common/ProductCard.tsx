import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import StarRating from './StarRating';
import AppContext from '../../context/AppContext';
import type { Product } from '../../utils/types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { favorites, toggleFavorite } = useContext(AppContext);
  const isFavorite = favorites.includes(product);

  return (
    <Link to={`/product/${product.id}`} className="font-poppins">
      <div className="bg-primary-dark rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
        <div className="relative h-48 rounded-lg overflow-hidden bg-secondary-dark">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).onerror = null;
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=RideLife';
            }}
          />
        </div>

        <div className="flex flex-col px-1 py-2 space-y-1">
          <div className="flex justify-between">
            <StarRating rating={product.rating} />
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite(product.id);
              }}
              className=""
            >
              {isFavorite ? (
                <FaHeart className="text-accent-red" />
              ) : (
                <FaRegHeart className="text-accent-pink hover:text-accent-red" />
              )}
            </button>
          </div>

          <h3 className="text-md p-0 m-0 truncate">{product.name}</h3>

          <div className="flex items-center justify-between p-0 m-0">
            <div>
              {product.discount ? (
                <div className="flex items-center gap-2 p-0 m-0">
                  <span className="text-accent-red font-bold">
                    ${product.price - (product.price * product.discount) / 100}
                  </span>
                  <span className="text-accent-pink line-through text-sm">
                    ${product.price}
                  </span>
                </div>
              ) : (
                <span className="font-bold">${product.price}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;