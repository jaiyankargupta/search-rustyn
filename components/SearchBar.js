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
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={placeholder}
            className="w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur-sm border-2 border-transparent rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-lg hover:shadow-xl"
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-r-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
