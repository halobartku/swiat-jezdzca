import { motion } from 'framer-motion'

interface ResultsAnalysisProps {
  personalizedAnalysis: string;
  strengthsAndWeaknesses: {
    strengths: string[];
    areasForImprovement: string[];
  };
}

export function ResultsAnalysis({ personalizedAnalysis, strengthsAndWeaknesses }: ResultsAnalysisProps): JSX.Element {
  // Extract general analysis (first paragraph)
  const generalAnalysis = personalizedAnalysis.split('\n\n')[0].trim();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col"
    >
      {/* Analiza Ogólna */}
      <div className="bg-white/50 rounded-lg p-4 shadow-sm mb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">📝</span>
          <h3 className="text-base font-semibold text-primary-text">Analiza Ogólna</h3>
        </div>
        <p className="text-sm text-secondary-text/90 leading-relaxed">
          {generalAnalysis}
        </p>
      </div>

      {/* Strengths and Areas for Improvement */}
      <div className="grid grid-cols-2 gap-4">
        {/* Strengths Section */}
        <div className="bg-white/50 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">💪</span>
            <h3 className="text-base font-semibold text-primary-text">Mocne Strony</h3>
          </div>
          <ul className="space-y-1.5">
            {strengthsAndWeaknesses.strengths.map((strength: string, index: number) => (
              <li key={index} className="flex items-center gap-3">
                  <span className="text-primary text-base sm:text-lg flex-shrink-0">→</span>
                  <span className="flex-1 text-xs text-secondary-text/80 leading-snug">
                  {strength}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Areas for Improvement Section */}
        <div className="bg-white/50 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🎯</span>
            <h3 className="text-base font-semibold text-primary-text">Obszary do Rozwoju</h3>
          </div>
          <ul className="space-y-1.5">
            {strengthsAndWeaknesses.areasForImprovement.map((area: string, index: number) => (
              <li key={index} className="flex items-center gap-3">
                <span className="text-primary text-base sm:text-lg flex-shrink-0">→</span>
                <span className="flex-1 text-xs text-secondary-text/80 leading-snug">
                  {area}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}
