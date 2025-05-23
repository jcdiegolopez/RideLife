import type { Product, Review } from "./types";

export const calculateAverageRating = (reviews: Review[]): number => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.round(totalRating / reviews.length); 
  };

export const calculateDiscountedPrice = (price: number, discount: number): number => {
    return price - (price * discount/100);
  }

export const getSmallerSize = (size: "sm" | "md" | "lg") => {
  if (size === "lg") return "md";
  if (size === "md") return "sm";
  return "xs";
};

export const calculateRatingDistribution = (reviews: Review[]) => {
  return [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter(
      (review) => Math.floor(review.rating) === star
    ).length;
    const percentage =
      reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { star, count, percentage };
  });
}

export const updateHistory = ( productId : number, limit : number = 10) => {
  const history = JSON.parse(
      localStorage.getItem("navigationHistory") || "[]"
    ) as number[];
    if (!history.includes(productId)) {
      const updatedHistory = [productId, ...history].slice(0, limit); 
      localStorage.setItem("navigationHistory", JSON.stringify(updatedHistory));
    }
}


export function getRecommendations(
  productList: Product[],
  currentProductId: number,
  limit: number
): Product[] {
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

  return recommendedProducts.sort((a, b) => b.rating - a.rating).slice(0, limit);
}