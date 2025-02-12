import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { History, Heart, Trophy, Users, ArrowRight, Mail } from 'lucide-react'
import { Button } from './ui/button'

interface ValueCard {
  title: string
  description: string
  impact: string
  icon: React.ElementType
}

const valueCards: ValueCard[] = [
  {
    title: 'Polski Produkt',
    description: 'Najwyższa jakość wykonania i materiałów',
    impact: 'Duma z polskiego rzemiosła',
    icon: Trophy
  },
  {
    title: 'Zespół Projektowy',
    description: 'Własny interdyscyplinarny zespół projektowy',
    impact: 'Od koncepcji do realizacji pod jednym dachem',
    icon: Users
  },
  {
    title: 'Indywidualne Podejście',
    description: 'Każdy projekt dostosowany do potrzeb klienta',
    impact: 'Twoja wizja, nasze wykonanie',
    icon: Heart
  },
  {
    title: 'Zasięg Europejski',
    description: 'Obecność i uznanie na rynku europejskim',
    impact: 'Międzynarodowe standardy jakości',
    icon: History
  }
]

const milestones = [
  {
    step: 1,
    title: 'Jakość',
    description: 'Precyzja wykonania i najlepsze materiały'
  },
  {
    step: 2,
    title: 'Satysfakcja',
    description: 'Zadowolenie klienta naszym priorytetem'
  },
  {
    step: 3,
    title: 'Rozwój',
    description: 'Ciągłe doskonalenie i innowacje'
  }
]

const AboutUs: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center lg:text-left mb-8"
          >
            <h2 className="text-3xl font-bold text-primary-text mb-4">
              O Nas
            </h2>
            <p className="text-xl text-secondary-text">
              Młoda, dynamiczna firma z pasją do jeździectwa i designu. 
              Łączymy polską jakość wykonania z innowacyjnym podejściem, 
              tworząc sprzęt jeździecki na najwyższym europejskim poziomie.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {valueCards.map((card, index) => (
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
                <p className="text-base text-secondary-text mb-3">
                  {card.description}
                </p>
                <p className="text-base font-medium text-primary italic">
                  {card.impact}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:w-[340px] lg:flex lg:flex-col lg:justify-between lg:mt-[40px]">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-secondary-bg rounded-lg p-6 mb-6"
          >
            <h3 className="text-xl font-semibold text-primary-text mb-6">
              Nasze Priorytety
            </h3>
            <div className="space-y-6">
              {milestones.map((item, index) => (
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

          <motion.a
            href="mailto:biuro@swiatjezdzca.pl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-secondary-bg rounded-lg p-5 text-center block hover:shadow-lg transition-shadow"
          >
            <p className="text-base text-primary-text mb-3">
              Chcesz dowiedzieć się więcej?
            </p>
            <Button className="w-full flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              Skontaktuj się z nami
            </Button>
          </motion.a>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
