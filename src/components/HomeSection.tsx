import React from 'react';
import { Home } from './Home';

interface HomeSectionProps {
  onDiscoverClick: () => void;
  onContactClick: () => void;
}

const HomeSection: React.FC<HomeSectionProps> = ({ onDiscoverClick, onContactClick }) => {
  return (
    <Home onDiscoverClick={onDiscoverClick} onContactClick={onContactClick} />
  );
};

export default HomeSection;
