import { motion } from 'framer-motion'
import type { RiderType } from '../../../data/riderTypes'

interface ResultsProfileProps {
  scores: Record<RiderType, number>;
  result: RiderType;
  riderTypeDetails: Record<RiderType, {
    title: string;
    description: string;
    icon: string;
  }>;
}

export function ResultsProfile({ scores, result, riderTypeDetails }: ResultsProfileProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col gap-3"
    >
      <div className="bg-white/50 rounded-lg p-2 shadow-sm space-y-1.5">
        <h3 className="text-sm font-semibold text-primary-text mb-1.5 flex items-center">
          <span className="text-primary mr-2">📊</span>
          Rozkład Typów
        </h3>
        {Object.entries(scores).map(([type, percentage]: [string, number], index) => (
          <div key={type} className="relative">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-primary-text">
              {riderTypeDetails[type as RiderType].title}
            </span>
            <span className="text-sm font-semibold text-primary ml-4">
              {percentage}%
            </span>
          </div>
          <div className="h-2 bg-secondary-bg/30 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className={`h-full rounded-full ${type === result ? 'bg-primary shadow-sm' : 'bg-primary/30'}`}
            />
          </div>
        </div>
        ))}
      </div>

      <div className="bg-white/50 rounded-lg p-2 shadow-sm">
        <div className="text-center space-y-1.5">
          <span className="text-2xl mb-1 block">{riderTypeDetails[result].icon}</span>
          <h3 className="text-sm font-semibold text-primary-text mb-1">
            Twój dominujący typ
          </h3>
          <p className="text-xs text-secondary-text leading-snug max-w-[600px] mx-auto">
            {riderTypeDetails[result].description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
