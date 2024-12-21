import { motion } from 'framer-motion'

interface VisionSection {
  title: string;
  icon: string;
  content?: string;
  items: string[];
}

interface ResultsVisionProps {
  longTermVision: string;
}

function cleanContent(content: string, title: string): string {
  const patterns = [
    new RegExp(`^${title}[:.\\s]*`, 'i'),
    /^(?:Ścieżka|Rozwój|Specjalizacja|Możliwości|Cele|Perspektywy)[:.\\s]*/i,
    /^(?:W perspektywie|W ciągu|Przez|Na przestrzeni|W okresie)[:.\\s]*/i,
    /^[-•\\s]+/, // Remove any remaining bullet points or dashes
    /^(?:[\d]+\.|[A-Za-z]\))\s*/, // Remove numbered or lettered list markers
  ];

  return content
    .trim()
    .split(/\n+/)
    .map(line => {
      let cleaned = line.trim();
      patterns.forEach(pattern => {
        cleaned = cleaned.replace(pattern, '');
      });
      return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
    })
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function ResultsVision({ longTermVision }: ResultsVisionProps) {
  // Define base sections with their patterns
  const baseVisionSections: Omit<VisionSection, 'items'>[] = [
    {
      title: 'Ścieżka Rozwoju',
      icon: '📈',
      content: undefined
    },
    {
      title: 'Specjalizacje',
      icon: '🎯',
      content: undefined
    },
    {
      title: 'Cele Długoterminowe',
      icon: '🌟',
      content: undefined
    }
  ];

  function splitIntoSentences(text: string): string[] {
    // Remove any existing bullet points or numbers
    const cleanText = text.replace(/^[•\-\d.]+\s*/gm, '');

    // Try different splitting strategies
    const strategies = [
      // Strategy 1: Split by bullet-like characters
      () => cleanText.split(/[•\-]/),
      
      // Strategy 2: Split by sentence endings followed by capital letters
      () => cleanText.split(/(?<=[.!?])\s+(?=[A-ZŻŹĆĄŚĘŁÓŃ])/),
      
      // Strategy 3: Split by conjunctions and commas before capital letters
      () => cleanText.split(/(?:[.!?]|\s+i\s+|\s+oraz\s+|\s*,\s*(?=[A-ZŻŹĆĄŚĘŁÓŃ]))/),
      
      // Strategy 4: Split by any sentence ending
      () => cleanText.split(/[.!?]+/),
      
      // Strategy 5: Split by newlines or multiple spaces
      () => cleanText.split(/\n+|\s{2,}/)
    ];

    // Try each strategy until we get a good result
    for (const strategy of strategies) {
      const items = strategy()
        .map(s => s.trim())
        .filter(s => s.length > 0 && !['i', 'oraz'].includes(s.toLowerCase()));

      if (items.length >= 3) {
        return items.slice(0, 3);
      }
    }

    // If all strategies fail, split the text into roughly equal parts
    const words = cleanText.split(/\s+/);
    const wordsPerItem = Math.ceil(words.length / 3);
    const result = [];
    
    for (let i = 0; i < 3; i++) {
      const start = i * wordsPerItem;
      const end = Math.min(start + wordsPerItem, words.length);
      const segment = words.slice(start, end).join(' ');
      if (segment.length > 0) {
        result.push(segment);
      }
    }

    // Pad with empty items if needed
    while (result.length < 3) {
      result.push('...');
    }

    return result;
  }

  function extractSectionContent(text: string, sectionHeaders: string[]): string[] {
    // Join headers with | for regex alternation
    const headersPattern = sectionHeaders.join('|');
    
    // All possible section headers for boundary detection
    const allHeaders = [
      'Ścieżka rozwoju',
      'Rozwój zawodowy',
      'Ścieżka',
      'Specjalizacje',
      'Kierunki rozwoju',
      'Specjalizacja',
      'Specjalizacje jeździeckie',
      'Kierunki specjalizacji',
      'Cele długoterminowe',
      'Cele',
      'Aspiracje'
    ];
    
    // Try to find content in different formats
    const patterns = [
      // Format 1: Standard section with bullet points
      new RegExp(`(?:${headersPattern}):\\s*([\\s\\S]*?)(?=(?:${allHeaders.join('|')}):|$)`, 'i'),
      // Format 2: Section without colon
      new RegExp(`(?:${headersPattern})\\s+([\\s\\S]*?)(?=(?:${allHeaders.join('|')})|$)`, 'i'),
      // Format 3: Content between headers with bullet points
      new RegExp(`(?:${headersPattern})[^]*?([•\\-][\\s\\S]*?)(?=(?:${allHeaders.join('|')})|$)`, 'i'),
      // Format 4: Content after header until next capital letter section
      new RegExp(`(?:${headersPattern})[^]*?([A-ZŻŹĆĄŚĘŁÓŃ][^.!?]*(?:[.!?]+[^.!?]*){0,2})`, 'i')
    ];

    // Try each pattern until we find content
    let content = '';
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match?.[1]) {
        const extracted = match[1].trim();
        // Validate content has meaningful information
        const meaningfulContent = extracted
          .replace(/[•\-\d.\s]+/g, '') // Remove bullets, numbers, and whitespace
          .trim();
        
        if (meaningfulContent.length >= 20) {
          content = extracted;
          break;
        }
      }
    }

    if (!content) return [];

    // Split content into items
    const items = content
      // First try to split by bullet points
      .split(/(?:^|\n)\s*[•\-]\s+/)
      .filter(item => item.trim().length > 0)
      .map(item => {
        // Handle potential nested content
        const lines = item
          .split('\n')
          .map(line => line.trim())
          .filter(line => 
            line.length > 0 && 
            !line.match(/^[•\-\d.]\s/) && // Skip nested bullets/numbers
            !line.match(/^[A-Za-z0-9][\)\.]\s*$/) // Skip single character bullets
          );
        return lines[0] || item.trim(); // Take first line or full content if no valid lines
      })
      .filter(item => item.length > 0);

    // If no bullet points found or not enough items, try sentence splitting
    if (items.length < 3) {
      const sentences = splitIntoSentences(content);
      if (sentences.length >= 3) {
        return sentences.slice(0, 3);
      }
    }

    // Clean and validate items
    let cleanedItems = items
      .map(item => item
        .replace(/^[-•\d.]+|\n+/g, '') // Remove bullets, numbers, and newlines
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim()
      )
      .filter(item => 
        item.length >= 15 && // Ensure each item has substantial content
        !item.match(/^[A-Za-z0-9][\)\.]\s*$/) // Remove single character bullets
      );

    // If we have enough valid items, return them
    if (cleanedItems.length >= 3) {
      return cleanedItems.slice(0, 3);
    }

    // Try sentence splitting if bullet points didn't work
    const sentences = splitIntoSentences(content);
    if (sentences.length >= 3) {
      cleanedItems = sentences
        .map(s => s.trim())
        .filter(s => s.length >= 15);
      
      if (cleanedItems.length >= 3) {
        return cleanedItems.slice(0, 3);
      }
    }

    // Final fallback: split into roughly equal parts
    const words = content.split(/\s+/);
    const wordsPerItem = Math.ceil(words.length / 3);
    const result = [];
    
    for (let i = 0; i < 3; i++) {
      const start = i * wordsPerItem;
      const end = Math.min(start + wordsPerItem, words.length);
      const segment = words.slice(start, end).join(' ').trim();
      if (segment.length > 0) {
        result.push(segment);
      }
    }

    // Ensure we have exactly 3 items
    while (result.length < 3) {
      result.push('...');
    }

    return result.slice(0, 3);
  }

  // Extract sections and handle fallback
  const sections: VisionSection[] = baseVisionSections
    .map(section => {
      // Create variations of section headers
      const sectionHeaders = (() => {
        const variations: Record<string, string[]> = {
          'Specjalizacje': [
            'specjalizacje jeździeckie',
            'specjalizacje w jeździectwie',
            'kierunki rozwoju',
            'kierunki specjalizacji',
            'kierunki jeździeckie',
            'specjalizacja',
            'specjalizacja jeździecka',
            'rozwój w kierunku',
            'rozwój jeździecki'
          ],
          'Ścieżka Rozwoju': [
            'ścieżka rozwoju zawodowego',
            'rozwój zawodowy',
            'rozwój jeździecki',
            'plan rozwoju',
            'etapy rozwoju'
          ],
          'Cele Długoterminowe': [
            'cele długofalowe',
            'cele strategiczne',
            'cele na przyszłość',
            'plany długoterminowe',
            'aspiracje'
          ]
        };

        const base = [
          section.title.toLowerCase(),
          ...section.title.toLowerCase().split(' '),
          section.title.toLowerCase().replace(/[aąeęioóuy]/g, '') // Remove vowels for fuzzy matching
        ];

        return [
          ...base,
          ...(variations[section.title as keyof typeof variations] || [])
        ];
      })();
      const items = extractSectionContent(longTermVision, sectionHeaders);
      
      return {
        ...section,
        items: items.length > 0 ? items : []
      };
    })
    .filter(section => section.items.length > 0);

  // Ensure we have all required sections
  baseVisionSections.forEach(section => {
    if (!sections.find(s => s.title === section.title)) {
      // Create meaningful default items based on section type
      const defaultItems = (() => {
        switch (section.title) {
          case 'Ścieżka Rozwoju':
            return [
              'Rozwój umiejętności jeździeckich poprzez regularne treningi',
              'Zdobywanie doświadczenia w różnych dyscyplinach jeździeckich',
              'Uczestnictwo w szkoleniach i warsztatach jeździeckich'
            ];
          case 'Specjalizacje':
            return [
              'Skoki przez przeszkody jako główna dyscyplina',
              'Ujeżdżenie jako podstawa techniczna',
              'Jazda terenowa dla wszechstronnego rozwoju'
            ];
          case 'Cele Długoterminowe':
            return [
              'Osiągnięcie wyższego poziomu w jeździectwie sportowym',
              'Zdobycie uprawnień instruktorskich',
              'Udział w zawodach regionalnych i ogólnopolskich'
            ];
          default:
            return [
              'Cel zostanie określony na podstawie dalszej analizy',
              'Szczegóły zostaną doprecyzowane w planie treningowym',
              'Kierunek rozwoju będzie dostosowany do postępów'
            ];
        }
      })();
      
      sections.push({
        ...section,
        items: defaultItems
      });
    }
  });

  // Sort sections to maintain consistent order
  sections.sort((a, b) => {
    const order = ['Ścieżka Rozwoju', 'Specjalizacje', 'Cele Długoterminowe'];
    return order.indexOf(a.title) - order.indexOf(b.title);
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
                    {cleanContent(item, section.title)}
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
