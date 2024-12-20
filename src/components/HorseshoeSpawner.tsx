import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Horseshoe } from './icons/Horseshoe';
import { useHorseshoe } from '../context/HorseshoeContext';
import { useApp } from '../context/AppContext';

interface SpawnedHorseshoe {
  id: number;
  x: number;
  y: number;
  spawnTime: number;
}

export function HorseshoeSpawner() {
  const { setHorseshoesCollected, spawnEnabled } = useHorseshoe();
  const [horseshoes, setHorseshoes] = useState<SpawnedHorseshoe[]>([]);
  const [lastSpawnTime, setLastSpawnTime] = useState(Date.now());
  const [scrollY, setScrollY] = useState(0);
  const { isMobile } = useApp();
  
  // Adjust spawn parameters based on device
  const SPAWN_INTERVAL = isMobile ? 2250 : 1800; // Slower spawn on mobile
  const MAX_HORSESHOES = isMobile ? 6 : 10; // Fewer horseshoes on mobile
  const PADDING = isMobile ? 40 : 25; // More padding from edges on mobile
  const RIGHT_PADDING = isMobile ? 40 : 180; // Much larger padding on the right for desktop to avoid navigation hover effects

  // Update scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getRandomPosition = useCallback(() => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    return {
      x: Math.random() * (viewportWidth - (RIGHT_PADDING + PADDING * 2)), // Keep horseshoes away from right navigation
      y: Math.random() * (viewportHeight - PADDING * 2) + PADDING + scrollY
    };
  }, [scrollY]);

  useEffect(() => {
    if (!spawnEnabled) {
      setHorseshoes([]); // Clear existing horseshoes when game is disabled
      return;
    }

    const spawnHorseshoe = () => {
      const now = Date.now();
      if (now - lastSpawnTime >= SPAWN_INTERVAL && horseshoes.length < MAX_HORSESHOES) {
        const { x, y } = getRandomPosition();
        const newHorseshoe: SpawnedHorseshoe = {
          id: now,
          x,
          y,
          spawnTime: now,
        };
        setHorseshoes(prev => [...prev, newHorseshoe]);
        setLastSpawnTime(now);
      }
    };

    const interval = setInterval(spawnHorseshoe, 500); // Check more frequently for spawning
    return () => clearInterval(interval);
  }, [horseshoes.length, lastSpawnTime, spawnEnabled, getRandomPosition]);

  // Remove horseshoes that are older than 15 seconds
  useEffect(() => {
    if (!spawnEnabled) return;

    const cleanup = setInterval(() => {
      const now = Date.now();
      setHorseshoes(prev => prev.filter(horseshoe => {
        const age = now - horseshoe.spawnTime;
        return age < 15000; // 15 seconds in milliseconds
      }));
    }, 1000); // Check every second

    return () => clearInterval(cleanup);
  }, [spawnEnabled]);

  const handleCollect = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    setHorseshoes(prev => prev.filter(h => h.id !== id));
    setHorseshoesCollected((prevCount: number) => prevCount + 1);
  };

  // Filter out horseshoes that are too far from the viewport
  const visibleHorseshoes = horseshoes.filter(horseshoe => {
    const viewportTop = scrollY;
    const viewportBottom = scrollY + window.innerHeight;
    return horseshoe.y >= viewportTop - 100 && horseshoe.y <= viewportBottom + 100;
  });

  return (
    <AnimatePresence>
      {visibleHorseshoes.map(horseshoe => (
        <motion.div
          key={horseshoe.id}
          className={`horseshoe fixed ${isMobile ? 'w-8 h-8' : 'w-7 h-7 cursor-none'}`}
          style={{
            left: horseshoe.x,
            top: horseshoe.y - scrollY, // Adjust for scroll position
            zIndex: 40,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          onClick={(e) => handleCollect(horseshoe.id, e)}
          whileHover={{ scale: 1.2 }}
        >
          <Horseshoe className="w-full h-full filter brightness-125 hover:brightness-150 transition-all duration-200" />
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
