import { createContext } from "react";
import type { AppContextType } from "../utils/types";

const AppContext = createContext<AppContextType>({
    cart: [],
    favorites: [],
    productList: [],
    addReview: () => {},
    addToCart: () => {},
    reduceFromCart: () => {},
    clearCart: () => {},
    toggleFavorite: () => {},
    getTotal: () => 0,
});

export default AppContext;