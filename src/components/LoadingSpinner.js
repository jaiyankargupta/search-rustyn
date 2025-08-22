import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-purple-600 rounded-full animate-spin" style={{ animationDelay: '-0.5s' }}></div>
      </div>
      <div className="ml-4">
        <p className="text-white text-lg font-medium">Searching repositories...</p>
        <p className="text-white/70 text-sm">This may take a moment</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
