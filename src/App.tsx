import { useRef, useEffect, Suspense, lazy } from 'react'
import { Mail, Info, HelpCircle, Home as HomeIcon, Trophy, CircleUser } from 'lucide-react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HelmetProvider } from 'react-helmet-async'
import { BackgroundAnimations } from './components/BackgroundAnimations'
import { MouseAnimations } from './components/MouseAnimations'
import { HorseshoeCollector } from './components/HorseshoeCollector'
import { HorseshoeInfoPopup } from './components/HorseshoeInfoPopup'
import { HorseshoeSpawner } from './components/HorseshoeSpawner'
import { Navigation } from './components/Navigation'
import { Home } from './components/Home'
import { SEO } from './components/SEO'
import { SkipLink } from './components/SkipLink'
import { KeyboardInstructions } from './components/KeyboardInstructions'
import { PrivacyPreferences } from './components/PrivacyPreferences'
import type { NavItem } from './types'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { AppProvider, useApp } from './context/AppContext'
import { HorseshoeProvider, useHorseshoe } from './context/HorseshoeContext'
import { ErrorBoundary } from './components/ErrorBoundary'
import { LoadingSpinner } from './components/LoadingSpinner'
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation'

// Lazy load components
const AboutUs = lazy(() => import('./components/AboutUs'))
const AboutShowjumping = lazy(() => import('./components/AboutShowjumping'))
const Footer = lazy(() => import('./components/Footer'))
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'))
const Products = lazy(() => import('./components/Products'))
const RequestOffer = lazy(() => import('./components/RequestOffer'))
const Game = lazy(() => import('./components/Quiz/Game'))

// Page transition variants
const pageTransition = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
}

function MainContent() {
  const { 
    currentSection, 
    setCurrentSection, 
    isMobile, 
    showPrivacyPreferences, 
    setShowPrivacyPreferences,
    isScrolling,
    setIsScrolling 
  } = useApp()
  
  const { horseshoesCollected, mousePosition, handleMouseMove, collectHorseshoe } = useHorseshoe()
  
  const sectionsRef = useRef<(HTMLElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollAccumulator = useRef(0)
  const lastScrollTime = useRef(Date.now())
  const lastDelta = useRef(0)
  const SCROLL_THRESHOLD = 150
  const SCROLL_COOLDOWN = 300
  const ACCUMULATOR_RESET_DELAY = 200
  const lastAccumulatorReset = useRef(Date.now())
  const sections: NavItem[] = [
    { id: 0, title: 'Strona Główna', icon: HomeIcon },
    { id: 1, title: 'Produkty', icon: CircleUser },
    { id: 2, title: 'O Sprzęcie', icon: HelpCircle },
    { id: 3, title: 'O Nas', icon: Info },
    { id: 4, title: 'Gra', icon: Trophy },
    { id: 5, title: 'Zapytanie', icon: Mail },
  ]

  const scrollToSection = (index: number) => {
    const section = sectionsRef.current[index]
    if (section) {
      if (isMobile) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        section.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
      }
      setCurrentSection(index)
    }
  }

  // Enable keyboard navigation
  useKeyboardNavigation({
    currentSection,
    totalSections: sections.length,
    onNavigate: scrollToSection,
    enabled: !isMobile
  })

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isMobile) return

      if (e.target instanceof Element) {
        const targetElement = e.target as Element
        if (
          targetElement.tagName === 'SELECT' ||
          targetElement.closest('select') ||
          targetElement.closest('.dropdown-content')
        ) {
          return
        }
      }
      
      e.preventDefault()
      
      if (isScrolling || !containerRef.current) return

      const now = Date.now()
      
      if (now - lastAccumulatorReset.current > ACCUMULATOR_RESET_DELAY) {
        scrollAccumulator.current = 0
        lastAccumulatorReset.current = now
      }

      if (now - lastScrollTime.current < SCROLL_COOLDOWN) {
        return
      }

      let normalizedDelta = e.deltaY
      if (e.deltaMode === 1) {
        normalizedDelta *= 5
      } else if (e.deltaMode === 2) {
        normalizedDelta *= window.innerHeight / 4
      }

      if (Math.sign(normalizedDelta) !== Math.sign(lastDelta.current)) {
        scrollAccumulator.current = 0
      }
      lastDelta.current = normalizedDelta

      if (Math.abs(normalizedDelta) < 50) {
        normalizedDelta *= 0.3
      }

      scrollAccumulator.current += normalizedDelta

      if (Math.abs(scrollAccumulator.current) < SCROLL_THRESHOLD) {
        return
      }

      setIsScrolling(true)
      lastScrollTime.current = now
      
      let nextSection = currentSection
      
      if (scrollAccumulator.current < 0 && currentSection > 0) {
        nextSection = currentSection - 1
      } else if (scrollAccumulator.current > 0 && currentSection < sectionsRef.current.length - 1) {
        nextSection = currentSection + 1
      }
      
      scrollAccumulator.current = 0
      lastAccumulatorReset.current = now
      
      scrollToSection(nextSection)
      
      setTimeout(() => {
        setIsScrolling(false)
      }, 500)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel)
      }
    }
  }, [currentSection, isScrolling, isMobile, setIsScrolling])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionsRef.current.findIndex((ref) => ref === entry.target)
            if (index !== -1) {
              setCurrentSection(index)
            }
          }
        })
      },
      { threshold: 0.5 }
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section)
      })
    }
  }, [setCurrentSection])

  return (
    <div 
      className={`
        bg-hero-gradient flex flex-col
        ${isMobile ? 'min-h-screen' : 'h-screen overflow-hidden'}
      `}
      onMouseMove={handleMouseMove}
      onClick={collectHorseshoe}
    >
      <SEO 
        title={`Świat Jeźdźca - ${sections[currentSection].title}`}
        description={
          currentSection === 0 
            ? "Producent profesjonalnego sprzętu jeździeckiego. Tworzymy wysokiej jakości przeszkody dla ośrodków jeździeckich na całym świecie."
            : `Dowiedz się więcej o ${sections[currentSection].title.toLowerCase()} w Świat Jeźdźca`
        }
      />

      {/* Accessibility Skip Links */}
      <SkipLink targetId="main-content">Przejdź do głównej treści</SkipLink>
      <SkipLink targetId="main-nav">Przejdź do nawigacji</SkipLink>

      {/* Logo */}
      <div className="fixed left-4 top-4 z-50">
        <img 
          src="/images/logo dark.png"
          alt="Świat Jeźdźca Logo"
          className="h-8 md:h-12 w-auto"
        />
      </div>

      <BackgroundAnimations />
      <HorseshoeInfoPopup />
      <MouseAnimations mousePosition={mousePosition} />
      <HorseshoeCollector horseshoesCollected={horseshoesCollected} />
      <HorseshoeSpawner />
      
      {/* Main Navigation */}
      <nav id="main-nav" role="navigation" aria-label="Główna nawigacja">
        <Navigation 
          sections={sections}
          currentSection={currentSection}
          onNavigate={scrollToSection}
        />
      </nav>

      {/* Content sections */}
      <main 
        id="main-content"
        ref={containerRef}
        className={`
          relative z-10 w-full
          ${isMobile ? 'min-h-screen' : 'h-full snap-x snap-mandatory overflow-hidden'}
          smooth-scroll
          ${isMobile ? 'flex-col' : 'flex-row'}
          flex
        `}
        role="main"
        aria-live="polite"
      >
        {sections.map((section, index) => (
          <motion.section 
            key={section.id}
            ref={el => sectionsRef.current[index] = el}
            className={`
              relative
              ${isMobile ? 'w-full py-16' : 'min-w-full w-screen h-screen flex-shrink-0 snap-start'}
              flex items-center justify-center
              ${isMobile ? 'px-4 md:px-6' : 'px-20'}
            `}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}
            role="region"
            aria-label={section.title}
            tabIndex={0}
          >
            <div className="w-full overflow-hidden">
              <ErrorBoundary>
                <Suspense fallback={<LoadingSpinner />}>
                  {index === 0 && <Home onDiscoverClick={() => scrollToSection(1)} onContactClick={() => scrollToSection(5)} />}
                  {index === 1 && <Products />}
                  {index === 2 && <AboutShowjumping />}
                  {index === 3 && <AboutUs />}
                  {index === 4 && <Game />}
                  {index === 5 && <RequestOffer />}
                </Suspense>
              </ErrorBoundary>
            </div>
          </motion.section>
        ))}
      </main>

      {showPrivacyPreferences && (
        <div role="complementary" aria-label="Preferencje prywatności">
          <PrivacyPreferences onClose={() => setShowPrivacyPreferences(false)} />
        </div>
      )}
      
      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      {/* Keyboard Navigation Instructions */}
      {!isMobile && <KeyboardInstructions />}
    </div>
  )
}

function AppWithProviders() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <AppProvider>
          <HorseshoeProvider>
            <MainContent />
          </HorseshoeProvider>
        </AppProvider>
      </HelmetProvider>
    </ErrorBoundary>
  )
}

export default function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ErrorBoundary>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<AppWithProviders />} />
            <Route path="/privacy" element={
              <Suspense fallback={<LoadingSpinner />}>
                <PrivacyPolicy />
              </Suspense>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </ErrorBoundary>
      <SpeedInsights />
    </Router>
  )
}
