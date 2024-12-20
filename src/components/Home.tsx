import React from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Shield, Award, Wrench, Star, Users, Target, Globe } from 'lucide-react'
import { PolishFlag } from './icons/PolishFlag'

interface HeroProps {
  onDiscoverClick: () => void
  onContactClick: () => void
}

export function Home({ onDiscoverClick, onContactClick }: HeroProps) {
  const features = [
    {
      icon: Shield,
      title: "Bezpieczeństwo",
      description: "Certyfikaty FEI"
    },
    {
      icon: Award,
      title: "Jakość Premium",
      description: "Klasa Zawodowa"
    },
    {
      icon: Wrench,
      title: "Personalizacja",
      description: "Indywidualne Projekty"
    },
    {
      icon: Star,
      title: "Doświadczenie",
      description: "20+ Lat na Rynku"
    },
    {
      icon: Users,
      title: "Obsługa",
      description: "Wsparcie 24/7"
    },
    {
      icon: Target,
      title: "Precyzja",
      description: "Najwyższe Standardy"
    }
  ]

  return (
    <div className="w-full max-w-7xl mx-auto px-4 pt-16 lg:pt-0">
      <div className="flex flex-col lg:flex-row items-start gap-12">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 max-w-[600px]"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-text mb-4 md:mb-6 leading-tight">
            Aluminiowe Przeszkody Jeździeckie
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-secondary-text mb-6 md:mb-8 max-w-[90%]">
            Tworzymy wysokiej jakości przeszkody jeździeckie spełniające oczekiwania jeźdźców, trenerów i parkour masterów w centrach treningowych i arenach międzynarodowych na całym świecie.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button
              onClick={onDiscoverClick}
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-primary hover:bg-accent-hover text-primary-bg rounded-lg transition-colors flex items-center gap-2 text-sm sm:text-base"
            >
              Zobacz Produkty
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={onContactClick}
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-primary-bg hover:bg-secondary-bg text-primary rounded-lg transition-colors border-2 border-primary text-sm sm:text-base"
            >
              Zapytaj o Ofertę
            </button>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-3 group"
              >
                <div className="p-2 bg-secondary-bg rounded-lg group-hover:bg-accent-bg transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-text text-sm sm:text-base">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-secondary-text">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side - Video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:flex-1 w-full lg:w-[500px] self-stretch px-2 sm:px-4"
        >
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/videos/świat jeźdźca przeszkody konne aluminiowe sponsorskie turniejowe.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-4 left-4 right-4 bg-primary-bg/90 backdrop-blur-sm rounded-lg p-4"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <PolishFlag className="w-5 h-3" />
                  <h3 className="font-semibold text-primary-text text-sm sm:text-base">
                    Polski Produkt
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  <p className="text-xs sm:text-sm text-secondary-text">
                    Globalna Marka
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 bg-secondary-bg rounded-xl p-4"
          >
            <div className="flex items-center gap-2 text-primary">
              <Star className="w-5 h-5 text-primary" />
              <p className="text-xs sm:text-sm">
                Zaufały nam dziesiątki ośrodków jeździeckich w całej Europie
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
