import { FaHeart, FaRegHeart } from "react-icons/fa";
import StarRating from "../common/StarRating";
import type { Product } from "../../utils/types";
import ProductPrice from "../common/ProductPrice";

interface ProductCardInteractionsProps {
  product: Product;
  toggleFavorite: (id: number) => void;
  isFavorite: boolean;
}

function ProductCardInteractions({
  product,
  toggleFavorite,
  isFavorite,
}: ProductCardInteractionsProps) {
  return (
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
      <ProductPrice
        price={product.price}
        discount={product.discount}
        size="md"/>
    </div>
  );
}

export default ProductCardInteractions;
