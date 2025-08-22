import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center py-12 sm:py-16">
      <div className="relative mb-4 sm:mb-6">
        <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-purple-200/20 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 border-4 border-transparent border-r-blue-500 rounded-full animate-spin" style={{ animationDelay: '-0.3s' }}></div>
      </div>
      <p className="text-purple-200 font-semibold text-base sm:text-lg text-center px-4">Searching repositories...</p>
      <p className="text-purple-200/60 text-xs sm:text-sm mt-2 text-center px-4">This may take a moment</p>
    </div>
  );
};

export default LoadingSpinner;
