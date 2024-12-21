import { GoogleGenerativeAI } from '@google/generative-ai';
import type { Question, Answer } from './Questions/quiz-base-types';
import type { RiderType } from '../../data/riderTypes';

type ScoringResult = {
  primaryType: RiderType;
  secondaryType: RiderType;
  consistency: number;
  traits: Record<string, number>;
};

type AIEnhancedResult = {
  personalizedAnalysis: string;
  detailedRecommendations: string[];
  customizedTrainingPlan: string;
  strengthsAndWeaknesses: {
    strengths: string[];
    areasForImprovement: string[];
  };
  longTermVision: string;
};

export class AIResultEnhancer {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async enhanceResults(
    quizResults: ScoringResult,
    answers: Answer[],
    questions: Question[]
  ): Promise<AIEnhancedResult> {
    const prompt = this.createDetailedPrompt(quizResults, answers, questions);
    
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return this.parseAIResponse(text);
    } catch (error) {
      console.error('Error generating AI content:', error);
      throw error;
    }
  }

  private createDetailedPrompt(
    results: ScoringResult,
    answers: Answer[],
    questions: Question[]
  ): string {
    // Group answers by category
    const answersByCategory = answers.reduce((acc, answer, index) => {
      const category = questions[index].category;
      if (!acc[category]) acc[category] = [];
      acc[category].push({ question: questions[index], answer });
      return acc;
    }, {} as Record<string, { question: Question; answer: Answer }[]>);

    return `
Jako ekspert w jeździectwie, przeanalizuj następujący profil jeźdźca i stwórz spersonalizowaną analizę.

PROFIL PODSTAWOWY:
- Typ główny: ${results.primaryType}
- Typ dodatkowy: ${results.secondaryType}
- Spójność odpowiedzi: ${results.consistency}%

CECHY DODATKOWE:
${Object.entries(results.traits)
  .map(([trait, value]) => `- ${trait}: ${value}%`)
  .join('\n')}

ODPOWIEDZI WEDŁUG KATEGORII:

${Object.entries(answersByCategory).map(([category, items]) => `
${category.toUpperCase()}:
${items.map(({ question, answer }) => 
  `Pytanie: ${question.text}
   Odpowiedź: ${answer.text}
   Waga pytania: ${question.weightage}`
).join('\n\n')}`
).join('\n\n')}

Na podstawie powyższych danych przygotuj:

1. Szczegółową analizę obecnego stanu jeździeckiego w następującym formacie:

Podejście do Treningu:
• [obecne podejście do treningu]
• [aktualne nawyki treningowe]
• [stosunek do rozwoju]

Relacje z Końmi:
• [obecny sposób interakcji z końmi]
• [aktualne zrozumienie zachowań koni]
• [obecny poziom komunikacji]

Cele i Aspiracje:
• [obecne cele krótkoterminowe]
• [aktualne zainteresowania]
• [bieżące priorytety]

Styl Zarządzania:
• [obecny sposób organizacji]
• [aktualne podejście do planowania]
• [bieżący styl zarządzania czasem]

Aspekty Techniczne:
• [obecny poziom umiejętności]
• [aktualne mocne strony techniczne]
• [obszary wymagające uwagi]

WAŻNE:
- Każda sekcja musi zawierać dokładnie 3 punkty
- Opisuj tylko obecny stan, nie dawaj rekomendacji
- Używaj konkretnych obserwacji z odpowiedzi
- Unikaj zwrotów typu "zalecane jest" czy "powinieneś"

2. Lista 5-7 spersonalizowanych rekomendacji, w tym:
   - Konkretne kroki rozwojowe
   - Sugestie treningowe
   - Propozycje szkoleń
   - Rekomendacje sprzętowe

3. 3-miesięczny plan rozwoju w następującym dokładnym formacie:

Cele krótkoterminowe:
• [konkretny cel treningowy 1]
• [konkretny cel treningowy 2]
• [konkretny cel treningowy 3]

Plan treningowy:
• [szczegółowy element planu 1]
• [szczegółowy element planu 2]
• [szczegółowy element planu 3]

Mierniki postępu:
• [konkretny miernik 1]
• [konkretny miernik 2]
• [konkretny miernik 3]

WAŻNE: 
1. Zachowaj dokładnie tę strukturę i formatowanie
2. Każda sekcja musi zawierać dokładnie 3 punkty
3. Używaj znaku punktowania (•)
4. Każdy punkt musi być konkretnym, mierzalnym elementem
5. Nie dodawaj żadnych innych sekcji

4. Analiza mocnych stron i obszarów do rozwoju:
   - 4-6 kluczowych mocnych stron
   - 3-5 obszarów wymagających rozwoju
   - Praktyczne sugestie wykorzystania mocnych stron
   - Strategie rozwoju słabszych obszarów

5. Długoterminową, realistyczną wizję rozwoju (2-3 lata) w następującym dokładnym formacie:

Ścieżka rozwoju:
• [kluczowy etap rozwoju 1]
• [kluczowy etap rozwoju 2]
• [kluczowy etap rozwoju 3]

Specjalizacje:
• [specjalizacja 1 z opisem wymagań i możliwości]
• [specjalizacja 2 z opisem wymagań i możliwości]
• [specjalizacja 3 z opisem wymagań i możliwości]

Cele długoterminowe:
• [cel 1 z konkretnym terminem realizacji]
• [cel 2 z konkretnym terminem realizacji]
• [cel 3 z konkretnym terminem realizacji]

WAŻNE: 
1. Zachowaj dokładnie tę strukturę i formatowanie
2. Każdy punkt musi być pełnym, konkretnym zdaniem
3. Używaj znaku punktowania (•)
4. Każda sekcja musi zawierać 3 punkty
5. Sekcje muszą być oddzielone pustą linią
6. Nie dodawaj żadnych innych sekcji

Uwzględnij:
- Specyfikę polskiego jeździectwa
- Dostępne możliwości rozwoju w Polsce
- Realne ścieżki kariery
- Praktyczne wskazówki dotyczące treningu

WAŻNE: Odpowiedź musi być w języku polskim.

Format odpowiedzi: Odpowiedź musi być w formacie JSON zgodnym z następującą strukturą:

{
  "personalizedAnalysis": "szczegółowa analiza profilu",
  "detailedRecommendations": ["rekomendacja 1", "rekomendacja 2"],
  "customizedTrainingPlan": "plan treningowy",
  "strengthsAndWeaknesses": {
    "strengths": ["mocna strona 1", "mocna strona 2"],
    "areasForImprovement": ["obszar 1", "obszar 2"]
  },
  "longTermVision": "długoterminowa wizja"
}

WAŻNE: 
1. Cała treść musi być w języku polskim
2. Zwróć czysty JSON bez dodatkowych znaczników czy komentarzy
3. Używaj polskich znaków (ą, ę, ś, etc.)
4. Zachowaj spójny, profesjonalny ton wypowiedzi
    `;
  }

  private parseAIResponse(response: string): AIEnhancedResult {
    try {
      // First, extract the JSON object from the response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in response');
      }

      // Clean and normalize the JSON string
      let jsonStr = jsonMatch[0]
        .replace(/```json\s*|\s*```/g, '') // Remove markdown code blocks
        .replace(/^\s+|\s+$/g, '') // Remove leading/trailing whitespace
        .replace(/\*/g, '') // Remove markdown bullet points
        .replace(/\t/g, ' ') // Replace tabs with spaces
        .replace(/\r\n/g, '\n') // Normalize line endings
        .replace(/\r/g, '\n'); // Normalize line endings

      // Process each JSON string value to properly escape newlines while preserving them
      jsonStr = jsonStr.replace(
        /"([^"]+)":\s*"([\s\S]*?)(?<!\\)"/g,
        (match, key, value) => {
          // Properly escape special characters while preserving newlines
          const escapedValue = value
            .replace(/\\/g, '\\\\') // Escape backslashes first
            .replace(/"/g, '\\"') // Escape quotes
            .replace(/\n/g, '\\n') // Escape newlines
            .replace(/\t/g, '\\t'); // Escape tabs
          return `"${key}": "${escapedValue}"`;
        }
      );

      // Parse the cleaned JSON
      const parsed = JSON.parse(jsonStr);

      // Process the parsed data to unescape newlines in string values
      const processValue = (value: any): any => {
        if (typeof value === 'string') {
          return value.replace(/\\n/g, '\n');
        }
        if (Array.isArray(value)) {
          return value.map(processValue);
        }
        if (value && typeof value === 'object') {
          const processed: any = {};
          for (const [k, v] of Object.entries(value)) {
            processed[k] = processValue(v);
          }
          return processed;
        }
        return value;
      };

      const processedParsed = processValue(parsed);
      
      // Create the result with processed values
      const result: AIEnhancedResult = {
        personalizedAnalysis: processedParsed.personalizedAnalysis || '',
        detailedRecommendations: Array.isArray(processedParsed.detailedRecommendations)
          ? processedParsed.detailedRecommendations
          : [],
        customizedTrainingPlan: processedParsed.customizedTrainingPlan || '',
        strengthsAndWeaknesses: {
          strengths: Array.isArray(processedParsed.strengthsAndWeaknesses?.strengths)
            ? processedParsed.strengthsAndWeaknesses.strengths
            : [],
          areasForImprovement: Array.isArray(processedParsed.strengthsAndWeaknesses?.areasForImprovement)
            ? processedParsed.strengthsAndWeaknesses.areasForImprovement
            : []
        },
        longTermVision: processedParsed.longTermVision || ''
      };

      // Validate that we have actual content
      if (!result.personalizedAnalysis || !result.customizedTrainingPlan || !result.longTermVision) {
        throw new Error('Missing required content in AI response');
      }

      return result;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error parsing AI response:', error.message);
        console.error('Raw response:', response);
        throw new Error(`Error parsing AI response: ${error.message}`);
      }
      throw error;
    }
  }
}
