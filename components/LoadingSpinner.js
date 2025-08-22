import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center py-16">
      <div className="relative mb-6">
        <div className="w-16 h-16 border-4 border-purple-200/20 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-blue-500 rounded-full animate-spin" style={{ animationDelay: '-0.3s' }}></div>
      </div>
      <p className="text-purple-200 font-semibold text-lg">Searching repositories...</p>
      <p className="text-purple-200/60 text-sm mt-2">This may take a moment</p>
    </div>
  );
};

export default LoadingSpinner;
