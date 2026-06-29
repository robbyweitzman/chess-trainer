import { useState, useCallback, useEffect } from 'react';
import { Chess, type Square } from 'chess.js';
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Lightbulb,
  Play,
  GraduationCap,
} from 'lucide-react';
import type { Opening } from '@/types';
import { useOpeningTrainer, type TrainingMode } from '@/hooks/useOpeningTrainer';
import { ChessBoard } from '@/components/board/ChessBoard';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';
import { Badge } from '@/components/ui/Badge';

interface OpeningTrainerProps {
  opening: Opening;
}

export function OpeningTrainer({ opening }: OpeningTrainerProps) {
  const [mode, setMode] = useState<TrainingMode>('learn');
  const [message, setMessage] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const trainer = useOpeningTrainer({ opening, mode });

  const handleMove = useCallback(
    (from: Square, to: Square) => {
      // Get the move in SAN format
      const tempGame = new Chess(trainer.fen);
      try {
        const move = tempGame.move({ from, to, promotion: 'q' });
        if (move) {
          const result = trainer.makeMove(move.san);
          setMessage(result.message);
          setIsCorrect(result.correct);

          // Opponent replies are auto-played by the effect below whenever it
          // becomes the opponent's turn.
          return result.correct;
        }
      } catch {
        return false;
      }
      return false;
    },
    [trainer]
  );

  // Auto-play opponent moves: when it's not the player's turn (including the
  // very first move of a Black opening), advance the line after a short delay.
  useEffect(() => {
    if (trainer.isComplete || trainer.isPlayerTurn) return;
    const timer = setTimeout(() => trainer.advanceOpponentMove(), 500);
    return () => clearTimeout(timer);
  }, [trainer.isPlayerTurn, trainer.isComplete, trainer.currentMoveIndex, trainer]);

  const handleReset = () => {
    trainer.reset();
    setMessage('');
    setIsCorrect(null);
  };

  const progressPercent = (trainer.currentMoveIndex / trainer.totalMoves) * 100;

  return (
    <div className="space-y-6">
      {/* Board and sidebar - side by side */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Chess board */}
        <div className="flex flex-col items-center flex-shrink-0">
          <ChessBoard
            fen={trainer.fen}
            orientation={trainer.playerColor}
            onMove={handleMove}
            allowMoves={trainer.isPlayerTurn && !trainer.isComplete}
          />

          {/* Progress bar */}
          <div className="w-full max-w-[600px] mt-4 space-y-2">
            <div className="flex justify-between text-sm card-text-muted">
              <span>
                Move {Math.min(trainer.currentMoveIndex + 1, trainer.totalMoves)}/
                {trainer.totalMoves}
              </span>
              <span>{Math.round(progressPercent)}% complete</span>
            </div>
            <Progress value={progressPercent} />
          </div>
        </div>

        {/* Right sidebar - Key Principles + Current move info */}
        <div className="md:w-64 flex-shrink-0 space-y-4">
          {/* Key principles */}
          <Card className="h-fit">
            <CardContent className="pt-6">
              <h3 className="font-display font-medium card-text-primary mb-3">Key Principles</h3>
              <ul className="space-y-2.5 text-sm card-text-secondary">
                {opening.keyPrinciples.map((principle, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-primary mt-0.5">•</span>
                    {principle}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Current move info */}
          <Card>
            <CardContent className="pt-6">
              {trainer.isComplete ? (
                <div className="text-center py-4">
                  <div className="text-4xl mb-2">
                    {trainer.mistakes === 0 ? '🎉' : '✅'}
                  </div>
                  <h3 className="text-lg font-semibold card-text-primary mb-2">
                    {trainer.mistakes === 0 ? 'Perfect!' : 'Opening Complete!'}
                  </h3>
                  <p className="card-text-secondary mb-4">
                    {trainer.mistakes === 0
                      ? "You've mastered this opening line!"
                      : `Completed with ${trainer.mistakes} mistake${trainer.mistakes > 1 ? 's' : ''}`}
                  </p>
                  <Button onClick={handleReset}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Practice Again
                  </Button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium card-text-primary">
                      {trainer.isPlayerTurn ? 'Your turn' : "Opponent's move"}
                    </h3>
                    {trainer.mistakes > 0 && (
                      <Badge variant="destructive">
                        {trainer.mistakes} mistake{trainer.mistakes > 1 ? 's' : ''}
                      </Badge>
                    )}
                  </div>

                  {/* Message display */}
                  {message && (
                    <div
                      className={`p-3 rounded mb-4 text-sm ${
                        isCorrect
                          ? 'bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/20'
                          : 'bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/20'
                      }`}
                    >
                      {message}
                    </div>
                  )}

                  {/* Current move explanation (learn mode) */}
                  {mode === 'learn' && trainer.currentMove && (
                    <div className="bg-muted p-4 rounded border border-border/50">
                      <p className="text-sm card-text-secondary">{trainer.currentMove.explanation}</p>
                    </div>
                  )}

                  {/* Hint button (practice mode) */}
                  {mode === 'practice' && trainer.isPlayerTurn && (
                    <div className="mt-4">
                      {trainer.showingHint ? (
                        <div className="bg-amber-500/10 p-3 rounded text-sm border border-amber-500/20">
                          <span className="font-medium text-amber-700 dark:text-amber-400">Hint:</span>{' '}
                          <span className="text-amber-700 dark:text-amber-400">The next move is {trainer.expectedMove}</span>
                        </div>
                      ) : (
                        <Button variant="outline" onClick={trainer.showHint}>
                          <Lightbulb className="h-4 w-4 mr-2" />
                          Show Hint
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Controls section */}
      <div className="flex flex-wrap gap-4 items-center">
        {/* Mode selector */}
        <div className="flex gap-2">
          <Button
            variant={mode === 'learn' ? 'default' : 'outline'}
            onClick={() => {
              setMode('learn');
              handleReset();
            }}
          >
            <GraduationCap className="h-4 w-4 mr-2" />
            Learn
          </Button>
          <Button
            variant={mode === 'practice' ? 'default' : 'outline'}
            onClick={() => {
              setMode('practice');
              handleReset();
            }}
          >
            <Play className="h-4 w-4 mr-2" />
            Practice
          </Button>
        </div>

        {/* Navigation controls */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => trainer.goToMove(trainer.currentMoveIndex - 1)}
            disabled={trainer.currentMoveIndex === 0}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => trainer.goToMove(trainer.currentMoveIndex + 1)}
            disabled={trainer.currentMoveIndex >= trainer.totalMoves - 1}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <Button variant="outline" onClick={handleReset} className="ml-auto">
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
}
