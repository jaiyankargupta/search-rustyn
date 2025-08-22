import React from 'react';

const SearchModeToggle = ({ modes, activeMode, onModeChange }) => {
  return (
    <div className="flex justify-center">
      <div className="inline-flex rounded-lg bg-white/10 p-1 backdrop-blur-sm border border-white/20">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
              activeMode === mode.id
                ? 'bg-white text-gray-900 shadow-lg transform scale-105'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="text-lg">{mode.icon}</span>
            <span>{mode.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchModeToggle;
