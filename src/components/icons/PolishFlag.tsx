import React from 'react'

export const PolishFlag = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg 
    viewBox="0 0 16 10" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="16" height="10" fill="white"/>
    <rect y="5" width="16" height="5" fill="#DC143C"/>
  </svg>
)
