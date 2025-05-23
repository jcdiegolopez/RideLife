import { useState } from 'react';
import { BiDollar } from 'react-icons/bi';
import { BsStars } from 'react-icons/bs';
import { MdStarRate } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';
import ClearSearchButton from './ClearSearchButton';
import SortButton from './SortButton';
import CategorySelector from './CategorySelector';
import ResetButton from './ResetButton';


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
      <CategorySelector
        categories={categories}
        selectedCategory={selectedCategory}
        handleCategorySelect={handleCategorySelect}
        isCategoryOpen={isCategoryOpen}
        setIsCategoryOpen={setIsCategoryOpen}
      />
      <SortButton
        label={sortBy === 'price-asc' ? 'Price (Low to High)' : sortBy === 'price-desc' ? 'Price (High to Low)' : 'Price'}
        icon={BiDollar}
        isActive={sortBy && sortBy.includes('price')}
        onClick={handlePriceSortClick}
      />
      <SortButton
        label="New Arrivals"
        icon={BsStars}
        isActive={sortBy === 'new'}
        onClick={handleNewArrivalsClick}
      />
      <SortButton
        label="Rating"
        icon={MdStarRate}
        isActive={sortBy === 'rating'}
        onClick={handleRatingClick}
      />
      <ResetButton onClick={resetFilters} />
      <ClearSearchButton onClick={clearSearch} />
    </div>
  );
};

export default FilterButtons;