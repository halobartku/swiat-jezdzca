import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Star, Quote, MessageCircle, Pencil, Hammer, Shield, Truck, Headphones, ArrowLeft, ArrowRight } from 'lucide-react'

const Cooperation: React.FC = () => {
  const processSteps = [
    {
      icon: MessageCircle,
      title: "Konsultacja",
      description: "Omówienie potrzeb i wymagań"
    },
    {
      icon: Pencil,
      title: "Projekt",
      description: "Przygotowanie indywidualnego projektu"
    },
    {
      icon: Hammer,
      title: "Produkcja",
      description: "Wykonanie sprzętu w naszym zakładzie"
    },
    {
      icon: Shield,
      title: "Kontrola",
      description: "Testy bezpieczeństwa i jakości"
    },
    {
      icon: Truck,
      title: "Dostawa",
      description: "Transport i profesjonalny montaż"
    },
    {
      icon: Headphones,
      title: "Wsparcie",
      description: "Serwis i obsługa posprzedażowa"
    }
  ]

  const testimonials = [
    // Original testimonials
    {
      name: "Anna Kowalska",
      role: "Trener Kadry Narodowej",
      quote: "Sprzęt od Świat Jeźdźca spełnia najwyższe standardy. Używamy go podczas zawodów międzynarodowych i treningów. Jakość wykonania jest niezrównana.",
      rating: 5
    },
    {
      name: "Stajnia Parkur",
      role: "Ośrodek Jeździecki",
      quote: "Współpracujemy ze Świat Jeźdźca od lat. Ich przeszkody są nie tylko bezpieczne i trwałe, ale też pięknie się prezentują na naszym parkurze.",
      rating: 5
    },
    {
      name: "Marek Nowicki",
      role: "Organizator Zawodów",
      quote: "Profesjonalne podejście i terminowość to znaki rozpoznawcze tej firmy. Sprzęt zawsze dociera na czas i spełnia wszystkie wymogi FEI.",
      rating: 5
    },
    {
      name: "KJ Grand",
      role: "Klub Jeździecki",
      quote: "Przeszkody treningowe od Świat Jeźdźca sprawdzają się doskonale w codziennej pracy. Świetny stosunek jakości do ceny.",
      rating: 5
    },
    // Additional testimonials
    {
      name: "Centrum Hippiki",
      role: "Ośrodek Szkoleniowy",
      quote: "Przeszkody od Świat Jeźdźca są nieodłącznym elementem naszych treningów. Ich jakość i design są na najwyższym poziomie.",
      rating: 5
    },
    {
      name: "Jan Wiśniewski",
      role: "Trener Skoków",
      quote: "Współpraca ze Świat Jeźdźca to czysta przyjemność. Profesjonalne podejście i zrozumienie potrzeb jeźdźca to ich mocne strony.",
      rating: 5
    },
    {
      name: "Stajnia Victoria",
      role: "Klub Jeździecki",
      quote: "Nasze przeszkody treningowe służą nam już kilka lat i wciąż wyglądają jak nowe. Świetna inwestycja w rozwój klubu.",
      rating: 5
    },
    {
      name: "Akademia Jeździecka",
      role: "Szkoła Jazdy Konnej",
      quote: "Sprzęt idealnie sprawdza się w codziennej pracy z młodymi jeźdźcami. Bezpieczeństwo i jakość na pierwszym miejscu.",
      rating: 5
    },
    {
      name: "Tomasz Kowalczyk",
      role: "Zawodnik Międzynarodowy",
      quote: "Trenując na sprzęcie od Świat Jeźdźca, czuję się pewnie podczas najważniejszych zawodów. To sprzęt najwyższej klasy.",
      rating: 5
    },
    {
      name: "Stajnia Galop",
      role: "Ośrodek Jeździecki",
      quote: "Przeszkody sponsorskie wykonane przez Świat Jeźdźca przyciągają uwagę podczas każdych zawodów. Jakość i estetyka idą w parze.",
      rating: 5
    }
  ]

  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState<number>(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      nextTestimonial()
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, currentTestimonialIndex])

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev: number) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    )
  }

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev: number) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 h-full flex flex-col justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-primary-text">Współpraca</h2>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-primary-bg/90 backdrop-blur-sm rounded-2xl shadow-lg p-4 md:p-6"
      >
        <div className="space-y-8">
          {/* Process Section */}
          <div className="bg-gradient-to-r from-primary to-accent-hover text-primary-bg p-4 rounded-xl">
            <h3 className="text-base md:text-lg font-semibold mb-4 text-center">Nasz Proces</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center text-center gap-2 group p-2"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary-bg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <step.icon className="w-5 h-5 md:w-6 md:h-6 text-primary group-hover:text-accent-hover transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-primary-bg font-medium text-sm">{step.title}</h4>
                    <p className="text-primary-bg/90 text-xs">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="relative">
            <h3 className="text-base md:text-lg font-semibold text-primary-text mb-4 text-center">Opinie Klientów</h3>
            <div className="relative px-4 md:px-8 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonialIndex}
                  initial={{ opacity: 0, x: 20, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.98 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 80, 
                    damping: 20,
                    mass: 0.8,
                    opacity: { duration: 0.15 },
                    scale: { duration: 0.2 }
                  }}
                  className="bg-secondary-bg p-6 rounded-xl relative max-w-2xl mx-auto min-h-[240px] overflow-hidden"
              >
                <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
                <div className="mb-4">
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonials[currentTestimonialIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                    ))}
                  </div>
                  <p className="text-primary text-base italic leading-relaxed">
                    "{testimonials[currentTestimonialIndex].quote}"
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary-text">
                    {testimonials[currentTestimonialIndex].name}
                  </h3>
                  <p className="text-secondary-text">
                    {testimonials[currentTestimonialIndex].role}
                  </p>
                </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between pointer-events-none px-2 -mx-8 md:-mx-12">
                <button
                  onClick={prevTestimonial}
                  className="p-2 bg-primary-bg rounded-full shadow-lg hover:bg-accent-bg/10 transition-all hover:scale-110 pointer-events-auto"
                >
                  <ArrowLeft className="w-5 h-5 text-primary" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-2 bg-primary-bg rounded-full shadow-lg hover:bg-accent-bg/10 transition-all hover:scale-110 pointer-events-auto"
                >
                  <ArrowRight className="w-5 h-5 text-primary" />
                </button>
              </div>

              {/* Dots Navigation */}
              <div className="flex justify-center gap-2 mt-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentTestimonialIndex(index)
                      setIsAutoPlaying(false)
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentTestimonialIndex 
                        ? 'bg-primary w-4' 
                        : 'bg-primary/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Cooperation;
