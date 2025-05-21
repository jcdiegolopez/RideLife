export interface Review {
  rating: number;
  comment: string;
  author: string;
  date: string; 
}


export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number; 
  discount: number;
  category: string;
  dateAdded: string; 
  reviews: Review[];
}


export interface CartItem extends Product {
  quantity: number;
}

export interface AppContextType {
  cart: CartItem[];
  favorites: number[];
  productList: Product[];
  addReview: (productId: number, newReview: Review) => void;
  addToCart: (product: Product) => void;
  reduceFromCart: (productId: number) => void;
  clearCart: () => void;
  toggleFavorite: (productId: number) => void;
  getTotal: () => number;
}