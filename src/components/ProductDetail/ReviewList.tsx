import type { Product } from "../../utils/types";
import StarRating from "../common/StarRating";

interface ReviewsListProps {
  product: Product;
}

const ReviewsList = ({ product }: ReviewsListProps) => {
  if (product.reviews.length === 0) {
    return (
      <div className="w-full">
        <h2 className="text-2xl font-bold text-white-custom mb-6">Reviews</h2>
        <div className="text-center py-8">
          <p className="text-accent-pink">
            No reviews yet. Be the first to review this product!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-white-custom mb-6">Reviews</h2>

      <div className="space-y-6">
        {product.reviews.map((review, index) => (
          <div key={index} className="border-b  pb-6 last:border-b-0">
            <div className="flex items-start gap-4 mb-3">
              <div className="w-10 h-10 bg-secondary-dark rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">
                  {review.author.charAt(0).toUpperCase()}
                </span>
              </div>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h4 className="text-white-custom font-semibold">
                    {review.author}
                  </h4>
                  <span className="text-accent-pink text-sm">
                    {review.date}
                  </span>
                </div>

                <div className="mt-1">
                  <StarRating rating={review.rating} />
                </div>
              </div>
            </div>

  
            <div className="ml-14">
              <p className="text-gray-300 leading-relaxed">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsList;
