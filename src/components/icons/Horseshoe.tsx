import React from 'react';

interface HorseshoeProps {
  className?: string;
}

export const Horseshoe: React.FC<HorseshoeProps> = ({ className = '' }) => {
  return (
    <img
      src="/images/horseshoe_horse_western_good_luck_icon.png"
      alt="Horseshoe Icon"
      className={className}
      style={{ cursor: 'none' }}
    />
  );
};
