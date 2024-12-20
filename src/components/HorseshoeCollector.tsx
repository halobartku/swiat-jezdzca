import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Horseshoe } from './icons/Horseshoe';
import { equestrianFacts, type EquestrianFact } from '../data/equestrianFacts';
import { generateDiscountCode } from '../data/discountWords';
import LottieAnimation from './LottieAnimation';
import successAnimation from '../animations/success.json';
import { useHorseshoe } from '../context/HorseshoeContext';
import { useApp } from '../context/AppContext';

interface HorseshoeCollectorProps {
  horseshoesCollected: number;
}

const getRank = (count: number) => {
  if (count < 50) return { title: 'Poziom Cavaletti 40cm', color: 'text-primary' };
  if (count < 100) return { title: 'Poziom Stacjonata 80cm', color: 'text-primary' };
  if (count < 200) return { title: 'Poziom Oxer 120cm', color: 'text-primary' };
  if (count < 300) return { title: 'Poziom Szereg 160cm', color: 'text-primary' };
  return { title: 'Poziom Olimpijski 200cm', color: 'text-primary' };
};

export function HorseshoeCollector({ horseshoesCollected }: HorseshoeCollectorProps) {
  const { spawnEnabled, toggleSpawn } = useHorseshoe();
  const { isMobile } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showFactUnlock, setShowFactUnlock] = useState(false);
  const [discountCode5, setDiscountCode5] = useState<{ word1: string; word2: string } | null>(null);
  const [discountCode10, setDiscountCode10] = useState<{ word1: string; word2: string } | null>(null);
  const prevCountRef = useRef(horseshoesCollected);
  
  const [shownFactIds, setShownFactIds] = useState<number[]>([]);
  const [displayedFact, setDisplayedFact] = useState<EquestrianFact | null>(null);
  
  const getRandomFact = useCallback(() => {
    // Get available facts (excluding recently shown ones)
    const availableFacts = equestrianFacts.filter(fact => !shownFactIds.includes(fact.id));
    
    // If all facts have been shown, reset the history
    if (availableFacts.length === 0) {
      setShownFactIds([]);
      return equestrianFacts[Math.floor(Math.random() * equestrianFacts.length)];
    }
    
    // Get a random fact from available ones
    const randomFact = availableFacts[Math.floor(Math.random() * availableFacts.length)];
    
    // Update shown facts history
    setShownFactIds(prev => [...prev, randomFact.id]);
    
    return randomFact;
  }, [shownFactIds]);

  // Initialize first fact
  useEffect(() => {
    if (!displayedFact) {
      setDisplayedFact(equestrianFacts[0]);
    }
  }, []);


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
        
        // Get new random fact at milestone
        const newFact = getRandomFact();
        setDisplayedFact(newFact);
        
        // Generate discount codes at specific milestones
        if (horseshoesCollected === 10) {
          setDiscountCode5(generateDiscountCode());
        } else if (horseshoesCollected === 20) {
          setDiscountCode5(null);
        } else if (horseshoesCollected === 50) {
          setDiscountCode10(generateDiscountCode());
        } else if (horseshoesCollected === 60) {
          setDiscountCode10(null);
        }
        
        const factTimer = setTimeout(() => setShowFactUnlock(false), 3000);
        return () => clearTimeout(factTimer);
      }
    }
    
    prevCountRef.current = horseshoesCollected;
  }, [horseshoesCollected]);

  const rank = getRank(horseshoesCollected);

  const getCategoryStyle = (category: string) => {
    switch (category) {
      case 'history':
        return 'bg-secondary-bg text-primary-text border border-primary/20';
      case 'sport':
        return 'bg-secondary-bg text-primary-text border border-primary/20';
      case 'training':
        return 'bg-secondary-bg text-primary-text border border-primary/20';
      case 'equipment':
        return 'bg-secondary-bg text-primary-text border border-primary/20';
      default:
        return 'bg-secondary-bg text-primary-text border border-primary/20';
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

  if (!displayedFact) return null;

  return (
    <>
      {/* Collector button */}
      <motion.div 
        className={`
          fixed z-50 bg-primary-bg/80 backdrop-blur-sm rounded-lg shadow-lg p-2 border border-primary/20 flex flex-col gap-2
          ${isMobile ? 'top-4 right-16' : 'bottom-8 left-8'}
        `}
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
          <div className="w-5 h-5 text-primary-text group-hover:text-primary transition-colors flex items-center">
            <Horseshoe className="w-full h-full horseshoe-collector-icon" />
          </div>
          <span className="text-lg font-bold text-primary-text group-hover:text-primary transition-colors flex items-center">
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
                className={`
                  absolute top-1/2 -translate-y-1/2 z-[60]
                  ${isMobile ? 'right-full mr-3' : 'left-full ml-3'}
                `}
                initial={{ opacity: 0, x: isMobile ? 10 : -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isMobile ? -10 : 10 }}
              >
                <motion.div
                  className="text-red-600 font-bold text-sm whitespace-nowrap bg-white/90 px-3 py-1.5 rounded-lg shadow-sm"
                >
                  {horseshoesCollected === 10 ? 'Otrzymałeś zniżkę 5%!' : 
                   horseshoesCollected === 50 ? 'Otrzymałeś zniżkę 10%!' : 
                   'Nowa ciekawostka!'}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Game toggle switch */}
        <div className="flex items-center justify-center gap-2 pt-1 border-t border-primary/20">
          <span className="text-xs font-medium text-primary-text">Gra</span>
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
              className="bg-primary-bg rounded-xl shadow-xl p-4 mx-4 mb-safe mt-4 max-w-md w-full overflow-hidden max-h-[80vh] overflow-y-auto"
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
              {/* Rank display */}
              <div className="text-center mb-2">
                <span className="text-lg font-semibold text-primary-text">
                  {rank.title}
                </span>
              </div>

              {/* Current fact */}
              <div className="text-center">
                <span className={`
                  inline-block px-3 py-1 rounded-full text-xs font-medium mb-2
                  ${getCategoryStyle(displayedFact.category)}
                `}>
                  {getCategoryTranslation(displayedFact.category)}
                </span>
                <p className="text-primary-text font-medium mb-2">
                  {displayedFact.fact}
                </p>
                
                {/* Display 5% discount code between 10-20 horseshoes */}
                {horseshoesCollected >= 10 && horseshoesCollected < 20 && discountCode5 && (
                  <div className="mt-2 p-3 bg-secondary-bg rounded-lg border border-primary/20">
                    <h3 className="text-primary-text font-semibold mb-2">
                      Gratulacje! Otrzymujesz kod rabatowy 5%
                    </h3>
                    <p className="text-sm text-secondary-text mb-2">
                      Użyj tych słów podczas składania zamówienia:
                    </p>
                    <div className="flex justify-center gap-2 font-bold text-primary-text">
                      <span>{discountCode5.word1}</span>
                      <span>+</span>
                      <span>{discountCode5.word2}</span>
              </div>
                    <p className="text-xs text-secondary-text mt-2">
                      Podaj te słowa w formularzu zamówienia lub podczas rozmowy telefonicznej
                    </p>
                  </div>
                )}

                {/* Display 10% discount code between 50-60 horseshoes */}
                {horseshoesCollected >= 50 && horseshoesCollected < 60 && discountCode10 && (
                  <div className="mt-2 p-3 bg-secondary-bg rounded-lg border border-primary/20">
                    <h3 className="text-primary-text font-semibold mb-2">
                      Gratulacje! Otrzymujesz kod rabatowy 10%
                    </h3>
                    <p className="text-sm text-secondary-text mb-2">
                      Użyj tych słów podczas składania zamówienia:
                    </p>
                    <div className="flex justify-center gap-2 font-bold text-primary-text">
                      <span>{discountCode10.word1}</span>
                      <span>+</span>
                      <span>{discountCode10.word2}</span>
                    </div>
                    <p className="text-xs text-secondary-text mt-2">
                      Podaj te słowa w formularzu zamówienia lub podczas rozmowy telefonicznej
                    </p>
                  </div>
                )}
              </div>

              {/* Progress horseshoes */}
              <div className="mt-3 relative px-2">
                <div className="flex justify-between items-center">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="relative flex flex-col items-center">
                      <div className="w-5 h-5">
                        <Horseshoe 
                          className={`w-full h-full transition-colors ${
                            i < completedSteps 
                              ? 'text-primary filter brightness-110' 
                              : 'text-secondary-text/30'
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <p className="text-sm text-secondary-text mt-2 text-center">
                Zbierz jeszcze {10 - completedSteps} {10 - completedSteps === 1 ? 'podkowę' : 'podków'}, aby poznać kolejną ciekawostkę!
              </p>

              {/* Stats */}
              <div className="mt-2 grid grid-cols-2 gap-2 text-center text-sm">
                <div className="bg-secondary-bg rounded-lg p-2">
                  <div className="font-semibold text-primary-text">Zebrane podkowy</div>
                  <div className="text-secondary-text">{horseshoesCollected}</div>
                </div>
                <div className="bg-secondary-bg rounded-lg p-2">
                  <div className="font-semibold text-primary-text">Poznane ciekawostki</div>
                  <div className="text-secondary-text">{Math.floor(horseshoesCollected / 10)}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
