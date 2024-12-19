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
        left: mousePosition.x - 10, // Adjusted for smaller size (half of new width)
        top: mousePosition.y - 10,  // Adjusted for smaller size (half of new height)
        width: '20px',              // Smaller size
        height: '20px',             // Smaller size
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
        src="/images/horseshoe_horse_western_good_luck_icon.png"
        alt="Horseshoe Cursor"
        className={styles.cursorImage}
      />
    </motion.div>
  );
}
