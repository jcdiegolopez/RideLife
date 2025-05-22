import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { MdDirectionsBike } from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import FavoritesModal from "../Favorites/FavoritesModal";
import SearchBar from "../ProductList/SearchBar"; 
import AppContext from "../../context/AppContext";

const Navbar = () => {
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cart } = useContext(AppContext);
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleToggleFavorites = () => {
    setIsFavoritesOpen((prev) => !prev);
  };

  const handleToggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  };

  return (
    <>
      <nav className="flex justify-between font-poppins items-center p-4 bg-primary-dark text-white-custom border-b border-secondary-dark">
        <Link to={"/"} className="flex items-center space-x-2 ">
          <MdDirectionsBike className="w-[25px] h-[25px]" />
          <span className="text-lg font-bold">RideLife</span>
        </Link>
        <div className="flex space-x-2 relative ">
          <button
            onClick={handleToggleSearch}
            className="hover:scale-125 transition-transform duration-200 focus:outline-none bg-secondary-dark rounded-lg p-2"
          >
            <CiSearch className="text-white-custom w-[25px] h-[25px]" />
          </button>
          <Link
            to="/cart"
            className="hover:text-accent-pink transition-transform hover:scale-125 duration-200 focus:outline-none bg-secondary-dark rounded-lg p-2 relative"
          >
            <IoCartOutline className="text-white-custom w-[25px] h-[25px]" />
            {cartItemCount > 0 && (
              <div className="absolute top-[-5px] right-[-5px] bg-accent-red text-white-custom rounded-full w-4 h-4 flex items-center justify-center text-xs">
                {cartItemCount}
              </div>
            )}
          </Link>
          <button
            onClick={handleToggleFavorites}
            className=" hover:scale-125 transition-transform duration-200 focus:outline-none bg-secondary-dark rounded-lg p-2"
          >
            {isFavoritesOpen ? (
              <FaHeart className="text-accent-red w-[20px] h-[20px] mx-0.5" />
            ) : (
              <FaRegHeart className="text-white-custom w-[20px] h-[20px] mx-0.5" />
            )}
          </button>
          <FavoritesModal isOpen={isFavoritesOpen} />
        </div>
      </nav>

      <SearchBar isOpen={isSearchOpen} onClose={handleCloseSearch} />
    </>
  );
};

export default Navbar;
