import { motion } from 'framer-motion'
import { Button } from '../../ui/button'
import { ClipboardList, Target, GraduationCap, Compass } from 'lucide-react'

interface QuizStartProps {
  onStart: () => void;
  questionCount: number;
}

interface QuizFeatureProps {
  icon: React.ReactNode;
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
      className="flex items-center gap-3 group bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-sm p-4 rounded-lg hover:from-white/90 hover:to-white/70 transition-all duration-300 shadow-sm hover:shadow-md"
    >
      <div className="p-2 bg-gradient-to-r from-[#ff4d4d] to-[#ff6b6b] rounded-lg shadow-sm">
        <span className="text-white w-5 h-5">{icon}</span>
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
            className="bg-gradient-to-br from-white/90 to-white/70 rounded-2xl p-6 shadow-lg backdrop-blur-sm border border-white/20"
          >
            <h2 className="text-xl font-semibold text-primary-text mb-4">
              Co zawiera quiz?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <QuizFeature
                icon={<ClipboardList size={20} />}
                title={`${questionCount} pytań`}
                description="Szczegółowa analiza"
                delay={0.1}
              />
              <QuizFeature
                icon={<Target size={20} />}
                title="Osobowość"
                description="Profil jeździecki"
                delay={0.2}
              />
              <QuizFeature
                icon={<GraduationCap size={20} />}
                title="Wiedza"
                description="Ocena techniczna"
                delay={0.3}
              />
              <QuizFeature
                icon={<Compass size={20} />}
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
