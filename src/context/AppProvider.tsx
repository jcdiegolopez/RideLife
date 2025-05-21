import { useState } from "react";
import AppContext from "./AppContext";
import { products } from "../data/product";
import type { AppContextType, CartItem, Product, Review } from "../utils/types";
import { calculateAverageRating } from "../utils";

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [productList, setProductList] = useState<Product[]>(products);

  const addReview = (productId: number, newReview: Review) => {
    setProductList((prevList) =>
      prevList.map((product) => {
        if (product.id === productId) {
          const updatedReviews = [...product.reviews, newReview];
          return {
            ...product,
            reviews: updatedReviews,
            rating: calculateAverageRating(updatedReviews),
          };
        }
        return product;
      })
    );
  };

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      if (existingItem.quantity < 9) {
        setCart(
          cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      }
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const reduceFromCart = (productId: number) => {
    setCart(
      cart
        .map((item) =>
          item.id === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const value: AppContextType = {
    cart,
    favorites,
    productList,
    addReview,
    addToCart,
    reduceFromCart,
    clearCart,
    toggleFavorite,
    getTotal,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
