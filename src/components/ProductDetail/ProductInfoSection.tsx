import { useState, useContext } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import type { Product } from "../../utils/types";
import AppContext from "../../context/AppContext";
import QuantitySelector from "./QuantitySelector";
import ProductCategory from "./ProductCategory";
import ProductPrice from "../common/ProductPrice";

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

      <ProductPrice
        price={product.price}
        discount={product.discount}
        size="lg"
      />

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

      <ProductCategory category={product.category} />
      <QuantitySelector
        quantity={quantity}
        handleQuantityChange={handleQuantityChange}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ProductInfoSection;
