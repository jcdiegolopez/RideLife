import { useContext, useEffect, useMemo } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";
import { getRecommendations, updateHistory } from "../../utils";

interface ProductRecommendationsProps {
  currentProductId: number;
  limit?: number;
}

const ProductRecommendations = ({
  currentProductId,
  limit = 4,
}: ProductRecommendationsProps) => {
  const { productList } = useContext(AppContext);

  useEffect(() => {
    updateHistory(currentProductId, 10);
  }, [currentProductId]);
  
  const recommendations = useMemo(() => {
    return getRecommendations(productList, currentProductId, limit);
  }, [currentProductId, productList, limit]);

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-white-custom mb-6">
        Recommendations
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recommendations.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id}>
            <div className="overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full rounded-lg h-32 md:h-40 object-cover"
              />
              <div className="py-1">
                <h3 className="text-white-custom font-normal text-sm md:text-base truncate">
                  {product.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductRecommendations;
