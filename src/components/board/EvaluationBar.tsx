import { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface EvaluationBarProps {
  evaluation: number; // In centipawns, positive = white advantage
  orientation?: 'white' | 'black';
  isMate?: boolean;
  mateIn?: number;
}

export function EvaluationBar({
  evaluation,
  orientation = 'white',
  isMate = false,
  mateIn,
}: EvaluationBarProps) {
  const { whitePercent, displayValue } = useMemo(() => {
    if (isMate && mateIn !== undefined) {
      // Mate evaluation
      const isWhiteWinning = mateIn > 0;
      return {
        whitePercent: isWhiteWinning ? 100 : 0,
        displayValue: `M${Math.abs(mateIn)}`,
      };
    }

    // Convert centipawns to a percentage (sigmoid-like)
    // -1000cp = ~10% white, +1000cp = ~90% white
    const clampedEval = Math.max(-1000, Math.min(1000, evaluation));
    const percent = 50 + (clampedEval / 1000) * 40;

    // Format display value
    const pawns = Math.abs(evaluation / 100);
    const sign = evaluation >= 0 ? '+' : '-';
    const displayValue = `${sign}${pawns.toFixed(1)}`;

    return {
      whitePercent: Math.max(5, Math.min(95, percent)),
      displayValue,
    };
  }, [evaluation, isMate, mateIn]);

  const isFlipped = orientation === 'black';
  const effectiveWhitePercent = isFlipped ? 100 - whitePercent : whitePercent;

  return (
    <div className="flex flex-col items-center h-full w-6">
      <div className="relative w-full h-full rounded overflow-hidden border">
        {/* Black portion (top) */}
        <div
          className="absolute top-0 left-0 right-0 bg-zinc-800 transition-all duration-300"
          style={{ height: `${100 - effectiveWhitePercent}%` }}
        />
        {/* White portion (bottom) */}
        <div
          className="absolute bottom-0 left-0 right-0 bg-white transition-all duration-300"
          style={{ height: `${effectiveWhitePercent}%` }}
        />
      </div>
      <span
        className={cn(
          'text-xs mt-1 font-mono',
          evaluation >= 0 ? 'card-text-primary' : 'card-text-muted'
        )}
      >
        {displayValue}
      </span>
    </div>
  );
}
