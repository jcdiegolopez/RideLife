import { useState, useContext } from "react";
import { FaHeart, FaRegHeart, FaMinus, FaPlus } from "react-icons/fa";
import type { Product } from "../../utils/types";
import AppContext from "../../context/AppContext";
import { BiCategory } from "react-icons/bi";

interface ProductInfoSectionProps {
  product: Product;
}

const ProductInfoSection = ({ product }: ProductInfoSectionProps) => {
  const [quantity, setQuantity] = useState(1);
  const { favorites, toggleFavorite, addToCart } = useContext(AppContext);

  const isFavorite = favorites.some((fav) => fav.id === product.id);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 9) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product, quantity);
    }
    setQuantity(1);
  };

  return (
    <div className="w-full md:w-1/2 space-y-6 font-poppins">
      <h1 className="text-3xl md:text-4xl font-bold text-white-custom">
        {product.name}
      </h1>

      <div className="flex items-center">
        {product.discount > 0 ? (
          <>
            <span className="text-accent-red font-semibold text-2xl">
              ${product.price - (product.price * product.discount) / 100}
            </span>
            <span className="text-accent-pink line-through text-lg ml-2">
              ${product.price}
            </span>
          </>
        ) : (
          <span className="font-semibold text-white-custom text-2xl">
            ${product.price}
          </span>
        )}
      </div>

      <button
        onClick={() => toggleFavorite(product.id)}
        className="flex items-center gap-2 bg-accent-red hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
      >
        {isFavorite ? (
          <FaHeart className="text-white" />
        ) : (
          <FaRegHeart className="text-white" />
        )}
        <span>{isFavorite ? "Remove from Favorite" : "Add to Favorite"}</span>
      </button>

      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-secondary-dark rounded-lg flex items-center justify-center text-white-custom">
          <BiCategory />
        </div>
        <div>
          <p className="text-white-custom font-medium text-sm">Category</p>
          <p className="text-accent-pink text-sm capitalize">
            {product.category}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white-custom">Quantity</h3>

        <div className="flex items-center justify-between">
          <span className="text-accent-pink">Item Quantity</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="w-8 h-8 bg-secondary-dark hover:bg-accent-pink disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center text-white transition-colors duration-200"
            >
              <FaMinus size={12} />
            </button>
            <span className="text-white-custom font-medium w-8 text-center">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= 9}
              className="w-8 h-8 bg-secondary-dark hover:bg-accent-pink disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center text-white transition-colors duration-200"
            >
              <FaPlus size={12} />
            </button>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full bg-accent-red hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductInfoSection;
