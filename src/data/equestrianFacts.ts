export interface EquestrianFact {
  id: number;
  fact: string;
  category: 'history' | 'sport' | 'training' | 'equipment';
}

export const equestrianFacts: EquestrianFact[] = [
  {
    id: 1,
    fact: "Skoki przez przeszkody zostały wprowadzone do programu olimpijskiego w 1912 roku na igrzyskach w Sztokholmie.",
    category: "history"
  },
  {
    id: 2,
    fact: "Standardowa wysokość przeszkód w Grand Prix może sięgać nawet 1.60m.",
    category: "sport"
  },
  {
    id: 3,
    fact: "Cavaletti to niskie przeszkody treningowe, które pomagają koniom rozwinąć rytm i równowagę.",
    category: "training"
  },
  {
    id: 4,
    fact: "Oxer to przeszkoda składająca się z dwóch drągów ustawionych jeden za drugim.",
    category: "equipment"
  },
  {
    id: 5,
    fact: "Pierwszy oficjalny konkurs skoków przez przeszkody odbył się w Dublinie w 1864 roku.",
    category: "history"
  },
  {
    id: 6,
    fact: "W zawodach międzynarodowych parkur może składać się z 10-13 przeszkód.",
    category: "sport"
  },
  {
    id: 7,
    fact: "Stacjonata to najprostsza przeszkoda składająca się z pojedynczego drąga.",
    category: "equipment"
  },
  {
    id: 8,
    fact: "Szereg to kombinacja 2-3 przeszkód ustawionych w określonej odległości.",
    category: "equipment"
  },
  {
    id: 9,
    fact: "Trening na lonży pomaga rozwinąć równowagę i prawidłową postawę jeźdźca.",
    category: "training"
  },
  {
    id: 10,
    fact: "Mur to przeszkoda zbudowana z lekkich bloków, które łatwo się przewracają.",
    category: "equipment"
  },
  {
    id: 11,
    fact: "Liverpool to przeszkoda z rowem wypełnionym wodą pod drągiem.",
    category: "equipment"
  },
  {
    id: 12,
    fact: "Gymnastics jumping to seria przeszkód pomagająca w rozwoju techniki skoku.",
    category: "training"
  },
  {
    id: 13,
    fact: "Pierwsze przeszkody jeździeckie były inspirowane naturalnymi barierami w terenie.",
    category: "history"
  },
  {
    id: 14,
    fact: "W skokach przez przeszkody liczy się nie tylko wysokość, ale też technika i precyzja.",
    category: "sport"
  },
  {
    id: 15,
    fact: "Drągi treningowe pomagają koniom nauczyć się prawidłowego odstępu w skoku.",
    category: "training"
  }
];
