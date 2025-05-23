import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";
import type { Product } from "../../utils/types";
import { FaHeart } from "react-icons/fa";
import ProductPrice from "../common/ProductPrice";

interface FavoriteItemProps {
  item: Product;
}

const FavoriteItem = ({ item }: FavoriteItemProps) => {
  const { toggleFavorite } = useContext(AppContext);

  return (
    <div className="flex items-center p-2 font-poppins">
      <Link to={`/product/${item.id}`} className="flex items-start flex-1">
   
        <div className="w-16 h-16 rounded overflow-hidden mr-2">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = 'https://via.placeholder.com/64?text=RideLife';
            }} 
          />
        </div>

        <ProductPrice
          price={item.price}
          discount={item.discount}
          size="sm"
        />
      </Link>
      
      <button 
        onClick={() => toggleFavorite(item.id)}
        className="hover:text-accent-pink text-accent-red"
      >
        <FaHeart size={20} />
      </button>
    </div>
  );
};

export default FavoriteItem;