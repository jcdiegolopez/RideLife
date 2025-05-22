import type { Product } from "../../utils/types";

interface ProductImageSectionProps {
  product: Product;
}

const ProductImageSection = ({ product }: ProductImageSectionProps) => {
  return (
    <div className="w-full md:w-1/2">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-80 md:h-96 object-cover rounded-lg shadow-lg"
      />
    </div>
  );
};

export default ProductImageSection;
