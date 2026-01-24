import type { LeitnerBox, OpeningProgress } from '@/types';

// Leitner system intervals in days
const BOX_INTERVALS: Record<LeitnerBox, number> = {
  1: 1,   // Daily
  2: 3,   // Every 3 days
  3: 7,   // Weekly
  4: 14,  // Every 2 weeks
};

export function createInitialProgress(): OpeningProgress {
  return {
    box: 1,
    nextReview: Date.now(),
    lastPracticed: 0,
    correctCount: 0,
    incorrectCount: 0,
  };
}

export function updateProgressAfterPractice(
  progress: OpeningProgress,
  correct: boolean
): OpeningProgress {
  const now = Date.now();

  if (correct) {
    // Move to next box (max 4)
    const newBox = Math.min(4, progress.box + 1) as LeitnerBox;
    const intervalMs = BOX_INTERVALS[newBox] * 24 * 60 * 60 * 1000;

    return {
      box: newBox,
      nextReview: now + intervalMs,
      lastPracticed: now,
      correctCount: progress.correctCount + 1,
      incorrectCount: progress.incorrectCount,
    };
  } else {
    // Move back to box 1
    const intervalMs = BOX_INTERVALS[1] * 24 * 60 * 60 * 1000;

    return {
      box: 1,
      nextReview: now + intervalMs,
      lastPracticed: now,
      correctCount: progress.correctCount,
      incorrectCount: progress.incorrectCount + 1,
    };
  }
}

export function isDueForReview(progress: OpeningProgress): boolean {
  return Date.now() >= progress.nextReview;
}

export function getReviewStatus(progress: OpeningProgress): 'due' | 'upcoming' | 'mastered' {
  if (progress.box === 4 && !isDueForReview(progress)) {
    return 'mastered';
  }
  if (isDueForReview(progress)) {
    return 'due';
  }
  return 'upcoming';
}

export function getTimeUntilReview(progress: OpeningProgress): string {
  const diff = progress.nextReview - Date.now();

  if (diff <= 0) return 'Now';

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d`;
  if (hours > 0) return `${hours}h`;

  const minutes = Math.floor(diff / (1000 * 60));
  return `${minutes}m`;
}

export function getMasteryPercentage(progress: OpeningProgress): number {
  return ((progress.box - 1) / 3) * 100;
}
