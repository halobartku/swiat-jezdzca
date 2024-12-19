import React from 'react';

interface HorseshoeProps {
  className?: string;
  style?: React.CSSProperties;
}

export const Horseshoe: React.FC<HorseshoeProps> = ({ className = '', style }) => {
  return (
    <img
      src="/images/horse-shoe-svgrepo-com.svg"
      alt="Horseshoe Icon"
      className={className}
      style={style}
    />
  );
};
