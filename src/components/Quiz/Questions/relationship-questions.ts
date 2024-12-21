export const relationshipQuestions: Question[] = [
  {
    id: 'horse_communication',
    text: 'Jak budujesz relację z koniem?',
    category: 'relationship',
    weightage: 5,
    answers: [
      {
        text: 'Poprzez systematyczny trening i jasne zasady współpracy',
        points: { competitive: 3, recreational: 1, trainer: 4, adventurous: 1 },
        secondaryTraits: { leadership: 4, analytical: 3 },
        explanation: 'Wskazuje na profesjonalne podejście do treningu'
      },
      {
        text: 'Spędzam dużo czasu na pielęgnacji i budowaniu więzi',
        points: { competitive: 0, recreational: 4, trainer: 2, adventurous: 2 },
        secondaryTraits: { emotional: 4, patience: 3 },
        explanation: 'Pokazuje emocjonalne podejście do relacji'
      },
      {
        text: 'Poprzez wspólne przygody i nowe doświadczenia',
        points: { competitive: 1, recreational: 2, trainer: 1, adventurous: 4 },
        secondaryTraits: { risk_tolerance: 3, emotional: 2 },
        explanation: 'Świadczy o poszukiwaniu przygód'
      },
      {
        text: 'Skupiam się na zrozumieniu zachowania konia',
        points: { competitive: 2, recreational: 3, trainer: 3, adventurous: 1 },
        secondaryTraits: { analytical: 3, patience: 4 },
        explanation: 'Wskazuje na analityczne podejście'
      },
      {
        text: 'Nie mam stałego kontaktu z jednym koniem',
        points: { competitive: 0, recreational: 1, trainer: 0, adventurous: 1 },
        secondaryTraits: { emotional: 1 },
        explanation: 'Pokazuje ograniczony kontakt'
      }
    ]
  },
  {
    id: 'difficult_behavior',
    text: 'Jak reagujesz na trudne zachowania konia?',
    category: 'relationship',
    weightage: 4,
    answers: [
      {
        text: 'Analizuję przyczyny i metodycznie pracuję nad rozwiązaniem',
        points: { competitive: 3, recreational: 1, trainer: 4, adventurous: 1 },
        secondaryTraits: { analytical: 4, patience: 3 },
        explanation: 'Wskazuje na profesjonalne podejście'
      },
      {
        text: 'Szukam pomocy u doświadczonych osób',
        points: { competitive: 1, recreational: 4, trainer: 2, adventurous: 1 },
        secondaryTraits: { emotional: 3, risk_tolerance: -1 },
        explanation: 'Pokazuje ostrożne podejście'
      },
      {
        text: 'Dostosowuję trening do potrzeb konia',
        points: { competitive: 2, recreational: 3, trainer: 3, adventurous: 2 },
        secondaryTraits: { patience: 4, emotional: 3 },
        explanation: 'Świadczy o elastycznym podejściu'
      },
      {
        text: 'Traktuję to jako wyzwanie do pokonania',
        points: { competitive: 4, recreational: 0, trainer: 2, adventurous: 3 },
        secondaryTraits: { leadership: 3, risk_tolerance: 2 },
        explanation: 'Wskazuje na zorientowanie na cel'
      },
      {
        text: 'Unikam trudnych sytuacji z końmi',
        points: { competitive: 0, recreational: 2, trainer: 0, adventurous: 0 },
        secondaryTraits: { risk_tolerance: -2 },
        explanation: 'Pokazuje zachowawcze podejście'
      }
    ]
  },
  {
    id: 'trust_building',
    text: 'Co jest dla Ciebie najważniejsze w budowaniu zaufania z koniem?',
    category: 'relationship',
    weightage: 4,
    answers: [
      {
        text: 'Konsekwencja i jasny system nagradzania',
        points: { competitive: 3, recreational: 1, trainer: 4, adventurous: 1 },
        secondaryTraits: { leadership: 4, analytical: 3 },
        explanation: 'Wskazuje na metodyczne podejście'
      },
      {
        text: 'Spokój i cierpliwość w codziennym kontakcie',
        points: { competitive: 1, recreational: 4, trainer: 2, adventurous: 2 },
        secondaryTraits: { patience: 4, emotional: 3 },
        explanation: 'Pokazuje empatyczne podejście'
      },
      {
        text: 'Wspólne pokonywanie wyzwań',
        points: { competitive: 2, recreational: 1, trainer: 1, adventurous: 4 },
        secondaryTraits: { risk_tolerance: 3, leadership: 2 },
        explanation: 'Świadczy o aktywnym podejściu'
      },
      {
        text: 'Wzajemne zrozumienie i szacunek',
        points: { competitive: 2, recreational: 3, trainer: 3, adventurous: 2 },
        secondaryTraits: { emotional: 4, patience: 3 },
        explanation: 'Wskazuje na dojrzałe podejście'
      },
      {
        text: 'Nie mam doświadczenia w budowaniu relacji z końmi',
        points: { competitive: 0, recreational: 1, trainer: 0, adventurous: 0 },
        secondaryTraits: { emotional: 1 },
        explanation: 'Pokazuje brak doświadczenia'
      }
    ]
  }
];
