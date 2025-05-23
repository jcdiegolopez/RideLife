import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import type { Product } from '../../utils/types';
import ProductCardInteractions from '../ProductList/ProductCardInteractions';

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
        <ProductCardInteractions product={product} isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
      </div>
    </Link>
  );
};

export default ProductCard;