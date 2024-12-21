import { motion } from 'framer-motion'

interface ResultsAnalysisProps {
  personalizedAnalysis: string;
  strengthsAndWeaknesses: {
    strengths: string[];
    areasForImprovement: string[];
  };
}

interface AnalysisSection {
  title: string;
  icon: string;
  items: string[];
}

export function ResultsAnalysis({ personalizedAnalysis, strengthsAndWeaknesses }: ResultsAnalysisProps): JSX.Element {
  // Parse the bullet points from the analysis text
  function parseSection(text: string, sectionTitle: string): string[] {
    const sectionRegex = new RegExp(`${sectionTitle}:\\s*([\\s\\S]*?)(?=\\n\\n|$)`);
    const match = text.match(sectionRegex);
    if (!match) return [];

    return match[1]
      .split('\n')
      .filter(line => line.trim().startsWith('•'))
      .map(line => line.replace('•', '').trim());
  }

  const sections: AnalysisSection[] = [
    {
      title: 'Podejście do Treningu',
      icon: '🎯',
      items: parseSection(personalizedAnalysis, 'Podejście do Treningu')
    },
    {
      title: 'Relacje z Końmi',
      icon: '🐎',
      items: parseSection(personalizedAnalysis, 'Relacje z Końmi')
    },
    {
      title: 'Cele i Aspiracje',
      icon: '🌟',
      items: parseSection(personalizedAnalysis, 'Cele i Aspiracje')
    },
    {
      title: 'Styl Zarządzania',
      icon: '📋',
      items: parseSection(personalizedAnalysis, 'Styl Zarządzania')
    },
    {
      title: 'Aspekty Techniczne',
      icon: '⚙️',
      items: parseSection(personalizedAnalysis, 'Aspekty Techniczne')
    }
  ].filter(section => section.items.length > 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col"
    >
      {/* Analysis Sections */}
      <div className="grid grid-cols-2 gap-2">
        {sections.map((section: AnalysisSection, index: number) => (
          <div key={index} className="bg-white/50 rounded-lg p-2 shadow-sm">
            <h3 className="text-sm font-semibold text-primary-text flex items-center mb-1.5">
              <span className="text-primary mr-2">{section.icon}</span>
              {section.title}
            </h3>
            <ul className="space-y-1.5">
              {section.items.map((item: string, itemIndex: number) => (
                <li key={itemIndex} className="flex items-center gap-3">
                  <span className="text-primary text-base sm:text-lg flex-shrink-0">→</span>
                  <span className="flex-1 text-xs text-secondary-text/80 leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Strengths and Areas for Improvement in Grid */}
      <div className="grid grid-cols-2 gap-2 mt-2">
        {/* Strengths Section */}
        <div className="bg-white/50 rounded-lg p-2 shadow-sm">
          <h3 className="text-sm font-semibold text-primary-text flex items-center mb-1.5">
            <span className="text-primary mr-2">💪</span>
            Mocne Strony
          </h3>
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
        <div className="bg-white/50 rounded-lg p-2 shadow-sm">
          <h3 className="text-sm font-semibold text-primary-text flex items-center mb-1.5">
            <span className="text-primary mr-2">🎯</span>
            Obszary do Rozwoju
          </h3>
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
