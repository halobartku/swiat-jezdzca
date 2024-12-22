import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../ui/button'
import { ResultsTabs, type TabId } from './ResultsTabs'
import { ResultsProfile } from './ResultsProfile'
import { ResultsAnalysis } from './ResultsAnalysis'
import { ResultsTraining } from './ResultsTraining'
import { ResultsRecommendations } from './ResultsRecommendations'
import { ResultsVision } from './ResultsVision'
import { ResultsChat } from './ResultsChat'
import type { RiderType } from '../../../data/riderTypes'

interface QuizResultsProps {
  result: RiderType;
  scores: Record<RiderType, number>;
  riderTypeDetails: Record<RiderType, {
    title: string;
    description: string;
    icon: string;
  }>;
  aiResult: {
    personalizedAnalysis: string;
    detailedRecommendations: string[];
    customizedTrainingPlan: string;
    strengthsAndWeaknesses: {
      strengths: string[];
      areasForImprovement: string[];
    };
    longTermVision: string;
  };
  onRestart: () => void;
}

export function QuizResults({
  result,
  scores,
  riderTypeDetails,
  aiResult,
  onRestart
}: QuizResultsProps) {
  const [activeTab, setActiveTab] = useState<TabId>('profile')
  const typeInfo = riderTypeDetails[result]

  return (
    <div className="w-full max-w-[1200px] mx-auto px-2 sm:px-6 my-4">
      <motion.div
        className="bg-secondary-bg/95 backdrop-blur-sm rounded-lg shadow-lg border border-primary/10 min-h-[650px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        {/* Header */}
        <div className="text-center py-2 px-4 border-b border-primary/10 bg-white/50">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-xl">{typeInfo.icon}</span>
            <h1 className="text-base font-bold text-primary-text">{typeInfo.title}</h1>
          </div>
          <p className="text-xs text-secondary-text max-w-[480px] mx-auto leading-snug">{typeInfo.description}</p>
        </div>

        {/* Tabs */}
        <ResultsTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab Content */}
        <div className="p-2 bg-[radial-gradient(#f8f9fa_1px,transparent_1px)] [background-size:16px_16px] flex-grow overflow-y-auto">
          <div className="max-w-[1100px] mx-auto space-y-2 bg-white/95 p-2 sm:p-3 rounded-lg shadow-sm">
            {activeTab === 'profile' && (
              <ResultsProfile
                scores={scores}
                result={result}
                riderTypeDetails={riderTypeDetails}
              />
            )}

            {activeTab === 'analysis' && (
              <ResultsAnalysis
                personalizedAnalysis={aiResult.personalizedAnalysis}
                strengthsAndWeaknesses={aiResult.strengthsAndWeaknesses}
              />
            )}

            {activeTab === 'training' && (
              <ResultsTraining
                customizedTrainingPlan={aiResult.customizedTrainingPlan}
              />
            )}

            {activeTab === 'recommendations' && (
              <ResultsRecommendations
                detailedRecommendations={aiResult.detailedRecommendations}
              />
            )}

            {activeTab === 'vision' && (
              <ResultsVision
                longTermVision={aiResult.longTermVision}
              />
            )}

            {activeTab === 'chat' && (
              <ResultsChat
                result={result}
                aiResult={aiResult}
              />
            )}
          </div>
        </div>

      </motion.div>
    </div>
  )
}
