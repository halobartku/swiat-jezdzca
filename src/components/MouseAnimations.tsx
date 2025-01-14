import { motion } from 'framer-motion';
import styles from './MouseAnimations.module.css';
import { Horseshoe } from './icons/Horseshoe';
import { useApp } from '../context/AppContext';

interface MouseAnimationsProps {
  mousePosition: { x: number; y: number };
}

export function MouseAnimations({ mousePosition }: MouseAnimationsProps) {
  const { isMobile } = useApp();

  // Don't render on mobile devices
  if (isMobile) return null;

  return (
    <motion.div
      className={styles.cursorWrapper}
      style={{
        left: mousePosition.x - 12,
        top: mousePosition.y - 12,
        width: '24px',
        height: '24px',
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
      <Horseshoe 
        className={styles.cursorImage} 
        style={{ cursor: 'none' }}
      />
    </motion.div>
  );
}
