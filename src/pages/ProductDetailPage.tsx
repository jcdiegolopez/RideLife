import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppContext from "../context/AppContext";
import ProductImageSection from "../components/ProductDetail/ProductImageSection";
import ProductInfoSection from "../components/ProductDetail/ProductInfoSection";
import ProductRecommendations from "../components/ProductDetail/ProductRecommendations";
import ProductRatingOverview from "../components/ProductDetail/ProductRatingOverview";
import ReviewForm from "../components/ProductDetail/ReviewForm";
import ReviewsList from "../components/ProductDetail/ReviewList";
import { FaLongArrowAltLeft } from "react-icons/fa";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { productList } = useContext(AppContext);
  const navigate = useNavigate();

  const product = productList.find((p) => p.id === parseInt(id || "0"));

  if (!product) {
    return (
      <div className="min-h-screen bg-primary-dark flex items-center justify-center font-poppins">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white-custom mb-4">
            Product not found
          </h1>
          <p className="text-gray-400">
            The product you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-dark">
      <div className="container mx-auto px-4 py-8 space-y-12">
        <FaLongArrowAltLeft className="text-white-custom w-6 h-6 p-0 mb-4 hover:text-accent-pink" onClick={() => navigate(-1)}/>
        <div className="flex flex-col md:flex-row gap-8">
          <ProductImageSection product={product} />
          <ProductInfoSection product={product} />
        </div>

        <ProductRecommendations currentProductId={product.id} />

        <ProductRatingOverview product={product} />

        <ReviewForm productId={product.id} />

        <ReviewsList product={product} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
