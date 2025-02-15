import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  return (
    <footer
      className={`
        fixed bottom-0 left-0 right-0 z-10
        bg-primary-bg/80 backdrop-blur-sm border-t border-secondary-border
        pointer-events-auto
        ${isMobile ? 'pb-[env(safe-area-inset-bottom,0px)]' : ''}
      `}
      style={{
        transform: 'translate3d(0, 0, 0)',
        WebkitTransform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        willChange: 'transform'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-1.5 flex justify-center md:justify-between items-center pointer-events-auto">
        <div className={`flex flex-col md:flex-row md:items-center gap-1 md:gap-3 ${isMobile ? '' : 'mb-1 md:mb-0'}`}>
          <p className="text-xs text-primary text-center md:text-left whitespace-nowrap">
            &copy; {new Date().getFullYear()} Świat Jeźdźca
            <span className="hidden md:inline">. All rights reserved.</span>
          </p>
          <span className="hidden md:inline text-secondary-border">|</span>
          <a 
            href="mailto:biuro@swiatjezdzca.pl"
            className="hidden md:inline text-xs text-primary hover:text-accent-hover transition-colors text-center md:text-left cursor-pointer"
          >
            biuro@swiatjezdzca.pl
          </a>
        </div>
        <nav className="hidden md:block text-center md:text-left pointer-events-auto">
          <Link 
            to="/privacy" 
            className="text-xs text-primary hover:text-accent-hover transition-colors cursor-pointer"
          >
Polityka Prywatności
          </Link>
        </nav>
      </div>
    </footer>
  )
}

export default Footer;
