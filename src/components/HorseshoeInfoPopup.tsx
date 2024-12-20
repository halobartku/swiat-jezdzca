import { useState, useEffect } from 'react';
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

  const handleClose = () => {
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
          onClick={handleClose}
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
              <img 
                src="/images/horse-shoe-svgrepo-com.svg" 
                alt="Podkowa"
                className="w-16 h-16"
              />
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

            {/* Close button */}
            <button
              onClick={handleClose}
              className="mt-4 w-full bg-primary hover:bg-accent-hover text-primary-bg py-2 px-4 rounded-lg transition-colors"
            >
              Rozpocznij zbieranie!
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
