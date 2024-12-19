import React from 'react';

interface HorseshoeProps {
  className?: string;
}

export const Horseshoe: React.FC<HorseshoeProps> = ({ className = '' }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="-2.5 0 63 63"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeWidth="2" fill="none">
        <path d="M52,54 L48.3,54 C53.1,45.3 56,35.5 56,28 C56,12.5 43.5,0 28,0 C12.5,0 0,12.5 0,28 C0,35.5 4,45.3 8.8,54 L5,54 L5,61 L17.9,61 C23.9,61 21.5,56.8 21.5,56.8 C21.5,56.8 9.8,38.5 9.8,27.8 C9.8,17.9 18,9.9 28.1,9.9 C38.2,9.9 46.4,17.9 46.4,27.8 C46.4,38.3 39.5,48.3 36.3,56.5 C35.2,59.2 36.4,61 40.1,61 L52,61 L52,54 L52,54 Z" />
        <path d="M27,6 L29,6" />
        <path d="M12,10 L14,10" />
        <path d="M41,10 L43,10" />
        <path d="M48,18 L50,18" />
        <path d="M6,17.9 L8,17.9" />
        <path d="M50,26 L52,26" />
        <path d="M50,35 L52,35" />
        <path d="M5,35 L7,35" />
        <path d="M8,44 L10,44" />
        <path d="M47,44 L49,44" />
        <path d="M43,54 L44.9,54" />
        <path d="M12,54 L14,54" />
        <path d="M4,26 L6,26" />
      </g>
    </svg>
  );
};
