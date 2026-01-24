import type { Move } from 'chess.js';
import { cn } from '@/lib/utils';

interface MoveHistoryProps {
  moves: Move[];
  currentMoveIndex: number;
  onMoveClick?: (index: number) => void;
}

export function MoveHistory({
  moves,
  currentMoveIndex,
  onMoveClick,
}: MoveHistoryProps) {
  // Group moves into pairs (white, black)
  const movePairs: { white: Move | null; black: Move | null; number: number }[] = [];

  for (let i = 0; i < moves.length; i += 2) {
    movePairs.push({
      number: Math.floor(i / 2) + 1,
      white: moves[i] || null,
      black: moves[i + 1] || null,
    });
  }

  return (
    <div className="bg-card rounded-lg border p-4 h-64 overflow-y-auto">
      <h3 className="text-sm font-medium mb-2 card-text-muted">Moves</h3>
      <div className="space-y-1">
        {movePairs.map((pair, pairIndex) => (
          <div key={pair.number} className="flex text-sm">
            <span className="w-8 card-text-muted">{pair.number}.</span>
            {pair.white && (
              <button
                onClick={() => onMoveClick?.(pairIndex * 2 + 1)}
                className={cn(
                  'w-16 text-left px-1 rounded hover:bg-accent',
                  currentMoveIndex === pairIndex * 2 + 1 && 'bg-accent font-medium'
                )}
              >
                {pair.white.san}
              </button>
            )}
            {pair.black && (
              <button
                onClick={() => onMoveClick?.(pairIndex * 2 + 2)}
                className={cn(
                  'w-16 text-left px-1 rounded hover:bg-accent',
                  currentMoveIndex === pairIndex * 2 + 2 && 'bg-accent font-medium'
                )}
              >
                {pair.black.san}
              </button>
            )}
          </div>
        ))}
        {moves.length === 0 && (
          <p className="card-text-muted text-sm">No moves yet</p>
        )}
      </div>
    </div>
  );
}
