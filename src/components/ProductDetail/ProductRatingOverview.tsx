import { calculateRatingDistribution } from "../../utils";
import type { Product } from "../../utils/types";
import StarRating from "../common/StarRating";

interface ProductRatingOverviewProps {
  product: Product;
}

const ProductRatingOverview = ({ product }: ProductRatingOverviewProps) => {
  const ratingDistribution = calculateRatingDistribution(product.reviews);

  const totalReviews = product.reviews.length;

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex flex-col items-center md:items-start">
          <div className="text-5xl font-bold text-white-custom mb-2">
            {product.rating.toFixed(1)}
          </div>
          <StarRating rating={product.rating} />
          <div className="text-accent-pink text-sm mt-1">
            {totalReviews} review{totalReviews !== 1 ? "s" : ""}
          </div>
        </div>

        <div className="flex-1 space-y-2">
          {ratingDistribution.map(({ star, percentage }) => (
            <div key={star} className="flex items-center gap-3">
              <span className="text-white-custom text-sm w-2">{star}</span>
              <div className="flex-1 bg-secondary-dark rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-accent-yellow rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-accent-pink text-sm w-8 text-right">
                {Math.round(percentage)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductRatingOverview;
