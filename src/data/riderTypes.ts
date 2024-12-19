export type Answer = {
  text: string;
  points: {
    [key in RiderType]: number;
  };
  explanation?: string;
};

export type Question = {
  text: string;
  subtext?: string;
  answers: Answer[];
  category: 'personality' | 'preference' | 'technical' | 'horse-knowledge';
};

export type RiderType = 'competitive' | 'recreational' | 'trainer' | 'adventurous';

export type RiderTypeInfo = {
  title: string;
  description: string;
  characteristics: string[];
  strengths: string[];
  recommendations: string[];
  horsePreferences: string[];
  trainingStyle: string[];
  icon: string;
};

export const riderTypeDetails: Record<RiderType, RiderTypeInfo> = {
  competitive: {
    title: 'Jeździec Sportowy',
    description: 'Twoja pasja to rywalizacja i dążenie do doskonałości w jeździectwie sportowym. Masz naturalne predyspozycje do osiągania wysokich wyników w zawodach.',
    characteristics: [
      'Wysoka motywacja do rywalizacji',
      'Systematyczność w treningu',
      'Koncentracja na celach',
      'Dążenie do perfekcji',
      'Odporność na stres'
    ],
    strengths: [
      'Umiejętność pracy pod presją',
      'Szybkie przyswajanie technik',
      'Dobra analiza własnych błędów',
      'Silna więź z koniem podczas treningu'
    ],
    recommendations: [
      'Rozważ udział w lokalnych zawodach',
      'Skonsultuj się z doświadczonym trenerem',
      'Stwórz plan treningowy',
      'Prowadź dziennik postępów'
    ],
    horsePreferences: [
      'Konie o wysokim potencjale sportowym',
      'Rasy predysponowane do konkretnych dyscyplin',
      'Konie z dobrym ruchem i skokiem'
    ],
    trainingStyle: [
      'Regularne treningi z planem',
      'Skupienie na technice',
      'Analiza wyników',
      'Praca nad konkretnymi elementami'
    ],
    icon: '🏆'
  },
  recreational: {
    title: 'Jeździec Rekreacyjny',
    description: 'Cenisz sobie przyjemność z jazdy i relaks w towarzystwie koni. Jeździectwo jest dla Ciebie formą odpoczynku i kontaktu z naturą.',
    characteristics: [
      'Spokojne podejście do jazdy',
      'Nastawienie na przyjemność',
      'Empatia wobec koni',
      'Cierpliwość',
      'Elastyczność w planowaniu'
    ],
    strengths: [
      'Naturalne wyczucie konia',
      'Umiejętność relaksacji',
      'Dobry kontakt ze zwierzętami',
      'Zrównoważone podejście do jazdy'
    ],
    recommendations: [
      'Spróbuj różnych stylów jazdy',
      'Zapisz się na rajd konny',
      'Poznaj podstawy pielęgnacji koni',
      'Dołącz do lokalnej społeczności jeździeckiej'
    ],
    horsePreferences: [
      'Konie o spokojnym temperamencie',
      'Doświadczone i pewne wierzchowce',
      'Konie przyjazne w obsłudze'
    ],
    trainingStyle: [
      'Elastyczne podejście do treningu',
      'Nacisk na przyjemność z jazdy',
      'Różnorodność aktywności',
      'Spokojne tempo nauki'
    ],
    icon: '🌟'
  },
  trainer: {
    title: 'Instruktor/Trener',
    description: 'Twoją pasją jest dzielenie się wiedzą i pomaganie innym w rozwoju jeździeckim. Masz naturalne predyspozycje do nauczania.',
    characteristics: [
      'Zdolności pedagogiczne',
      'Cierpliwość w nauczaniu',
      'Umiejętność motywowania innych',
      'Dobra komunikacja',
      'Empatia'
    ],
    strengths: [
      'Umiejętność przekazywania wiedzy',
      'Zdolność obserwacji i analizy',
      'Dobre zarządzanie grupą',
      'Indywidualne podejście do uczniów'
    ],
    recommendations: [
      'Rozważ kurs instruktorski',
      'Asystuj doświadczonym trenerom',
      'Pogłębiaj wiedzę o psychologii koni',
      'Rozwijaj umiejętności komunikacyjne'
    ],
    horsePreferences: [
      'Konie doświadczone w pracy szkoleniowej',
      'Wierzchowce o zrównoważonym charakterze',
      'Konie odpowiednie do różnych poziomów jeźdźców'
    ],
    trainingStyle: [
      'Metodyczne podejście do nauczania',
      'Dostosowanie do potrzeb ucznia',
      'Nacisk na podstawy',
      'Cierpliwe budowanie umiejętności'
    ],
    icon: '📚'
  },
  adventurous: {
    title: 'Jeździec Terenowy',
    description: 'Kochasz przygody i eksplorowanie nowych szlaków konnych. Natura i wolność to Twoje żywioły.',
    characteristics: [
      'Zamiłowanie do przygód',
      'Dobra orientacja w terenie',
      'Samodzielność',
      'Umiejętność radzenia sobie w trudnych warunkach',
      'Spontaniczność'
    ],
    strengths: [
      'Doskonałe wyczucie terenu',
      'Umiejętność planowania tras',
      'Dobra kondycja fizyczna',
      'Zdolność szybkiego reagowania'
    ],
    recommendations: [
      'Zaplanuj dłuższą wyprawę konną',
      'Poznaj podstawy terenoznawstwa',
      'Dołącz do grupy rajdowej',
      'Rozwijaj umiejętności survivalowe'
    ],
    horsePreferences: [
      'Konie wytrzymałe i pewne w terenie',
      'Rasy odporne na trudne warunki',
      'Wierzchowce o stabilnej psychice'
    ],
    trainingStyle: [
      'Różnorodność treningu',
      'Praca w terenie',
      'Budowanie kondycji',
      'Rozwijanie samodzielności konia'
    ],
    icon: '🌲'
  }
};

export const questions: Question[] = [
  // Personality Questions
  {
    text: 'Co najbardziej pociąga Cię w jeździectwie?',
    subtext: 'Zastanów się nad swoją główną motywacją',
    category: 'personality',
    answers: [
      {
        text: 'Możliwość rywalizacji i sprawdzania swoich umiejętności',
        points: { competitive: 3, recreational: 0, trainer: 1, adventurous: 1 },
        explanation: 'Duch rywalizacji jest ważnym elementem rozwoju jeździeckiego'
      },
      {
        text: 'Spokój i harmonia w kontakcie z koniem',
        points: { competitive: 0, recreational: 3, trainer: 1, adventurous: 1 },
        explanation: 'Budowanie więzi z koniem to fundament dobrego jeździectwa'
      },
      {
        text: 'Możliwość pomocy innym w rozwoju',
        points: { competitive: 1, recreational: 1, trainer: 3, adventurous: 0 },
        explanation: 'Dzielenie się wiedzą to szlachetna ścieżka rozwoju'
      },
      {
        text: 'Odkrywanie nowych miejsc i przygody',
        points: { competitive: 0, recreational: 1, trainer: 0, adventurous: 3 },
        explanation: 'Eksploracja i przygoda to esencja jeździectwa terenowego'
      }
    ]
  },
  {
    text: 'Jak reagujesz na nowe wyzwania jeździeckie?',
    subtext: 'Pomyśl o sytuacji, gdy stajesz przed trudnym zadaniem',
    category: 'personality',
    answers: [
      {
        text: 'Traktuję je jako okazję do udowodnienia swoich umiejętności',
        points: { competitive: 3, recreational: 0, trainer: 1, adventurous: 1 },
        explanation: 'Ambicja i determinacja to cechy jeźdźca sportowego'
      },
      {
        text: 'Podchodzę do nich spokojnie, bez presji',
        points: { competitive: 0, recreational: 3, trainer: 1, adventurous: 1 },
        explanation: 'Spokój i rozwaga to klucz do harmonijnej jazdy'
      },
      {
        text: 'Analizuję je pod kątem metodyki nauczania',
        points: { competitive: 1, recreational: 0, trainer: 3, adventurous: 0 },
        explanation: 'Analityczne podejście pomaga w nauczaniu innych'
      },
      {
        text: 'Widzę w nich szansę na nową przygodę',
        points: { competitive: 1, recreational: 0, trainer: 0, adventurous: 3 },
        explanation: 'Entuzjazm wobec wyzwań cechuje jeźdźców terenowych'
      }
    ]
  },
  // Technical Questions
  {
    text: 'Jakie aspekty treningu są dla Ciebie najważniejsze?',
    subtext: 'Wybierz podejście, które najlepiej opisuje Twój styl',
    category: 'technical',
    answers: [
      {
        text: 'Precyzja wykonania i technika',
        points: { competitive: 3, recreational: 0, trainer: 2, adventurous: 0 },
        explanation: 'Dokładność techniczna jest kluczowa w sporcie'
      },
      {
        text: 'Harmonia i zrozumienie konia',
        points: { competitive: 1, recreational: 3, trainer: 2, adventurous: 1 },
        explanation: 'Dobra komunikacja z koniem to podstawa przyjemnej jazdy'
      },
      {
        text: 'Metodyka i progresja nauczania',
        points: { competitive: 1, recreational: 0, trainer: 3, adventurous: 0 },
        explanation: 'Systematyczne podejście jest ważne w nauczaniu'
      },
      {
        text: 'Wszechstronność i adaptacja',
        points: { competitive: 0, recreational: 1, trainer: 1, adventurous: 3 },
        explanation: 'Elastyczność jest kluczowa w jeździe terenowej'
      }
    ]
  },
  // Horse Knowledge Questions
  {
    text: 'Jak oceniasz temperament konia przed jazdą?',
    subtext: 'Wybierz najważniejszy dla Ciebie aspekt',
    category: 'horse-knowledge',
    answers: [
      {
        text: 'Sprawdzam jego reakcje i energię do pracy',
        points: { competitive: 3, recreational: 0, trainer: 2, adventurous: 1 },
        explanation: 'Energia i chęć do pracy są kluczowe w sporcie'
      },
      {
        text: 'Obserwuję jego zachowanie w stajni i przy czyszczeniu',
        points: { competitive: 0, recreational: 3, trainer: 2, adventurous: 1 },
        explanation: 'Spokojne poznanie konia buduje zaufanie'
      },
      {
        text: 'Analizuję jego interakcje z różnymi jeźdźcami',
        points: { competitive: 1, recreational: 1, trainer: 3, adventurous: 0 },
        explanation: 'Wszechstronna ocena jest ważna dla instruktora'
      },
      {
        text: 'Sprawdzam jego pewność siebie w różnych sytuacjach',
        points: { competitive: 1, recreational: 0, trainer: 1, adventurous: 3 },
        explanation: 'Pewność konia jest kluczowa w terenie'
      }
    ]
  },
  {
    text: 'Jak reagujesz na nieprzewidziane zachowanie konia?',
    subtext: 'Wybierz swoją typową reakcję',
    category: 'horse-knowledge',
    answers: [
      {
        text: 'Szybko przejmuje kontrolę i koryguję zachowanie',
        points: { competitive: 3, recreational: 0, trainer: 2, adventurous: 1 },
        explanation: 'Szybka reakcja jest ważna w sporcie'
      },
      {
        text: 'Zachowuję spokój i daję koniowi czas na uspokojenie',
        points: { competitive: 0, recreational: 3, trainer: 1, adventurous: 1 },
        explanation: 'Cierpliwość buduje zaufanie'
      },
      {
        text: 'Analizuję przyczynę i planuje pracę korekcyjną',
        points: { competitive: 1, recreational: 1, trainer: 3, adventurous: 0 },
        explanation: 'Analityczne podejście pomaga w szkoleniu'
      },
      {
        text: 'Dostosowuję się do sytuacji i szukam alternatywnych rozwiązań',
        points: { competitive: 1, recreational: 0, trainer: 1, adventurous: 3 },
        explanation: 'Elastyczność jest kluczowa w terenie'
      }
    ]
  },
  // Preference Questions
  {
    text: 'Jaki typ treningu preferujesz?',
    subtext: 'Wybierz ulubiony rodzaj zajęć',
    category: 'preference',
    answers: [
      {
        text: 'Intensywny trening na ujeżdżalni',
        points: { competitive: 3, recreational: 0, trainer: 1, adventurous: 0 },
        explanation: 'Systematyczny trening rozwija umiejętności sportowe'
      },
      {
        text: 'Spokojna jazda w terenie',
        points: { competitive: 0, recreational: 3, trainer: 0, adventurous: 2 },
        explanation: 'Relaksująca jazda buduje pewność siebie'
      },
      {
        text: 'Prowadzenie zajęć i szkolenie innych',
        points: { competitive: 1, recreational: 0, trainer: 3, adventurous: 0 },
        explanation: 'Nauczanie rozwija umiejętności pedagogiczne'
      },
      {
        text: 'Eksploracja nowych szlaków',
        points: { competitive: 0, recreational: 1, trainer: 0, adventurous: 3 },
        explanation: 'Odkrywanie nowych miejsc rozwija wszechstronność'
      }
    ]
  },
  {
    text: 'Co jest dla Ciebie najważniejsze w relacji z koniem?',
    subtext: 'Wybierz aspekt, który cenisz najbardziej',
    category: 'preference',
    answers: [
      {
        text: 'Wzajemne zrozumienie podczas treningu',
        points: { competitive: 3, recreational: 1, trainer: 2, adventurous: 0 },
        explanation: 'Precyzyjna komunikacja jest kluczowa w sporcie'
      },
      {
        text: 'Emocjonalna więź i zaufanie',
        points: { competitive: 0, recreational: 3, trainer: 1, adventurous: 1 },
        explanation: 'Silna więź emocjonalna wzbogaca jazdę rekreacyjną'
      },
      {
        text: 'Umiejętność dostosowania się do różnych koni',
        points: { competitive: 1, recreational: 0, trainer: 3, adventurous: 1 },
        explanation: 'Wszechstronność jest ważna w nauczaniu'
      },
      {
        text: 'Partnerstwo w przygodach',
        points: { competitive: 0, recreational: 1, trainer: 0, adventurous: 3 },
        explanation: 'Wzajemne zaufanie jest niezbędne w terenie'
      }
    ]
  },
  {
    text: 'Jak podchodzisz do pielęgnacji konia?',
    subtext: 'Wybierz swój styl opieki nad koniem',
    category: 'horse-knowledge',
    answers: [
      {
        text: 'Skupiam się na przygotowaniu do treningu',
        points: { competitive: 3, recreational: 0, trainer: 1, adventurous: 0 },
        explanation: 'Profesjonalne przygotowanie jest ważne w sporcie'
      },
      {
        text: 'To czas na budowanie więzi i relaksu',
        points: { competitive: 0, recreational: 3, trainer: 1, adventurous: 1 },
        explanation: 'Pielęgnacja to świetna okazja do budowania relacji'
      },
      {
        text: 'Uczę innych prawidłowych technik',
        points: { competitive: 1, recreational: 0, trainer: 3, adventurous: 0 },
        explanation: 'Przekazywanie wiedzy o pielęgnacji jest ważne w nauczaniu'
      },
      {
        text: 'Sprawdzam kondycję i przygotowanie do wypraw',
        points: { competitive: 0, recreational: 1, trainer: 0, adventurous: 3 },
        explanation: 'Dokładna kontrola stanu konia jest kluczowa przed wyprawą'
      }
    ]
  },
  {
    text: 'Jakie cechy konia są dla Ciebie najważniejsze?',
    subtext: 'Wybierz preferowany charakter wierzchowca',
    category: 'horse-knowledge',
    answers: [
      {
        text: 'Ambicja i chęć do pracy',
        points: { competitive: 3, recreational: 0, trainer: 1, adventurous: 1 },
        explanation: 'Energiczny koń jest idealny do sportu'
      },
      {
        text: 'Łagodność i zrównoważenie',
        points: { competitive: 0, recreational: 3, trainer: 2, adventurous: 0 },
        explanation: 'Spokojny charakter sprzyja rekreacji'
      },
      {
        text: 'Inteligencja i chęć współpracy',
        points: { competitive: 1, recreational: 1, trainer: 3, adventurous: 0 },
        explanation: 'Uczenie się konia jest kluczowe w szkoleniu'
      },
      {
        text: 'Odwaga i pewność siebie',
        points: { competitive: 1, recreational: 0, trainer: 0, adventurous: 3 },
        explanation: 'Pewny siebie koń jest niezbędny w terenie'
      }
    ]
  },
  {
    text: 'Jak spędzasz czas wolny w stajni?',
    subtext: 'Wybierz ulubioną aktywność poza jazdą',
    category: 'preference',
    answers: [
      {
        text: 'Analizuję treningi i planuję kolejne',
        points: { competitive: 3, recreational: 0, trainer: 2, adventurous: 0 },
        explanation: 'Planowanie jest kluczowe w rozwoju sportowym'
      },
      {
        text: 'Spędzam czas z końmi i innymi jeźdźcami',
        points: { competitive: 0, recreational: 3, trainer: 1, adventurous: 1 },
        explanation: 'Budowanie społeczności jest ważne w rekreacji'
      },
      {
        text: 'Obserwuję innych i udzielam wskazówek',
        points: { competitive: 1, recreational: 0, trainer: 3, adventurous: 0 },
        explanation: 'Dzielenie się wiedzą to naturalna cecha instruktora'
      },
      {
        text: 'Planuję nowe trasy i wyprawy',
        points: { competitive: 0, recreational: 1, trainer: 0, adventurous: 3 },
        explanation: 'Planowanie wypraw jest istotne w jeździe terenowej'
      }
    ]
  },
  {
    text: 'Jak reagujesz na błędy podczas jazdy?',
    subtext: 'Wybierz swoją typową reakcję',
    category: 'personality',
    answers: [
      {
        text: 'Natychmiast analizuję i poprawiam',
        points: { competitive: 3, recreational: 0, trainer: 2, adventurous: 0 },
        explanation: 'Szybka korekta jest ważna w sporcie'
      },
      {
        text: 'Zachowuję spokój i próbuję ponownie',
        points: { competitive: 0, recreational: 3, trainer: 1, adventurous: 1 },
        explanation: 'Cierpliwość pomaga w nauce'
      },
      {
        text: 'Wykorzystuję jako przykład w nauczaniu',
        points: { competitive: 1, recreational: 0, trainer: 3, adventurous: 0 },
        explanation: 'Błędy są cennym narzędziem dydaktycznym'
      },
      {
        text: 'Dostosowuję plan do sytuacji',
        points: { competitive: 0, recreational: 1, trainer: 0, adventurous: 3 },
        explanation: 'Elastyczność jest kluczowa w terenie'
      }
    ]
  }
];
