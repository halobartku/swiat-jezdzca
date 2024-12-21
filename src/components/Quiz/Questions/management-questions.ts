export const managementQuestions: Question[] = [
  {
    id: 'daily_care',
    text: 'Jak podchodzisz do codziennej opieki nad koniem?',
    category: 'management',
    weightage: 4,
    answers: [
      {
        text: 'Mam szczegółowy plan pielęgnacji i ściśle go przestrzegam',
        points: { competitive: 3, recreational: 1, trainer: 4, adventurous: 1 },
        secondaryTraits: { analytical: 4, leadership: 3 },
        explanation: 'Wskazuje na profesjonalne podejście do opieki'
      },
      {
        text: 'Poświęcam dużo czasu na pielęgnację i obserwację konia',
        points: { competitive: 1, recreational: 4, trainer: 2, adventurous: 2 },
        secondaryTraits: { emotional: 4, patience: 3 },
        explanation: 'Pokazuje troskliwe podejście'
      },
      {
        text: 'Dostosowuję opiekę do aktualnych potrzeb i warunków',
        points: { competitive: 2, recreational: 2, trainer: 3, adventurous: 4 },
        secondaryTraits: { analytical: 3, risk_tolerance: 2 },
        explanation: 'Świadczy o elastycznym podejściu'
      },
      {
        text: 'Skupiam się na podstawowej opiece i czystości',
        points: { competitive: 1, recreational: 3, trainer: 2, adventurous: 2 },
        secondaryTraits: { patience: 3, emotional: 2 },
        explanation: 'Wskazuje na podstawowe zaangażowanie'
      },
      {
        text: 'Nie zajmuję się bezpośrednio opieką nad koniem',
        points: { competitive: 0, recreational: 1, trainer: 0, adventurous: 0 },
        secondaryTraits: { emotional: 1 },
        explanation: 'Pokazuje brak doświadczenia w opiece'
      }
    ]
  },
  {
    id: 'health_management',
    text: 'Jak reagujesz na problemy zdrowotne konia?',
    category: 'management',
    weightage: 5,
    answers: [
      {
        text: 'Mam plan działania na różne sytuacje i współpracuję z zespołem specjalistów',
        points: { competitive: 4, recreational: 1, trainer: 4, adventurous: 2 },
        secondaryTraits: { analytical: 4, leadership: 3 },
        explanation: 'Wskazuje na profesjonalne podejście'
      },
      {
        text: 'Natychmiast kontaktuję się z weterynarzem',
        points: { competitive: 2, recreational: 4, trainer: 2, adventurous: 1 },
        secondaryTraits: { emotional: 3, risk_tolerance: -1 },
        explanation: 'Pokazuje ostrożne podejście'
      },
      {
        text: 'Oceniam sytuację i podejmuję decyzje na podstawie doświadczenia',
        points: { competitive: 3, recreational: 2, trainer: 3, adventurous: 3 },
        secondaryTraits: { analytical: 3, leadership: 3 },
        explanation: 'Świadczy o doświadczonym podejściu'
      },
      {
        text: 'Konsultuję się z bardziej doświadczonymi osobami',
        points: { competitive: 1, recreational: 3, trainer: 2, adventurous: 2 },
        secondaryTraits: { emotional: 2, leadership: -1 },
        explanation: 'Wskazuje na rozsądne podejście'
      },
      {
        text: 'Nie mam doświadczenia w tym zakresie',
        points: { competitive: 0, recreational: 1, trainer: 0, adventurous: 0 },
        secondaryTraits: { emotional: 1 },
        explanation: 'Pokazuje brak doświadczenia'
      }
    ]
  },
  {
    id: 'schedule_management',
    text: 'Jak organizujesz plan treningowy i opiekę nad koniem?',
    category: 'management',
    weightage: 4,
    answers: [
      {
        text: 'Mam dokładny harmonogram treningów i zabiegów pielęgnacyjnych',
        points: { competitive: 4, recreational: 1, trainer: 3, adventurous: 1 },
        secondaryTraits: { analytical: 4, leadership: 3 },
        explanation: 'Wskazuje na profesjonalne zarządzanie'
      },
      {
        text: 'Elastycznie planuję aktywności według potrzeb konia',
        points: { competitive: 1, recreational: 3, trainer: 4, adventurous: 2 },
        secondaryTraits: { patience: 3, emotional: 3 },
        explanation: 'Pokazuje adaptacyjne podejście'
      },
      {
        text: 'Dostosowuję plan do warunków i możliwości',
        points: { competitive: 2, recreational: 2, trainer: 2, adventurous: 4 },
        secondaryTraits: { risk_tolerance: 3, analytical: 2 },
        explanation: 'Świadczy o elastycznym podejściu'
      },
      {
        text: 'Korzystam z gotowego planu przygotowanego przez stajnię',
        points: { competitive: 1, recreational: 4, trainer: 1, adventurous: 1 },
        secondaryTraits: { emotional: 2, leadership: -1 },
        explanation: 'Wskazuje na standardowe podejście'
      },
      {
        text: 'Nie mam stałego planu treningowego',
        points: { competitive: 0, recreational: 2, trainer: 0, adventurous: 1 },
        secondaryTraits: { risk_tolerance: 1 },
        explanation: 'Pokazuje okazjonalne zaangażowanie'
      }
    ]
  }
];
