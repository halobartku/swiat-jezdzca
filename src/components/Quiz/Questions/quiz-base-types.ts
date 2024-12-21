export type RiderType = 'competitive' | 'recreational' | 'trainer' | 'adventurous';

export type SecondaryTraits = {
  leadership: number;
  patience: number;
  analytical: number;
  emotional: number;
  risk_tolerance: number;
};

export type Answer = {
  text: string;
  points: Record<RiderType, number>;
  secondaryTraits: Partial<SecondaryTraits>;
  explanation: string;
  dealbreaker?: RiderType[];
};

export type Question = {
  id: string;
  text: string;
  subtext?: string;
  category: 'personality' | 'technical' | 'relationship' | 'goals' | 'management';
  weightage: number;
  answers: Answer[];
};
