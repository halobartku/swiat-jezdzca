import React from 'react';
import LottieAnimation from './LottieAnimation';
import loadingAnimation from '../animations/loading.json';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <LottieAnimation
        animationData={loadingAnimation}
        className="w-24 h-24"
        style={{ filter: `drop-shadow(0 0 8px rgba(255, 59, 59, 0.3))` }}
      />
      <span className="sr-only">Ładowanie...</span>
    </div>
  );
};
