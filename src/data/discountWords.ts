// Polish equestrian-related words for discount codes
export const polishWords = [
  'Galop',    // Gallop
  'Kłus',     // Trot
  'Stęp',     // Walk
  'Siodło',   // Saddle
  'Wodza',    // Rein
  'Czaprak',  // Saddle pad
  'Uździenica', // Bridle
  'Strzemię', // Stirrup
  'Kantar',   // Halter
  'Bat',      // Whip
  'Parkur',   // Show jumping course
  'Czok',     // Crop
  'Popręg',   // Girth
  'Kiełzno',  // Bit
  'Ogłowie',  // Headstall
  'Munsztuk', // Curb bit
  'Wędzidło', // Snaffle
  'Nachrapnik', // Noseband
  'Wolta',    // Volte
  'Lonża'     // Lunge line
];

export function generateDiscountCode(): { word1: string; word2: string } {
  // Create a copy of the array to avoid modifying the original
  const availableWords = [...polishWords];
  
  // Get first random word
  const index1 = Math.floor(Math.random() * availableWords.length);
  const word1 = availableWords[index1];
  
  // Remove the first word from available words
  availableWords.splice(index1, 1);
  
  // Get second random word
  const index2 = Math.floor(Math.random() * availableWords.length);
  const word2 = availableWords[index2];
  
  return { word1, word2 };
}
