import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen -mt-16">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-r-4 border-gray-300 border-t-transparent"></div>
    </div>
  );
};

export default Loader;
