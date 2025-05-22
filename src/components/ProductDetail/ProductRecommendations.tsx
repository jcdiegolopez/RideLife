import { useContext, useEffect, useMemo } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";

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
    const history = JSON.parse(
      localStorage.getItem("navigationHistory") || "[]"
    ) as number[];
    if (!history.includes(currentProductId)) {
      const updatedHistory = [currentProductId, ...history].slice(0, 10); 
      localStorage.setItem("navigationHistory", JSON.stringify(updatedHistory));
    }
  }, [currentProductId]);

  const recommendations = useMemo(() => {
    const history = JSON.parse(
      localStorage.getItem("navigationHistory") || "[]"
    ) as number[];

    if (history.length <= 1) {
      return productList
        .filter((product) => product.id !== currentProductId)
        .sort(() => Math.random() - 0.5)
        .slice(0, limit);
    }

    const historyCategories = productList
      .filter(
        (product) =>
          history.includes(product.id) && product.id !== currentProductId
      )
      .map((product) => product.category);

    if (historyCategories.length === 0) {
      return productList
        .filter((product) => product.id !== currentProductId)
        .sort(() => Math.random() - 0.5)
        .slice(0, limit);
    }

    const recommendedProducts = productList.filter(
      (product) =>
        product.id !== currentProductId &&
        historyCategories.includes(product.category)
    );

    if (recommendedProducts.length < limit) {
      const additionalProducts = productList
        .filter(
          (product) =>
            product.id !== currentProductId &&
            !historyCategories.includes(product.category)
        )
        .sort(() => Math.random() - 0.5);

      return [...recommendedProducts, ...additionalProducts].slice(0, limit);
    }

    return recommendedProducts
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
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
