export const goalsQuestions: Question[] = [
  {
    id: 'future_plans',
    text: 'Jakie są Twoje długoterminowe cele w jeździectwie?',
    category: 'goals',
    weightage: 5,
    answers: [
      {
        text: 'Osiągnięcie wysokiego poziomu sportowego i udział w zawodach',
        points: { competitive: 4, recreational: 0, trainer: 2, adventurous: 1 },
        secondaryTraits: { leadership: 3, analytical: 3 },
        explanation: 'Wskazuje na ambicje sportowe'
      },
      {
        text: 'Rozwijanie się jako instruktor i pomaganie innym',
        points: { competitive: 1, recreational: 1, trainer: 4, adventurous: 1 },
        secondaryTraits: { leadership: 4, patience: 3 },
        explanation: 'Pokazuje predyspozycje instruktorskie'
      },
      {
        text: 'Poznawanie nowych szlaków i form jeździectwa',
        points: { competitive: 1, recreational: 2, trainer: 0, adventurous: 4 },
        secondaryTraits: { risk_tolerance: 3, emotional: 2 },
        explanation: 'Świadczy o zamiłowaniu do przygód'
      },
      {
        text: 'Spokojne rozwijanie hobby bez konkretnego celu',
        points: { competitive: 0, recreational: 4, trainer: 1, adventurous: 2 },
        secondaryTraits: { patience: 3, emotional: 3 },
        explanation: 'Wskazuje na rekreacyjne podejście'
      },
      {
        text: 'Nie mam sprecyzowanych celów',
        points: { competitive: 0, recreational: 1, trainer: 0, adventurous: 1 },
        secondaryTraits: { emotional: 1 },
        explanation: 'Pokazuje wczesny etap zainteresowania'
      }
    ]
  },
  {
    id: 'competition_approach',
    text: 'Jakie jest Twoje podejście do rywalizacji?',
    category: 'goals',
    weightage: 4,
    answers: [
      {
        text: 'Regularnie startuję w zawodach i dążę do coraz lepszych wyników',
        points: { competitive: 4, recreational: 0, trainer: 2, adventurous: 1 },
        secondaryTraits: { leadership: 3, analytical: 3 },
        explanation: 'Wskazuje na silną orientację sportową'
      },
      {
        text: 'Startuję okazjonalnie dla sprawdzenia swoich umiejętności',
        points: { competitive: 2, recreational: 2, trainer: 3, adventurous: 2 },
        secondaryTraits: { analytical: 2, emotional: 2 },
        explanation: 'Pokazuje zbalansowane podejście'
      },
      {
        text: 'Wolę się skupić na jeździe bez presji rywalizacji',
        points: { competitive: 0, recreational: 4, trainer: 1, adventurous: 2 },
        secondaryTraits: { emotional: 3, risk_tolerance: -1 },
        explanation: 'Świadczy o rekreacyjnym podejściu'
      },
      {
        text: 'Interesują mnie alternatywne formy rywalizacji',
        points: { competitive: 1, recreational: 1, trainer: 1, adventurous: 4 },
        secondaryTraits: { risk_tolerance: 3, analytical: 2 },
        explanation: 'Wskazuje na niekonwencjonalne podejście'
      },
      {
        text: 'Nie mam doświadczenia w zawodach',
        points: { competitive: 0, recreational: 1, trainer: 0, adventurous: 0 },
        secondaryTraits: { emotional: 1 },
        explanation: 'Pokazuje brak doświadczenia sportowego'
      }
    ]
  },
  {
    id: 'investment_approach',
    text: 'Jak podchodzisz do inwestowania w rozwój jeździecki?',
    category: 'goals',
    weightage: 3,
    answers: [
      {
        text: 'Regularnie inwestuję w treningi i sprzęt wysokiej jakości',
        points: { competitive: 4, recreational: 1, trainer: 3, adventurous: 2 },
        secondaryTraits: { analytical: 3, leadership: 2 },
        explanation: 'Wskazuje na profesjonalne podejście'
      },
      {
        text: 'Inwestuję w miarę możliwości, bez presji',
        points: { competitive: 1, recreational: 4, trainer: 2, adventurous: 2 },
        secondaryTraits: { patience: 3, emotional: 2 },
        explanation: 'Pokazuje zrównoważone podejście'
      },
      {
        text: 'Skupiam się na inwestowaniu w edukację i szkolenia',
        points: { competitive: 2, recreational: 1, trainer: 4, adventurous: 1 },
        secondaryTraits: { analytical: 3, leadership: 3 },
        explanation: 'Świadczy o zorientowaniu na rozwój'
      },
      {
        text: 'Inwestuję w sprzęt i wyjazdy terenowe',
        points: { competitive: 1, recreational: 2, trainer: 1, adventurous: 4 },
        secondaryTraits: { risk_tolerance: 3, emotional: 2 },
        explanation: 'Wskazuje na przygodowe podejście'
      },
      {
        text: 'Obecnie nie inwestuję w jeździectwo',
        points: { competitive: 0, recreational: 1, trainer: 0, adventurous: 0 },
        secondaryTraits: { emotional: 1 },
        explanation: 'Pokazuje ograniczone zaangażowanie'
      }
    ]
  }
];
