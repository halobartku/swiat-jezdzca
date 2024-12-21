import { motion } from 'framer-motion'

interface ResultsTrainingProps {
  customizedTrainingPlan: string;
}

interface TrainingSection {
  title: string;
  icon: string;
  items: string[];
}

export function ResultsTraining({ customizedTrainingPlan }: ResultsTrainingProps): JSX.Element {
  if (!customizedTrainingPlan) {
    console.error('No training plan provided');
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-2"
      >
        <div className="bg-white/50 rounded-lg p-2 shadow-sm">
          <h3 className="text-sm sm:text-base font-semibold text-primary-text flex items-center mb-2">
            <span className="text-primary mr-2">⚠️</span>
            <span className="text-base font-medium">Plan Treningowy</span>
          </h3>
          <p className="text-xs sm:text-sm text-secondary-text/80 leading-snug">
            Nie udało się wygenerować planu treningowego. Spróbuj ponownie później.
          </p>
        </div>
      </motion.div>
    );
  }

  const baseTrainingSections: TrainingSection[] = [
    {
      title: 'Cele krótkoterminowe',
      icon: '🎯',
      items: []
    },
    {
      title: 'Plan treningowy',
      icon: '📋',
      items: []
    },
    {
      title: 'Mierniki postępu',
      icon: '📊',
      items: []
    }
  ];

  function extractSectionContent(text: string, sectionTitle: string): string[] {
    const sectionPattern = new RegExp(
      `${sectionTitle}:\\s*([\\s\\S]*?)(?=(?:Cele|Plan|Mierniki)\\s+|$)`,
      'i'
    );
    
    const match = text.match(sectionPattern);
    if (!match?.[1]) return [];

    // Extract and clean bullet points
    const items = match[1]
      .split(/[•\-]/)
      .map(item => item.trim())
      .filter(item => item.length > 0)
      .map(item => item
        .replace(/^[-•]|\n+/g, '')
        .replace(/\s+/g, ' ')
        .trim()
      );

    return items.slice(0, 3);
  }

  // Extract sections and handle fallback
  const sections = baseTrainingSections.map(section => ({
    ...section,
    items: extractSectionContent(customizedTrainingPlan, section.title)
  }));

  // Ensure each section has exactly 3 items with defaults if needed
  sections.forEach(section => {
    const defaultItems = {
      'Cele krótkoterminowe': [
        'Doskonalenie podstawowych umiejętności jeździeckich',
        'Rozwój komunikacji z koniem',
        'Poprawa techniki jazdy'
      ],
      'Plan treningowy': [
        'Regularne treningi pod okiem instruktora',
        'Ćwiczenia doskonalące równowagę i dosiad',
        'Praca nad elementami technicznymi'
      ],
      'Mierniki postępu': [
        'Ocena postępów przez instruktora',
        'Poziom zaawansowania ćwiczeń',
        'Jakość wykonywanych elementów'
      ]
    }[section.title] || ['Element 1', 'Element 2', 'Element 3'];

    while (section.items.length < 3) {
      section.items.push(defaultItems[section.items.length]);
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col"
    >
      <div className="grid grid-cols-2 gap-3">
        {sections.map((section, index) => (
          <div key={index} className="bg-white/50 rounded-lg p-2 shadow-sm">
            <h3 className="text-sm font-semibold text-primary-text flex items-center mb-1.5">
              <span className="text-primary mr-2">{section.icon}</span>
              {section.title}
            </h3>
            <ul className="space-y-1.5">
              {section.items.map((item, itemIndex) => (
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
    </motion.div>
  );
}
