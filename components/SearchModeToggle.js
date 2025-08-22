import React from 'react';

const SearchModeToggle = ({ modes, activeMode, onModeChange }) => {
  return (
    <div className="flex justify-center">
      <div className="inline-flex rounded-2xl bg-white/10 p-2 backdrop-blur-md border border-white/20 shadow-xl">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center space-x-3 ${
              activeMode === mode.id
                ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-2xl transform scale-105'
                : 'text-white/70 hover:text-white hover:bg-white/10 hover:scale-105'
            }`}
          >
            <span className="text-xl">{mode.icon}</span>
            <span>{mode.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchModeToggle;
