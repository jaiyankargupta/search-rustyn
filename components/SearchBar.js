import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch, onFocus, onBlur, placeholder, value, onChange }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-0">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 sm:pl-6 flex items-center pointer-events-none">
            <Search className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-200" />
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={placeholder}
            className="w-full pl-12 sm:pl-16 pr-20 sm:pr-32 py-4 sm:py-5 bg-white/95 backdrop-blur-md border-2 border-white/20 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-[1.02] text-sm sm:text-base"
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 px-4 sm:px-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-r-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-500/20 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
          >
            <span className="hidden sm:inline">Search</span>
            <span className="sm:hidden">Go</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
