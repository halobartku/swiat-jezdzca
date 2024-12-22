import type { Question } from './quiz-base-types';

export const technicalQuestions: Question[] = [
  {
    id: 'training_approach',
    text: 'Jak podchodzisz do treningu z koniem?',
    category: 'technical',
    weightage: 4,
    answers: [
      {
        text: 'Mam szczegółowy plan treningowy i systematycznie go realizuję',
        points: { competitive: 4, recreational: 0, trainer: 3, adventurous: 1 },
        secondaryTraits: { analytical: 4, leadership: 3 },
        explanation: 'Wskazuje na profesjonalne podejście'
      },
      {
        text: 'Dostosowuję się do aktualnego samopoczucia konia',
        points: { competitive: 1, recreational: 4, trainer: 2, adventurous: 2 },
        secondaryTraits: { emotional: 4, patience: 3 },
        explanation: 'Pokazuje empatyczne podejście'
      },
      {
        text: 'Skupiam się na różnorodności ćwiczeń',
        points: { competitive: 2, recreational: 2, trainer: 3, adventurous: 4 },
        secondaryTraits: { risk_tolerance: 2, analytical: 2 },
        explanation: 'Świadczy o wszechstronnym podejściu'
      },
      {
        text: 'Koncentruję się na podstawach i bezpieczeństwie',
        points: { competitive: 1, recreational: 3, trainer: 4, adventurous: 1 },
        secondaryTraits: { patience: 4, leadership: 2 },
        explanation: 'Wskazuje na metodyczne podejście'
      },
      {
        text: 'Nie prowadzę regularnych treningów',
        points: { competitive: 0, recreational: 2, trainer: 0, adventurous: 1 },
        secondaryTraits: { risk_tolerance: 1 },
        explanation: 'Pokazuje rekreacyjne zaangażowanie'
      }
    ]
  },
  {
    id: 'problem_solving',
    text: 'Jak rozwiązujesz problemy techniczne podczas jazdy?',
    category: 'technical',
    weightage: 4,
    answers: [
      {
        text: 'Analizuję problem i systematycznie nad nim pracuję',
        points: { competitive: 3, recreational: 1, trainer: 4, adventurous: 2 },
        secondaryTraits: { analytical: 4, patience: 3 },
        explanation: 'Pokazuje metodyczne podejście'
      },
      {
        text: 'Szukam pomocy u trenera lub bardziej doświadczonych osób',
        points: { competitive: 2, recreational: 3, trainer: 2, adventurous: 1 },
        secondaryTraits: { emotional: 2, leadership: -1 },
        explanation: 'Wskazuje na rozsądne podejście'
      },
      {
        text: 'Eksperymentuję z różnymi rozwiązaniami',
        points: { competitive: 2, recreational: 1, trainer: 1, adventurous: 4 },
        secondaryTraits: { risk_tolerance: 3, analytical: 2 },
        explanation: 'Świadczy o kreatywnym podejściu'
      },
      {
        text: 'Wracam do podstaw i buduję od nowa',
        points: { competitive: 1, recreational: 2, trainer: 3, adventurous: 1 },
        secondaryTraits: { patience: 4, analytical: 3 },
        explanation: 'Pokazuje systematyczne podejście'
      },
      {
        text: 'Nie mam doświadczenia w rozwiązywaniu problemów',
        points: { competitive: 0, recreational: 1, trainer: 0, adventurous: 0 },
        secondaryTraits: { emotional: 1 },
        explanation: 'Wskazuje na początkujący poziom'
      }
    ]
  },
  {
    id: 'equipment_knowledge',
    text: 'Jakie jest Twoje podejście do sprzętu jeździeckiego?',
    category: 'technical',
    weightage: 3,
    answers: [
      {
        text: 'Inwestuję w najlepszy sprzęt i dbam o jego stan',
        points: { competitive: 4, recreational: 1, trainer: 3, adventurous: 2 },
        secondaryTraits: { analytical: 3, leadership: 2 },
        explanation: 'Wskazuje na profesjonalne podejście'
      },
      {
        text: 'Wybieram sprzęt pod kątem komfortu konia',
        points: { competitive: 2, recreational: 4, trainer: 3, adventurous: 1 },
        secondaryTraits: { emotional: 4, patience: 3 },
        explanation: 'Pokazuje troskę o dobro konia'
      },
      {
        text: 'Eksperymentuję z różnymi rozwiązaniami',
        points: { competitive: 3, recreational: 1, trainer: 2, adventurous: 4 },
        secondaryTraits: { risk_tolerance: 3, analytical: 2 },
        explanation: 'Świadczy o innowacyjnym podejściu'
      },
      {
        text: 'Korzystam z podstawowego, sprawdzonego sprzętu',
        points: { competitive: 1, recreational: 3, trainer: 2, adventurous: 2 },
        secondaryTraits: { patience: 3, risk_tolerance: -1 },
        explanation: 'Pokazuje praktyczne podejście'
      },
      {
        text: 'Nie mam własnego sprzętu',
        points: { competitive: 0, recreational: 1, trainer: 0, adventurous: 0 },
        secondaryTraits: { emotional: 1 },
        explanation: 'Wskazuje na początkujący etap'
      }
    ]
  }
];
