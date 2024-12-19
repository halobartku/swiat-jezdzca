import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Horseshoe } from './icons/Horseshoe';
import { useHorseshoe } from '../context/HorseshoeContext';

interface SpawnedHorseshoe {
  id: number;
  x: number;
  y: number;
}

export function HorseshoeSpawner() {
  const { setHorseshoesCollected } = useHorseshoe();
  const [horseshoes, setHorseshoes] = useState<SpawnedHorseshoe[]>([]);
  const [lastSpawnTime, setLastSpawnTime] = useState(Date.now());
  const SPAWN_INTERVAL = 3000; // Spawn a new horseshoe every 3 seconds
  const MAX_HORSESHOES = 5; // Maximum number of horseshoes on screen

  useEffect(() => {
    const spawnHorseshoe = () => {
      const now = Date.now();
      if (now - lastSpawnTime >= SPAWN_INTERVAL && horseshoes.length < MAX_HORSESHOES) {
        const newHorseshoe: SpawnedHorseshoe = {
          id: now,
          x: Math.random() * (window.innerWidth - 50) + 25, // Keep away from edges
          y: Math.random() * (window.innerHeight - 50) + 25, // Keep away from edges
        };
        setHorseshoes(prev => [...prev, newHorseshoe]);
        setLastSpawnTime(now);
      }
    };

    const interval = setInterval(spawnHorseshoe, 1000);
    return () => clearInterval(interval);
  }, [horseshoes.length, lastSpawnTime]);

  const handleCollect = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    setHorseshoes(prev => prev.filter(h => h.id !== id));
    setHorseshoesCollected((prevCount: number) => prevCount + 1);
  };

  return (
    <AnimatePresence>
      {horseshoes.map(horseshoe => (
        <motion.div
          key={horseshoe.id}
          className="horseshoe absolute w-5 h-5 cursor-none" // Smaller size (20px)
          style={{
            left: horseshoe.x,
            top: horseshoe.y,
            zIndex: 40, // Below the cursor but above most content
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
