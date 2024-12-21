import { motion } from 'framer-motion'
import { Button } from '../../ui/button'

interface QuizStartProps {
  onStart: () => void;
  questionCount: number;
}

interface QuizFeatureProps {
  icon: string;
  title: string;
  description: string;
  delay: number;
}

function QuizFeature({ icon, title, description, delay }: QuizFeatureProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="flex items-center gap-3 group bg-accent-bg/10 p-4 rounded-lg hover:bg-accent-bg/20 transition-colors"
    >
      <div className="p-2 bg-accent-bg/50 rounded-lg">
        <span className="text-xl">{icon}</span>
      </div>
      <div>
        <p className="font-semibold text-primary-text">{title}</p>
        <p className="text-sm text-secondary-text">{description}</p>
      </div>
    </motion.div>
  )
}

export function QuizStart({ onStart, questionCount }: QuizStartProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <motion.div
        className="flex flex-col lg:flex-row items-center gap-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex-1 max-w-[600px]">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-text mb-4 md:mb-6 leading-tight">
            Jakim typem jeźdźca jesteś?
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-secondary-text mb-6 md:mb-8 max-w-[90%]">
            Odkryj swój unikalny styl jeździecki! Ten quiz pomoże Ci zrozumieć Twoje naturalne predyspozycje i wskaże najlepszą ścieżkę rozwoju.
          </p>
          <Button onClick={onStart} size="large">
            Rozpocznij Quiz
          </Button>
        </div>
        <div className="lg:flex-1 w-full lg:w-[500px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-secondary-bg rounded-2xl p-6 shadow-lg backdrop-blur-sm"
          >
            <h2 className="text-xl font-semibold text-primary-text mb-4">
              Co zawiera quiz?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <QuizFeature
                icon="📋"
                title={`${questionCount} pytań`}
                description="Szczegółowa analiza"
                delay={0.1}
              />
              <QuizFeature
                icon="🎯"
                title="Osobowość"
                description="Profil jeździecki"
                delay={0.2}
              />
              <QuizFeature
                icon="🎓"
                title="Wiedza"
                description="Ocena techniczna"
                delay={0.3}
              />
              <QuizFeature
                icon="🎯"
                title="Plan rozwoju"
                description="Spersonalizowany"
                delay={0.4}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
