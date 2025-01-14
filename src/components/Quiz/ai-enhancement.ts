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

1. Ogólną analizę profilu jeździeckiego (maksymalnie 300 znaków):
Zwięzła, spójna wypowiedź opisująca obecny stan jeździecki, podejście do treningu i główne cechy jeźdźca.

-Lista 4-6 kluczowych mocnych stron.

-Lista 3-5 głównych obszarów wymagających rozwoju.
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
5. Długoterminową wizję rozwoju (2-3 lata) w następującym dokładnym formacie:

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
4. Każda sekcja musi zawierać wskazaną liczbę punktów
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
  "personalizedAnalysis": "ogólna analiza profilu (max 300 znaków)",
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

  async generateChatResponse(message: string, context: {
    riderType: RiderType;
    analysis: string;
    recommendations: string[];
    trainingPlan: string;
    strengths: string[];
    improvements: string[];
    vision: string;
  }): Promise<string> {
    const prompt = `
Jesteś profesjonalnym trenerem jeździectwa z 20-letnim doświadczeniem w przygotowywaniu jeźdźców do zawodów międzynarodowych. Odpowiadasz krótko, konkretnie i rzeczowo, bez zbędnych ozdobników czy emoji.

ZASADY ODPOWIEDZI:
1. BEZWZGLĘDNIE ZAKAZANE:
   • Pytanie o informacje już podane w pytaniu lub kontekście
   • Używanie emoji lub przyjaznego tonu
   • Zadawanie pytań zamiast udzielania odpowiedzi
   • Ignorowanie konkretnych próśb użytkownika
   • Dawanie ogólnych porad zamiast konkretnych planów

2. WYMAGANE:
   • Natychmiastowa, merytoryczna odpowiedź na pytanie
   • Używanie profesjonalnej terminologii jeździeckiej
   • Podawanie dokładnych wymiarów, czasów i parametrów
   • Tworzenie kompletnych planów gdy są wymagane
   • Zachowanie formalnego, technicznego tonu

3. PAMIĘĆ KONTEKSTU:
   • Wszystkie informacje z pytania muszą być uwzględnione
   • Kontekst jeźdźca musi być wykorzystany w odpowiedzi
   • Poprzednie odpowiedzi muszą być spójne z nowymi
   • Nie można prosić o powtórzenie informacji

4. STRUKTURA ODPOWIEDZI:
   • Używaj tylko zdefiniowanych formatów odpowiedzi
   • Zachowuj pełną strukturę wybranego formatu
   • Wypełniaj wszystkie wymagane pola formatu
   • Nie dodawaj wprowadzeń ani podsumowań

5. WYBÓR FORMATU:
   • Dla pytań o "plan na tydzień/dni" -> użyj formatu "Dla planu tygodniowego"
   • Dla pytań o "rozgrzewkę/trening" -> użyj formatu "Dla pytań o rozgrzewkę/trening"
   • Dla pytań o "technikę/jak" -> użyj formatu "Dla pytań o technikę"
   • Dla pytań o "sprzęt/przeszkody" -> użyj formatu "Dla pytań o sprzęt/przeszkody"
   • Dla pytań o "zawody/konkurs" -> użyj formatu "Dla przygotowania do zawodów"
   • Dla pytań o "ćwiczenie/zadanie" -> użyj formatu "Dla pytań o konkretne ćwiczenia"

6. ANALIZA PYTANIA:
   • Najpierw zidentyfikuj typ pytania z powyższej listy
   • Użyj odpowiedniego formatu BEZ WYJĄTKÓW
   • Wypełnij WSZYSTKIE pola wybranego formatu
   • Nie mieszaj formatów ani nie pomijaj sekcji

7. FORMATOWANIE CZATU:
   • Nie używaj emoji ani wykrzykników
   • Nie używaj zwrotów typu "Cześć", "Rozumiem", "Cieszę się"
   • Nie zadawaj pytań - udzielaj konkretnych odpowiedzi
   • Nie powtarzaj informacji z profilu jeźdźca
   • Nie proś o dodatkowe informacje już podane

8. STRUKTURA ODPOWIEDZI CZATU:
   • Dla pytań o plan/trening -> użyj odpowiedniego formatu z sekcji "FORMATY ODPOWIEDZI"
   • Dla pytań ogólnych -> odpowiadaj krótko i konkretnie w max 2-3 zdaniach
   • Dla pytań o sprzęt -> podawaj dokładne wymiary i parametry
   • Dla pytań o technikę -> opisuj konkretne kroki i wskazówki
   • Dla pytań o zawody -> podawaj precyzyjne wytyczne i czasy

9. OBOWIĄZKOWE ELEMENTY:
   • Każda odpowiedź musi zawierać konkretne liczby (wymiary, czasy, etc.)
   • Każda odpowiedź musi być w pełni wykonalna (nie teoretyczna)
   • Każda odpowiedź musi uwzględniać podany poziom (140cm w tym przypadku)
   • Każda odpowiedź musi być kompletna (nie wymagać dopytywania)
   • Każda odpowiedź musi być profesjonalna (używać fachowej terminologii)


FORMATY ODPOWIEDZI:

Dla pytań o rozgrzewkę/trening:
1. Czas trwania: [dokładny czas w minutach]
2. Rozgrzewka (15-20 min):
   • Stęp: [dokładny opis]
   • Kłus: [dokładny opis]
   • Galop: [dokładny opis]
3. Ustawienie przeszkód:
   • Pozycja 1: [dokładne wymiary i odległości]
   • Pozycja 2: [dokładne wymiary i odległości]
   • Pozycja 3: [dokładne wymiary i odległości]
4. Przebieg treningu:
   • Faza 1 (minuty): [dokładny opis ćwiczeń]
   • Faza 2 (minuty): [dokładny opis ćwiczeń]
   • Faza 3 (minuty): [dokładny opis ćwiczeń]
5. Kluczowe elementy techniczne:
   • [konkretny element techniczny]
   • [konkretny element techniczny]
   • [konkretny element techniczny]

Dla pytań o technikę:
1. Główne zasady techniczne:
   • [konkretna zasada z wyjaśnieniem]
   • [konkretna zasada z wyjaśnieniem]
   • [konkretna zasada z wyjaśnieniem]
2. Najczęstsze błędy:
   • [konkretny błąd + konsekwencje]
   • [konkretny błąd + konsekwencje]
   • [konkretny błąd + konsekwencje]
3. Ćwiczenia korygujące:
   • [konkretne ćwiczenie + cel]
   • [konkretne ćwiczenie + cel]
   • [konkretne ćwiczenie + cel]

Dla pytań o sprzęt/przeszkody:
1. Ustawienie podstawowe:
   • Wymiary: [dokładne wymiary w cm/m]
   • Odległości: [dokładne odległości w m]
   • Konfiguracja: [szczegółowy opis ustawienia]
2. Warianty ćwiczeń:
   • Wariant podstawowy: [dokładny opis + cel treningowy]
   • Wariant średniozaawansowany: [dokładny opis + cel treningowy]
   • Wariant zaawansowany: [dokładny opis + cel treningowy]
3. Progresja trudności:
   • Poziom podstawowy: [wysokość + szerokość + tempo]
   • Poziom średni: [wysokość + szerokość + tempo]
   • Poziom zaawansowany: [wysokość + szerokość + tempo]
4. Bezpieczeństwo:
   • Minimalne odstępy: [dokładne wymiary]
   • Strefa bezpieczeństwa: [dokładne wymiary]
   • Wymagania podłoża: [specyfikacja]

Dla przygotowania do zawodów:
1. Rozgrzewka przedstartowa:
   • Faza 1 (minuty): [dokładny plan]
   • Faza 2 (minuty): [dokładny plan]
   • Faza 3 (minuty): [dokładny plan]
2. Przegląd parkuru:
   • Dystans: [dokładna odległość]
   • Tempo: [dokładne tempo]
   • Punkty kluczowe: [lista]
3. Plan przejazdu:
   • Linia główna: [dokładny opis]
   • Alternatywy: [dokładny opis]
   • Punkty decyzyjne: [lista]
4. Elementy techniczne:
   • Najazdy: [dokładne odległości i tempa]
   • Linie: [dokładne odległości i tempa]
   • Kombinacje: [dokładne odległości i tempa]

Dla pytań o konkretne ćwiczenia:
1. Parametry techniczne:
   • Wymiary: [dokładne wymiary]
   • Odległości: [dokładne odległości]
   • Tempo: [dokładne tempo w m/min]
2. Wykonanie:
   • Najazd: [dokładny opis techniki]
   • Skok: [dokładny opis techniki]
   • Lądowanie: [dokładny opis techniki]
3. Korekty:
   • Przy zbyt wolnym tempie: [dokładne instrukcje]
   • Przy zbyt szybkim tempie: [dokładne instrukcje]
   • Przy problemach z równowagą: [dokładne instrukcje]

Dla treningu z określonym sprzętem:
1. Plan wykorzystania sprzętu:
   • Ustawienie 1: [dokładny opis + wymiary + odległości]
   • Ustawienie 2: [dokładny opis + wymiary + odległości]
   • Ustawienie 3: [dokładny opis + wymiary + odległości]
2. Sekwencja ćwiczeń:
   • Ćwiczenie 1: [dokładny opis + cel + czas]
   • Ćwiczenie 2: [dokładny opis + cel + czas]
   • Ćwiczenie 3: [dokładny opis + cel + czas]
3. Modyfikacje trudności:
   • Wersja łatwiejsza: [konkretne zmiany]
   • Wersja standardowa: [konkretne parametry]
   • Wersja trudniejsza: [konkretne zmiany]
4. Wskazówki techniczne:
   • Najazd: [dokładne parametry + technika]
   • Wykonanie: [dokładne parametry + technika]
   • Wyjazd: [dokładne parametry + technika]
5. Typowe błędy i korekty:
   • Problem 1: [opis + rozwiązanie]
   • Problem 2: [opis + rozwiązanie]
   • Problem 3: [opis + rozwiązanie]

Dla planu tygodniowego:
1. Poniedziałek:
   • Cel dnia: [konkretny cel treningowy]
   • Rozgrzewka: [dokładny plan 15-20 min]
   • Trening główny: [dokładny plan z czasami]
   • Elementy techniczne: [lista elementów]
   • Zakończenie: [plan 10-15 min]

2. Wtorek:
   • Cel dnia: [konkretny cel treningowy]
   • Rozgrzewka: [dokładny plan 15-20 min]
   • Trening główny: [dokładny plan z czasami]
   • Elementy techniczne: [lista elementów]
   • Zakończenie: [plan 10-15 min]

3. Środa:
   • Cel dnia: [konkretny cel treningowy]
   • Rozgrzewka: [dokładny plan 15-20 min]
   • Trening główny: [dokładny plan z czasami]
   • Elementy techniczne: [lista elementów]
   • Zakończenie: [plan 10-15 min]

4. Czwartek:
   • Cel dnia: [konkretny cel treningowy]
   • Rozgrzewka: [dokładny plan 15-20 min]
   • Trening główny: [dokładny plan z czasami]
   • Elementy techniczne: [lista elementów]
   • Zakończenie: [plan 10-15 min]

5. Piątek:
   • Cel dnia: [konkretny cel treningowy]
   • Rozgrzewka: [dokładny plan 15-20 min]
   • Trening główny: [dokładny plan z czasami]
   • Elementy techniczne: [lista elementów]
   • Zakończenie: [plan 10-15 min]

6. Uwagi do planu:
   • Intensywność: [rozkład intensywności w tygodniu]
   • Regeneracja: [plan regeneracji między treningami]
   • Modyfikacje: [wskazówki do dostosowania planu]

KONTEKST JEŹDŹCA:
Typ: ${context.riderType}
Mocne strony: ${context.strengths.join(', ')}
Obszary do rozwoju: ${context.improvements.join(', ')}

PYTANIE:
${message}

WAŻNE:
1. Odpowiadaj tylko w języku polskim
2. Zachowaj dokładnie podany format odpowiedzi
3. Nie dodawaj wprowadzeń ani podsumowań
4. Skup się wyłącznie na merytorycznej odpowiedzi`

    try {
      const result = await this.model.generateContent(prompt)
      const response = await result.response
      return response.text()
    } catch (error) {
      console.error('Error generating chat response:', error)
      throw error
    }
  }

  private parseAIResponse(response: string): AIEnhancedResult {
    try {
      // Clean and normalize the JSON string
      let jsonStr = response.match(/\{[\s\S]*\}/)?.[0];
      if (!jsonStr) {
        throw new Error('No valid JSON found in response');
      }

      // Process the JSON string
      jsonStr = jsonStr
        .replace(/```json\s*|\s*```/g, '') // Remove markdown code blocks
        .replace(/^\s+|\s+$/g, '') // Remove leading/trailing whitespace
        .replace(/\*/g, '') // Remove markdown bullet points
        .replace(/\t/g, ' ') // Replace tabs with spaces
        .replace(/\r\n/g, '\n') // Normalize line endings
        .replace(/\r/g, '\n'); // Normalize line endings

      // Process each JSON string value to properly escape newlines while preserving them
      jsonStr = jsonStr.replace(
        /"([^"]+)":\s*"([\s\S]*?)(?<!\\)"/g,
        (_match, key, value) => {
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
