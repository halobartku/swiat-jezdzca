import React, { createContext, useContext, useState, useCallback } from 'react';

interface HorseshoeContextType {
  horseshoesCollected: number;
  setHorseshoesCollected: React.Dispatch<React.SetStateAction<number>>;
  mousePosition: { x: number; y: number };
  handleMouseMove: (e: React.MouseEvent) => void;
  collectHorseshoe: (e: React.MouseEvent) => void;
  spawnEnabled: boolean;
  toggleSpawn: () => void;
  disableSpawn: () => void;
}

const HorseshoeContext = createContext<HorseshoeContextType | undefined>(undefined);

export function HorseshoeProvider({ children }: { children: React.ReactNode }) {
  const [horseshoesCollected, setHorseshoesCollected] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [spawnEnabled, setSpawnEnabled] = useState(true);

  const toggleSpawn = useCallback(() => {
    setSpawnEnabled(prev => !prev);
  }, []);

  const disableSpawn = useCallback(() => {
    setSpawnEnabled(false);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    setMousePosition({
      x: clientX,
      y: clientY,
    });
  }, []);

  const collectHorseshoe = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.horseshoe')) {
      setHorseshoesCollected(prev => prev + 1);
    }
  }, []);

  const value = {
    horseshoesCollected,
    setHorseshoesCollected,
    mousePosition,
    handleMouseMove,
    collectHorseshoe,
    spawnEnabled,
    toggleSpawn,
    disableSpawn,
  };

  return (
    <HorseshoeContext.Provider value={value}>
      {children}
    </HorseshoeContext.Provider>
  );
}

export function useHorseshoe() {
  const context = useContext(HorseshoeContext);
  if (context === undefined) {
    throw new Error('useHorseshoe must be used within a HorseshoeProvider');
  }
  return context;
}
