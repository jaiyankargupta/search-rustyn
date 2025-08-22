import React from 'react';

const SearchModeToggle = ({ modes, activeMode, onModeChange }) => {
  return (
    <div className="flex justify-center">
      <div className="inline-flex flex-col sm:flex-row rounded-2xl bg-white/10 p-2 backdrop-blur-md border border-white/20 shadow-xl w-full sm:w-auto max-w-sm sm:max-w-none">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            className={`px-4 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3 w-full sm:w-auto ${
              activeMode === mode.id
                ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-2xl transform scale-105'
                : 'text-white/70 hover:text-white hover:bg-white/10 hover:scale-105'
            }`}
          >
            <span className="text-lg sm:text-xl">{mode.icon}</span>
            <span className="truncate">{mode.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchModeToggle;
