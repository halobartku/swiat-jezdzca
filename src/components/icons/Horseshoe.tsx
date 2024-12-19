import React from 'react';

interface HorseshoeProps {
  className?: string;
}

export const Horseshoe: React.FC<HorseshoeProps> = ({ className = '' }) => {
  return (
    <img
      src="/images/horse-shoe-svgrepo-com.svg"
      alt="Horseshoe Icon"
      className={className}
      style={{ cursor: 'none' }}
    />
  );
};
