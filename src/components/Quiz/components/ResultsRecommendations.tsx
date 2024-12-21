import { motion } from 'framer-motion'

interface ResultsRecommendationsProps {
  detailedRecommendations: string[];
}

export function ResultsRecommendations({ detailedRecommendations }: ResultsRecommendationsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col"
    >
      <div className="bg-white/50 rounded-lg p-2 shadow-sm">
        <h3 className="text-sm font-semibold text-primary-text mb-1.5 flex items-center">
          <span className="text-primary mr-2">📋</span>
          Spersonalizowane Rekomendacje
        </h3>
        <ul className="space-y-1.5">
          {detailedRecommendations.map((rec: string, index: number) => (
            <li key={index} className="flex items-center gap-3">
              <span className="text-primary text-base sm:text-lg flex-shrink-0">→</span>
              <span className="flex-1 text-xs text-secondary-text/80 leading-snug">{rec}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
