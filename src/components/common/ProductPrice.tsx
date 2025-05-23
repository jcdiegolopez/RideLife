import { calculateDiscountedPrice, getSmallerSize } from "../../utils";

interface ProductPriceProps {
  price: number;
  discount: number;
  size: "sm" | "md" | "lg";
}

const sizeClasses = {
  xs: "text-sm",
  sm: "text-base",
  md: "text-lg",
  lg: "text-2xl",
};

const ProductPrice = ({ price, discount, size }: ProductPriceProps) => (
  <div className="flex-1 items-center">
    {discount > 0 ? (
      <>
        <span className={`text-accent-red font-semibold ${sizeClasses[size]}`}>
          ${calculateDiscountedPrice(price, discount).toFixed(2)}
        </span>
        <span className={`text-accent-pink line-through ml-2 ${sizeClasses[getSmallerSize(size)]}`}>
          ${price.toFixed(2)}
        </span>
      </>
    ) : (
      <span className={`font-semibold text-white-custom ${sizeClasses[size]}`}>
        ${price.toFixed(2)}
      </span>
    )}
  </div>
);

export default ProductPrice;