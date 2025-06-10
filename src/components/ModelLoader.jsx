import React from 'react';

const ModelLoader = () => {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[300px]">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        <div className="mt-4 text-sm text-center text-primary font-mono">Loading 3D Model...</div>
      </div>
    </div>
  );
};

export default ModelLoader;
