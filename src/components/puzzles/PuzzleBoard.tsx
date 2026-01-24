import { useCallback, useState, useEffect } from 'react';
import type { Square } from 'chess.js';
import { Lightbulb, RotateCcw, ArrowRight, Check, X } from 'lucide-react';
import type { Puzzle } from '@/types';
import { usePuzzle } from '@/hooks/usePuzzle';
import { ChessBoard } from '@/components/board/ChessBoard';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';

interface PuzzleBoardProps {
  puzzle: Puzzle;
  onComplete: (correct: boolean) => void;
  onNext: () => void;
}

export function PuzzleBoard({ puzzle, onComplete, onNext }: PuzzleBoardProps) {
  const puzzleState = usePuzzle(puzzle);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const playerColor = puzzleState.turn === 'w' ? 'white' : 'black';

  useEffect(() => {
    if (puzzleState.status === 'correct') {
      setFeedback('correct');
      onComplete(true);
    } else if (puzzleState.status === 'incorrect') {
      setFeedback('incorrect');
      onComplete(false);
    }
  }, [puzzleState.status, onComplete]);

  const handleMove = useCallback(
    (from: Square, to: Square, promotion?: string) => {
      const result = puzzleState.makeMove(from, to, promotion as 'q' | 'r' | 'b' | 'n');
      if (!result) {
        setFeedback('incorrect');
        setTimeout(() => setFeedback(null), 500);
      }
      return result;
    },
    [puzzleState]
  );

  const handleRetry = () => {
    puzzleState.retry();
    setFeedback(null);
  };

  const handleNext = () => {
    setFeedback(null);
    onNext();
  };

  const progressPercent =
    ((puzzleState.currentMoveIndex - 1) / (puzzleState.totalMoves - 1)) * 100;

  return (
    <div className="grid md:grid-cols-[1fr,350px] gap-6">
      {/* Chess board */}
      <div className="flex flex-col items-center">
        <ChessBoard
          fen={puzzleState.fen}
          orientation={playerColor}
          onMove={handleMove}
          allowMoves={puzzleState.status === 'playing'}
        />

        {/* Progress indicator */}
        <div className="w-full max-w-[600px] mt-4 space-y-2">
          <div className="flex justify-between text-sm card-text-muted">
            <span>
              Move {Math.max(0, puzzleState.currentMoveIndex - 1)}/
              {puzzleState.totalMoves - 1}
            </span>
            <span>Rating: {puzzle.rating}</span>
          </div>
          <Progress value={progressPercent} />
        </div>
      </div>

      {/* Info panel */}
      <div className="space-y-4">
        {/* Puzzle info */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-medium">
                {playerColor === 'white' ? 'White' : 'Black'} to play
              </h3>
              <Badge variant="outline">{puzzle.rating}</Badge>
            </div>

            {/* Status message */}
            {feedback === 'correct' && (
              <div className="flex items-center gap-2 p-3 bg-green-500/10 text-green-700 dark:text-green-400 rounded border border-green-500/20 mb-4">
                <Check className="h-5 w-5" />
                <span className="font-medium">Correct!</span>
              </div>
            )}

            {feedback === 'incorrect' && puzzleState.status === 'incorrect' && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 text-red-700 dark:text-red-400 rounded border border-red-500/20 mb-4">
                <X className="h-5 w-5" />
                <span className="font-medium">
                  Incorrect - the puzzle has ended
                </span>
              </div>
            )}

            {feedback === 'incorrect' && puzzleState.status === 'playing' && (
              <div className="p-3 bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded border border-amber-500/20 mb-4">
                <span>That's not the best move. Try again!</span>
              </div>
            )}

            {/* Themes */}
            <div className="mb-4">
              <h4 className="text-sm card-text-muted mb-2">Themes</h4>
              <div className="flex flex-wrap gap-1">
                {puzzle.themes.map((theme) => (
                  <Badge key={theme} variant="secondary" className="text-xs">
                    {theme}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Hint */}
            {puzzleState.status === 'playing' && (
              <div>
                {puzzleState.hintLevel > 0 && (
                  <div className="p-3 bg-muted rounded border border-border/50 mb-3 text-sm">
                    {puzzleState.getHint()}
                  </div>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={puzzleState.showHint}
                  disabled={puzzleState.hintLevel >= 3}
                >
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Hint ({3 - puzzleState.hintLevel} left)
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action buttons */}
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRetry}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Retry
          </Button>
          <Button onClick={handleNext} className="flex-1">
            Next Puzzle
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Attempts counter */}
        {puzzleState.attempts > 0 && puzzleState.status === 'playing' && (
          <p className="text-sm card-text-muted text-center">
            Attempts: {puzzleState.attempts}/3
          </p>
        )}
      </div>
    </div>
  );
}
