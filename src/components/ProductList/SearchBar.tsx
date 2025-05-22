import { useState, useRef, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { useSearchParams } from "react-router-dom";

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [, setSearchParams] = useSearchParams();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set("query", searchQuery);
        return newParams;
      });
    }
    handleClose();
  };

  const handleClose = () => {
    setSearchQuery("");
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    } else if (e.key === "Escape") {
      handleClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-999 flex items-center justify-center px-4"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-lg -mt-40">
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <CiSearch className="w-6 h-6 text-white-custom" />
          </div>
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search..."
            className="w-full px-6 py-2 pl-12 text-lg bg-secondary-dark rounded-xl shadow-2xl border-2 border-gray-200 focus:border-accent-pink focus:outline-none text-white-custom/70 placeholder-accent-pink transition-all duration-200"
          />
        </div>

        <div className="text-center mt-4 text-white text-sm opacity-75">
          Presiona Enter para buscar o Esc para cerrar
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
