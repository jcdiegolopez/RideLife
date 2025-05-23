

import React from 'react';
import { FaListUl } from 'react-icons/fa';

type CategorySelectorProps = {
  categories: string[];
  selectedCategory: string | null;
  handleCategorySelect: (category: string | null) => void;
  isCategoryOpen: boolean;
  setIsCategoryOpen: (open: boolean) => void;
};

const CategorySelector: React.FC<CategorySelectorProps> = ({ categories, selectedCategory, handleCategorySelect, isCategoryOpen, setIsCategoryOpen }) => (
  <div className="relative">
    <button
      onClick={() => setIsCategoryOpen(!isCategoryOpen)}
      className="hover:scale-110 transition-transform duration-200 flex items-center gap-2 bg-secondary-dark rounded-md px-4 py-2 text-white-custom"
    >
      <FaListUl className="text-white-custom" />
      <span className="min-w-16">{selectedCategory || 'Category'}</span>
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
            <div className="w-full bg-accent-pink h-[0.5px]"></div>
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
);

export default CategorySelector;