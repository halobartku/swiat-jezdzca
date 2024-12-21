export const personalityQuestions: Question[] = [
  {
    id: 'core_motivation',
    text: 'Co najbardziej motywuje Cię w jeździectwie?',
    category: 'personality',
    weightage: 5,
    answers: [
      {
        text: 'Możliwość rywalizacji i osiągania coraz lepszych wyników',
        points: { competitive: 4, recreational: 0, trainer: 2, adventurous: 1 },
        secondaryTraits: { leadership: 3, analytical: 2 },
        explanation: 'Wskazuje na silną orientację sportową'
      },
      {
        text: 'Spędzanie czasu z końmi i relaks w ich towarzystwie',
        points: { competitive: 0, recreational: 4, trainer: 1, adventurous: 2 },
        secondaryTraits: { emotional: 4, patience: 3 },
        explanation: 'Pokazuje rekreacyjne podejście'
      },
      {
        text: 'Możliwość dzielenia się wiedzą i pomagania innym',
        points: { competitive: 1, recreational: 1, trainer: 4, adventurous: 1 },
        secondaryTraits: { leadership: 4, patience: 3 },
        explanation: 'Świadczy o predyspozycjach instruktorskich'
      },
      {
        text: 'Przygoda i eksploracja nowych możliwości',
        points: { competitive: 1, recreational: 2, trainer: 0, adventurous: 4 },
        secondaryTraits: { risk_tolerance: 3, emotional: 2 },
        explanation: 'Wskazuje na zamiłowanie do przygody'
      },
      {
        text: 'Nie mam obecnie aktywnego kontaktu z jeździectwem',
        points: { competitive: 0, recreational: 1, trainer: 0, adventurous: 0 },
        secondaryTraits: { emotional: 1 },
        explanation: 'Wskazuje na potencjalne zainteresowanie'
      }
    ]
  },
  {
    id: 'stress_handling',
    text: 'Jak reagujesz na stresujące sytuacje podczas jazdy?',
    category: 'personality',
    weightage: 4,
    answers: [
      {
        text: 'Zachowuję spokój i metodycznie rozwiązuję problem',
        points: { competitive: 3, recreational: 2, trainer: 4, adventurous: 2 },
        secondaryTraits: { analytical: 4, patience: 3 },
        explanation: 'Pokazuje profesjonalne podejście'
      },
      {
        text: 'Wolę unikać sytuacji stresowych',
        points: { competitive: 0, recreational: 4, trainer: 1, adventurous: 0 },
        secondaryTraits: { risk_tolerance: -2, emotional: 3 },
        explanation: 'Wskazuje na ostrożne podejście'
      },
      {
        text: 'Traktuję je jako okazję do nauki i rozwoju',
        points: { competitive: 4, recreational: 1, trainer: 3, adventurous: 3 },
        secondaryTraits: { leadership: 3, analytical: 2 },
        explanation: 'Świadczy o proaktywnym podejściu'
      },
      {
        text: 'Szukam pomocy u bardziej doświadczonych osób',
        points: { competitive: 2, recreational: 3, trainer: 2, adventurous: 1 },
        secondaryTraits: { emotional: 2, patience: 3 },
        explanation: 'Pokazuje rozsądne podejście do wyzwań'
      },
      {
        text: 'Nie mam doświadczenia w takich sytuacjach',
        points: { competitive: 0, recreational: 1, trainer: 0, adventurous: 0 },
        secondaryTraits: { risk_tolerance: -1 },
        explanation: 'Wskazuje na brak doświadczenia'
      }
    ]
  },
  {
    id: 'learning_preference',
    text: 'Jaki styl nauki najbardziej Ci odpowiada?',
    category: 'personality',
    weightage: 3,
    answers: [
      {
        text: 'Systematyczne treningi z planem i konkretnymi celami',
        points: { competitive: 4, recreational: 1, trainer: 3, adventurous: 1 },
        secondaryTraits: { analytical: 4, leadership: 2 },
        explanation: 'Wskazuje na metodyczne podejście'
      },
      {
        text: 'Nauka w swoim tempie, bez presji',
        points: { competitive: 0, recreational: 4, trainer: 1, adventurous: 2 },
        secondaryTraits: { patience: 4, emotional: 3 },
        explanation: 'Pokazuje rekreacyjne podejście'
      },
      {
        text: 'Uczenie się poprzez pomaganie innym',
        points: { competitive: 1, recreational: 2, trainer: 4, adventurous: 1 },
        secondaryTraits: { leadership: 4, patience: 3 },
        explanation: 'Świadczy o predyspozycjach do nauczania'
      },
      {
        text: 'Eksperymentowanie i odkrywanie własnych metod',
        points: { competitive: 2, recreational: 1, trainer: 1, adventurous: 4 },
        secondaryTraits: { risk_tolerance: 3, analytical: 2 },
        explanation: 'Wskazuje na samodzielne podejście'
      },
      {
        text: 'Jeszcze nie wiem, co mi najbardziej odpowiada',
        points: { competitive: 0, recreational: 1, trainer: 0, adventurous: 1 },
        secondaryTraits: { emotional: 1 },
        explanation: 'Pokazuje początkujący etap'
      }
    ]
  }
];
