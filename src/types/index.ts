// Opening types
export interface OpeningMove {
  san: string;
  explanation: string;
  fen: string;
}

export interface Opening {
  id: string;
  name: string;
  color: 'white' | 'black';
  eco?: string;
  description: string;
  moves: OpeningMove[];
  keyPrinciples: string[];
}

// Puzzle types
export interface Puzzle {
  id: string;
  fen: string;
  moves: string[]; // UCI format
  rating: number;
  themes: string[];
  gameUrl?: string;
}

// Leitner box system (1-4)
export type LeitnerBox = 1 | 2 | 3 | 4;

export interface OpeningProgress {
  box: LeitnerBox;
  nextReview: number; // timestamp
  lastPracticed: number; // timestamp
  correctCount: number;
  incorrectCount: number;
}

export interface PuzzleProgress {
  solvedAt: number;
  attempts: number;
  hintsUsed: number;
  correct: boolean;
}

export interface UserProgress {
  puzzleRating: number;
  puzzleRatingHistory: { date: number; rating: number }[];
  openingProgress: Record<string, OpeningProgress>;
  puzzleProgress: Record<string, PuzzleProgress>;
  streaks: {
    current: number;
    best: number;
    lastPracticeDate: string; // YYYY-MM-DD
  };
  themeAccuracy: Record<string, { correct: number; total: number }>;
}

// Chess.com API types
export interface ChessComGame {
  url: string;
  pgn: string;
  time_control: string;
  end_time: number;
  rated: boolean;
  time_class: string;
  rules: string;
  white: {
    username: string;
    rating: number;
    result: string;
  };
  black: {
    username: string;
    rating: number;
    result: string;
  };
}

export interface GameAnalysis {
  fen: string;
  move: string;
  evaluation: number;
  bestMove?: string;
  classification?: 'blunder' | 'mistake' | 'inaccuracy' | 'good' | 'excellent' | 'best';
}

// Settings
export interface Settings {
  theme: 'light' | 'dark' | 'system';
  boardTheme: 'green' | 'brown' | 'blue' | 'purple';
  soundEnabled: boolean;
  showCoordinates: boolean;
  chessComUsername?: string;
}

// Store types
export interface AppState {
  settings: Settings;
  progress: UserProgress;
  setSettings: (settings: Partial<Settings>) => void;
  updateProgress: (progress: Partial<UserProgress>) => void;
  updateOpeningProgress: (openingId: string, progress: Partial<OpeningProgress>) => void;
  recordPuzzleAttempt: (puzzleId: string, correct: boolean, hintsUsed: number) => void;
  updateStreak: () => void;
}
