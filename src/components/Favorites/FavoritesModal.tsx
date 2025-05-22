import { useContext, useRef, useEffect } from 'react';
import AppContext from '../../context/AppContext';
import FavoriteItem from './FavoriteItem';
import type { Product } from '../../utils/types';

interface FavoritesModalProps {
  isOpen: boolean;
}

const FavoritesModal = ({ isOpen }: FavoritesModalProps) => {
  const { favorites } = useContext(AppContext);
  const likeHistory = useRef<number[]>([]); 

  useEffect(() => {
    favorites.forEach((product: Product) => {
      if (!likeHistory.current.includes(product.id)) {
        likeHistory.current.push(product.id);
      }
    });
  }, [favorites]);

  if (!isOpen) return null;

  return (
    <div className="absolute z-100 flex items-start justify-end right-2 top-11">
      <div className="w-80 max-h-[500px] h-full rounded-lg bg-secondary-dark text-white-custom overflow-y-auto animate-slide-in-right">
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Your Favorites</h2>
          </div>

          {favorites && favorites.length > 0 ? (
            <div className="space-y-0">
              {favorites.map((item: Product) => (
                <FavoriteItem key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <p className="text-center py-8">No favorites yet</p>
          )}

          <div className="mt-6 text-accent-pink">
            <h3 className="text-sm font-medium ">History</h3>
            {likeHistory.current.length === 0 ? (
              <p className="text-center py-4">No history yet</p>
            ) : (
              likeHistory.current.map((productId) => {
                const product = favorites.find((p: Product) => p.id === productId);
                return product ? (
                  <p key={productId} className="text-xs font-thin  py-0.5">
                    {product.name} (Liked on {new Date().toISOString().split('T')[0]})
                  </p>
                ) : null;
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesModal;