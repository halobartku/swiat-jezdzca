import React from 'react';
import { motion } from 'framer-motion';
import styles from './MouseAnimations.module.css';

interface MouseAnimationsProps {
  mousePosition: { x: number; y: number };
}

export function MouseAnimations({ mousePosition }: MouseAnimationsProps) {
  return (
    <motion.div
      className={styles.cursorWrapper}
      style={{
        left: mousePosition.x - 12, // Adjusted for medium size (half of new width)
        top: mousePosition.y - 12,  // Adjusted for medium size (half of new height)
        width: '24px',              // Medium size
        height: '24px',             // Medium size
      }}
      animate={{
        rotate: mousePosition.x > 0 ? 15 : -15
      }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 300,
        restDelta: 0.001
      }}
    >
      <img
        src="/images/horse-shoe-svgrepo-com.svg"
        alt="Horseshoe Cursor"
        className={styles.cursorImage}
      />
    </motion.div>
  );
}
