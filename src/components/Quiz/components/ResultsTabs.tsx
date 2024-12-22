import { motion } from 'framer-motion'

export const tabs = [
  { id: 'profile', label: 'Profil Jeździecki', icon: '👤' },
  { id: 'analysis', label: 'Analiza', icon: '📊' },
  { id: 'training', label: 'Plan Treningowy', icon: '🎯' },
  { id: 'recommendations', label: 'Rekomendacje', icon: '💡' },
  { id: 'vision', label: 'Wizja', icon: '🔮' },
  { id: 'chat', label: 'Trener', icon: '💬' }
] as const

export type TabId = typeof tabs[number]['id']

interface ResultsTabsProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export function ResultsTabs({ activeTab, onTabChange }: ResultsTabsProps) {
  return (
    <div className="bg-gradient-to-b from-white/50 to-transparent sticky top-0 z-10">
      <div className="px-2 sm:px-6">
        <div className="grid grid-cols-3 sm:flex sm:justify-center border-b border-primary/10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 text-sm font-medium transition-all relative ${
                activeTab === tab.id
                  ? 'text-primary font-semibold bg-white shadow-sm'
                  : 'text-secondary-text hover:text-primary hover:bg-white/50'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="leading-tight whitespace-nowrap text-xs sm:text-sm">{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                  layoutId="activeTab"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
