import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Wrench, Target, Shield, Palette, ArrowRight, Star } from 'lucide-react'
import { Button } from './ui/button'

interface InfoCard {
  title: string
  benefit: string
  emotion: string
  icon: React.ElementType
}

const infoCards: InfoCard[] = [
  {
    title: 'Łatwość Użytkowania',
    benefit: 'Szybkie rozstawienie i prosta obsługa',
    emotion: 'Skup się na jeździe, nie na przygotowaniach',
    icon: Wrench
  },
  {
    title: 'Wszechstronność',
    benefit: 'Od podstaw po zaawansowane kombinacje',
    emotion: 'Rozwijaj się w swoim tempie',
    icon: Target
  },
  {
    title: 'Bezpieczeństwo i Komfort',
    benefit: 'Stabilna konstrukcja i ergonomiczne rozwiązania',
    emotion: 'Trenuj z pewnością i spokojem',
    icon: Shield
  },
  {
    title: 'Innowacyjny Design',
    benefit: 'Nowoczesna estetyka i funkcjonalność',
    emotion: 'Wyróżnij się stylem na parkurze',
    icon: Palette
  }
]

const roadmap = [
  {
    step: 1,
    title: 'Łatwy Start',
    description: 'Szybki montaż i gotowość do treningu w kilka minut'
  },
  {
    step: 2,
    title: 'Komfortowy Trening',
    description: 'Intuicyjna regulacja i stabilna konstrukcja'
  },
  {
    step: 3,
    title: 'Długotrwała Satysfakcja',
    description: 'Niezawodny sprzęt na lata treningów'
  }
]

const AboutShowjumping: React.FC = () => {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center lg:text-left mb-10"
          >
            <h2 className="text-3xl font-bold text-primary-text mb-4">
              O Sprzęcie Jeździeckim
            </h2>
            <p className="text-xl text-secondary-text">
              Twój komfort i rozwój są dla nas priorytetem. Tworzymy sprzęt, który nie tylko spełnia 
              najwyższe standardy, ale przede wszystkim ułatwia codzienne treningi.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {infoCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-primary-bg rounded-lg shadow-md p-6 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4 mb-3">
                  <motion.div 
                    className="p-2.5 bg-secondary-bg rounded-lg"
                    whileHover={{ rotate: 15 }}
                  >
                    <card.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-primary-text">
                    {card.title}
                  </h3>
                </div>
                <p className="text-base text-secondary-text mb-2">
                  {card.benefit}
                </p>
                <p className="text-base font-medium text-primary italic">
                  {card.emotion}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:w-[380px]">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-secondary-bg rounded-lg p-6 mb-6"
          >
            <h3 className="text-xl font-semibold text-primary-text mb-6">
              Droga do Sukcesu
            </h3>
            <div className="space-y-6">
              {roadmap.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-base font-medium">
                      {item.step}
                    </div>
                    <ArrowRight className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-primary-text">
                      {item.title}
                    </h4>
                    <p className="text-sm text-secondary-text">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-secondary-bg rounded-lg p-6 text-center"
          >
            <p className="text-base text-primary-text mb-4">
              Jak oceniasz nasze rozwiązania?
            </p>
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.div
                  key={star}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onHoverStart={() => setHoveredStar(star)}
                  onHoverEnd={() => setHoveredStar(null)}
                  className="cursor-pointer"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoveredStar || 0)
                        ? 'text-primary fill-primary'
                        : 'text-secondary-text'
                    }`}
                  />
                </motion.div>
              ))}
            </div>
            <Button className="w-full">
              Rozpocznij Swoją Przygodę
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AboutShowjumping;
