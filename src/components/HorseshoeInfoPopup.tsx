import { useState, useEffect } from 'react';
import { useHorseshoe } from '../context/HorseshoeContext';
import { motion, AnimatePresence } from 'framer-motion';

export function HorseshoeInfoPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenHorseshoeInfo');
    if (!hasSeenPopup) {
      // Small delay to ensure smooth initial page load
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const { disableSpawn } = useHorseshoe();

  const handleClose = (startGame: boolean) => {
    if (!startGame) {
      disableSpawn();
    }
    setIsVisible(false);
    localStorage.setItem('hasSeenHorseshoeInfo', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => handleClose(false)}
        >
          <motion.div
          className="bg-primary-bg rounded-xl shadow-xl p-6 mx-4 max-w-sm w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header with icon */}
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 text-primary">
                <svg width="100%" height="100%" viewBox="0 0 58 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g stroke="currentColor" strokeWidth="2">
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
              </div>
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-primary-text text-center mb-3">
              Zbieraj podkowy i znajdź zniżki!
            </h2>

            {/* Description */}
            <div className="space-y-3 text-secondary-text">
              <p>
                Podczas przeglądania naszej strony możesz zbierać podkowy, które pojawiają się w różnych miejscach.
              </p>
              <p>
                Za każde zebrane 10 podków otrzymasz ciekawostkę jeździecką, a przy specjalnych osiągnięciach odblokujesz kody rabatowe:
              </p>
              <ul className="list-disc list-inside pl-2 space-y-1">
                <li>10 podków = 5% zniżki</li>
                <li>50 podków = 10% zniżki</li>
              </ul>
            </div>

            {/* Buttons */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <button
                onClick={() => handleClose(true)}
                className="bg-primary hover:bg-accent-hover text-primary-bg py-2 px-4 rounded-lg transition-colors"
              >
                Rozpocznij zbieranie
              </button>
              <button
                onClick={() => handleClose(false)}
                className="bg-secondary-bg hover:bg-accent-bg text-primary-text py-2 px-4 rounded-lg transition-colors"
              >
                Nie gram
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
