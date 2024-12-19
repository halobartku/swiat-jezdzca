import React, { useState, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Horseshoe } from './icons/Horseshoe';
import { equestrianFacts, type EquestrianFact } from '../data/equestrianFacts';
import { generateDiscountCode } from '../data/discountWords';
import LottieAnimation from './LottieAnimation';
import successAnimation from '../animations/success.json';
import { useHorseshoe } from '../context/HorseshoeContext';

interface HorseshoeCollectorProps {
  horseshoesCollected: number;
}

const getRank = (count: number) => {
  if (count < 50) return { title: 'Poziom Cavaletti 40cm', color: 'text-brown-600' };
  if (count < 100) return { title: 'Poziom Stacjonata 80cm', color: 'text-copper-600' };
  if (count < 200) return { title: 'Poziom Oxer 120cm', color: 'text-bronze-600' };
  if (count < 300) return { title: 'Poziom Szereg 160cm', color: 'text-amber-600' };
  return { title: 'Poziom Olimpijski 200cm', color: 'text-brown-800' };
};

export function HorseshoeCollector({ horseshoesCollected }: HorseshoeCollectorProps) {
  const { spawnEnabled, toggleSpawn } = useHorseshoe();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showFactUnlock, setShowFactUnlock] = useState(false);
  const [discountCode, setDiscountCode] = useState<{ word1: string; word2: string } | null>(null);
  const prevCountRef = useRef(horseshoesCollected);
  
  const currentFact = useMemo(() => {
    const factIndex = Math.floor(horseshoesCollected / 10) % equestrianFacts.length;
    return equestrianFacts[factIndex];
  }, [horseshoesCollected]);

  useEffect(() => {
    // Clear fact unlock celebration when moving past a multiple of 10
    if (prevCountRef.current % 10 === 0 && horseshoesCollected % 10 === 1) {
      setShowFactUnlock(false);
    }
    
    if (horseshoesCollected > prevCountRef.current) {
      // Regular collection celebration
      if (horseshoesCollected % 10 !== 0) {
        setShowCelebration(true);
        const timer = setTimeout(() => setShowCelebration(false), 1500);
        return () => clearTimeout(timer);
      }
      
      // Special fact unlock celebration (only on exact multiples of 10)
      if (horseshoesCollected % 10 === 0 && horseshoesCollected > 0) {
        setShowFactUnlock(true);
        setShowCelebration(false); // Ensure regular celebration is hidden
        
        // Generate discount code only at exactly 10 horseshoes
        if (horseshoesCollected === 10) {
          setDiscountCode(generateDiscountCode());
        }
        
        const factTimer = setTimeout(() => setShowFactUnlock(false), 3000);
        return () => clearTimeout(factTimer);
      }
    }
    
    prevCountRef.current = horseshoesCollected;
  }, [horseshoesCollected]);

  const rank = useMemo(() => getRank(horseshoesCollected), [horseshoesCollected]);

  const getCategoryStyle = (category: string) => {
    switch (category) {
      case 'history':
        return 'bg-brown-100 text-brown-800 border border-brown-800/20';
      case 'sport':
        return 'bg-copper-100 text-copper-800 border border-copper-800/20';
      case 'training':
        return 'bg-bronze-100 text-bronze-800 border border-bronze-800/20';
      case 'equipment':
        return 'bg-amber-100 text-amber-800 border border-amber-800/20';
      default:
        return 'bg-brown-100 text-brown-800 border border-brown-800/20';
    }
  };

  const getCategoryTranslation = (category: string) => {
    switch (category) {
      case 'history':
        return 'Historia';
      case 'sport':
        return 'Sport';
      case 'training':
        return 'Trening';
      case 'equipment':
        return 'Sprzęt';
      default:
        return category;
    }
  };

  // Calculate completed steps (0-10)
  const completedSteps = horseshoesCollected % 10;

  return (
    <>
      {/* Collector button */}
      <motion.div 
        className="fixed bottom-8 left-8 z-50 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-2 border border-brown-200 flex flex-col gap-2"
        initial={false}
        animate={{ 
          scale: isExpanded ? 0.9 : 1,
          y: showCelebration || showFactUnlock ? -10 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="flex items-center justify-center gap-1.5 cursor-pointer group relative px-2"
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-5 h-5 text-brown-800 group-hover:text-amber-700 transition-colors flex items-center">
            <Horseshoe className="w-full h-full horseshoe-collector-icon" />
          </div>
          <span className="text-lg font-bold text-brown-800 group-hover:text-amber-700 transition-colors flex items-center">
            {horseshoesCollected}
          </span>
          
          {/* Regular collection celebration */}
          <AnimatePresence>
            {showCelebration && (
              <motion.div 
                className="absolute -top-8 left-1/2 -translate-x-1/2 w-12 h-12 z-[60]"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                <LottieAnimation
                  animationData={successAnimation}
                  loop={false}
                  autoplay={true}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Special fact unlock celebration */}
          <AnimatePresence>
            {showFactUnlock && (
              <motion.div 
                className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-[60]"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
              >
                <motion.div
                  className="text-red-600 font-bold text-sm whitespace-nowrap bg-white/90 px-3 py-1.5 rounded-lg shadow-sm"
                >
                  {horseshoesCollected === 10 ? 'Otrzymałeś zniżkę!' : 'Nowa ciekawostka!'}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Game toggle switch */}
        <div className="flex items-center justify-center gap-2 pt-1 border-t border-brown-200">
          <span className="text-xs font-medium text-brown-800">Gra</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSpawn();
            }}
            className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors ${
              spawnEnabled ? 'bg-red-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                spawnEnabled ? 'translate-x-4' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </motion.div>

      {/* Centered popup */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl p-4 m-4 max-w-md w-full overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Rank display */}
              <div className="text-center mb-2">
                <span className={`text-lg font-semibold ${rank.color}`}>
                  {rank.title}
                </span>
              </div>

              {/* Current fact */}
              <motion.div
                key={currentFact.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <span className={`
                  inline-block px-3 py-1 rounded-full text-xs font-medium mb-2
                  ${getCategoryStyle(currentFact.category)}
                `}>
                  {getCategoryTranslation(currentFact.category)}
                </span>
              <p className="text-brown-800 font-medium mb-2">
                {currentFact.fact}
              </p>
              
              {/* Display discount code if it's the 10th horseshoe */}
              {horseshoesCollected === 10 && discountCode && (
                <div className="mt-2 p-3 bg-brown-50 rounded-lg border border-brown-200">
                  <h3 className="text-brown-800 font-semibold mb-2">
                    Gratulacje! Otrzymujesz kod rabatowy 5%
                  </h3>
                  <p className="text-sm text-brown-700 mb-2">
                    Użyj tych słów podczas składania zamówienia:
                  </p>
                  <div className="flex justify-center gap-2 font-bold text-brown-800">
                    <span>{discountCode.word1}</span>
                    <span>+</span>
                    <span>{discountCode.word2}</span>
                  </div>
                  <p className="text-xs text-brown-600 mt-2">
                    Podaj te słowa w formularzu zamówienia lub podczas rozmowy telefonicznej
                  </p>
                </div>
              )}
              </motion.div>

              {/* Progress steps */}
              <div className="mt-3 relative">
                <div className="flex justify-between items-center">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="relative flex flex-col items-center">
                      <div 
                        className={`w-2 h-2 rounded-full ${i < completedSteps ? 'bg-amber-600' : 'bg-amber-200'}`}
                      />
                      {i < completedSteps && i + 1 < completedSteps && (
                        <div className="absolute w-full h-0.5 bg-amber-600" style={{
                          left: '50%',
                          top: '4px',
                          transform: 'translateY(-50%)',
                          zIndex: -1
                        }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <p className="text-sm text-brown-800/80 mt-2 text-center">
                Zbierz jeszcze {10 - completedSteps} {10 - completedSteps === 1 ? 'podkowę' : 'podków'}, aby poznać kolejną ciekawostkę!
              </p>

              {/* Stats */}
              <div className="mt-2 grid grid-cols-2 gap-2 text-center text-sm">
                <div className="bg-brown-50 rounded-lg p-2">
                  <div className="font-semibold text-brown-800">Zebrane podkowy</div>
                  <div className="text-brown-600">{horseshoesCollected}</div>
                </div>
                <div className="bg-brown-50 rounded-lg p-2">
                  <div className="font-semibold text-brown-800">Poznane ciekawostki</div>
                  <div className="text-brown-600">{Math.floor(horseshoesCollected / 10)}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
