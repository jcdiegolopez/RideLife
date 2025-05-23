import { FaMinus, FaPlus } from "react-icons/fa";

type QuantitySelectorProps = {
  quantity: number;
  handleQuantityChange: (delta: number) => void;
  handleAddToCart: () => void;
};

const QuantitySelector = ({ quantity, handleQuantityChange, handleAddToCart }: QuantitySelectorProps) => (
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
        <span className="text-white-custom font-medium w-8 text-center">{quantity}</span>
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
);

export default QuantitySelector;