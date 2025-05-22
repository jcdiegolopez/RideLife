import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaListUl } from 'react-icons/fa';
import { BiDollar } from 'react-icons/bi';
import { BsStars } from 'react-icons/bs';
import { MdStarRate } from 'react-icons/md';

interface FilterButtonsProps {
  categories: string[];
}

const FilterButtons = ({ categories }: FilterButtonsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const selectedCategory = searchParams.get('category') || null;
  const sortBy = searchParams.get('sort') || null;

  const handleCategorySelect = (category: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (category) {
      newParams.set('category', category);
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams);
    setIsCategoryOpen(false);
  };

  const handlePriceSortClick = () => {
    const newParams = new URLSearchParams(searchParams);
    if (sortBy === 'price-asc') {
      newParams.set('sort', 'price-desc');
    } else {
      newParams.set('sort', 'price-asc');
    }
    setSearchParams(newParams);
  };

  const handleNewArrivalsClick = () => {
    const newParams = new URLSearchParams(searchParams);
    if (sortBy === 'new') {
      newParams.delete('sort');
    } else {
      newParams.set('sort', 'new');
    }
    setSearchParams(newParams);
  };

  const handleRatingClick = () => {
    const newParams = new URLSearchParams(searchParams);
    if (sortBy === 'rating') {
      newParams.delete('sort');
    } else {
      newParams.set('sort', 'rating');
    }
    setSearchParams(newParams);
  };

  const resetFilters = () => {
    setSearchParams({});
    setIsCategoryOpen(false);
  };

  const clearSearch = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('query');
    setSearchParams(newParams);
  };

  return (
    <div className="flex flex-wrap gap-3">
      <div className="relative">
        <button
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          className="hover:scale-110 transition-transform duration-200 flex items-center gap-2 bg-secondary-dark rounded-md px-4 py-2 text-white-custom"
        >
          <FaListUl className="text-white-custom" />
          <span className='min-w-16'>{selectedCategory || 'Category'}</span>
        </button>
        {isCategoryOpen && (
          <div className="absolute top-full mt-1 w-full bg-secondary-dark rounded-md shadow-lg z-10">
            <button
              onClick={() => handleCategorySelect(null)}
              className="w-full text-left px-4 py-2 text-white-custom hover:scale-105 transition-transform duration-200 hover:text-accent-pink"
            >
              All
            </button>
            {categories.map((category) => (
              <>
              <div className='w-full bg-accent-pink h-[0.5px]'></div>
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className="w-full text-left px-4 py-2 text-white-custom hover:scale-105 transition-transform duration-200 hover:text-accent-pink"
              >
                {category}
              </button>
              </>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handlePriceSortClick}
        className={`hover:scale-110 transition-transform duration-200 flex items-center gap-2 rounded-md px-4 py-2 text-white-custom ${sortBy && sortBy.includes('price') ? 'bg-accent-red' : 'bg-secondary-dark'}`}
      >
        <BiDollar className="text-white-custom" />
        <span>{sortBy === 'price-asc' ? 'Price (Low to High)' : sortBy === 'price-desc' ? 'Price (High to Low)' : 'Price'}</span>
      </button>

      <button
        onClick={handleNewArrivalsClick}
        className={`hover:scale-110 transition-transform duration-200 flex items-center gap-2 rounded-md px-4 py-2 text-white-custom ${sortBy === 'new' ? 'bg-accent-red' : 'bg-secondary-dark'}`}
      >
        <BsStars className="text-white-custom" />
        <span>New Arrivals</span>
      </button>

      <button
        onClick={handleRatingClick}
        className={`hover:scale-110 transition-transform duration-200 flex items-center gap-2 rounded-md px-4 py-2 text-white-custom ${sortBy === 'rating' ? 'bg-accent-red' : 'bg-secondary-dark'}`}
      >
        <MdStarRate className="text-white-custom" />
        <span>Rating</span>
      </button>

      <button
        onClick={resetFilters}
        className="hover:scale-110 transition-transform duration-200 flex items-center gap-2 bg-white-custom/20 rounded-md px-4 py-2 text-white-custom"
      >
        <span>Reset Filters</span>
      </button>
      <button
        onClick={clearSearch}
        className="hover:scale-110 transition-transform duration-200 flex items-center gap-2 bg-white-custom/20 rounded-md px-4 py-2 text-white-custom"
      >
        <span>Clear Search</span>
      </button>
      
    </div>
  );
};

export default FilterButtons;