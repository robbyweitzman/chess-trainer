import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppState, Settings, UserProgress } from '@/types';

const defaultSettings: Settings = {
  theme: 'system',
  boardTheme: 'green',
  soundEnabled: true,
  showCoordinates: true,
};

const defaultProgress: UserProgress = {
  puzzleRating: 600,
  puzzleRatingHistory: [{ date: Date.now(), rating: 600 }],
  openingProgress: {},
  puzzleProgress: {},
  streaks: {
    current: 0,
    best: 0,
    lastPracticeDate: '',
  },
  themeAccuracy: {},
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      settings: defaultSettings,
      progress: defaultProgress,

      setSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),

      updateProgress: (newProgress) =>
        set((state) => ({
          progress: { ...state.progress, ...newProgress },
        })),

      updateOpeningProgress: (openingId, progress) =>
        set((state) => ({
          progress: {
            ...state.progress,
            openingProgress: {
              ...state.progress.openingProgress,
              [openingId]: {
                ...state.progress.openingProgress[openingId],
                ...progress,
              },
            },
          },
        })),

      recordPuzzleAttempt: (puzzleId, correct, hintsUsed) => {
        const state = get();
        const currentRating = state.progress.puzzleRating;

        // Simple rating adjustment
        const ratingChange = correct ? (hintsUsed === 0 ? 15 : 8) : -10;
        const newRating = Math.max(100, Math.min(3000, currentRating + ratingChange));

        set((state) => ({
          progress: {
            ...state.progress,
            puzzleRating: newRating,
            puzzleRatingHistory: [
              ...state.progress.puzzleRatingHistory,
              { date: Date.now(), rating: newRating },
            ].slice(-100), // Keep last 100 entries
            puzzleProgress: {
              ...state.progress.puzzleProgress,
              [puzzleId]: {
                solvedAt: Date.now(),
                attempts: (state.progress.puzzleProgress[puzzleId]?.attempts || 0) + 1,
                hintsUsed,
                correct,
              },
            },
          },
        }));
      },

      updateStreak: () => {
        const today = new Date().toISOString().split('T')[0];
        const state = get();
        const lastDate = state.progress.streaks.lastPracticeDate;

        if (lastDate === today) return; // Already practiced today

        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        const isConsecutive = lastDate === yesterday;

        set((state) => ({
          progress: {
            ...state.progress,
            streaks: {
              current: isConsecutive ? state.progress.streaks.current + 1 : 1,
              best: Math.max(
                state.progress.streaks.best,
                isConsecutive ? state.progress.streaks.current + 1 : 1
              ),
              lastPracticeDate: today,
            },
          },
        }));
      },
    }),
    {
      name: 'chess-trainer-storage',
    }
  )
);
