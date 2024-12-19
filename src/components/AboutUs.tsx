import { motion } from 'framer-motion'
import { Shield, Award, Wrench, Target } from 'lucide-react'

const AboutUs: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: "Certyfikowana Jakość",
      description: "Spełniamy najwyższe standardy FEI"
    },
    {
      icon: Award,
      title: "20 Lat Doświadczenia",
      description: "Zaufany partner w sporcie jeździeckim"
    },
    {
      icon: Wrench,
      title: "Własna Produkcja",
      description: "Pełna kontrola nad jakością sprzętu"
    },
    {
      icon: Target,
      title: "Gwarancja Satysfakcji",
      description: "Zadowolenie klienta jest priorytetem"
    }
  ]

  const process = [
    {
      step: 1,
      title: "Konsultacja",
      description: "Omówienie potrzeb i wymagań"
    },
    {
      step: 2,
      title: "Projekt",
      description: "Przygotowanie indywidualnego projektu"
    },
    {
      step: 3,
      title: "Produkcja",
      description: "Wykonanie sprzętu w naszym zakładzie"
    },
    {
      step: 4,
      title: "Kontrola",
      description: "Testy bezpieczeństwa i jakości"
    },
    {
      step: 5,
      title: "Dostawa",
      description: "Transport i profesjonalny montaż"
    },
    {
      step: 6,
      title: "Wsparcie",
      description: "Serwis i obsługa posprzedażowa"
    }
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 h-full flex flex-col justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-primary-text">O Nas</h2>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-primary-bg/90 backdrop-blur-sm rounded-2xl shadow-lg p-4 md:p-6"
      >
        <div className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <div>
              <div className="aspect-video rounded-xl overflow-hidden shadow-md mb-2 md:mb-3">
                <img 
                  src="/images/hero-jump.jpg"
                  alt="Profesjonalny sprzęt jeździecki"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-primary text-sm leading-relaxed">
                Świat Jeźdźca to firma z wieloletnim doświadczeniem w produkcji profesjonalnego
                sprzętu jeździeckiego. Nasze produkty są wykorzystywane na arenach międzynarodowych
                i w ośrodkach szkoleniowych w całej Europie.
              </p>
            </div>

            <div className="bg-gradient-to-br from-primary to-accent-hover text-primary-bg p-4 rounded-xl">
              <h3 className="text-base md:text-lg font-semibold mb-3">Nasz Proces</h3>
              <div className="space-y-2.5">
                {process.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2 relative"
                  >
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary-bg flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-xs font-bold text-primary">{step.step}</span>
                    </div>
                    
                    {index < process.length - 1 && (
                      <div className="absolute left-2.5 md:left-3 top-5 md:top-6 w-[1px] h-5 md:h-6 bg-primary-bg/30" />
                    )}
                    
                    <div className="flex-1">
                      <h4 className="text-primary-bg font-medium text-sm">{step.title}</h4>
                      <p className="text-primary-bg/90 text-xs">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-secondary-bg p-2 md:p-3 rounded-xl group hover:bg-accent-bg transition-colors text-center"
              >
                <div className="p-1 md:p-1.5 rounded-lg bg-primary-bg text-primary mx-auto w-fit mb-1.5 md:mb-2 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-primary-text mb-0.5">{feature.title}</h3>
                  <p className="text-secondary-text text-xs leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AboutUs;
